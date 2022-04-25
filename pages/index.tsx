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
        {categories.map((category) => (
          <Link key={category} href={`/category/${category}`}>
            <a>{category}</a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Home;
