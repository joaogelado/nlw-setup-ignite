import { FastifyInstance } from "fastify";
import { dayRoutes } from "./routes/days";
import { habitRoutes } from "./routes/habits";

export async function serverRoutes(server: FastifyInstance) {
  server.register(habitRoutes);
  server.register(dayRoutes);
}
