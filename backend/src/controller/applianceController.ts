import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as db from "../dbutil";
import * as ar from "../model/applianceRequest"

export default async function (fastify: FastifyInstance,) {
    // Heatpump WaterHeater:  https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&tankCapacityMin=40&tankCapacityMax=60&uniformEnergyFactor=2.5&firstHourRating=60
    // Heatpump Dryer:        https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpd&soundLevel=65&combinedEnergyFactor=2.0&capacityMin=4.0&capacityMax=8.0
    // Heat Pump HVAC:        https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hphvac&tonnageMin=2.0&tonnageMax=4.5
    fastify.get(
      "/appliance",
      async (request: FastifyRequest<ar.ApplianceRequest>, reply: FastifyReply) => {
        var foundModels = handleAppliance(request);
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send(foundModels);
      }
    );

    // https://electric-machines-h6x1.vercel.app/api/v1/appliance/all
    fastify.get(
      "/all",
      async (request: FastifyRequest, reply: FastifyReply) => {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send(db.allAppliances());
      }
    );
}

function handleAppliance(request: FastifyRequest<ar.ApplianceRequest>) {
  const { applianceType } = request.query as ar.ApplianceRequest
  switch (applianceType.toLowerCase()) {
    case "hpwh":
      let hpwh = setOptionalsForWaterHeater(request.query as ar.HeatPumpWaterHeaterRequest);
      return db.findWaterHeater(hpwh);
    case "hpd":
      let hpd = setOptionalsForDryer(request.query as ar.HeatPumpDryerRequest);
      return db.findDryer(hpd);
    case "hphvac":
      let hphvac = setOptionalsForHvac(request.query as ar.HeatPumpHvacRequest);
      return db.findHvac(hphvac);
    default:
        return [];
  }
}

function setOptionalsForWaterHeater(r: ar.HeatPumpWaterHeaterRequest) {
  r.tankCapacityMin = r.tankCapacityMin ?? 0;
  r.tankCapacityMax = r.tankCapacityMax ?? Number.MAX_VALUE;
  r.firstHourRating = r.firstHourRating ?? 0;
  r.uniformEnergyFactor = r.uniformEnergyFactor ?? 0;
  return r
}

function setOptionalsForDryer(r: ar.HeatPumpDryerRequest) {
  r.capacityMin = r.capacityMin ?? 0;
  r.capacityMax = r.capacityMax ?? Number.MAX_VALUE;
  r.soundLevel = r.soundLevel ?? Number.MAX_VALUE;
  r.combinedEnergyFactor = r.combinedEnergyFactor ?? 0;
  return r
}

function setOptionalsForHvac(r: ar.HeatPumpHvacRequest) {
  r.tonnageMin = r.tonnageMin ?? 0;
  r.tonnageMax = r.tonnageMax ?? Number.MAX_VALUE;
  return r
}
