import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export default function AddResumeCard() {
  return (
    <Link href="/resume/create">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 border-muted-foreground/20 hover:border-muted-foreground/40">
        <CardContent className="flex flex-col items-center justify-center h-48">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Add New Resume</h3>
          <p className="text-sm text-muted-foreground text-center">
            Create a new professional resume
          </p>
        </CardContent>
      </Card>
    </Link>
  )
} 