import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const slides = [
  { quote: 'The migration plan was clear from week one.', by: 'Engineering lead, retail client' },
  { quote: 'Releases stopped being a risk. We ship weekly now.', by: 'CTO, logistics company' },
  { quote: 'They left the team better at reviewing its own code.', by: 'Product manager, fintech' },
];

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    label: 'Client testimonials',
    children: slides.map((slide) => (
      <figure key={slide.by} className="flex flex-col gap-3">
        <blockquote className="text-lg text-fg">“{slide.quote}”</blockquote>
        <figcaption className="text-sm text-muted">{slide.by}</figcaption>
      </figure>
    )),
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartingOnSecond: Story = {
  args: { defaultIndex: 1 },
};
