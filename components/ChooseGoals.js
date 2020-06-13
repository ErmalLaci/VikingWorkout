import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

export default class ChooseGoals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {waterGoal: '', caloriesGoal: ''};
    }

    updateGoals = async () => {
        const goalStorePairs = [
            ["@WaterGoal", JSON.stringify(this.state.waterGoal)],
            ["@CaloriesGoal", JSON.stringify(this.state.caloriesGoal)]
        ];

        AsyncStorage.multiSet(goalStorePairs);
    }

    componentDidMount() {
        let keys = ['@WaterGoal', '@CaloriesGoal',];
        return AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result) => {
                if (JSON.parse(result[1])) {
                    switch (result[0]) {    //result[0] is the key in the store
                        case '@WaterGoal':
                            this.setState({waterGoal: JSON.parse(result[1])});
                        case '@CaloriesGoal':
                            this.setState({caloriesGoal:  JSON.parse(result[1])});
                    }
                }
            });
          });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.goals}>
                    <Text style={styles.goalLabel}>Calories Goal</Text>
                    <TextInput 
                        style={styles.goalInput}
                        placeholder='0'
                        value={this.state.caloriesGoal}
                        onChangeText={(text) => this.setState({caloriesGoal: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.goals}>
                    <Text style={styles.goalLabel}>Water Goal</Text>
                    <TextInput
                        style={styles.goalInput}
                        placeholder='0'
                        value={this.state.waterGoal}
                        onChangeText={(text) => this.setState({waterGoal: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.btnContainer}>
                    <Button 
                        onPress={this.updateGoals}
                        style={styles.updateBtn}
                        title='Update Goals'/>

                </View>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 120
    },
    goals: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        height: 40,
        flex: 1
    },
    updateBtn: {
        backgroundColor: '#520291'
    },
    goalInput: {
        height: 40,
        width: 100
    },
    goalLabel: {
        height: 40,
        textAlignVertical: 'center'
    }
});