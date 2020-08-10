export const getFormateDate = (utc) => {
  const date = new Date(utc)

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()

  function pd(unit) {
    return unit > 9 ? unit : '0' + unit
  }

  return `${year}-${pd(month)}-${pd(day)} ${pd(hour)}:${pd(minute)}`
}