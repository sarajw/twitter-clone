import Image from "next/image"
import Link from 'next/link'
import timeago from "lib/timeago"
import avatar from "assets/defaultAvatar.png"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Tweet({ tweet, nolink }) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex my-5">

      <div className="mr-3 shrink-0 drop-shadow-md hover:drop-shadow-sm hover:translate-x-[0.5px] hover:translate-y-[0.5px] ease-in-out duration-200">
        <Link href={`/${tweet.author.name}`}>
          <a>
            {!tweet.author.image && (
              <Image
                className='w-100 h-100 rounded-full'
                src={avatar}
                alt={tweet.author.name}
                width='50'
                height='50'
              />
            )}
            {tweet.author.image && (
              <Image
                className='w-100 h-100 rounded-full'
                src={tweet.author.image}
                alt={tweet.author.name}
                width='50'
                height='50'
              />
            )}
          </a>
        </Link>
      </div>
      <div>
        <p>
          <Link href={`/${tweet.author.name}`}>
            <a className="hover:underline font-semibold mr-1">
              {tweet.author.name}
            </a>
          </Link>
          ·
          {nolink ? (
            <span className='text-sm opacity-75 mx-1'>{timeago.format(new Date(tweet.createdAt), 'twitter-now')}</span>
          ) : (
            <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
              <a className='hover:underline text-sm opacity-75 mx-1'>
                {timeago.format(new Date(tweet.createdAt), 'twitter-now')}
              </a>
            </Link>
          )}
          {session && session.user.email === tweet.author.email && (
            <>·
            <button
              className='ml-1 hover:underline text-sm opacity-75'
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
              delete cheep
            </button>
            </>
          )}
        </p>
        <p>{tweet.content}</p>
      </div>
      
    </div>
  )
}