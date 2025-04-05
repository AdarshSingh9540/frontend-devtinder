import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Developer } from "@/types"
import { Code, Github, Linkedin, Mail, MapPin } from "lucide-react"

interface ProfileViewProps {
  profile: Developer
}

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="relative p-0 h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600" />
          <div className="absolute -bottom-16 left-6">
            <div className="rounded-full border-4 border-background overflow-hidden h-32 w-32 bg-muted">
              {profile.profilePicture ? (
                <Image
                  src={profile.profilePicture || "/placeholder.svg"}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  width={128}
                  height={128}
                  className="object-cover h-full w-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-4xl font-bold text-muted-foreground">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-20 pb-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-muted-foreground">{profile.title || "Software Developer"}</p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{profile.email}</span>
            </div>

            {profile.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}

            <div className="pt-4">
              <p>{profile.bio || "No bio provided yet."}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {profile.skills && profile.skills.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {(profile.github || profile.linkedin) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
            <div className="space-y-3">
              {profile.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              )}
              {profile.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5" />
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

