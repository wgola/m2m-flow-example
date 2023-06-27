export const getCurrentEpoch = (): number =>
  Math.floor(new Date().getTime() / 1000);
