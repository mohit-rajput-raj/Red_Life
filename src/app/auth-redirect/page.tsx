// app/auth-redirect/page.tsx
import { redirect } from 'next/navigation'
import pool from '@/lib/db'
import { currentUser, auth} from '@clerk/nextjs/server'

export default async function AuthRedirectPage() {
//   const {  } = a   // ✅ works inside server component in App Router
    const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  // Query Postgres for role
  const result = await pool.query(
    'SELECT user_type FROM users WHERE clerk_id = $1 LIMIT 1',
    [user.id]
  )
  const userType = result.rows[0]?.user_type
  console.log('User Type:', userType);
  
  if (userType === 'docs') {
    redirect('/dashboard')
  }

  if (userType === 'user') {
    redirect('/room')
  }

  // fallback
  redirect('/')
}
