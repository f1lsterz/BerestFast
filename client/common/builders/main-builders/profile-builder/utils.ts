export const formatDate = (isoDate: string | undefined): string => {
  if (!isoDate) {
    return ''; 
  }

  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Kyiv",
  };

  return new Intl.DateTimeFormat("uk-UA", options).format(date);
};
