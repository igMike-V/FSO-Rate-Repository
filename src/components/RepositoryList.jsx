import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar } from "react-native-paper";

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
    marginTop: 10,
  },
});

const pickerData = [
  { label: "Latest repositories", value: "latest" },
  { label: "Highest rated repositories", value: "highest" },
  { label: "Lowest rated repositories", value: "lowest" },
];

const ItemSeparator = () => <View style={styles.separator} />;

const PickerComponent = ({ filter, setFilter }) => {
  const [value, setValue] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setTimeout(() => {
      setFilter({
        ...filter,
        searchKeyword: searchQuery,
      });
    }, 500);
  };

  const handleChange = (value) => {
    setValue(value);
    switch (value.value) {
      case "latest":
        setFilter({
          ...filter,
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
        });
        break;
      case "highest":
        setFilter({
          ...filter,
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
        });
        break;
      case "lowest":
        setFilter({
          ...filter,
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
        });
        break;
      default:
        setFilter({
          ...filter,
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
        });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onClearIconPress={() => onChangeSearch("")}
      />
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

export const RepositoryListContainer = ({
  repositories,
  setFilter,
  filter,
}) => {
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
      ListHeaderComponent={
        <PickerComponent setFilter={setFilter} filter={filter} />
      }
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
      filter={filter}
    />
  );
};

export default RepositoryList;
