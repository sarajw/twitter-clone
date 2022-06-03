import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (session) {
    router.push('/home')
  }

  return (
      <Link href="/api/auth/signin">
        <a>login</a>
      </Link>
  )
}
