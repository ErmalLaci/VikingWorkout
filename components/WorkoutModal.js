import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, ScrollView } from 'react-native';
import ExerciseInModal from './ExerciseInModal';

export default class WorkoutModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isModalVisible: false, newExerciseName: '', workoutData: []};
    }

    async componentDidMount() {
        const key = `@Day${this.props.intOfWeek}Workout`;
        try {
            this.setState(
                {workoutData: (JSON.parse(await AsyncStorage.getItem(key)) || [])}
            );
        } catch (err) {
            console.log(err);
        }
    }

    storeWorkout = (exerciseName, exerciseData) => {
        let newWorkoutData = this.state.workoutData.map((exercise) => {
            return exerciseName === exercise.exerciseName ? {exerciseName: exerciseName, sets: exerciseData} : exercise;
        });

        this.setState({workoutData: newWorkoutData});
    }

    saveWorkout = async () => {
        let key = `@Day${this.props.intOfWeek}Workout`;
        console.log(key);
        console.log(JSON.stringify(this.state.workoutData));
        try {
            await AsyncStorage.setItem(key, JSON.stringify(this.state.workoutData));
        } catch (err) {
            console.log(err);
        }
        this.props.hideModal();
    }

    //TODO: Handle repeated exercise names
    addExercise = () => {
        this.setState({workoutData: [
            ...this.state.workoutData, 
            {
                exerciseName: this.state.newExerciseName,
                sets: [{reps: '', maxPct: ''}]
            }
        ],
        newExerciseName: ''
        });
    }

    removeExercise = (exerciseName) => {
        const newWorkoutData = this.state.workoutData.filter((exercise, i) => exerciseName !== exercise.exerciseName);
        this.setState({workoutData: newWorkoutData});
    }

    render() {
        const rows = this.state.workoutData.map((exercise, i) => {
            return <ExerciseInModal 
                        exercise={exercise.exerciseName} 
                        sets={exercise.sets} 
                        index={i} 
                        key={`${exercise.exerciseName}${i}`}
                        storeWorkout={this.storeWorkout}
                        removeExercise={this.removeExercise}
                        />
        });
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topBar}>
                    <Button 
                        style={{}} 
                        title={'Submit ' + this.props.dayOfWeek} 
                        onPress={this.saveWorkout} 
                        />
                    <Button
                        style={{marginLeft: 'auto'}}
                        title='Close'
                        onPress={this.props.hideModal}
                        />
                    
                </View>
                
                <TextInput
                    style={{padding: 10}}
                    placeholder='New Exercise Name'
                    placeholderTextColor='#000'
                    onChangeText={(newExerciseName) => this.setState({newExerciseName})}
                    value={this.state.newExerciseName}
                    />
                <Button 
                    style={{}} 
                    title={'Add Exercise'} 
                    onPress={this.addExercise} 
                    />
                {rows}
            </ScrollView>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBar: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'space-between'
    }
});
