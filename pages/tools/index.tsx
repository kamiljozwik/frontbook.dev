import { Group } from "@mantine/core";
import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { CategoryCard } from "../../components/CategoryCard";

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
      <h2>All categories</h2>
      <Group>
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </Group>
    </div>
  );
};

export default Tools;
