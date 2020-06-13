import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export class SetRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseDone: this.props.set.done, 
            reps: this.props.set.reps ? this.props.set.reps.toString() : '', 
            weight: this.props.set.weight ? this.props.set.weight.toString(): ''
        };
    }

    completedSet = async () => {
        let exerciseDone = !this.state.exerciseDone;
        if (exerciseDone) {
            this.props.toggleTimer();
        }
        this.props.completedSet({reps: this.state.reps, weight: this.state.weight, done: exerciseDone}, this.props.index);
        this.setState({exerciseDone: exerciseDone});
    }

    render() {
        return (
            <View style={styles.setRow}>
                <Text style={styles.setColumn}>Set {this.props.index + 1}</Text>
                <View style={styles.setColumn}>
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='0'
                        onChangeText={(reps) => this.setState({reps})}
                        value={this.state.reps ? this.state.reps : ''}
                        />
                </View>
                
                <View style={styles.setColumn}>
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='0'
                        onChangeText={(weight) => this.setState({weight})}
                        value={this.state.weight ? this.state.weight : ''}
                        />
                </View>
                
                <View style={[styles.setColumn, {padding: 2}]}>
                    <Button
                        style={{backgroundColor: '#7D00DF'}}
                        title={this.state.exerciseDone ? 'Done' : '----'}
                        onPress={this.completedSet}
                        />
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
        fontSize: 20
    },
    setRow: {
        flexDirection: 'row'
    },
    setColumn: {
        flex: 1,
        marginRight: 15
    },
    columnHeader: {
        fontSize: 16,
        borderBottomWidth: 0.2
    }
});
