import {render, screen} from '@testing-library/react';
import ReservationHeader from "./ReservationHeader";

describe('snapshot', () => {
  it('Matches the snapshot', () => {
    expect(render(<ReservationHeader score={5} votes={100} price={200} />)).toMatchSnapshot();
  });
});

beforeEach(() => {
  render(<ReservationHeader score={5} votes={100} price={200} />);

});

it('Renders', () => {
  expect(screen.getByTestId('card_header')).toBeInTheDocument();
});



it('Has price label', () => {
  screen.getByLabelText('price', {exact: false}); 
});

it('Displays reservation price', () => {
  screen.getByText("200", {exact: false});
  screen.getByText("zł", {exact: false});
});


it('Displays stars rating', () => {
  screen.getByTestId("star_rating");
});


