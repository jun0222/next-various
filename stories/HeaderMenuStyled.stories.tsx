import React from 'react'
import { Story, Meta } from '@storybook/react'
import HeaderMenuStyled from '../components/HeaderMenuStyled'

export default {
  title: 'Example/HeaderMenuStyled',
  component: HeaderMenuStyled,
} as Meta

const Template: Story = (args) => <HeaderMenuStyled {...args} />

export const Default = Template.bind({})
