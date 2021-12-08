/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, Button, Image, StyleSheet, FlatList} from 'react-native';
import SearchIcon from '../../assets/images/icons-search.png';
import {Colors, Helper, Constant, Styles} from '../../styles';
import RecipeItem from './RecipeItemView';
import createStyles from '../../styles/style';
import CustomImageView from '../../components/CustomImageView';
import { SafeAreaView } from 'react-native-safe-area-context';

const baseStyle = createStyles();

const RecipeView = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CustomImageView search />,
      headerStyle: baseStyle.homeHeader,
      headerTitle: Constant.RECIPE,
      headerTitleStyle: baseStyle.homeHeaderTitle,
      headerTitleAlign: 'left',
    });
  }, [navigation]);

  const onRecipeClick = (position) => {
    const screenTitle = Helper.HomeRecipes[position].subtitle;
    navigation.navigate(Constant.RECIPE_LIST, {title: screenTitle});
  };

  return (
    <SafeAreaView style={viewStyle.container}>
      <FlatList
        data={Helper.HomeRecipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <RecipeItem params={item} onClick={() => onRecipeClick(index)} />
          );
        }}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default RecipeView;

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
});
