# Backend API
<p align="center">
  <img src="../doc/architecture-backend.PNG" />
</p>

The backend API service is built using Typescript and Fastify web framework. Rather than relying on a dedicated database, this backend service first loads all data into its memory upon start-up and performs querying for incoming requests directly among the loaded data. Two functions that this API currently provides are:

1. `GET appliance/appliance`: Enable users to query for appliances with the matching criteria. See [appliance parameters](#appliance-get-request-parameters) for more details.
2. `GET appliance/all`: Returns all raw appliance data with no modification to the requester.

- To build locally, run `npm run build-local`.
- To start service locally (defaults to port 8080), run `npm start`.

### Notable Third-party Libraries
- [factify v4.26.2](https://fastify.dev/)
- [json-schema-to-ts v3.0.1](https://www.npmjs.com/package/json-schema-to-ts/v/3.0.1)
- [convert-units v3.0.0-beta.6](https://www.npmjs.com/package/json-schema-to-ts/v/3.0.1)

### Appliance GET Request Parameters
| Parameter 	| Mandatory 	| Supported Appliances 	| Comment 	|
|---	|---	|---	|---	|
| applianceType 	| Y 	| ALL 	| Mandatory for every request. `hpwh` for water-heaters, `hpd` for dryers, `hphvac` for HVACs and `stove` for stove appliance data  	|
| weight 	|  	| ALL 	| Numerical value for weight 	|
| weightUnit 	|  	| ALL 	| The searching and display unit for weights. Defaults to `lb` if not provided. 	|
| dimensionUnit 	|  	| ALL 	| The display unit for dimensions. Defaults to `in` if not provided 	|
| electricalBreakerSize 	|  	| ALL 	| The maximum breaker size in amperage that appliances can handle. 	|
| voltage 	|  	| ALL 	| The maximum voltage that appliances can handle. 	|
| tankCapacityMin 	|  	| water-heater 	| Minimum tank capacity for water-heaters, measured in US gallon. 	|
| tankCapacityMax 	|  	| water-heater 	| Maximum tank capacity for water-heaters, measured in US gallon. 	|
| uniformEnergyFactor 	|  	| water-heater 	| Minimum efficiency that water-heaters should have. 	|
| firstHourRating 	|  	| water-heater 	| Minimum first hour rating that water-heaters should have 	|
| capacityMin 	|  	| dryer 	| Minimum load capacity for dryers, measured in cubic feet. 	|
| capacityMax 	|  	| dryer 	| Maximum load capacity for dryers, measured in cubic feet. 	|
| soundLevel 	|  	| dryer 	| Maximum acceptable sound level for dryers, measured in decibel. 	|
| combinedEnergyFactor 	|  	| dryer 	| Minimum efficiency that dryers should have. 	|
| tonnageMin 	|  	| HVAC 	| Minimum tonnage that an HVAC can make change in air in an hour. 	|
| tonnageMax 	|  	| HVAC 	| Maximum tonnage that an HVAC can make change in air in an hour. 	|

## Recommend Hosting
Both the source code and its associated appliance data are resided in GitHub. The backend API itself is deployed onto the Vercel platform. 

The appliance data are stored as JSON files as the volume of data is not much of a concern. When this storage approach becomes the bottleneck of the service, an alternative will be to utilise a Postgres database with tables that map directly to each of the appliance [schemas](schema). Querying data will be done from the database instead. Such database can then be deployed onto a cloud provider such as vercel, Heroku or AWS. The cost of doing such will be around 50 US dollars per month depending on the amount of data. 

## Application Deployment 
The backend API service is deployed onto the Vercel platform. Refer to [vercel documentation](https://vercel.com/) regarding account creation and project management. To deploy the current branch onto vercel for testing and development purposes, run `vercel`. Once the result is satisfactory, deploy to the production environment by running `vercel --prod`

## Authentication and Authorization 
Due to no inclusion of sensitive or personal data, authentication and authorization are not required, therefore they were not implemented at this stage in time. Rewiring America can add an API key authentication layer on top of this backend service with relative ease if necessary.
 
## Database Backup
All appliance data for the backend API service are stored inside the [data](data) directory. GitHub is actively being utilised for data versioning as well as backup copies. Furthermore, there are no privacy or other regulatory concerns about storing the data directly on GitHub due to all data being publicly available.

## Environment Variables
Not applicable. 