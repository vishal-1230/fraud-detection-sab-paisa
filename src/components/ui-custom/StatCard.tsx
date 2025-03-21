
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { MetricData } from '@/utils/types';
import { cn } from '@/lib/utils';

interface StatCardProps {
  data: MetricData;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ data, className }) => {
  const isPositiveChange = data.change && data.change > 0;
  const isNegativeChange = data.change && data.change < 0;
  
  // Determine if positive change is good (for most metrics it is, but for some like "False Positives" it's not)
  const isPositiveGood = !data.label.toLowerCase().includes('false') && 
                          !data.label.toLowerCase().includes('time');
  
  const changeTextColor = 
    !data.change ? 'text-muted-foreground' :
    (isPositiveChange && isPositiveGood) || (isNegativeChange && !isPositiveGood) 
      ? 'text-fraud-low' 
      : 'text-fraud-high';
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md animate-fade-in", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{data.label}</p>
          <p className="text-3xl font-bold">{data.value}</p>
          
          {data.change !== undefined && (
            <div className="flex items-center mt-1">
              <div className={cn("flex items-center text-sm font-medium", changeTextColor)}>
                {isPositiveChange && <ArrowUpIcon className="mr-1 h-4 w-4" />}
                {isNegativeChange && <ArrowDownIcon className="mr-1 h-4 w-4" />}
                {Math.abs(data.change)}%
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {data.changeLabel}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
