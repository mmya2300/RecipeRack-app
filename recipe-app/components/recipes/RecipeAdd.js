import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class RecipeAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ownerID: "",
        name: "",
        ingredients: ["", ""],
        directions: ["", ""],
        yield: "",
        cookTime: "",
        completionStatus: "",
      };
  }

  async componentDidMount() {
    const userID = await AsyncStorage.getItem("userID");
    this.setState({ ownerID: userID });
  }
  handleIngredientChange = (text, index) => {
    const { ingredients } = this.state;
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    this.setState({ ingredients: newIngredients });
  };

  handleDirectionChange = (text, index) => {
    const { directions } = this.state;
    const newDirections = [...directions];
    newDirections[index] = text;
    this.setState({ directions: newDirections });
  };

  handleAddIngredient = () => {
    const { ingredients } = this.state;
    const newIngredients = [...ingredients, ""];
    this.setState({ ingredients: newIngredients });
  };

  handleAddDirection = () => {
    const { directions } = this.state;
    const newDirections = [...directions, ""];
    this.setState({ directions: newDirections });
  };

  render() {
    const { ingredients, directions } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Recipe name"
          onChangeText={(text) => this.setState({ name: text })}
        />
        {ingredients.map((ingredient, index) => (
          <View key={`ingredient-${index}`}>
            <TextInput
              placeholder={`Ingredient ${index + 1}`}
              onChangeText={(text) => this.handleIngredientChange(text, index)}
            />
          </View>
        ))}
        <Button title="Add Ingredient" onPress={this.handleAddIngredient} />
        {directions.map((direction, index) => (
          <View key={`direction-${index}`}>
            <TextInput
              placeholder={`Direction ${index + 1}`}
              onChangeText={(text) => this.handleDirectionChange(text, index)}
            />
          </View>
        ))}
        <Button title="Add Direction" onPress={this.handleAddDirection} />
        <TextInput
          placeholder="Yield"
          onChangeText={(text) => this.setState({ yield: text })}
        />
        <TextInput
          placeholder="Cook time"
          onChangeText={(text) => this.setState({ cookTime: text })}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Completion status"
          onChangeText={(text) => this.setState({ completionStatus: text })}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}
  