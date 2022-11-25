import {
  useReducer,
  PropsWithChildren,
  createContext,
  Dispatch,
  useContext,
} from "react";

import { ToolFullDetails } from "../../models/tools";
import { SortingType } from "./sorting/helpers";

type ToolsCardsState = {
  tools: ToolFullDetails[];
  sorting: SortingType;
  filters: {
    github?: number;
    npm?: number;
  };
};

type Filters = keyof ToolsCardsState["filters"];

const ToolsCardsContext = createContext<ToolsCardsState>({
  tools: [],
  filters: {},
  sorting: "downloads",
});

const ToolsCardsDispatchContext = createContext<Dispatch<Actions>>(() => null);

const useToolCards = () => {
  return useContext(ToolsCardsContext);
};

const useToolCardsDispatch = () => {
  return useContext(ToolsCardsDispatchContext);
};

type Actions =
  | {
      type: "sorting";
      payload: SortingType;
    }
  | {
      type: "filter";
      payload: { field: Filters; value: number };
    };

const reducer = (state: ToolsCardsState, action: Actions) => {
  switch (action.type) {
    case "sorting":
      return {
        tools: state.tools,
        sorting: action.payload,
        filters: state.filters,
      };
    case "filter":
      return {
        tools: state.tools,
        sorting: state.sorting,
        filters: {
          ...state.filters,
          [action.payload.field]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

interface Props extends PropsWithChildren {
  initTools: ToolFullDetails[];
}

const ToolCardsProvider = ({ children, initTools }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    tools: initTools,
    filters: {},
    sorting: "downloads",
  });

  return (
    <ToolsCardsContext.Provider value={state}>
      <ToolsCardsDispatchContext.Provider value={dispatch}>
        {children}
      </ToolsCardsDispatchContext.Provider>
    </ToolsCardsContext.Provider>
  );
};

export { useToolCards, useToolCardsDispatch, ToolCardsProvider };

export type { Filters };
