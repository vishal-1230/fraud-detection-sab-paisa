
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartDataPoint, TimeSeriesDataPoint } from '@/utils/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface FraudChartProps {
  title: string;
  description?: string;
  type: 'comparison' | 'timeSeries';
  data: ChartDataPoint[] | TimeSeriesDataPoint[];
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  type: 'comparison' | 'timeSeries';
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, type }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-background border border-border p-3 rounded-md shadow-md text-sm animate-fade-in">
      <p className="font-medium mb-1">{label}</p>
      {type === 'comparison' ? (
        <>
          <p className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span>Predicted: </span>
            <span className="font-medium ml-1">{payload[0].value}</span>
          </p>
          <p className="flex items-center mt-1">
            <span className="h-2 w-2 rounded-full bg-destructive mr-2"></span>
            <span>Actual: </span>
            <span className="font-medium ml-1">{payload[1].value}</span>
          </p>
        </>
      ) : (
        <p className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
          <span>Fraud Transactions: </span>
          <span className="font-medium ml-1">{payload[0].value}</span>
        </p>
      )}
    </div>
  );
};

const FraudChart: React.FC<FraudChartProps> = ({ 
  title, 
  description, 
  type, 
  data,
  className
}) => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Filter time series data based on selected range
  const filteredTimeSeriesData = (type === 'timeSeries') 
    ? (data as TimeSeriesDataPoint[]).slice(-(timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90))
    : data;
  
  return (
    <Card className={cn("h-full overflow-hidden animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          
          {type === 'comparison' ? (
            <div className="min-w-32">
              <Tabs defaultValue="bar" onValueChange={(v) => setChartType(v as 'bar' | 'line')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bar">Bar</TabsTrigger>
                  <TabsTrigger value="line">Line</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          ) : (
            <div className="min-w-32">
              <Select defaultValue="30d" onValueChange={(v) => setTimeRange(v as '7d' | '30d' | '90d')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-80 w-full px-2">
          {type === 'comparison' ? (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={data as ChartDataPoint[]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs" 
                    tick={{ fill: 'var(--muted-foreground)' }}
                  />
                  <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip content={<CustomTooltip type="comparison" />} />
                  <Legend />
                  <Bar dataKey="predicted" name="Predicted Fraud" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual Fraud" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart
                  data={data as ChartDataPoint[]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs" 
                    tick={{ fill: 'var(--muted-foreground)' }}
                  />
                  <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <Tooltip content={<CustomTooltip type="comparison" />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    name="Predicted Fraud" 
                    stroke="hsl(var(--primary))" 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Fraud" 
                    stroke="hsl(var(--destructive))" 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredTimeSeriesData as TimeSeriesDataPoint[]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs" 
                  tick={{ fill: 'var(--muted-foreground)' }}
                />
                <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                <Tooltip content={<CustomTooltip type="timeSeries" />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Fraud Transactions" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.2)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudChart;
