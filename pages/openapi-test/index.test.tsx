import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserPage from '.' // Assuming UserPage is in the same directory

// Mocking the API call
jest.mock('../../openapi/client', () => ({
  DefaultApi: jest.fn().mockImplementation(() => ({
    usersUserIdGet: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
    }),
  })),
  Configuration: jest.fn(),
}))

describe('UserPage', () => {
  it('renders user information', async () => {
    render(<UserPage />)

    // Check loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

    // Wait for the async actions to complete
    await waitFor(() => screen.getByText(/User Information/i))

    // Now we can check for the user information
    expect(screen.getByText(/Test User/i)).toBeInTheDocument()
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()
  })
})
