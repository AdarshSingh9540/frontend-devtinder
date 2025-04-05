import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code, Heart, Users } from "lucide-react"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="ml-2 text-xl font-bold">DevTinder</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Find Your Perfect Code Partner
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect with developers who share your passion for coding. Swipe right on your next collaboration.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button className="bg-rose-500 hover:bg-rose-600">Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Code className="h-10 w-10 text-rose-500" />
                <h3 className="text-xl font-bold">Shared Coding Interests</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Match with developers who share your programming languages and frameworks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-10 w-10 text-rose-500" />
                <h3 className="text-xl font-bold">Build Connections</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect with like-minded developers for projects, mentorship, or friendship.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Heart className="h-10 w-10 text-rose-500" />
                <h3 className="text-xl font-bold">Developer-Focused</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  An app built by developers, for developers, with your needs in mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 DevTinder. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

