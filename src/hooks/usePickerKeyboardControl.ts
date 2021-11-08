import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {crossBrowserElClosest} from '../utils/crossBrowserElClosest';
import {findFocusableElements} from '../utils/findFocusableElements';

/**
 * Handles focus and simplified keyboard control of modal picker.
 * For up and down arrow navigations to work, elements must be groupped in columns via data-column attributes
 * @param pickerId - controlling component id
 * @param modalId - popup component id
 */
export function usePickerKeyboardControl(
	pickerOpen: boolean,
	setPickerOpen: Dispatch<SetStateAction<boolean>>,
	pickerId: string,
	modalId: string,
) {
	/* Helps handle restoring focus after closing date picker */
	const [lastActiveElement, setLastActiveElement] = useState<Element | null>(
		null,
	);

	// handle keyboard and mouse during select open
	useEffect(() => {
		// closes popup when clicked anywhere outside
		const mouseHandler = (e: MouseEvent) => {
			if (!crossBrowserElClosest(e.target as Element, '#' + modalId)) {
				setPickerOpen(false);
			}
		};

		// Handles keyboard interactions
		const keyboardHandler = (e: KeyboardEvent) => {
			// prevent default, all keyboard interactions hanlded programatically
			e.preventDefault();
			// handle escape key
			if (e.key === 'Escape' || e.key === 'Esc') {
				setPickerOpen(false);
				return;
			}

			// find actual modal component
			const picker = document.getElementById(modalId);
			if (!picker)
				throw new Error(
					'Picker modal not found in document. Given id : ' + modalId,
				);

			// Find all focusable elements
			const elements: HTMLElement[] = findFocusableElements(picker);
			// Check if picker supports vertical navigation
			const hasColumns = Boolean(picker.querySelector('[data-column]'));

			const focusIndex = elements.findIndex(
				(el) => el === document.activeElement,
			);

			// return if no elements to switch focus
			if (!elements.length) return;

			// Tab without shift pressed or down arrow
			if ((e.key === 'Tab' && !e.shiftKey) || e.key === 'ArrowRight' || e.key === 'Right') {
				if (focusIndex === -1) elements[0].focus();
				else elements[(focusIndex + 1) % elements.length].focus();
				return;
			}

			// Tab without shift pressed or down arrow
			if ((e.key === 'Tab' && e.shiftKey) || e.key === 'ArrowLeft' || e.key === 'Left') {
				if (focusIndex === -1) elements[elements.length - 1].focus();
				else
					elements[
						((focusIndex === 0 ? elements.length : focusIndex) - 1) %
							elements.length
					].focus();
				return;
			}

			// if focus is on list element, click it on enter.
			if (e.key === 'Enter' && focusIndex > -1) {
				elements[focusIndex].click();
				return;
			}

			// Handle up and down arrows here.
			// Will only work if elements are groupped in columns via data-column attribute
			if (!hasColumns) return;

			if (
				e.key === 'ArrowUp' ||
				e.key === 'ArrowDown' ||
				e.key === 'Down' ||
				e.key === 'Up'
			) {
				// remember key
				const keyDown = e.key === 'ArrowDown' || e.key === 'Down';
				// get current column
				const colNum = (document.activeElement as HTMLElement).dataset.column;
				// when not in column yet, focus first or last element, depending on key pressed
				if (!colNum) {
					elements[keyDown ? 0 : elements.length - 1].focus();
					return;
				}

				// current column elements
				const colElements: HTMLElement[] = Array.from(
					document.querySelectorAll(`[data-column="${colNum}"`),
				);

				// return if column elements not found
				if (!colElements.length) return;

				// find index of active element inside a column
				const colIndex = colElements.findIndex(
					(el) => el === document.activeElement,
				);

				// should not happen
				if (colIndex < 0) return;

				// one up or down in the column
				if (keyDown) colElements[(colIndex + 1) % colElements.length].focus();
				else
					colElements[
						((colIndex === 0 ? colElements.length : colIndex) - 1) %
							colElements.length
					].focus();
			}
		};

		// attach listeners when popup open
		if (pickerOpen) {
			document.addEventListener('click', mouseHandler);
			document.addEventListener('keydown', keyboardHandler);
		}
		return () => {
			document.removeEventListener('click', mouseHandler);
			document.removeEventListener('keydown', keyboardHandler);
		};
	}, [pickerOpen, setPickerOpen, modalId]);

	// handle focus on open and close
	useEffect(() => {
		// open first focusable element and store currently focused
		const picker = document.getElementById(modalId);
		if (pickerOpen && picker && !lastActiveElement) {
			// save last focused element
			setLastActiveElement(document.activeElement);

			// focus first element in the picker if picker was open via keyboard
			const firstFocusableEl = findFocusableElements(picker)[0];
			if (
				firstFocusableEl &&
				document.activeElement &&
				crossBrowserElClosest(document.activeElement, '#' + pickerId)
			)
				firstFocusableEl.focus();

			// restore privious focus on picker close
		} else if (!pickerOpen && lastActiveElement) {
			(lastActiveElement as HTMLElement).focus();
			setLastActiveElement(null);
		}
	}, [pickerOpen, lastActiveElement, setLastActiveElement, modalId, pickerId]);
}
