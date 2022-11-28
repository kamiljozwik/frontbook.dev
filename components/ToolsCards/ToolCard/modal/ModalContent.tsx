import { ToolFullDetails } from "../../../../models/tools";

interface Props {
  tool: ToolFullDetails;
}
export const ModalContent = ({ tool }: Props) => {
  return (
    <section>
      <div>Tool details will be here soon ⌛</div>
    </section>
  );
};
