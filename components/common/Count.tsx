import { ReactNode } from "react";
import { createStyles, Group, useMantineTheme, Text } from "@mantine/core";
import { Bug, Download, GitPullRequest, Star } from "tabler-icons-react";

import { roundNumber } from "../../utils/roundNumber";

const useStyles = createStyles((theme) => ({
  counts: {
    marginRight: "6px",
  },
}));

// TODO: make icon prop general
interface Props {
  icon?: "github" | "npm" | "issues" | "pr";
  count?: number;
  tail?: string;
  round?: boolean;
  rightIco?: ReactNode;
}

export const Count = ({ count, icon, tail, round = true, rightIco }: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const grey = theme.colors.gray[6];

  const iconProps = {
    size: 20,
    color: grey,
  };

  return (
    <Group spacing="xs">
      {icon === "github" && <Star {...iconProps} />}
      {icon === "npm" && <Download {...iconProps} />}
      {icon === "issues" && <Bug {...iconProps} />}
      {icon === "pr" && <GitPullRequest {...iconProps} />}
      <Text color={grey}>
        <strong className={classes.counts}>
          {round ? roundNumber(count) : count}
        </strong>
        <span>{tail}</span>
      </Text>
      {rightIco}
    </Group>
  );
};
