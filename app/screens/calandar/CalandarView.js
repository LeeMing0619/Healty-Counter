/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import BackgroundImage from '../../assets/images/bgThumb.png';
import { CalendarList } from 'react-native-calendars';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'HealthyCounter.db'});

const CalandarView = ({navigation}) => {
    const [markedDatesList, setMarkedDateList] = useState({});

    useEffect(() => {
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
    markedDatesList.forEach((day) => {
        marked[day] = {startingDay: true, endingDay: true, color: '#50cebb', textColor: 'white'};
    });

    return (
        <View style={viewStyle.containerView}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={viewStyle.containerView}>
                <CalendarList
                    onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    pastScrollRange={50}
                    futureScrollRange={50}
                    scrollEnabled={true}
                    showScrollIndicator={true}
                    theme={{
                        backgroundColor: '#A8D4CD',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: 'black',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: 'red',
                        todayColor: 'green',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        monthTextColor: 'green',
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
