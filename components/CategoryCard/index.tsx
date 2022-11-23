import { Card, Text, Button, Group, useMantineTheme } from "@mantine/core";
import Link from "next/link";

import { Category, getCategoryDict } from "../../dictionaries/categories";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const { name, desc } = getCategoryDict(category);

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{name}</Text>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {desc}
        </Text>
        <Link key={category} href={`/tools/${category}`}>
          <Button
            variant="filled"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            See more
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export { CategoryCard };
