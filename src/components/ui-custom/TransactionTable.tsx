
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, AlertTriangleIcon, CheckCircleIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from '@/utils/types';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { reportFraud } from '@/utils/api';

interface TransactionTableProps {
  data: Transaction[];
  isLoading?: boolean;
  className?: string;
  onRowClick?: (transaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ 
  data, 
  isLoading = false,
  className,
  onRowClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredData = searchQuery 
    ? data.filter(tx => 
        tx.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.payer_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.payee_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;
    
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const getFraudScoreClass = (score: number) => {
    if (score >= 70) return "fraud-score-high";
    if (score >= 40) return "fraud-score-medium";
    return "fraud-score-low";
  };
  
  const handleReportFraud = async (e: React.MouseEvent, transactionId: string) => {
    e.stopPropagation();
    
    try {
      await reportFraud({
        transaction_id: transactionId,
        reporting_entity_id: "USER_REPORT",
        fraud_details: "Manually reported as fraudulent"
      });
      
      toast.success("Transaction reported as fraudulent");
    } catch (error) {
      console.error("Error reporting fraud:", error);
      toast.error("Failed to report transaction");
    }
  };
  
  return (
    <Card className={cn("overflow-hidden animate-fade-in", className)}>
      <CardHeader className="py-4 px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Transactions</CardTitle>
          <div className="relative w-full sm:w-72">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Transaction ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payer ID</TableHead>
                <TableHead>Payee ID</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-center">Fraud Score</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell colSpan={9}>
                      <div className="h-12 bg-muted rounded-md"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((transaction) => (
                  <TableRow 
                    key={transaction.transaction_id}
                    className={cn(
                      "transition-colors hover:bg-secondary/50 cursor-pointer", 
                      transaction.is_fraud && "bg-destructive/5 hover:bg-destructive/10"
                    )}
                    onClick={() => onRowClick && onRowClick(transaction)}
                  >
                    <TableCell className="font-medium">{transaction.transaction_id}</TableCell>
                    <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount, transaction.currency)}</TableCell>
                    <TableCell>{transaction.payer_id}</TableCell>
                    <TableCell>{transaction.payee_id}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">
                        {transaction.payment_method.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "font-medium", 
                          getFraudScoreClass(transaction.fraud_score)
                        )}
                      >
                        {transaction.fraud_score}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.is_fraud ? (
                        <div className="inline-flex items-center">
                          <AlertTriangleIcon className="h-4 w-4 text-destructive mr-1" />
                          <span className="text-destructive font-medium">Fraud</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-fraud-low mr-1" />
                          <span className="text-fraud-low font-medium">Valid</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => handleReportFraud(e, transaction.transaction_id)}>
                            Report as Fraud
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            toast.info("Transaction details copied to clipboard");
                          }}>
                            Copy Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
