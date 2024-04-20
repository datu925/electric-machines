# Backend API



### Notable Libraries
- https://www.npmjs.com/package/convert-units/v/3.0.0-beta.6
- https://www.npmjs.com/package/json-schema-to-ts/v/3.0.1


![Architecture Diagram](../doc/architecture-backend.PNG "Architecture Diagram")



•	Project description and architecture diagram

o	Architecture description, e.g., 'The app has a next.js frontend with some server-side rendering, along with a MySQL backend...'
o	Data flow for various user stories, e.g., list the file that accesses the database and the web page file that's updated

- Command to build in local: `npm run build-local`
- Command to start service in localhost (port 8080): `npm start`


## Recommend Hosting
The source code of the backend-API and its associated data are both resided in GitHub. The service itself is deployed onto the Vercel directly. 

Appliance data are stored as json files as there is not a significant amount of data. When data storage with the filesystem become the bottleneck of backend service, an alternative solution is to create a Postgres database with tables maps to each of the appliances the (schema)[schema] provided and deploy the database onto 

## Application Installation 
The backend API service is deployed onto the Vercel platform. Refer to the [official documentation](https://vercel.com/) regarding account creation and project management. To deploy the current branch onto vercel for testing and development purpose, run `vercel`. Once the result is satisfactory, deploy to production environment by running `vercel --prod`

## Authentication and Authorization 
Due to no inclusion of sensitive or personal data, authentication and authorization are not required, therefore they were not implemented at this stage in time. Rewiring America can add an API key authentication layer on top of this backend service with relative ease if necessary.
 
## Database Backup
All appliance data for the backend API service are stored inside the [data](data) directory. GitHub is actively being utilised for data versioning as well as backup copies. Furthermore, there are no privacy or other regulatory concerns about storing the data directly on GitHub due to all data being publicly available.

## Environment Variables
Not applicable. 