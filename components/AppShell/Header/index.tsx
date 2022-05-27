import { Header, MediaQuery, Burger, Group } from "@mantine/core";
import { ExternalIconLink } from "../../common/ExternalIconLink";

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader = ({ opened, setOpened }: Props) => {
  return (
    <Header height={50} p="md">
      <Group align="center" position="apart">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color="gray"
            mr="xl"
          />
        </MediaQuery>
        <div />
        <Group>
          <ExternalIconLink
            icon="twitter"
            link="https://twitter.com/Frontbook_dev"
            ariaLabel="Link to Twitter"
          />
          <ExternalIconLink
            icon="github"
            link="https://github.com/kamiljozwik/frontbook.dev"
            ariaLabel="Link to GitHub"
          />
        </Group>
      </Group>
    </Header>
  );
};
