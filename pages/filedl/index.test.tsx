// Checkbox.test.tsx
import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from '.'

// Checkbox コンポーネントのテスト
describe('Checkbox', () => {
  describe('チェックをつける', () => {
    it('チェックをつける', () => {
      const { getByTestId } = render(<Checkbox />)
      const checkbox = getByTestId('checkbox')

      // 初期状態ではチェックがついていないことを確認
      expect(checkbox).not.toBeChecked()

      // チェックをつける
      fireEvent.click(checkbox)

      // チェックがついていることを確認
      expect(checkbox).toBeChecked()
    })
  })

  // 新しいレンダリングでチェックがついていないことを確認するテスト
  describe('新しいレンダリングでチェックがついていない', () => {
    it('新しいレンダリングでチェックがついていない', () => {
      const { getByTestId } = render(<Checkbox />)
      const checkbox = getByTestId('checkbox')

      // 初期状態ではチェックがついていないことを確認
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('チェックをつけてから外す', () => {
    it('チェックをつけてから外す', () => {
      const { getByTestId } = render(<Checkbox />)
      const checkbox = getByTestId('checkbox')

      // チェックをつける
      fireEvent.click(checkbox)
      // チェックがついていることを確認
      expect(checkbox).toBeChecked()

      // チェックを外す
      fireEvent.click(checkbox)
      // チェックが外れていることを確認
      expect(checkbox).not.toBeChecked()
    })
  })
})
