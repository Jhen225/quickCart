/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Navigator
} from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import Scanner from './components/scanner';
import Home from './components/home.android'

export default class quickcart extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }

  }

  renderScene(route,navigator){
    switch(route.name){
      case 'home':
        return <Home navigator={navigator} {...route.passProps}/>

      case 'scanner':
        return <Scanner navigator={navigator} list={this.state.list} initCount={0}/>
    }
  }



  updateList(newList){
    this.setState({
      list:newList
    });

    console.log(this.state.list);
  }


   render() {
    return (
      <View style={styles.container}>
        
        <Navigator 
          initialRoute={{name:'home'}}
          renderScene={this.renderScene.bind(this)}
          />
      </View>
      

      // {/*<Scanner gList={this.state.list} updateList={this.updateList.bind(this)}/>
      // <View style={styles.container}>
      //   <ScrollView style={styles.list}></ScrollView>
      //   <View styles={styles.bottomBar}></View>
      // </View>*/}
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  list:{

  },
  bottomBar:{

  }
});
AppRegistry.registerComponent('quickcart', () => quickcart);
