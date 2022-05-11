import type { NextPage, GetStaticProps } from "next";
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
    <div>
      <h1>Welcome to Frontbook</h1>
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
    </div>
  );
};

export default Home;
