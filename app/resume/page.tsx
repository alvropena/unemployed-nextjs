import { redirect } from 'next/navigation'

export default function ResumePage() {
  // Redirect to home page since this route should not be accessed directly
  redirect('/home')
}
