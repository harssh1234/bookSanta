import React,{Component} from 'react';
import {Text,View,StyleSheet, TextInput,TouchableOpacity, Alert, KeyboardAvoidingView,Modal,ScrollView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Avatar} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import {DrawerItems} from 'react-navigation-drawer';

export default class CustomSideBarMenu extends Component {
    state = {
      userId: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docId: "",
    };

    fetchImage = (imageName) => {
      console.log("1111111111111111111   inside fetchImage");
      var storageRef = firebase
        .storage()
        .ref()
        .child("user_profiles/"+imageName);

        storageRef
          .getDownloadURL()
          .then((url)=>{
            this.setState({image: url});
          })
          .catch((error)=>{
            this.setState({image: "#"})
          })
    }
  
    selectPicture = async() => {
      const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if(!cancelled) {
        this.setState({image: uri})
        this.uploadImage(uri, this.state.userId);
      }
    }

    uploadImage = async(uri, imageName) => {

      console.log("3333333333333   uploadImage")
      var response = await fetch(uri);
      var blob = await response.blob();

      var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/"+imageName);

      return ref.put(blob).then((response) => {
        this.fetchImage(imageName)
      })
    }

    getUserProfile() {
      console.log("2222222222   insdie getUserProfile "+this.state.userId);
      db.collection("users")
        .where("username","==", this.state.userId)
        .onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc)=> {
            console.log(doc);
            this.setState({
              name: doc.data().first_name+" "+doc.data().last_name,

            })
          })
        })
    }

    
    componentDidMount() {
      this.fetchImage(this.state.userId);
      this.getUserProfile();
    }

    render() {
        return(
            <View style ={styles.container}>
              <View style={{flex :0.5, alignText: "center", backgroundColor:"orange"}}>
                <Avatar rounded
                    source={{
                      uri : this.state.image,
                    }}
                    size = "medium"
                    onPress={()=> this.selectPicture()}
                    containerStyle={styles.imageContainer}
                    showEditButton
                  />
                  {console.log("@#$%^&*%#$%^&*&^%$#$%^&*&^%$#$%^&* "+this.state.name)}
                  <Text style={{fontWeight: "100", fontSize:20 , paddingTop:10,marginLeft:20}}>
                    {this.state.name}
                  </Text>
              </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props} />
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logOutButton}
                    onPress = {()=> {
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                         <Text>Log Out</Text>
                    </TouchableOpacity>
                   
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container : {
      flex:1
    },
    drawerItemsContainer:{
      flex:0.8
    },
    logOutContainer : {
      flex:0.2,
      justifyContent:'flex-end',
      paddingBottom:30
    },
    logOutButton : {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10
    },
    logOutText:{
      fontSize: 30,
      fontWeight:'bold'
    },
    imageContainer:{
      flex: 0.75,
      width: '40%',
      height: '20%',
      marginLeft: 20,
      marginTop: 30,
      borderRadius: 40
    }
  })
  