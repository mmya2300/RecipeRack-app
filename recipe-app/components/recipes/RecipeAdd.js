import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import axios from "axios"
import mongoose from 'mongoose';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class RecipeAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ownerID: "",
        name: "",
        description: "",
        ingredients: ["", ""],
        directions: ["", ""],
        yield: "",
        cookTime: "",
        completionStatus: "",
        description: "",
      };
  }

  createNewRecipe = async () => {
    try {
      const userID = await AsyncStorage.getItem("userID");
      if (!userID) {
        console.error("User ID is null");
        return;
      }

      const ownerID = new mongoose.Types.ObjectId(String(userID));
      
      const recipeData = {
        userID: ownerID,
        ownerID: ownerID,
        name: this.state.name,
        description: this.state.description,
        ingredients: this.state.ingredients,
        directions: this.state.directions,
        yield: this.state.yield,
        cookTime: this.state.cookTime,
        completionStatus: 'Not Started'
    };
    
    axios.post('http://localhost:3000/recipes/', recipeData)
        .then(response => {
            console.log(response.data.savedRecipes);
        })
        .catch(error => {
            console.log(error);
        });
    this.props.navigation.navigate('Main Menu');
    } catch (error) {
      console.error(error);
    }

  };

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

  handleRemoveIngredient = (index) => {
    const { ingredients } = this.state;
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    this.setState({ ingredients: newIngredients });
  };

  handleRemoveDirection = (index) => {
    const { directions } = this.state;
    const newDirections = [...directions];
    newDirections.splice(index, 1);
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
        <TextInput
          placeholder="Recipe description"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => this.setState({ description: text })}
        />
       {ingredients.map((ingredient, index) => (
          <View key={`ingredient-${index}`}>
            <TextInput
              placeholder={`Ingredient ${index + 1}`}
              onChangeText={(text) => this.handleIngredientChange(text, index)}
            />
            <Button title="Remove" onPress={() => this.handleRemoveIngredient(index)} />
          </View>
        ))}
        <Button title="Add Ingredient" onPress={this.handleAddIngredient} />
        {directions.map((direction, index) => (
          <View key={`direction-${index}`}>
            <TextInput
              placeholder={`Direction ${index + 1}`}
              onChangeText={(text) => this.handleDirectionChange(text, index)}
            />
            <Button title="Remove" onPress={() => this.handleRemoveDirection(index)} />
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
        <Button title="Submit" onPress={this.createNewRecipe} />
      </View>
    );
  }
}
  