import React from 'react'
import Task from '../components/Task'
import { StoryFn, Meta } from '@storybook/react'

export default {
  component: Task,
  title: 'Task',
} as Meta

// TaskPropsから直接`task`プロパティの型を抽出し、それを`args`の型として使用します。
// これにより、`args`が`TaskProps`の`task`プロパティと完全に一致することを強制します。
const Template: StoryFn<typeof Task> = (args) => <Task {...args} />

// デフォルトのストーリー。
// `bind({})`を使用してテンプレートから新しいストーリーインスタンスを生成します。
// `args`には、コンポーネントに渡されるプロップスのデフォルト値を設定します。
export const Default = Template.bind({})
Default.args = {
  task: {
    id: '1', // 必須プロパティ`id`
    title: 'Test Task', // 必須プロパティ`title`
    state: 'TASK_INBOX', // 必須プロパティ`state`
  },
}

// ピン留めされたタスクのストーリー。
// `Default.args`からプロパティを拡張して、`state`を`TASK_PINNED`に上書きします。
export const Pinned = Template.bind({})
Pinned.args = {
  task: {
    ...(Default.args.task as { id: string; title: string; state: string }), // undefinedの可能性を推論するため型アサーションを使用
    state: 'TASK_PINNED',
  },
}

// アーカイブされたタスクのストーリー。
// `Default.args`からプロパティを拡張して、`state`を`TASK_ARCHIVED`に上書きします。
export const Archived = Template.bind({})
Archived.args = {
  task: {
    ...(Default.args.task as { id: string; title: string; state: string }), // undefinedの可能性を推論するため型アサーションを使用
    state: 'TASK_ARCHIVED',
  },
}
