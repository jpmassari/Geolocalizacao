import React, { useState, useEffect } from 'react';
import { View, Switch } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'; 

import { LayoutPadding } from '../../../ui-components/LayoutPadding/LayoutPadding';
import {  } from '../../../ui-components/ScreenContainer/ScreenContainer';
import { TimeCommunicationBoxes } from '../components/TimeCommunicationBoxes';

const Content = styled(LayoutPadding)`
  flex-direction: column;
  flex: 1;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  ${props => props.justifyContent && `
    justify-content: space-between;
  `}
`;
const Column = styled.View`
  flex-direction: column;
  margin-left: ${props => props.margin || '0'}px;
`;
const Title = styled.Text`
  font-family: HindMadurai_600SemiBold;
  color: 'rgba(53,63,59,255)';
  font-size: 24px;
`;
const Label = styled.Text`
  font-family: HindMadurai_500Medium;
  color: 'rgba(53,63,59,255)';
  font-size: ${props => props.fontSize || '20'}px;
  margin-bottom: 5px;
`;
const StatusDisplay = styled.Text`
  font-family: HindMadurai_400Regular;
  color: ${props => props.active ? 'rgba(51,197,40,255)' : 'rgba(74,81,88,255)'};

  font-size: 16px;
`;
const DivisorLine = styled.View`
  height: 1px;
  width: 100%;

  margin-top: 15px;
  margin-bottom: 15px;

  background-color: rgba(0, 0, 0, 0.15);
`;
const Boxes = styled.View`
  margin-top: 30px;
`;

export const HomeScreen= () => {
  const [ serviceEnabled, setserviceEnabledd] = useState(false);
  const toggleSwitch = () => setserviceEnabledd(previousState => !previousState);
  return (
    <Content>
      <Row>
        <Feather name="compass" size={60} color="#1c1b83" />
        <Column margin={15}>
          <Title>My GPS - Tracking</Title>
          { serviceEnabled
           ? <StatusDisplay active >Online</StatusDisplay>
           : <StatusDisplay>Offline</StatusDisplay>
          }
        </Column>
      </Row>

      <DivisorLine />

      <Row justifyContent>
        <Column>
          <Label>Status do serviço</Label>
          {
            serviceEnabled ? (
              <StatusDisplay active >Serviço ativo</StatusDisplay> 
            ) : (
              <StatusDisplay>Serviço Inativo</StatusDisplay> 
            )
          }
        </Column>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={serviceEnabled ? '#21f51d' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={serviceEnabled}
        />
      </Row>

      <Boxes>
        <Label fontSize={18} >Intervalo de comunicação</Label>
        <TimeCommunicationBoxes serviceEnabled={serviceEnabled}/>
      </Boxes>
    </Content>
  )
}
