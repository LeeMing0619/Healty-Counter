/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'HealthyCounter.db'});

const SettingListView = ({params, onClick}) => {
  const [onOff, setOnOff] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_setting',
        [],
        (tx, results) => {
          if (results.rows.length === 0)
            setOnOff(false);
          else
            setOnOff(results.rows.item(0).isOne===1?true:false);
        }
      );
    });
  }, []);

  const selectONOFF = (isOne) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_setting",
        [],
        function (tx, res) {
          if (res.rows.length === 0) {
            tx.executeSql(
              'insert into table_setting (isOne) VALUES(?)',
              [isOne],
              (tx, results) => {
              }
            );
          } else {
            tx.executeSql(
              'UPDATE table_setting set isOne=?',
              [isOne],
              (tx, results) => {
              }
            );
          }
        }
      );
    });
    setOnOff(isOne);
  };
  return (
  <TouchableOpacity onPress={onClick}>
    <View style={viewStyle.containerView}>
      <ImageBackground source={params.image} style={viewStyle.imageStyle}>
        {params.option && (
          <View style={viewStyle.switch}>
            <ToggleSwitch
              isOn={onOff}
              onColor="#6AB8F6"
              offColor="#EEF1F2"
              labelStyle={{ color: 'black', fontWeight: '300' }}
              size="medium"
              onToggle={isOn => { selectONOFF(isOn)}}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  </TouchableOpacity>
  );
};

export default SettingListView;

const viewStyle = StyleSheet.create({
  containerView: {
    height: Dimensions.get('window').height / 9,
    marginTop: 10,
  },
  headerView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column',
  },
  switch: {
    // position: 'absolute',
    flex: 1,
    alignItems:'flex-end',
    justifyContent: 'center',
    right: 18,
  },
  imageStyle: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width,
    resizeMode: 'stretch',
  },
});
