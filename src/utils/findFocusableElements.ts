export function findFocusableElements (el: Element): HTMLElement[] {
  return Array.from(el.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'))
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute("aria-hidden"));
}