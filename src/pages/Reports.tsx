
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import FraudChart from '@/components/ui-custom/FraudChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { comparisonChartData, timeSeriesData, fraudStats } from '@/utils/mockData';
import { ChartDataPoint } from '@/utils/types';
import { 
  ListIcon, 
  BarChart3Icon, 
  LineChartIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CreditCardIcon,
  SmartphoneIcon,
  StoreIcon,
  ServerIcon,
} from 'lucide-react';

const Reports = () => {
  // Define payment channel chart data
  const channelChartData: ChartDataPoint[] = [
    { name: 'Web', predicted: 185, actual: 201 },
    { name: 'Mobile', predicted: 160, actual: 143 },
    { name: 'In Store', predicted: 75, actual: 64 },
    { name: 'API', predicted: 110, actual: 102 },
  ];

  const confusionMatrix = [
    { name: 'True Negative', value: '4498', icon: <CheckCircleIcon className="w-4 h-4 text-fraud-low" />, desc: 'Correctly identified as legitimate' },
    { name: 'False Positive', value: '68', icon: <XCircleIcon className="w-4 h-4 text-fraud-medium" />, desc: 'Incorrectly flagged as fraudulent' },
    { name: 'False Negative', value: '119', icon: <XCircleIcon className="w-4 h-4 text-fraud-high" />, desc: 'Missed fraud cases' },
    { name: 'True Positive', value: '723', icon: <AlertTriangleIcon className="w-4 h-4 text-fraud-high" />, desc: 'Correctly detected fraud' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-up [animation-delay:100ms]">Reports</h1>
          <p className="text-muted-foreground mt-1 animate-slide-up [animation-delay:200ms]">
            View fraud analytics and metrics
          </p>
        </div>

        <div className="animate-slide-up [animation-delay:300ms]">
          <Tabs defaultValue="charts">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart3Icon className="w-4 h-4" />
                Charts & Trends
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <ListIcon className="w-4 h-4" />
                Performance Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="charts" className="pt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FraudChart
                  title="Fraud by Payment Method"
                  description="Predicted vs actual fraud cases"
                  type="comparison"
                  data={comparisonChartData}
                />
                <FraudChart
                  title="Fraud by Channel"
                  description="Predicted vs actual fraud cases"
                  type="comparison"
                  data={channelChartData}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fraud Trend Over Time</CardTitle>
                  <CardDescription>Number of fraudulent transactions detected daily</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <FraudChart
                      title=""
                      type="timeSeries"
                      data={timeSeriesData}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Credit Card</p>
                        <p className="text-2xl font-bold">42%</p>
                        <p className="text-xs text-muted-foreground mt-1">of all fraud</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <CreditCardIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Mobile Channel</p>
                        <p className="text-2xl font-bold">38%</p>
                        <p className="text-xs text-muted-foreground mt-1">of all fraud</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <SmartphoneIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">In-Store</p>
                        <p className="text-2xl font-bold">12%</p>
                        <p className="text-xs text-muted-foreground mt-1">of all fraud</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <StoreIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">API Transactions</p>
                        <p className="text-2xl font-bold">8%</p>
                        <p className="text-xs text-muted-foreground mt-1">of all fraud</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-full">
                        <ServerIcon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="pt-4 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Confusion Matrix</CardTitle>
                    <CardDescription>Evaluation of prediction accuracy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {confusionMatrix.map((item) => (
                        <Card key={item.name} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="bg-secondary p-3 rounded-full">
                                {item.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                                <p className="text-2xl font-bold">{item.value}</p>
                                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Fraud detection performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Accuracy</span>
                          <span className="text-sm font-medium">{Math.round(fraudStats.accuracy * 100)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${fraudStats.accuracy * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Overall correctness of predictions</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Precision</span>
                          <span className="text-sm font-medium">{Math.round(fraudStats.precision * 100)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${fraudStats.precision * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Accuracy of positive predictions</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Recall</span>
                          <span className="text-sm font-medium">{Math.round(fraudStats.recall * 100)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${fraudStats.recall * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Ability to find all fraud cases</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">F1 Score</span>
                          <span className="text-sm font-medium">88%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Balance between precision and recall</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Statistics Summary</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                        <p className="text-3xl font-bold">5,289</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-fraud-low">+12.4%</span>
                          <span className="text-xs text-muted-foreground">vs. previous month</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Fraud</p>
                        <p className="text-3xl font-bold">{fraudStats.total}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-fraud-high">+3.8%</span>
                          <span className="text-xs text-muted-foreground">vs. previous month</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Detected Fraud</p>
                        <p className="text-3xl font-bold">{fraudStats.detected}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-fraud-low">+5.2%</span>
                          <span className="text-xs text-muted-foreground">vs. previous month</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Missed Fraud</p>
                        <p className="text-3xl font-bold">{fraudStats.missed}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-fraud-low">-2.7%</span>
                          <span className="text-xs text-muted-foreground">vs. previous month</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
