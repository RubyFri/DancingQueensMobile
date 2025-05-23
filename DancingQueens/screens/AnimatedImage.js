import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

export default function AnimatedImage({ imagePaths }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 200);
    return () => clearInterval(interval);
  }, [imagePaths.length]);

  return (
    <Image
      source={imagePaths[currentImageIndex]}
      resizeMode="contain"
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flexDirection: "row",
    justifyContent: "center",
    width: 150,
    height: 300,
    flexWrap: "wrap",
    margin: "10%",
    marginBottom: 20,
    elevation: 3,
  },
});