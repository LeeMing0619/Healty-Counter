/* eslint-disable prettier/prettier */
import React from 'react';
import {Constant} from '../styles';
import {createStackNavigator} from '@react-navigation/stack';
import LightView from '../screens/highlight/LightView';

const LightStack = () => {
  const LightStack = createStackNavigator();

  return (
    <LightStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LightStack.Screen
        name={Constant.HIGHLIGHT}
        component={LightView}
      />
    </LightStack.Navigator>
  );
};

export default LightStack;
