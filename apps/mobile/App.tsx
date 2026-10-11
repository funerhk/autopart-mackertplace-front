import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Autoparts Marketplace Mobile</Text>
          <Text style={styles.subtitle}>
            Base Expo lista con capas compartidas para autenticacion, solicitudes y ofertas.
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Buyer</Text>
            <Text>Buscar piezas, crear solicitudes y revisar pedidos.</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Seller</Text>
            <Text>Recibir solicitudes, enviar cotizaciones y gestionar ventas.</Text>
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f5f2" },
  container: { padding: 20, gap: 12 },
  title: { fontSize: 28, fontWeight: "900", color: "#15202b" },
  subtitle: { color: "#4b5968", marginBottom: 8 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    gap: 4,
  },
  cardTitle: { fontSize: 17, fontWeight: "700", color: "#1e293b" },
});
