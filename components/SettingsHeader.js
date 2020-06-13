import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export class SettingsHeader extends React.Component {

    _onPressBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressBack}>
                    <MaterialIcons 
                        name='arrow-back'
                        size={40}
                        style={styles.icons} 
                        />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {this.props.name}
                </Text>
            </View>
        );
    }    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7D00DF',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 25,
      paddingRight: 25
    },
    headerText: {
      color: '#DDA600',
      fontSize: 20,
      marginRight: 'auto'
    },
    icons: {
        marginRight: 30
    }
});
