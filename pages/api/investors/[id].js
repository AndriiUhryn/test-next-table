import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const id = req.query.id
  const data = {
    name: req.body.name,
    email: req.body.email,
    equity: +req.body.equity,
    allocation: +req.body.allocation,
  }

  if (req.method === 'PATCH') {
    const post = await prisma.investor.update({
      where: { id: Number(id) },
      data,
    })

    res.json(post)
  } else if (req.method === 'DELETE') {
    await prisma.investor.delete({
      where: { id: Number(id) },
    })

    res.status(200).send()
  } else {
    res
    .status(400)
    .json(new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    ))
  }
}
