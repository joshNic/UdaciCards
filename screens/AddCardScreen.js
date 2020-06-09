import React, {Component} from 'react'
import {addCardToDeck} from '../utils/api'

import {TextInput,TouchableOpacity, KeyboardAvoidingView, Button, View,Text, StyleSheet} from 'react-native'

export default class AddCardScreen extends Component{
    state={
        question:'',
        answer:''
    }
    handleChangeQuestion=(question)=>{
        this.setState({question:question})
    }
    handleChangeAnswer=(answer)=>{
        this.setState({answer:answer})
    }
    handleSubmit=()=>{
        const {navigation,route} = this.props
        const deckTitle = route.params.id
        const card = {
            question:this.state.question,
            answer:this.state.answer
        }
        addCardToDeck(deckTitle, card)
        
        this.setState({ question: '', answer: '' });
        navigation.navigate('Details',{id:deckTitle})
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Card Question:</Text>
                <TextInput
                    onChangeText={this.handleChangeQuestion}
                    value={this.state.question}
                    editable={true}
                    style={styles.textInput}
                 />
                <Text style={styles.text}>Card Answer: </Text>
                <TextInput
                    onChangeText={this.handleChangeAnswer}
                    value={this.state.answer}
                    editable={true}
                    style={styles.textInput}
                />
                <View style={styles.button}>
                <Button
                    title={'Submit'}
                    disabled={this.state.answer === '' || this.state.question === ''}
                    onPress={this.handleSubmit}
                />
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginLeft:10,
        marginTop:70,
    },
    text:{
        fontSize:20,
    },
    textInput:{
        borderRadius:10,
        backgroundColor:'white',
        height:40
    },
    button:{
        marginTop:10,
        
    }
})