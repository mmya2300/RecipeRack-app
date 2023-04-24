import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = {
        username: "",
        password: "",
        loginError: false
    };
  }

  // everytime the componenet loads, the asyncStorage removes the userId
  componentDidMount() {
    AsyncStorage.removeItem('userID');
  }

  // directs a new user to create an account
  onCreationClick = () => {
    console.log('must go to Account Creation screen')
    this.props.navigation.navigate('Register')
  }

  // button is disabled if username and password is not filled in
  disableMethod = () => {
    const {username, password} = this.state
    const inputsEmpty = [username, password].some(val => val === "")

    return inputsEmpty // if true then the button is disabled
  }

  // directs the user to go to the main menu screen
  onLogin = async () => {
    const { username, password } = this.state

    try {
      const result = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      })

      if (result.data.message != "login success") {
        console.log("no login", result.data)
        return;
      }
      
      const userID = result.data.userID;
      await AsyncStorage.setItem('userID', userID.toString());
      
      // clears the inputs and resets it for another user
      this.usernameRef.current.clear();
      this.passwordRef.current.clear();
      this.setState({username: "", password: ""})

      console.log(result, userID)
      this.props.navigation.navigate('Main Menu')
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text h1 style={styles.heading}> LOGIN </Text>
        </View>
        <View>
          <TextInput
            ref={this.usernameRef}
            style={styles.input}
            placeholder='Username'
            testId="login-username"
            onChangeText={(text) => this.setState({username: text})}
          />
        </View>
        <View>
          <TextInput 
            ref={this.passwordRef}
            style={styles.input}
            placeholder='Password'
            testID='login-password'
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <View>
          <Button 
            title={"Log in"}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 10,
            }}
            onPress={this.onLogin}
            disabled={this.disableMethod()}
          />
        </View>
        <View style={styles.registerBox}>
          <Text>
            No account?{' '}
          </Text>
          <Text
            style={styles.link}
            onPress={() => {
              this.onCreationClick()
            }}
          >
            Create an account!
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
        fontSize: 25
    },
    input: {
        borderColor: "#919191",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5
      },
    registerBox: {
        rowGap: 1,
        alignItems: "center",
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    link: {
        color:"#78ACFF"
    }
  })
  

