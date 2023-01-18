import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function serverRoutes(server: FastifyInstance) {
  server.post("/habits", async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
      skipToday: z.boolean().optional(),
    });

    const unsafeBody = req.body;

    const body = createHabitBody.parse(unsafeBody);

    const { title, weekDays, skipToday } = body;

    const today = skipToday
      ? dayjs().add(1, "day").startOf("day").toDate()
      : dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        createdAt: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({ weekDay })),
        },
      },
    });

    res.status(201);

    return {
      success: true,
    };
  });

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
