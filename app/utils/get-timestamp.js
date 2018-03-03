export default function getTimestamp() {
  return String(Math.round(Date.now() / 1000));
}
