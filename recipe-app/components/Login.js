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
        loginError: false,
        serverError: false
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
      // if the username and password is incorrect
      if (result.data.message != "login success") {
        this.setState({loginError: true})
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
      // if the server is down and can't be accessed
      this.setState({serverError: true})
      console.error(error);
    }
  }

  render() {
    const buttonStyle = this.disableMethod()
      ? styles.disabledButton
      : styles.button;
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
          <Button 
            title={"Log in"}
            buttonStyle={buttonStyle}
            onPress={this.onLogin}
            disabled={this.disableMethod()}
          />
        {this.state.serverError ? <View style={styles.errorBox}> <Text style={styles.errorText}>UNABLE TO LOGIN: 500 Error</Text> </View> : null } 
        {this.state.loginError ? <View style={styles.errorBox}> <Text style={styles.errorText}>UNABLE TO LOGIN: Incorrect Username or Password</Text> </View> : null } 
        <View style={styles.registerBox}>
          <Text style={styles.registerText}>
            No account?{' '}
          </Text>
          <Text
            style={styles.registerLink}
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#242F3E",
    marginTop: 80,
    marginBottom: 50,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    height: 50,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: "90%",
    fontSize: 18,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: "grey",
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
  registerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#8B8B8B",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerLink: {
    color: "#3B82F6",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  errorBox: {
    borderRadius: 10,
    backgroundColor: "pink",
    padding: 10,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});


  

