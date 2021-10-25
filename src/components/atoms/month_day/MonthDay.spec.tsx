import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MonthDay from './MonthDay';

const onClick = jest.fn();

const renderer = (available = true, first = false, last = false, selected = false) => render(
  <MonthDay
    onClick={onClick}
    available={available}
    column={1}
    dateString="12/10/2020"
    firstSelected={first}
    lastSelected={last}
    monthDay={12}
    selected={selected}
    timeStamp={112030404}
  />);

describe('Rendering', () => {
  it.todo('Matches screenshot', //() => {
    //   expect(renderer()).toMatchSnapshot();
    // }
  );

  it('Renders', () => {
    renderer();
    expect(screen.getByTestId("month_day")).toBeInTheDocument();
  });
  
  it('Renders month day', () => {
    renderer();
    screen.getByText("12");
  });
});

describe('Accessibility', () => {

});

describe('Functionality', () => {

});