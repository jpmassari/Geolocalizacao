import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { StatusContext } from '../../../contexts/status-context';
import { PackagesList } from '../components/PackagesList/PackagesList';
import { useStatusReducer } from '../../../reducer/status-reducer';

export const StatusScreen = () =>  {
  return (
    <View>
      <PackagesList/>
    </View>

  )
}
