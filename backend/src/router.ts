import { FastifyInstance } from "fastify";
import indexController from "./controller/index_controller";
import applianceController from "./controller/appliance_controller";

export default async function router(fastify: FastifyInstance) {
  fastify.register(applianceController, { prefix: "/api/v1/appliance/" });
  fastify.register(indexController, { prefix: "/" });
}
