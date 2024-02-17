import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeaderMenuStyled from '../components/HeaderMenuStyled'

describe('HeaderMenuStyled', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HeaderMenuStyled />)
    expect(getByText('My Website')).toBeInTheDocument()
  })

  // FIXME: This test is not working
  //   it('shows menu on hover', () => {
  //     const { getByText, queryByText } = render(<HeaderMenuStyled />)
  //     const menuText = getByText('Hover for Menu')
  //     fireEvent.mouseOver(menuText)
  //     expect(getByText('Profile')).toBeInTheDocument()
  //     fireEvent.mouseLeave(menuText)
  //     expect(queryByText('Profile')).not.toBeInTheDocument()
  //   })
})
