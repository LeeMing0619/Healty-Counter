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

    useEffect(() => {
        getCurrentDate();
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
        });
      }, [navigation]);

    const marked = {};
    marked[currentDate] =  {startingDay: true, endingDay: true, color: 'orange', textColor: 'white'};

    if (markedDatesList.length > 0)
        markedDatesList.forEach((day) => {
            marked[day] = {startingDay: true, endingDay: true, color: 'orange', textColor: 'white'};
        });

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
    fontSize: 26,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: 20,
  },
  textTitleStyle1: {
    fontSize: 42,
    color: 'rgba(0,0,0,0.7)',
    marginLeft: -15,
    marginBottom: 40,
  },
});
