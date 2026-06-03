export const encoderJSON = (jsonString: string) =>
  btoa(encodeURIComponent(jsonString))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
