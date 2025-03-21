
import { toast } from "sonner";
import { Transaction, FraudDetectionResponse, FraudReportRequest, FraudReportResponse } from "./types";
import { sampleTransactions } from "./mockData";

// Simulated API call delay
const apiDelay = (min = 100, max = 300) => {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
};

// Get transactions with filtering options
export const getTransactions = async (
  filters: {
    startDate?: string;
    endDate?: string;
    payerId?: string;
    payeeId?: string;
    isOnlyFraud?: boolean;
    paymentMethod?: string;
    paymentChannel?: string;
    searchQuery?: string;
  } = {}
): Promise<Transaction[]> => {
  try {
    // Simulate API call
    await apiDelay();
    
    // Apply filters to sample transactions
    let filtered = [...sampleTransactions];
    
    if (filters.startDate) {
      filtered = filtered.filter(tx => 
        new Date(tx.timestamp) >= new Date(filters.startDate as string)
      );
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(tx => 
        new Date(tx.timestamp) <= new Date(filters.endDate as string)
      );
    }
    
    if (filters.payerId) {
      filtered = filtered.filter(tx => 
        tx.payer_id.toLowerCase().includes(filters.payerId!.toLowerCase())
      );
    }
    
    if (filters.payeeId) {
      filtered = filtered.filter(tx => 
        tx.payee_id.toLowerCase().includes(filters.payeeId!.toLowerCase())
      );
    }
    
    if (filters.isOnlyFraud) {
      filtered = filtered.filter(tx => tx.is_fraud);
    }
    
    if (filters.paymentMethod) {
      filtered = filtered.filter(tx => 
        tx.payment_method === filters.paymentMethod
      );
    }
    
    if (filters.paymentChannel) {
      filtered = filtered.filter(tx => 
        tx.payment_channel === filters.paymentChannel
      );
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.transaction_id.toLowerCase().includes(query) ||
        tx.payer_id.toLowerCase().includes(query) ||
        tx.payee_id.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    toast.error("Failed to fetch transactions");
    return [];
  }
};

// Get a single transaction by ID
export const getTransactionById = async (id: string): Promise<Transaction | null> => {
  try {
    await apiDelay();
    const transaction = sampleTransactions.find(tx => tx.transaction_id === id);
    return transaction || null;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    toast.error("Failed to fetch transaction");
    return null;
  }
};

// Detect fraud for a single transaction
export const detectFraud = async (transaction: Transaction): Promise<FraudDetectionResponse> => {
  try {
    await apiDelay();
    
    // Simulate fraud detection logic
    const isFraud = Math.random() < 0.15;
    const fraudScore = isFraud ? 
      Math.floor(Math.random() * 30) + 70 : 
      Math.floor(Math.random() * 40);
    
    const fraudReasons = [
      'suspicious_location',
      'unusual_amount',
      'velocity_check_failed',
      'known_fraud_pattern'
    ];
    
    return {
      transaction_id: transaction.transaction_id,
      is_fraud: isFraud,
      fraud_score: fraudScore,
      ...(isFraud && {
        fraud_source: Math.random() > 0.5 ? 'rule_engine' : 'ml_model',
        fraud_reason: fraudReasons[Math.floor(Math.random() * fraudReasons.length)]
      })
    };
  } catch (error) {
    console.error("Error detecting fraud:", error);
    toast.error("Failed to detect fraud");
    return {
      transaction_id: transaction.transaction_id,
      is_fraud: false,
      fraud_score: 0
    };
  }
};

// Detect fraud for multiple transactions (batch)
export const detectFraudBatch = async (transactions: Transaction[]): Promise<FraudDetectionResponse[]> => {
  try {
    await apiDelay(300, 800); // Slightly longer for batch
    
    return Promise.all(transactions.map(tx => detectFraud(tx)));
  } catch (error) {
    console.error("Error detecting fraud in batch:", error);
    toast.error("Failed to process batch fraud detection");
    return transactions.map(tx => ({
      transaction_id: tx.transaction_id,
      is_fraud: false,
      fraud_score: 0
    }));
  }
};

// Report a transaction as fraudulent
export const reportFraud = async (report: FraudReportRequest): Promise<FraudReportResponse> => {
  try {
    await apiDelay();
    
    // Simulate API success (95% success rate)
    const isSuccess = Math.random() < 0.95;
    
    if (!isSuccess) {
      throw new Error("Simulated server error");
    }
    
    toast.success("Fraud report submitted successfully");
    
    return {
      transaction_id: report.transaction_id,
      reporting_acknowledged: true
    };
  } catch (error) {
    console.error("Error reporting fraud:", error);
    toast.error("Failed to submit fraud report");
    
    return {
      transaction_id: report.transaction_id,
      reporting_acknowledged: false,
      failure_code: "SERVER_ERROR"
    };
  }
};
