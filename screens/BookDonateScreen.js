import React,{Component} from 'react';
import {StyleSheet, Text,TouchableOpacity,View,Image} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem, ThemeConsumer } from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import { FlatList } from 'react-native-gesture-handler';

export default class BookDonateScreen extends React.Component{
    constructor(){
        super();
        this.state={
            requestedBooksList: []
        }
        this.requestRef = null;
    }

    getRequestedBooksList=()=>{
        this.requestRef = db.collection('requested_books')
        .onSnapshot((snapshot)=>{
            var requestedBooksList = snapshot.docs.map(document=>document.data());
            this.setState({
                requestedBooksList: requestedBooksList
            });
        })
    }

    componentDidMount(){
        this.getRequestedBooksList();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor=(item,index)=>index.toString();
    renderItem = ({item,i})=>{
        return(
            <ListItem 
            key = {i}
            title = {item.book_name}
            subtitle = {item.reason_to_request}
            titleStyle = {{color:'black',fontWeight:'bold'}}
            leftElemet = {<Image style = {{height:50,width:50}} 
                                source = {{uri: item.image_link}}
            />}
            rightElement = {
                <TouchableOpacity style = {styles.button}
                                onPress = {()=>{
                                    this.props.navigation.navigate('ReceiverDetails',{"details":item})
                                }}
                ><Text style = {{color:'#ffff'}}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        );
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "Donate Books" navigation = {this.props.navigation} />
                <View style = {{flex:1}}>
                    {
                        this.state.requestedBooksList.length === 0
                        ? (
                            <View style = {styles.subContainer}>
                                <Text style = {{fontSize:20}}>
                                    List of all requested books
                                </Text>
                            </View>
                        )
                        : (
                            <FlatList 
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.requestedBooksList}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5722',
    },
    subContainer:{
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});