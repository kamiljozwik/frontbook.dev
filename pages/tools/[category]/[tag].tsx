import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { getTools } from "../../../utils/getAllTools";
import { ToolFullDetails } from "../../../models/tools";
import { clientContentful } from "../../../clients";
import { PageProps } from "../../../models/page";
import {
  categories,
  Category,
  getCategoryDict,
} from "../../../dictionaries/categories";
import { ToolsCards } from "../../../components/ToolsCards";
import { Title } from "@mantine/core";

interface Props extends PageProps {
  tools: ToolFullDetails[];
  tagName: string;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const tags = await clientContentful.allTags();
  const paths =
    tags?.items.map((tag) => ({
      params: {
        category: tag.sys.id.split("-")[0],
        tag: tag.sys.id.split("-")[1],
      },
    })) ?? [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tags = await clientContentful.allTags();
  const currTag = `${params?.category}-${params?.tag}`;
  const tagTools = await getTools({
    tag: currTag,
  });

  const tagName =
    tags?.items.find((tag) => tag.sys.id === currTag)?.name ?? "Subcategory";

  return {
    props: {
      tagName,
      categories,
      tools: tagTools ?? [],
    },
  };
};

const Tag: NextPage<Props> = ({ tools, tagName }) => {
  const router = useRouter();
  const { category } = router.query;

  const { name } = getCategoryDict(category as Category);

  return (
    <div>
      <Title align="center">{name}</Title>
      <Title
        align="center"
        order={2}
        mb={20}
      >{`${tagName} (${tools?.length} tools)`}</Title>
      <ToolsCards tools={tools} />
    </div>
  );
};

export default Tag;
