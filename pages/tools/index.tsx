import { Group } from "@mantine/core";
import type { NextPage, GetStaticProps } from "next";
import { CategoryCard } from "../../components/CategoryCard";

import { PageProps } from "../../models/page";
import { categories } from "../../dictionaries/categories";

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
