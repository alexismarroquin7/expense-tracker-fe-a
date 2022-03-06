export const stringifyDate = ({
  year,
  month,
  day
}) => {
  
  const monthToUse = `${month < 10 && '0'}${month}`;
  const dayToUse = `${day < 10 && '0'}${day}`;
  
  return `${year}-${monthToUse}-${dayToUse}`;
}