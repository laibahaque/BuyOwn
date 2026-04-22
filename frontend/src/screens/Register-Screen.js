import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For eye icon

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Animation for background
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#5C708A', '#253347'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* App Name at top */}
      <Text style={styles.appName}>BuyOwn</Text>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          {/* Register title inside card */}
          <Text style={styles.title}>Create your account!</Text>

          {/* Name input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />
          </View>

          {/* Email input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#999"
            />
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#333"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? 'eye-off' : 'eye'}
                  size={20}
                  color="#333"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Agree to Terms checkbox */}
          <View style={styles.row}>
            <View style={styles.rememberMe}>
              <Switch value={agreeTerms} onValueChange={setAgreeTerms} />
              <Text style={styles.rememberText}>
                I agree to the Terms of Service
              </Text>
            </View>
          </View>

          {/* Register button */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('ProductListHome')}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Or Signup with */}
          <Text style={styles.orText}>Or Signup with</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBox}>
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBox}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBox}>
              <Ionicons name="logo-windows" size={24} color="#00A4EF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 50,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30, // prevents bottom cutoff : scrolling
  },
  card: {
    width: '95%',
    maxWidth: 400,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 20,
    elevation: 5,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    paddingLeft: 10,
    paddingRight: 10,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 0,
  },
  rememberText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#253347',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#555',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  socialBox: {
    width: 80,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
