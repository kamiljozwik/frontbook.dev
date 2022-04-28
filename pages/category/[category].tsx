import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { categories } from "../../utils/categories";
import { Props } from "../../models/categoryPage";
import { getAllTools } from "../../clients/contentful/getAllTools";

export const getStaticPaths: GetStaticPaths = (context) => {
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const allTools = await getAllTools();

  const categoryTools = allTools?.items?.filter(
    (tool) => tool.fields.category === params?.category
  );

  return {
    props: {
      tools: categoryTools ?? [],
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
          {/* <div>{tool.github?.repository.description}</div> */}
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
