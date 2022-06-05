import Header from 'components/Header'
import Tweet from 'components/Tweet'
import Tweets from 'components/Tweets'
import NewReply from 'components/NewReply'

import { useRouter } from 'next/router'

import { getTweet, getReplies } from 'lib/data.js'
import prisma from 'lib/prisma'

export default function SingleTweet({ tweet, replies }) {
  const router = useRouter()

  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.author.name}/status/${tweet.parent}`)
  }
  return (
    <>
      <Header />
      <Tweet tweet={tweet} />     
      <NewReply tweet={tweet} />
      <Tweets tweets={replies} nolink={true} />
    </>
  )
}

export async function getServerSideProps({ params }) {
	let tweet = await getTweet(params.id, prisma)
  tweet = JSON.parse(JSON.stringify(tweet))

	let replies = await getReplies(params.id, prisma)
  replies = JSON.parse(JSON.stringify(replies))

  return {
    props: {
      tweet,
      replies,
    },
  }
}