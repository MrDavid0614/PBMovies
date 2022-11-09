import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../../common/styles";
import { GetNowPlayingMoviesDTO } from "../../common/types";
import { FiltersModal } from "../FiltersModal";

type MoviesSectionHeaderProps = {
  sectionTitle: string;
  haveFilter?: boolean;
  sortBy: GetNowPlayingMoviesDTO["sortBy"];
  handleOnApplyFilters?: (dto: GetNowPlayingMoviesDTO) => Promise<void>;
  handleOnSortByChange: React.Dispatch<
    React.SetStateAction<GetNowPlayingMoviesDTO["sortBy"]>
  >;
};

const dropDownOptions = ["Rating", "Name", "Release Year"];

const SortOptionsValues: Record<string, GetNowPlayingMoviesDTO["sortBy"]> = {
  Rating: "popularity.desc",
  Name: "original_title.asc",
  "Release Year": "release_date.desc",
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
        {dropDownOptions.map((option) => (
          <Picker.Item label={option} value={SortOptionsValues[option]} />
        ))}
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
