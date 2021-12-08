/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const LightItemView = ({params, onClick, onLongPress}) => (
  <TouchableOpacity onPress={onClick} onLongPress={onLongPress}>
    <View style={viewStyle.containerView}>
      <Image source={params.image} style={viewStyle.imageStyle} />
    </View>
  </TouchableOpacity>
);

export default LightItemView;

const viewStyle = StyleSheet.create({
  containerView: {
    height: Dimensions.get('window').height / 6,
    margin: 5,
  },
  headerView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column',
  },
  imageStyle: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 2 - 40,
    resizeMode: 'contain',
  },
});
