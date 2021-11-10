import React from 'react';

export default function useState<T>(initialState: T) {
  const [state, setState] = React.useState(initialState);

  function updateStateIfNotError(newPartialState: Partial<T>, errorMessage: string | null) {
    if (!errorMessage) {
      setState({
        ...state,
        ...newPartialState,
      });
    }
  }

  return [state, updateStateIfNotError];
}
