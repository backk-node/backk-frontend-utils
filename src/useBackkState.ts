import React from 'react';

export type StateUpdater<T> = (stateUpdate: Partial<T>, errorMessage: string | null) => void;

export default function useBackkState<T>(initialState: T): [T, StateUpdater<T>] {
  const [state, setState] = React.useState(initialState);

  function updateStateIfNotError(stateUpdate: Partial<T>, errorMessage: string | null): void {
    if (!errorMessage) {
      setState({
        ...state,
        ...stateUpdate,
      });
    }
  }

  return [state, updateStateIfNotError];
}
