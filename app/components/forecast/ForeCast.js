import { StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useForecastData } from "../../store/forecastData-context";

import ForecastDetail from "./ForecastDetail";
import ForecastList from "./ForecastList";
import DateAndTime from "./DateAndTime";

const ForeCast = () => {
  const { data } = useForecastData();

  const [lineNoCityCountryText, setLineNoCityCountryText] = useState(1);
  const [lineNoWeatherText, setLineNoWeatherText] = useState(1);

  return (
    <View style={styles.container}>
      <Animated.Text
        numberOfLines={lineNoCityCountryText}
        entering={FadeInDown.delay(150)}
        style={styles.location}
        onPress={() => setLineNoCityCountryText((pre) => (pre === 1 ? 0 : 1))}
      >
        {data?.location?.name},
        <Text style={styles.locationCountry}>
          {" " + data?.location?.country}
        </Text>
      </Animated.Text>
      <DateAndTime />
      <View style={styles.imageContainer}>
        <Animated.Image
          entering={FadeInDown.delay(250)}
          style={styles.image}
          source={{ uri: `https://${data?.current?.condition?.icon}` }}
        />
      </View>
      <View style={styles.WeatherInfoContainer}>
        <Animated.Text entering={FadeInDown.delay(300)} style={styles.degree}>
          {data?.current?.temp_c}&#176;
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(350)}
          style={styles.condition}
          numberOfLines={lineNoWeatherText}
          onPress={() => setLineNoWeatherText((pre) => (pre === 1 ? 0 : 1))}
        >
          {data?.current?.condition?.text}
        </Animated.Text>
      </View>
      <ForecastDetail data={data} />
      <ForecastList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  location: {
    textAlign: "center",
    fontSize: hp("2.5%"),
    color: "#fff",
    fontFamily: "openSansSemiBold",
    paddingVertical: hp("1%"),
    width: wp("90"),
    alignSelf: "center",
  },
  locationCountry: {
    color: "#fff",
    fontFamily: "openSans",
  },
  imageContainer: {
    marginVertical: hp("2%"),
  },
  image: {
    width: hp("25%"),
    height: hp("30%"),
    alignSelf: "center",
  },
  WeatherInfoContainer: {
    paddingHorizontal: hp("2.5%"),
  },
  degree: {
    fontSize: hp("5%"),
    color: "#fff",
    textAlign: "center",
    fontFamily: "openSansBold",
  },
  condition: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "openSans",
    fontSize: hp("2.5%"),
    marginBottom: hp("3%"),
  },
});

export default memo(ForeCast);
