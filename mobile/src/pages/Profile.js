import React from 'react';
import { WebView } from 'react-native-webview'


function Profile( { navigation }){
    const githubUSerName = navigation.getParam('github_userName');
    return <WebView style={{flex: 1}} source={{uri: `https://github.com/${githubUSerName}`}}/>
}

export default Profile;