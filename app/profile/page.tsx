"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { ProfileView } from "@/components/profile-view";
import { ProfileEdit } from "@/components/profile-edit";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getProfile } from "@/lib/api";
import type { Developer } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3210/api/profile/view`, {
          method: "GET",
          credentials: "include",
        });
        const requestsData = await response.json();
        setProfile(requestsData.user);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileUpdate = (updatedProfile: Developer) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Profile</h1>
          <p>
            Unable to load your profile information. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isEditing ? "Edit Profile" : "Your Profile"}
          </h1>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-rose-500 hover:bg-rose-600"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <ProfileEdit
            profile={profile}
            onSave={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView profile={profile} />
        )}
      </div>
    </MainLayout>
  );
}
