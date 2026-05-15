export const parseDigiDate = (dateStr: string) => {
  if (!dateStr) return null;

  const parts = dateStr.split(".");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);

  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
};
