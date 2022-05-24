import React, { useState, useEffect, } from 'react';

import styled from 'styled-components/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { useMutation, useQueryClient, dehydrate, hydrate } from 'react-query';

import { HomeTab } from './HomeTab/HomeTab';
import { StatusTab } from './StatusTab/StatusTab';
/*   import { StatusScreen } from './StatusTab/screens/StatusScreen' */
import { StatusContext } from '../contexts/status-context';
import { useStatusReducer } from '../reducer/status-reducer';
import { uuid } from '../utils/uuid';

const Greetings = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Hi = styled.Text`
  font-family: HindMadurai_400Regular;
  font-size: 16px;
  color: #fff;
`;
const Username = styled.Text`
  font-family: HindMadurai_600SemiBold;
  font-size: 16px;
  color: #fff;
`;
const Container = styled.View`
  margin-horizontal: 20px;
`;
const Button = styled.TouchableOpacity`
`;
const ButtonText = styled.Text`
  font-family: 'HindMadurai_400Regular';
  font-size: 16px;
  color: #fff;
`;

const createPackage = async ( position ) => {
  const data  = await fetch(`http://localhost:8080/points/${position.id}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: position.id,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      speed: position.coords.speed,
      time: position.timestamp
    })
  });
  return data;
};

export const Tabs = () => { 
  const Stack = createStackNavigator();
  const [ errorMsg, setErrorMsg ] = useState(null); 
  const [ position, setPosition ] = useState([]);
  const { dispatch, packages } = useStatusReducer();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createPackage, {
    onSuccess: (data, variables, context) => {
      const message = "success";
      console.log(message);
    },
    onError: (data, variables, context) => {
      setPosition(prevState => [ ...prevState, variables ]);
      console.log('error');
    },
    onSettled: (data, variables, context) => {
      queryClient.invalidateQueries('create');
    }
  }); 

  const onSubmit = ( data ) => {
    mutate(data);
  };
  useEffect(() => {
   (async () => {
      Location.setGoogleApiKey('AIzaSyA1jDYY6DHaaTg3Je_vv98b5s2_Ram_8eU');
      await Location.requestForegroundPermissionsAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      const locationInterval = setInterval(async () => {
        let position = await Location.getCurrentPositionAsync({});
        position.id = uuid();
        onSubmit(position) 
      }, 5000);
      return () => clearInterval(locationInterval);
      
    })();
  },[]);
  useEffect(() => {
    const state = dehydrate(queryClient)
    hydrate(queryClient, state)
    queryClient.resumePausedMutations()
    dispatch({ type: 'load-packages', payload: position });
    console.log(state);
  },[position])

  return (
    <StatusContext.Provider value={{ dispatch, packages }}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor:'#151575',
          },
          cardStyle: { 
            backgroundColor: '#FFFFFF'
          },
        }
      }
      > 
          <Stack.Screen 
            name="HomeTab"
            component={HomeTab}
            options={({ navigation }) => ({
              title: null,
              headerLeft: () => (
                <Container>
                  <Greetings>
                    <Hi>Olá,&nbsp;</Hi>
                    <Username>bem-vindo</Username>
                  </Greetings>
                </Container>
              ),
              headerRight: () => (
                <Container>
                  <Button
                    onPress={() => navigation.navigate('StatusTab'/* , {position:position} */)}
                  >
                    <ButtonText>
                      Status
                    </ButtonText>
                  </Button>
                </Container>
              ),  
              })} 
          />
          <Stack.Screen 
            name="StatusTab" 
            component={StatusTab}
            options={({ navigation }) => ({
              title: 'Status',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'HindMadurai_600SemiBold',
              },
              headerTintColor: '#fff',
              headerLeft: () => (
                <Container>
                  <Button
                    onPress={() => navigation.navigate('HomeTab')}
                  >
                    <ButtonText>
                      Voltar
                    </ButtonText>
                </Button>
              </Container>
              ),
            })}  
          />     
      </Stack.Navigator>
    </StatusContext.Provider>
  )
}
