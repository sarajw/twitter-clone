export default function LoadMore({ tweets, setTweets }) {
  return (
      <button
        className='button block mx-auto my-10'
        onClick={async () => {
          const lastTweetId = tweets[tweets.length - 1].id
          const res = await fetch(`/api/tweets?take=3&cursor=${lastTweetId}`)
          const data = await res.json()
          setTweets([...tweets, ...data])
        }}
      >
        Load more
      </button>
  )
}