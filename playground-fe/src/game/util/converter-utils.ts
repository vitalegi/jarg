export function asString(value: unknown): string {
  if (value !== null && typeof value === 'string') {
    return value;
  }
  throw Error(`not a string: ${value}`);
}

export function asNumber(value: unknown): number {
  if (value === null) {
    throw Error('value is null');
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return Number.parseInt(value);
  }
  throw Error(`not a number: ${value}`);
}
