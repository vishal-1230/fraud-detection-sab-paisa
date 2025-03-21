
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/Dashboard';
import TransactionTable from '@/components/ui-custom/TransactionTable';
import { Transaction } from '@/utils/types';
import { getTransactions } from '@/utils/api';
import { toast } from "sonner";
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CalendarIcon, SearchIcon, FilterIcon, AlertTriangleIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { reportFraud } from '@/utils/api';

const Transactions = () => {
  const location = useLocation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [reportingReason, setReportingReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter states
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [payerId, setPayerId] = useState('');
  const [payeeId, setPayeeId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFraudulent, setOnlyFraudulent] = useState(false);
  
  // Track if filters are applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const fetchedTransactions = await getTransactions({
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          payerId,
          payeeId,
          paymentMethod: paymentMethod || undefined,
          isOnlyFraud: onlyFraudulent,
          searchQuery
        });
        setTransactions(fetchedTransactions);
        
        // Check if we need to highlight a specific transaction from navigation
        const transactionId = location.state?.transactionId;
        if (transactionId) {
          const transaction = fetchedTransactions.find(tx => tx.transaction_id === transactionId);
          if (transaction) {
            setSelectedTransaction(transaction);
            setShowDialog(true);
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [filtersApplied, location.state?.transactionId]);

  const handleApplyFilters = () => {
    setFiltersApplied(!filtersApplied);
  };

  const handleResetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setPayerId('');
    setPayeeId('');
    setPaymentMethod('');
    setSearchQuery('');
    setOnlyFraudulent(false);
    setFiltersApplied(!filtersApplied);
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDialog(true);
  };

  const handleSubmitReport = async () => {
    if (!selectedTransaction) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await reportFraud({
        transaction_id: selectedTransaction.transaction_id,
        reporting_entity_id: "USER_REPORTED",
        fraud_details: reportingReason
      });
      
      if (response.reporting_acknowledged) {
        toast.success("Fraud report submitted successfully");
        setShowDialog(false);
        setReportingReason('');
        // Refresh the transactions
        setFiltersApplied(!filtersApplied);
      } else {
        toast.error(`Report failed: ${response.failure_code}`);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit fraud report");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPpp');
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getFraudScoreClass = (score: number) => {
    if (score >= 70) return "fraud-score-high text-fraud-high";
    if (score >= 40) return "fraud-score-medium text-fraud-medium";
    return "fraud-score-low text-fraud-low";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-up [animation-delay:100ms]">Transactions</h1>
          <p className="text-muted-foreground mt-1 animate-slide-up [animation-delay:200ms]">
            View and filter transaction data
          </p>
        </div>

        <Card className="animate-slide-up [animation-delay:300ms]">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payer-id">Payer ID</Label>
                  <Input 
                    id="payer-id" 
                    placeholder="Enter payer ID" 
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payee-id">Payee ID</Label>
                  <Input 
                    id="payee-id" 
                    placeholder="Enter payee ID" 
                    value={payeeId}
                    onChange={(e) => setPayeeId(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="All payment methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All methods</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="debit_card">Debit Card</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="search" 
                      placeholder="Transaction ID, payer, payee" 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-end gap-4">
                  <Button 
                    onClick={handleApplyFilters}
                    className="flex-1"
                  >
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleResetFilters}
                  >
                    Reset
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="fraud-only"
                      className="rounded border-input h-4 w-4 text-primary focus:ring-primary"
                      checked={onlyFraudulent}
                      onChange={(e) => setOnlyFraudulent(e.target.checked)}
                    />
                    <Label htmlFor="fraud-only" className="cursor-pointer">
                      <AlertTriangleIcon className="h-4 w-4 text-destructive inline mr-1" />
                      Fraud only
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="animate-slide-up [animation-delay:400ms]">
          <TransactionTable 
            data={transactions} 
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      
      {/* Transaction Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Detailed information about this transaction
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Transaction ID</h4>
                  <p className="text-lg font-medium">{selectedTransaction.transaction_id}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date & Time</h4>
                  <p className="text-lg font-medium">{formatDate(selectedTransaction.timestamp)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                  <p className="text-lg font-medium">{formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  {selectedTransaction.is_fraud ? (
                    <Badge variant="destructive" className="mt-1">Fraudulent</Badge>
                  ) : (
                    <Badge variant="secondary" className="mt-1 bg-fraud-low/10 text-fraud-low hover:bg-fraud-low/20 border-fraud-low/20">Valid</Badge>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Fraud Score</h4>
                  <p className={cn("text-lg font-medium", getFraudScoreClass(selectedTransaction.fraud_score))}>
                    {selectedTransaction.fraud_score}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Fraud Source</h4>
                  <p className="text-lg font-medium">
                    {selectedTransaction.fraud_source 
                      ? selectedTransaction.fraud_source.replace('_', ' ')
                      : 'N/A'}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Payer ID</h4>
                  <p className="text-lg font-medium">{selectedTransaction.payer_id}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Payee ID</h4>
                  <p className="text-lg font-medium">{selectedTransaction.payee_id}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Payment Method</h4>
                  <p className="text-lg font-medium">{selectedTransaction.payment_method.replace('_', ' ')}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Payment Channel</h4>
                  <p className="text-lg font-medium">{selectedTransaction.payment_channel.replace('_', ' ')}</p>
                </div>
              </div>
              
              {selectedTransaction.is_fraud && selectedTransaction.fraud_reason && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Fraud Reason</h4>
                    <p className="text-lg font-medium">
                      {selectedTransaction.fraud_reason.replace('_', ' ')}
                    </p>
                  </div>
                </>
              )}
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Report as Fraudulent</h4>
                <Textarea 
                  placeholder="Enter details about why you believe this transaction is fraudulent..." 
                  value={reportingReason}
                  onChange={(e) => setReportingReason(e.target.value)}
                  className="resize-none h-24"
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitReport} 
                  disabled={isSubmitting || reportingReason.trim().length === 0}
                  className="ml-2"
                >
                  Submit Report
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Transactions;
