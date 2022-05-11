import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";

import { PageProps } from "../models/page";
import { categories } from "../utils/categories";

interface Props extends PageProps {}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      categories,
    },
  };
};

const Home: NextPage<Props> = () => {
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
