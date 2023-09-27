// fist uppercase
export function fuc(a: string): string {
  return a.charAt(0).toUpperCase() + a.slice(1);
}

// includes
export function includes<T>(arr: T[], item: T): boolean {
  return arr.indexOf(item) !== -1;
}
