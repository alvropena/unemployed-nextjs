"use client"

import { useState } from 'react'
import { 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Plus
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { logout } from '@/app/actions/auth'

interface HeaderProps {
  user: any
}

export default function Header({ user }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd persist this to localStorage or database
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">U</span>
          </div>
          <span className="hidden sm:inline font-semibold text-lg">Unemployed</span>
        </div>

        {/* Right side - Upgrade button and Profile */}
        <div className="flex items-center space-x-4">
          {/* Upgrade Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Upgrade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upgrade to Pro</DialogTitle>
                <DialogDescription>
                  Get unlimited resumes, advanced templates, and priority support.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">$9.99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Upgrade Now</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Profile Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user.email}
                </div>
                <div className="border-t pt-2">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={toggleDarkMode}
                  >
                    {isDarkMode ? (
                      <Sun className="h-4 w-4 mr-2" />
                    ) : (
                      <Moon className="h-4 w-4 mr-2" />
                    )}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-destructive hover:text-destructive" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
} 