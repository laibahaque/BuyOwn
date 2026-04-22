// src/screens/CategoryScreen.js
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { IMAGES } from "../assets/imageMap";

const CategoryScreen = ({ navigation }) => {
  const { items } = useSelector((state) => state.products);

  const categoryData = useMemo(() => {
    const brands = ["Dell", "HP", "Lenovo", "Asus", "Acer"];
    return brands.map((brandName) => {
      const brandProducts = items.filter((p) => p.brand === brandName);
      const firstProductImageKey = brandProducts[0]?.gallery?.[0] || 'placeholder';

      return {
        id: brandName,
        name: brandName,
        count: brandProducts.length,
        imageKey: firstProductImageKey,
      };
    });
  }, [items]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        // Close modal and navigate with brand parameter
        navigation.navigate("ProductListHome", { selectedBrand: item.name });
        navigation.goBack();
      }}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES[item.imageKey] || IMAGES.placeholder}
            style={styles.brandImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.brandName}>{item.name}</Text>
          <Text style={styles.productCount}>{item.count} items available</Text>
        </View>

        <View style={styles.arrowCircle}>
          <Ionicons name="chevron-forward" size={16} color="#6A5ACD" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBFBFB" />

      {/* Aligned Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      <FlatList
        data={categoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FBFBFB" 
  },
  header: {
    flexDirection: "row", // Isse button aur text ek line mein agaye
    alignItems: "center", // Isse vertically center hogaye
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop:35,
    marginRight: 15,
    // Subtle Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    marginTop:35,
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 18,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
  },
  brandImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  productCount: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F5F7F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});

export default CategoryScreen;