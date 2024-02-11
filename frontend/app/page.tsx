import Image from "next/image";
// import styles from "./page.module.css";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Energy Efficient Household Rewiring</h1>
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
              More description to come as the project develops!
            </p>
            {/* <p className={styles.description}>
              Description of the role played by Dan Turcza. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Id, libero? Expedita
              nesciunt excepturi quae dicta, officia aliquam esse iusto,
              blanditiis eligendi cumque repellat modi distinctio debitis!
              Fugiat molestias earum optio!
            </p> */}
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
              More description to come as the project develops!
            </p>
            {/* <p className={styles.description}>
              Description of the role played by Kevin Ferri. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Id, libero? Expedita
              nesciunt excepturi quae dicta, officia aliquam esse iusto,
              blanditiis eligendi cumque repellat modi distinctio debitis!
              Fugiat molestias earum optio!
            </p> */}
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
              More description to come as the project develops!
            </p>
            {/* <p className={styles.description}>
              Description of the role played by Ricky Cheah. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Id, libero? Expedita
              nesciunt excepturi quae dicta, officia aliquam esse iusto,
              blanditiis eligendi cumque repellat modi distinctio debitis!
              Fugiat molestias earum optio!
            </p> */}
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
              More description to come as the project develops!
            </p>
            {/* <p className={styles.description}>
              Description of the role played by Chris Yang. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Id, libero? Expedita
              nesciunt excepturi quae dicta, officia aliquam esse iusto,
              blanditiis eligendi cumque repellat modi distinctio debitis!
              Fugiat molestias earum optio!
            </p> */}
          </div>
        </div>
      </section>
      <section>
        <h2>Lighthouse Scores</h2>
        {/* <img alt="Lighthouse scores" src="/lighthouse.png"></img> */}
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
