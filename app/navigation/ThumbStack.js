/* eslint-disable prettier/prettier */
import React from 'react';
import {Constant} from '../styles';
import {createStackNavigator} from '@react-navigation/stack';
import ThumbView from '../screens/thumb/ThumbView';

const ThumbStack = () => {
  const ThumbStack = createStackNavigator();

  return (
    <ThumbStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ThumbStack.Screen
        name={Constant.THUMB}
        component={ThumbView}
      />
    </ThumbStack.Navigator>
  );
};

export default ThumbStack;
