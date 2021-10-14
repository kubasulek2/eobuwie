import {CalendarDate} from "../components/organisms/ReservationCard/types";
import {computeCalendarDays} from './computeCalendarDays';
import addDays from 'date-fns/addDays';




it('Works with numbers, dates and mixed', () => {
  const startDate = new Date(2021, 12, 24);
  const endDate = new Date(2021, 12, 26);
  const availableDates: CalendarDate[] = [];
  /* Numbers */
  expect(() => computeCalendarDays(startDate.getTime(), endDate.getTime(), availableDates)).not.toThrowError();
  /* Dates */
  expect(() => computeCalendarDays(startDate, endDate, availableDates)).not.toThrowError();
  /* Mixed */
  expect(() => computeCalendarDays(startDate, endDate.getTime(), availableDates)).not.toThrowError();

});

it('Throws when start date is after end date', () => {
  const startDate = new Date(2021, 12, 26);
  const endDate = new Date(2021, 12, 24);
  const availableDates: CalendarDate[] = [];

  expect(() => computeCalendarDays(startDate, endDate, availableDates)).toThrowError();

});

it('Works for single day only', () => {
  const availableDates: CalendarDate[] = [];
  const startDate = new Date(2021, 12, 26);
  const days = computeCalendarDays(startDate, startDate, availableDates);

  expect(days).toHaveLength(1);
  expect(days[0].date).toEqual(startDate);

});

it('Assigns correct numbers for days of the week', () => {
  const startDate = new Date(2021, 11, 26);
  const availableDates: CalendarDate[] = [];
  const midDate = new Date(2021, 11, 29);
  const endDate = new Date(2021, 11, 31);

  const days = computeCalendarDays(startDate, endDate, availableDates);

  expect(days[0].weekDay).toBe(startDate.getDay());
  expect(days[days.length - 1].weekDay).toBe(endDate.getDay());
  expect(days[3].weekDay).toBe(midDate.getDay());
});

it('Calculates today\'s date', () => {
  const availableDates: CalendarDate[] = [];
  const startDate = new Date();
  const endDate = addDays(startDate, 2);

  const days = computeCalendarDays(startDate, endDate, availableDates, new Date());

  expect(days[0].today).toBe(true);
  expect(days[1].today).toBe(false);
  expect(days[2].today).toBe(false);
});

it('Handles available dates', () => {
  const startDate = new Date();
  // second of three available
  const availableDates: CalendarDate[] = [addDays(startDate, 1)];
  const endDate = addDays(startDate, 2);
  
  const days = computeCalendarDays(startDate, endDate, availableDates);
  
  expect(days[0].available).toBe(false);
  // second of three available
  expect(days[1].available).toBe(true);
  expect(days[2].available).toBe(false);
});

