"use client";

import Image from "next/image";
// import styles from "./page.module.css";
import styles from "./page.module.scss";
import ApplianceLookup from "./components/ApplianceLookup";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Energy Efficient Household Rewiring</h1>
      <section>
        <h2>Appliance Lookup</h2>
        <div>
          <ApplianceLookup />
        </div>
      </section>
      <section>
        <h2>Project Description</h2>
        <p>
          In the next few decades, we&rsquo;ll replace 1 billion household
          machines and appliances, and it's critical for the climate that we
          replace them with clean electric versions instead of the fossil
          fuel-based appliances of the past. To help consumers choose and
          compare these machines, take advantage of tax incentives, and assist
          contractors in finding the right fit, we need a centralized platform.
        </p>
        <p>
          During the Spring 2024 semester, our team of four is diligently
          working on this project as part of the Computing for Good course at
          Georgia Tech. We are collaborating closely with Rewiring America to
          develop this essential tool.
        </p>
      </section>
      <section>
        <h2>Project Goals</h2>
        <p>
          Create a database and API for household electric appliances such as
          furnaces, heat pumps, and water heaters, and use it to build a
          consumer-facing web app.
        </p>
        <p>Tasks:</p>
        <ul>
          <li>
            Collect nomenclatures: the organizational structure of appliance
            model numbers and what they represent.
          </li>
          <li>Determine how to represent it in a database.</li>
          <li>Create a parser that searches the database for matches.</li>
          <li>
            Construct a front-end that takes applicance model numbers, finds
            matches, and unpacks it for a user.
          </li>
        </ul>
      </section>
      <section>
        <h2>Team Members</h2>
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <Image
              width={64}
              height={64}
              style={{
                objectFit: "cover",
                borderRadius: "100px",
              }}
              src="/team-images/dan.jpeg"
              alt="Dan Turcza"
            />
          </div>
          <div className={styles.profileContent}>
            <p className={styles.name}>
              <strong>Dan Turcza</strong>
            </p>
            <p className={styles.title}>Backend Development</p>
            <p className={styles.description}>
              Along with Kevin, Dan will focus on the data discovery workstream,
              which focuses on where appliance data sources are located. The
              goal is to have a comprehensive understanding of all makes/models
              of target appliances, validated by other aggregators in the space.
              Along with Chris, Dan will also focus on the data processing
              workstream, which is concerned with turning those data sources
              into usable data that fits our schemas. This will involve
              ingesting web resources and processing them to extract the data we
              care about. Dan is also the team liaison with Rewiring America
              since he has a preexisting relationship with them.
            </p>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <Image
              width={64}
              height={64}
              style={{
                objectFit: "cover",
                borderRadius: "100px",
              }}
              src="/team-images/kevin.jpeg"
              alt="Kevin Ferri"
            />
          </div>
          <div className={styles.profileContent}>
            <p className={styles.name}>
              <strong>Kevin Ferri</strong>
            </p>
            <p className={styles.title}>Backend Development</p>
            <p className={styles.description}>
              Along with Dan, Kevin will focus on the data discovery workstream,
              which focuses on where appliance data sources are located. The
              goal is to have a comprehensive understanding of all makes/models
              of target appliances, validated by other aggregators in the space.
              Along with Ricky, Kevin will work on frontend dev and the UX to
              build a compelling and accessible web application that users can
              use to explore the data that we've collected. A stretch goal for
              this workstream is integration with other datasources such as
              financial incentives in order to allow for more complex
              applications.
            </p>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <Image
              width={64}
              height={64}
              style={{
                objectFit: "cover",
                borderRadius: "100px",
              }}
              src="/team-images/ricky.jpeg"
              alt="Ricky Cheah"
            />
          </div>
          <div className={styles.profileContent}>
            <p className={styles.name}>
              <strong>Ricky Cheah</strong>
            </p>
            <p className={styles.title}>Front-End Development</p>
            <p className={styles.description}>
              Along with Kevin, Ricky will work on frontend dev and the UX to
              build a compelling and accessible web application that users can
              use to explore the data that we've collected. A stretch goal for
              this workstream is integration with other datasources such as
              financial incentives in order to allow for more complex
              applications. Ricky is also the main author of this website.
            </p>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}>
            <Image
              width={64}
              height={64}
              style={{
                objectFit: "cover",
                borderRadius: "100px",
              }}
              src="/team-images/chris.jpeg"
              alt="Chris Yang"
            />
          </div>
          <div className={styles.profileContent}>
            <p className={styles.name}>
              <strong>Chris Yang</strong>
            </p>
            <p className={styles.title}>Backend Development</p>
            <p className={styles.description}>
              Along with Dan, Chris will focus on the data processing
              workstream, which is concerned with turning those data sources
              into usable data that fits our schemas. This will involve
              ingesting web resources and processing them to extract the data we
              care about. Chris will also be the primary database developer,
              concerned with creating a viable database and serving API so that
              clients can make use of the data that we've collected.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2>Team Weekly Updates</h2>
        <div>
          <p>
            <strong>Dan</strong>
            <br />
            <u>Highlights:</u> Accomplished – recorded P6 videos. First PR
            setting up JSON data stores and making backend respect frontend
            request params. generate_metadata_files script, export to csv add-on
            to validate_data.ts.
            <br />
            <u>Challenges:</u> Dryer PDFs are more difficult to parse; unit
            conversions still a challenge.
            <br />
            <u>Next Steps:</u> Tweak format of reformat_tables.ts to give the
            LLM more context. Explore pdf-to-text parsing as an addition to the
            table extraction since the dryer sheets don’t have many tables. This
            is probably good for the other sheets anyway. Refine export-to-csv
            procedure so that columns are easier to work with.
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Kevin</strong>
            <br />
            <u>Highlights:</u> Added dryers and ovens/stoves to component
            metadata. Continued breath first approach to appliance data sheet
            coverage.
            <br />
            <u>Challenges:</u> Dryers and oven/stoves are even less standardized
            in terms of product data sheets and manuals. Each brand has a lot of
            models and their data sheets only cover the color variations of one
            model, meaning more entries, but not much more data as well as
            slower entry. <br />
            <u>Next Steps:</u> Review user stories. Pipeline work to begin
            getting from the metadata links to the schema, getting the retrieved
            specs to be more accurate. Deployment plan and sustainability study
            for P7. <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Ricky</strong>
            <br />
            <u>Highlights:</u> Fix results table mobile view. Add realistic
            params to backend API call. Created user stories for P7.
            <br />
            <u>Challenges:</u> Some blocking due to lagging backend API and
            shifting requirements.
            <br />
            <u>Next Steps:</u> For all appliances, update results table to add
            more column and add more filtering options on the headers. Rehaul
            frontend to remove query params and initial user inputs.
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Chris</strong>
            <br />
            <u>Highlights:</u> Added versioning in the backend API, added
            filtering based on range for tank capacity for water-heater and
            capacity for dryer. Added support for first hvac appliances. Create
            new backend request to source all appliances from the data storage.
            <br />
            <u>Challenges:</u> Was feeling unwell due to flu.
            <br />
            <u>Next Steps:</u> Convert the backend url request to a more robust
            type-based approach as the current one is quite fragile. Add support
            for induction stove appliances. Experiment with supporting multiple
            weight/height data storage for different units and unit conversions.
            <br />
          </p>
        </div>
      </section>

      <section>
        <h2>P6 Demo Video</h2>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://gtvault-my.sharepoint.com/:v:/g/personal/dturcza3_gatech_edu/EV8qoAco145AgtARnJHvXhwBtC-pPKNeynMA1GDXEnXyCA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=5LAJqC"
        >
          Click to view demo video in a new tab.
        </a>
      </section>

      <section>
        <h2>P4 Presentation Slides</h2>
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://gtvault-my.sharepoint.com/:p:/g/personal/dturcza3_gatech_edu/Ee9pvLgi0lVKvjsgmXPp2SQBXL6oFpBhD8kqMclmpE8kQA?e=h3ieay"
        >
          Click to view slides in a new tab.
        </a>
      </section>
      <section>
        <h2>Lighthouse Scores</h2>
        <div className={styles.lighthouse}>
          <Image
            style={{
              width: "50%",
              height: "auto",
            }}
            width={300}
            height={1}
            src="/lighthouse.png"
            alt="Lighthouse scores"
          />
        </div>
      </section>
    </main>
  );
}
