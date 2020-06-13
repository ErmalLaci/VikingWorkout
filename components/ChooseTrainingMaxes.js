import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

export default class ChooseTrainingMaxes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {dlMax: '', bpMax: '', ohpMax: '', squatMax: '', rowMax: ''};
    }

    updateTrainingMaxes = async () => {
        const tmStorePairs = [
            ["@dlMax", JSON.stringify(this.state.dlMax)],
            ["@squatMax", JSON.stringify(this.state.squatMax)],
            ["@bpMax", JSON.stringify(this.state.bpMax)],
            ["@ohpMax", JSON.stringify(this.state.ohpMax)],
            ["@rowMax", JSON.stringify(this.state.rowMax)]
        ];

        AsyncStorage.multiSet(tmStorePairs);
    }

    componentDidMount() {
        let keys = ['@dlMax', '@squatMax', '@bpMax', '@ohpMax', '@rowMax'];
        return AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result) => {
                if (JSON.parse(result[1])) {
                    switch (result[0]) {    //result[0] is the key in the store
                        case '@dlMax':
                            this.setState({dlMax: JSON.parse(result[1])});
                        case '@squatMax':
                            this.setState({squatMax: JSON.parse(result[1])});
                        case '@bpMax':
                            this.setState({bpMax: JSON.parse(result[1])});
                        case '@ohpMax':
                            this.setState({ohpMax: JSON.parse(result[1])});
                        case '@rowMax':
                            this.setState({rowMax: JSON.parse(result[1])});
                    }
                }
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tms}>
                    <Text style={styles.tmLabel}>Deadlift Max</Text>
                    <TextInput 
                        style={styles.tmInput}
                        placeholder='0'
                        value={this.state.dlMax}
                        onChangeText={(text) => this.setState({dlMax: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.tms}>
                    <Text style={styles.tmLabel}>Squat Max</Text>
                    <TextInput
                        style={styles.tmInput}
                        placeholder='0'
                        value={this.state.squatMax}
                        onChangeText={(text) => this.setState({squatMax: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.tms}>
                    <Text style={styles.tmLabel}>Bench Press Max</Text>
                    <TextInput
                        style={styles.tmInput}
                        placeholder='0'
                        value={this.state.bpMax}
                        onChangeText={(text) => this.setState({bpMax: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.tms}>
                    <Text style={styles.tmLabel}>Overhead Press Max</Text>
                    <TextInput
                        style={styles.tmInput}
                        placeholder='0'
                        value={this.state.ohpMax}
                        onChangeText={(text) => this.setState({ohpMax: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.tms}>
                    <Text style={styles.tmLabel}>Barbell Row Max</Text>
                    <TextInput
                        style={styles.tmInput}
                        placeholder='0'
                        value={this.state.rowMax}
                        onChangeText={(text) => this.setState({rowMax: text})}
                        keyboardType='number-pad'
                        />
                </View>
                <View style={styles.btnContainer}>
                    <Button 
                        onPress={this.updateTrainingMaxes}
                        style={styles.updateBtn}
                        title='Update Training Maxes'/>

                </View>
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 240
    },
    tms: {
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
    tmInput: {
        height: 40,
        width: 100
    },
    tmLabel: {
        height: 40,
        textAlignVertical: 'center'
    }
});
