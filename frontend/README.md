# Frontend - Energy Efficient Household Rewiring

## Technology Stack

- **Next.js**
- **SCSS**
- **TypeScript**
- **React Tabulator**: Used for dynamic tables.
- **Vercel**

## Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 with your browser.

## Usage

1. The components for each appliance are here: [app/components/appliances-forms](app/components/appliances-forms)
   1. These components share the same .scss file: [/appliances-forms/sharedForms.module.scss](app/components/appliances-forms/sharedForms.module.scss)
   2. The .css file for the table itself is here [/appliances-forms/tabulator-modern-custom.css](app/components/appliances-forms/tabulator-modern-custom.css)
2. In `fetchData`, the type of appliance is supplied to the API, along with the requested unit system. In the example below, `hpd` stands for **H**eat **P**ump **D**ryer, and `unitParams` states the requested unit system.

```javascript
const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpd&${unitParams}`;
```

3. In each component file, in [/appliances-forms/HeatPumpDryer.tsx](app/components/appliances-forms), for example, the `columns` variable sets up all the columns that will be in the [react-tabulator](https://www.npmjs.com/package/react-tabulator) table. This will be different for each appliance.
4. The dimensions and weight data received from the backend needs to be extracted into a format that react-tabulator recognizes. The created variable `tabulatorData` is then supplied to `<ReactTabulator>`.
5. _Unit conversion is done in the backend._ `UseEffect` is used to fetch from the API each time `unit` is updated as the user selects a different unit system.

## Form Factor Considerations

1. Whenever the app is viewed in viewports with a width less than 1024px, a message that encourages the user to switch to a wider viewport, usually a device with a larger screen, is displayed above the results table.
2. Column descriptions that are shown by default can be turned off.
3. Pagination size can be set.
