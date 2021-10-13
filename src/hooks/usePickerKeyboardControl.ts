import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {crossBrowserElClosest} from "../utils/crossBrowserElClosest";
import {findFocusableElements} from "../utils/findFocusableElements";

/**
 * Handles focus and simplified keyboard control of modal picker.
 * @param id - picker modal id
 */
export function usePickerKeyboardControl (pickerOpen: boolean, setPickerOpen: Dispatch<SetStateAction<boolean>>, id: string) {

  const [lastActiveElement, setLastActiveElement] = useState<Element | null>(null);

  // handle keyboard and mouse during select open
  useEffect(() => {
    // closes popup when clicked anywhere outside
    const mouseHandler = (e: MouseEvent) => {
      if (!crossBrowserElClosest(e.target as Element, "#" + id)) {
        setPickerOpen(false);
      }
    };

    // Handles keyboard interactions
    const keyboardHandler = (e: KeyboardEvent) => {
      // prevent default, all keyboard interactions hanlded programatically
      e.preventDefault();
      // handle escape key
      if (e.key === "Escape") {
        setPickerOpen(false);
        return;
      }

      // All focusable elements within popup.
      const picker = document.getElementById(id);
      if (!picker) throw new Error('Picker modal not found in document. Given id : ' + id);

      // Find all focusable elements
      const elements: HTMLElement[] = findFocusableElements(picker);

      const focusIndex = elements.findIndex((el) => el === document.activeElement);

      // return if no elements to switch focus
      if (!elements.length) return;

      // Tab without shift pressed or down arrow
      if ((e.key === "Tab" && !e.shiftKey) || e.key === "ArrowRight") {
        if (focusIndex === -1 && ("focus" in elements[0])) elements[0].focus();
        else elements[(focusIndex + 1) % elements.length].focus();
        return;
      }

      // Tab without shift pressed or down arrow
      if ((e.key === "Tab" && e.shiftKey) || e.key === "ArrowLeft") {
        if (focusIndex === -1) return;
        else elements[((focusIndex === 0 ? elements.length : focusIndex) - 1) % elements.length].focus();
        return;
      }

      // if focus is on list element, click it on enter.
      if (e.key === "Enter" && focusIndex > -1) {
        elements[focusIndex].click();
        return;
      }
    };

    // attach listeners when popup open
    if (pickerOpen) {
      document.addEventListener("click", mouseHandler);
      document.addEventListener("keydown", keyboardHandler);
    }
    return () => {
      document.removeEventListener("click", mouseHandler);
      document.removeEventListener("keydown", keyboardHandler);
    };
  }, [pickerOpen, setPickerOpen, id]);


  // handle focus on open and close
  useEffect(() => {
    // open first focusable element and store currently focused
    const picker = document.getElementById(id);
    if (pickerOpen && picker && !lastActiveElement) {

      setLastActiveElement(document.activeElement);

      const firstFocusableEl = findFocusableElements(picker)[0];
      if (firstFocusableEl) firstFocusableEl.focus();

    } else if (!pickerOpen && lastActiveElement) {
      (lastActiveElement as HTMLElement).focus();
      setLastActiveElement(null);
    }

  }, [pickerOpen, lastActiveElement, setLastActiveElement, id]);

}