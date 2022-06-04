import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import prisma from 'lib/prisma'
import { getTweets } from 'lib/data.js'

import Header from 'components/Header'
import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'

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
      <Header />
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