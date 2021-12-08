/* eslint-disable prettier/prettier */
import React from 'react';
import {Constant} from '../styles';
import {createStackNavigator} from '@react-navigation/stack';
import SettingView from '../screens/setting/SettingView';

const SettingStack = () => {
  const SettingStack = createStackNavigator();

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen
        name={Constant.THUMB}
        component={SettingView}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStack;
