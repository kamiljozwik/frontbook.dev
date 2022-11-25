import { useCallback, useMemo } from "react";
import { Flex, Slider, Stack, Text } from "@mantine/core";
import { roundNumber } from "../../../utils/roundNumber";
import {
  Filters as FiltersType,
  useToolCards,
  useToolCardsDispatch,
} from "../ToolsCardsContext";

export const Filters = () => {
  const toolsList = useToolCards();
  const dispatch = useToolCardsDispatch();

  const onChange = useCallback(
    (field: FiltersType, value: number) => {
      dispatch({ type: "filter", payload: { field, value } });
    },
    [dispatch]
  );

  const { github, npm } = useMemo(
    () =>
      toolsList.tools.reduce(
        (acc, curr) => {
          const stars = curr.github?.repository.stargazers.totalCount ?? 0;
          const downloads = curr.npm?.package.downloads ?? 0;

          if (stars > acc.github) {
            acc.github = stars;
          }
          if (downloads > acc.npm) {
            acc.npm = downloads;
          }

          return acc;
        },
        { github: 0, npm: 0 }
      ),
    [toolsList]
  );

  return (
    <Flex gap={100} mb={20}>
      <Stack spacing={5}>
        <Text>Min. GitHub stars</Text>
        <Slider
          sx={{ width: 140 }}
          onChangeEnd={(v) => onChange("github", v)}
          max={github}
          marks={[
            { value: 0, label: "0" },
            { value: github / 2, label: roundNumber(github / 2) },
            { value: github, label: roundNumber(github) },
          ]}
          label={(v) => roundNumber(v)}
        />
      </Stack>
      <Stack spacing={5}>
        <Text>Min. NPM downloads</Text>
        <Slider
          sx={{ width: 140 }}
          onChangeEnd={(v) => onChange("npm", v)}
          max={npm}
          marks={[
            { value: 0, label: "0" },
            { value: npm / 2, label: roundNumber(npm / 2) },
            { value: npm, label: roundNumber(npm) },
          ]}
          label={(v) => roundNumber(v)}
        />
      </Stack>
    </Flex>
  );
};
