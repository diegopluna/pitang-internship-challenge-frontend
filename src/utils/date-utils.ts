export const getLocalizedTime = (hours: number, minutes: number = 0): Date => {
  const date = new Date()
  date.setUTCHours(hours, minutes, 0, 0)
  return date
}

export const getMinTime = (selectedDate: Date | null): Date => {
  const now = new Date()
  const minTime = getLocalizedTime(9) // 9 AM

  if (selectedDate && selectedDate.toDateString() === now.toDateString()) {
    return now > minTime ? now : minTime
  }
  return minTime
}

export const getMaxTime = (): Date => {
  return getLocalizedTime(22) // 10 PM
}

export const getMinDate = (): Date => {
  const now = new Date()
  console.log('now', now)
  const maxTime = getMaxTime()
  console.log('maxTime', maxTime)
  const minTime = getLocalizedTime(9) // 9 AM
  console.log('minTime', minTime)

  if (now > maxTime) {
    now.setUTCDate(now.getUTCDate() + 1)
    now.setUTCHours(9, 0, 0, 0)
  } else if (now < minTime) {
    now.setUTCHours(9, 0, 0, 0)
  } else if (now >= minTime) {
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