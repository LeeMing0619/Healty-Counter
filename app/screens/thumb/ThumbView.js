/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import HealthyIcon from '../../assets/images/HealthyCounter.png';
import FollowIcon from '../../assets/images/follow.png';
import UnFollowIcon from '../../assets/images/unfollow.png';
import BackgroundImage from '../../assets/images/bgThumb.png';


const ThumbView = ({navigation}) => {
  const [num_counter, setNumCounter] = useState(0);

  const _onPressFollow = () => {
    setNumCounter(num_counter + 1);
  };

  const _onPressUnFollow = () => {
    setNumCounter(num_counter - 1);
  };

  const _onPressCounter = () => {

  };

  return (
    <View style={viewStyle.containerView}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
            <View style={viewStyle.headerView}>
                <Text style={viewStyle.textTitleStyle}>Healthy Counter</Text>
                <TouchableOpacity onPress={() => _onPressCounter()}>
                  <ImageBackground source={HealthyIcon} resizeMode="contain" style={viewStyle.imageStyleHealthy}>
                      <Text style={viewStyle.textTitleStyle1}>{num_counter}</Text>
                  </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={viewStyle.headerView2}>
              <TouchableOpacity onPress={() => _onPressFollow()}>
                <Image source={FollowIcon} style={viewStyle.imageStyle} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _onPressUnFollow()}>
                <Image source={UnFollowIcon} style={viewStyle.imageStyle1} />
              </TouchableOpacity>
            </View>
        </ImageBackground>
    </View>
    );
  };

export default ThumbView;

const viewStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
  },
  headerView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyleHealthy: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 2 - 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageStyle: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 2 - 30,
    resizeMode: 'contain',
  },
  imageStyle1: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 2 - 30,
    resizeMode: 'contain',
  },
  textTitleStyle: {
    fontSize: 26,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 20,
  },
  textTitleStyle1: {
    fontSize: 42,
    color: 'rgba(0,0,0,0.7)',
    marginLeft: -15,
    marginBottom: 40,
  },
});
