import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function indexController(fastify: FastifyInstance) {
  fastify.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`Hello electrical-machine API`);
  });
}
