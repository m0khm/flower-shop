import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  const data = JSON.parse(
    readFileSync(path.resolve(process.cwd(), 'public/plants.json'), 'utf-8')
  );
  res.status(200).json(data);
}
