import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    eyebrow: 'Legacy modernization',
    title: 'High-traffic platform migration',
    description: 'Moved 12 platforms from legacy stacks toward Node.js microservices, with minimal downtime.',
    tags: ['Node.js', 'Docker', 'AWS'],
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLink: Story = {
  args: { href: 'https://example.com/case-study' },
};

export const WithFooter: Story = {
  args: {
    footer: (
      <Button variant="secondary" size="sm">
        View details
      </Button>
    ),
  },
};
