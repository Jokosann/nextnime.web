import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function Session() {
  const session = await getServerSession(authOptions)
  return session?.user
}