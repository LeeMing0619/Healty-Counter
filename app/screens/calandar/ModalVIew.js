/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Modal, Text, TouchableWithoutFeedback, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ModalView = ({show, date, follow, unfollow, f0, f1, f2, f3, f4, f5, f6, f7, onRequestClose, onPressOverlay}) => {

  return (
    <Modal
      transparent
      animationType={'none'}
      visible={show}
      onRequestClose={onRequestClose}
      theme={{
     colors: {
       backdrop: 'transparent',
     },
   }}
        >
      <TouchableWithoutFeedback onPress={onPressOverlay}>
        <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <LinearGradient colors={['#FCE8E7', '#EDE3EB', '#E0DFEF' ]} start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }} style={{height: '100%', width: '100%', borderRadius: 10}}>
                        <View style={{padding: 18, height: '100%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch'}}>
                            <Text allowFontScaling={false} style={styles.textView1}>Date: {date}</Text>
                            <Text allowFontScaling={false} style={styles.textView1}>ヘルシーボタンのタップ数: {follow}</Text>
                            <Text allowFontScaling={false} style={styles.textView1}>OMGボタンのタップ数: {unfollow}</Text>
                            <Text allowFontScaling={false} style={styles.textView1}>まごわやさしいのタップ数</Text>
                            <View style={styles.mealView}>
                                <Text allowFontScaling={false} style={styles.textView2}>ま: {f0}</Text>
                                <Text allowFontScaling={false} style={styles.textView2}>ご: {f1}</Text>
                                <Text allowFontScaling={false} style={styles.textView2}>わ: {f2}</Text>
                                <Text allowFontScaling={false} style={styles.textView2}>や: {f3}</Text>
                                <Text allowFontScaling={false} style={styles.textView2}>さ: {f4}</Text>
                            </View>
                            <View style={styles.mealView}>
                                <Text allowFontScaling={false} style={styles.textView2}>し: {f5}</Text>
                                <Text allowFontScaling={false} style={styles.textView2}>い: {f6}</Text>
                                <Text allowFontScaling={false} style={styles.textView2}>こ: {f7}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
        </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    elevation: 12,
  },
  mealView: {
    width: Dimensions.get('window').width - 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginRight: 10,
  },
  textView1: {
      fontSize: 16,
  },
  textView2: {
    fontSize: 16,
    marginRight: 10,
  },
});