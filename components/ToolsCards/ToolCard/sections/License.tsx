import { Badge, MediaQuery, Tooltip } from "@mantine/core";

import { Repository } from "../../../../clients/github/models";

interface Props {
  repository?: Repository;
}

export const License = ({ repository }: Props) => {
  // FIXME: at the moment, "Badge" component has a bug that color prop is not working with mantine theme...
  // const theme = useMantineTheme();

  const licenseInfo = repository?.licenseInfo;
  return (
    <MediaQuery smallerThan="xl" styles={{ display: "none" }}>
      <div style={{ minWidth: "140px", textAlign: "center" }}>
        {licenseInfo ? (
          licenseInfo && licenseInfo.spdxId !== "NOASSERTION" ? (
            <Tooltip label="License">
              <Badge
                size="lg"
                radius="md"
                variant="filled"
                color={licenseInfo.spdxId === "MIT" ? "green" : "orange"}
              >
                {licenseInfo.spdxId}
              </Badge>
            </Tooltip>
          ) : (
            <Badge color="gray">No data</Badge>
          )
        ) : (
          <Badge color="gray">No data</Badge>
        )}
      </div>
    </MediaQuery>
  );
};
