import {joinClassNames } from './joinClassNames';

it('returns empty string for no arguments', () => {
	expect(joinClassNames()).toMatch('');
});


it('joins class names', () => {
	expect(joinClassNames('string1', 'string2')).toMatch('string1 string2');
});