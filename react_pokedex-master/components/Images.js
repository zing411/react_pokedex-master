import { Image } from "react-native";
const Images = ({ imageUrl }) => {
  return (
    <Image
      source={{
        uri: imageUrl || "../assets/placeholder.png",
      }}
      style={{ width: 200, height: 200 }}
    />
  );
};

export default Images;
