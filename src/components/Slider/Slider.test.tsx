import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './Slider';

const slides = ['First quote', 'Second quote', 'Third quote'];

function renderSlider() {
  return render(
    <Slider label="Testimonials">
      {slides.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </Slider>,
  );
}

describe('Slider', () => {
  it('shows only the first slide by default and marks its dot as current', () => {
    renderSlider();

    expect(screen.getByText('First quote')).toBeVisible();
    expect(screen.getByText('Second quote')).not.toBeVisible();
    expect(screen.getByRole('button', { name: 'Show slide 1' })).toHaveAttribute('aria-current', 'true');
  });

  it('wraps from the last slide back to the first with the next button', async () => {
    const user = userEvent.setup();
    renderSlider();

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText('Third quote')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText('First quote')).toBeVisible();
  });

  it('changes slides with the arrow keys when the carousel has focus', async () => {
    const user = userEvent.setup();
    renderSlider();

    screen.getByRole('button', { name: 'Next slide' }).focus();
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByText('Third quote')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Show slide 3' })).toHaveAttribute('aria-current', 'true');
  });
});
