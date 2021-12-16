/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import ModalView from './ModalVIew';
import BackgroundImage from '../../assets/images/bgThumb.png';
import { Calendar, CalendarList } from 'react-native-calendars';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

var db = openDatabase({ name: 'HealthyCounter.db'});

const CalandarView = ({navigation}) => {
    const [markedDatesList, setMarkedDateList] = useState({});
    const [currentDate, setCurrentDate] = useState('');
    const [show, setShow] = useState(false);

    const [tapDate, setTapDate] = useState('');
    const [follow, setFollow] = useState(0);
    const [unfollow, setUnFollow] = useState(0);
    const [f0, setF0] = useState(0);
    const [f1, setF1] = useState(0);
    const [f2, setF2] = useState(0);
    const [f3, setF3] = useState(0);
    const [f4, setF4] = useState(0);
    const [f5, setF5] = useState(0);
    const [f6, setF6] = useState(0);
    const [f7, setF7] = useState(0);

    const [totalfollow, settotalFollow] = useState(0);
    const [totalunfollow, settotalUnFollow] = useState(0);
    const [totalf0, settotalF0] = useState(0);
    const [totalf1, settotalF1] = useState(0);
    const [totalf2, settotalF2] = useState(0);
    const [totalf3, settotalF3] = useState(0);
    const [totalf4, settotalF4] = useState(0);
    const [totalf5, settotalF5] = useState(0);
    const [totalf6, settotalF6] = useState(0);
    const [totalf7, settotalF7] = useState(0);

    const [isShow, setIsShow] = useState(false);

    useFocusEffect(
      React.useCallback(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_setting',
            [],
            (tx, results) => {
              if (results.rows.length === 0)
                setIsShow(false);
              else
                setIsShow(results.rows.item(0).isOne === 1 ? true:false);
            }
          );
        });
      },[])
    );
    useEffect(() => {
      getCurrentDate();
      _initFunc();
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_calandar',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i).resetDate);

            setMarkedDateList(temp);
          }
        );
        tx.executeSql(
          'SELECT * FROM table_setting',
          [],
          (tx, results) => {
            if (results.rows.length === 0)
              setIsShow(false);
            else
              setIsShow(results.rows.item(0).isOne === 1 ? true:false);
          }
        );
      });
    }, [navigation]);

    const marked = {};
    marked[currentDate] =  {startingDay: true, endingDay: true, color: 'orange', textColor: 'white'};

    if (markedDatesList.length > 0)
        markedDatesList.forEach((day) => {
            marked[day] = {startingDay: true, endingDay: true, color: 'orange', textColor: 'white'};
        });

    const _initFunc = () => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT sum(followCounter) as fc, sum(unFollowCounter) as ufc FROM table_calandar WHERE resetDate LIKE '` + getCurrentMonth() + `%'`,
          [],
          (tx, results) => {
            if (results.rows.length === 0) {
              settotalFollow(0);
              settotalUnFollow(0);
            } else {
              if (results.rows.item(0).fc === null)
                settotalFollow(0);
              else
                settotalFollow(results.rows.item(0).fc);
              if (results.rows.item(0).ufc === null)
                settotalUnFollow(0)
              else settotalUnFollow(results.rows.item(0).ufc);
            }
            tx.executeSql(
              `SELECT sum(followMeal0) as f0, sum(unfollowMeal0) as uf0, sum(followMeal1) as f1, sum(unfollowMeal1) as uf1,
              sum(followMeal2) as f2, sum(unfollowMeal2) as uf2, sum(followMeal3) as f3, sum(unfollowMeal3) as uf3,
              sum(followMeal4) as f4, sum(unfollowMeal4) as uf4, sum(followMeal5) as f5, sum(unfollowMeal5) as uf5,
              sum(followMeal6) as f6, sum(unfollowMeal6) as uf6, sum(followMeal7) as f7, sum(unfollowMeal7) as uf7
              FROM table_meal WHERE resetDate LIKE '` + getCurrentMonth() + `%'`,
            [],
            (tx, results) => {
              if (results.rows.length > 0) {
                settotalF0(results.rows.item(0).f0 - results.rows.item(0).uf0);
                settotalF1(results.rows.item(0).f1 - results.rows.item(0).uf1);
                settotalF2(results.rows.item(0).f2 - results.rows.item(0).uf2);
                settotalF3(results.rows.item(0).f3 - results.rows.item(0).uf3);
                settotalF4(results.rows.item(0).f4 - results.rows.item(0).uf4);
                settotalF5(results.rows.item(0).f5 - results.rows.item(0).uf5);
                settotalF6(results.rows.item(0).f6 - results.rows.item(0).uf6);
                settotalF7(results.rows.item(0).f7 - results.rows.item(0).uf7);
              }
            }
          );
          }
        );
      });
    };

    const _onPressDay = (day) => {
        let selectedDate = day.dateString;
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM table_calandar WHERE resetDate=?',
              [selectedDate],
              (tx, results) => {
                if (results.rows.length > 0) {
                  setFollow(results.rows.item(0).followCounter);
                  setUnFollow(results.rows.item(0).unFollowCounter);
                  setTapDate(selectedDate);
                } else {
                  setFollow(0);
                  setUnFollow(0);
                  setTapDate(selectedDate);
                }
                tx.executeSql(
                  "SELECT * FROM table_meal WHERE resetDate=?",
                  [selectedDate],
                  function (tx, results) {
                    if (results.rows.length > 0) {
                      setF0(results.rows.item(0).followMeal0 - results.rows.item(0).unfollowMeal0);
                      setF1(results.rows.item(0).followMeal1 - results.rows.item(0).unfollowMeal1);
                      setF2(results.rows.item(0).followMeal2 - results.rows.item(0).unfollowMeal2);
                      setF3(results.rows.item(0).followMeal3 - results.rows.item(0).unfollowMeal3);
                      setF4(results.rows.item(0).followMeal4 - results.rows.item(0).unfollowMeal4);
                      setF5(results.rows.item(0).followMeal5 - results.rows.item(0).unfollowMeal5);
                      setF6(results.rows.item(0).followMeal6 - results.rows.item(0).unfollowMeal6);
                      setF7(results.rows.item(0).followMeal7 - results.rows.item(0).unfollowMeal7);
                    } else {
                      setF0(0);
                      setF1(0);
                      setF2(0);
                      setF3(0);
                      setF4(0);
                      setF5(0);
                      setF6(0);
                      setF7(0);
                    }
                    setShow(true);
                  }
                );
              }
            );
          });
    };

    const getCurrentDate = () => {
        var date = moment().format("YYYY-MM-DD");
        setCurrentDate(date);
    };

    const getCurrentMonth = () => {
      var date = moment().format("YYYY-MM");
      return date;
    };

    return (
        <View style={viewStyle.containerView}>
          <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
              <Calendar
                  onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                  onDayPress={(day) => { _onPressDay(day)}}
                  // Handler which gets executed on day long press. Default = undefined
                  onDayLongPress={(day) => {console.log('selected day', day)}}
                  theme={{
                      backgroundColor: '#A8D4CD',
                      calendarBackground: '#A8D4CD',
                      textSectionTitleColor: 'white',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#00adf5',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: 'red',
                      todayColor: 'green',
                      dayTextColor: 'white',
                      textDisabledColor: '#d9e1e8',
                      dotColor: '#00adf5',
                      arrowColor: 'white',
                      selectedDotColor: '#ffffff',
                      monthTextColor: 'white',
                      indicatorColor: 'green',
                      textDayFontFamily: 'monospace',
                      textMonthFontFamily: 'monospace',
                      textDayHeaderFontFamily: 'monospace',
                      textDayFontWeight: '300',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: '300',
                      textDayFontSize: 16,
                      textMonthFontSize: 20,
                      textDayHeaderFontSize: 16,
                      'stylesheet.calendar.header': {
                          dayTextAtIndex0: {
                          color: 'red',
                          },
                          dayTextAtIndex6: {
                          color: 'blue',
                          },
                      },
                  }}
                  markingType={'period'}
                  markedDates={marked}
              />
              {isShow && (
                <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20,}}>
                <View style={viewStyle.mealView}>
                  <Text allowFontScaling={false} style={viewStyle.textView1}>Healthy: {totalfollow}</Text>
                  <Text allowFontScaling={false} style={viewStyle.textView1}>OMG: {totalunfollow}</Text>
                </View>
                <View style={viewStyle.mealView}>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>ま: {totalf0}</Text>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>ご: {totalf1}</Text>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>わ: {totalf2}</Text>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>や: {totalf3}</Text>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>さ: {totalf4}</Text>
                </View>
                <View style={viewStyle.mealView}>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>し: {totalf5}</Text>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>い: {totalf6}</Text>
                    <Text allowFontScaling={false} style={viewStyle.textView2}>こ: {totalf7}</Text>
                </View>
              </View>
              )}
          </ImageBackground>
          <ModalView show={show} date={tapDate} follow={follow} unfollow={unfollow} f0={f0} f1={f1} f2={f2} f3={f3} f4={f4} f5={f5} f6={f6} f7={f7}
              onRequestClose={()=>{
                setShow(false);
              }}
              onPressOverlay={()=>{
                setShow(false);
              }}/>
        </View>
        );
    };

export default CalandarView;

const viewStyle = StyleSheet.create({
  containerView: {
    flex: 1,
    //justifyContent: 'center',
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
  mealView: {
    width: Dimensions.get('window').width - 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginRight: 10,
  },
  textView1: {
    fontSize: 16,
    color: 'white',
  },
  textView2: {
    fontSize: 16,
    marginRight: 10,
    color: 'white',
  },
});
