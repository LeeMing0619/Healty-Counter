/* eslint-disable prettier/prettier */
import React from 'react';
import {Constant} from '../styles';
import {createStackNavigator} from '@react-navigation/stack';
import CalandarView from '../screens/calandar/CalandarView';

const CalandarStack = () => {
  const CalandarStack = createStackNavigator();

  return (
    <CalandarStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CalandarStack.Screen
        name={Constant.CALANDAR}
        component={CalandarView}
      />
    </CalandarStack.Navigator>
  );
};

export default CalandarStack;
