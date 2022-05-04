import type { NextPage, GetStaticProps } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import { categories } from "../utils/categories";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      categories,
    },
  };
};

interface Props {
  categories: string[];
}

const Home: NextPage<Props> = ({ categories }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Frontbook</h1>
        <div>
          <Link href="/tools">
            <a>Tools</a>
          </Link>
        </div>
        <div>
          <Link href="/releases">
            <a>Releases</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
