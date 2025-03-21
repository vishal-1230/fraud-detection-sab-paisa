
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import StatCard from '@/components/ui-custom/StatCard';
import TransactionTable from '@/components/ui-custom/TransactionTable';
import FraudChart from '@/components/ui-custom/FraudChart';
import { Transaction } from '@/utils/types';
import { getTransactions } from '@/utils/api';
import { keyMetrics, comparisonChartData, timeSeriesData } from '@/utils/mockData';
import { toast } from "sonner";
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestTransactions = async () => {
      try {
        setIsLoading(true);
        const latestTransactions = await getTransactions();
        setTransactions(latestTransactions.slice(0, 5));
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestTransactions();
  }, []);

  const handleRowClick = (transaction: Transaction) => {
    navigate(`/transactions`, { state: { transactionId: transaction.transaction_id } });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-up [animation-delay:100ms]">Dashboard</h1>
          <p className="text-muted-foreground mt-1 animate-slide-up [animation-delay:200ms]">
            Monitor fraud detection metrics and recent transactions
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slide-up [animation-delay:300ms]">
          {keyMetrics.map((metric, index) => (
            <StatCard 
              key={metric.label} 
              data={metric} 
              className="[animation-delay:400ms]"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up [animation-delay:500ms]">
          <FraudChart
            title="Fraud by Payment Method"
            description="Predicted vs actual fraud cases"
            type="comparison"
            data={comparisonChartData}
          />
          <FraudChart
            title="Fraud Trend"
            description="Number of fraud transactions over time"
            type="timeSeries"
            data={timeSeriesData}
          />
        </div>

        <div className="space-y-6 animate-slide-up [animation-delay:600ms]">
          <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
          <TransactionTable 
            data={transactions} 
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
          
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/transactions')}
              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors"
            >
              View all transactions
            </button>
          </div>
        </div>

        <div className="space-y-6 animate-slide-up [animation-delay:700ms]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">System Performance</h2>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Accuracy</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold mr-1">87%</span>
                  </div>
                  <Separator className="my-2" />
                  <span className="text-xs text-muted-foreground">
                    Correct predictions / Total predictions
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Precision</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold mr-1">91%</span>
                  </div>
                  <Separator className="my-2" />
                  <span className="text-xs text-muted-foreground">
                    True positives / (True positives + False positives)
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Recall</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold mr-1">86%</span>
                  </div>
                  <Separator className="my-2" />
                  <span className="text-xs text-muted-foreground">
                    True positives / (True positives + False negatives)
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">F1 Score</span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold mr-1">88%</span>
                  </div>
                  <Separator className="my-2" />
                  <span className="text-xs text-muted-foreground">
                    2 × (Precision × Recall) / (Precision + Recall)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
