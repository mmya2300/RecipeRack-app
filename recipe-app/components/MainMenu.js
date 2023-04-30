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
      userName: "",
      userRecipes: [],
    };
  }

  async componentDidMount() {
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
  
  renderItem = ({ item }) => {
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
          <Text> Welcome to RecipeRack! User ID: {this.state.userID} </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.userRecipes}
            renderItem={this.renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
        <View>
          <Button
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
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
  },
});

