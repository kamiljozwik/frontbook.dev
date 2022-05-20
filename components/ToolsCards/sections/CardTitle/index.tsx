import { useState } from "react";
import { Button, createStyles, Group, Modal, Text, Title } from "@mantine/core";

import { ToolFullDetails } from "../../../../models/tools";
import { Labels } from "./Labels";

const useStyles = createStyles((theme) => ({
  title: {
    width: "20%",
  },
}));

interface Props {
  tool: ToolFullDetails;
}

export const CardTitle = ({ tool }: Props) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.title}>
        <Group>
          <Title order={4}>{tool.fields.name}</Title>
          <Button
            compact
            size="xs"
            variant="filled"
            onClick={() => setOpened(true)}
          >
            Details
          </Button>
        </Group>
        {/* Description */}
        <Text color="dimmed" lineClamp={2}>
          {tool.github?.repository.description ?? tool.fields.slogan}
        </Text>
        <Labels tool={tool} />
      </div>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        title={tool.fields.name}
        closeButtonLabel="Close tool details modal"
      >
        Tool details will be here any minute now 😉
      </Modal>
    </>
  );
};
