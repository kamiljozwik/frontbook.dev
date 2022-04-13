import type { NextPage, GetStaticProps } from "next";

const Home: NextPage = ({ tools }: any) => {
  console.log(tools);
  return (
    <div>
      <h4>Category page</h4>
    </div>
  );
};

export default Home;
