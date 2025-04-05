"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Code, Github, Linkedin } from "lucide-react";
import type { Developer } from "@/types";
import { sendInterested } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface DevCardProps {
  developer: Developer;
  onInterested: (id: string) => void;
  onIgnore: () => void;
}

export function DevCard({ developer, onInterested, onIgnore }: DevCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleInterested = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/send/interested/${developer._id}`,
        { method: "POST", credentials: "include" }
      );
      toast({
        title: "Connection request sent!",
        description: `You've sent a connection request to ${developer.firstName}.`,
      });
      onInterested(developer._id);
    } catch (error) {
      toast({
        title: "Failed to send request",
        description: "There was a problem sending your connection request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIgnore = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/send/ignored/${developer._id}`, {
        method: "POST",
        credentials: "include",
      });
      toast({
        title: "Request Ignored !",
        description: `You've successfully ignores a connection request of ${developer.firstName}.`,
      });
      onInterested(developer._id);
    } catch (error) {
      toast({
        title: "Failed to ignore connection request",
        description: "There was a problem in ignoring  connection request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={
            developer.profilePicture || "/placeholder.svg?height=256&width=384"
          }
          alt={`${developer.firstName} ${developer.lastName}`}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              {developer.firstName} {developer.lastName}
            </h2>
            <p className="text-muted-foreground">
              {developer.title || "Software Developer"}
            </p>
          </div>
          <Badge variant="outline" className="text-rose-500 border-rose-500">
            {developer.age} years
          </Badge>
        </div>

        <p className="mb-4">{developer.bio || "No bio provided"}</p>

        <div className="space-y-4">
          {developer.skills && developer.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Code className="h-4 w-4" /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {developer.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(developer.github || developer.linkedin) && (
            <div>
              <h3 className="text-sm font-medium mb-2">Social</h3>
              <div className="flex gap-2">
                {developer.github && (
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                )}
                {developer.linkedin && (
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={handleIgnore}
        >
          <X className="h-6 w-6 text-gray-500" />
          <span className="sr-only">Ignore</span>
        </Button>
        <Button
          className="rounded-full h-14 w-14 bg-rose-500 hover:bg-rose-600"
          size="lg"
          onClick={handleInterested}
          disabled={isLoading}
        >
          <Heart className="h-6 w-6" />
          <span className="sr-only">Interested</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
