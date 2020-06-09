import * as React from 'react'
import { Button, Text, View, FlatList } from 'react-native';
import {getDecks} from '../utils/api'
import HomeCard from '../components/HomeCard'

export default class HomeScreen extends React.Component {
    state={
        decks:null
    }
    componentDidMount(){
        getDecks().then(results=>{
            this.setState({
                decks:results
            })
        })
    }
    onPress=(id)=>this.props.navigation.navigate('Details',{id:id})
    componentDidUpdate(){
        getDecks().then(results=>{
            this.setState({
                decks:results
            })
        })
    }
    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.state.decks?(<FlatList
                data={Object.values(this.state.decks)}
                renderItem={({ item }) => <HomeCard title={item.title} number={item.questions.length} onPress={this.onPress}/>}
        keyExtractor={item => item.title}
                
                />):<Text>no cards</Text>}
                
              {/* <Text>Home</Text>
              <Button
                title="Go to Details"
                onPress={() => this.props.navigation.navigate('Details')}
              /> */}
            </View>
          );
    }
    
  }