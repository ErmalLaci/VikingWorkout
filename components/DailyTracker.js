import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export class DailyTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trackItemValue: null, isLoading: true, trackItemGoal: null, todayString: ''};
    }

    refresh = () => {
        this.loadTrackerGoals();
    }

    loadTrackerGoals = async () => {
        let goalKey = `@${this.props.trackItem}Goal`;
        this.setState({trackItemGoal: JSON.parse(await AsyncStorage.getItem(goalKey))})
    }

    updateTrackedItem = async (changeAmount) => {
        try {
            let newTrackItemValue = this.state.trackItemValue+changeAmount;
            this.setState({trackItemValue: newTrackItemValue});
            await AsyncStorage.setItem(`@${this.state.todayString}${this.props.trackItem}`, JSON.stringify(newTrackItemValue));
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }

    async componentDidMount() {
        let today = new Date();
        let todayString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        this.setState({todayString});
        if (this.state.isLoading) {
            let key = `@${todayString}${this.props.trackItem}`;
            console.log(key);
            try {
                this.setState({
                    trackItemValue: JSON.parse(await AsyncStorage.getItem(key)),
                    isLoading: false
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.trackItem}
                </Text>
                <TouchableOpacity style={styles.iconContainer} onPress={() => {
                    this.updateTrackedItem(-100);
                }}>
                    <MaterialCommunityIcons 
                        name='minus'
                        size={30}
                        style={styles.icons} 
                        />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => {
                    this.updateTrackedItem(-50);
                }}>
                    <MaterialCommunityIcons 
                        name='minus'
                        size={15}
                        style={styles.icons} 
                        />
                </TouchableOpacity>
                <Text style={styles.currentValue}>
                    {this.state.trackItemValue ? this.state.trackItemValue : 0}
                </Text>
                <TouchableOpacity style={styles.iconContainer} onPress={() => {
                    this.updateTrackedItem(+50);
                }}>
                    <MaterialCommunityIcons 
                        name='plus'
                        size={15}
                        style={styles.icons} 
                        />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => {
                    this.updateTrackedItem(+100);
                }}>
                    <MaterialCommunityIcons 
                        name='plus'
                        size={30}
                        style={styles.icons} 
                        />
                </TouchableOpacity>
                <View>
                    <Text>Goal</Text>
                    <Text style={{textAlign: 'center'}}>
                        {this.state.trackItemGoal ? this.state.trackItemGoal : 0}
                    </Text>
                </View>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        alignSelf: 'center',
        padding: 5,
        fontWeight: 'bold',
        width: 75
    },
    iconContainer : {
        justifyContent: 'center'
    },
    currentValue: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 30,
        width: 100,
        textAlign: 'center'
    }
});
