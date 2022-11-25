import { useCallback, useState } from "react";
import { Flex, Select } from "@mantine/core";

import { sortingOptions, SortingType } from "./helpers";
import { useToolCardsDispatch } from "../ToolsCardsContext";

export const Sorting = () => {
  const dispatch = useToolCardsDispatch();

  const [sortingBy, setSortingBy] = useState<SortingType>("downloads");

  const onChange = useCallback(
    (sortByVal: SortingType) => {
      setSortingBy(sortByVal);

      dispatch({
        type: "sorting",
        payload: sortByVal,
      });
    },
    [dispatch]
  );

  const options = sortingOptions.map((value) => ({
    value,
    label: value,
  }));

  return (
    <>
      <Select
        label="Sort by:"
        value={sortingBy}
        data={options}
        onChange={onChange}
      />
    </>
  );
};
