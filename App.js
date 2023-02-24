/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { withAuthenticator } from 'aws-amplify-react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Car } from '././src/models/index';
import { Amplify, graphqlOperation, Auth, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

const App: () => React$Node = () => {

    useEffect(() => {
        const updateUserCar = async () => {
            // Get authenticated user
            const authenticatedUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            if (!authenticatedUser) {
              return;
            }
      
            // Check if the user has already a car
            const carData = await DataStore.save(
                Car,
                { id: authenticatedUser.attributes.sub }
            )
            
      
            if (!!carData.data.Car) {
              console.log("User already has a car assigned");
              return;
            }
      
            // If not, create a new car for the user
            const newCar = {
              id: authenticatedUser.attributes.sub,
              type: 'cabifymove',
              userId: authenticatedUser.attributes.sub,
            }
            await  DataStore.save(
              EagerCar, { input: newCar }
            )
          };
    
        updateUserCar();
      }, [])
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <HomeScreen />
            </SafeAreaView>
        </>
    );
};

export default withAuthenticator (App);