import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import cheerio from 'cheerio-without-node-native';

export default class Scanner extends Component{
  constructor(props){
    super(props);
    this.camera = null;
    this.state = {
      pendingData:false,
      runCount:this.props.initCount,
      itemList:[]
    }
  }
  
   render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this.handleBarcodeReading.bind(this)}
          defaultTouchToFocus
          aspect={Camera.constants.Aspect.fill}>
          {/*<TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}><Text>[CAPTURE]</Text></TouchableHighlight>*/}
        </Camera>
      </View>
    );
  }

  redirect(routeName,items){
    this.props.navigator.pop();
    this.props.navigator.push({
      name:routeName,
      passProps:{
        items:this.state.itemList
      }
    },()=>{});



    this.setState({
      pendingData:false,
    });
  }

  handleBarcodeReading(data,bounds){
    
    if((data.type === 'UPC_E') || (data.type === 'UPC_A') || (data.type === 'EAN_13')){
      if(!this.state.pendingData || this.state.runCount < 1){
        
        this.setState({pendingData:true,runCount:1});
        let newList = this.props.list;
        
        axios.get('https://www.upcdatabase.com/item/'+ data.data)
        .then((response)=>{
          let $ = cheerio.load(response.data);
          description = $('.data').children().eq(3);
          // newList.push(description.children().eq(2).text());
          // this.props.updateList(newList);
          this.addToList(description.children().eq(2).text())
        })
        .then(() =>{
          this.redirect('home',this.state.itemList);
        })
        .catch((error)=>{
          console.log('FetchError: ' + error)
        });
      }
      else{
        console.log('currently active');
      }
    }
  }

  addToList(newItem){
    
    let tempList = this.state.itemList;
    let count = 0;
    for(itemObject in tempList){
      if(itemObject.item === newItem){
        itemObject.count++;
      }else{
        console.log('adding item to list')
        tempList.push({item:newItem,count:1});
      }
    }
    this.setState({
        itemList:tempList
      },()=>{console.log('items: ' + this.state.itemList)})
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 40
  }
});


AppRegistry.registerComponent('Scanner',()=> Scanner);
