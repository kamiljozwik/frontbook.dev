import { ActionIcon } from "@mantine/core";
import { BrandGithub, ExternalLink, Package } from "tabler-icons-react";

interface Props {
  // TODO: make icon prop general
  icon: "github" | "npm" | "website";
  link?: string;
  ariaLabel?: string;
}

export const ExternalIconLink = ({ icon, link, ariaLabel }: Props) => {
  const iconProps = {
    width: 20,
  };
  return (
    <>
      {link && (
        <ActionIcon<"a">
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          variant="hover"
          aria-label={ariaLabel}
        >
          {icon === "github" && <BrandGithub {...iconProps} />}
          {icon === "npm" && <Package {...iconProps} />}
          {icon === "website" && <ExternalLink {...iconProps} />}
        </ActionIcon>
      )}
    </>
  );
};
