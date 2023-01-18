import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function habitRoutes(server: FastifyInstance) {
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
}
