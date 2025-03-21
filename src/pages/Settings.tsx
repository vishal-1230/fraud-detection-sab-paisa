
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Slider
} from '@/components/ui/slider';
import {
  AlertTriangleIcon,
  CodeIcon,
  ServerIcon,
  BellIcon,
  UsersIcon,
  ShieldIcon,
  SaveIcon
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  // API Settings
  const [apiEndpoint, setApiEndpoint] = useState('https://api.fraud-detection.example.com');
  const [apiKey, setApiKey] = useState('••••••••••••••••');
  const [apiTimeout, setApiTimeout] = useState(300);
  const [apiBatchSize, setApiBatchSize] = useState(100);
  
  // Detection Settings
  const [fraudThreshold, setFraudThreshold] = useState(70);
  const [alertThreshold, setAlertThreshold] = useState(40);
  const [enableAiDetection, setEnableAiDetection] = useState(true);
  const [enableRuleEngine, setEnableRuleEngine] = useState(true);
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXX');
  const [emailRecipients, setEmailRecipients] = useState('alerts@example.com');
  
  const handleSaveSettings = (type: 'api' | 'detection' | 'notification') => {
    // Simulate saving settings
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} settings saved successfully`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-up [animation-delay:100ms]">Settings</h1>
          <p className="text-muted-foreground mt-1 animate-slide-up [animation-delay:200ms]">
            Configure the fraud detection system
          </p>
        </div>

        <div className="animate-slide-up [animation-delay:300ms]">
          <Tabs defaultValue="api">
            <TabsList className="w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="api" className="flex items-center gap-2">
                <ServerIcon className="w-4 h-4" />
                API
              </TabsTrigger>
              <TabsTrigger value="detection" className="flex items-center gap-2">
                <ShieldIcon className="w-4 h-4" />
                Detection
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <BellIcon className="w-4 h-4" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="api" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>
                    Configure the endpoints and credentials for the fraud detection API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input 
                        id="api-endpoint" 
                        placeholder="https://api.example.com" 
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        The base URL for all API requests
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input 
                        id="api-key" 
                        type="password"
                        placeholder="Enter API key" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Authentication key for API requests
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-timeout">API Timeout (ms)</Label>
                      <Input 
                        id="api-timeout" 
                        type="number"
                        min="100"
                        max="5000"
                        value={apiTimeout}
                        onChange={(e) => setApiTimeout(Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum time to wait for API response
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="batch-size">Batch Processing Size</Label>
                      <Input 
                        id="batch-size" 
                        type="number"
                        min="10"
                        max="1000"
                        value={apiBatchSize}
                        onChange={(e) => setApiBatchSize(Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of transactions to process in each batch
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={() => handleSaveSettings('api')} className="w-full sm:w-auto">
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Save API Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                  <CardDescription>
                    Endpoint paths for different API functions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-secondary/50 p-4 rounded-md">
                      <div className="flex items-center gap-2">
                        <CodeIcon className="w-4 h-4 text-primary" />
                        <span className="font-mono text-sm">/api/v1/detect</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Real-time fraud detection for a single transaction
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-md">
                      <div className="flex items-center gap-2">
                        <CodeIcon className="w-4 h-4 text-primary" />
                        <span className="font-mono text-sm">/api/v1/detect/batch</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Batch fraud detection for multiple transactions
                      </p>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-md">
                      <div className="flex items-center gap-2">
                        <CodeIcon className="w-4 h-4 text-primary" />
                        <span className="font-mono text-sm">/api/v1/report</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Report a transaction as fraudulent
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="detection" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Thresholds</CardTitle>
                  <CardDescription>
                    Configure the sensitivity of fraud detection algorithms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fraud-threshold">
                          Fraud Threshold ({fraudThreshold})
                        </Label>
                        <span className="text-xs bg-fraud-high/10 text-fraud-high px-2 py-1 rounded-full">
                          High Risk
                        </span>
                      </div>
                      <Slider
                        id="fraud-threshold"
                        min={50}
                        max={100}
                        step={1}
                        value={[fraudThreshold]}
                        onValueChange={(values) => setFraudThreshold(values[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Transactions with a fraud score above this threshold will be flagged as fraudulent
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="alert-threshold">
                          Alert Threshold ({alertThreshold})
                        </Label>
                        <span className="text-xs bg-fraud-medium/10 text-fraud-medium px-2 py-1 rounded-full">
                          Medium Risk
                        </span>
                      </div>
                      <Slider
                        id="alert-threshold"
                        min={10}
                        max={70}
                        step={1}
                        value={[alertThreshold]}
                        onValueChange={(values) => setAlertThreshold(values[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Transactions with a fraud score above this threshold will trigger alerts for review
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="ai-detection" 
                        checked={enableAiDetection}
                        onCheckedChange={setEnableAiDetection}
                      />
                      <Label htmlFor="ai-detection" className="cursor-pointer">Enable AI Detection</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="rule-engine" 
                        checked={enableRuleEngine}
                        onCheckedChange={setEnableRuleEngine}
                      />
                      <Label htmlFor="rule-engine" className="cursor-pointer">Enable Rule Engine</Label>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-md mt-4 flex items-start gap-3">
                    <AlertTriangleIcon className="w-5 h-5 text-fraud-medium mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Warning</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Adjusting these thresholds will affect the sensitivity of the fraud detection system. 
                        Setting thresholds too low may result in false positives, while setting them too high
                        may miss fraudulent transactions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={() => handleSaveSettings('detection')} className="w-full sm:w-auto">
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Save Detection Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when alerts are sent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                      <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="slack-notifications" 
                        checked={slackNotifications}
                        onCheckedChange={setSlackNotifications}
                      />
                      <Label htmlFor="slack-notifications" className="cursor-pointer">Slack Notifications</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-recipients">Email Recipients</Label>
                      <Input 
                        id="email-recipients" 
                        placeholder="email@example.com" 
                        value={emailRecipients}
                        onChange={(e) => setEmailRecipients(e.target.value)}
                        disabled={!emailNotifications}
                      />
                      <p className="text-xs text-muted-foreground">
                        Comma-separated list of email addresses
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Slack Webhook URL</Label>
                      <Input 
                        id="webhook-url" 
                        placeholder="https://hooks.slack.com/services/..." 
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        disabled={!slackNotifications}
                      />
                      <p className="text-xs text-muted-foreground">
                        Webhook URL for Slack notifications
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h4 className="text-sm font-medium">Notification Triggers</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="high-risk-alerts" defaultChecked />
                        <Label htmlFor="high-risk-alerts" className="cursor-pointer">
                          High Risk Transactions 
                          <span className="text-xs bg-fraud-high/10 text-fraud-high px-2 py-1 rounded-full ml-2">
                            Score &ge; {fraudThreshold}
                          </span>
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="medium-risk-alerts" defaultChecked />
                        <Label htmlFor="medium-risk-alerts" className="cursor-pointer">
                          Medium Risk Transactions
                          <span className="text-xs bg-fraud-medium/10 text-fraud-medium px-2 py-1 rounded-full ml-2">
                            Score &ge; {alertThreshold}
                          </span>
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="system-alerts" defaultChecked />
                        <Label htmlFor="system-alerts" className="cursor-pointer">
                          System Alerts
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        Notifications about system performance and issues
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={() => handleSaveSettings('notification')} className="w-full sm:w-auto">
                      <SaveIcon className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
