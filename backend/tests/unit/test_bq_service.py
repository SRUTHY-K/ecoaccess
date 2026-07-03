from unittest.mock import patch, MagicMock
from services.bq_service import predict_carbon_emissions_bq, forecast_energy_demand_bq

@patch("services.bq_service.bigquery.Client")
def test_predict_carbon_emissions_bq_success(mock_bq_client_class):
    mock_client = MagicMock()
    mock_query_job = MagicMock()
    mock_row = {"predicted_carbon_footprint": 12345.6}
    mock_query_job.result.return_value = [mock_row]
    mock_client.query.return_value = mock_query_job
    mock_bq_client_class.return_value = mock_client
    
    val = predict_carbon_emissions_bq(50, 60, 40, 50000)
    assert val == 12345.6

@patch("services.bq_service.bigquery.Client")
def test_predict_carbon_emissions_bq_fallback(mock_bq_client_class):
    # Triggers exception on Client creation, running fallback formula
    mock_bq_client_class.side_effect = Exception("BigQuery client initialization failed")
    # base = 86000 - 0.5*20000 - 0.6*35000 - 0.4*8000 = 86000 - 10000 - 21000 - 3200 = 51800.0
    val = predict_carbon_emissions_bq(50, 60, 40, 50000)
    assert val == 51800.0

@patch("services.bq_service.bigquery.Client")
def test_forecast_energy_demand_bq_success(mock_bq_client_class):
    mock_client = MagicMock()
    mock_query_job = MagicMock()
    mock_row = {"hour_of_day": 22, "total_grid_kw": 750.5}
    mock_query_job.result.return_value = [mock_row]
    mock_client.query.return_value = mock_query_job
    mock_bq_client_class.return_value = mock_client
    
    val = forecast_energy_demand_bq()
    assert len(val) == 1
    assert val[0]["time"] == "22:00"
    assert val[0]["value"] == 750.5

@patch("services.bq_service.bigquery.Client")
def test_forecast_energy_demand_bq_fallback(mock_bq_client_class):
    # Triggers exception on Client creation, running mock fallback values
    mock_bq_client_class.side_effect = Exception("BigQuery client initialization failed")
    val = forecast_energy_demand_bq()
    assert len(val) == 4
    assert val[0]["time"] == "18:00"
    assert val[0]["value"] == 680.0

