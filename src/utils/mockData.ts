
import { Transaction, ChartDataPoint, TimeSeriesDataPoint, FraudStats, MetricData } from './types';

// Generate mock transaction data
export const generateMockTransactions = (count: number): Transaction[] => {
  const paymentMethods = ['credit_card', 'debit_card', 'bank_transfer', 'digital_wallet', 'crypto'];
  const paymentChannels = ['web', 'mobile', 'in_store', 'api'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
  const fraudReasons = [
    'suspicious_location',
    'unusual_amount',
    'velocity_check_failed',
    'known_fraud_pattern',
    'device_fingerprint_mismatch',
    'multiple_declined_attempts'
  ];
  
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const isFraud = Math.random() < 0.15; // 15% fraud rate
    const fraudScore = isFraud ? 
      Math.floor(Math.random() * 30) + 70 : // 70-100 for fraud
      Math.floor(Math.random() * 40); // 0-40 for non-fraud
    
    const dayOffset = Math.floor(Math.random() * 30);
    const hourOffset = Math.floor(Math.random() * 24);
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    date.setHours(date.getHours() - hourOffset);
    
    transactions.push({
      transaction_id: `TX${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      timestamp: date.toISOString(),
      amount: parseFloat((Math.random() * 10000).toFixed(2)),
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      payer_id: `PAYER${Math.floor(Math.random() * 1000)}`,
      payee_id: `PAYEE${Math.floor(Math.random() * 100)}`,
      payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      payment_channel: paymentChannels[Math.floor(Math.random() * paymentChannels.length)],
      is_fraud: isFraud,
      fraud_score: fraudScore,
      ...(isFraud && {
        fraud_source: Math.random() > 0.5 ? 'rule_engine' : 'ml_model',
        fraud_reason: fraudReasons[Math.floor(Math.random() * fraudReasons.length)]
      })
    });
  }
  
  // Sort by timestamp, newest first
  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Sample transactions for immediate use
export const sampleTransactions = generateMockTransactions(100);

// Generate comparison chart data
export const comparisonChartData: ChartDataPoint[] = [
  { name: 'Credit Card', predicted: 245, actual: 270 },
  { name: 'Debit Card', predicted: 180, actual: 165 },
  { name: 'Bank Transfer', predicted: 120, actual: 90 },
  { name: 'Digital Wallet', predicted: 95, actual: 85 },
  { name: 'Crypto', predicted: 65, actual: 45 },
];

// Generate time series data
export const generateTimeSeriesData = (days: number): TimeSeriesDataPoint[] => {
  const result: TimeSeriesDataPoint[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Create some patterns in the data
    let baseValue = 50 + Math.sin(i / 5) * 20;
    
    // Add weekly pattern
    if (date.getDay() === 0 || date.getDay() === 6) {
      baseValue *= 0.7; // Less fraud on weekends
    }
    
    // Add some randomness
    const value = Math.max(0, Math.floor(baseValue + (Math.random() * 30 - 15)));
    
    result.push({
      date: date.toISOString().split('T')[0],
      value
    });
  }
  
  return result;
};

export const timeSeriesData = generateTimeSeriesData(30);

// Fraud statistics
export const fraudStats: FraudStats = {
  total: 842,
  detected: 723,
  missed: 119,
  falsePositives: 68,
  accuracy: 0.87,
  precision: 0.91,
  recall: 0.86
};

// Key metrics for the dashboard
export const keyMetrics: MetricData[] = [
  {
    label: 'Total Transactions',
    value: '5,289',
    change: 12.4,
    changeLabel: 'vs. last month'
  },
  {
    label: 'Fraud Detection Rate',
    value: '86%',
    change: 3.2,
    changeLabel: 'vs. last month'
  },
  {
    label: 'Avg. Response Time',
    value: '87ms',
    change: -12.5,
    changeLabel: 'vs. last month'
  },
  {
    label: 'False Positives',
    value: '2.6%',
    change: -0.8,
    changeLabel: 'vs. last month'
  }
];
