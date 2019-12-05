import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card testID={'card'} style={styles.product}>
      <View testID={'touchableContainer'} style={styles.touchable}>
        <TouchableCmp
          testID={'touchableComp'}
          onPress={props.onSelect}
          useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                <Text style={styles.perDay}>/ {props.time}</Text>
              </View>
            </View>
            <View style={styles.action}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 17,
    marginVertical: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  perDay: {
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
});

export default ProductItem;
