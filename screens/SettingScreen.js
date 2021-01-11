import React,{Component} from 'react';
import {StyleSheet, Text,TouchableOpacity,View, TextComponent, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'
import { TextInput } from 'react-native-gesture-handler';

export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state={
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            emailId: '',
            docId: ''
        }
    }

    getUserDetails(){
        var user = firebase.auth().currentUser;
        var email = user.email;

        db.collection('users').where('username','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    emailId: data.username,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    contact: data.mobile_number,
                    docId: doc.id
                });
            })
        })
        
    }

    componentDidMount(){
        this.getUserDetails();
    }

    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId).update({
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'address': this.state.address,
            'mobile_number': this.state.contact,
            'username': this.state.emailId
        })
        Alert.alert("Profile Updated Successfully")
    }

    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings" navigation = {this.props.navigation} />

                <View style={styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                            placeholder = {"First Name"}
                            maxLength = {8}
                            onChangeText = {(text)=>{
                                this.setState({
                                    firstName: text
                                })
                            }}
                            value = {this.state.firstName}
                    />
                </View>

                <View style={styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                            placeholder = {"Last Name"}
                            maxLength = {8}
                            onChangeText = {(text)=>{
                                this.setState({
                                    lastName: text
                                })
                            }}
                            value = {this.state.lastName}
                    />
                </View>

                <View style={styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                            placeholder = {"Address"}
                            multiline = {true}
                            onChangeText = {(text)=>{
                                this.setState({
                                    address: text
                                })
                            }}
                            value = {this.state.address}
                    />
                </View>

                <View style={styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                            placeholder = {"Contact"}
                            maxLength = {10}
                            keyboardType = {"numeric"}
                            onChangeText = {(text)=>{
                                this.setState({
                                    contact: text
                                })
                            }}
                            value = {this.state.contact}
                    />
                </View>

                <View style={styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                            placeholder = {"Email ID"}
                            keyboardType = {"email-address"}
                            onChangeText = {(text)=>{
                                this.setState({
                                    emailId: text
                                })
                            }}
                            value = {this.state.emailId}
                    />
                </View>

                <View>
                    <TouchableOpacity style = {styles.button}
                                    onPress = {()=>{
                                        this.updateUserDetails();
                                    }}
                    ><Text style = {styles.buttonText}>Save</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    formTextInput:{
        width: '75%',
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    button:{
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ff5722',
        marginTop: 20,
    },
    buttonText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffff',
    }
});
