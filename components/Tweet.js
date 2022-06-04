import Image from "next/image"
import Link from 'next/link'
import timeago from "lib/timeago"
import avatar from "assets/defaultAvatar.png"

export default function Tweet({ tweet }) {
  return (
    <div className="flex m-5">

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
          <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
            <a className='hover:underline text-sm opacity-75 ml-1'>
              {timeago.format(new Date(tweet.createdAt), 'twitter-now')}
            </a>
          </Link>
        </p>
        <p>{tweet.content}</p>
      </div>
      
    </div>
  )
}