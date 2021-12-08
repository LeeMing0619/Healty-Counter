/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const SettingListView = ({params, onClick}) => (
  <TouchableOpacity onPress={onClick}>
    <View style={viewStyle.containerView}>
      <Image source={params.image} style={viewStyle.imageStyle} />
    </View>
  </TouchableOpacity>
);

export default SettingListView;

const viewStyle = StyleSheet.create({
  containerView: {
    height: Dimensions.get('window').height / 8,
    marginTop: 10,
  },
  headerView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column',
  },
  imageStyle: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
});
