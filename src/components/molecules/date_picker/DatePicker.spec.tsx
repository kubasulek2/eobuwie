import {render, screen} from '@testing-library/react';
import DatePicker from "./DatePicker";
import format from "date-fns/format";
import userEvent from "@testing-library/user-event";

const setStartDate = jest.fn();
const setEndDate = jest.fn();
const defaultProps = {
  startDate: null,
  setEndDate,
  setStartDate,
  endDate: null,
  availableDates: []
};
beforeEach(() => {
  jest.clearAllMocks();
});


describe('snapshot', () => {
  it('Matches the snapshot', () => {
    // expect(render(<DatePicker {...defaultProps}   />)).toMatchSnapshot();
  });
});



describe('Rendering and accessibility', () => {

  it('Renders', () => {
    render(<DatePicker {...defaultProps} />);
    expect(screen.getByTestId('date_picker')).toBeInTheDocument();
  });

  /* Button */

  it('Renders button with accessible role', () => {
    render(<DatePicker {...defaultProps} />);
    screen.getByRole("button");
  });

  it('Button displays check in/check out info, when dates not set', () => {
    render(<DatePicker {...defaultProps} />);
    screen.getByText("check in", {exact: false});
    screen.getByText("check out", {exact: false});
  });

  it('Button displays in and out dates, when dates are set', () => {
    // start date yesterday, end date todat
    const yesterdayDate = Date.now() - (1000 * 60 * 60 * 24);
    const todayDate = Date.now();

    render(<DatePicker {...defaultProps} startDate={yesterdayDate} endDate={todayDate} />);

    screen.getByText(format(yesterdayDate, "dd/MM/yyyy"), {exact: false});
    screen.getByText(format(todayDate, "dd/MM/yyyy"), {exact: false});
  });

  it('Button has accessible label', () => {
    render(<DatePicker {...defaultProps} />);
    // aria-label
    screen.getByLabelText("datepicker", {exact: false});
  });

  it('Button has accessible description', () => {
    render(<DatePicker {...defaultProps} />);
    // aria-describedby
    const descId = screen.getByRole("button").getAttribute("aria-describedBy");
    const container = screen.getByTestId("date_picker");
    const description = container.querySelector("#" + descId)!.textContent;
    expect(description).toMatch("opens popup dialog");
  });

  it('Button has proper aria attributes', () => {
    render(<DatePicker {...defaultProps} />);
    const btn = screen.getByRole("button");

    expect(btn).toHaveAttribute("aria-controls");
    expect(btn).toHaveAttribute("aria-haspopup", "true");
  });

  /* Picker */

  it('Picker is hidden by default', () => {
    render(<DatePicker {...defaultProps} />);
    expect(() => screen.getByRole("dialog")).toThrow();
  });
  
  it('Open Picker has accessible role', async () => {
    render(<DatePicker {...defaultProps} />);
    userEvent.click(screen.getByRole("button"));
    
    await screen.findByRole("dialog");
    
  });
  
  it('Picker has accessible label', () => {
    render(<DatePicker {...defaultProps} />);
    screen.getByLabelText("reservation dates", {exact: false});
  });
  
  it('Closed picker has proper aria attributes', () => {
    render(<DatePicker {...defaultProps} />);
    const container = screen.getByTestId("date_picker");
    const picker = container.querySelector("div[role='dialog']");
    expect(picker).toHaveAttribute("aria-hidden", "true");
    expect(picker).toHaveAttribute("aria-modal", "false");
  });
  
  it('Open picker has proper aria attributes', async () => {
    render(<DatePicker {...defaultProps} />);
    
    userEvent.click(screen.getByRole("button"));;
    const picker = await screen.findByRole("dialog");
    expect(picker).toHaveAttribute("aria-hidden", "false");
    expect(picker).toHaveAttribute("aria-modal", "true");
  });

});


