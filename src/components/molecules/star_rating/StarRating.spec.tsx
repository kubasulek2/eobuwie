import { render, screen } from '@testing-library/react';
import StarRating from "./StarRating";

describe('snapshot', () => {
	it('Matches the snapshot', () => {
		expect(render(<StarRating score={5} votes={100} />)).toMatchSnapshot();
	});
});



it('Renders star rating', () => {
  render(<StarRating score={5} votes={100} />);
  expect(screen.getByTestId('star_rating')).toBeInTheDocument();
});


it('Has proper label', () => {
  render(<StarRating score={5} votes={100} />);
  screen.getByLabelText('5', {exact: false}); // 5 is rating, and must be in label text 
  screen.getByLabelText('100', {exact: false}); // 5 is votes number, and must be in label text 
});

it('Displays right score', () => {
  render(<StarRating score={3.5} votes={100} />);
  expect(screen.getAllByText('star')).toHaveLength(3); // 4 full stars
  expect(screen.getAllByText('star_half')).toHaveLength(1); // 1 half star
  expect(screen.getAllByText('star_border')).toHaveLength(1); // 1 empty star
});

it('Displays right vote\'s number', () => {
  render(<StarRating score={4.5} votes={100} />);
  screen.getByText("100");
});


