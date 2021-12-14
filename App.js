/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import 'react-native-gesture-handler';

import React from 'react';
import {
  View,
} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import createStyles from './app/styles/style';

const baseStyle = createStyles();

const App = () => {
  return (
    <View style={baseStyle.container}>
      <AppNavigator />
    </View>
  );
};

export default App;
