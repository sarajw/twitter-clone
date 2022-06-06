import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Header from 'components/Header'
import Image from 'next/image'
import Link from 'next/link'

import Tweets from 'components/Tweets'
import prisma from 'lib/prisma'
import { getTweets } from 'lib/data.js'

import Cheeper from 'assets/cheeper.png'

export default function Welcome({ tweets }) {
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
      <main className="mx-5 my-20 flex flex-col items-center justify-center gap-8">
        <Image
              className='w-288 h-360 dark:invert aspect-square shrink-0 opacity-80'
              src={Cheeper}
              alt="Cheeper logo"
              width='144'
              height='180'
        />
        <h1 className="mb-5 text-center text-3xl">Welcome to Cheeper!</h1>
        
        <div className="my-5">
          <h2 className='text-center text-xl'>Latest Cheeps:</h2>
          <Tweets tweets={tweets} />
        </div>
        <h2 className='text-xl'>Join the conversation!</h2>
        <Link href='/api/auth/signin'>
          <a className='button'>
            Sign in
          </a>
        </Link>
        <Link href="/home">
          <a className="hover:underline">
            Enter demo (no sign in)
          </a>
        </Link>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const take = 3
  let tweets = await getTweets(prisma, take)
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      tweets,
    },
  }
}