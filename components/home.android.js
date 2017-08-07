import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, ListView, Dimensions} from 'react-native';

export default class Home extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    var items = this.props.items || [];
    this.state = {
      dataSource:ds.cloneWithRows(items)
    }
  }

  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    })
  }

  renderRow(rowData){  
    console.log('items: ' +this.props.items)
    return (<View style={styles.itemRow}><View><Text>{rowData.count}</Text></View><Text style={styles.item}>{rowData.item}</Text></View>)
  }

  render(){
    return(
      <View style={styles.test}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarText}>Quickcart</Text>
        </View>
        
        
        <View style={styles.listContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
            />
        </View>

        <TouchableHighlight 
          style={styles.scanIcon}
          onPress={this.navigate.bind(this,'scanner')}
          underlayColor='darkred'
        >
          <Text style={styles.iconText}>Add Item</Text>
        </TouchableHighlight>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  itemRow:{
    height:25,
    width:Dimensions.get('window').width,
    
    
  },
  toolbar:{
    flex:1,
    justifyContent:'center',
    paddingLeft:20,
    backgroundColor:'red'
  },
  toolbarText:{
    fontSize:20,
    color:'white'
  },
  item:{
    color:'red',
    
  },
  listContainer:{
    flex:9
  },
  scanIcon:{
    flex:1,
    width:Dimensions.get('window').width,
    height:25,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    
  },
  test:{
    
    flex:1,
    flexDirection:'column'
  },
  iconText:{
    
    color:'white'
  }
});

AppRegistry.registerComponent('Home', () => Home);