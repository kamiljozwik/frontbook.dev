import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import { Plus } from "tabler-icons-react";

export const AddTool = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add new tool 🎉"
      >
        <div>This feature will appear soon 🙂</div>
      </Modal>
      <Button onClick={() => setOpened(true)} leftIcon={<Plus />}>
        Add tool
      </Button>
    </>
  );
};
