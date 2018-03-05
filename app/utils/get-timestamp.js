export default function getTimestamp(epoch = Date.now()) {
  return String(Math.round(epoch / 1000));
}
