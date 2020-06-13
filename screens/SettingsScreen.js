import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SettingsHeader } from '../components/SettingsHeader';
import { SettingOption } from '../components/SettingOption';

export default class SettingsScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <SettingsHeader navigation={this.props.navigation} name='Settings' />
                <View style={styles.body}>
                    <ScrollView>
                        <SettingOption option='Automatic Rest Timer' />
                        <SettingOption option='Training Maxes' />
                        <SettingOption option='Goals' />
                        <SettingOption option='Workouts' />
                        <SettingOption option='Contact Us' />
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
        flex: 9,
        padding: 20
    }
});