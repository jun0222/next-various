// import ErrorBoundary from './ErrorBoundary'
import Page3Child from './Page3Child'

const Page3 = () => {
  return (
    <div style={{ backgroundColor: '#DFD35F' }}>
      <h3>Page3</h3>
      {/* <ErrorBoundary> */}
      <Page3Child />
      {/* </ErrorBoundary> */}
    </div>
  )
}
export default Page3
