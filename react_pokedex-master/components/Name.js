import { View, Text, Image, StyleSheet } from "react-native";
import { lpad } from "../constant";

const Name = (props) => {
  return (
    <View style={styles.nameContainer}>
      <Image
        style={styles.pokeball}
        source={require("../assets/pokeball_icon.png")}
      />
      <Text style={styles.name}>{lpad(props.id, 3, 0)} </Text>
      <Text style={styles.name}>{props.name.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#e6d596",
    width: "100%",
    padding: 10,
    borderColor: "black",
    borderWidth: 4,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  pokeball: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4c3434",
  },
});

export default Name;
