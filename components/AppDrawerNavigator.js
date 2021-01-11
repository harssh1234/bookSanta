import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyDonations from '../screens/MyDonations';
import NotificationScreen from '../screens/NotificationScreen';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen : AppTabNavigator
    },
    Setting:{
        screen : SettingScreen 
    },
    Donations:{
        screen: MyDonations
    },
    Notifications:{
        screen: NotificationScreen
    },
    MyReceivedBooks:{
        screen: MyReceivedBooksScreen
    }
   
},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteName : 'Home'
}
)