import React from 'react'
import { View, Text, image, Pressable } from 'react-native';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NewOrderPopup = ({ newOrder, onAccept, onDecline, duration, distance }) => {

    return(
        <View style={styles.root}>
            <Pressable onPress={onDecline} style={styles.declineButton}>
                <Text style={styles.declineText}>Decline</Text>
            </Pressable>
            <Pressable onPress={onAccept} style={styles.popupContainer}>
                <View style={styles.row}>
                    <Text style={styles.CabifyType}>{newOrder.type}</Text>

                        <View style={styles.userBg}>
                            <FontAwesome name={"user"} color={"black"} size={35}/>
                        </View>

                    <Text style={styles.CabifyType}>
                        <Entypo name={'star'} size={18}/>
                        5.00
                    </Text>
                </View>
                <Text style={styles.minutes}>{duration} min</Text>
                <Text style={styles.distance}>{distance} mi</Text>  
                <Text style={styles.CabifyType}>Accept</Text>
                <View>
                    <Text style={styles.separator}>-</Text>
                </View> 
                <Text style={styles.CabifyType}>
                    <Entypo name={'star'} size={18}/>
                    Toward your destination
                </Text>
            </Pressable>  
                  
        </View>
    );
};

export default NewOrderPopup;