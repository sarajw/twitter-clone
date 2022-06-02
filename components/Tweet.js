export default function Tweet({ tweet }) {
  return (
    <p>
      {tweet.createdAt}
      {tweet.content}
    </p>
  )
}