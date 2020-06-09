import * as React from "react";
import { Button,Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck } from "../utils/api";

export default class DetailsScreen extends React.Component {
  state = {
    deck: null,
  };
  componentDidMount() {
    const { route } = this.props;
    getDeck(route.params.id).then((result) => {
      this.setState({
        deck: result,
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.deck ? (
          <View>
            <Text style={styles.text}>Deck Title: {this.state.deck.title}</Text>
            <Text style={styles.text}>
              Number of Cards: {this.state.deck.questions.length}
            </Text>
            <View style={styles.btn}>
            <Button
            title='Add Card'
            onPress={(id) =>
              this.props.navigation.navigate("Add Card", {
                id: this.props.route.params.id,
              })
            }
            />
            </View>
            <View style={styles.btn}>
            <Button
            title='Start Quiz'
            onPress={(id) =>
              this.props.navigation.navigate("Quiz", {
                id: this.props.route.params.id,
              })
            }
            />
            </View>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={(id) =>
                this.props.navigation.navigate("Add Card", {
                  id: this.props.route.params.id,
                })
              }
            >
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={(id) =>
                this.props.navigation.navigate("Quiz", {
                  id: this.props.route.params.id,
                })
              }
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <Text style={styles.text}>Loading....</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#01afe9",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  buttonText: {
    color: "white",
  },
  btn:{
    marginTop:10
  }
});
