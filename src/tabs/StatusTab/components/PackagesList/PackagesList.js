import React, { useState, useEffect, useContext } from 'react';
import { View, Text} from 'react-native';
import styled from 'styled-components/native';
import { ScrollableScreenContainer } from '../../../../ui-components/ScreenContainer/ScreenContainer'
import { LayoutPadding } from '../../../../ui-components/LayoutPadding/LayoutPadding';
import { StatusContext } from '../../../../contexts/status-context';

const Content = styled(LayoutPadding)`
  flex-direction: column;
  flex: 1;
  padding-top: 20px;
  align-items: center;
`;
const ListContainer = styled.View`
  width: 100%;
`;
const DivisorLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
`;
const Label = styled.Text`
  font-family: HindMadurai_500Medium;
  color:'rgba(53,63,59,255)';
  font-size: ${props => props.fontSize || '20'}px;
  margin-bottom: ${props => props.margin || '0'}px
`;
const CoordsLabel = styled.Text`
  font-family: HindMadurai_400Regular;
  color: rgba(74,81,88,255);
  font-size: 16px;
  margin-bottom: 10px;
`;
const List = ({ p }) => {
  return (
    <ListContainer>
      <Label>Pacote ID: {p.id}</Label> 
      <Label fontSize={16} margin={5} >Pendente a sincronizar</Label> 
      {Object.entries(p).map((c,i)=> (
        <CoordsLabel key={i}>{c[0]} : {c[1]}</CoordsLabel>
      ))}
      <DivisorLine/>
    </ListContainer>
  )
}

export const PackagesList = () => {
  const { packages } = useContext(StatusContext)
  return (
    <Content>
      <DivisorLine />
      {packages.length > 0 && packages.map((p,i) => (
          <List key={i} p={p} />
      ))} 
    </Content>
  )
}
