import { ReactChild, ReactChildren, useEffect, useState } from "react";
import createContextHook from "src/modules/shared/infrastructure/hooks/createContext";
import { CoreAuthState } from "../../domain/CoreAuthState";
import { CoreAuthBloc } from "./CoreAuthBloc";

export const [useCoreAuth, Provider] =
  createContextHook<{ bloc: CoreAuthBloc; state: CoreAuthState }>();

export type CoreAuthBlocProviderProps = {
  initialState?: CoreAuthState;
  children: ReactChild | ReactChildren;
};

export const CoreAuthBlocProvider: React.FC<CoreAuthBlocProviderProps> = ({
  initialState,
  children,
}) => {
  const bloc = new CoreAuthBloc(initialState);
  const [state, setState] = useState<CoreAuthState>(bloc.state);

  useEffect(() => {
    const stateSubscription = (state: CoreAuthState) => {
      setState(state);
    };

    bloc.subscribe(stateSubscription);

    return () => bloc.unsubscribe(stateSubscription);
  });

  return <Provider value={{ bloc, state }}>{children}</Provider>;
};
