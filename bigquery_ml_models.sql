-- =========================================================================
-- ECOACCESS SMART ARENA - BIGQUERY ML PREDICTIVE MODEL SCHEMA
-- =========================================================================

-- -------------------------------------------------------------------------
-- MODEL 1: EVENT CARBON EMISSIONS FORECAST (Linear Regression)
-- Predicts total event carbon footprint based on renewables, transit, 
-- circular economy rates, and expected spectator attendance.
-- -------------------------------------------------------------------------

-- 1. Create or train the model using historical event data
CREATE OR REPLACE MODEL `ecoaccess_data.carbon_prediction_model`
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
  `ecoaccess_data.historical_event_telemetry`
WHERE
  event_status = 'COMPLETED';

-- 2. Execute Real-Time Predictions inside EcoAccess
-- Evaluates expected carbon footprint when sliders are adjusted
SELECT 
  predicted_carbon_footprint
FROM 
  ML.PREDICT(
    MODEL `ecoaccess_data.carbon_prediction_model`,
    (
      SELECT 
        70 AS renewables_share, 
        80 AS transit_inclusivity, 
        60 AS circular_economy_rate, 
        55000 AS spectator_count
    )
  );


-- -------------------------------------------------------------------------
-- MODEL 2: SUBSTATION ENERGY DEMAND FORECAST (ARIMA Time Series)
-- Forecasts next 4 hours of grid load at Venue C Fan Zone to predict
-- potential grid spikes and activate peak-shaving batteries.
-- -------------------------------------------------------------------------

-- 1. Create the time series forecasting model
CREATE OR REPLACE MODEL `ecoaccess_data.energy_demand_forecast`
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
  `ecoaccess_data.venue_power_readings`
WHERE 
  timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 14 DAY);

-- 2. Forecast peak energy loads for the next 4 hours
SELECT 
  forecast_timestamp,
  forecast_value AS predicted_grid_power_kw,
  prediction_interval_lower_bound,
  prediction_interval_upper_bound
FROM 
  ML.FORECAST(
    MODEL `ecoaccess_data.energy_demand_forecast`,
    STRUCT(4 AS horizon, 0.95 AS confidence_level)
  );
