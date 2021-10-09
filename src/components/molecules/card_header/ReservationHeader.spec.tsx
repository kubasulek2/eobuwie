import {render, screen} from '@testing-library/react';
import CardHeader from "./ReservationHeader";

describe('snapshot', () => {
  it('Matches the snapshot', () => {
    // expect(render(<CardHeader score={5} votes={100} price={200} />)).toMatchSnapshot();
  });
});

beforeEach(() => {
  render(<CardHeader score={5} votes={100} price={200} />);

});

it('Renders', () => {
  expect(screen.getByTestId('card_header')).toBeInTheDocument();
});

it('Renders divider', () => {
  expect(screen.getByTestId('divider')).toBeInTheDocument();
});


it('Has price label', () => {
  screen.getByLabelText('price', {exact: false}); 
});

it('Displays reservation price', () => {
  screen.getByText("200", {exact: false});
  screen.getByText("zł", {exact: false});
});
it('Displays right score', () => {
  expect(screen.getAllByText('star')).toHaveLength(3); // 4 full stars
  expect(screen.getAllByText('star_half')).toHaveLength(1); // 1 half star
  expect(screen.getAllByText('star_border')).toHaveLength(1); // 1 empty star
});

it('Displays right vote\'s number', () => {
  screen.getByText("100");
});


