export default function electronPlatform() {
  return (typeof process !== 'undefined' && process && process.platform) || 'unknown';
}
