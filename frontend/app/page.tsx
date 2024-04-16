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
            <u>Highlights:</u> P8 presentation slides and delivery. Some code
            review. Mid-progress on adding a second pass with GPT to fill in
            missing fields using the PDF text.
            <br />
            <u>Challenges:</u> A bit sick.
            <br />
            <u>Next Steps:</u> Work exclusively on the pipeline to generate a
            lot of data.
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Kevin</strong>
            <br />
            <u>Highlights:</u> Wrote script to convert CSV to JSON; will make
            changes possibly tonight. User manual/documentation.
            <br />
            <u>Challenges:</u> Making the script grow with the project (if we
            e.g. add fields).
            <br />
            <u>Next Steps:</u> Go back into the pipeline – some fields where we
            have everything and then in the rename step. <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Ricky</strong>
            <br />
            <u>Highlights:</u> Added unit selection and made changes according
            to backend specifications for dryer. Updated table to show correct
            units according to selection.
            <br />
            <u>Challenges:</u> Unable to use data as it, update frontend to
            extract and reformat data received from the backend to work with
            Tabulator.
            <br />
            <u>Next Steps:</u> Add unit selection to heat pump water heater and
            create HVAC component. Add frontend part of the architectural
            diagram and data flow. Take screenshots and get lighthouse metrics.
            Do the architectural pipeline.
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Chris</strong>
            <br />
            <u>Highlights:</u> Add change to support optional parameters for
            incoming GET requests, and support for multiple measurement units
            i.e. metrics and imperial in the backend API. Recorded walkthrough
            video for P8.
            <br />
            <u>Challenges:</u> The convert-unit library does not support
            Typescript out of the box. It took considerable time to find a
            workaround solution.
            <br />
            <u>Next Steps:</u> Add error handling in the backend API calls. Add
            Swagger homepage listing all the supported API calls. Add unit tests
            in the backend and make a README document that reflects the current
            state of the backend API. Create backend developer documentation for
            P9.
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
