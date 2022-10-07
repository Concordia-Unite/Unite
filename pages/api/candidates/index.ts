/*
 * index.ts
 * Ian Kollipara
 * 2022-10-03
 * 
 * Candidates Index Page
 */

// Imports
import type { NextApiRequest, NextApiResponse } from 'next'
import client from "../../../lib/prismadb"
import type { Candidate } from "@prisma/client"
import { Result, Ok, Err } from "@sniptt/monads"

type Error = {
    message: string
}

type PostBody = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    isMarried: boolean,
    wasRostered: boolean,
    addressHouseNumber: string,
    addressStreet: string,
    addressState: string,
    addressZipCode: string,
    addressCountry: string,
    educationDegree: string,
    educationIsGraduated: boolean,
    educationGraduationDate?: Date,
    educationAt: string
}
const postHandler = async function postHandler(req: NextApiRequest): Promise<Result<Candidate, Error>> {

    const body: PostBody = JSON.parse(req.body);

    try {
        const newCandidate = await client.candidate.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phoneNumber: body.phoneNumber,
                isMarried: body.isMarried,
                wasRostered: body.wasRostered,
                showAddress: false,
                addresses: {
                    create: [{
                        houseNumber: Number.parseInt(body.addressHouseNumber),
                        street: body.addressStreet,
                        state: body.addressState,
                        country: body.addressCountry,
                        zipCode: body.addressZipCode,
                    }]
                },
                attended: {
                    create: [{
                        degree: body.educationDegree,
                        isGraduated: body.educationIsGraduated,
                        graduationDate: body.educationGraduationDate,
                        schoolId: body.educationAt
                    }]
                }
            }
        });
        return Ok(newCandidate)
    } catch {
        return Err({ message: "Something went wrong" })
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Candidate | Error>
) {
    if (req.method === "POST") {
        const addCandidateResult = await postHandler(req);
        if (addCandidateResult.isOk()) {
            res.status(200).json(addCandidateResult.unwrap())
        } else {
            res.status(500).json(addCandidateResult.unwrapErr())
        }
    }
}
