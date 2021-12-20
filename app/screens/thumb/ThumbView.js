/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

var db = openDatabase({ name: 'HealthyCounter.db'});

const ThumbView = ({navigation}) => {
  const [num_counter, setNumCounter] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user',
          [],
          (tx, results) => {
            if (results.rows.length > 0)
              setNumCounter(results.rows.item(0).healthyCounter);
          }
        );
      });
    }, [])
  );

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          if (results.rows.length > 0)
            setNumCounter(results.rows.item(0).healthyCounter);
        }
      );
    });
  }, [navigation]);

  const _onPressFollow = () => {
    setNumCounter(num_counter + 1);
    if (num_counter === 9 || num_counter === 19 || num_counter === 29 || num_counter === 39) {
      alert("ランダムメッセージ");
    }
    if (num_counter > 44) {
      alert('※リセットのアラート');
      initCounter();
      setNumCounter(0);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM table_user",
          [],
          function (tx, res) {
            // console.log(res.rows.item(0));
            if (res.rows.length === 0) {
              tx.executeSql(
                'insert into table_user (healthyCounter) VALUES(?)',
                [num_counter + 1],
                (tx, results) => {
                  //alert(""+ results.rowsAffected)
                }
              );
            } else {
              tx.executeSql(
                'UPDATE table_user set healthyCounter=? where user_id=1',
                [num_counter + 1],
                (tx, results) => {
                  //alert(""+ results.rowsAffected)
                }
              );
            }
          }
        );
        tx.executeSql(
          "SELECT * FROM table_calandar WHERE resetDate=?",
          [getCurrentDate()],
          function (tx, res) {
            // console.log(res.rows.item(0));
            if (res.rows.length === 0) {
              tx.executeSql(
                'insert into table_calandar (resetDate, followCounter, unFollowCounter) VALUES(?,?,?)',
                [getCurrentDate(), 1, 0],
                (tx, results) => {
                  //alert(""+ results.rowsAffected)
                }
              );
            } else {
              tx.executeSql(
                'UPDATE table_calandar set followCounter=followCounter+1 WHERE resetDate=?',
                [getCurrentDate()],
                (tx, results) => {
                  //alert(""+ results.rowsAffected)
                }
              );
            }
          }
        );
      });
    }
  };

  const _onPressUnFollow = () => {
    setNumCounter(num_counter - 1);
    if (num_counter === 11 || num_counter === 21 || num_counter === 31 || num_counter === 41) {
      alert("ランダムメッセージ");
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_user",
        [],
        function (tx, res) {
          // console.log(res.rows.item(0));
          if (res.rows.length === 0) {
            tx.executeSql(
              'insert into table_user (healthyCounter) VALUES(?)',
              [num_counter - 1],
              (tx, results) => {
                //alert(""+ results.rowsAffected)
              }
            );
          } else {
            tx.executeSql(
              'UPDATE table_user set healthyCounter=? where user_id=1',
              [num_counter - 1],
              (tx, results) => {
                //alert(""+ results.rowsAffected)
              }
            );
          }
        }
      );
      tx.executeSql(
        "SELECT * FROM table_calandar WHERE resetDate=?",
        [getCurrentDate()],
        function (tx, res) {
          // console.log(res.rows.item(0));
          if (res.rows.length === 0) {
            tx.executeSql(
              'insert into table_calandar (resetDate, followCounter, unFollowCounter) VALUES(?,?,?)',
              [getCurrentDate(), 0, 1],
              (tx, results) => {
                //alert(""+ results.rowsAffected)
              }
            );
          } else {
            tx.executeSql(
              'UPDATE table_calandar set unFollowCounter=unFollowCounter+1 WHERE resetDate=?',
              [getCurrentDate()],
              (tx, results) => {
                //alert(""+ results.rowsAffected)
              }
            );
          }
        }
      );
    });
  };

  const _onPressCounter = () => {

  };

  const getCurrentDate = () => {
    var date = moment().format("YYYY-MM-DD");
    return date;
  };

  const initCounter = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_user",
        [],
        function (tx, res) {
          // console.log(res.rows.item(0));
          if (res.rows.length === 0) {
            tx.executeSql(
              'insert into table_user (healthyCounter) VALUES(?)',
              [0],
              (tx, results) => {
                //alert(""+ results.rowsAffected)
              }
            );
          } else {
            tx.executeSql(
              'UPDATE table_user set healthyCounter=? where user_id=1',
              [0],
              (tx, results) => {
                //alert(""+ results.rowsAffected)
              }
            );
          }
        }
      );
    });
  };

  return (
    <View style={viewStyle.containerView}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
            <View style={viewStyle.headerView}>
              <Animatable.Text animation="bounceInDown" duration={5000} style={viewStyle.textTitleStyle} >Healty Counter</Animatable.Text>
                <TouchableOpacity onPress={() => _onPressCounter()}>
                  <ImageBackground source={HealthyIcon} resizeMode="contain" style={viewStyle.imageStyleHealthy}>
                    <Animatable.Text animation="swing" duration={5000} iterationCount="infinite" style={viewStyle.textTitleStyle1}>{num_counter}</Animatable.Text>
                  </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={viewStyle.headerView2}>
              <TouchableOpacity onPress={() => _onPressFollow()}>
                <Animatable.Image animation="tada" duration={2000}  easing="ease-out" iterationCount="infinite" source={FollowIcon} style={viewStyle.imageStyle}>
                  {/* <Image source={FollowIcon} style={viewStyle.imageStyle} /> */}
                </Animatable.Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _onPressUnFollow()}>
                <Animatable.Image source={UnFollowIcon} style={viewStyle.imageStyle1}>
                </Animatable.Image>
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
    fontFamily: 'Roboto',
    fontSize: 26,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 20,
  },
  textTitleStyle1: {
    fontFamily: 'Roboto',
    fontSize: 42,
    color: 'rgba(0,0,0,0.7)',
    marginLeft: -15,
    marginBottom: 40,
  },
});
