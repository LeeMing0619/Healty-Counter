/* eslint-disable prettier/prettier */
import React, { useEffect }from 'react';
import { Image, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Constant, Colors} from '../styles';

import ThumbIcon from '../assets/images/icons-thumb.png';
import CalandarIcon from '../assets/images/icons-calandar.png';
import CameraIcon from '../assets/images/icons-camera.png';
import LightIcon from '../assets/images/icons-light.png';
import SettingIcon from '../assets/images/icons-setting.png';

import ThumbStack from './ThumbStack';
import LightStack from './LightStack';
import SettingStack from './SettingStack';
import CalandarStack from './CalandarStack';
import { openDatabase } from 'react-native-sqlite-storage';
import CameraStack from './CameraStack';

const HomeTabStack = createBottomTabNavigator();

var db = openDatabase({ name: 'HealthyCounter.db'});

const AppNavigator = () => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql('DROP TABLE IF EXISTS table_calandar', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, healthyCounter INT(10))',
              []
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_calandar(id INTEGER PRIMARY KEY AUTOINCREMENT, resetDate VARCHAR(255), followCounter INT(10), unFollowCounter INT(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
  <NavigationContainer>
    <HomeTabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          if (route.name === Constant.THUMB) {
            if (focused) {
              return (
                <Image source={ThumbIcon} style={viewStyle.tabIconActive} />
              );
            } else {
              return (
                <Image source={ThumbIcon} style={viewStyle.tabIconInActive} />
              );
            }
          } else if (route.name === Constant.CALANDAR) {
            if (focused) {
              return (
                <Image
                  source={CalandarIcon}
                  style={viewStyle.tabIconActive}
                />
              );
            } else {
              return (
                <Image
                  source={CalandarIcon}
                  style={viewStyle.tabIconInActive}
                />
              );
            }
          } else if (route.name === Constant.CAMERA) {
            if (focused) {
              return (
                <Image
                  source={CameraIcon}
                  style={viewStyle.tabIconActive}
                />
              );
            } else {
              return (
                <Image
                  source={CameraIcon}
                  style={viewStyle.tabIconInActive}
                />
              );
            }
          } else if (route.name === Constant.HIGHLIGHT) {
            if (focused) {
              return (
                <Image
                  source={LightIcon}
                  style={viewStyle.tabIconActive}
                />
              );
            } else {
              return (
                <Image
                  source={LightIcon}
                  style={viewStyle.tabIconInActive}
                />
              );
            }
          } else if (route.name === Constant.SETTING) {
            if (focused) {
              return (
                <Image
                  source={SettingIcon}
                  style={viewStyle.tabIconActive}
                />
              );
            } else {
              return (
                <Image
                  source={SettingIcon}
                  style={viewStyle.tabIconInActive}
                />
              );
            }
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.APP_COLOR,
        inactiveTintColor: Colors.DIVIDER_GREY,
        showLabel: false,
      }}>
      <HomeTabStack.Screen name={Constant.THUMB} component={ThumbStack} />
      <HomeTabStack.Screen name={Constant.CALANDAR}  component={CalandarStack}/>
      <HomeTabStack.Screen name={Constant.CAMERA}  component={CameraStack}/>
      <HomeTabStack.Screen name={Constant.HIGHLIGHT}  component={LightStack}/>
      <HomeTabStack.Screen name={Constant.SETTING}  component={SettingStack}/>
      {/* <HomeTabStack.Screen
        name={Constant.RESTAURANT}
        component={RestaurantStack}
      /> */}
    </HomeTabStack.Navigator>
  </NavigationContainer>
  );
};

export default AppNavigator;

const viewStyle = StyleSheet.create({
  tabIconActive: {
    width: 32,
    height: 32,
    tintColor: Colors.APP_COLOR,
    resizeMode: 'contain',
  },
  tabIconInActive: {
    width: 32,
    height: 32,
    tintColor: Colors.DIVIDER_BLACK,
    resizeMode: 'contain',
  },
});
