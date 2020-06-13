import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

export class DisplayTrainingMaxes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {dlMax: '', bpMax: '', ohpMax: '', squatMax: '', rowMax: ''};
    }

    refresh = async () => {
        this.loadTrainingMaxes();
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Training Maxes</Text>
                <View style={styles.tmContainer}>
                    <View style={styles.tms}>
                        <Text>
                            Deadlift
                        </Text>
                        <Text style={styles.boldText}>
                            {this.state.dlMax ? this.state.dlMax : 0}
                        </Text>
                    </View>
                    <View style={styles.tms}>
                        <Text>
                            Squat
                        </Text>
                        <Text style={styles.boldText}>
                        {this.state.squatMax ? this.state.squatMax : 0}
                        </Text>
                    </View>
                    <View style={styles.tms}>
                        <Text>
                            Bench Press
                        </Text>
                        <Text style={styles.boldText}>
                            {this.state.bpMax ? this.state.bpMax : 0}
                        </Text>
                    </View>
                    <View style={styles.tms}>
                        <Text>
                            OHP
                        </Text>
                        <Text style={styles.boldText}>
                            {this.state.ohpMax ? this.state.ohpMax : 0}
                        </Text>
                    </View>
                    <View style={styles.tms}>
                        <Text>
                            BB Row
                        </Text>
                        <Text style={styles.boldText}>
                            {this.state.rowMax ? this.state.rowMax : 0}
                        </Text>
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
    tmContainer: {
        flexDirection: 'row'
    },
    tms: {
        flex: 1,
        alignItems: 'center'
    },
    boldText: {
        fontWeight: 'bold'
    },
    title: {
        alignSelf: 'center',
        padding: 5,
        fontWeight: 'bold'
    }
});
