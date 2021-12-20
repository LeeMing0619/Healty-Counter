/* eslint-disable prettier/prettier */
import React from 'react';
import {Constant} from '../styles';
import {createStackNavigator} from '@react-navigation/stack';
import SettingView from '../screens/setting/SettingView';
import WebView1 from '../screens/setting/WebView1';
import WebView3 from '../screens/setting/WebView3';
import WebView2 from '../screens/setting/WebView2';
import WebView4 from '../screens/setting/WebView4';

const SettingStack = () => {
  const SettingStack = createStackNavigator();

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen
        name={Constant.SETTING}
        component={SettingView}
      />
      <SettingStack.Screen
        name={Constant.WEBVIEW1}
        component={WebView1}
      />
      <SettingStack.Screen
        name={Constant.WEBVIEW2}
        component={WebView2}
      />
      <SettingStack.Screen
        name={Constant.WEBVIEW3}
        component={WebView3}
      />
      <SettingStack.Screen
        name={Constant.WEBVIEW4}
        component={WebView4}
      />
    </SettingStack.Navigator>
  );
};

export default SettingStack;
