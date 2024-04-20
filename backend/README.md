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
The backend API service replies upon the Vercel platform for deployment. Refer to the (official site)[https://vercel.com/] regarding on account creation and project management. To deploy current branch onto Vercel development, run `vercel`. Once you are happy with the result of the dev deployment, run `vercel --prod`

## Authentication and Authorization 
Due to no involvement of sensitive or personal data, authentication and authorization is not required and therefore not implemented as part of this project.

Rewiring America can add a API key authentication with relatively ease if necessary.
 
## Database Backup
The appliance data for the backend API service are currently stored inside the [data](data) directory. GitHub is actively being utilised for data versioning control as well as the backup. Due to all data being publicly available, there are no privacy or other regulatory concerns on storing the data directly on GitHub

## Environment Variables
Not applicable. 