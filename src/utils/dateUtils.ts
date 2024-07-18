export const getLocalizedTime = (hours: number, minutes: number = 0): Date => {
  const date = new Date()
  date.setUTCHours(hours, minutes, 0, 0)
  return date
}

export const getMinTime = (selectedDate: Date | null): Date => {
  const now = new Date();
  const minTime = getLocalizedTime(9);
  if (selectedDate && selectedDate.toDateString() === now.toDateString()) {
    if (now > minTime) {
      const nextHour = new Date(now);
      nextHour.setUTCHours(now.getUTCHours() + 1, 0, 0, 0);
      return nextHour;
    }
  }
  return minTime;
}

export const getMaxTime = (): Date => {
  return getLocalizedTime(22)
}

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

export const filterAppointmentTime = (time: Date, date: Date): boolean => {
  const selectedDate = date
  const now = new Date()
  if (selectedDate.toDateString() === now.toDateString()) {
    return time >= getMinTime(selectedDate)
  }
  return true
}