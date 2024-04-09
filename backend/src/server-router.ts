import { FastifyInstance } from "fastify";
import indexController from "./controller/indexController";
import applianceController from "./controller/applianceController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(applianceController, { prefix: "/api/v1/appliance/" });
  fastify.register(indexController, { prefix: "/" });
}
