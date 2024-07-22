import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { useFocusEffect } from "expo-router";
import {
  Driver,
  TABLE_TRACK,
  TABLE_USER,
  Track,
} from "@/components/DatabaseManager/types";

export default function TabOneScreen() {
  const [user, setUser] = useState<Driver>();
  const [track, setTrack] = useState<Track>();
  const db = useSQLiteContext();

  useFocusEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Driver>(
        `SELECT * FROM ${TABLE_USER}`
      );
      setUser(result.slice(-1)[0]);
    }
    setup();
  });
  useFocusEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Track>(
        `SELECT * FROM ${TABLE_TRACK}`
      );
      setTrack(result.slice(-1)[0]);
    }
    setup();
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Autista</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Nome:{user?.name}</Text>
        <Text>Cognome:{user?.surname}</Text>
      </View>
      <View>
        <Text style={styles.title}>Mezzo</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Camion:{track?.track}</Text>
        <Text>Rimorchio:{track?.trailer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
