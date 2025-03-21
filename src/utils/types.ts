
export type FraudScore = 'low' | 'medium' | 'high';

export interface Transaction {
  transaction_id: string;
  timestamp: string;
  amount: number;
  currency: string;
  payer_id: string;
  payee_id: string;
  payment_method: string;
  payment_channel: string;
  is_fraud: boolean;
  fraud_score: number; // 0-100
  fraud_source?: string;
  fraud_reason?: string;
}

export interface FraudDetectionResponse {
  transaction_id: string;
  is_fraud: boolean;
  fraud_source?: string;
  fraud_reason?: string;
  fraud_score: number;
}

export interface FraudReportRequest {
  transaction_id: string;
  reporting_entity_id: string;
  fraud_details: string;
}

export interface FraudReportResponse {
  transaction_id: string;
  reporting_acknowledged: boolean;
  failure_code?: string;
}

export interface MetricData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}

export interface ChartDataPoint {
  name: string;
  predicted: number;
  actual: number;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface FraudStats {
  total: number;
  detected: number;
  missed: number;
  falsePositives: number;
  accuracy: number;
  precision: number;
  recall: number;
}
