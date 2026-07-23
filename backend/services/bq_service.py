from google.cloud import bigquery
from core.config import PROJECT_ID

def predict_carbon_emissions_bq(renewables: int, transit: int, recycling: int, attendance: int = 50000) -> float:
    """Queries BigQuery ML.PREDICT to estimate carbon footprint based on parameters."""
    try:
        bq_client = bigquery.Client(project=PROJECT_ID)
        query = f"""
        SELECT predicted_carbon_footprint FROM ML.PREDICT(
            MODEL `{PROJECT_ID}.ecoaccess_data.carbon_prediction_model`,
            (SELECT {renewables} AS renewables_share, {transit} AS transit_inclusivity, {recycling} AS circular_economy_rate, {attendance} AS spectator_count)
        )
        """
        query_job = bq_client.query(query)
        results = list(query_job.result())
        if results:
            return round(results[0]["predicted_carbon_footprint"], 1)
    except Exception as e:
        print(f"BigQuery ML predict error: {e}")
    # Local fallback formula matching the ML coefficient
    base = 86000 - (renewables / 100.0) * 20000 - (transit / 100.0) * 35000 - (recycling / 100.0) * 8000
    return round(base, 1)

def forecast_energy_demand_bq() -> list[dict]:
    """Queries BigQuery ML.FORECAST to predict upcoming energy grid loads.
    ARIMA_PLUS returns one row per (venue_id x horizon step). We aggregate
    by hour bucket, summing load across all venues, for a single total
    grid demand per hour to display in the frontend chart.
    """
    try:
        bq_client = bigquery.Client(project=PROJECT_ID)
        query = f"""
        SELECT
            EXTRACT(HOUR FROM forecast_timestamp) AS hour_of_day,
            SUM(forecast_value) AS total_grid_kw
        FROM ML.FORECAST(
            MODEL `{PROJECT_ID}.ecoaccess_data.energy_demand_forecast`,
            STRUCT(4 AS horizon)
        )
        GROUP BY hour_of_day
        ORDER BY hour_of_day
        LIMIT 4
        """
        query_job = bq_client.query(query)
        results = list(query_job.result())
        return [
            {
                "time": f"{int(r['hour_of_day']):02d}:00",
                "value": round(r["total_grid_kw"], 1)
            }
            for r in results
        ]
    except Exception as e:
        print(f"BigQuery ML forecast error: {e}")
    # Return mock time series if offline
    return [
        {"time": "18:00", "value": 680.0},
        {"time": "19:00", "value": 880.0},
        {"time": "20:00", "value": 750.0},
        {"time": "21:00", "value": 520.0}
    ]
