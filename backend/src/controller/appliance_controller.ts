import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as db from "../dbutil";
import * as ar from "../model/appliance_request"

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
      let hpwh = ar.setOptionalsForWaterHeater(request.query as ar.HeatPumpWaterHeaterRequest);
      return db.queryWaterHeater(hpwh);
    case "hpd":
      let hpd = ar.setOptionalsForDryer(request.query as ar.HeatPumpDryerRequest);
      return db.queryDryer(hpd);
    case "hphvac":
      let hphvac = ar.setOptionalsForHvac(request.query as ar.HeatPumpHvacRequest);
      return db.queryHvac(hphvac);
    default:
        return [];
  }
}
