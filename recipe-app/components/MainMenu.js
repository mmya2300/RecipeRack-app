import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from '@rneui/themed';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import mongoose from 'mongoose';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      name: "",
      userRecipes: [],
    };
  }

  async componentDidMount() {
   await this.getUserRecipes()
  }

  async componentDidUpdate(){
    await this.getUserRecipes()
  }
  
  getUserRecipes = async () => {
    try {
      // get the user objectId stored in the asyncStorage
      const userID = await AsyncStorage.getItem("userID");
      if (!userID) { // check if valid
        console.error("User ID is null");
        return;
      }
      // convert it into a objectID that is able to be put in the url
      const ownerID = new mongoose.Types.ObjectId(String(userID));
      if (!mongoose.Types.ObjectId.isValid(ownerID)) { // check if valid
        console.error('Invalid userID');
        return;
      }
      const response = await axios.get(`http://localhost:3000/recipes/main/${ownerID}`);
      this.setState({ userRecipes: response.data.savedRecipes }); // puts all the save recipes in the userRecipes array
    } catch (error) {
      console.log(error);
    }
  }
  
  // render a recipe that belongs to the User
  renderItem = ({ item }) => {
    // depending on the recipe pressed, then that recipe's info will be able to be viewed in the next screen
    const navigateToRecipe = () => {
      this.props.navigation.navigate('ViewRecipe', { recipeID: item._id });
    };
  
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={navigateToRecipe}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.welcomeText}> Welcome To RecipeRack!</Text>
        </View>
        <View>
          <FlatList
            data={this.state.userRecipes}
            renderItem={this.renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
        <View>
          <Button
          buttonStyle={styles.button}
            title={"Add a recipe"}
            onPress={() => {
              this.props.navigation.navigate('RecipeAdd');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#220d3a"
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
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
    width: 400
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  itemDescription: {
    fontSize: 16,
    color: "black"
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
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  welcomeText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 80,
  }
});


