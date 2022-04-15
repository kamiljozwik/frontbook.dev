import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { clientContentful } from "../../clients/contentful";
import { categories } from "../../utils/categories";
import { Props } from "../../models/categoryPage";

export async function getStaticPaths() {
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entries = await clientContentful.getEntries({
    content_type: "toolEntry",
    "fields.category": params?.category,
    limit: 999,
  });

  return {
    props: {
      tools: entries.items,
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
          {tool.fields.name}
        </p>
      ))}
      <style jsx>
        {`
          .category-item {
            color: darkblue;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
