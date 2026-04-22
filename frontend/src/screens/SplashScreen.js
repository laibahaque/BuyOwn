import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";
import splashStyles from "../styles/splashStyles";

import B from "../assets/images/B.png";
import U from "../assets/images/U.png";
import Y from "../assets/images/Y.png";
import O from "../assets/images/O.png";
import W from "../assets/images/W.png";
import N from "../assets/images/N.png";

const { width } = Dimensions.get("window");

const letterImages = [U, Y, O, W, N];

export default function SplashScreen({ navigation }) {

const letterOpacity = useRef(
letterImages.map(() => new Animated.Value(0))
).current;

const letterTranslate = useRef(
letterImages.map(() => new Animated.Value(40))
).current;

// B animations
const Bscale = useRef(new Animated.Value(1.8)).current;
const BtranslateX = useRef(new Animated.Value(75)).current;

// slogan
const sloganOpacity = useRef(new Animated.Value(0)).current;
const sloganTranslate = useRef(new Animated.Value(30)).current;

useEffect(() => {

Animated.spring(Bscale,{
toValue:1,
useNativeDriver:true
}).start(()=>{

Animated.timing(BtranslateX,{
toValue:0,
duration:600,
useNativeDriver:true
}).start(()=>{

const animations = letterImages.map((_,i)=>{

return Animated.parallel([

Animated.timing(letterOpacity[i],{
toValue:1,
duration:300,
useNativeDriver:true
}),

Animated.spring(letterTranslate[i],{
toValue:0,
useNativeDriver:true
})

])

})

Animated.stagger(150,animations).start(()=>{

Animated.parallel([

Animated.timing(sloganOpacity,{
toValue:1,
duration:500,
useNativeDriver:true
}),

Animated.spring(sloganTranslate,{
toValue:0,
useNativeDriver:true
})

]).start(()=>{
setTimeout(()=>navigation.replace("Onboarding"),1500)
})

})

})

})

},[])

return(

<View style={splashStyles.container}>

<View style={splashStyles.logoRow}>

<Animated.Image
  source={B}
  style={[
    splashStyles.logo,
    {
      height: width * 0.15, // make B taller than others
      transform: [
        { scale: Bscale },
        { translateX: BtranslateX }
      ]
    }
  ]}
/>

{letterImages.map((img,index)=>(

<Animated.Image
key={index}
source={img}
style={[
splashStyles.logo,
{
opacity:letterOpacity[index],
transform:[
{translateY:letterTranslate[index]}
]
}
]}
/>

))}

</View>

<Animated.Image
source={require("../assets/images/slogan.png")}
style={[
splashStyles.sloganImage,
{
opacity:sloganOpacity,
transform:[
{translateY:sloganTranslate}
]
}
]}
/>

</View>

)

}