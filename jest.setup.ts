import * as nodeFetch from 'node-fetch'
import '@testing-library/jest-dom/extend-expect'

global.fetch = nodeFetch
global.Request = nodeFetch.Request
global.Response = nodeFetch.Response
global.Headers = nodeFetch.Headers
