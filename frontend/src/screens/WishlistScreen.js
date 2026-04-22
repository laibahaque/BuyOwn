import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { IMAGES } from "../assets/imageMap";

const { width } = Dimensions.get("window");

const WishlistScreen = ({ navigation }) => {
  // Dummy Data (Baad mein isse Redux se connect karenge)
  const wishlistItems = [
    {
      id: "1",
      model: "MacBook Pro M2",
      brand: "Apple",
      price: 450000,
      image: "macbook_pro", // imageMap key
      rating: 4.9,
    },
    {
      id: "2",
      model: "ROG Strix G15",
      brand: "ASUS",
      price: 320000,
      image: "rog_strix",
      rating: 4.8,
    },
  ];

  const getImageSource = (imgKey) => {
    return IMAGES[imgKey] || IMAGES.placeholder;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Image source={getImageSource(item.image)} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.modelText}>{item.model}</Text>
        <Text style={styles.priceText}>Rs {item.price.toLocaleString()}</Text>
        
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.removeBtn}>
        <Ionicons name="trash-outline" size={20} color="#FF4D4D" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <Text style={styles.itemCount}>{wishlistItems.length} Items</Text>
      </View>

      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#CBD5E1" />
          <Text style={styles.emptyText}>Your wishlist is empty!</Text>
          <TouchableOpacity 
            style={styles.shopBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.shopBtnText}>Explore Laptops</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  itemCount: { fontSize: 14, color: COLORS.secondary, fontWeight: '600' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemInfo: { flex: 1, marginLeft: 15 },
  brandText: { fontSize: 10, fontWeight: '800', color: COLORS.secondary, textTransform: 'uppercase' },
  modelText: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginVertical: 2 },
  priceText: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { fontSize: 12, marginLeft: 4, color: COLORS.secondary, fontWeight: '600' },
  removeBtn: { padding: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { fontSize: 18, color: COLORS.secondary, fontWeight: '700', marginTop: 15 },
  shopBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopBtnText: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
});

export default WishlistScreen;

