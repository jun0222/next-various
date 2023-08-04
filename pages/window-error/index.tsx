export default function Home() {
  const throwError = () => {
    throw new Error('This is a client-side only error')
  }

  return (
    <div>
      <button onClick={throwError}>Throw an Error</button>
    </div>
  )
}
