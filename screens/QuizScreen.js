import React from "react";
import { getDeck } from "../utils/api";
import { Button, Text, View, StyleSheet } from "react-native";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export default class QuizScreen extends React.Component {
  state = {
    questions: null,
    correct: 0,
    currentQuestion: 0,
    showQuestion: true,
  };

  componentDidMount() {
    const { route } = this.props;
    getDeck(route.params.id).then((result) => {
      this.shuffle(result);
      this.setState({
        questions: result.questions,
      });
    });
    clearLocalNotification().then(setLocalNotification);
  }
  shuffle = (questions) => {
    let i = 0,
      j = 0,
      temp = null;

    for (i = questions.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = questions[i];
      questions[i] = questions[j];
      questions[j] = temp;
    }
  };
  quizProgress = () => {
    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      showQuestion: true,
      correct: prevState.correct,
      questions: prevState.questions,
    }));
  };

  hideShowQuestion = () => {
    this.setState((prevState) => ({
      showQuestion: !prevState.showQuestion,
      correct: prevState.correct,
      currentQuestion: prevState.currentQuestion,
      questions: prevState.questions,
    }));
  };
  markAsCorrect = () => {
    this.setState((prevState) => ({
      correct: prevState.correct + 1,
      currentQuestion: prevState.currentQuestion + 1,
      questions: prevState.questions,
      showQuestion: true,
    }));
  };

  renderInfo() {
    if (this.state.questions === null || this.state.questions === undefined) {
      return null;
    } else if (this.state.questions.length === 0) {
      return (
        <View>
          <Text style={styles.text}>There is no questions here</Text>
        </View>
      );
    } else if (this.state.questions.length !== this.state.currentQuestion) {
      const question = this.state.questions[this.state.currentQuestion];
      return (
        <View>
          <Text style={styles.textProgress}>
            Progress: {this.state.currentQuestion + 1} of{" "}
            {this.state.questions.length}
          </Text>
          <Text style={styles.text}>
            {this.state.showQuestion ? question.question : question.answer}
          </Text>
          <View style={styles.button}>
            <View style={styles.button}>
              <Button
                title={
                  this.state.showQuestion ? "Show Answer" : "Show Question"
                }
                onPress={this.hideShowQuestion}
              />
            </View>
            <View style={styles.button}>
              <Button title={"Correct"} onPress={this.markAsCorrect} />
            </View>
            <View style={styles.button}>
              <Button title={"Incorrect"} onPress={this.quizProgress} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>That's the end of this deck!</Text>
          <Text style={styles.text}>
            Score: You have answered{" "}
            {Math.round(
              (this.state.correct / this.state.questions.length) * 100
            )}
            % Correct!
          </Text>
          <View style={styles.button}>
            <Button
              title={"Restart Quiz"}
              onPress={() => {
                this.shuffle(this.state.questions);
                this.setState({
                  correct: 0,
                  currentQuestion: 0,
                  showQuestion: true,
                });
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={"Back to Deck"}
              onPress={(id) =>
                this.props.navigation.navigate("Details", {
                  id: this.props.route.params.id,
                })
              }
            />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.questions ? (
          this.renderInfo()
        ) : (
          <View>
            <Text>Loading....</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 70,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  textProgress: {
    fontSize: 20,
    marginTop: -30,
  },

  button: {
    marginTop: 10,
  },
});
