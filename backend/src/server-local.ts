import fastify from "fastify";
import router from "./router";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 8080;
const app = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

app.register(router);
app.listen({ port: FASTIFY_PORT });

console.log(`🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`);
