import React from 'react';
import { StyleSheet, View, ScrollView, Button, AsyncStorage, TextInput } from 'react-native';
import { SingleExercise } from './SingleExercise';

export class WorkoutDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state ={todayString: '', newExerciseName: '', workoutData: [], dlMax: 0, bpMax: 0, ohpMax: 0, squatMax: 0, rowMax: 0};
    }

    loadTrainingMaxes = async () => {
        let keys = ['@dlMax', '@squatMax', '@bpMax', '@ohpMax', '@rowMax'];
        return AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                switch (store[i][0]) {    //store[i][0] is the key in the store
                    case '@dlMax':
                        this.setState({dlMax: JSON.parse(store[i][1])});
                    case '@squatMax':
                        this.setState({squatMax: JSON.parse(store[i][1])});
                    case '@bpMax':
                        this.setState({bpMax: JSON.parse(store[i][1])});
                    case '@ohpMax':
                        this.setState({ohpMax: JSON.parse(store[i][1])});
                    case '@rowMax':
                        this.setState({rowMax: JSON.parse(store[i][1])});
                }
            });
        });
    }

    getWeightFromMaxPct = async (workoutData) => {
        const keys = ['@dlMax', '@squatMax', '@bpMax', '@ohpMax', '@rowMax'];
        let maxes = new Array(5);
        let nowWorkoutData;
        return Promise.resolve(AsyncStorage.multiGet(keys, (err, stores) => {
            maxes = stores.map((result) => result[1])
        })
        .then(() => {
            console.log('maxes ' + maxes);
            return maxes;
        }))

        return Promise.all(workoutData.map(async (exercise) => {
            if (['dl', 'squat', 'bp', 'ohp', 'row'].includes(exercise.exerciseName.toLowerCase())){
                console.log('try');
                return {
                    exerciseName: exercise.exerciseName.toUpperCase(),
                    sets: await AsyncStorage.getItem(`@${exercise.exerciseName.toLowerCase()}Max`).then(
                            data => {
                                exercise.sets.map((set) =>
                                    data ? set.weight = (Number(set.maxPct) / 100) * Number(JSON.parse(data)) : 0
                                )
                            }
                    )
                }
            } else {
                return {
                    exerciseName: exercise.exerciseName,
                    sets: exercise.sets
                }
            }
        }));

    }

    refresh = async () => {
        const today = new Date();
        const todayString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        this.setState({todayString});
        const keys = [`@${todayString}Workout`, `@Day${today.getDay()}Workout`];
        console.log(JSON.stringify(keys));
        AsyncStorage.multiGet(keys, (err, stores) => {
            for (let store of stores) {
                if (store[1] && JSON.parse(store[1]).length) {
                    console.log('start ' + store[1]);
                    console.log('got weight ' + JSON.stringify(this.getWeightFromMaxPct(JSON.parse(store[1]))));
                    this.setState({
                        workoutData: store[0].includes('@Day') ? [] : JSON.parse(store[1])
                    });
                    break;
                }
            }
        });
    }

    async componentDidMount() {
        this.refresh();
    }


    storeWorkout = (exerciseName, exerciseData) => {
        let newWorkoutData = this.state.workoutData.map((exercise) => {
            return exerciseName === exercise.exerciseName ? {exerciseName: exerciseName, sets: exerciseData} : exercise;
        });

        this.setState({workoutData: newWorkoutData});
    }

    saveWorkout = async () => {
        let key = `@${this.state.todayString}Workout`;
        try {
            await AsyncStorage.setItem(key, JSON.stringify(this.state.workoutData));
        } catch (err) {
            console.log(err);
        }
    }

    addExercise = () => {
        let newWorkoutData = [...this.state.workoutData, {exerciseName: this.state.newExerciseName, sets: [{reps: '', weight: ''}]}]
        this.setState({
            workoutData: newWorkoutData,
            newExerciseName: ''
        });
        this.saveWorkout();
    }

    render() {
        console.log('rerender workoutdisplay');
        const workoutData = (this.state.workoutData.map((exercise, i) => {
            return <SingleExercise 
                        exercise={exercise.exerciseName} 
                        sets={exercise.sets} 
                        index={i} 
                        key={`${exercise}${i}`}
                        toggleTimer={this.props.toggleTimer}
                        storeWorkout={this.storeWorkout}
                        />
        }));
        return (
            <View style={styles.container}>
                <Button
                    title='Update Workout'
                    onPress={this.addExercise}
                    />
                <View>
                    <TextInput
                        style={{padding: 10}}
                        placeholder='New Exercise Name'
                        onChangeText={(newExerciseName) => this.setState({newExerciseName})}
                        value={this.state.newExerciseName}
                        />
                    <Button
                        style={styles.finishWorkoutBtn}
                        title='Add Exercise'
                        onPress={this.addExercise}
                        />
                </View>
                <ScrollView style={styles.exerciseContainer}>
                    {workoutData}
                    <Button
                        style={styles.finishWorkoutBtn}
                        title='Save Workout'
                        onPress={this.saveWorkout}
                        />
                </ScrollView>
            </View>
        );
    }    

}

const styles = StyleSheet.create({
    container: {

    },
    sets: {

    },
    finishWorkoutBtn: {
        backgroundColor: '#7D00DF'
    }
});
