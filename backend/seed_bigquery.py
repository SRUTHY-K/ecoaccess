import datetime
import math
import random
import os
import sys
import io
import csv
from google.cloud import bigquery

# Ensure backend directory is in PYTHONPATH
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from core.config import PROJECT_ID

def seed_bigquery():
    project = PROJECT_ID

    client = bigquery.Client(project=project)
    print(f"Using GCP Project: {project}")

    # 1. Create Dataset if not exists
    dataset_id = f"{project}.ecoaccess_data"
    dataset = bigquery.Dataset(dataset_id)
    dataset.location = "US"
    try:
        client.create_dataset(dataset, exists_ok=True)
        print(f"Dataset {dataset_id} created or verified.")
    except Exception as e:
        print(f"Error creating dataset: {e}")

    # 2. Create historical_event_telemetry Table
    telemetry_table_id = f"{dataset_id}.historical_event_telemetry"
    schema_telemetry = [
        bigquery.SchemaField("renewables_share", "FLOAT64", mode="REQUIRED"),
        bigquery.SchemaField("transit_inclusivity", "FLOAT64", mode="REQUIRED"),
        bigquery.SchemaField("circular_economy_rate", "FLOAT64", mode="REQUIRED"),
        bigquery.SchemaField("spectator_count", "INT64", mode="REQUIRED"),
        bigquery.SchemaField("carbon_footprint", "FLOAT64", mode="REQUIRED"),
        bigquery.SchemaField("event_status", "STRING", mode="REQUIRED"),
    ]
    
    table_telemetry = bigquery.Table(telemetry_table_id, schema=schema_telemetry)
    try:
        client.delete_table(telemetry_table_id, not_found_ok=True)
        client.create_table(table_telemetry)
        print(f"Table {telemetry_table_id} created.")
    except Exception as e:
        print(f"Error creating table: {e}")

    # Seed historical telemetry (15 events)
    # formula: carbon = 86000 - (renewables/100)*20000 - (transit/100)*35000 - (recycling/100)*8000 + (spectator_count - 50000)*0.5 + noise
    telemetry_rows = []
    for i in range(15):
        renewables = random.randint(10, 95)
        transit = random.randint(20, 95)
        recycling = random.randint(10, 85)
        spectators = random.randint(20000, 80000)
        
        base_carbon = 86000 - (renewables / 100.0) * 20000 - (transit / 100.0) * 35000 - (recycling / 100.0) * 8000
        attendance_adjustment = (spectators - 50000) * 0.4
        noise = random.uniform(-1500, 1500)
        carbon = round(max(10000, base_carbon + attendance_adjustment + noise), 1)
        
        telemetry_rows.append({
            "renewables_share": float(renewables),
            "transit_inclusivity": float(transit),
            "circular_economy_rate": float(recycling),
            "spectator_count": int(spectators),
            "carbon_footprint": float(carbon),
            "event_status": "COMPLETED"
        })

    try:
        # Write to a CSV string
        f = io.StringIO()
        writer = csv.writer(f)
        # Write header
        writer.writerow(["renewables_share", "transit_inclusivity", "circular_economy_rate", "spectator_count", "carbon_footprint", "event_status"])
        for r in telemetry_rows:
            writer.writerow([r["renewables_share"], r["transit_inclusivity"], r["circular_economy_rate"], r["spectator_count"], r["carbon_footprint"], r["event_status"]])
        
        f.seek(0)
        
        # Load into BigQuery via Load Job
        job_config = bigquery.LoadJobConfig(
            source_format=bigquery.SourceFormat.CSV,
            skip_leading_rows=1,
            autodetect=False,
        )
        load_job = client.load_table_from_file(f, telemetry_table_id, job_config=job_config)
        load_job.result()
        print("Successfully loaded historical event telemetry rows via Load Job.")
    except Exception as e:
        print(f"Error loading telemetry rows: {e}")

    # 3. Create venue_power_readings Table
    power_table_id = f"{dataset_id}.venue_power_readings"
    schema_power = [
        bigquery.SchemaField("timestamp", "TIMESTAMP", mode="REQUIRED"),
        bigquery.SchemaField("grid_power_kw", "FLOAT64", mode="REQUIRED"),
        bigquery.SchemaField("venue_id", "STRING", mode="REQUIRED"),
    ]
    
    table_power = bigquery.Table(power_table_id, schema=schema_power)
    try:
        client.delete_table(power_table_id, not_found_ok=True)
        client.create_table(table_power)
        print(f"Table {power_table_id} created.")
    except Exception as e:
        print(f"Error creating table: {e}")

    # Seed hourly readings for past 14 days (336 hours) for 4 venues
    venues = ["node-1", "node-2", "node-3", "node-4"]
    power_rows = []
    now = datetime.datetime.now(datetime.timezone.utc)
    
    # Let's generate a synthetic load curve
    for venue in venues:
        # Venue-specific characteristics
        base_load = 200.0 if venue == "node-3" else (400.0 if venue == "node-2" else 300.0)
        peak_amp = 100.0 if venue == "node-3" else (300.0 if venue == "node-2" else 150.0)
        
        for hour_back in range(14 * 24):
            ts = now - datetime.timedelta(hours=hour_back)
            hour_of_day = ts.hour
            # High usage in the evening (17:00 to 22:00)
            time_factor = math.sin((hour_of_day - 6) * math.pi / 12)  # Peak around 18:00
            load = base_load + peak_amp * (time_factor + 1.0) / 2.0
            # Add random noise
            load += random.uniform(-20, 20)
            load = round(max(50.0, load), 1)
            
            power_rows.append({
                "timestamp": ts.isoformat(),
                "grid_power_kw": float(load),
                "venue_id": venue
            })

    try:
        # Write to a CSV string
        f = io.StringIO()
        writer = csv.writer(f)
        writer.writerow(["timestamp", "grid_power_kw", "venue_id"])
        for r in power_rows:
            writer.writerow([r["timestamp"], r["grid_power_kw"], r["venue_id"]])
        
        f.seek(0)
        
        # Load into BigQuery via Load Job
        job_config = bigquery.LoadJobConfig(
            source_format=bigquery.SourceFormat.CSV,
            skip_leading_rows=1,
            autodetect=False,
        )
        load_job = client.load_table_from_file(f, power_table_id, job_config=job_config)
        load_job.result()
        print(f"Successfully loaded {len(power_rows)} hourly venue power readings via Load Job.")
    except Exception as e:
        print(f"Error loading power readings: {e}")

    # 4. Train Model 1: Carbon Emissions Linear Regression
    print("Training Model 1: carbon_prediction_model (Linear Regression)...")
    q_model1 = f"""
    CREATE OR REPLACE MODEL `{dataset_id}.carbon_prediction_model`
    OPTIONS(
      model_type='linear_reg',
      input_label_cols=['carbon_footprint']
    ) AS
    SELECT 
      renewables_share,
      transit_inclusivity,
      circular_economy_rate,
      spectator_count,
      carbon_footprint
    FROM 
      `{telemetry_table_id}`
    WHERE
      event_status = 'COMPLETED';
    """
    try:
        query_job = client.query(q_model1)
        query_job.result()  # Wait for training to complete
        print("Model 1 trained successfully.")
    except Exception as e:
        print(f"Error training Model 1: {e}")

    # 5. Train Model 2: Substation Energy Demand ARIMA Time Series
    print("Training Model 2: energy_demand_forecast (ARIMA)...")
    q_model2 = f"""
    CREATE OR REPLACE MODEL `{dataset_id}.energy_demand_forecast`
    OPTIONS(
      model_type='ARIMA_PLUS',
      time_series_timestamp_col='timestamp',
      time_series_data_col='grid_power_kw',
      time_series_id_col='venue_id'
    ) AS
    SELECT 
      timestamp,
      grid_power_kw,
      venue_id
    FROM 
      `{power_table_id}`
    WHERE 
      timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 14 DAY);
    """
    try:
        query_job = client.query(q_model2)
        query_job.result()  # Wait for training to complete
        print("Model 2 trained successfully.")
    except Exception as e:
        print(f"Error training Model 2: {e}")

if __name__ == "__main__":
    seed_bigquery()
