function Page3Child() {
  const title = 'Page3Child'
  if (typeof window !== 'undefined') {
    throw new Error('This is a client-side only error')
  }

  return (
    <div style={{ backgroundColor: '#DEB331' }}>
      <p>{title}</p>
    </div>
  )
}
export default Page3Child
