// Simulate database delay
export const simulateDBDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
