import fastify from 'fastify'
import * as db from "./dbutil";

const server = fastify()

server.get('/api/appliance', function (request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(db.findWaterHeater())
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})