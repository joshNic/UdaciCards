import React from "react";
import { getDeck } from "../utils/api";
import { Button, Text, View, StyleSheet } from "react-native";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";
import QuizInfo from '../components/QuizInfo'

export default class QuizScreen extends React.Component {
  state = {
    correct: 0,
    questions: null,
    showQuestion: true,
    currentQuestion: 0,
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
  restart=()=>{
    this.shuffle(this.state.questions);
                this.setState({
                  correct: 0,
                  currentQuestion: 0,
                  showQuestion: true,
                });
  }
  navigat=()=>{
    this.props.navigation.navigate("Details", {
      id: this.props.route.params.id,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.questions ? (
          <QuizInfo
          questions={this.state.questions}
          shuffle={this.shuffle}
          markAsCorrect={this.markAsCorrect}
          quizProgress={this.quizProgress}
          hideShowQuestion={this.hideShowQuestion}
          currentQuestion={this.state.currentQuestion}
          correct={this.state.correct}
          showQuestion={this.state.showQuestion}
          restart={this.restart}
          navigat={this.navigat}
          
          />
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
