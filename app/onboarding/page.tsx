"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { updateUserProfile } from '@/lib/api'

interface OnboardingData {
    name: string
    username: string
}

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<OnboardingData>({
        name: '',
        username: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const totalSteps = 2
    const progressPercentage = (currentStep / totalSteps) * 100

    const handleInputChange = (field: keyof OnboardingData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            // TODO: Get actual user ID from auth context or session
            const userId = 'current-user-id' // Replace with actual user ID
            
            // Validate all required fields before submitting
            if (!formData.name.trim() || !formData.username.trim()) {
                throw new Error('Please fill in all required fields')
            }
            
            const result = await updateUserProfile(userId, {
                name: formData.name.trim(),
                username: formData.username.trim()
            })
            
            if (result.success) {
                console.log('Profile updated successfully:', result.data)
                // TODO: Redirect to dashboard or show success message
                // router.push('/dashboard')
            } else {
                console.error('Failed to update profile:', result.message)
                // TODO: Show error message to user
                // toast.error(result.message || 'Failed to update profile')
            }
        } catch (error) {
            console.error('Error during profile update:', error)
            // TODO: Show error message to user
            // toast.error(error instanceof Error ? error.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">How should we call you?</h2>
                            <p className="text-gray-600">This is the name that will appear on your profile</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Choose your username</h2>
                            <p className="text-gray-600">
                                This will be the username people use to find your resume.
                                Choose something professional and memorable.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="e.g., john_doe_dev"
                                value={formData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className="w-full"
                            />
                            <p className="text-sm text-gray-500">
                                This will be your public profile URL: unemployed.com/{formData.username || 'username'}
                            </p>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round(progressPercentage)}% Complete
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="w-full" />
                </div>

                {/* Step Content */}
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={isLoading}
                        >
                            Previous
                        </Button>
                    ) : (
                        <div></div>
                    )}

                    {currentStep < totalSteps ? (
                        <Button
                            onClick={handleNext}
                            disabled={isLoading || !formData.name.trim()}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading || !formData.username.trim()}
                            className="ml-auto"
                        >
                            {isLoading ? 'Saving...' : 'Complete Setup'}
                        </Button>
                    )}
                </div>

                {/* Skip Option */}
                {currentStep === 1 && (
                    <div className="mt-6 text-center">
                        <Button variant="ghost" className="text-gray-500">
                            Skip for Now
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
