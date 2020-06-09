import React, {Component} from 'react'
import {saveDeckTitle} from '../utils/api'

import {TextInput, Button, View,Text, StyleSheet} from 'react-native'

export default class AddDeckScreen extends Component{
    state={
        title:''
    }
    handleChange=(title)=>{
        this.setState({
            title:title
        })
    }
    handleSubmit=async()=>{
        await saveDeckTitle(this.state.title)
        this.props.navigation.navigate('Details',{id:this.state.title})
        this.setState({ title: '' });
        
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Deck Title:</Text>
                <TextInput
                    onChangeText={this.handleChange}
                    value={this.state.title}
                    editable={true}
                    style={styles.textInput}
                />
                <View style={styles.button}>
                <Button
                    title={'Submit'}
                    disabled={this.state.title === ''}
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