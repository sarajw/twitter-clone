import timeago from "lib/timeago"

export default function Tweet({ tweet }) {
  return (
    <p className="m-5">
      {tweet.author.name} &nbsp; {timeago.format(new Date(tweet.createdAt), 'twitter-now')}
      <br />
      {tweet.content}
    </p>
  )
}