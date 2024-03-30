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
            This is a mockup for demonstration purposes only and does not yet
            contain any real data.
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
            <u>Highlights:</u> Midterm presentation slides and delivery. Some
            follow-ups to schema PR. Putting together demo presentation
            <br />
            <u>Challenges:</u> Too much presentation and not enough coding 😊
            (plus travel). Also, the fact that we have a monorepo without
            monorepo tooling is starting to hurt a bit. Mobile experience with
            the new tabulator table is not great - the table gets cut off to the
            right and is hard to scroll.
            <br />
            <u>Next Steps:</u> Need to tweak the pipeline to separate LLM table
            normalization and column name mapping stages, since the latter
            should go as late as. Then need to start running more appliances{" "}
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Kevin</strong>
            <br />
            <u>Highlights:</u> Read through peer reviews and summarized to the
            team in Slack. Added more coverage for heat pumps in the URL
            metadata file, and tackled a large part of the water heaters.
            <br />
            <u>Challenges:</u> Repeated model numbers across different
            manufacturers means that searching spec sheets can bring up only the
            same model from a different manufacturer that has better online
            visibility. <br />
            <u>Next Steps:</u> Continue increasing coverage for largest
            manufacturers first and begin collecting spec sheets for dryers.
            Take a breath-first approach to coverage across appliances. <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Ricky</strong>
            <br />
            <u>Highlights:</u> Pushed new table format, updated columns, updated
            some input forms.
            <br />
            <u>Challenges:</u> Tried to implement selection feature on tabulator
            to improve UX but couldn’t find enough information online. Lacks
            freedom using tabulator for react.
            <br />
            <u>Next Steps:</u> Adjust table for mobile viewing, incorporate new
            API results into frontend.
            <br />
          </p>
        </div>
        <div>
          <p>
            <strong>Chris</strong>
            <br />
            <u>Highlights:</u> Finalised and integrated backend API to return
            data to front-end requests + researched on integrating database such
            as Postgres with Vercel.
            <br />
            <u>Challenges:</u> Vercel only permits vercel-compliant database and
            will lock down the project in the Vercel eco-system. This makes it
            hard for the partner to move out of Vercel later on.
            <br />
            <u>Next Steps:</u> Add versioning in the backend API. Instead of
            integrating Vercel Postgres into the backend for querying, create a
            db store with loading data from a raw json store alongside with the
            project.
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
