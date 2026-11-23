import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Hero } from './Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  args: {
    eyebrow: 'Software engineering consultancy',
    title: 'Senior engineering, from direction to production',
    subtitle: 'Modernize legacy software and build internal tools.',
    children: <p>A practical plan, then hands-on delivery by the same people who scoped it.</p>,
    actions: (
      <>
        <Button>Discuss your project</Button>
        <Button variant="secondary">See the work</Button>
      </>
    ),
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const placeholderMedia = (
  <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-surface-alt text-muted">
    Image placeholder
  </div>
);

export const WithMedia: Story = {
  args: { media: placeholderMedia },
};

export const WithMediaStart: Story = {
  args: { media: placeholderMedia, mediaPosition: 'start' },
};

export const WithMinHeight: Story = {
  args: { media: placeholderMedia, className: 'lg:min-h-[480px]' },
};
