import React from 'react'
import { Story, Meta } from '@storybook/react'
import ShowUserDataScreen from '@/components/ShowUserDataScreen'
import { UserProvider } from 'contexts/UserContext'

export default {
  title: 'ShowUserDataScreen',
  component: ShowUserDataScreen,
  decorators: [(story) => <UserProvider>{story()}</UserProvider>],
} as Meta

const Template: Story = () => <ShowUserDataScreen />

export const Default = Template.bind({})
