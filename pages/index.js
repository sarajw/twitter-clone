import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Header from 'components/Header'
import Image from 'next/image'
import Link from 'next/link'

import Cheeper from 'assets/cheeper.png'

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
    <>
      <Header />
      <div className="m-5 min-h-[75vh] flex flex-col items-center justify-center gap-5">
        <Image
              className='w-720 h-720 dark:invert aspect-square shrink-0'
              src={Cheeper}
              alt="Cheeper logo"
              width='360'
              height='360'
        />
        <h1 className="text-3xl">Welcome to Cheeper</h1>
        <p>
          <Link href="/home">
            <a className="hover:underline">
              Click here to enter demo (no sign in)
            </a>
          </Link>
        </p>
      </div>
    </>
  )
}
