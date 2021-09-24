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
            text: '',
            modalVisible: false,
            secondaryModalVisible: false,
            thirdModalVisible: false,
            username: '',
            numberOfPicture: '',
            textTitle: '',

        }
    }

    static picture;
    static linkArray = []
    static linkPic;

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
            await InstagramPage.sortArrayPicture()

        }).catch(function (error) {
            console.error(error);

        });

    }

    static sortArrayPicture() {

        InstagramPage.picture.map((item) => {
            //console.log(item.images.square);
            InstagramPage.linkArray.push(item.images)
            InstagramPage.linkPic = InstagramPage.linkArray[0].thumbnail
            console.log(InstagramPage.linkPic)
        })

    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible})
    }
    setSecondaryModalVisible = (visible) => {
        this.setState({secondaryModalVisible: visible})
    }
    setThirdModalVisible = (visible) => {
        this.setState({thirdModalVisible: visible})
    }


    f1 = async () => {
        let instagramUsername = this.state.text;

        this.setState({
            username: 'Fetching data please wait',
            buttonInModal: false
        })
        await InstagramPage.getUserProfile(instagramUsername)
        if (InstagramPage.linkArray.length === 0) {
            this.setState({
                username: 'Insta-Hue cant found your profile, did you enter the right name ? Your profile is in private ? You have one picture at least on your profile ?',
                textTitle: '404',

            })
        } else {
            this.setState({
                username: 'Found :' + ' ' + instagramUsername + ' ' + ' account' + ' ' + 'and',
                numberOfPicture: InstagramPage.linkArray.length + ' ' + 'pictures. Display it ?',
                textTitle: instagramUsername,
            })

        }
    }

    render() {
        const {modalVisible} = this.state;
        const {secondaryModalVisible} = this.state;
        const {thirdModalVisible} = this.state;
        const {textTitle} = this.state;
        const {buttonInModal} = this.state;


        return (
            <View style={styles.container}>
                <Text style={styles.instagramLabel}>Instagram Account Selected : {textTitle}</Text>
                <Image style={styles.logo}
                       source={{uri: 'https://i.imgur.com/ZYInR44.png'}}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible)
                    }}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalView}>
                            <Text style={styles.inText}>Enter your Instagram Username (Profile must be public)</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => this.setState({text})}
                            />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={secondaryModalVisible}
                                onRequestClose={() => {
                                    this.setSecondaryModalVisible(!secondaryModalVisible)
                                }}
                            >
                                <View style={styles.modal}>
                                    <View style={styles.modalView}>
                                        <Text
                                            style={styles.inText}>{this.state.username} {this.state.numberOfPicture}</Text>

                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={thirdModalVisible}
                                            onRequestClose={() => {
                                                this.setThirdModalVisible(!thirdModalVisible)
                                            }}
                                        >
                                            <View style={styles.modal}>
                                                <View style={styles.modalView}>
                                                    <Text style={styles.inText}>Oui</Text>
                                                    <Image style={styles.logo}
                                                           source={{uri: InstagramPage.linkPic}}
                                                    />
                                                </View>
                                            </View>
                                        </Modal>

                                        <View style={styles.buttonInModal}>
                                            <Pressable
                                                visible={buttonInModal}
                                                style={[styles.buttonModal, styles.buttonOpen]}
                                                onPress={() => this.setThirdModalVisible(!thirdModalVisible)}
                                            >
                                                <Text>Yes</Text>
                                            </Pressable>
                                            <Pressable
                                                visible={buttonInModal}
                                                style={[styles.buttonModal, styles.buttonClose]}
                                                onPress={() => this.setSecondaryModalVisible(!secondaryModalVisible)}
                                            >
                                                <Text>Cancel</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>


                            <View style={styles.buttonInModal}>
                                <Pressable
                                    style={[styles.buttonModal, styles.buttonOpen]}
                                    onPress={() => {

                                        this.setSecondaryModalVisible(!secondaryModalVisible)

                                        this.f1()
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