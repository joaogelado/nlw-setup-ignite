import { prisma } from "../../lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";
import { FastifyInstance } from "fastify";

export async function dayRoutes(server: FastifyInstance) {
  server.get("/days", async (req, res) => {
    const getDayQuery = z.object({
      date: z.coerce.date(),
    });

    const unsafeQuery = req.query;

    try {
      const query = getDayQuery.parse(unsafeQuery);

      const { date } = query;

      const weekDay = dayjs(date).get("day"),
        fixedDate = dayjs(date).startOf("day");

      const possibleHabits = await prisma.habit.findMany({
        where: {
          createdAt: {
            lte: date,
          },
          weekDays: {
            some: {
              weekDay,
            },
          },
        },
      });

      const day = await prisma.day.findUnique({
        where: {
          date,
        },
        include: {
          dayHabits: true,
        },
      });

      const completedHabits = day?.dayHabits.map(
        (dayHabit) => dayHabit.habitId
      );

      return {
        success: true,
        possibleHabits: possibleHabits,
        completedHabits,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400);

        return {
          success: false,
          error: {
            ...error,

            name: undefined,
          },
        };
      }
    }
  });
}
