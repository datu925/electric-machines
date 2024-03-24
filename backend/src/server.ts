import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import * as db from "./dbutil";
import * as util from "./utils"

export default async function (instance: FastifyInstance, opts: FastifyServerOptions, done) {

    instance.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        res.code(200).send(`Hello electrical-machine API`)
    })

    // https://electric-machines-h6x1.vercel.app/api/appliance?modelType=hpwh&size=1-2&uef=2.5&fhr=60
    // https://electric-machines-h6x1.vercel.app/api/appliance?modelType=hpd&noise=low&cef=7.0&capacity=6.0
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
            var size: number = util.HouseholdSizeToCapacity(req.query['size'])
            var uef: number = Number(req.query['uef'])
            var fhr: number = Number(req.query['fhr'])
            return db.findWaterHeater(size, uef, fhr)
        case "hpd":
            var noise: number = util.NoiseLevelToDecibel(req.query['noise'])
            var cef: number = Number(req.query['cef'])
            var capacity: number = Number(req.query['capacity'])
            return db.findDryer(noise, cef, capacity)
        default: return [];
    }
}