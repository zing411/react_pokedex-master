import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome6";
import { assign } from "../slices/selectedIdSlice";
import { endPoint } from "../constant";
import DropDownPicker from "react-native-dropdown-picker";

const SearchModal = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [userInput, setUserInput] = useState("");

  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [types, setTypes] = useState([]);

  const dispatch = useDispatch();

  // Fetch Pokemon Names
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(endPoint.allPokemon);
        const data = await response.json();
        setPokemonData(data.results);
        setMasterData(data.results);
      } catch (error) {
        console.log("Error fetching Pokemon Names", error);
      }
    };
    fetchPokemonNames();
  }, []);

  // Fetch Pokemon Types
  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await fetch(endPoint.type);
        const data = await response.json();
        const types = data.results.map((item) => {
          return { label: item.name.toUpperCase(), value: item.name };
        });
        setTypes(types);
      } catch (error) {
        console.log("Error fetching Pokemon Types", error);
      }
    };
    fetchPokemonTypes();
  }, []);

  // Filter Pokemon by Type
  useEffect(() => {
    if (selectedType) {
      const fetchPokemonByType = async () => {
        try {
          const response = await fetch(
            `${endPoint.type}${selectedType.toLowerCase()}`
          );
          const data = await response.json();
          const pokemon = data.pokemon.map((item) => {
            return { name: item.pokemon.name, url: item.pokemon.url };
          });
          setPokemonData(pokemon);
          setMasterData(pokemon);
        } catch (error) {
          console.log("Error fetching Pokemon by Type", error);
        }
      };
      fetchPokemonByType();
    }
  }, [selectedType]);

  const handleOnPress = (item) => {
    const pokemonId = item.url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "");
    dispatch(assign(parseInt(pokemonId)));
    props.setShow(false);
  };

  const itemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPress(item)}>
        <View style={styles.viewItem}>
          <Text style={styles.textItem}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filterPokemon = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toLowerCase() : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setPokemonData(newData);
      setUserInput(text);
    } else {
      setPokemonData(masterData);
      setUserInput(text);
    }
  };

  return (
    <View style={styles.modalView}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={() => props.setShow(false)}>
          <Icon name="x" size={20} color="#4c3434" />
        </TouchableOpacity>
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Search by Name"
          value={userInput}
          onChangeText={(text) => {
            filterPokemon(text);
          }}
        ></TextInput>
      </View>
      <DropDownPicker
        placeholder="Filter by Type"
        open={isDropDownOpen}
        value={selectedType}
        items={types}
        setOpen={setDropDownOpen}
        setValue={setSelectedType}
        setItems={setTypes}
        style={[
          styles.textInput,
          { width: "95%", backgroundColor: "#e6d596", color: "#4c3434" },
        ]}
      />
      <FlatList
        data={pokemonData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemView}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    height: "80%",
    margin: 20,
    backgroundColor: "#e6d596",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  textInput: {
    borderColor: "#a7b9d3",
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },

  viewItem: {
    padding: 15,
    backgroundColor: "#a7b9d3",
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  textItem: {
    fontSize: 20,
    textTransform: "capitalize",
  },
});
export default SearchModal;
