"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Home, User, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-14 items-center">
          <Link href="/feed" className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5 text-rose-500" />
            <span>DevTinder</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className={isActive("/feed") ? "text-rose-500" : ""}>
              <Link href="/feed">
                <Home className="h-5 w-5" />
                <span className="sr-only">Feed</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className={isActive("/connections") ? "text-rose-500" : ""}>
              <Link href="/connections">
                <Users className="h-5 w-5" />
                <span className="sr-only">Connections</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className={isActive("/profile") ? "text-rose-500" : ""}>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

