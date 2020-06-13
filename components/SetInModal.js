import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, ScrollView } from 'react-native';

export default class SetInModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reps: this.props.set.reps.toString(), maxPct: this.props.set.maxPct.toString()};
    }
    
    completedSet = async () => {
        this.props.completedSet({reps: this.state.reps, maxPct: this.state.maxPct}, this.props.index);
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
                        onChangeText={(maxPct) => this.setState({maxPct})}
                        value={this.state.maxPct ? this.state.maxPct : ''}
                        />
                </View>
                <View style={[styles.setColumn, {padding: 2, flexDirection: 'column'}]}>
                    <Button
                        title={'oo'}
                        onPress={this.completedSet}
                        />
                    <Button
                        title={'----'}
                        onPress={() => this.props.removeSet(this.props.index)}
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

