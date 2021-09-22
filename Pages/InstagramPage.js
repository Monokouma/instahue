import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import axios from 'axios';


const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        alignItems: 'center',
    },

    logo: {
        width: 375,
        height: 300,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 4,
        backgroundColor: '#7303c0',
        width: 120,
    },
    text: {
        color: '#fafafa',
    },
    buttonContainer: {
        paddingTop: 40,
    },
    instagramLabel: {
        paddingBottom: 40,
        color: '#fafafa',
        fontSize: 20,
    },
});

class InstagramPage extends Component {
    static picture;

    static async getUserProfile() {
    console.log('coucou')
        const options = {
            method: 'GET',
            url: 'https://instagram85.p.rapidapi.com/account/monokouma_/feed',
            params: {by: 'username'},
            headers: {
                'x-rapidapi-host': 'instagram85.p.rapidapi.com',
                'x-rapidapi-key': '6fbb824343msh9fb93453db51808p1b64ccjsn647ba0e4ce02'
            }
        };

         await axios.request(options).then(async function ( response)  {
            InstagramPage.picture = response.data.data;
            await InstagramPage.consoleLog()

        }).catch(function (error) {
            console.error(error);
        });

    }

    static async consoleLog() {

        await console.log(InstagramPage.picture)

    }

    static async controllerInsta() {
        await InstagramPage.getUserProfile()

    }
//FAIRE UN MODAL POUR DEMANDER LE NOM D'UTILISATEUR INSTA
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instagramLabel}>Instagram Status :</Text>
                <Image style={styles.logo}
                       source={{uri: 'https://i.imgur.com/ZYInR44.png'}}
                />
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}
                               onPress={InstagramPage.controllerInsta}
                    >
                        <Text style={styles.text}>Choose Pic</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}

export default InstagramPage;