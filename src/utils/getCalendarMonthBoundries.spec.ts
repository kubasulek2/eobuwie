import getDay from 'date-fns/getDay';
import getDate from 'date-fns/getDate';
import daysDiff from 'date-fns/differenceInCalendarDays';
import {getCalendarMonthBoundries} from './getCalendarMonthBoundries';



it('Gets proper days for February 2021', () => {
  /* February 2021 is 28 day month starting in Sunday, rare case of 28 days view */
  const [firstDay, lastDay] = getCalendarMonthBoundries(new Date(2015, 1, 1));

  expect(daysDiff(lastDay, firstDay)).toBe(28 - 1);

  /* Monday */
  expect(getDay(firstDay)).toBe(0);
  /* 1st */
  expect(getDate(firstDay)).toBe(1);

  /* Sunday */
  expect(getDay(lastDay)).toBe(6);
  /* 28st */
  expect(getDate(lastDay)).toBe(28);

});

it('Gets proper days for leap-year February 2016', () => {
  const [firstDay, lastDay] = getCalendarMonthBoundries(new Date(2016, 1, 16));

  expect(daysDiff(lastDay, firstDay)).toBe(35 - 1);

  /* Sunday */
  expect(getDay(firstDay)).toBe(0);
  /* Sunday 31st of January */
  expect(getDate(firstDay)).toBe(31);

  /* Saturday */
  expect(getDay(lastDay)).toBe(6);
  /* 5th March */
  expect(getDate(lastDay)).toBe(5);

});

it('Gets proper days for December 2017', () => {
  /* 42 days!! */
  const [firstDay, lastDay] = getCalendarMonthBoundries(new Date(2017, 11, 31));

  expect(daysDiff(lastDay, firstDay)).toBe(42 - 1);

  /* 26th November */
  expect(getDate(firstDay)).toBe(26);

  /* 6th */
  expect(getDate(lastDay)).toBe(6);

});
