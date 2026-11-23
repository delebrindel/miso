import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    label: 'Account settings',
    tabs: [
      { id: 'profile', label: 'Profile', content: <p>Name, email, and avatar.</p> },
      { id: 'billing', label: 'Billing', content: <p>Plan, invoices, and payment method.</p> },
      { id: 'team', label: 'Team', content: <p>Members and roles.</p> },
      { id: 'api', label: 'API', content: <p>Keys are hidden until you request them.</p>, disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
