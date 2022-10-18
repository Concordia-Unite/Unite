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
import { StateCode } from "@prisma/client";

export const candidateRouter = t.router({
  /**
   * # getByCid
   *
   * This query returns the candidate associated with the cid.
   * If the cid does not match, an error is thrown.
   * This returns just a base Candidate. Use `getByCidFull` for a full
   * Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param cid the Candidate Id
   * @returns Candidate
   * @exception TRPCError
   */
  getByCid: t.procedure
    .input(
      z.object({
        cid: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.candidate.findUniqueOrThrow({
          where: {
            cid: input.cid,
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

  /**
   * # getByCidFull
   *
   * This query returns the candidate associated with the cid.
   * If the cid does not match, an error is thrown.
   * This returns a full Candidate. Use `getByCid` for a base Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param cid the Candidate Id
   * @returns `Candidate & { addresses: CandidateAddress[]; attended (CandidateEducation & { at: Institution })[] }`
   * @exception TRPCError
   */
  getByCidFull: t.procedure
    .input(
      z.object({
        cid: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.candidate.findUniqueOrThrow({
          where: {
            cid: input.cid,
          },
          include: {
            addresses: true,
            attended: {
              include: {
                at: true,
              },
            },
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

  /**
   * # getByUid
   *
   * This query returns the candidate associated with a specific User Id, returned from an OAuth Sign-In.
   * If the User Id does not match, an error is thrown.
   * This returns just a base Candidate. Use `getByUidFull` for a full
   * Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param uid the User Id
   * @returns Candidate
   * @exception TRPCError
   */
  getByUid: t.procedure
    .input(
      z.object({
        uid: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.candidate.findUniqueOrThrow({
          where: {
            uid: input.uid,
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

  /**
   * # getByUidFull
   *
   * This query returns the candidate associated with a specific User Id, returned from an OAuth Sign-In.
   * If the User Id does not match, an error is thrown.
   * This returns a full Candidate. Use `getByUid` for a base
   * Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param uid the User Id
   * @returns Candidate & { addresses: CandidateAddress[]; attended (CandidateEducation & { at: School })[] }
   * @exception TRPCError
   */
  getByUidFull: t.procedure
    .input(
      z.object({
        uid: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.candidate.findUniqueOrThrow({
          where: {
            uid: input.uid,
          },
          include: {
            addresses: true,
            attended: {
              include: {
                at: true,
              },
            },
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

  /**
   * # getCurrent
   *
   * Get the currently logged in user's Candidate Info.
   * If no candidate info is found, throw an error.
   * This returns just a base Candidate. Use  `getCurrentFull` for a full Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @return Candidate
   * @exception TRPCError
   */
  getCurrent: t.procedure.query(({ ctx }) => {
    try {
      return ctx.prisma.candidate.findUniqueOrThrow({
        where: {
          uid: ctx.session?.user?.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `${ctx.session?.user?.id} is not a valid User Id`,
        cause: error,
      });
    }
  }),

  /**
   * # getCurrentFull
   *
   * Get the currently logged in user's Candidate Info.
   * If no candidate info is found, throw an error.
   * This returns a full Candidate. Use  `getCurrentFull` for a base Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @returns Candidate & { addresses: CandidateAddress[]; attended (CandidateEducation & { at: School })[] }
   * @exception TRPCError
   */
  getCurrentFull: t.procedure.query(({ ctx }) => {
    try {
      return ctx.prisma.candidate.findUniqueOrThrow({
        where: {
          uid: ctx.session?.user?.id,
        },
        include: {
          addresses: true,
          attended: {
            include: {
              at: true,
            },
          },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `${ctx.session?.user?.id} is not a valid User Id`,
        cause: error,
      });
    }
  }),
  /**
   * # insertOne
   *
   * Insert a new Candidate into the database. The
   * new candidate is returned upon successful entry.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param firstName The first name of the Candidate
   * @param lastName The last name of the Candidate.
   * @param biography The biography of the Candidate. This field is optional
   * @param profilePictureUrl The link to the Candidate's Profile Picture
   * @param email The email of the Candidate
   * @param uid The user id of the Candidate. This ties the SSO to the Candidate
   * @param phoneNumber The phoneNumber of the Candidate
   * @param isMarried The marital status for the Candidate. This field is optional.
   * @param wasRostered The roster status of the Canidate. This field is optional.
   * @param showAddress A privacy control for showing the Candidate's addresses. This field is optional.
   * @returns Candidate
   */
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
  /**
   * # addEducation
   *
   * Add an education entry for the candidate. These represent
   * the different schoolings and degrees of the Candidate.
   * These are tied to a specific CUS University.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param degree The degree of the Candidate. TODO Change this to a Enumeration.
   * @param isGraduated The graduation status of the Candidate in relation to the Degree.
   * @param schoolId The id of the school. TODO Change the name to Institution
   * @param candidateId The id that connects the candidate to the education.
   */
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
  /**
   * # addAddress
   *
   * Add an address entry for the Candidate.
   *
   * ---
   *
   * @author Ian Kollipara <ian.kollipara@cune.org>
   * @param houseNumber The house number (e.g. 224)
   * @param street The street name for the address (e.g. Jackson Ave.)
   * @param state the State Code, these must be one of the given state types. (e.g. NE)
   * @param zipCode the zipcode for the house. Must be 6 digit characters long (e.g. 68434)
   * @param country The country code. Defaults to "US"
   * @param candidateId The id of the Candidate to connect the address to.
   */
  addAddress: t.procedure
    .input(
      z.object({
        houseNumber: z.string(),
        street: z.string(),
        state: z.nativeEnum(StateCode),
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
          state: input.state,
          zipCode: input.zipCode,
          country: input.country,
          candidateId: input.candidateId,
        },
      });
    }),
});
