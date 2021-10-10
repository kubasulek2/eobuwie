import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const onChange = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('snapshot', () => {
  it('Matches the snapshot', () => {
    expect(render(<Input value="test" onChange={onChange} />)).toMatchSnapshot();
  });
});



it('Renders Input', () => {
  render(<Input value="test" onChange={onChange} />);
  expect(screen.getByDisplayValue('test')).toBeInTheDocument();
});

it('Displays placeholder', () => {
  render(<Input value="" placeholder="test" onChange={onChange} />);
  screen.getByPlaceholderText('test');
});

it('Calls onChange callback', () => {
  render(<Input value="test" onChange={onChange} />);
  const input = screen.getByDisplayValue('test');
  userEvent.type(input, "tests");
  expect(onChange).toBeCalled();
});


