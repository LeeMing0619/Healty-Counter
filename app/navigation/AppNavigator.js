/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Constant, Colors} from '../styles';
import RecipeStack from './RecipeStack';
import RestaurantStack from './RestaurantStack';
import ThumbIcon from '../assets/images/icons-thumb.png';
import CalandarIcon from '../assets/images/icons-calandar.png';
import CameraIcon from '../assets/images/icons-camera.png';
import LightIcon from '../assets/images/icons-light.png';
import SettingIcon from '../assets/images/icons-setting.png';
import RestaurantIcon from '../assets/images/icons-restaurant.png';
import ThumbStack from './ThumbStack';
import LightStack from './LightStack';
import SettingStack from './SettingStack';

const HomeTabStack = createBottomTabNavigator();

const AppNavigator = () => (
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
      <HomeTabStack.Screen name={Constant.CALANDAR}  component={RecipeStack}/>
      <HomeTabStack.Screen name={Constant.CAMERA}  component={RecipeStack}/>
      <HomeTabStack.Screen name={Constant.HIGHLIGHT}  component={LightStack}/>
      <HomeTabStack.Screen name={Constant.SETTING}  component={SettingStack}/>
      {/* <HomeTabStack.Screen
        name={Constant.RESTAURANT}
        component={RestaurantStack}
      /> */}
    </HomeTabStack.Navigator>
  </NavigationContainer>
);

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
