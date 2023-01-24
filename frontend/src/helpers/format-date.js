export function formatDate(date) {
  date = new Date(Date.parse(date));
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const hours = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
  }).format(date);
  const minutes = new Intl.DateTimeFormat("en", {
    minute: "2-digit",
  }).format(date);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
