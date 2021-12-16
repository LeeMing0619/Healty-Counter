/* eslint-disable prettier/prettier */
import React from 'react';
import {Constant} from '../styles';
import {createStackNavigator} from '@react-navigation/stack';
import CameraView from '../screens/camera/CameraView';

const CameraStack = () => {
  const CameraStack = createStackNavigator();

  return (
    <CameraStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CameraStack.Screen
        name={Constant.CAMERA}
        component={CameraView}
      />
    </CameraStack.Navigator>
  );
};

export default CameraStack;
