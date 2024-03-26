import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import * as db from "./dbutil";

export default async function (instance: FastifyInstance, opts: FastifyServerOptions, done) {

    instance.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        res.code(200).send(`Hello electrical-machine API`)
    })

    // https://electric-machines-h6x1.vercel.app/api/appliance?modelType=hpwh&capacity=40&urf=2.5&fhr=60
    // https://electric-machines-h6x1.vercel.app/api/appliance?modelType=hpd&soundLevel=62&cef=7.0&capacity=6.0
    instance.get('/api/appliance', async (req: FastifyRequest, res: FastifyReply) => {
        var foundModels = handleAppliance(req)
        res.code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(foundModels)
    })

    done()
}

function handleAppliance(req: FastifyRequest) {
    // TODO: check how to put multiple schemas under one request parser instead of handroll one...
    var modelType = req.query['modelType']
    switch (modelType) {
        case "hpwh":
            var tankCapacity: number = Number(req.query['capacity'])
            var uniformEnergyFactor: number = Number(req.query['uef'])
            var firstHourRating: number = Number(req.query['fhr'])
            return db.findWaterHeater(tankCapacity, uniformEnergyFactor, firstHourRating)
        case "hpd":
            var soundLevel: number = Number(req.query['soundLevel'])
            var combinedEnergyFactor: number = Number(req.query['cef'])
            var capacity: number = Number(req.query['capacity'])
            return db.findDryer(soundLevel, combinedEnergyFactor, capacity)
        default: return [];
    }
}
