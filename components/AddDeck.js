import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView, View, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import AwesomeAlert from 'react-native-awesome-alerts'
import AsyncStorage from '@react-native-async-storage/async-storage'

class AddDeck extends Component {
    state = {
    	title:'',
        answers:{}

    }
    AddNewDeck = () => {
      //console.log(this.state, " State to be saed...")
      let data = this.state;
      const getDataThenSave = async (data) => {
        //await AsyncStorage.clear();
        var aDecks = await AsyncStorage.getItem('@Decks');
        aDecks = JSON.parse(aDecks);
        const jsonValue = JSON.stringify(
          Object.assign({
          [data.title] : {
            title: data.title,
            questions: []
          }},
          !!aDecks ? aDecks : {}
          )
        )
        var val = await AsyncStorage.setItem('@Decks', jsonValue);
        const jsonValues = await AsyncStorage.getItem('@Decks')
        //console.log(jsonValues, " After save...")
      }
      getDataThenSave(data);
    	this.props.dispatch(addDeck(this.state))
    	this.props.navigation.navigate('Single Deck', Object.assign({
        questions: [],
        title: data.title
      }))
     	this.setState((state,props) => ({
    		title: ''
    	}))
    }

    onAnswerChange = (t) => {
    	this.setState((state,props) => ({
    		title: t
    	}))
    }

    static getDerivedStateFromProps (nextProps, prevState) {
      if(!!nextProps.answers){
        return { 
            answers: nextProps.answers
        };
      }
      else return null;
    }
    
	render() {
		let { deck } = this.state
		let { onAnswerChange, AddNewDeck} = this
		return (
			<View style={styles.container}>
        <AwesomeAlert
            show={!!this.state.answers.showAlert}
            showProgress={false}
            title="AwesomeAlert"
            message="I have a message for you!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Got it"
            onConfirmPressed={() => {
              this.setState({
                answers : Object.assign(this.state.answers, { showAlert: false})
              });
            }}
          />
		    	<Text style={styles.bigBlue}>What Is Your New Deck's Name?</Text>
		    	<View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
			        <TextInput
			        	placeholder="Deck Name..."
				      	style={{ backgroundColor:'white',height: 40, width:260,padding:5,fontSize:18  }}
				      	onChangeText={text => onAnswerChange(text)}
				      	value={this.state.title}
				    />
			    </View>
			    <View style={{ flex: 1, alignItems: 'center', marginTop:50}}>
		    	<TouchableOpacity style={styles.buttonTwo} onPress={AddNewDeck}>
				     <Text style={{color:"#0C9BD2", fontSize:20}}>Save</Text>
				</TouchableOpacity>
				</View>
		    </View>
		)
	}	
}

function mapStateToProps(state) {
    return {
        answers : Object.values(state).filter(it => !it.questions)[0]
    }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    height:"100%",
    width: "100%",
    backgroundColor:"#5eb7d8",
    paddingTop:10
  },
  bigBlue: {
  	textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'white',
    paddingTop:100,
    fontWeight: 'bold',
    paddingLeft:30,
    paddingRight:30,
    fontSize: 30,
  },
  buttonTwo: {
    alignItems: "center",
    borderRadius: 10,
    width:200,
    fontSize:18,
    borderWidth:2,
    borderColor:"white",
    backgroundColor: "white",
    padding: 10
  }
});

export default connect(mapStateToProps)(AddDeck);