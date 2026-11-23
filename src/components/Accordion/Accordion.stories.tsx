import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const items = [
  {
    id: 'audit',
    title: 'What does an architecture audit include?',
    content: 'A review of your codebase, infrastructure, and delivery process, with a prioritized written plan.',
    defaultOpen: true,
  },
  {
    id: 'timeline',
    title: 'How long does a typical engagement take?',
    content: 'Audits usually take two to three weeks. Feature builds are scoped per project.',
  },
  {
    id: 'team',
    title: 'Who will I work with?',
    content: 'The people who scope the work also deliver it. There are no handoffs to a separate team.',
  },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: { items },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleOpen: Story = { args: { exclusive: false } };
