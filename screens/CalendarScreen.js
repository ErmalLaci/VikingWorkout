import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';

export default class CalendarScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SettingsHeader navigation={this.props.navigation} name='Calendar' />
                <View style={{flex: 9}}>
                    <Text>CalendarScreen</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
});