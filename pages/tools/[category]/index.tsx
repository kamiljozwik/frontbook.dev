import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Tag } from "contentful";
import { Text, Title } from "@mantine/core";

import {
  categories,
  getCategoryDict,
  Category as CategoryType,
} from "../../../dictionaries/categories";
import { getTools } from "../../../utils/getAllTools";
import { ToolFullDetails } from "../../../models/tools";
import { clientContentful } from "../../../clients";
import { PageProps } from "../../../models/page";
import { ToolsCards } from "../../../components/ToolsCards";
import { TagsCards } from "../../../components/TagsCards";

interface Props extends PageProps {
  tools: ToolFullDetails[];
  tags: Tag[];
}

export const getStaticPaths: GetStaticPaths = (context) => {
  // TODO: Get it from "tags"
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tags = await clientContentful.allTags();

  const categoryTags =
    tags?.items.filter((t) =>
      t.sys.id.startsWith(params?.category as string)
    ) ?? [];

  const categoryTools =
    categoryTags?.length > 0
      ? []
      : await getTools({ category: params?.category });

  return {
    props: {
      categories,
      tools: categoryTools,
      tags: categoryTags,
    },
  };
};

const Category: NextPage<Props> = ({ tools, tags }) => {
  const router = useRouter();
  const { category } = router.query;

  const { name } = getCategoryDict(category as CategoryType);

  return (
    <div>
      <Title align="center">{name}</Title>
      <Text mb={"30px"} align="center">{`${
        tools?.length > 0 ? `${tools?.length} tools` : "Select subcategory"
      }`}</Text>
      <TagsCards tags={tags} />
      <ToolsCards tools={tools} />
    </div>
  );
};

export default Category;
