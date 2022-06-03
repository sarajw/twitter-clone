import Image from "next/image"
import Link from 'next/link'
import timeago from "lib/timeago"

export default function Tweet({ tweet }) {
  return (
    <div className="flex m-5">

      <div className="my-1 mr-3 shrink-0">
      {!tweet.author.image && (
        <Image
          className='w-64 h-64 rounded-full'
          src="/../public/defaultAvatar.png"
          alt={tweet.author.name}
          width='40'
          height='40'
        />
      )}
      {tweet.author.image && (
        <Image
          className='w-64 h-64 rounded-full'
          src={tweet.author.image}
          alt={tweet.author.name}
          width='40'
          height='40'
        />
      )}
      </div>
      <div>
        <p>
          <Link href={`/${tweet.author.name}`}>
            <a>
              <span className="font-semibold mr-1">
                {tweet.author.name}
              </span>
            </a>
          </Link>
          ·
          <span className="text-sm opacity-75 ml-1">
            {timeago.format(new Date(tweet.createdAt), 'twitter-now')}
          </span>
        </p>
        <p>{tweet.content}</p>
      </div>
      
    </div>
  )
}