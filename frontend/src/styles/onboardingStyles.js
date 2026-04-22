import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/theme";

const { width, height } = Dimensions.get("window");

const onboardingStyles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: COLORS.background,
},

topContainer: {
  marginTop: 80,
  paddingHorizontal: 25,
},

title: {
  fontSize: 42,
  fontWeight: "800",
  color: "#243947d8",
  lineHeight: 46,
},

desc: {
  marginTop: 10,
  fontSize: 16,
  color: "#576975dc",
  lineHeight: 24,
  width: "85%",
},

/* 🔥 WAVE PART */
waveWrapper: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: 220,
  overflow: "hidden",
},

wave: {
  position: "absolute",
  bottom: -40,
  width: "140%",
  height: 260,
  backgroundColor: "#243947",
  borderTopLeftRadius: 200,
  borderTopRightRadius: 200,
  transform: [{ scaleX: 1.2 }],
},

/* 🔥 BUTTON */
getStartedBtn: {
  position: "absolute",
  right: 25,
  bottom: 50,
  backgroundColor: "#fff",
  paddingVertical: 14,
  paddingHorizontal: 24,
  borderRadius: 30,
  elevation: 5,
},

getStartedText: {
  color: "#000",
  fontWeight: "700",
  fontSize: 14,
  letterSpacing: 1,
},

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 5,
  },

  activeDot: {
    width: 20,
    backgroundColor: COLORS.primary,
  },

  button: {
    marginTop: 40,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default onboardingStyles;