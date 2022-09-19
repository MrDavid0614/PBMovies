import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../common/styles";
import { SearchMovieDTO } from "../common/types";

type SearchProps = {
  onSearch: ({ title }: SearchMovieDTO) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
  const [keyword, setKeyword] = useState("");

  const handleOnSearch = () => onSearch({ title: keyword });

  return (
    <View style={[globalStyles.marginHorizontal, styles.searchContainer]}>
      <TextInput
        defaultValue={keyword}
        onChangeText={setKeyword}
        placeholder="Search movie"
        style={styles.input}
        onEndEditing={handleOnSearch}
      />
      <TouchableOpacity onPress={handleOnSearch} style={styles.searchButton}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginRight: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
  },
  searchButton: {
    justifyContent: "center",
    backgroundColor: "#97D2EC",
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
