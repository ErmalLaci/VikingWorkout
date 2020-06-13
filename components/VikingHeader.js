import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export class VikingHeader extends React.Component {

    _onPressCalendar = () => {
        this.props.navigation.navigate('Calendar');
    }

    _onPressSettings = () => {
        this.props.navigation.navigate('Settings');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Viking Workout App</Text>
                <TouchableOpacity onPress={this._onPressCalendar}>
                    <MaterialCommunityIcons 
                            name='calendar-range'
                            size={40}
                            style={styles.icons} 
                            />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this._onPressSettings}>
                    <MaterialIcons 
                            name='settings'
                            size={40}
                            style={styles.icons} 
                            />
                </TouchableOpacity>
            </View>
        );
    }
    
    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7D00DF',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 25,
      paddingRight: 25,
      shadowOffset: {width: 0, height: 2},
      shadowColor: 'purple',
      shadowOpacity: 0.4
    },
    headerText: {
      color: '#DDA600',
      fontSize: 20,
      marginRight: 'auto'
    },
    icons: {
        marginLeft: 25
    }
});
