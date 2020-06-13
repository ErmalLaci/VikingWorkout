import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, Platform, Button } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';
import Collapsible from 'react-native-collapsible';
import { Audio } from 'expo-av';

import { MaterialIcons } from '@expo/vector-icons';
import swalarm from '../assets/sounds/swalarm.mp3';
import alarm from '../assets/sounds/alarm.mp3';
import { WorkoutDisplay } from './WorkoutDisplay';

export class DailyWorkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            totalDuration: null,
            timerReset: false,
            workout: null, 
            dropdownRotation: '270',
            isLoading: true,
            permissionStatus: null
        };
    }

    refresh = () => {
        //this.loadTimer();
    }

    loadTimer = async () => {
        await AsyncStorage.getItem('@Timer').then(
            data => this.setState({
                totalDuration: data ? Number(data) * 1000 : 90000
            })
        );
    }

    updateTimer = async () => {
        await AsyncStorage.getItem('@Timer').then(
            data => this.setState({
                totalDuration: data ? Number(data) * 1000 : 90000,
                timerReset: true
            })
        ).then(
            this.refs.workoutDisplay.refresh()
        );
    }

    async componentDidMount() {
        const { status } = Platform.OS === 'web' ? {status: 'granted'} : await Audio.getPermissionsAsync();
        this.state.permissionStatus = status;
        if (this.state.isLoading) {
            if (this.state.permissionStatus !== 'granted') {
                Audio.requestPermissionsAsync();
            }
            this.setState({isLoading: false});
        }
        this.loadTimer();
    }

    toggleTimer = () => {
        if (this.state.timerStart) {
            this.setState({timerStart: false, timerReset: true}, () => {
                this.setState({timerStart: true})
            });
        } else {
            this.setState({timerStart: true, timerReset: false});
        }
    }

    handleFinish = async () => {
        this.setState({timerStart: false, timerReset: true});
        console.log(this.state.permissionStatus);
        if (this.state.permissionStatus === 'granted') {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(swalarm);
                await soundObject.playAsync();
                // Sound is playing!
            } catch (error) {
                // An error occurred!
            }
        }
    }


    render() {
        console.log('rerender daily workout');
        let totalDuration = this.state.totalDuration;

        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.titleContainer}
                    onPress={() => this.setState({dropdownRotation: this.state.dropdownRotation == '0' ? '270' : '0'})}
                    >
                    <Text style={styles.title}>
                        Workout
                    </Text>
                    <View style={{marginLeft: 'auto'}}>
                        <Button 
                            title='Update Timer'
                            onPress={this.updateTimer}
                            style={styles.updateTimerBtn}
                            />
                    </View>
                    <View style={styles.timer}>
                        {
                            totalDuration !== null &&
                            <Timer
                                totalDuration={totalDuration}
                                start={this.state.timerStart}
                                reset={this.state.timerReset} 
                                options={timerOptions}
                                handleFinish={this.handleFinish}
                                />
                        }
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <MaterialIcons 
                            name='keyboard-arrow-down'
                            size={32}
                            style={[styles.icons, {transform: [{rotate: `${this.state.dropdownRotation}deg`}]}]} 
                            />
                    </View>
                    
                </TouchableOpacity>
                <Collapsible collapsed={this.state.dropdownRotation == '270'}>
                    <WorkoutDisplay ref='workoutDisplay' toggleTimer={this.toggleTimer} />
                </Collapsible>
            </View>
        );
    }    
}

const timerOptions = {
    container: {
        backgroundColor: '#7D00DF'
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginTop: 15,
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#A83AFF',
        borderRadius: 8
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#7D00DF',
        padding: 10,
        borderRadius: 8
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#DDA600'
    },
    icons: {
        marginLeft: 25
    },
    timer: {
        justifyContent: 'center',
        marginLeft: 'auto'
    }
});
