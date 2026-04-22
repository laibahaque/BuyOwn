// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
// } from "react-native";
// import { Swipeable } from "react-native-gesture-handler";
// import { COLORS } from "../src/constants/theme";

// const initialCartItems = [
//   {
//     id: "1",
//     name: "Hp Laptop",
//     price: 59.99,
//     quantity: 1,
//     image:
//       "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg",
//   },
//   {
//     id: "2",
//     name: "Dell Laptop",
//     price: 129.99,
//     quantity: 2,
//     image:
//       "https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf.jpg",
//   },
// ];

// const MyCartScreen = () => {
  
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   const increaseQuantity = (id) => {
//     setCartItems(cartItems.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     ));
//   };

//   const decreaseQuantity = (id) => {
//     setCartItems(cartItems.map(item =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     ));
//   };

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const getTotalPrice = () => {
//     return cartItems
//       .reduce((sum, item) => sum + item.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   // Swipeable right action
//   const renderRightActions = (id) => (
//     <View style={{ justifyContent: 'center', marginLeft: 10 }}>
//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={() => removeItem(id)}
//       >
//         <Text style={styles.deleteText}>🗑️</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderItem = ({ item }) => (
//   <Swipeable
//     renderRightActions={() => renderRightActions(item.id)}
//     overshootRight={false}
//   >
//     <View style={styles.cartItem}>
//       {/* LEFT: Image + Details */}
//       <View style={styles.leftSection}>
//         <Image source={{ uri: item.image }} style={styles.itemImage} />
//         <View style={styles.itemDetails}>
//           <Text style={styles.itemName}>{item.name}</Text>
//           <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//           <Text style={styles.itemWeight}>Weight: 1kg</Text>
//         </View>
//       </View>

//       {/* RIGHT: Quantity Controls */}
//       <View style={styles.quantityContainer}>
//         <TouchableOpacity
//           style={styles.quantityButton}
//           onPress={() => decreaseQuantity(item.id)}
//         >
//           <Text style={styles.quantityButtonText}>-</Text>
//         </TouchableOpacity>

//         <Text style={styles.quantityText}>{item.quantity}</Text>

//         <TouchableOpacity
//           style={styles.quantityButton}
//           onPress={() => increaseQuantity(item.id)}
//         >
//           <Text style={styles.quantityButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Swipeable>
// );
//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: 30 }]}>
//       <Text style={styles.header}>My Cart</Text>

//       {cartItems.length > 0 ? (
//         <>
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//             contentContainerStyle={{ paddingBottom: 180 }}
//           />

//           <View style={styles.footer}>
//             <View style={styles.priceRow}>
//               <Text style={styles.priceLabel}>Total:</Text>
//               <Text style={styles.priceValue}>${getTotalPrice()}</Text>
//             </View>
//             <TouchableOpacity style={styles.checkoutButton}>
//               <Text style={styles.checkoutButtonText}>Proceed To Check Out</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <View style={styles.emptyCartContainer}>
//           <Text style={styles.emptyCartText}>Your cart is empty!</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
//   header: { fontSize: 28, fontWeight: "bold", color: COLORS.primary, marginBottom: 16 },

//   cartItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#E5F6DF",
//     padding: 12,
//     borderRadius: 16,
//     marginVertical: 8,
//   },
//   leftSection: { flexDirection: "row", alignItems: "center", gap: 12 },
//   itemImage: { width: 80, height: 80, borderRadius: 12 },
//   itemDetails: { justifyContent: "center" },
//   itemName: { fontSize: 16, fontWeight: "bold", color: COLORS.textPrimary },
//   itemPrice: { fontSize: 14, color: COLORS.secondary, marginVertical: 2 },
//   itemWeight: { fontSize: 12, color: COLORS.secondary },

//   quantityContainer: { flexDirection: "row", alignItems: "center", gap: 0 },
//   quantityButton: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
//   quantityButtonText: { color: COLORS.white, fontSize: 18, fontWeight: "bold" },
//   quantityText: { marginHorizontal: 12, fontSize: 16, color: COLORS.textPrimary },

//   deleteButton: { backgroundColor: "#f21010", justifyContent: "center", alignItems: "center", width: 50, borderRadius: 15, paddingVertical: 15 },
//   deleteText: { color: "#fff", fontSize: 18 },

//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: COLORS.white,
//     padding: 16,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingBottom: 65
//   },
//   priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
//   priceLabel: { fontSize: 16, color: COLORS.secondary },
//   priceValue: { fontSize: 18, fontWeight: "bold", color: COLORS.textPrimary },

//   checkoutButton: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center", },
//   checkoutButtonText: { color: COLORS.white, fontSize: 16, fontWeight: "bold" },

//   emptyCartContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   emptyCartText: { fontSize: 18, color: COLORS.secondary },
// });

// export default MyCartScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"; // ✅ Import hook
import { COLORS } from "../constants/theme";

const initialCartItems = [
  {
    id: "1",
    name: "Hp Laptop",
    price: 59.99,
    quantity: 1,
    image:
      "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg",
  },
  {
    id: "2",
    name: "Dell Laptop",
    price: 129.99,
    quantity: 2,
    image:
      "https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf.jpg",
  },
];

const MyCartScreen = () => {
  const navigation = useNavigation(); // ✅ Initialize navigation hook
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const renderRightActions = (id) => (
    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeItem(id)}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <View style={styles.cartItem}>
        <View style={styles.leftSection}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.itemWeight}>Weight: 1kg</Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 30 }]}>
      <Text style={styles.header}>My Cart</Text>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 180 }}
          />

          <View style={styles.footer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Total:</Text>
              <Text style={styles.priceValue}>${getTotalPrice()}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate("Checkout")} // ✅ This will now work
            >
              <Text style={styles.checkoutButtonText}>
                Proceed To Check Out
              </Text>
            </TouchableOpacity>

          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  header: { fontSize: 28, fontWeight: "bold", color: COLORS.primary, marginBottom: 16 },

  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E5F6DF",
    padding: 12,
    borderRadius: 16,
    marginVertical: 8,
  },
  leftSection: { flexDirection: "row", alignItems: "center", gap: 12 },
  itemImage: { width: 80, height: 80, borderRadius: 12 },
  itemDetails: { justifyContent: "center" },
  itemName: { fontSize: 16, fontWeight: "bold", color: COLORS.textPrimary },
  itemPrice: { fontSize: 14, color: COLORS.secondary, marginVertical: 2 },
  itemWeight: { fontSize: 12, color: COLORS.secondary },

  quantityContainer: { flexDirection: "row", alignItems: "center", gap: 0 },
  quantityButton: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  quantityButtonText: { color: COLORS.white, fontSize: 18, fontWeight: "bold" },
  quantityText: { marginHorizontal: 12, fontSize: 16, color: COLORS.textPrimary },

  deleteButton: { backgroundColor: "#f21010", justifyContent: "center", alignItems: "center", width: 50, borderRadius: 15, paddingVertical: 15 },
  deleteText: { color: "#fff", fontSize: 18 },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 65
  },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  priceLabel: { fontSize: 16, color: COLORS.secondary },
  priceValue: { fontSize: 18, fontWeight: "bold", color: COLORS.textPrimary },

  checkoutButton: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  checkoutButtonText: { color: COLORS.white, fontSize: 16, fontWeight: "bold" },

  emptyCartContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyCartText: { fontSize: 18, color: COLORS.secondary },
});

export default MyCartScreen;