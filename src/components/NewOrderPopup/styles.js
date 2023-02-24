import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root:{
        position:'absolute',
        width:'100%',
        padding:20,
        bottom:30,
        height:'100%',
        justifyContent:'space-between',
        backgroundColor:'#00000099',
    },
    popupContainer:{
        backgroundColor:'black',
        height:250,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'space-around',
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    minutes:{
        color:'lightgrey',
        fontSize:36,
    },
    distance:{
        color:'lightgrey',
        fontSize:26,
    },
    CabifyType:{
        color:'lightgrey',
        fontSize:20,
        marginHorizontal:10,
    },
    userBg:{
        backgroundColor:'#F99D00',
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
    declineButton:{
        backgroundColor:'black',
        padding:20,
        borderRadius:50,
        top:30,
        alignItems:'center',
        width:100,
    },
    declineText:{
        color:'white',
        fontWeight:'bold',
    },
    separator: {
        backgroundColor: '#707070',
        height: 1,
        width:350,
    },
});

export default styles;