import { useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

import { getAPNSToken, requestNotificationPermission } from 'react-native-apns';

export default function AppAPNsExample() {
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState(false);

  const handleRequest = async () => {
    const granted = await requestNotificationPermission();

    setPermission(granted);

    if (granted) {
      try {
        const apns = await getAPNSToken();

        setToken(apns);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Permission Denied!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 APNS Notifications Example</Text>
      <Button title="Request Permission" onPress={handleRequest} />
      {permission !== null && (
        <Text style={styles.text}>
          Permission: {permission ? 'Granted ✅' : 'Denied ❌'}
        </Text>
      )}
      {token && (
        <>
          <Text style={styles.subtitle}>APNs Token:</Text>
          <Text selectable style={styles.token}>
            {token}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  subtitle: { fontSize: 16, marginTop: 16, fontWeight: '600' },
  text: { marginTop: 10 },
  token: {
    marginTop: 6,
    fontFamily: 'monospace',
    fontSize: 12,
    textAlign: 'center',
  },
});
