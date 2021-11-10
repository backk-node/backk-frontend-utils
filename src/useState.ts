import React from 'react';

export default function useState<T>(initialState: T) {
  const [state, setState] = React.useState(initialState);

  function updateStateIfNotError(stateUpdate: Partial<T>, errorMessage: string | null) {
    if (!errorMessage) {
      setState({
        ...state,
        ...stateUpdate,
      });
    }
  }

  return [state, updateStateIfNotError];
}
