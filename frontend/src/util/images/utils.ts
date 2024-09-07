export function trim(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export function debounce(func: Function, wait: number): Function {
  let timeout: NodeJS.Timeout | null;
  return function (...args: any[]) {
    const context = this as any;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}