"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { Developer } from "@/types"
import { updateProfile } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface ProfileEditProps {
  profile: Developer
  onSave: (updatedProfile: Developer) => void
  onCancel: () => void
}

export function ProfileEdit({ profile, onSave, onCancel }: ProfileEditProps) {
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    title: profile.title || "",
    bio: profile.bio || "",
    location: profile.location || "",
    skills: profile.skills?.join(", ") || "",
    github: profile.github || "",
    linkedin: profile.linkedin || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedProfileData = {
        ...profile,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        bio: formData.bio,
        location: formData.location,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        github: formData.github,
        linkedin: formData.linkedin,
      }

      await updateProfile(updatedProfileData)

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      onSave(updatedProfileData)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Full Stack Developer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell others about yourself..."
              className="min-h-[100px]"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="e.g. JavaScript, React, Node.js"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              name="github"
              placeholder="https://github.com/yourusername"
              value={formData.github}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              name="linkedin"
              placeholder="https://linkedin.com/in/yourusername"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

