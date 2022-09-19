import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../common/styles";
import { GetNowPlayingMoviesDTO } from "../common/types";
import { FiltersModal } from "./FiltersModal";

type MoviesSectionHeaderProps = {
  sectionTitle: string;
  haveFilter?: boolean;
  sortBy: GetNowPlayingMoviesDTO["sortBy"];
  handleOnApplyFilters?: (dto: GetNowPlayingMoviesDTO) => Promise<void>;
  handleOnSortByChange: React.Dispatch<
    React.SetStateAction<GetNowPlayingMoviesDTO["sortBy"]>
  >;
};

export const MoviesSectionHeader = ({
  sectionTitle,
  haveFilter = false,
  sortBy,
  handleOnSortByChange,
  handleOnApplyFilters,
}: MoviesSectionHeaderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={globalStyles.titleSection}>
      <Text style={globalStyles.title}>{sectionTitle}</Text>
      <Picker
        selectedValue={sortBy}
        onValueChange={handleOnSortByChange}
        mode="dropdown"
        style={{ width: 200 }}
      >
        <Picker.Item label="Rating" value="popularity.desc" />
        <Picker.Item label="Name" value="original_title.asc" />
        <Picker.Item label="Release Year" value="release_date.desc" />
      </Picker>
      {haveFilter && (
        <>
          <Button
            title="Filter"
            color="#a8d38b"
            onPress={() => setIsModalVisible(true)}
          />
          <FiltersModal
            isVisible={isModalVisible}
            onApplyFilters={handleOnApplyFilters}
            onClose={() => setIsModalVisible(false)}
          />
        </>
      )}
    </View>
  );
};
