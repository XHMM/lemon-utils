/**
 * @example
 * const obj = getHiddenInputValues<'name'|'age'>();
 * obj.name // string
 * obj.length // ts check error
 */
export function getHiddenInputValues<T extends string>(): Record<T, string> {
  const res: Record<any, string> = {};

  if (typeof window === "undefined") {
    console.warn(`only support in browser environment`);
    return res;
  }

  const $elements = document.querySelectorAll<HTMLInputElement>(
    'input[type="hidden"]'
  );
  $elements.forEach($e => {
    const id = $e.getAttribute("id");
    if (!id) {
      console.warn(`found a hidden input without id attribute, skipped`);
      return;
    }
    res[id] = $e.value;
  });
  return res;
}
