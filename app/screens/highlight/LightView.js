/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, Image, ImageBackground, StyleSheet, FlatList, Pressable} from 'react-native';
import { Helper } from '../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../assets/images/bgThumb.png';
import LightTitleImage from '../../assets/images/light-title.png';
import LightItemView from './LightItemView';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'HealthyCounter.db'});

const LightView = ({navigation}) => {
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

  const onPressLightItem = (position) => {
    setNumCounter(num_counter + 1);

    if (num_counter === 9 || num_counter === 19 || num_counter === 29 || num_counter === 39) {
      alert("ランダムメッセージ");
    }
    if (num_counter > 44) {
      initCounter();
      setNumCounter(0);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM table_user",
          [],
          function (tx, res) {
            // console.log(res.rows.item(0));
            if (res.rows.length == 0) {
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
        )
      });
    }
  };

  const onLongPressLiteItem = (position) => {
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
          if (res.rows.length == 0) {
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
    });
  };

  const initCounter = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_user",
        [],
        function (tx, res) {
          // console.log(res.rows.item(0));
          if (res.rows.length == 0) {
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
