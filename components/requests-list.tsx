"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Developer } from "@/types";
import { acceptRequest, rejectRequest } from "@/lib/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RequestsListProps {
  requests: Developer[];
  loading: boolean;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function RequestsList({
  requests,
  loading,
  onAccept,
  onReject,
}: RequestsListProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const { toast } = useToast();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const handleAccept = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`${API_BASE_URL}/request/review/accepted/${id}`, {
        method: "POST",
        credentials: "include",
      });
      onAccept(id);
      toast({
        title: "Connection accepted",
        description: "You are now connected!",
      });
    } catch (error) {
      toast({
        title: "Failed to accept connection",
        description: "There was a problem accepting this connection.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleReject = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`${API_BASE_URL}/request/review/rejected/${id}`, {
        method: "POST",
        credentials: "include",
      });
      onReject(id);
      toast({
        title: "Request rejected",
        description: "The connection request has been rejected.",
      });
    } catch (error) {
      toast({
        title: "Failed to reject connection",
        description: "There was a problem rejecting this connection.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-0">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">No pending requests</h2>
        <p className="text-muted-foreground">
          You don&apos;t have any connection requests at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <Card key={request._id}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={
                    request.profilePicture ||
                    "/placeholder.svg?height=40&width=40"
                  }
                  alt={`${request.firstName} ${request.lastName}`}
                />
                <AvatarFallback>
                  {request.senderUserId.firstName?.[0] || ""}
                  {request.senderUserId.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">
                  <h3 className="font-medium">
                    {request.senderUserId.firstName}{" "}
                    {request.senderUserId.lastName}
                  </h3>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {request.title || "Developer"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReject(request._id)}
              disabled={loadingStates[request._id]}
            >
              Decline
            </Button>
            <Button
              className="bg-rose-500 hover:bg-rose-600"
              size="sm"
              onClick={() => handleAccept(request._id)}
              disabled={loadingStates[request._id]}
            >
              Accept
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
