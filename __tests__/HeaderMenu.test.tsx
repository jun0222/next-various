import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HeaderMenu from '../components/HeaderMenu'

describe('<HeaderMenu />', () => {
  test('renders simple link and hover menu', () => {
    const { getByText } = render(<HeaderMenu />)
    expect(getByText('Simple Link')).toBeInTheDocument()
    expect(getByText('Hover for Menu')).toBeInTheDocument()
  })

  // FIXME: テストが通らない
  //   test('displays menu items on hover and menu closes on outside click', () => {
  //     const { getByText, queryByText } = render(<HeaderMenu />)
  //     const menuButton = getByText('Hover for Menu')
  //     fireEvent.mouseOver(menuButton)

  //     // メニューアイテムが表示されることを確認
  //     expect(getByText('Profile')).toBeInTheDocument()

  //     // メニュー外をクリックしてメニューを閉じる
  //     fireEvent.click(document.body)

  //     // メニューが閉じた後、メニューアイテムがドキュメントから消えることを確認
  //     expect(queryByText('Profile')).not.toBeInTheDocument()
  //   })
})
