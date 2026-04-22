import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import onboardingStyles from "../styles/onboardingStyles";

const { width } = Dimensions.get("window");

const data = [
  {
    title: "Powerful Laptops",
    desc: "Find the best laptops for work, gaming and study.",
    image: require("../assets/images/onboard-bg.png"),
  },
  {
    title: "Top Brands",
    desc: "We provide Apple, Dell, HP and more trusted brands.",
    image: require("../assets/images/onboard-bg.png"),
  },
  {
    title: "Easy Shopping",
    desc: "Simple and fast buying experience at your fingertips.",
    image: require("../assets/images/onboard-bg.png"),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [index, setIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.replace("Login"); 
    }
  };
  
 return (
  <View style={onboardingStyles.container}>

    {/* TOP CONTENT */}
    <View style={onboardingStyles.topContainer}>
      <Text style={onboardingStyles.title}>
        Buy Best Laptops
      </Text>

      <Text style={onboardingStyles.desc}>
        Discover powerful laptops from top brands with the best prices and performance.
      </Text>
    </View>

    {/* WAVE BACKGROUND */}
    <View style={onboardingStyles.waveWrapper}>
      <View style={onboardingStyles.wave} />
    </View>

    {/* BUTTON */}
    <TouchableOpacity
      style={onboardingStyles.getStartedBtn}
      onPress={() => navigation.navigate("ProductListHome")}
    >
      <Text style={onboardingStyles.getStartedText}>
        GET STARTED →
      </Text>
    </TouchableOpacity>

  </View>
);
}