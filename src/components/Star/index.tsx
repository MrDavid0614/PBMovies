import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const starIcon = require("../../assets/star.png");

type StarProps = {
  selected?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
};

export const Star = ({
  selected,
  containerStyle,
  imageStyle,
  onPress,
}: StarProps) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleOnPress = () => {
    onPress && onPress();
    setIsSelected(!isSelected);
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={handleOnPress}>
        <Image
          source={starIcon}
          style={[
            styles.imageStyles,
            imageStyle,
            isSelected && styles.selectedImageStyles,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  selectedImageStyles: {
    tintColor: "#FFCD01",
  },
});
