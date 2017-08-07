import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, ListView } from 'react-native';

export default class Home extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowChanged: (r1,r2) => r1 !== r2})
        this.state = {
            dataSource:ds.cloneWithRows(this.props.items)
        }
    }

    navigate(routeName){
        this.props.navigator.push({
            name:routeName
        })
    }

    render(){
        return(
            <View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={
                  (rowData)=>{
                    <View style={styles.itemRow}>
                      <Text style={styles.item}>{rowData}</Text>
                    </View>}
                }/>

              <TouchableHighlight 
                style={styles.scanIcon}
                onPress={this.naviagate.bind(this,'scanner')}
              >
                Add Item
              </TouchableHighlight>
            </View>
        );
    }


}

const styles = StyleSheet.create({
  itemRow:{
    height:25,

  },
  item:{

  },
  scanIcon:{

  }
});

AppRegistry.registerComponent('Home', () => Home);