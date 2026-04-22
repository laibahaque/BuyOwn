// src/screens/ProductDetailsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { IMAGES } from "../assets/imageMap";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { product } = route.params || {};
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedRam, setSelectedRam] = useState(product?.ram || "16GB");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return <View style={styles.center}><Text>Product Not Found</Text></View>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, selectedRam }));
    Alert.alert("Success", `${product.model} added to cart!`);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, selectedRam }));
    // Navigate to checkout
    navigation.navigate("MyCart");
  };

  const getImageSource = (imgKey) => {
    if (!imgKey) return IMAGES.placeholder;
    if (typeof imgKey === "string" && imgKey.startsWith("http")) return { uri: imgKey };
    return IMAGES[imgKey] || IMAGES.placeholder;
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveSlide(index);
  };

  const technicalSpecs = [
    { label: "Processor", value: product.processor, icon: "hardware-chip-outline" },
    { label: "Graphics", value: product.gpu, icon: "speedometer-outline" },
    { label: "Display", value: product.screenSize, icon: "desktop-outline" },
    { label: "Storage", value: product.storage, icon: "save-outline" },
    { label: "Weight", value: product.weight, icon: "barbell-outline" },
    { label: "Dimensions", value: product.dimensions, icon: "resize-outline" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.navBtn} onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? "#FF4D4D" : COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* IMAGE SLIDER */}
        <View style={styles.sliderContainer}>
          <FlatList
            data={product.gallery}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            snapToAlignment="center"
            decelerationRate="fast"
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={getImageSource(item)} style={styles.mainImage} resizeMode="contain" />
              </View>
            )}
          />
          
          {/* DOTS */}
          <View style={styles.paginationContainer}>
            {product.gallery?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeSlide === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>{product.brand} • {product.category}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#FFC107" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.productName}>{product.model}</Text>
          <Text style={styles.priceText}>Rs {product.price?.toLocaleString()}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Technical Specifications</Text>
          <View style={styles.specsGrid}>
            {technicalSpecs.map((spec, index) => (
              <View key={index} style={styles.specCard}>
                <Ionicons name={spec.icon} size={18} color={COLORS.secondary} />
                <View style={styles.specTextContent}>
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Memory Option</Text>
          <View style={styles.ramRow}>
            {["8GB", "16GB", "32GB"].map((ram) => (
              <TouchableOpacity
                key={ram}
                style={[styles.ramChip, selectedRam === ram && styles.activeRamChip]}
                onPress={() => setSelectedRam(ram)}
              >
                <Text style={[styles.ramText, selectedRam === ram && styles.activeRamText]}>{ram}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>About this Laptop</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* FIXED FLOATING FOOTER - NO LONGER HIDING */}
      <View style={styles.footerWrapper}>
        <View style={styles.footerContent}>
          <TouchableOpacity 
            style={styles.cartBtn} 
            activeOpacity={0.7} 
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={20} color={COLORS.white} />
            <Text style={styles.cartBtnText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <View style={styles.footerDivider} />

          <TouchableOpacity 
            style={styles.buyNowBtn} 
            activeOpacity={0.8} 
            onPress={handleBuyNow}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12 },
  navBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
  
  // Scroll Content padding adjusted
  scrollContent: { paddingBottom: 40 }, 
  
  sliderContainer: { height: 280, marginTop: 10 },
  slide: { width: width, justifyContent: 'center', alignItems: 'center' },
  mainImage: { width: width * 0.85, height: 220 },
  
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#CBD5E1',
  },

  detailsContainer: { paddingHorizontal: 25, paddingTop: 10 },
  brandRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brandText: { fontSize: 12, fontWeight: "700", color: "#64748B", textTransform: "uppercase" },
  ratingBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { marginLeft: 4, fontWeight: "bold", color: "#92400E", fontSize: 12 },
  productName: { fontSize: 24, fontWeight: "900", color: "#1E293B", marginTop: 8 },
  priceText: { fontSize: 22, fontWeight: "800", color: COLORS.primary, marginTop: 5 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 20 },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#1E293B", marginBottom: 15 },
  specsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  specCard: { width: "48%", backgroundColor: "#F8FAFC", padding: 12, borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  specTextContent: { marginLeft: 10, flex: 1 },
  specLabel: { fontSize: 10, color: "#64748B", fontWeight: "600" },
  specValue: { fontSize: 11, fontWeight: "700", color: "#1E293B", marginTop: 1 },
  ramRow: { flexDirection: "row", marginBottom: 20 },
  ramChip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: "#E2E8F0", marginRight: 10 },
  activeRamChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  ramText: { fontWeight: "700", color: "#64748B" },
  activeRamText: { color: COLORS.white },
  description: { fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 20 },

  // FOOTER IMPROVED - No absolute positioning hacks
  footerWrapper: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 10 : 45, // Bottom space for comfort
    backgroundColor: 'transparent',
  },
  footerContent: {
    flexDirection: "row",
    backgroundColor: COLORS.primary, 
    borderRadius: 30,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'hidden',
    height: 60,
  },
  cartBtn: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  cartBtnText: { color: COLORS.white, fontSize: 15, fontWeight: "800", marginLeft: 8 },
  footerDivider: { width: 1, height: 25, backgroundColor: COLORS.white, opacity: 0.3 },
  buyNowBtn: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  buyNowText: { color: COLORS.white, fontSize: 15, fontWeight: "800" },
});

export default ProductDetailsScreen;