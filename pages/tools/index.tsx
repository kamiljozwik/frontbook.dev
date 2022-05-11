import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";

import { PageProps } from "../../models/page";
import { categories } from "../../utils/categories";

interface Props extends PageProps {}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      categories,
    },
  };
};

const Tools: NextPage<Props> = ({ categories }) => {
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

export default Tools;
