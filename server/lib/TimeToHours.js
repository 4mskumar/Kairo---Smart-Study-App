export const convertToMinutes = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(":").map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };

  export const convertToHHMM = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    // Pad with leading zero if needed
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
  
    return `${paddedHours}:${paddedMinutes}`;
  };
  