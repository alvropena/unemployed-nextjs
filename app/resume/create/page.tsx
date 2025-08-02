"use client"

import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { ArrowLeft, ArrowRight, Eye, Save, Upload, X } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Header from '@/components/ui/header'

interface ResumeData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  
  // Professional Summary
  summary: string
  
  // Experience
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  
  // Education
  education: Array<{
    id: string
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    gpa: string
    description: string
  }>
  
  // Skills
  skills: string[]
  
  // Projects
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string[]
    url: string
  }>
}

const steps = [
  { id: 1, title: 'Personal Information', key: 'personal' },
  { id: 2, title: 'Professional Summary', key: 'summary' },
  { id: 3, title: 'Experience', key: 'experience' },
  { id: 4, title: 'Education', key: 'education' },
  { id: 5, title: 'Skills', key: 'skills' },
  { id: 6, title: 'Projects', key: 'projects' },
  { id: 7, title: 'Review & Save', key: 'review' }
]

export default function CreateResumePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  })

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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    // TODO: Save resume as draft
    console.log('Saving resume as draft...', resumeData)
  }

  const handlePublish = () => {
    // TODO: Publish resume
    console.log('Publishing resume...', resumeData)
  }

  const handleDiscard = () => {
    // TODO: Discard changes and redirect
    redirect('/home')
  }

  const updateResumeData = (field: keyof ResumeData, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Create New Resume</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <span className={`ml-2 text-sm ${
                  step.id === currentStep ? 'font-medium' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-1 bg-muted mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={resumeData.firstName}
                          onChange={(e) => updateResumeData('firstName', e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={resumeData.lastName}
                          onChange={(e) => updateResumeData('lastName', e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => updateResumeData('email', e.target.value)}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.phone}
                        onChange={(e) => updateResumeData('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.location}
                        onChange={(e) => updateResumeData('location', e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.linkedin}
                        onChange={(e) => updateResumeData('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={resumeData.website}
                        onChange={(e) => updateResumeData('website', e.target.value)}
                        placeholder="johndoe.com"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <textarea
                      id="summary"
                      className="w-full h-32 p-3 border rounded-md resize-none"
                      value={resumeData.summary}
                      onChange={(e) => updateResumeData('summary', e.target.value)}
                      placeholder="Experienced software developer with a passion for creating innovative solutions..."
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Work Experience</h3>
                      <Button size="sm" variant="outline">
                        Add Experience
                      </Button>
                    </div>
                    {resumeData.experience.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No experience added yet. Click "Add Experience" to get started.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {resumeData.experience.map((exp, index) => (
                          <Card key={exp.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{exp.title}</h4>
                                <Button size="sm" variant="ghost">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Education</h3>
                      <Button size="sm" variant="outline">
                        Add Education
                      </Button>
                    </div>
                    {resumeData.education.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No education added yet. Click "Add Education" to get started.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {resumeData.education.map((edu, index) => (
                          <Card key={edu.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{edu.degree}</h4>
                                <Button size="sm" variant="ghost">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Input
                        id="skills"
                        value={resumeData.skills.join(', ')}
                        onChange={(e) => updateResumeData('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                        placeholder="JavaScript, React, Node.js, Python"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Projects</h3>
                      <Button size="sm" variant="outline">
                        Add Project
                      </Button>
                    </div>
                    {resumeData.projects.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No projects added yet. Click "Add Project" to get started.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {resumeData.projects.map((project, index) => (
                          <Card key={project.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{project.title}</h4>
                                <Button size="sm" variant="ghost">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 7 && (
                  <div className="space-y-4">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-medium">Ready to save your resume?</h3>
                      <p className="text-muted-foreground">
                        Choose how you'd like to proceed with your resume.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Button onClick={handleSave} variant="outline" className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </Button>
                      <Button onClick={handlePublish} className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Publish Resume
                      </Button>
                      <Button onClick={handleDiscard} variant="destructive" className="w-full">
                        <X className="h-4 w-4 mr-2" />
                        Discard Changes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < steps.length && (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold">
                          {resumeData.firstName} {resumeData.lastName}
                        </h2>
                        <p className="text-muted-foreground">{resumeData.email}</p>
                        <p className="text-muted-foreground">{resumeData.phone}</p>
                        <p className="text-muted-foreground">{resumeData.location}</p>
                      </div>
                      
                      {resumeData.summary && (
                        <div>
                          <h3 className="text-lg font-semibold">Summary</h3>
                          <p>{resumeData.summary}</p>
                        </div>
                      )}
                      
                      {resumeData.experience.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold">Experience</h3>
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="mb-3">
                              <h4 className="font-medium">{exp.title}</h4>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                              <p className="text-sm">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {resumeData.skills.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
