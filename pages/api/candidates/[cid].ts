/*
 * [cid].ts
 * Ian Kollipara
 * 2022-10-03
 *
 * Candidate API
 */

// Imports
import type { Candidate } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/prismadb";

const patchHandler = async (req: NextApiRequest) => {
    const { cid } = req.query;
    const updateBody = JSON.parse(req.body);

    const updatedCandidate = await client.candidate.update({
        where: {
            cid: cid as string
        },
        data: {
            ...updateBody
        }
    });

    return updatedCandidate

};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Candidate>
) {
    console.log(req.method, req.body);
    if (req.method === "PATCH") {
        const updatedCandidate = await patchHandler(req);

        res.status(200).json(updatedCandidate);
    }
}
