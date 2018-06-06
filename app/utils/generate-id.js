import nanoid from 'npm:nanoid';

export default function generateId(size = 32) {
  return nanoid(size);
}
