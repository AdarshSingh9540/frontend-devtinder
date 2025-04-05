"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { DevCard } from "@/components/dev-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeed } from "@/lib/api";
import type { Developer } from "@/types";

export default function FeedPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  console.log("API_BASE_URL", API_BASE_URL);
  useEffect(() => {
    const loadFeed = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/feed`, {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        setDevelopers(json.users);
      } catch (error) {
        console.error("Failed to load feed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, []);

  const handleInterested = (id: string) => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleIgnore = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const currentDev = developers[currentIndex];
  const noMoreDevs = currentIndex >= developers.length;

  return (
    <MainLayout>
      <div className="container py-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Discover Developers
        </h1>

        {loading ? (
          <div className="w-full">
            <Skeleton className="h-[450px] w-full rounded-xl" />
          </div>
        ) : noMoreDevs ? (
          <div className="text-center p-8 border rounded-xl">
            <h2 className="text-xl font-semibold mb-2">No more developers</h2>
            <p className="text-muted-foreground">
              Check back later for more connections!
            </p>
          </div>
        ) : currentDev ? (
          <DevCard
            developer={currentDev}
            onInterested={handleInterested}
            onIgnore={handleIgnore}
          />
        ) : (
          <div className="text-center p-8 border rounded-xl">
            <h2 className="text-xl font-semibold mb-2">No developers found</h2>
            <p className="text-muted-foreground">
              Check back later for potential connections!
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
