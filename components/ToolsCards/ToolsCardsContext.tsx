import {
  useReducer,
  PropsWithChildren,
  createContext,
  Dispatch,
  useContext,
} from "react";

import { ToolFullDetails } from "../../models/tools";
import { sortingFns, SortingType } from "./sorting/helpers";

const ToolsCardsContext = createContext<ToolFullDetails[]>([]);
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
      payload?: any;
    };

const reducer = (toolsList: ToolFullDetails[], action: Actions) => {
  switch (action.type) {
    case "sorting":
      return [...toolsList].sort(sortingFns[action.payload]);
    case "filter":
      return toolsList;
    default:
      return toolsList;
  }
};

interface Props extends PropsWithChildren {
  initTools: ToolFullDetails[];
}

const ToolCardsProvider = ({ children, initTools }: Props) => {
  const [tasks, dispatch] = useReducer(
    reducer,
    [...initTools].sort(sortingFns["downloads"])
  );

  return (
    <ToolsCardsContext.Provider value={tasks}>
      <ToolsCardsDispatchContext.Provider value={dispatch}>
        {children}
      </ToolsCardsDispatchContext.Provider>
    </ToolsCardsContext.Provider>
  );
};

export { useToolCards, useToolCardsDispatch, ToolCardsProvider };
