import React from 'react';
import { View, SafeAreaView, StyleSheet} from 'react-native';
import { Button, Text } from '@rneui/themed';

function SignOut() {
    return (
        <SafeAreaView>
            <View>
                <Text>
                    Are you sure you wanna sign out?
                </Text>
                <Button 
                title={"Yes"}
                buttonStyle={{
                  backgroundColor: 'rgba(111, 202, 186, 1)',
                  borderRadius: 5,
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 200,
                  marginVertical: 10,
                }}
                onPress={()=>{
                    navigation.navigate('Login') 
                }}
                />
            </View>
        </SafeAreaView>
    );
}

export default SignOut;
