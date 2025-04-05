import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Developer } from "@/types"

interface ConnectionsListProps {
  connections: Developer[]
  loading: boolean
}

export function ConnectionsList({ connections, loading }: ConnectionsListProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
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
            </Card>
          ))}
      </div>
    )
  }

  if (connections.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">No connections yet</h2>
        <p className="text-muted-foreground mb-4">Start swiping to connect with other developers!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {connections.map((connection) => (
        <Card key={connection._id}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={connection.profilePicture || "/placeholder.svg?height=40&width=40"}
                  alt={`${connection.firstName} ${connection.lastName}`}
                />
                <AvatarFallback>
                  {connection.firstName[0]}
                  {connection.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {connection.firstName} {connection.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{connection.title || "Developer"}</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

