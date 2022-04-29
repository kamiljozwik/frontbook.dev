import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Tag } from "contentful";
import Link from "next/link";

import { categories } from "../../../utils/categories";
import { getTools } from "../../../utils/getAllTools";
import { ToolFullDetails } from "../../../models/tools";
import { clientContentful } from "../../../clients";

interface Props {
  tools: ToolFullDetails[];
  tags: Tag[];
}

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const categoryTools = await getTools({ category: params?.category });
  const tags = await clientContentful.allTags();

  return {
    props: {
      tools: categoryTools ?? [],
      tags:
        tags?.items.filter((t) =>
          t.sys.id.startsWith(params?.category as string)
        ) ?? [],
    },
  };
};

const Home: NextPage<Props> = ({ tools, tags }) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div>
      <h4>Category page</h4>
      <h5>{`${category} (${tools?.length})`}</h5>
      <div>
        {tags?.map((t) => (
          <Link key={t.sys.id} href={`/tools/${t.sys.id.replace("-", "/")}`}>
            <a>{t.name}</a>
          </Link>
        ))}
      </div>
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
            color: darkblue;
            padding: 5px 10px;
            margin: 10px;
            border: 1px solid darkblue;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
