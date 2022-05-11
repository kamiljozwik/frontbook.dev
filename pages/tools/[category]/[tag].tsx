import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { getTools } from "../../../utils/getAllTools";
import { ToolFullDetails } from "../../../models/tools";
import { clientContentful } from "../../../clients";
import { PageProps } from "../../../models/page";
import { categories } from "../../../utils/categories";

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
  const { tag } = router.query;

  return (
    <div>
      <h4>Subcategory page</h4>
      <h5>{`${tag} (${tools?.length})`}</h5>
      {tools?.map((tool) => (
        <p className="category-item" key={tool.sys.id}>
          <div>{tool.fields.name}</div>
          <div>{tool.fields.github}</div>
          <div>{tool.github?.repository.description}</div>
          <div>NPM Downloads: {tool.npm?.package.downloads}</div>
        </p>
      ))}
      <style jsx>
        {`
          .category-item {
            color: darkgreen;
            padding: 5px 10px;
            margin: 10px;
            border: 1px solid darkblue;
          }
        `}
      </style>
    </div>
  );
};

export default Tag;
