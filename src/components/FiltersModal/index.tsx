import React from "react";
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { globalStyles } from "../../common/styles";
import { GetNowPlayingMoviesDTO, MovieCategory } from "../../common/types";
import { useCategories } from "../../hooks/useCategories";
import { useFilter } from "../../hooks/useFilter";

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters?: (dto: GetNowPlayingMoviesDTO) => Promise<void>;
};

export const FiltersModal = ({
  isVisible,
  onApplyFilters,
  onClose,
}: CustomModalProps) => {
  const { filters, updateFilters, clearFilters } = useFilter();
  const categories = useCategories();

  const handleOnCheckCategory = (
    isChecked: boolean,
    category: MovieCategory
  ) => {
    if (isChecked) {
      return updateFilters({
        withGenres: filters.withGenres
          ? filters.withGenres.concat(category.id)
          : [],
      });
    }

    updateFilters({
      withGenres: filters.withGenres
        ? filters.withGenres.filter((genreId) => genreId !== category.id)
        : [],
    });
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require("../../assets/close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          <Text
            style={[globalStyles.title, { fontSize: 16, marginVertical: 20 }]}
          >
            Categories
          </Text>
          {categories.map((category) => (
            <BouncyCheckbox
              key={category.id}
              isChecked={
                filters.withGenres && filters.withGenres.includes(category.id)
              }
              text={category.name}
              textStyle={styles.checkboxTextStyle}
              style={{ marginBottom: 10 }}
              onPress={(isChecked) =>
                handleOnCheckCategory(isChecked, category)
              }
            />
          ))}
        </ScrollView>
        <View style={styles.modalFooter}>
          <Button
            title="Apply filters"
            onPress={() => {
              onApplyFilters && onApplyFilters(filters);
              onClose();
            }}
          />
          <TouchableHighlight
            onPress={() => {
              clearFilters();
              onClose();
            }}
            style={styles.clearFiltersButton}
          >
            <Text>CLEAR FILTERS</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {},
  checkboxTextStyle: { textDecorationLine: "none" },
  closeIcon: {
    width: 30,
    height: 30,
  },
  modalFooter: {},
  clearFiltersButton: {
    marginTop: 10,
    padding: 5,
    alignItems: "center",
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
});
