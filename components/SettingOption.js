import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import ChooseTrainingMaxes from './ChooseTrainingMaxes';
import ChooseGoals from './ChooseGoals';
import ChooseWorkouts from './ChooseWorkouts';
import ChooseRestTimer from './ChooseRestTimer';

export class SettingOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isCollapsed: true};
    }

    changeCollapsedState = () => {
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.container} onPress={this.changeCollapsedState}>
                    <View style={styles.tab}>
                        <Text style={styles.optionText}>
                            {this.props.option}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={this.state.isCollapsed}>
                    {this.props.option == 'Automatic Rest Timer' && <ChooseRestTimer />}
                    {this.props.option == 'Training Maxes' && <ChooseTrainingMaxes />}
                    {this.props.option == 'Goals' && <ChooseGoals />}
                    {this.props.option == 'Workouts' && <ChooseWorkouts />}
                    {this.props.option == 'Contact Us' && <Text>Contact Us</Text>}
                </Collapsible>
            </View>
        );
    }    

}

const styles = StyleSheet.create({
    container: {

    },
    tab: {
      backgroundColor: '#7D00DF',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: 10,
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 15,
      paddingBottom: 15,
      shadowOffset: {width: 2, height: 2},
      shadowColor: 'purple',
      shadowOpacity: 0.4,
      borderRadius: 4
    },
    optionText: {
        color: '#DDA600',
        fontSize: 15,
        marginRight: 'auto'
      }
});
