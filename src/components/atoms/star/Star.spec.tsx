import { render, screen } from '@testing-library/react';
import Star from './Star';

describe('snapshot', () => {
	it('Matches the snapshot', () => {
		// expect(render(<DayLabel weekDay={weekDay} when="today" value={day} />)).toMatchSnapshot();
	});
});



it('Renders star', () => {
  render(<Star />);
  expect(screen.getByTestId('star')).toBeInTheDocument();
});

it('Has presentation role', () => {
  render(<Star />);
  screen.getByRole('presentation');
});

it('Appends custom classes', () => {
  const classes = ['test1', 'test2'];
  render(<Star classes=
    {classes} />);
  const star = screen.getByRole('presentation');
  expect(star.firstElementChild!.className).toContain(classes[0]);
  expect(star.firstElementChild!.className).toContain(classes[1]);
});


