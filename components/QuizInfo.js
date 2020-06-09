import * as React from 'react'

import { Button, Text, View, StyleSheet } from "react-native";

const QuizInfo=(props)=>{
    if (props.questions === null || props.questions === undefined) {
        return null;
      } else if (props.questions.length === 0) {
        return (
          <View>
            <Text style={styles.text}>There is no questions here</Text>
          </View>
        );
      } else if (props.questions.length !== props.currentQuestion) {
        const question = props.questions[props.currentQuestion];
        return (
          <View>
            <Text style={styles.textProgress}>
              Progress: {props.currentQuestion + 1} of{" "}
              {props.questions.length}
            </Text>
            <Text style={styles.text}>
              {props.showQuestion ? question.question : question.answer}
            </Text>
            <View style={styles.button}>
              <View style={styles.button}>
                <Button
                  title={
                    props.showQuestion ? "Show Answer" : "Show Question"
                  }
                  onPress={props.hideShowQuestion}
                />
              </View>
              <View style={styles.button}>
                <Button title={"Correct"} onPress={props.markAsCorrect} />
              </View>
              <View style={styles.button}>
                <Button title={"Incorrect"} onPress={props.quizProgress} />
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
                (props.correct / props.questions.length) * 100
              )}
              % Correct!
            </Text>
            <View style={styles.button}>
              <Button
                title={"Restart Quiz"}
                onPress={() => {
                  props.shuffle(props.questions);
                  props.restart
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={"Back to Deck"}
                onPress={props.navigat}
              />
            </View>
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
      export default QuizInfo