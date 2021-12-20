/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, ImageBackground, StyleSheet, FlatList, Pressable, TouchableOpacity, } from 'react-native';
import { Helper } from '../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../assets/images/bgThumb.png';
import LightTitleImage from '../../assets/images/light-title.png';
import LightItemView from './LightItemView';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';
import { View } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../styles';

var db = openDatabase({ name: 'HealthyCounter.db'});

const LightView = ({navigation}) => {

  const [lightList, setLightList] = useState(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         `SELECT sum(followMeal0) as f0, sum(unfollowMeal0) as uf0, sum(followMeal1) as f1, sum(unfollowMeal1) as uf1,
  //         sum(followMeal2) as f2, sum(unfollowMeal2) as uf2, sum(followMeal3) as f3, sum(unfollowMeal3) as uf3,
  //         sum(followMeal4) as f4, sum(unfollowMeal4) as uf4, sum(followMeal5) as f5, sum(unfollowMeal5) as uf5,
  //         sum(followMeal6) as f6, sum(unfollowMeal6) as uf6, sum(followMeal7) as f7, sum(unfollowMeal7) as uf7
  //         FROM table_meal WHERE resetDate LIKE '` + getCurrentMonth() + `%'`,
  //         [],
  //         (tx, results) => {
  //           if (results.rows.length > 0) {
  //             Helper.LightList[0].value = results.rows.item(0).f0 - results.rows.item(0).uf0;
  //             Helper.LightList[1].value = results.rows.item(0).f1 - results.rows.item(0).uf1;
  //             Helper.LightList[2].value = results.rows.item(0).f2 - results.rows.item(0).uf2;
  //             Helper.LightList[3].value = results.rows.item(0).f3 - results.rows.item(0).uf3;
  //             Helper.LightList[4].value = results.rows.item(0).f4 - results.rows.item(0).uf4;
  //             Helper.LightList[5].value = results.rows.item(0).f5 - results.rows.item(0).uf5;
  //             Helper.LightList[6].value = results.rows.item(0).f6 - results.rows.item(0).uf6;
  //             Helper.LightList[7].value = results.rows.item(0).f7 - results.rows.item(0).uf7;
  //             setLightList(Helper.LightList);
  //           }
  //         }
  //       );
  //     });
  //   }, [])
  // );

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
          `SELECT sum(followMeal0) as f0, sum(unfollowMeal0) as uf0, sum(followMeal1) as f1, sum(unfollowMeal1) as uf1,
          sum(followMeal2) as f2, sum(unfollowMeal2) as uf2, sum(followMeal3) as f3, sum(unfollowMeal3) as uf3,
          sum(followMeal4) as f4, sum(unfollowMeal4) as uf4, sum(followMeal5) as f5, sum(unfollowMeal5) as uf5,
          sum(followMeal6) as f6, sum(unfollowMeal6) as uf6, sum(followMeal7) as f7, sum(unfollowMeal7) as uf7
          FROM table_meal WHERE resetDate LIKE '` + getCurrentMonth() + `%'`,
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            Helper.LightList[0].value = results.rows.item(0).f0 - results.rows.item(0).uf0;
            Helper.LightList[1].value = results.rows.item(0).f1 - results.rows.item(0).uf1;
            Helper.LightList[2].value = results.rows.item(0).f2 - results.rows.item(0).uf2;
            Helper.LightList[3].value = results.rows.item(0).f3 - results.rows.item(0).uf3;
            Helper.LightList[4].value = results.rows.item(0).f4 - results.rows.item(0).uf4;
            Helper.LightList[5].value = results.rows.item(0).f5 - results.rows.item(0).uf5;
            Helper.LightList[6].value = results.rows.item(0).f6 - results.rows.item(0).uf6;
            Helper.LightList[7].value = results.rows.item(0).f7 - results.rows.item(0).uf7;
            setLightList(Helper.LightList);
          }
        }
      );
    });
  }, [lightList]);

  const onPressLightItem = (position) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_meal WHERE resetDate=?",
        [getCurrentDate()],
        function (tx, res) {
          if (res.rows.length === 0) {
            tx.executeSql(
              'insert into table_meal (resetDate, followMeal' + position + ') VALUES(?,?)',
              [getCurrentDate(), 1],
              (tx, results) => {
                var temp = lightList;
                temp[position].value = temp[position].value + 1;
                setLightList([...temp]);
              }
            );
          } else {
            tx.executeSql(
              'UPDATE table_meal set followMeal' +  position + '=followMeal' + position + '+1 WHERE resetDate=?',
              [getCurrentDate()],
              (tx, results) => {
                var temp = lightList;
                temp[position].value = temp[position].value + 1;
                setLightList([...temp]);
                //alert("--update==="+ results.rowsAffected)
              }
            );
          }
        }
      );
    });
  };

  const onLongPressLiteItem = (position) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_meal WHERE resetDate=?",
        [getCurrentDate()],
        function (tx, res) {
          if (res.rows.length === 0) {
            tx.executeSql(
              'insert into table_meal (resetDate, unfollowMeal' + position + ') VALUES(?,?)',
              [getCurrentDate(), 1],
              (tx, results) => {
                var temp = lightList;
                temp[position].value = temp[position].value - 1;
                setLightList([...temp]);
              }
            );
          } else {
            tx.executeSql(
              'UPDATE table_meal set unfollowMeal' +  position + '=unfollowMeal' + position + '+1 WHERE resetDate=?',
              [getCurrentDate()],
              (tx, results) => {
                var temp = lightList;
                temp[position].value = temp[position].value - 1;
                setLightList([...temp]);
              }
            );
          }
        }
      );
    });
  };

  const getCurrentDate = () => {
    var date = moment().format("YYYY-MM-DD");
    return date;
  };

  const getCurrentMonth = () => {
    var date = moment().format("YYYY-MM");
    return date;
  };

  return (
    <SafeAreaView style={viewStyle.container}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
            <Image source={LightTitleImage} style={viewStyle.textTitleStyle}/>
            <Pressable style={{flex: 1}}>
              <FlatList
                  data={lightList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                  return (
                      <LightItemView params={item} onClick={() => onPressLightItem(index)} onLongPress={() => onLongPressLiteItem(index)}/>
                  );
                  }}
                  numColumns={2}
              />
              {/* <View style={viewStyle.listView}>
                <TouchableOpacity onPress={() => onPressLightItem(0)} onLongPress={() => onLongPressLiteItem(0)}>
                  <Animatable.View animation='slideInLeft' duration={1000} delay={100} style={viewStyle.containerView}>
                    <ImageBackground source={lightList && lightList[0]?.image} resizeMode="contain" style={viewStyle.imageStyle}>
                        <Animatable.Text animation="rubberBand" iterationCount="infinite" duration={3000} style={viewStyle.textStyle}>{lightList && lightList[0].value}</Animatable.Text>
                    </ImageBackground>
                  </Animatable.View>
                </TouchableOpacity>
              </View> */}
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
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  textTitleStyle: {
    fontFamily: 'Roboto',
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
  imageStyle: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 2 - 40,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 22,
    letterSpacing: -0.24,
    fontWeight: 'normal',
    color: Colors.BLACK,
  },
});
