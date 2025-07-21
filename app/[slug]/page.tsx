'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface UserData {
    username: string;
    name: string;
    email: string;
    bio: string;
    location: string;
    skills: string[];
    experience: string;
    education: string;
    // Add more fields as needed based on your backend data structure
}

export default function UserProfilePage() {
    const params = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const username = params.username as string;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulate fetching data from your backend
                // Replace this with your actual data fetching logic
                const mockUserData: UserData = {
                    username: username,
                    name: "John Doe",
                    email: "john.doe@example.com",
                    bio: "Experienced software developer with a passion for creating innovative solutions.",
                    location: "San Francisco, CA",
                    skills: ["JavaScript", "React", "Node.js", "Python", "TypeScript"],
                    experience: "5+ years in software development",
                    education: "Bachelor's in Computer Science"
                };

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                setUserData(mockUserData);
            } catch (err) {
                setError('Failed to load user data');
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        User Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {error || `No profile found for "${username}"`}
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                                {userData.name.charAt(0)}
                            </div>
                            <div className="ml-6 text-white">
                                <h1 className="text-3xl font-bold">{userData.name}</h1>
                                <p className="text-blue-100">@{userData.username}</p>
                                <p className="text-blue-100 mt-1">{userData.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        About
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {userData.bio}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        Contact
                                    </h2>
                                    <div className="space-y-2">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Email:</span> {userData.email}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        Experience
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {userData.experience}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        Skills
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        Education
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {userData.education}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
