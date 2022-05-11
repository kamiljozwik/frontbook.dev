import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";

import { categories } from "../../utils/categories";

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
    <div>
      <h1>ALL TOOLS</h1>
      {categories.map((category) => (
        <Link key={category} href={`/tools/${category}`}>
          <a>{category}</a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
