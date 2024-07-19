// Get the time in the local timezone
export const getLocalizedTime = (hours: number, minutes: number = 0): Date => {
  const date = new Date()
  date.setUTCHours(hours, minutes, 0, 0)
  return date
}

export const getMinTime = (selectedDate: Date | null): Date => {
  // Get the current time
  const now = new Date();
  // Get the minimum allowed time for an appointment in the local timezone
  const minTime = getLocalizedTime(9);
  // If the selected date is today, check if the current time is after the minimum allowed time
  if (selectedDate && selectedDate.toDateString() === now.toDateString()) {
    if (now > minTime) {
      // If the current time is after the minimum allowed time, return the next hour
      const nextHour = new Date(now);
      nextHour.setUTCHours(now.getUTCHours() + 1, 0, 0, 0);
      return nextHour;
    }
  }
  // If the selected date is not today, return the minimum allowed time
  return minTime;
}

// Get the maximum allowed time for an appointment in the local timezone
export const getMaxTime = (): Date => {
  return getLocalizedTime(22)
}

// Get the minimum allowed date and time for an appointment
export const getMinDate = (): Date => {
  const now = new Date()
  const maxTime = getMaxTime()
  const minTime = getLocalizedTime(9)

  if (now > maxTime) {
    now.setUTCDate(now.getUTCDate() + 1)
    now.setUTCHours(9, 0, 0, 0)
  } else if (now < minTime) {
    now.setUTCHours(9, 0, 0, 0)
  } else {
    now.setUTCHours(now.getUTCHours() + 1, 0, 0, 0)
  }

  return now
}

// Filter the time for an appointment based on the selected date
export const filterAppointmentTime = (time: Date, date: Date): boolean => {
  // Get the selected date
  const selectedDate = date
  // Get the current time
  const now = new Date()
  // Check if the selected date is today
  // If it is, check if the time is after the minimum allowed time
  if (selectedDate.toDateString() === now.toDateString()) {
    return time >= getMinTime(selectedDate)
  }
  // If the selected date is not today, return true
  return true
}