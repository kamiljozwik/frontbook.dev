import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { clientContentful } from "../../clients/contentful";
import { categories } from "../../utils/categories";
import { Props, Tool } from "../../models/categoryPage";
import { getGithubData } from "../../clients/github";
import { mergeData } from "../../clients/mergeData";

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entries = await clientContentful.getEntries<Tool>({
    content_type: "toolEntry",
    "fields.category": params?.category,
    limit: 999,
  });

  const additionalData = await Promise.all([getGithubData(entries.items)]);

  const fullTools = mergeData(entries.items, additionalData);

  return {
    props: {
      tools: fullTools,
    },
  };
};

const Home: NextPage<Props> = ({ tools }) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div>
      <h4>Category page</h4>
      <h5>{`${category} (${tools?.length})`}</h5>
      {tools?.map((tool) => (
        <p className="category-item" key={tool.sys.id}>
          <div>{tool.fields.name}</div>
          <div>{tool.fields.github}</div>
          <div>{tool.github?.repository.description}</div>
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
