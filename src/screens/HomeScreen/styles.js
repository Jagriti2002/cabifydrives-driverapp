import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bottomContainer: {
        height: 110,
        backgroundColor: '#F99D00',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
    },
    bottomText: {
        fontSize:22,
        fontWeight:'bold',
        color:'#fff',   
        top:-10,     
    },
    roundButton:{
        position:'absolute',
        backgroundColor:'white',
        padding:10,
        borderRadius:25,
    },
    goButton:{
        position:'absolute',
        backgroundColor:'#1495ff',
        borderRadius:50,
        width:75,
        height:75,
        justifyContent:'center',
        alignItems:'center',
        bottom:120,
        left: Dimensions.get('window').width / 2 - 37,
    },
    goText:{
        fontSize:30,
        color:'white',
        fontWeight:'bold',
    },
    balancButton:{
        position:'absolute',
        backgroundColor:'#1c1c1c',
        borderRadius:50,
        width:100,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        top:10,
        left: Dimensions.get('window').width / 2 - 37,
    },
    balanceText:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
    },
});

export default styles;