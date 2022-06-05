import Header from 'components/Header'
import Tweet from 'components/Tweet'
import { getTweet } from 'lib/data.js'
import prisma from 'lib/prisma'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SingleTweet({ tweet }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <>
      <Header />
      <Tweet tweet={tweet} />

      {session && session.user.email === tweet.author.email && (
          <button
            className='block mx-auto'
            onClick={async () => {
              const res = await fetch('/api/tweet', {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              })

              if (res.status === 401) {
                alert('Unauthorized')
              }
              if (res.status === 200) {
                router.push('/home')
              }
            }}
          >
            delete
          </button>
      )}
    </>
  )
}

export async function getServerSideProps({ params }) {
	let tweet = await getTweet(params.id, prisma)
  tweet = JSON.parse(JSON.stringify(tweet))

  return {
    props: {
      tweet,
    },
  }
}