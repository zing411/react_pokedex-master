import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { endPoint } from "../constant";

const Detail = ({ route, navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const { id } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [abilityData, setAbilityData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [heldItemData, setHeldItemData] = useState([]);
  const [spriteUrl, setSpriteUrl] = useState("");
  const [encounterData, setEncounterData] = useState([]);

  const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);

        // Getting encounter data
        const encounterResponse = await axios.get(
          response.data.location_area_encounters
        );
        setEncounterData(encounterResponse.data);

        // Getting ability data
        setAbilityData(
          response.data.abilities.map((item) => item.ability.name)
        );

        // Getting type data
        setTypeData(response.data.types);

        // Getting species data
        setSpeciesData(response.data.species);

        // Getting held item data
        if (response.data.held_items && response.data.held_items.length > 0) {
          const heldItemResponse = await axios.get(
            response.data.held_items[0].item.url
          );
          setHeldItemData(heldItemResponse.data);
        } else {
          setHeldItemData({ name: "no item" });
        }

        // Getting sprite URL
        setSpriteUrl(response.data.sprites.front_default);
        // setSpriteUrl(response.data.sprites.other.showdown.front_default);

        if (response.data.held_items && response.data.held_items.length > 0) {
          const heldItemName = response.data.held_items[0].item.name;
          setHeldItemData(heldItemName);
        }
      } catch (error) {
        console.error("Error fetching Pokemon Held item:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleOpen2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleOpen3 = () => {
    setIsOpen3(!isOpen3);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar backgroundColor="black" />
      <View style={styles.container}>
        <Text style={styles.title}>
          {speciesData ? speciesData.name : "Loading..."}
        </Text>
        <View style={styles.lightBox}>
          <View style={styles.redBox}>
            <View style={styles.circle}>
              {spriteUrl ? (
                <Image
                  source={{ uri: spriteUrl }}
                  style={{ height: 200, width: 200 }}
                />
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.card} onPress={toggleOpen}>
          <Text style={styles.cardHeader}>Description</Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.cardContents}>
            <Text style={styles.cardText}>
              {" "}
              The pokemon here is a{" "}
              {speciesData ? speciesData.name : "Loading..."} a{" "}
              {typeData ? typeData.name : "Loading..."} type. And also may hold
              a {heldItemData ? heldItemData.name : "Loading..."}. The height of{" "}
              {speciesData ? speciesData.name : "Loading..."} is{" "}
              {pokemonData ? pokemonData.height : "Loading..."}ft, and weight is{" "}
              {pokemonData ? pokemonData.weight : "Loading..."}lbs, and for
              defeating one you get{" "}
              {pokemonData ? pokemonData.base_experience : "Loading..."} of base
              experience.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.card} onPress={toggleOpen2}>
          <Text style={styles.cardHeader}>Encouters</Text>
        </TouchableOpacity>

        {isOpen2 && (
          <View style={styles.cardContents}>
            {encounterData.length > 0 ? (
              encounterData.map((encounter, index) => (
                <Text style={styles.cardText} key={index}>
                  {" "}
                  Encountered at: {encounter.location_area.name}
                </Text>
              ))
            ) : (
              <Text>No encounter data available.</Text>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.card} onPress={toggleOpen3}>
          <Text style={styles.cardHeader}>Moves & Ability</Text>
        </TouchableOpacity>

        {isOpen3 && (
          <View style={styles.cardContents}>
            <Text style={styles.cardText}>
              Some of the moves {speciesData ? speciesData.name : "Loading..."}{" "}
              know are:
            </Text>
            {pokemonData &&
              pokemonData.moves.slice(0, 4).map((move, index) => (
                <Text style={styles.cardText} key={index}>
                  {move.move.name}
                </Text>
              ))}
            <Text style={styles.cardText}>
              {speciesData ? speciesData.name : "Loading..."} ability is:{" "}
              {abilityData ? abilityData.name : "Loading..."}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#e6d596",
    backgroundColor: "#4C3434",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    borderColor: "black",
    borderWidth: 4,
    paddingTop: 10,
    marginTop: 10,
    textTransform: "uppercase",
  },
  container: {
    flex: 1,
    backgroundColor: "#cc322a",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  cardContents: {
    padding: 4,
    backgroundColor: "#e6d596",
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    fontSize: 20,
    backgroundColor: "white",
    fontWeight: "bold",
    color: "black",
    width: "100%",
    backgroundColor: "brown",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  lightBox: {
    alignItems: "center",
    backgroundColor: "#a7b9d3",
    height: 300,
    width: "85%",
    margin: 25,
    borderWidth: 25,
    borderColor: "#a7b9d3",
    borderRadius: 10,
  },
  redBox: {
    alignItems: "center",
    backgroundColor: "#b45c64",
    padding: 25,
    height: "100%",
    width: "100%",
    borderRadius: 10,
    position: "relative",
  },
  circle: {
    backgroundColor: "#e6d596",
    padding: 5,
    borderRadius: 200,
    position: "absolute",
    bottom: 20,
  },
});

export default Detail;
