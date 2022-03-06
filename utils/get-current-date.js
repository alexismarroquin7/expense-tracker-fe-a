export const getCurrentDate = () => {
  const d = new Date();
  
  
  const year = d.getFullYear();
  
  const offset = 1;
  const month = d.getMonth() + offset;
  
  const day = d.getDate();

  return `${year}-${`${month < 10 ? '0' : ''}${month}`}-${`${day < 10 ? '0' : ''}${day}`}`
}