import { StyleSheet, Dimensions } from "react-native"
import { COLORS } from "../constants/theme"

const { width, height } = Dimensions.get("window")

const splashStyles = StyleSheet.create({

container:{
flex:1,
backgroundColor: COLORS.background,
justifyContent:"center",
alignItems:"center"
},

logoRow:{
flexDirection:"row",
alignItems:"center",
justifyContent:"center"
},

logo:{
width: width * 0.1,
height: width * 0.1,
marginHorizontal:1,
resizeMode:"contain"
},

sloganImage:{
width: width * 0.7,
height: width * 0.2,
marginTop:0,
resizeMode:"contain"
},

backgroundIcons:{
position:"absolute",
top:0,
left:0,
width:width,
height:height
},

icon:{
position:"absolute",
opacity:0.15
}

})

export default splashStyles