import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';

export default class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
// will sign the user out and direct them back to homescreen
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Are you sure you wanna sign out?
            </Text>
            <Button 
            title={"Yes"}
            buttonStyle={styles.button}
            onPress={()=>{
                navigation.navigate('Login') 
            }}
            />
            <Button 
            title={"No"}
            buttonStyle={styles.buttonNope}
            onPress={()=>{
                navigation.navigate('Main Menu') 
            }}
            />
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#220d3a",
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontSize: 40,
      fontWeight: "bold",
      color: "white",
      marginTop: 80,
      marginBottom: 50,
    },
  
    button: {
      backgroundColor: "#553285",
      borderRadius: 10,
      width: 150,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: 10,
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 30,
    },
    buttonNope: {
        backgroundColor: "purple",
        borderRadius: 10,
        width: 150,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        color: "#553285",
        fontWeight: "bold",
        fontSize: 30,
      },
  
  });
