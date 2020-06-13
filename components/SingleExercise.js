import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SetRow } from './SetRow';

export class SingleExercise extends React.Component {

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

    addSet = () => {
        this.setState({exerciseData: [...this.state.exerciseData, {reps: '', weight: ''}]});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.exerciseName}>
                    {this.props.exercise}
                </Text>
                <View>
                    <View style={styles.rowHeader}>
                        <Text style={styles.columnHeader}>Set</Text>
                        <Text style={styles.columnHeader}>Reps</Text>
                        <Text style={styles.columnHeader}>Weight</Text>
                        <Text style={styles.columnHeader}>Done?</Text>
                    </View>
                    {
                        this.state.exerciseData.map((set, i) => {
                            return (
                                <SetRow 
                                    exercise={this.props.exercise} 
                                    set={set}
                                    index={i}
                                    key={`${this.props.exercise}${set}${i}`}
                                    toggleTimer={this.props.toggleTimer}
                                    completedSet={this.completedSet} 
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
