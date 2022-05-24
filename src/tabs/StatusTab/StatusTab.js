import React, { useEffect, useContext, useState } from 'react';

import { StatusScreen } from './screens/StatusScreen';
/* import { useStatusReducer } from '../../reducer/status-reducer'; */
import { StatusContext } from '../../contexts/status-context'; 
import { useStatusReducer } from '../../reducer/status-reducer';

export const StatusTab = () => {
  return (
      <StatusScreen/>
  );
}
