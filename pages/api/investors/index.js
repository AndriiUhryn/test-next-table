import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const collection = await prisma.investor.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
          {
            name: 'desc',
          },
        ],
      })

      res
      .json(collection)
    } else if (req.method === 'POST') {
      const data = {
        name: req.body?.name || '',
        email: req.body?.email || '',
        equity: +req.body?.equity || 0,
        allocation: +req.body?.allocation || 0,
      }

      const post = await prisma.investor.create({
        data,
      })

      res.json(post)
    }
  } catch (error) {
    res
    .status(500)
    .json(error)
  }
}
