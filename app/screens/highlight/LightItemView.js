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
import { Colors } from '../../styles';
import * as Animatable from 'react-native-animatable';

const LightItemView = ({params, onClick, onLongPress}) => {

  return (
    <TouchableOpacity onPress={onClick} onLongPress={onLongPress}>
      <Animatable.View animation={params.index % 2 === 0 ? 'slideInLeft':'slideInRight'} duration={1000} delay={100} style={viewStyle.containerView}>
        <ImageBackground source={params.image} resizeMode="contain" style={viewStyle.imageStyle}>
          <View style={{flex: 1, flexDirection: 'column',}}>
            <View style={viewStyle.switchText}>
              <Text allowFontScaling={false} numberOfLines={1} style={viewStyle.content_title}>
                  {params.title}
              </Text>
              <Text allowFontScaling={false} numberOfLines={1} style={viewStyle.subTitle}>
                  {params.subtitle}
              </Text>
              <Animatable.Text animation="rubberBand" iterationCount="infinite" duration={3000} style={viewStyle.textStyle}>{params && params.value}</Animatable.Text>
            </View>
          </View>
        </ImageBackground>
      </Animatable.View>
    </TouchableOpacity>
  );
};

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
    fontSize: 26,
    fontWeight: 'normal',
    color: Colors.BLACK,
  },
  switchText: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  content_title: {
    fontSize: 12,
  },
  subTitle: {
    fontSize: 10,
  },
});
