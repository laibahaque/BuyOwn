import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView, // ✅ Added ScrollView
} from "react-native";
// ✅ Fix: Import SafeAreaView from 'react-native-safe-area-context' to remove warning
import { SafeAreaView } from "react-native-safe-area-context"; 
import { COLORS } from "../constants/theme";

const CheckoutScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [showQR, setShowQR] = useState(false);

    const handlePayment = () => {
    // 1. Trim values to ensure they aren't just empty spaces
    const { name, email, phone, address } = form;

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      alert("Validation Error: Please fill in all shipping details before proceeding to payment.");
      return;
    }

    // 2. Optional: Basic Email validation check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // simulate 5 sec payment delay
    setTimeout(() => {
      setLoading(false);
      setSuccessVisible(true);
    }, 5000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Added ScrollView so the screen doesn't get cut off */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.header}>Checkout</Text>

        {/* FORM */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Shipping Details</Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
          />

          <TextInput
            placeholder="Address"
            placeholderTextColor={COLORS.textSecondary}
            style={[styles.input, { height: 80 }]}
            multiline
            value={form.address}
            onChangeText={(text) => setForm({ ...form, address: text })}
          />
        </View>

        {/* PAYMENT CARD */}
        <View style={styles.paymentCard}>
          <Text style={styles.cardTitle}>Payment Options</Text>

          {!showQR ? (
  <TouchableOpacity
    style={styles.codButton}
    onPress={() => setShowQR(true)}
  >
    <Text style={styles.codText}>Pay with QR</Text>
  </TouchableOpacity>
) : (
  <View style={styles.qrContainer}>
    <Image
      source={{
        uri: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Payment",
      }}
      style={styles.qrImage}
    />
    <Text style={styles.qrText}>Scan QR to Pay</Text>
  </View>
)}

          <TouchableOpacity style={styles.codButton} onPress={handlePayment}>
            <Text style={styles.codText}>Cash on Delivery (COD)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.payText}>Confirm Payment</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* SUCCESS MODAL */}
      {/* SUCCESS MODAL */}
<Modal transparent visible={successVisible} animationType="fade">
  <View style={styles.modalContainer}>
    <View style={styles.modalCard}>
      <Text style={styles.successText}>Payment Successful 🎉</Text>

      <TouchableOpacity
        style={styles.shopMoreButton}
        onPress={() => {
          setSuccessVisible(false); // 1. Close the modal
          navigation.navigate("MyOrders"); // 2. Navigate to MyOrders screen
        }}
      >
        <Text style={styles.shopMoreText}>View My Orders</Text> 
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // paddingHorizontal: 16, // Moved padding from container to handle ScrollView properly
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 10,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  qrImage: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  qrText: {
    color: COLORS.textSecondary,
  },
  codButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  codText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  shopMoreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  shopMoreText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});