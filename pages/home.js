import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import prisma from 'lib/prisma'
import { getTweets } from 'lib/data.js'

import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'

import { signOut } from "next-auth/react"
import Link from 'next/link'

import Image from 'next/image'
import Cheeper from "assets/cheeper.png"

export default function Home({ tweets }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const router = useRouter()

  if (loading) {
    return <p>Loading...</p>
  }

  /* if (!session) {
    router.push('/')
  } */
  
  if (session && !session.user.name) {
    router.push('/setup')
  }

  return (
    <>
      <header className="flex justify-between items-center m-3">
        <div className="flex items-center gap-2">
          <Image
                className='w-64 h-64 dark:invert'
                src={Cheeper}
                alt="Cheeper logo"
                width='32'
                height='32'
          />
          <h1 className="text-3xl">Cheeper</h1>
        </div>
        
        {session && <button onClick={() => signOut()}>Sign out</button>}
        {!session &&
          <Link href="/api/auth/signin">
            <a>
              <button>Sign in</button>
            </a>
          </Link>
        }
      </header>
      <NewTweet />
      <Tweets tweets={ tweets } />
    </>
  )
}

export async function getServerSideProps() {
	let tweets = await getTweets(prisma)
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      tweets,
    },
  }
}