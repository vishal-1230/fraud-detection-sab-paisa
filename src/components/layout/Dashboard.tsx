
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboardIcon, 
  ListIcon, 
  FileTextIcon, 
  SettingsIcon, 
  BellIcon, 
  UserIcon, 
  SearchIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // For animation purposes, set mounted to true after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboardIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Transactions', 
      path: '/transactions', 
      icon: <ListIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: <FileTextIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <SettingsIcon className="w-5 h-5" /> 
    }
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up on fraud alerts"
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border z-10 glass-panel backdrop-blur-md sticky top-0">
        <div className="h-16 px-4 flex items-center justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-primary/10 text-primary flex items-center justify-center w-8 h-8 rounded">
                FD
              </div>
              <span className="hidden sm:inline">FDAM System</span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={cn(
                    "gap-2 hidden md:flex",
                    isActive(item.path) ? "bg-secondary" : ""
                  )}
                  asChild
                >
                  <Link to={item.path}>
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="w-[200px] pl-8 lg:w-[280px] rounded-full bg-secondary/80"
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleNotificationClick}
            >
              <BellIcon className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-3/4 max-w-xs bg-background border-r transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary/10 text-primary flex items-center justify-center w-8 h-8 rounded">
              FD
            </div>
            <span>FDAM System</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={closeMobileMenu}
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                isActive(item.path) ? "bg-secondary" : ""
              )}
              onClick={() => {
                navigate(item.path);
                closeMobileMenu();
              }}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
      
      {/* Main content */}
      <main 
        className={cn(
          "flex-1 px-4 py-8 md:px-8 transition-opacity duration-300", 
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
