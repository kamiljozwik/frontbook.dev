import type { NextPage, GetStaticProps } from "next";
import { createClient } from "contentful";
import styles from "../styles/Home.module.css";

export const getStaticProps: GetStaticProps = async (context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entries = await client.getEntries({
    content_type: "toolEntry",
    "fields.category": "utils",
  });

  return {
    props: {
      tools: entries.items,
    },
  };
};

const Home: NextPage = ({ tools }: any) => {
  console.log(tools);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Frontbook</h1>
      </main>
    </div>
  );
};

export default Home;
