import React, { useState }  from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { flushSync } from 'react-dom';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Box = styled.View`
  border-width: 1.8px;
  border-radius: 5px;
  border-color: ${props => props.active ? props.isServiceEnabled ? '#72d66d' : '#798480' : '#bec4cd'};
  ${props => (props.active && props.isServiceEnabled) &&`
    background-color: #d5f7df;
  `};
  width: ${props => props.boxWidth || '0'}px;
  height: ${props => props.boxWidth - 10 || '0'}px;
`;

const Label = styled.Text`
  font-family: ${props => props.active ? 'HindMadurai_600SemiBold' : 'HindMadurai_400Regular'};
  color: ${props => props.active ? '#33403b' : '#bdc0ca'};
  font-size: 18px;
  text-align: center;
  line-height: ${props => props.boxWidth - 10 || '0'}px;
`;

const TimeBox = ({
   width,
   label,
   isSelected = 0,
   index = 0,
   isServiceEnabled,
   onPress = () => null,
}) => {
  const [ selected, setSelected ] = useState(true)
  const onPressFunction = () => { onPress(index); setSelected(!!selected) }

  return (
    <Pressable onPress={onPressFunction}>
      {
        isSelected === index ? (
          <Box 
            boxWidth={width}
            active={selected}
            isServiceEnabled={isServiceEnabled}
          >
            <Label active={selected} boxWidth={width} isServiceEnabled={isServiceEnabled} >{label}</Label>
          </Box>
        ) : (
          <Box 
            boxWidth={width}
            isServiceEnabled={isServiceEnabled}
          >
            <Label boxWidth={width} isServiceEnabled={isServiceEnabled} >{label}</Label>
          </Box>
        )
      }
    
    </Pressable>
  )
}

export const TimeCommunicationBoxes = ({ serviceEnabled }) => {
  const [ Width, setWidth ] = useState(1);
  /* const boxes = [ ...Array(4).keys() ]; */
  const boxes = ['10s', '5s', '3s', '1s'];
  const boxWidth = Number((Math.floor(Width / boxes.length) - 15).toFixed(0));
  
  const [ isSelected, setIsSelected ] = useState(0);
  return (
    <Container onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {
       boxes.map((value, i) => (
          <TimeBox key={i} index={i} label={value} width={boxWidth} isSelected={isSelected} onPress={(i) => setIsSelected(i) } isServiceEnabled={serviceEnabled}/>
        ))
      }
    </Container>
  )
}