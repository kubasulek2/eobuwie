declare global {
  interface Element {
    msMatchesSelector(selectors: string): boolean;
  }
}

/**
 * Function returns true if selector matches element, or any ancestor in the element's ancestors chain.
 * Otherwise returns false.
 */
export function crossBrowserElClosest(el: Element, selector: string): boolean {
  // incorrect typescript interface, cast element to any to avoid error
  if (!(Element as any).prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  
  // incorrect typescript interface, cast element to any to avoid error
  if ((Element as any).prototype.closest) return Boolean(el.closest(selector));

  do {
    if (el.matches(selector)) return true;
    (el as unknown) = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return false;
}
