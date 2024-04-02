import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import * as db from "./dbutil";

export default async function (
  instance: FastifyInstance,
  opts: FastifyServerOptions,
  done
) {
  instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    res.code(200).send(`Hello electrical-machine API`);
  });

  // Heatpump WaterHeater:  https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpwh&capacityMin=40&capacityMax=60&uef=2.5&fhr=60
  // Heatpump Dryer:        https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevel=62&cef=7.0&capacityMin=6.0&capacityMax=7.0
  // Heat Pump HVAC:        https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hphvac&tonnageMin=2.0&tonnageMax=4.5
  instance.get(
    "/api/v1/appliance",
    async (req: FastifyRequest, res: FastifyReply) => {
      var foundModels = handleAppliance(req);
      res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(foundModels);
    }
  );

  // https://electric-machines-h6x1.vercel.app/api/v1/allappliances
  instance.get(
    "/api/v1/allappliances",
    async (req: FastifyRequest, res: FastifyReply) => {
      res
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(db.allAppliances());
    }
  );

  done();
}

function handleAppliance(req: FastifyRequest) {
  // TODO: check how to put multiple schemas under one request parser instead of handroll one...
  var applianceType = req.query["applianceType"];
  switch (applianceType) {
    case "hpwh":
      var tankCapacityMin: number = Number(req.query["capacityMin"]);
      var tankCapacityMax: number = Number(req.query["capacityMax"]);
      var uniformEnergyFactor: number = Number(req.query["uef"]);
      var firstHourRating: number = Number(req.query["fhr"]);
      return db.findWaterHeater(tankCapacityMin, tankCapacityMax, uniformEnergyFactor, firstHourRating);
    case "hpd":
      var capacityMin: number = Number(req.query["capacityMin"]);
      var capacityMax: number = Number(req.query["capacityMax"]);
      var combinedEnergyFactor: number = Number(req.query["cef"]);
      var soundLevel: number = Number(req.query["soundLevel"]);
      return db.findDryer(capacityMin, capacityMax, combinedEnergyFactor, soundLevel);
    case "hphvac":
      var tonnageMin: number = Number(req.query["tonnageMin"]);
      var tonnageMax: number = Number(req.query["tonnageMax"]);
      return db.findHvac(tonnageMin, tonnageMax);
    default:
      return [];
  }
}
