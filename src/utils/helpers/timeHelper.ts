const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60); // Calculate minutes
  const seconds = time % 60; // Calculate seconds
  // Return the formatted string
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};

export { formatTime };
