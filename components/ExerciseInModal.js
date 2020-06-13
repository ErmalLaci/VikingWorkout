import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SetInModal from './SetInModal';

export default class ExerciseInModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {exerciseData: this.props.sets};
    }

    completedSet = (set, index) => {
        let exerciseData = this.state.exerciseData.map((oldSet, i) => {
            return index === i ? set : oldSet;
        });
        this.setState({exerciseData});
        this.props.storeWorkout(this.props.exercise, exerciseData);
    }

    removeSet = (index) => {
        const exerciseData = this.state.exerciseData.filter((set, i) => index !== i);
        this.setState({exerciseData});
        this.props.storeWorkout(this.props.exercise, exerciseData);
    }

    addSet = () => {
        this.setState({exerciseData: [...this.state.exerciseData, {reps: '', maxPct: ''}]});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.exerciseName}>
                    {this.props.exercise}
                </Text>
                <Button
                    title={'Remove Exercise'}
                    onPress={() => this.props.removeExercise(this.props.exercise)}
                    />
                <View>
                    <View style={styles.rowHeader}>
                        <Text style={styles.columnHeader}>Set</Text>
                        <Text style={styles.columnHeader}>Reps</Text>
                        <Text style={styles.columnHeader}>% of Max</Text>
                        <Text style={styles.columnHeader}></Text>
                    </View>
                    {
                        this.state.exerciseData.map((set, i) => {
                            return (
                                <SetInModal 
                                    exercise={this.props.exercise} 
                                    set={set}
                                    index={i}
                                    key={`${this.props.exercise}${set}${i}`}
                                    completedSet={this.completedSet}
                                    removeSet={this.removeSet}
                                    />
                            );
                        })
                    }
                    <View>
                        <Button
                            style={{backgroundColor: '#7D00DF'}}
                            title={'+ Add Set +'}
                            onPress={this.addSet}
                            />
                    </View>
                </View>
            </View>
        );
    }    

}

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    exerciseName: {
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        padding: 5
    },
    rowHeader: {
        flexDirection: 'row'
    },
    columnHeader: {
        flex: 1,
        marginRight: 15,
        fontSize: 16,
        borderBottomWidth: 0.2
    }
});
