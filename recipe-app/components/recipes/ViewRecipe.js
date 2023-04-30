import React, { Component } from 'react';
import { View } from 'react-native';
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
      completionStatus: {
        timeLeft: "",
        status: ""
      },
      timesCompleted: ""
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
          completionStatus: response.data.completionStatus,
          timesCompleted: response.data.timesCompleted
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
      <View>
        <Button
            title={"Back to Menu"}
            onPress={() => {
              this.props.navigation.navigate('Main Menu');
            }}
          />
        <Text>{this.state.name}</Text>
        <Text>{this.state.description}</Text>
        <Text>{this.state.ingredients.join(", ")}</Text>
        <Text>{this.state.directions.join(", ")}</Text>
        <Text>{this.state.yield}</Text>
        <Text>{this.state.cookTime}</Text>
        <Text>Time Left: {this.state.completionStatus.timeLeft}</Text>
        <Text>Status: {this.state.completionStatus.status}</Text>
        <Text>{this.state.timesCompleted}</Text>
        <Button
          title={"Edit"} />
        <Button
          title={"Delete"} onPress={() => this.deleteRecipe()} />
      </View>
    );
  }
}

