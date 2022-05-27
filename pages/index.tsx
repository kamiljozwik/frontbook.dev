import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { Group, Paper, Title } from "@mantine/core";

import { PageProps } from "../models/page";
import { categories } from "../dictionaries/categories";

interface Props extends PageProps {}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      categories,
    },
  };
};

const Home: NextPage<Props> = () => {
  return (
    <div>
      <Title order={1} align={"center"} mb={20}>
        Welcome to Frontbook
      </Title>
      <Group position="center">
        <Paper p="xl" shadow="xs">
          <Link href="/tools">
            <a>Tools</a>
          </Link>
        </Paper>
        <Paper p="xl" shadow="xs">
          <Link href="/releases">
            <a>Releases</a>
          </Link>
        </Paper>
      </Group>
    </div>
  );
};

export default Home;
