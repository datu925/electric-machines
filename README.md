# electric-machines

## Background

The Electric Machines Database (EMDb) is an open-source database, data pipeline, and user application for technical information about electrification-focus appliances such as heat pumps, water heaters, and induction stoves.

You can visit the frontend application at https://electric-machines.vercel.app/ to see the kind of data we collect. Here's an example JSON record for a heat pump water heater:

```
{
  "brandName": "Rheem",
  "modelNumber": "PROPH40 T2 RH375-30",
  "sourceUrl": "https://files.myrheem.com/webpartnerspublic/ProductDocuments/65DF1261-86D9-4756-AAAD-F403E9FF124A.pdf",
  "tankCapacityGallons": 40,
  "weight":{
    "value": 157,
    "unit": "lb"
  },
  "dimensions": {
    "width": 20.5,
    "height": 62.3125,
    "length": 25.375,
    "unit": "in"
  },
  "electricBreakerSize": 30,
  "voltage": 240,
  "uniformEnergyFactor": 3.83,
  "firstHourRating": 60
}
```

This repository began as a partnership between Georgia Tech's Online Master's in Computer Science, specifically the course Computing For Good (CS 6150), and [Rewiring America](https://www.rewiringamerica.org/).

## Using the API

The API is not yet available for third party usage, but please reach out to hello@rewiringamerica.org to start a conversation.

## Developer Documentation

This repository contains three sub-projects. For developer documentation, visit the READMEs associated with each sub-project:

1. [The data pipeline](pipeline/README.md)
2. [The backend](backend/README.md)
3. [The frontend](frontend/README.md)
