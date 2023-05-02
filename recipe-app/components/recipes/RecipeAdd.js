import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
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
        description: "",
      };
  }
// adds recipe to the recipe database and saves the objectID to the users database
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
// instead of setting in the textInput I mad eit into seperate functions for directions and ingredients
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
// functions for adding steps and ingredients
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
// functions for removing steps and ingredients
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
      <ScrollView>
      <View style={styles.container}>
      <Button
            title={"Back to Menu"}
            buttonStyle={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Main Menu');
            }}
          />
        <Text style={styles.heading}>Add A Recipe</Text>
        <TextInput
        style={styles.input}
          placeholder="Insert Recipe name....."
          onChangeText={(text) => this.setState({ name: text })}
        />
        <TextInput
        style={styles.input}
          placeholder="Insert Recipe description...."
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => this.setState({ description: text })}
        />
       {ingredients.map((ingredient, index) => (
          <View style={styles.container} key={`ingredient-${index}`}>
            <TextInput
            style={styles.input}
              placeholder={`Ingredient ${index + 1}`}
              onChangeText={(text) => this.handleIngredientChange(text, index)}
            />
            <Button 
            buttonStyle={styles.addButton}
            title="Remove" onPress={() => this.handleRemoveIngredient(index)} />
          </View>
        ))}
        <Button buttonStyle={styles.addButton}
        title="Add Ingredient" onPress={this.handleAddIngredient} />
        {directions.map((direction, index) => (
          <View style={styles.container} key={`direction-${index}`}>
            <TextInput
            style={styles.input}
              placeholder={`Direction ${index + 1}`}
              onChangeText={(text) => this.handleDirectionChange(text, index)}
            />
            <Button buttonStyle={styles.addButton}title="Remove" onPress={() => this.handleRemoveDirection(index)} />

          </View>
        ))}
        <Button 
        buttonStyle={styles.addButton}
         title="Add Direction" onPress={this.handleAddDirection} />
        <TextInput
        style={styles.input}
          placeholder="Yield"
          onChangeText={(text) => this.setState({ yield: text })}
        />
        <TextInput
        style={styles.input}
          placeholder="Cook time"
          onChangeText={(text) => this.setState({ cookTime: text })}
          keyboardType="numeric"
        />
        <Button title="Add" 
        buttonStyle={styles.button}
        onPress={this.createNewRecipe} />
        
      </View>
      </ScrollView>
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
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    height: 50,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: 430,
    fontSize: 18,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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

  addButton: {
    backgroundColor: "#553285",
    borderRadius: 10,
    width: 90,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 30,
  }

});