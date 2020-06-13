import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import WorkoutModal from './WorkoutModal';

export default class ChooseWorkouts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isModalVisible: false, dayOfWeek: '', intOfWeek: null};
        let exampleMonday = [
            {
                exerciseName: 'squat',
                sets: [
                    {reps: 5, maxPct: 75},
                    {reps: 5, maxPct: 95}
                ]
            },
            {
                exerciseName: 'dl',
                sets: [
                    {reps: 5, maxPct: 75},
                    {reps: 5, maxPct: 85}
                ]
            }
        ];
    }

    render() {
        const weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const btnList = weekArr.map((day, i) => {
            return (
                <TouchableOpacity 
                    style={styles.dailyButton}
                    onPress={() => this.setState({isModalVisible: true, dayOfWeek: day, intOfWeek: i})}
                    key={day}
                    >
                    <Text>
                        {day}
                    </Text>
                </TouchableOpacity>
            );
        });
        return (
            <View style={styles.container}>
                <Modal style={styles.modal} isVisible={this.state.isModalVisible}>
                    <WorkoutModal 
                        hideModal={() => this.setState({isModalVisible: false}) } 
                        dayOfWeek={this.state.dayOfWeek}
                        intOfWeek={this.state.intOfWeek}
                        />
                </Modal>
                {btnList}
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container: {

    },
    dailyButton: {
        backgroundColor: '#E3DEDE',
        padding: 10,
        margin: 5,
        borderRadius: 4
    },
    modal: {
        backgroundColor: '#C8C8C8',
        borderRadius: 8,
        padding: 10
    }
});
