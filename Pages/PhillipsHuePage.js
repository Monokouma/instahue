import React, {Component} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 60,
    },
    phillipsHueLabel: {
        paddingBottom: 40,
        color: '#fafafa',
        fontSize: 20,
    },
    buttonOne: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 4,
        backgroundColor: '#0F7173',
        width: 120,
        position: 'relative',
        right: 5,

    },
    buttonTwo: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 4,
        backgroundColor: '#0F7173',
        width: 120,
        position: 'relative',
        left: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingTop: 30,
    },
    text: {
        color: '#E7ECEF',
    },
})

class PhillipsHuePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.phillipsHueLabel}>Phillips Hue Status :</Text>
                <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.buttonOne}
                    onPress={() => {
                        alert('I Work')
                    }}
                ><Text style={styles.text}>Bridge Connect</Text></Pressable>
                <Pressable
                    style={styles.buttonTwo}
                    onPress={() => {
                        alert('I Work')
                    }}
                ><Text style={styles.text}>Light Controller</Text></Pressable>
                </View>
            </View>
        );
    }
}

export default PhillipsHuePage;