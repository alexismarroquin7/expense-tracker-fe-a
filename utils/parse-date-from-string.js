export const parseDateFromString = (dateString) => {
  const dateArr = dateString.split('-');
  
  return {
    year: Number(dateArr[0]),
    month: Number(dateArr[1]),
    day: Number(dateArr[2])
  }
}