/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FoodTextView from '../../components/FoodTextView';
import { Colors } from '../../styles';

const LightItemView = ({params, onClick, onLongPress}) => (
  <TouchableOpacity onPress={onClick} onLongPress={onLongPress}>
    <View style={viewStyle.containerView}>
      <ImageBackground source={params.image} resizeMode="contain" style={viewStyle.imageStyle}>
          <Text style={viewStyle.textStyle}>{params && params.title}</Text>
      </ImageBackground>
    </View>
  </TouchableOpacity>
);

export default LightItemView;

const viewStyle = StyleSheet.create({
  containerView: {
    height: Dimensions.get('window').height / 6 - 8,
    margin: 5,
  },
  headerView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column',
  },
  imageStyle: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 2 - 40,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    letterSpacing: -0.24,
    fontWeight: 'normal',
    color: Colors.BLACK,
  },
});
