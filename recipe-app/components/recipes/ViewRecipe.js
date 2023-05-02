import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';
import axios from 'axios';
import mongoose from 'mongoose';

export default class ViewRecipe extends Component {
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
  async componentDidMount(){
    await this.getRecipeInfo()
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
  // will delete the recipe
  deleteRecipe() {
    const { recipeID } = this.props.route.params;
    const objectID = new mongoose.Types.ObjectId(String(recipeID)); // convert string to object ID
    axios
      .delete(`http://localhost:3000/recipes/delete/${objectID}`)
      .then((response) => {
        console.log(response);
        this.props.navigation.navigate('Main Menu');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>   
        <Button
            title={"Back to Menu"}
            buttonStyle={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Main Menu');
            }}
          />
        <View style={styles.recipeContainer}>
        <Text h2>{this.state.name}</Text>
        <Text>{this.state.description}</Text>
        <Text h4>Ingredients: </Text>
        <Text>{this.state.ingredients.join("\n")}</Text>
        <Text h4>Directions: </Text>
        <Text>{this.state.directions.join("\n")}</Text>
        <Text>Yield: {this.state.yield}</Text>
        <Text>Cook Time: {this.state.cookTime}</Text>
        </View>
        <Button
          title={"Edit"} 
          buttonStyle={styles.button}
          onPress={() => {
            this.props.navigation.navigate("EditRecipe", {recipeID: this.props.route.params.recipeID})
          }} />
        <Button
          title={"Delete"} 
          buttonStyle={styles.button}
          onPress={() => this.deleteRecipe()} />
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
    color: "#242F3E",
    marginTop: 80,
    marginBottom: 50,
  },
  recipeContainer: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    height: 50,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    width: "110%",
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
});
