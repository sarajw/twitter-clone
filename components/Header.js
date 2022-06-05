
import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react"
import Link from 'next/link'

import Image from 'next/image'
import Cheeper from "assets/cheeper.png"

export default function NewTweet() {
  const { data: session } = useSession()
  return (
    <header className="flex justify-between items-center my-3 mx-4">
      <Link href="/home">
        <a>
          <div className="flex items-center gap-2">
            <Image
                  className='w-48 h-60 dark:invert'
                  src={Cheeper}
                  alt="Cheeper logo"
                  width='24'
                  height='30'
            />
            <h1 className="text-3xl">Cheeper</h1>
          </div>
        </a>
      </Link>

    {session && <button onClick={() => signOut()}>Sign out</button>}
    {!session &&
      <Link href="/api/auth/signin">
        <a>
          <button>Sign in</button>
        </a>
      </Link>
    }
    </header>
  )
}