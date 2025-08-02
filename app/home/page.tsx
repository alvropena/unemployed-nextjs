"use client"

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/header'
import AddResumeCard from '@/components/ui/add-resume-card' 

// Mock resume data - in real app this would come from API
const mockResumes = [
  { id: '1', title: 'Software Engineer Resume', updatedAt: '2024-01-15', status: 'Draft' },
  { id: '2', title: 'Product Manager Resume', updatedAt: '2024-01-10', status: 'Live' },
  { id: '3', title: 'Data Scientist Resume', updatedAt: '2024-01-05', status: 'Draft' },
]

export default function HomePage() {
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header user={user} />

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
                      resume.status === 'Live' 
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
          
          {/* Add New Resume Card */}
          <AddResumeCard />
        </div>
      </main>
    </div>
  )
}