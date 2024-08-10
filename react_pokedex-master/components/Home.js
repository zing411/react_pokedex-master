import { React, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { setPokemon } from "../slices/pokemonSlice";
import { increment, decrement } from "../slices/selectedIdSlice";
import Images from "./Images";
import Icon from "react-native-vector-icons/FontAwesome6";
import Name from "./Name";
import SearchModal from "./SearchModal";

const Home = ({ navigation }) => {
  const pokemon = useSelector((state) => state.pokemon);
  const selectedId = useSelector((state) => state.selectedId);
  const dispatch = useDispatch();

  const translateY = useSharedValue(0);
  const ballOpacity = useSharedValue(0);

  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  //Gesture and Animation
  const handleAnimationStart = (event) => {
    ballOpacity.value = 1;
    setTimeout(() => {
      if (event.velocityX > 0) {
        // Left to Right
        selectedId > 1 ? dispatch(decrement()) : null;
      } else {
        // Rigth to Left
        selectedId < 1025 ? dispatch(increment()) : null;
      }
    }, 500);

    // Start and End animation
    translateY.value = withSequence(
      withTiming(-385, { duration: 500 }),
      withTiming(0, { duration: 500 })
    );
  };

  const handleAnimationEnd = () => {
    setTimeout(() => {
      ballOpacity.value = 0;
    }, 1000);
  };

  const panGesture = Gesture.Pan()
    .onStart(handleAnimationStart)
    .onEnd(handleAnimationEnd);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: ballOpacity.value,
  }));

  // Fetch Pokemon Data from API
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${selectedId}`
        );
        const data = await response.json();
        dispatch(
          setPokemon({
            id: selectedId,
            name: data.name,
            imageUrl: data.sprites?.other["official-artwork"]?.front_default,
          })
        );
      } catch (error) {
        console.log("Error fetching API", error);
      }
    };
    fetchPokemon();
  }, [selectedId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>National Pokédex</Text>
      <GestureDetector gesture={panGesture}>
        <View style={styles.lightBox}>
          <View style={styles.redBox}>
            <View style={styles.pokemonView}>
              <Icon name="chevron-left" size={30} color="#4c3434" />
              <Animated.View style={styles.pokemonImage}>
                {pokemon?.imageUrl ? (
                  <Images imageUrl={pokemon?.imageUrl} height={250} />
                ) : (
                  <ActivityIndicator size="small" color="#0000ff" />
                )}
              </Animated.View>
              <Icon name="chevron-right" size={30} color="#4c3434" />
            </View>
            <Name name={pokemon?.name} id={selectedId} />
            <Animated.View style={[styles.circle, circleAnimatedStyle]}>
              <Image source={require("../assets/pokeball.png")} width={250} />
            </Animated.View>
          </View>
        </View>
      </GestureDetector>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
          style={styles.button}
        >
          <Icon name="magnifying-glass" size={30} color="#4c3434" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Detail", { id: selectedId })}
        >
          <Icon name="circle-info" size={30} color="#4c3434" />
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSearch}
          onRequestClose={() => {
            setModalVisible(!showSearch);
          }}
        >
          <SearchModal setShow={setShowSearch} />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cc322a",
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
  },
  lightBox: {
    alignItems: "center",
    backgroundColor: "#a7b9d3",
    height: "65%",
    width: "90%",
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
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250,
    opacity: 0,
  },
  pokemonView: {
    flexDirection: "row",
    alignItems: "center",
  },
  pokemonImage: {
    backgroundColor: "#e6d596",
    padding: 20,
    borderRadius: 200,
  },
  scrollViewPokemon: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6d596",
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4c3434",
    marginLeft: 10,
  },
});

export default Home;
