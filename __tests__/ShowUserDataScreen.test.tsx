import React from 'react'
import { render, waitFor } from '@testing-library/react'

import ShowUserDataScreen from '../components/ShowUserDataScreen'
import { UserProvider } from '../contexts/UserContext'

test('should display user data', async () => {
  const { getByText } = render(
    <UserProvider>
      <ShowUserDataScreen />
    </UserProvider>,
  )

  await waitFor(() => {
    expect(getByText(/Name: 山田太郎/i)).toBeInTheDocument()
    expect(getByText(/Age: 30/i)).toBeInTheDocument()
  })
})
