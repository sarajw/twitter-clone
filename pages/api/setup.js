import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session) return res.end()

  if (req.method === 'POST') {
    const userExists = await prisma.user.findMany({
      where: {
        name: req.body.name,
      },
    })
console.log(userExists)
    if(userExists.length){
		  return res
        .status(409)
        .json({ message: `User name ${req.body.name} taken! Try another.` })
    }

    if(!userExists.length){
      await prisma.user.update({
        where: { email: session.user.email },
        data: {
          name: req.body.name,
        },
      })
		  return res
        .status(201)
        .end()
    }
      
  }
}