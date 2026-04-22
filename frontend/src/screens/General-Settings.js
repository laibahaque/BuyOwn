import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

export default function GeneralSettings() {
  const [form, setForm] = useState({
    darkMode: false,
    camera: true,
    location: true,
    microphone: false,
    pushNotifications: true,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAction}>
          <TouchableOpacity>
            <FeatherIcon color="#000" name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={styles.headerTitle}>
          General Settings
        </Text>

        <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
          <TouchableOpacity>
            <FeatherIcon color="#000" name="more-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst, styles.rowLast]}>
              <View style={styles.row}>
                <FeatherIcon name="moon" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Dark Mode</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  value={form.darkMode}
                  onValueChange={(darkMode) =>
                    setForm({ ...form, darkMode })
                  }
                />
              </View>
            </View>
          </View>
        </View>

        {/* Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View style={styles.row}>
                <FeatherIcon name="camera" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Camera</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  value={form.camera}
                  onValueChange={(camera) =>
                    setForm({ ...form, camera })
                  }
                />
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <FeatherIcon name="map-pin" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Location</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  value={form.location}
                  onValueChange={(location) =>
                    setForm({ ...form, location })
                  }
                />
              </View>
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <FeatherIcon name="mic" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Microphone</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  value={form.microphone}
                  onValueChange={(microphone) =>
                    setForm({ ...form, microphone })
                  }
                />
              </View>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <FeatherIcon name="bell" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Push Notifications</Text>

                <View style={styles.rowSpacer} />

                <Switch
                  value={form.pushNotifications}
                  onValueChange={(pushNotifications) =>
                    setForm({ ...form, pushNotifications })
                  }
                />
              </View>
            </View>
          </View>
        </View>

        {/* About / Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About / Help</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity style={styles.row}>
                <FeatherIcon name="file-text" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Terms of Service</Text>

                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity style={styles.row}>
                <FeatherIcon name="lock" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Privacy Policy</Text>

                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity style={styles.row}>
                <FeatherIcon name="help-circle" size={18} color="#444" style={styles.rowIcon} />
                <Text style={styles.rowLabel}>Contact Support</Text>

                <View style={styles.rowSpacer} />
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.contentFooter}>App Version 2.24 #50491</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flexGrow: 1,
  },

  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },

  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  /** Rows */
  rowWrapper: {
    paddingLeft: 16,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  row: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    color: '#000',
  },
  rowSpacer: {
    flex: 1,
  },
});