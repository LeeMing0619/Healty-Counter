/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Platform, Image, ImageBackground, StyleSheet, FlatList} from 'react-native';
import { Helper } from '../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../assets/images/bgThumb.png';
import SettingListView from './SettingListView';
import * as RNIap from 'react-native-iap';



const SettingView = ({navigation}) => {

  const itemSkus = Platform.select({
    ios: [
      'android.test.purchase',
     ],
     android: [
      'android.test.purchased',
     ],
  });
  
  useEffect(() => {
    RNIap.initConnection();
    RNIap.getAvailablePurchases()
    RNIap.getProducts(itemSkus).then((products) => {
    //handle success of fetch product list
    }).catch((error) => {
      console.log(error.message);
    });
  },[itemSkus]);

  const buyExample = () => {
    RNIap.requestPurchase('android.test.purchased', false).then(purchase => {
      this.setState({count: this.state.count + 1});
      RNIap.consumePurchase(purchase.purchaseToken);
      console.log(purchase);
    }).catch((error) => {
      console.log("Catch: " + error.message);
    });
  };

  const onPressLightItem = (index) => {
    switch (index) {
      case 0:
        navigation.push('WebView1');
        break;
      case 1:
        navigation.push('WebView2');
        break;
      case 2:
        buyExample();
        break;
      case 3:
        navigation.push('WebView3');
        break;
      case 4:
        navigation.push('WebView4');
        break;
    }

  };

  return (
    <SafeAreaView style={viewStyle.container}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
            <FlatList
                style={{marginTop: 40}}
                data={Helper.SettingList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                return (
                    <SettingListView params={item} onClick={() => onPressLightItem(index)} />
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
});
