/**
 * candidate.ts
 * Ian Kollipara
 * 2022.10.07
 *
 * tRPC endpoints for Candidate
 */

import { t } from "../trpc";
import { z } from "zod";
import { authedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { MaritialStatus, StateCode } from "@prisma/client";

export const candidateRouter = t.router({
  /**
   * # get
   *
   * Get the current Candidate associated with the logged in user.
   * If there is no candidate associated with the id, throw an error.
   * If you want the full Candidate, with all relations resolved, use `getFull`.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @return `Canidate` or `TRPCError`
   * @exception `TRPCError` with code: `NOT_FOUND`
   */
  get: authedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.candidate.findUniqueOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Candidate found for the given UserId",
        cause: error,
      });
    }
  }),

  /**
   * # getFull
   *
   * Get the current Candidate associated with the logged in user.
   * If there is no candidate associated with the id, throw an error.
   * This is the full Candidate, with all relations resolved. Use `get`
   * for just the base candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @return Full Candidate
   * @exception TRPCError with error code `NOT_FOUND`
   */
  getFull: authedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.candidate.findUniqueOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          addresses: {
            include: {
              address: true,
            },
          },
          attended: {
            include: {
              institution: true,
            },
          },
          calls: {
            include: {
              job: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Candidate Found at given ID",
        cause: error,
      });
    }
  }),

  add: authedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        biography: z.string().default(""),
        profilePictureUrl: z.string().nullish(),
        email: z.string().email(),
        phoneNumber: z.string().length(17).default("+1 (000) 000-0000"),
        maritialStatus: z.nativeEnum(MaritialStatus).default("Single"),
        showPhoneNumber: z.boolean().default(false),
        showAddress: z.boolean().default(false),
        userId: z.string(),
        rosterStatus: z.discriminatedUnion("isRostered", [
          z.object({
            isRostered: z.literal(true),
            institutionId: z.string().uuid(),
          }),
          z.object({
            isRostered: z.literal(false),
            districtId: z.string().uuid(),
          }),
        ]),
        education: z
          .object({
            degree: z.string().default("B.S. Education"),
            graduationDate: z.date().nullish(),
            isGraduated: z.boolean().default(false),
            institutionId: z.string().uuid(),
          })
          .array(),
      })
    )
    .mutation(({ input, ctx }) => {
      try {
        ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            type: "Candidate",
          },
        });
        return ctx.prisma.candidate.create({
          data: {
            ...input,
            profilePictureUrl:
              input.profilePictureUrl ?? ctx.session.user.image ?? "",
            ...input.rosterStatus,
            attended: {
              create: input.education,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "Input Body is wrong",
          cause: error,
        });
      }
    }),
});
