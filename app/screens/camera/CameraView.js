/* eslint-disable prettier/prettier */
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CAMERAICON from '../../assets/images/ico-camera.png';
import CameraRoll from '@react-native-community/cameraroll';

const CameraView = ({navigation}) => {
    const takePicture = async() => {
        if (this.camera) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await this.camera.takePictureAsync(options);
                CameraRoll.save(data.uri, {
                    type: "photo",
                    album: "../HealthyCounter"
                 }).
                 then((res) => {
                    console.log("save img...", res);
                 }).
                 catch((err) => {
                    console.log("err for save img...", err);
                 })
            } catch (error) {
                console.log(error);
            }
            
        }
    };

    return (
        <View style={viewStyle.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={viewStyle.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0,}}>
          <TouchableOpacity onPress={takePicture.bind(this)} style={viewStyle.capture}>
            <Image source={CAMERAICON}  style={viewStyle.imageStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default CameraView;

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
  },
  imageStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
