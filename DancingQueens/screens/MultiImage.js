import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";

export default function MultiImage({ images }) {

  return (
    <View style={styles.row}>
      {images.map((img, index) => (
        <Image key = {index} source={img} style={styles.image}/>
      ) )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flexDirection: "row",
    justifyContent: "center",
    width: 150,
    height: 300,
    flex: 0.3,
    marginBottom: 20,
    elevation: 3,
    resizeMode: "contain"
  },

  row: {
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    padding: 10,
  },
});
