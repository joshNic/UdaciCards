import React, { Component } from "react";

import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const HomeCard = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // style={styles.button}
        onPress={()=>props.onPress(props.title)}
      >
        <Text>{props.title}</Text>

        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>{props.number} Cards</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    shadowRadius: 10,
    backgroundColor: "gray",
    width: 200,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  countText: {
    color: "#FF00FF",
  },
});

export default HomeCard;
