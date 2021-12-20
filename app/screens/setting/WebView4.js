/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const WebView4 = ({navigation}) => {
  return (
    <SafeAreaView style={viewStyle.container}>
        <View style = {viewStyle.container}>
            <WebView
                source = {{ uri:'https://forkids.xsrv.jp/' }}
            />
        </View>
    </SafeAreaView>
  );
};

export default WebView4;

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
