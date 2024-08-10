export const endPoint = {
  allPokemon: "https://pokeapi.co/api/v2/pokemon/?limit=1025",
  pokemon: "https://pokeapi.co/api/v2/pokemon/",
  mainImage:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
  type: "https://pokeapi.co/api/v2/type/",
};

export const lpad = function (s, width, char) {
  return s.length >= width
    ? s
    : (new Array(width).join(char) + s).slice(-width);
};
