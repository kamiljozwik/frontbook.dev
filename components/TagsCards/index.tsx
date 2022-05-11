import { Group, Paper, Text } from "@mantine/core";
import { Tag } from "contentful";
import Link from "next/link";
import React from "react";

interface Props {
  tags: Tag[];
}

export const TagsCards = ({ tags }: Props) => {
  return (
    <div>
      <Group>
        {tags?.map((t) => (
          <Paper key={t.sys.id} shadow="xs" p="md">
            <Link href={`/tools/${t.sys.id.replace("-", "/")}`}>
              <a>{t.name}</a>
            </Link>
          </Paper>
        ))}
      </Group>
    </div>
  );
};
