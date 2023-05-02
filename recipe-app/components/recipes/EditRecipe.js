import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import mongoose from 'mongoose';
import { Button, Text } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';

export default class editRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      ingredients: [],
      directions: [],
      yield: "",
      cookTime: "",
    };
  }

  componentDidMount(){
     this.getRecipeInfo()
  }
  // function to get recipe infomation
   getRecipeInfo() {
    const { recipeID } = this.props.route.params;
    console.log(recipeID)
    const objectID = new mongoose.Types.ObjectId(String(recipeID)); // convert string to object ID
    axios.get(`http://localhost:3000/recipes/main/view/${objectID}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          name: response.data.name,
          description: response.data.description,
          ingredients: response.data.ingredients,
          directions: response.data.directions,
          yield: response.data.yield,
          cookTime: response.data.cookTime,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // if a different item is pressed, then the contents are changed to reflect that
  componentDidUpdate(prevProps) {
    const { recipeID } = this.props.route.params;
    if (recipeID !== prevProps.route.params.recipeID) {
      this.getRecipeInfo()
    }
  }
// instead of setting in the textInput I made it into seperate functions for directions and ingredients
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
// function for editing the recipe
  editRecipe = () => {
    const { recipeID } = this.props.route.params;
    const objectID = new mongoose.Types.ObjectId(String(recipeID)); // convert string to object ID
    const updatedRecipe = {
      name: this.state.name,
      description: this.state.description,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
      yield: this.state.yield,
      cookTime: this.state.cookTime,
    };
    axios.put(`http://localhost:3000/recipes/${objectID}`, updatedRecipe)
      .then(response => {
        // navigate back to view recipe page after editing
        this.props.navigation.navigate('Main Menu');
        ;
      })
      .catch(error => {
        console.log(error);
      });
  }

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
        <Text style={styles.heading}> Edit A Recipe </Text>
        <TextInput
         style={styles.input}
          placeholder="Name"
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
        />
        <TextInput
         style={styles.input}
          placeholder="Description"
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
        />
        
          <Text>Ingredients:</Text>
          {ingredients.map((ingredient, index) => (
            <View style={styles.container} key={index}>
              <TextInput
               style={styles.input}
                placeholder="Ingredient"
                value={ingredient}
                onChangeText={(text) => this.handleIngredientChange(text, index)}
              />
               <Button 
            buttonStyle={styles.addButton}
            title="Remove" onPress={() => this.handleRemoveIngredient(index)} />
            </View>
          ))}
        <Button buttonStyle={styles.addButton}
        title="Add Ingredient" onPress={this.handleAddIngredient} />
          <Text>Directions:</Text>
          {directions.map((direction, index) => (
            <View style={styles.container} key={index}>
              <TextInput
              style={styles.input}
                placeholder="Direction"
                value={direction}
                onChangeText={(text) => this.handleDirectionChange(text, index)}
              />
               <Button 
            buttonStyle={styles.addButton}
            title="Remove" onPress={() => this.handleRemoveIngredient(index)} />
            </View>
          ))}
         <Button buttonStyle={styles.addButton}
        title="Add Ingredient" onPress={this.handleAddIngredient} />
        <TextInput
        style={styles.input}
          placeholder="Yield"
          value={this.state.yield}
          onChangeText={(text) => this.setState({ yield: text })}
        />
        <TextInput
        style={styles.input}
          placeholder="Cook Time"
          value={this.state.cookTime}
          onChangeText={(text) => this.setState({ cookTime: text })}
        />
         <Button title="Edit" 
        buttonStyle={styles.button}
        onPress={this.editRecipe} />
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