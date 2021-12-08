/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, FlatList, Pressable} from 'react-native';
import { Helper } from '../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../assets/images/bgThumb.png';
import LightTitleImage from '../../assets/images/light-title.png';
import LightItemView from './LightItemView';

const LightView = ({navigation}) => {
  const onPressLightItem = (position) => {
    alert('pressed');
  };

  const onLongPressLiteItem = (position) => {
    alert('Long pressed');
  };

  return (
    <SafeAreaView style={viewStyle.container}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
            <Image source={LightTitleImage} style={viewStyle.textTitleStyle}/>
            <Pressable style={{flex: 1}}>
              <FlatList
                  data={Helper.LightList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                  return (
                      <LightItemView params={item} onClick={() => onPressLightItem(index)} onLongPress={() => onLongPressLiteItem(index)}/>
                  );
                  }}
                  numColumns={2}
              />
            </Pressable>
        </ImageBackground>
    </SafeAreaView>
  );
};

export default LightView;

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textTitleStyle: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
});
