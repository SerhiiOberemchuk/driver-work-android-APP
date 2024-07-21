import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import {
  addTrack,
  addUser,
  TABLE_USER,
} from "@/components/DatabaseManager/dataBaseUi";
import { useSQLiteContext } from "expo-sqlite";

export default function TabTwoScreen() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [track, setTrack] = useState("");
  const [trailer, setTrailer] = useState("");
  const dataDriver = useSQLiteContext();

  useEffect(() => {}, []);

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
        ></TextInput>
        <TextInput
          placeholder="Cognome"
          style={styles.input}
          onChangeText={setSurname}
          value={surname}
        ></TextInput>
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
        ></TextInput>
        <TextInput
          placeholder="Rimorchio"
          style={styles.input}
          onChangeText={setTrailer}
          value={trailer}
        ></TextInput>
        <Button
          onPress={handleSaveTrack}
          title="Salva camion"
          color="#841500"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
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
