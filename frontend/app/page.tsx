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
        <div className={styles.disclaimer}>
          <p>
            This is a mockup for demonstration purposes only and does not
            contain any real data.
          </p>
          <div>
            <p>
              Please note the approximate time taken to complete each of the
              tasks below.
            </p>
          </div>
        </div>
        <div className={styles.tasks}>
          <p>
            <span className={styles.underline}>Task 1</span>
            <br />
            Look up the data for a Heat Pump Dryer with a high noise level, a
            Combined Energy Factor of 5 and a capacity of 7 cu-ft.
          </p>
        </div>
        <div></div>
        <div className={styles.tasks}>
          <p>
            <span className={styles.underline}>Task 2</span>
            <br />
            Look up the data for a Heat Pump Water Heater for a household of 3-4
            people with a Uniform Energy Factor of 2.5 and a 50-gallon First
            Hour Rating.
          </p>
        </div>
        <div>
          <p>
            After completing the tasks,{" "}
            <span>
              {" "}
              <a className="anchor" href="https://forms.gle/buv6Hxdb3MkBgS9Y7">
                click here to start the survey!
              </a>
            </span>
          </p>
        </div>
        <hr />
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
            <u>Highlights:</u> Put up a PR introducing schema. <br />
            <u>Challenges:</u> File structure for multi-stage pipeline. <br />
            <u>Next Steps:</u> Actualize the file structure; expand to at least
            one more manufacturer. <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Kevin</strong>
            <br />
            <u>Highlights:</u> Created a scraper that connects to the NEEP
            database API. Ran a shell exploration of the API file structure.{" "}
            <br />
            <u>Challenges:</u> Database API is different when scraped compared
            to the loaded webpage. Have to run the scraper for 2135 pages.{" "}
            <br />
            <u>Next Steps:</u> Finish the scraper and look into sustainability
            of the code. Look into a similar scraper for water heaters. <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Ricky</strong>
            <br />
            <u>Highlights:</u> Added a PR for tooltips. Explored potential
            libraries/frameworks for connecting frontend & backend.
            <br />
            <u>Challenges:</u> Trouble with refactoring front end code so that
            each component is modular. <br />
            <u>Next Steps:</u> Figuring out how to do that
            refactoring/modularization efficiently and setup frontend to be
            ready to consume API.
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Chris</strong>
            <br />
            <u>Highlights:</u> Looking into API libraries/frameworks. Fastify –
            what RA uses for API. Looking into Express.js.
            <br />
            <u>Challenges:</u> Trying to find one that uses TypeScript and
            adhering to what RA uses. <br />
            <u>Next Steps:</u> Continue to work on API stuff. Dummy endpoint for
            frontend to hit.
            <br />
          </p>
        </div>
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
