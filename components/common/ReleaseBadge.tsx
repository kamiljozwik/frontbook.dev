import { Badge, BadgeProps } from "@mantine/core";

import { Release } from "../../clients/github/models";

interface Props extends BadgeProps<"a"> {
  release?: Release;
  width?: string;
  maxWidth?: string;
}

export const ReleaseBadge = ({
  release,
  width = "80px",
  maxWidth = "unset",
  ...props
}: Props) => {
  return (
    <Badge<"a">
      component="a"
      variant="outline"
      href={release?.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={(theme) => ({
        width,
        maxWidth,
        "&:hover": {
          backgroundColor: theme.colors.blue[6],
          cursor: "pointer",
          color: "white",
        },
      })}
      {...props}
    >
      {release?.tagName}
    </Badge>
  );
};
