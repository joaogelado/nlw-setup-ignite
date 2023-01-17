import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const server = Fastify();

const prisma = new PrismaClient();

server.register(cors);

server.get("/", async () => {
  const habits = await prisma.habit.findMany({});

  return habits;
});

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is listening on port 3333");
  });
