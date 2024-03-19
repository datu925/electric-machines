import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import * as db from "./dbutil";

export default async function (instance: FastifyInstance, opts: FastifyServerOptions, done) {

    instance.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        res.code(200).send(`Hello electrical-machine API`)
    })

    instance.get('/api/appliance', async (req: FastifyRequest, res: FastifyReply) => {
        res.code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(db.findWaterHeater())
    })

    done()
}
