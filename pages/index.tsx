import type { NextPage, GetStaticProps } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { clientContentful } from "../clients/contentful";
import { categories } from "../utils/categories";

export const getStaticProps: GetStaticProps = async (context) => {
  // TODO: use to get all categories when new category field will be used.
  // const resp = await clientContentful.getContentType("toolEntry");

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
