import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Pressable, Modal, TextInput} from 'react-native';
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
        backgroundColor: '#0F7173',
        width: 120,
    },
    text: {
        color: '#E7ECEF',
    },
    buttonContainer: {
        paddingTop: 40,
    },
    instagramLabel: {
        paddingBottom: 40,
        color: '#E7ECEF',
        fontSize: 20,
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#E7ECEF",
        borderRadius: 20,
        padding: 50,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    buttonModal: {
        borderRadius: 4,
        padding: 10,
        elevation: 2,

    },

    buttonClose: {
        backgroundColor: "#F05D5E",
        left: 5
    },
    buttonOpen: {
        backgroundColor: "#0F7173",
        right: 5
    },
    buttonInModal: {
        flexDirection: "row-reverse",
        alignItems: 'center',


    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#272932',
        color: '#272932',
        width: 200,
        padding: 10,
    },
    inText: {
        color: '#272932',
        textAlign: 'center'
    }
});


class InstagramPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    static picture;


    static async getUserProfile(instagramUsername) {
        console.log('coucou')
        const options = {
            method: 'GET',
            url: 'https://instagram85.p.rapidapi.com/account/' + instagramUsername + '/feed',
            params: {by: 'username'},
            headers: {
                'x-rapidapi-host': 'instagram85.p.rapidapi.com',
                'x-rapidapi-key': '6fbb824343msh9fb93453db51808p1b64ccjsn647ba0e4ce02'
            }
        };

        await axios.request(options).then(async function (response) {
            InstagramPage.picture = response.data.data;
            await InstagramPage.consoleLog()

        }).catch(function (error) {
            console.error(error);
        });

    }

    static async consoleLog() {

        await console.log(InstagramPage.picture)
        console.log('lop')
    }

    static async controllerInsta() {
        await InstagramPage.getUserProfile()

    }



    state = {
        modalVisible: false,
    }
    stateTwo = {
        modalVisibleTwo: false
    }
    setModalVisible = (visible) => {
        this.setState({modalVisible: visible})
    }
    setModalTwoVisible = (visibleTwo) => {
        this.setState({modalVisibleTwo: visibleTwo})
    }
    f1 = () => {
        let instagramUsername = this.state.text

        InstagramPage.getUserProfile(instagramUsername)

    }
    //A FAIRE : SECOND MODAL APRES AVOIR ENTRE LE NOM D'UTILISATEUR
    render() {
        const {modalVisible} = this.state;
        const {modalVisibleTwo} = this.stateTwo;

        return (
            <View style={styles.container}>
                <Text style={styles.instagramLabel}>Instagram Status :</Text>
                <Image style={styles.logo}
                       source={{uri: 'https://i.imgur.com/ZYInR44.png'}}
                />


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        this.setModalVisible(!modalVisible)
                    }
                    }
                >
                    <View style={styles.modal}>
                        <View style={styles.modalView}>
                            <Text id='test' style={styles.inText}>Enter your Instagram Username</Text>

                            <Modal style={styles.modal}
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleTwo}
                                onRequestClose={() => {
                                    this.setModalTwoVisible(!modalVisibleTwo)
                                }}
                            >
                                <View style={styles.modalView}>
                                    <Text style={styles.text}>OUI</Text>
                                </View>

                            </Modal>

                            <TextInput
                                style={styles.input}
                                onChangeText={text => this.setState({text})}
                            />
                            <View style={styles.buttonInModal}>
                                <Pressable
                                    style={[styles.buttonModal, styles.buttonOpen]}
                                    onPress={() => {
                                        this.f1()
                                        this.setModalTwoVisible(!modalVisibleTwo)

                                    }}
                                >
                                    <Text style={styles.text}>Get feed picture</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.text}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>


                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}
                               onPress={() => this.setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.text}>Link Instagram</Text>
                    </Pressable>

                </View>

            </View>
        );
    }
}

export default InstagramPage;