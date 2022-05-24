import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const ScreenContainer = styled.View`
  backgroundColor: #FFFFFF;
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const ScrollableScreenContainer = styled.ScrollView`
  backgroundColor: #FFFFFF;
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;
