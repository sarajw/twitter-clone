import Image from "next/image"
import timeago from "lib/timeago"

export default function Tweet({ tweet }) {
  return (
    <div className="flex m-5">
      <div className="my-1 mr-3">
      {!tweet.author.image && (
        <Image
          className='w-64 h-64 rounded-full'
          src="/../public/photo_sq.png"
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
      <p><span className="font-semibold">{tweet.author.name}</span> &nbsp; <span className="text-sm font-light opacity-75">{timeago.format(new Date(tweet.createdAt), 'twitter-now')}</span>
      <br />
      {tweet.content}</p>
    </div>
  )
}