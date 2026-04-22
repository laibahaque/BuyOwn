import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";

// Mock Data for the last month
const initialOrders = [
  {
    id: "101",
    date: "2026-04-10",
    items: "HP Elitebook, Dell XPS",
    total: 1250.0,
    status: "Delivered",
  },
  {
    id: "102",
    date: "2026-04-05",
    items: "Logitech Mouse",
    total: 45.99,
    status: "Shipped",
  },
  {
    id: "103",
    date: "2026-03-25",
    items: "Laptop Stand, USB-C Hub",
    total: 89.0,
    status: "Processing",
  },
  {
    id: "104",
    date: "2026-03-25",
    items: "Laptop Stand, USB-C Hub",
    total: 89.0,
    status: "Delivered",
  },
];

const MyOrdersScreen = () => {
  const [orders] = useState(initialOrders);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <View style={[styles.statusBadge, 
          { backgroundColor: item.status === 'Delivered' ? '#D1FAE5' : '#FEF3C7' }]}>
          <Text style={[styles.statusText, 
            { color: item.status === 'Delivered' ? '#065F46' : '#92400E' }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.itemText}>{item.items}</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderId}>Order ID: #{item.id}</Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Showing orders from the last 30 days</Text>
      </View>

      {/* DATE PICKER PLACEHOLDER */}
      <TouchableOpacity style={styles.filterSection} activeOpacity={0.7}>
        <View style={styles.filterLeft}>
          <Text style={styles.calendarIcon}>📅</Text>
          <Text style={styles.filterText}>Select Date Range (From - To)</Text>
        </View>
        <Text style={styles.arrowIcon}>▼</Text>
      </TouchableOpacity>

      {/* ORDERS LIST */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found in the last month.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 50,   
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 4,
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  arrowIcon: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderDate: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 12,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 13,
    color: COLORS.secondary,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.secondary,
    fontSize: 16,
  },
});