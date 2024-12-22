import type { NextApiRequest, NextApiResponse } from 'next';
import { GET } from '@/server/api/announcement';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return GET(req, res);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 