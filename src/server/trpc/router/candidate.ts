/**
 * candidate.ts
 * Ian Kollipara
 * 2022.10.07
 *
 * tRPC endpoints for Candidate
 */

import { t } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { States } from "../../../types/address";

export const candidateRouter = t.router({
  getByCid: t.procedure
    .input(
      z.object({
        cid: z.string(),
        includeEducation: z.boolean().default(false),
        includeAddresses: z.boolean().default(false),
        includeSchools: z.boolean().default(false),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.candidate.findUniqueOrThrow({
          where: {
            cid: input.cid,
          },
          include: {
            addresses: input.includeAddresses,
            attended:
              input.includeEducation && input.includeSchools
                ? { include: { at: true } }
                : input.includeEducation,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `${input.cid} is not a valid Candidate Id`,
          cause: error,
        });
      }
    }),
  getByUid: t.procedure
    .input(
      z.object({
        uid: z.string(),
        includeEducation: z.boolean().default(false),
        includeAddresses: z.boolean().default(false),
        includeSchools: z.boolean().default(false),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.candidate.findUniqueOrThrow({
          where: {
            uid: input.uid,
          },
          include: {
            addresses: input.includeAddresses,
            attended:
              input.includeEducation && input.includeSchools
                ? { include: { at: true } }
                : input.includeEducation,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `${input.uid} is not a valid User Id`,
          cause: error,
        });
      }
    }),
  insertOne: t.procedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        biography: z.string().default(""),
        profilePictureUrl: z.string().default(""),
        email: z.string().email(),
        uid: z.string(),
        phoneNumber: z.string(),
        isMarried: z.boolean().default(false),
        wasRostered: z.boolean().default(false),
        showAddress: z.boolean().default(false),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.candidate.create({
        data: {
          ...input,
        },
      });
    }),
  addEducation: t.procedure
    .input(
      z.object({
        degree: z.string(),
        isGraduated: z.boolean().default(false),
        schoolId: z.string().cuid(),
        candidateId: z.string().cuid(),
      })
    )
    .mutation(({ input, ctx }) => {
      ctx.prisma.candidateEducation.create({
        data: {
          ...input,
        },
      });
    }),
  addAddress: t.procedure
    .input(
      z.object({
        houseNumber: z.string(),
        street: z.string(),
        state: z.nativeEnum(States),
        zipCode: z.string().length(5),
        country: z.string().length(2).default("US"),
        candidateId: z.string().cuid(),
      })
    )
    .mutation(({ input, ctx }) => {
      ctx.prisma.candidateAddress.create({
        data: {
          houseNumber: input.houseNumber,
          street: input.street,
          state: input.state.valueOf(),
          zipCode: input.zipCode,
          country: input.country,
          candidateId: input.candidateId,
        },
      });
    }),
});
