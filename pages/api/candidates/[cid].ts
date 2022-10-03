/** [cid].ts
 * Ian Kollipara
 * 2022-09-26
 *
 * Candidate API Route
 **/


// Imports
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Candidate, PrismaClient } from "@prisma/client"
import client from "../../../lib/prismadb";
import { Option, Some, None } from "@sniptt/monads"

export type Error = {
    msg: string
}

async function getHandler(prismaClient: PrismaClient, cid: string): Promise<Option<Candidate>> {
    const result = await prismaClient.candidate.findUnique({
        where: {
            cid: cid
        }
    })

    return result ? Some(result) : None
}

async function deleteHandler(prismaClient: PrismaClient, cid: string): Promise<Option<string>> {
    const deleteCandidate = prismaClient.candidate.delete({
        where: {
            cid: cid
        }
    })

    const deleteCandidateAddresses = prismaClient.address.deleteMany({
        where: {
            candidate_id: cid
        }
    })

    return Some((await prismaClient.$transaction([deleteCandidateAddresses, deleteCandidate]))[1].cid)
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Candidate | Error>
) {

    const { cid } = req.query

    if (req.method == "GET") {
        const result = await getHandler(client, cid as string);
        if (result.isSome()) res.status(200).json(result.unwrap())
        if (result.isNone()) res.status(404).json({ msg: `${cid} is not associed with a Candidate` })
    } else if (req.method == "DELETE") {
        const result = await deleteHandler(client, cid as string);
        if (result.isSome()) res.status(200).json({ msg: `${cid} was deleted` })
    }
}
