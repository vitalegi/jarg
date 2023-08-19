export function asString(value: unknown): string {
  if (value === null || value == undefined) {
    throw Error('value is null/undefined');
  }
  if (typeof value === 'string') {
    return value;
  }
  throw Error(`not a string: ${value}`);
}

export function asNumber(value: unknown): number {
  if (value === null || value == undefined) {
    throw Error('value is null/undefined');
  }
  if (typeof value === 'number') {
    return value;
  }
  throw Error(`not a number: ${value}`);
}

export function asBoolean(value: unknown): boolean {
  if (value === null || value == undefined) {
    throw Error('value is null/undefined');
  }
  if (typeof value === 'boolean') {
    return value;
  }
  throw Error(`not a boolean: ${value}`);
}
