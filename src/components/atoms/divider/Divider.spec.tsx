import {render, screen} from '@testing-library/react';
import Divider from './Divider';

describe('snapshot', () => {
  it('Matches the snapshot', () => {
    expect(render(<Divider />)).toMatchSnapshot();
  });
});



it('Renders Divider', () => {
  render(<Divider />);
  expect(screen.getByTestId('divider')).toBeInTheDocument();
});


it('Appends custom classes', () => {
  const classes = ['test1', 'test2'];
  render(<Divider classes={classes} />);
  const d = screen.getByTestId('divider');
  expect(d.className).toContain(classes[0]);
  expect(d.className).toContain(classes[0]);
});


