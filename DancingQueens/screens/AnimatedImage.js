import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import MultiImage from "./MultiImage";

export default function AnimatedImage({ imagePathsArr }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePathsArr[0].length);
    }, 350);
    return () => clearInterval(interval);
  }, [imagePathsArr[0].length]);

  return (
    <MultiImage images={imagePathsArr.map((paths) => (paths[currentImageIndex]))}/>
  );
}