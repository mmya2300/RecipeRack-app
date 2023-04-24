import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import axios from "axios"
import Select from 'react-select';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      username: "",
      goalType: "",
      // error variables
      passwordError: false,
      confirmError: false,
      usernameError: false,
      emailError: false,
      nameError: false,
      goalTypeError: false,
      open: false,
    };
  }

  disableMethod = () => {
    const {username, password, confirmpassword, name, goalType, email, usernameError, nameError, passwordError, confirmError, goalTypeError, emailError} = this.state
    const inputsEmpty = [username, password, confirmpassword, name, goalType, email].some(val => val === "")
    const trueErrors = [usernameError, nameError, passwordError, confirmError, goalTypeError, emailError].some(val => val === true)

    return inputsEmpty || !trueErrors
}

  handleButtonPress = () => {
    console.log(this.state);
  }

  onCreateAccount = async () => {
    const {name, username, password, goalType } = this.state
    console.log(name, username, password, goalType)
    try {
        const result = await axios.post("http://localhost:3000/auth/register", {name, username, password, goalType})
        if (result.data.message != "register success") {
            console.log("no login", result.data)
            return;
        }
        console.log("user created")
          this.props.navigation.navigate('Login')  
    } catch (error) {
        console.log(error)
    }
  }

  render() {
    const goalOptions = [
      { label: 'I want to discover new recipes and try new cooking techniques.', value: 'knowledge' },
      { label: 'I want to better organize my meals and shopping lists', value: 'organizational' },
      { label: 'I want to manage and access my favorite recipes', value: 'storage' },
      { label: 'Other', value: 'other' }
    ];

    return (
      <SafeAreaView>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Name'
            testId="create-name"
            onChangeText={(text) => {
                const regex = /^[^\d\s]+$/
                if (!regex.test(text)) {
                this.setState({name: ""})
                this.setState({nameError: true})
              } else {
                this.setState({name: text})
                this.setState({nameError: false})
              }
               }} />
            {this.state.nameError ? <Text>Error: Please enter your first name (i.e Admin)</Text> : null }
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Email Address'
            testId="create-email"
            onChangeText={(text) => {
                const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                if (!regex.test(text)) {
                this.setState({email: ""})
                this.setState({emailError: true})
              } else {
                this.setState({email: text})
                this.setState({emailError: false})
              }
               }}   />
            {this.state.emailError ? <Text>Error: Please enter a valid email address (i.e testemail@gmail.com)</Text> : null }
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Username'
            testId="create-username"
            onChangeText={(text) => {
                const regex = /^[a-zA-Z0-9_-]{3,20}$/
                if (!regex.test(text)) {
                this.setState({username: ""})
                this.setState({usernameError: true})
              } else {
                 this.setState({username: text})
                this.setState({usernameError: false})
              }
               }} />
        {this.state.usernameError ? <Text>Error: Please enter a valid username (i.e test)</Text> : null }    
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Password'
            testId="create-password"
            onChangeText={(text) => {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/
                if (!regex.test(text)) {
                this.setState({password: ""})
                this.setState({passwordError: true})
              } else {
                this.setState({password: text})
                this.setState({passwordError: false})
              }
               }} />
        {this.state.passwordError ? <Text>Error: Please enter a valid password (i.e Test1@)</Text> : null }        
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            testId="confirm-password"
            onChangeText={(text) => {
                if(text !== this.state.password){
                  this.setState({confirmpassword: ""})
                  this.setState({confirmError: true})
                } else {
                  this.setState({confirmpassword: text})
                  this.setState({confirmError: false})
                }
               }}
                />
        {this.state.confirmError ? <Text>Error: Password doesn't not match previously set password</Text> : null } 

        </View>
        <View>
        <Select
          value={this.state.goalType}
          onChange={(selectedOption) => {
            this.setState({ goalType: selectedOption.value });
          }}
          isSearchable={false}
          menuPlacement="top"
          options={goalOptions}
          placeholder={"Select your goal type"}
        />
        </View>
        <View style={styles.button}>
          <Button title="Submit" onPress={this.onCreateAccount}  />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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
    button: {
      margin: 12
    }
})
