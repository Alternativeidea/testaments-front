import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.setHeader('Set-Cookie', [
            'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
            'user=; Path=/namizje; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
            'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        ])
        res.status(200).json({ message: 'Logged out' })
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
