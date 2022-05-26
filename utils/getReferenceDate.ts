export const getReferenceDate = (days: number) => {
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() - days);

  return referenceDate;
};
