import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClick = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('snapshot', () => {
  it('Matches the snapshot', () => {
    expect(render(<Button>test</Button>)).toMatchSnapshot();
  });
});



it('Renders Button', () => {
  render(<Button>test</Button>);
  expect(screen.getByText('test')).toBeInTheDocument();
});

it('Has accessible role', () => {
  render(<Button>test</Button>);
  screen.getByRole('button');
});

it('Calls onClick callback', () => {
  render(<Button onClick={onClick}>test</Button>);
  const button = screen.getByRole('button');
  userEvent.click(button);
  expect(onClick).toBeCalledTimes(1);
});


