"use client"

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { ArrowLeft, Edit, Download, Share } from 'lucide-react'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResumeData {
  id: string
  title: string
  content: any
  status: 'draft' | 'published'
  updatedAt: string
  createdAt: string
}

// Mock resume data - will be replaced with API calls later
const mockResumes: Record<string, ResumeData> = {
  '1': {
    id: '1',
    title: 'Software Engineer Resume',
    content: {},
    status: 'draft',
    updatedAt: '2024-01-15',
    createdAt: '2024-01-10'
  },
  '2': {
    id: '2',
    title: 'Product Manager Resume',
    content: {},
    status: 'published',
    updatedAt: '2024-01-10',
    createdAt: '2024-01-05'
  },
  '3': {
    id: '3',
    title: 'Data Scientist Resume',
    content: {},
    status: 'draft',
    updatedAt: '2024-01-05',
    createdAt: '2024-01-01'
  }
}

export default function ResumeDetailPage({ params }: { params: { id: string } }) {
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuthAndLoadResume = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          redirect('/login')
        }
        
        setUser(user)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Get mock resume data
        const mockResume = mockResumes[params.id]
        
        if (mockResume) {
          setResume(mockResume)
        }
        // If resume doesn't exist, resume will remain null (will show error)
        
      } catch (err) {
        console.error('Error loading resume:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoadResume()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading resume...</p>
        </div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">😞</div>
          <h1 className="text-2xl font-bold">Resume Not Found</h1>
          <p className="text-muted-foreground">The resume you're looking for doesn't exist.</p>
          <Link href="/home">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resumes
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/home">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">{resume.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                resume.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {resume.status}
              </span>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Resume Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Resume Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {/* This is where the actual resume content would be rendered */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
                  <p className="text-muted-foreground">
                    Name: John Doe<br />
                    Email: john.doe@example.com<br />
                    Phone: (555) 123-4567<br />
                    Location: San Francisco, CA
                  </p>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-2">Experience</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">Senior Software Engineer</h3>
                      <p className="text-sm text-muted-foreground">Tech Company • 2022 - Present</p>
                      <p className="text-sm mt-1">
                        Led development of key features, mentored junior developers, and improved system performance by 40%.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Software Engineer</h3>
                      <p className="text-sm text-muted-foreground">Startup Inc • 2020 - 2022</p>
                      <p className="text-sm mt-1">
                        Built scalable web applications using React, Node.js, and PostgreSQL.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-2">Education</h2>
                  <div>
                    <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">University of Technology • 2016 - 2020</p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Git'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
