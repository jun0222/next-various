import React from 'react'
import { Story, Meta } from '@storybook/react'
import HeaderMenu from '@/components/HeaderMenu'

export default {
  title: 'Example/HeaderMenu',
  component: HeaderMenu,
} as Meta

const Template: Story = (args) => <HeaderMenu {...args} />

export const Default = Template.bind({})
