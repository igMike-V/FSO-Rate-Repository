import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e1e4e8",
  },
  text: {
    color: "blue",
    fontSize: 24,
    fontWeight: "700",
  },
  separator: {
    height: 10,
  },
  dropdown: {
    backgroundColor: "#cccccc",
  },
});

const pickerData = [
  { label: "Latest repositories", value: "latest" },
  { label: "Highest rated repositories", value: "highest" },
  { label: "Lowest rated repositories", value: "lowest" },
];

const ItemSeparator = () => <View style={styles.separator} />;

const PickerComponent = ({ setFilter }) => {
  const [value, setValue] = useState("latest");

  const handleChange = (value) => {
    setValue(value);
    switch (value.value) {
      case "latest":
        setFilter({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
      case "highest":
        setFilter({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
        break;
      case "lowest":
        setFilter({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
        break;
      default:
        setFilter({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        data={pickerData}
        value={value}
        labelField="label"
        valueField="value"
        styles={styles.dropdown}
        onChange={(value) => handleChange(value)}
      />
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, setFilter }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItems = ({ item }) => {
    return <RepositoryItem item={item} />;
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItems}
      ListHeaderComponent={<PickerComponent setFilter={setFilter} />}
    />
  );
};

const RepositoryList = () => {
  const [filter, setFilter] = useState("latest");
  const { repositories } = useRepositories(filter);
  return (
    <RepositoryListContainer
      repositories={repositories}
      setFilter={setFilter}
    />
  );
};

export default RepositoryList;
