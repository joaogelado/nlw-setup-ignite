import Fastify from "fastify";
import cors from "@fastify/cors";
import { serverRoutes } from "./routes";

const server = Fastify();

server.register(cors);
server.register(serverRoutes);

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is listening on port 3333");
  });
