import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";

interface Props {
  category: string;
}

const CategoryCard = ({ category }: Props) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        {/* <Card.Section>
          <Image src="./image.png" height={160} alt="Norway" />
        </Card.Section> */}

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{category}</Text>
          <Badge variant="light">999 tools</Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          Energistically extend transparent strategic theme areas without
          optimal expertise. Conveniently deliver alternative.
        </Text>
        <Link key={category} href={`/tools/${category}`} passHref>
          <Button
            component="a"
            variant="light"
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
