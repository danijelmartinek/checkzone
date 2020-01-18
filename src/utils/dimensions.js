import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return Math.round(PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100));
};

const heightPercentageToDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    return Math.round(PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100));
};

export {
  widthPercentageToDP,
  heightPercentageToDP
};