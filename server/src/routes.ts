import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function serverRoutes(server: FastifyInstance) {
  /**
   * Create a habit with
   *
   * @param title - (Body) The title of the habit
   * @param weekDays - (Body) An array of numbers from 0 to 6, representing the days of the week
   * @param skipToday - (Body) If true, the habit will be created and will just start to count the next day
   */
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

  /**
   * Get all habits of a specific day
   *
   * @param date - (Query) The date of the day
   */
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

  /**
   * Complete/uncomplete a habit
   *
   * @param habitId - (Params) The id of the habit
   */
  server.patch("/habits/:habitId/toggle", async (req, res) => {
    const toggleHabitParams = z.object({
      habitId: z.string().uuid(),
    });

    const unsafeParams = req.params;

    const params = toggleHabitParams.parse(unsafeParams);

    const { habitId } = params;

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
          dayHabits: {
            create: [],
          },
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.id,
          habitId,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          dayId: day.id,
          habitId,
        },
      });
    }

    return {
      success: true,
      completed: !dayHabit,
    };
  });

  server.get("/summary", async (req, res) => {
    //// Quert mais complexa, mais condições, relacionamentos => SQL na mão (RAW)
    //// Prisma ORM: RAW SQL => SQLite ++ =/= PostgreSQL, etc

    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, "unixepoch") as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;

    return {
      success: true,
      summary,
    };
  });
}
