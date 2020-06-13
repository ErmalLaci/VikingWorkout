import React, { API } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { VikingHeader } from '../components/VikingHeader';
import { DisplayTrainingMaxes } from '../components/DisplayTrainingMaxes';
import { DailyTracker } from '../components/DailyTracker';
import { DailyWorkout } from '../components/DailyWorkout';

function FetchRefreshData({onRefresh}) {
  useFocusEffect(
    React.useCallback(() => {
      const x = onRefresh();
    }, [onRefresh])
  );
  return null;
}

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.tms = React.createRef();
    this.waterTracker = React.createRef();
    this.calorieTracker = React.createRef();
    this.workout = React.createRef();
  }

  _refresh = () => {
    this.tms.current.refresh();
    this.waterTracker.current.refresh();
    this.calorieTracker.current.refresh();
    this.workout.current.refresh();
  }

  render() {
    return (
      <View style={styles.container}>
        <FetchRefreshData onRefresh={this._refresh}/>
        <VikingHeader navigation={this.props.navigation}/>
        <View style={styles.body}>
          <ScrollView>
            <DisplayTrainingMaxes ref={this.tms} />
            <DailyTracker ref={this.waterTracker} trackItem='Water' />
            <DailyTracker ref={this.calorieTracker} trackItem='Calories' />
            <DailyWorkout ref={this.workout} />
          </ScrollView>
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 9
  }
});
