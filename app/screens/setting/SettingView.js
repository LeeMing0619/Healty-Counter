/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, FlatList} from 'react-native';
import { Helper } from '../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../assets/images/bgThumb.png';
import SettingListView from './SettingListView';

const SettingView = ({navigation}) => {
  return (
    <SafeAreaView style={viewStyle.container}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
            <FlatList
                style={{marginTop: 40}}
                data={Helper.SettingList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                return (
                    <SettingListView params={item} />
                );
                }}
            />
        </ImageBackground>
    </SafeAreaView>
  );
};

export default SettingView;

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