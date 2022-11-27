import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { StateCode } from "@prisma/client";

export const candidateRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        isRostered: z.boolean(),
        universityId: z.string(),
        districtId: z.string(),
        description: z.string(),
        address: z.object({
          houseNumber: z.string().regex(/[0-9]/),
          street: z.string(),
          city: z.string(),
          state: z.nativeEnum(StateCode),
          country: z.string(),
          zipCode: z.string().regex(/[0-9]/),
        }),
      })
    )
    .mutation(({ input, ctx }) =>
      ctx.prisma.candidate.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          biography: input.description,
          profilePictureUrl: ctx.session.user.image ?? "",
          email: input.email,
          address: {
            create: input.address,
          },
          isRostered: input.isRostered,
          [input.isRostered ? "district" : "university"]: {
            connect: {
              id: input.isRostered ? input.districtId : input.universityId,
            },
          },
        },
      })
    ),

  getCurrent: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.candidate.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    })
  ),
});
