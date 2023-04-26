import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from '@rneui/themed';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userID: '',
        };
      }
    
      async componentDidMount() {
       try {
          const value = await AsyncStorage.getItem('userID');
          if (value !== null) {
            this.setState({ userID: value });
          }
        } catch (error) {
          console.log(error);
        }
      }

  render() {
    return (
    <SafeAreaView>
      <View>
        <Text> Welcome to RecipeRack! User ID: {this.state.userID} </Text>
      </View>
      <View>
        <Button 
            title={"Add a recipe"}
            onPress={()=>{
                this.props.navigation.navigate('RecipeAdd')
            }}
        />
      </View>
      </SafeAreaView>
    );
  }
}
