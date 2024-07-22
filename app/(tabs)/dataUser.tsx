import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState, useCallback } from "react";
import { addTrack, addUser } from "@/components/DatabaseManager/dataBaseUi";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";
import {
  Driver,
  TABLE_TRACK,
  TABLE_USER,
  Track,
} from "@/components/DatabaseManager/types";

export default function TabTwoScreen() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [track, setTrack] = useState("");
  const [trailer, setTrailer] = useState("");
  const db = useSQLiteContext();
  const [latestUser, setLatestUser] = useState<Driver | null>(null);
  const [latestTrack, setLatestTrack] = useState<Track | null>(null);

  useFocusEffect(
    useCallback(() => {
      function fetchLatestUser() {
        const result = db.getAllSync<Driver>(`SELECT * FROM ${TABLE_USER}`);
        if (result.length > 0) {
          const user = result.slice(-1)[0];
          setLatestUser(user);
          setName(user.name);
          setSurname(user.surname);
        }
      }

      function fetchLatestTrack() {
        const result = db.getAllSync<Track>(`SELECT * FROM ${TABLE_TRACK}`);
        if (result.length > 0) {
          const track = result.slice(-1)[0];
          setLatestTrack(track);
          setTrack(track.track);
          setTrailer(track.trailer);
        }
      }

      fetchLatestUser();
      fetchLatestTrack();
    }, [db])
  );

  const handleSave = () => {
    addUser(name, surname);
  };

  const handleSaveTrack = () => {
    addTrack(track, trailer);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scrivi tuoi dati</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="Cognome"
          style={styles.input}
          onChangeText={setSurname}
          value={surname}
        />
        <Button
          onPress={handleSave}
          title="Salvare"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <TextInput
          placeholder="Camion"
          style={styles.input}
          onChangeText={setTrack}
          value={track}
        />
        <TextInput
          placeholder="Rimorchio"
          style={styles.input}
          onChangeText={setTrailer}
          value={trailer}
        />
        <Button
          onPress={handleSaveTrack}
          title="Salva camion"
          color="#841500"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      {latestUser && (
        <View>
          <Text>
            Latest User: {latestUser.name} {latestUser.surname}
          </Text>
        </View>
      )}
      {latestTrack && (
        <View>
          <Text>
            Latest Track: {latestTrack.track} {latestTrack.trailer}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    marginBottom: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "80%",
  },
});
