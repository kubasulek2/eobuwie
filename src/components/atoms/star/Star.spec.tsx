import { render, screen } from '@testing-library/react';
import Star from './Star';

describe('snapshot', () => {
	it('Matches the snapshot', () => {
    expect(render(<Star />)).toMatchSnapshot();
	});
});



it('Renders star', () => {
  render(<Star />);
  expect(screen.getByTestId('star')).toBeInTheDocument();
});

it('Has presentation role', () => {
  render(<Star />);
  screen.getByRole('presentation', {hidden: true});
});

it('Appends custom classes', () => {
  const classes = ['test1', 'test2'];
  render(<Star classes=
    {classes} />);
  const star = screen.getByRole('presentation', {hidden: true});
  expect(star.firstElementChild!.classList).toContain(classes[0]);
  expect(star.firstElementChild!.classList).toContain(classes[1]);
});


