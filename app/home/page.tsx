"use client"

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  ChevronDown,
  Plus
} from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { logout } from '@/app/actions/auth'

// Mock resume data - in real app this would come from API
const mockResumes = [
  { id: '1', title: 'Software Engineer Resume', updatedAt: '2024-01-15', status: 'draft' },
  { id: '2', title: 'Product Manager Resume', updatedAt: '2024-01-10', status: 'published' },
  { id: '3', title: 'Data Scientist Resume', updatedAt: '2024-01-05', status: 'draft' },
]

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        redirect('/login')
      }
      
      setUser(user)
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd persist this to localStorage or database
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-semibold text-lg">Unemployed</span>
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
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-2">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.email}
                  </div>
                  <div className="border-t pt-2">
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <User className="h-4 w-4 mr-2" />
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Resumes</h1>
            <p className="text-muted-foreground">Create and manage your professional resumes</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResumes.map((resume) => (
            <Link key={resume.id} href={`/resume/${resume.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {resume.title}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      resume.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {resume.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}