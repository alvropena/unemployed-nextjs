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