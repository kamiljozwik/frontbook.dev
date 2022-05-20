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

interface Props extends PageProps {
  tools: ToolFullDetails[];
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
  const tagTools = await getTools({
    tag: `${params?.category}-${params?.tag}`,
  });

  return {
    props: {
      categories,
      tools: tagTools ?? [],
    },
  };
};

const Tag: NextPage<Props> = ({ tools }) => {
  const router = useRouter();
  const { category, tag } = router.query;

  const { name } = getCategoryDict(category as Category);

  return (
    <div>
      <h3>{name}</h3>
      <h4>{`${tag} (${tools?.length} tools)`}</h4>
      <ToolsCards tools={tools} />
    </div>
  );
};

export default Tag;
