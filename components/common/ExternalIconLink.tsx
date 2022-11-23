import { ActionIcon } from "@mantine/core";
import {
  BrandGithub,
  BrandTwitter,
  ExternalLink,
  IconProps,
  Package,
} from "tabler-icons-react";

interface Props {
  // TODO: make icon prop general
  icon: "github" | "npm" | "website" | "twitter";
  link?: string;
  ariaLabel?: string;
  iconProps?: IconProps;
}

export const ExternalIconLink = ({
  icon,
  link,
  ariaLabel,
  iconProps,
}: Props) => {
  const props: IconProps = {
    width: 20,
    ...iconProps,
  };

  return (
    <>
      {link && (
        <ActionIcon<"a">
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          variant="default"
          aria-label={ariaLabel}
        >
          {icon === "github" && <BrandGithub {...props} />}
          {icon === "twitter" && <BrandTwitter {...props} />}
          {icon === "npm" && <Package {...props} />}
          {icon === "website" && <ExternalLink {...props} />}
        </ActionIcon>
      )}
    </>
  );
};
