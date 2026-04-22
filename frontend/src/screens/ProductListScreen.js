// src/screens/ProductListScreen.js
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { Ionicons } from "@expo/vector-icons";
import { IMAGES } from "../assets/imageMap";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 50) / 2;

// --- Custom Hamburger Icon Component ---
const CustomMenuIcon = () => (
  <View style={styles.customMenuContainer}>
    <View style={[styles.menuLine, { width: 14 }]} />
    <View style={[styles.menuLine, { width: 22, marginVertical: 4 }]} />
    <View style={[styles.menuLine, { width: 14 }]} />
  </View>
);

// --- Product Card Component ---
const ProductCard = ({ product, navigation }) => {
  const [liked, setLiked] = useState(false);

  const getImageSource = (imgKey) => {
    if (!imgKey) return IMAGES.placeholder;
    if (typeof imgKey === "string" && imgKey.startsWith("http")) return { uri: imgKey };
    return IMAGES[imgKey] || IMAGES.placeholder;
  };

  const imageUri = product?.gallery?.[0] || product?.colors?.[0]?.image || product?.image;

  return (
    <TouchableOpacity
      style={cardStyles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("ProductDetails", { product })}
    >
      <TouchableOpacity 
        style={cardStyles.wishlistBtn} 
        onPress={() => setLiked(!liked)}
      >
        <Ionicons 
          name={liked ? "heart" : "heart-outline"} 
          size={20} 
          color={liked ? "#FF4D4D" : COLORS.secondary} 
        />
      </TouchableOpacity>

      <View style={cardStyles.imageContainer}>
        <Image source={getImageSource(imageUri)} style={cardStyles.image} />
      </View>

      <View style={cardStyles.info}>
        <Text style={cardStyles.brandName}>{product?.brand}</Text>
        <Text numberOfLines={1} style={cardStyles.modelName}>{product?.model}</Text>
        
        <View style={cardStyles.priceRow}>
          <Text style={cardStyles.priceText}>Rs {product?.price?.toLocaleString()}</Text>
          <View style={cardStyles.ratingBox}>
            <Ionicons name="star" size={10} color="#FFB800" />
            <Text style={cardStyles.ratingNum}>{product?.rating || "4.5"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const laptopCategories = ["All", "Student", "Business", "Gaming"];

const ProductListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const selectedBrandFromMenu = route.params?.selectedBrand;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const processedData = useMemo(() => {
    return items.filter((item) => {
      const matchBrand = !selectedBrandFromMenu || item.brand === selectedBrandFromMenu;
      const matchCategory = selectedCat === "All" || item.category === selectedCat;
      const matchSearch = 
        item.model?.toLowerCase().includes(search.toLowerCase()) || 
        item.brand?.toLowerCase().includes(search.toLowerCase());
      
      return matchBrand && matchCategory && matchSearch;
    });
  }, [items, selectedCat, search, selectedBrandFromMenu]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        data={processedData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        columnWrapperStyle={styles.columnGap}
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <View style={styles.topBar}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => navigation.navigate("CategoryScreen")}
              >
                {/* Custom Hamburger Menu Icon */}
                <CustomMenuIcon />
              </TouchableOpacity>

              <Text style={styles.brandTitle}>
                {selectedBrandFromMenu ? selectedBrandFromMenu : "BUYOWN"}
              </Text>

              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => navigation.setParams({ selectedBrand: null })}
              >
                <Ionicons 
                  name={selectedBrandFromMenu ? "close-circle-outline" : "ellipsis-vertical"} 
                  size={22} 
                  color={COLORS.primary} 
                />
              </TouchableOpacity>
            </View>

            {/* Search Bar - ROUNDED */}
            <View style={styles.searchWrapper}>
              <Ionicons name="search-outline" size={20} color={COLORS.icon} style={{marginLeft: 15}} />
              <TextInput
                placeholder={`Search ${selectedBrandFromMenu || 'laptops'}...`}
                style={styles.searchField}
                value={search}
                onChangeText={setSearch}
                placeholderTextColor={COLORS.icon}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")} style={{marginRight: 15}}>
                  <Ionicons name="close-circle" size={18} color={COLORS.icon} />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Pills - ROUNDED */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.catScroll}
              contentContainerStyle={styles.catContent}
            >
              {laptopCategories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCat(cat)}
                  style={[styles.catPill, selectedCat === cat && styles.activePill]}
                >
                  <Text style={[styles.catLabel, selectedCat === cat && styles.activeLabel]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedBrandFromMenu && (
              <View style={styles.activeFilterBar}>
                  <Text style={styles.filterText}>Showing: {selectedBrandFromMenu} Laptops</Text>
              </View>
            )}
          </View>
        }
        
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={{color: COLORS.secondary, fontWeight: '600'}}>No laptops found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerSection: { paddingTop: 10 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 5,
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  iconButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  
  // Custom Hamburger Styles
  customMenuContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuLine: {
    height: 2.5,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 25, 
    height: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchField: { flex: 1, paddingLeft: 10, fontSize: 15, color: COLORS.textPrimary, fontWeight: '500' },
  catScroll: { marginBottom: 15 },
  catContent: { paddingLeft: 20, paddingRight: 20 },
  catPill: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 25, 
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activePill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catLabel: { color: COLORS.secondary, fontWeight: "700", fontSize: 13 },
  activeLabel: { color: COLORS.white },
  columnGap: { justifyContent: "space-between", paddingHorizontal: 20 },
  activeFilterBar: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  filterText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
    backgroundColor: '#E8EBF0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  }
});

const cardStyles = StyleSheet.create({
  card: { 
    width: CARD_WIDTH, 
    marginBottom: 20, 
    backgroundColor: COLORS.white, 
    borderRadius: 8, 
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1, 
    borderColor: '#F1F5F9',
  },
  imageContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  image: { width: "100%", height: "100%", resizeMode: "contain" },
  wishlistBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 5,
  },
  info: { marginTop: 12 },
  brandName: { fontSize: 10, color: COLORS.secondary, fontWeight: "800", textTransform: "uppercase" },
  modelName: { fontSize: 13, fontWeight: "700", color: COLORS.textPrimary, marginTop: 2 },
  priceRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 8 
  },
  priceText: { fontSize: 13, fontWeight: "900", color: COLORS.primary },
  ratingBox: { 
    flexDirection: "row", 
    alignItems: "center", 
  },
  ratingNum: { fontSize: 10, fontWeight: "600", color: COLORS.secondary, marginLeft: 3 },
});

export default ProductListScreen;