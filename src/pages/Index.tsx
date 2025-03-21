
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ShieldIcon, BellIcon, BarChart3Icon, SettingsIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-background transition-opacity duration-500",
      mounted ? "opacity-100" : "opacity-0"
    )}>
      <header className="border-b sticky top-0 z-10 glass-panel backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex items-center justify-center w-8 h-8 rounded">
              <ShieldIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl">FDAM System</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/dashboard')}>
              <BarChart3Icon className="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/transactions')}>
              <BellIcon className="w-4 h-4" />
              Transactions
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/settings')}>
              <SettingsIcon className="w-4 h-4" />
              Settings
            </Button>
          </nav>
          
          <Button onClick={() => navigate('/dashboard')} className="hidden sm:flex">
            Get Started
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <ShieldIcon className="w-4 h-4" />
                <span>Advanced Fraud Detection</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Fraud Detection, Alert, and Monitoring System
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Protect your payment gateway with real-time fraud detection, alerts, and comprehensive monitoring
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" onClick={() => navigate('/dashboard')} className="w-full sm:w-auto">
                  View Dashboard
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
                
                <Button variant="outline" size="lg" onClick={() => navigate('/transactions')} className="w-full sm:w-auto">
                  Explore Transactions
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">Key Features</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our comprehensive fraud detection system combines rule-based logic with advanced AI models
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border transition-transform hover:translate-y-[-4px] animate-slide-up [animation-delay:100ms]">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Detection</h3>
                  <p className="text-muted-foreground">
                    Process transactions in real-time with latency under 300ms for immediate fraud detection
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border transition-transform hover:translate-y-[-4px] animate-slide-up [animation-delay:200ms]">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BellIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Instant Alerts</h3>
                  <p className="text-muted-foreground">
                    Receive immediate notifications for suspected fraudulent transactions via email or Slack
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border transition-transform hover:translate-y-[-4px] animate-slide-up [animation-delay:300ms]">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Visualize fraud patterns and metrics with dynamic charts and comprehensive reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
              <h2 className="text-3xl font-bold">Ready to protect your payment gateway?</h2>
              <p className="text-xl text-muted-foreground">
                Access the dashboard to start monitoring transactions and detecting fraud in real-time
              </p>
              
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Get Started
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary flex items-center justify-center w-8 h-8 rounded">
                <ShieldIcon className="w-5 h-5" />
              </div>
              <span className="font-bold">FDAM System</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Fraud Detection, Alert, and Monitoring System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
