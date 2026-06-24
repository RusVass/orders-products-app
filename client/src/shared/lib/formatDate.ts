const MONTH_ABBREVIATIONS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export interface FormattedDate {
  /** MM/YY, e.g. "04/17" */
  short: string;
  /** DD/MMM/YYYY, e.g. "06/Apr/2017" */
  full: string;
}

// Parses the leading YYYY-MM-DD directly rather than going through `Date`,
// since `Date` parsing of a date-only string ("2017-04-06") treats it as
// UTC midnight while a datetime string with no zone ("2024-01-15T10:00:00")
// is treated as local time - inconsistent, and either can shift the
// displayed day by one depending on the viewer's timezone. Order.date is
// always our own fixed "YYYY-MM-DD HH:mm:ss" format, so this is safe.
export const formatDate = (date: string): FormattedDate => {
  const [year, month, day] = date.slice(0, 10).split('-');
  const monthAbbreviation = MONTH_ABBREVIATIONS[Number(month) - 1];
  const shortYear = year.slice(-2);

  return {
    short: `${month}/${shortYear}`,
    full: `${day}/${monthAbbreviation}/${year}`,
  };
};
