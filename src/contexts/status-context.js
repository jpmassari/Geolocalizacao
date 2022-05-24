import { createContext } from 'react';

export const StatusContext = createContext({
  dispatch: () => null,
  packages: [],
  status: false,
})
