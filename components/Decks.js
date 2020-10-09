import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} >
        <Text style={styles.bigBlue} >{item.title}</Text>
        <Text style={styles.bigBlueSub} >Questions: {item.questions.length} 
        </Text>
    </TouchableOpacity>
);

class Decks extends Component {
    state = {
        deckList: [],
    }

    setSelected = (item) => {
    	//console.log(item, " Passed in...");
    	this.props.navigation.navigate('Single Deck', item)
    }

	renderItem = ({ item }) => {
	    const backgroundColor = "#f9c2ff";
	    return (
	      <Item
	        item={item}
	        onPress={() => this.setSelected(item)}
	      />
	    );
	};

	static getDerivedStateFromProps (nextProps, prevState) {
	    if(nextProps.deckList!==prevState.deckList){
	       return { deckList: nextProps.deckList};
	    }
	    else return null;
	}
    
	render() {
		console.log(" Hello World...", this.state.deckList)
		return (
		    <SafeAreaView style={styles.container}>
		      <FlatList
		        data={this.state.deckList}
		        renderItem={this.renderItem}
		        keyExtractor={item => item.title}
		      />
		    </SafeAreaView>
		)
	}	
}

function mapStateToProps(state) {
    return {
        deckList : Object.values(state)
    }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    height:"100%",
    width: "100%",
    backgroundColor:"white",
    paddingTop:10
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'black',
    paddingTop:100,
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width:200,
    borderWidth:2,
    borderColor:"orange",
    padding: 10,
    fontSize:18,
    marginBottom:25
  },
  buttonTwo: {
    alignItems: "center",
    borderRadius: 10,
    width:200,
    fontSize:18,
    backgroundColor: "orange",
    padding: 10
  },
  bigBlueSub: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'grey',
    paddingTop:5,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:150
  },
});

export default connect(mapStateToProps)(Decks);