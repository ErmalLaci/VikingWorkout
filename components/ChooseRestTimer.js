import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

export default class ChooseRestTimer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {timerSeconds: ''};
    }

    updateTimer = async () => {
        try {
            await AsyncStorage.setItem(`@Timer`, this.state.timerSeconds);
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }

    async componentDidMount() {
        let timer = JSON.parse(await AsyncStorage.getItem('@Timer'));
        this.setState({timerSeconds: timer ? timer.toString() : '' });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerLabel}>Timer Duration</Text>
                    <TextInput 
                        style={styles.timerInput}
                        placeholder='0'
                        value={this.state.timerSeconds}
                        onChangeText={(text) => this.setState({timerSeconds: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.btnContainer}>
                    <Button 
                        onPress={this.updateTimer}
                        style={styles.updateBtn}
                        title='Update Timer'/>

                </View>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 80
    },
    timerContainer: {
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
    timerInput: {
        height: 40,
        width: 100
    },
    timerLabel: {
        height: 40,
        textAlignVertical: 'center'
    }
});
