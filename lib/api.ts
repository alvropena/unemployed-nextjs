interface UpdateProfileData {
  name?: string
  username?: string
  // Add other profile fields as needed
}

interface UpdateProfileResponse {
  success: boolean
  message?: string
  data?: any
}

interface ResumeData {
  id: string
  title: string
  content: any
  status: 'draft' | 'published'
  updatedAt: string
  createdAt: string
}

interface GetResumeResponse {
  success: boolean
  message?: string
  data?: ResumeData
}

/**
 * Fetches resume data by ID
 * @param resumeId - The resume ID to fetch
 * @returns Promise with the resume data
 */
export async function getResumeById(resumeId: string): Promise<GetResumeResponse> {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/resume/${resumeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error fetching resume:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch resume',
    }
  }
}

/**
 * Fetches resume data by ID with authentication
 * @param resumeId - The resume ID to fetch
 * @param token - Authentication token
 * @returns Promise with the resume data
 */
export async function getResumeByIdWithAuth(
  resumeId: string,
  token: string
): Promise<GetResumeResponse> {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/resume/${resumeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error fetching resume:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch resume',
    }
  }
}

/**
 * Updates user profile information via PUT request
 * @param userId - The user ID to update
 * @param profileData - The profile data to update
 * @returns Promise with the update response
 */
export async function updateUserProfile(
  userId: string,
  profileData: UpdateProfileData
): Promise<UpdateProfileResponse> {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    }
  }
}

/**
 * Updates user profile with authentication token
 * @param userId - The user ID to update
 * @param profileData - The profile data to update
 * @param token - Authentication token
 * @returns Promise with the update response
 */
export async function updateUserProfileWithAuth(
  userId: string,
  profileData: UpdateProfileData,
  token: string
): Promise<UpdateProfileResponse> {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    }
  }
} 