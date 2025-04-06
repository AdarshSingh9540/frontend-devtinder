"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/main-layout";
import { ConnectionsList } from "@/components/connections-list";
import { RequestsList } from "@/components/requests-list";
import { getConnections, getReceivedRequests } from "@/lib/api";
import type { Developer } from "@/types";
import { API_BASE_URL } from "@/lib/api";
export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Developer[]>([]);
  const [requests, setRequests] = useState<Developer[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/connections`, {
          method: "GET",
          credentials: "include",
        });
        const connectionsData = await response.json();
        setConnections(connectionsData.data || []);
      } catch (error) {
        console.error("Failed to load connections:", error);
      } finally {
        setLoadingConnections(false);
      }

      try {
        const response = await fetch(`${API_BASE_URL}/user/requests/received`, {
          method: "GET",
          credentials: "include",
        });
        const requestsData = await response.json();
        setRequests(requestsData.data || []);
      } catch (error) {
        console.error("Failed to load requests:", error);
      } finally {
        setLoadingRequests(false);
      }
    };

    loadData();
  }, []);

  const handleAcceptRequest = (id: string) => {
    // Update the UI optimistically
    const acceptedDev = requests.find((req) => req._id === id);
    if (acceptedDev) {
      setConnections((prev) => [...prev, acceptedDev]);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    }
  };

  const handleRejectRequest = (id: string) => {
    // Update the UI optimistically
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Your Network</h1>

        <Tabs defaultValue="connections">
          <TabsList className="mb-6">
            <TabsTrigger value="connections">
              Connections
              {connections.length > 0 && (
                <span className="ml-2 rounded-full bg-rose-100 text-rose-500 px-2 py-0.5 text-xs dark:bg-rose-900 dark:text-rose-300">
                  {connections.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="requests">
              Requests
              {requests.length > 0 && (
                <span className="ml-2 rounded-full bg-rose-100 text-rose-500 px-2 py-0.5 text-xs dark:bg-rose-900 dark:text-rose-300">
                  {requests.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections">
            <ConnectionsList
              connections={connections}
              loading={loadingConnections}
            />
          </TabsContent>

          <TabsContent value="requests">
            <RequestsList
              requests={requests}
              loading={loadingRequests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
