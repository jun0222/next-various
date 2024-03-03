import React from 'react'
import { Story, Meta } from '@storybook/react'
import AgGridExample from '@/components/AgGridExample'

export default {
  title: 'Example/AgGridExample',
  component: AgGridExample,
} as Meta

const Template: Story = (args) => <AgGridExample {...args} />

export const Default = Template.bind({})
Default.args = {}
