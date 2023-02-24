import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewOrderPopup from "../../components/NewOrderPopup";
import { Auth, graphqlOperation } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getCar, listOrders } from '../../models/queries';
import { updateCar, updateOrder } from '../../models/mutations';


const origin = {latitude: 18.734088,longitude: 73.096003}
const destination = {latitude: 18.794888,longitude: 73.126603}
const GOOGLE_MAPS_APIKEY = 'AIzaSyAYnwf3ZXrNnnnRF3_0Kt6FTwHnVXrNPp4';

const HomeScreen = (props) => {
    const [car, setCar] = useState(null);
    const [myPosition, setMyPosition] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [order, setOrder] = useState(null)
    const [newOrders, setNewOrders] = useState([]);
      
    const onDecline = () => {
        setNewOrders(null);
    }

      const onAccept = async (newOrder) => {
        setOrder(newOrder);
        setNewOrders(null);
      }

      const onGoPress = () => {
        setIsOnline(!isOnline);
    }

      const onUserLocationChange = async (event) => {
        const { latitude, longitude, heading } = event.nativeEvent.coordinate
        // Update the car and set it to active
        try {
        const userData = await Auth.currentAuthenticatedUser();
        const input = {
            id: userData.attributes.sub,
            latitude,
            longitude,
            heading,
        }
        const updatedCarData = await DataStore.save(
            graphqlOperation(updateCar, { input })
        )
        setCar(updatedCarData.data.updateCar);
        } catch (e) {
        console.error(e);
        }
      }

    const onDirectionFound = (event) => {
        console.log("Direction found:", event);
        if (order) {
            setOrder({
                ...order,
                distance: event.distance,
                duration: event.duration,
                pickedUp: order.pickedUp || event.distance < 0.2,
                isFinished: order.pickedUp || event.distance < 0.2,
            })
        }
    }

    const getDestination = () => {
        if (order && order.pickedUp) {
            return {
                latitude: order.destLatitude,
                longitude: order.destLongitude,
            }
        }
        return {
                latitude: order.originLatitude,
                longitude: order.oreiginLongitude,
        }
    }

    

    const renderBottomTitle = () => {
        if (order && order.isFinished) {
            console.log(order);
            return (
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', top:-10, justifyContent:'center', backgroundColor:'red', width:200, padding:2}}>
                        <Text style={{color:'white'}}>COMPLETE {order.type}</Text>
                    </View>
                    <Text style={styles.bottomText}>{order?.user?.username}</Text>
                </View>
            )
        }

        if (order && order.pickedUp) {
            console.log(order);
            return (
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', top:-10}}>
                        <Text>{order.duration ? order.duration.toFixed(1) : '30'} min</Text>
                        <View style={{backgroundColor:'#48d42a', width:25, alignItems:'center',justifyContent:'center',borderRadius:20, marginHorizontal:10}}>
                            <FontAwesome name={"user"} color={"black"} size={20}/>
                        </View>
                        <Text>{order.distance ? order.distance.toFixed(1) : '24'} km</Text>
                    </View>
                    <Text style={styles.bottomText}>Dropping Off {order?.user?.username}</Text>
                </View>
            )
        }

        if (order) {
            console.log(order);
            return (
                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', top:-10}}>
                        <Text>{order.duration ? order.duration.toFixed(1) : '30'} min</Text>
                        <View style={{backgroundColor:'#48d42a', width:25, alignItems:'center',justifyContent:'center',borderRadius:20, marginHorizontal:10}}>
                            <FontAwesome name={"user"} color={"black"} size={20}/>
                        </View>
                        <Text>{order.distance ? order.distance.toFixed(1) : '24'} km</Text>
                    </View>
                    <Text style={styles.bottomText}>Picking up Jagriti{order?.user?.username}</Text>
                </View>
            )
        }
        if (isOnline) {
            return (
                <Text style={styles.bottomText}>You're Online</Text>
            )
        }
            return (<Text style={styles.bottomText}>You're Offline</Text>);
    }

    return (
        <View>
            <MapView 
                style={{width: '100%', height: Dimensions.get('window').height - 80}}
                provider={PROVIDER_GOOGLE}  
                showsUserLocation={true} 
                initialRegion={{
                    latitude: 18.734888,
                    longitude: 73.096603,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {order && (
                    <MapViewDirections
                    origin={origin}
                    onReady={onDirectionFound}
                    destination={getDestination()}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor='hot pink'
                />
                )}
                
            </MapView>

            <Pressable onPress={() => console.warn('Balance')} style={styles.balancButton}>
                <Text style={styles.balanceText}>
                    <Text style={{ color: 'green' }}>₹</Text>
                    {' '}
                    0.00
                </Text>
            </Pressable>

            <Pressable onPress={() => console.warn('hey')} style={[styles.roundButton, {top:10, left:10}]}>
                <Entypo name={"menu"} size={24} color="#4a4a4a"/>
            </Pressable>

            <Pressable onPress={() => console.warn('hey')} style={[styles.roundButton, {top:10, right:10}]}>
                <FontAwesome name={"search"} size={24} color="#4a4a4a"/>
            </Pressable>

            <Pressable onPress={() => console.warn('hey')} style={[styles.roundButton, {bottom:130, left:10}]}>
                <MaterialCommunityIcons name={"shield-account"} size={24} color="#4a4a4a"/>
            </Pressable>

            <Pressable onPress={() => console.warn('hey')} style={[styles.roundButton, {bottom:130, right:10}]}>
                <MaterialCommunityIcons name={"message-badge"} size={24} color="#4a4a4a"/>
            </Pressable>

            <Pressable onPress={onGoPress} style={styles.goButton}>
                <Text style={styles.goText}>
                    {
                        isOnline ? 'END' : 'GO'
                    }
                </Text>
            </Pressable>

            <View style={styles.bottomContainer}>
                {
                    isOnline
                    ?<Feather name={"wifi"} size={24} color="#0000FF"/>
                    :<Feather name={"wifi-off"} size={24} color="#fff"/>
                }
                {renderBottomTitle()}                
                <Entypo name={"unread"} size={24} color="#fff"/>
            </View>

            {newOrders && <NewOrderPopup
                newOrder={newOrders}
                onDecline={onDecline}
                duration={2}
                distance={0.5}
                onAccept={() => onAccept(newOrders)}
            />}
        </View>
    );
};

export default HomeScreen;