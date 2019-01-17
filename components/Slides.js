import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import { Button} from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1 ) {
      return (
        <Button
          title="Let's go!"
          raised
          buttonStyle={styles.buttonstyle}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
      <View key={slide.text} style={styles.slideStyle, {backgroundColor: slide.color}}>
        <Text style={styles.textStyle}>{slide.text}</Text>

        {this.renderLastSlide(index)}
      </View>
      );
    });
  }


  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1}}
        pagingEnabled
      >

        {this.renderSlides()}
      </ScrollView>
    );
  }
}

 const styles= {
   textStyle: {
     fontSize: 30,
     color: 'white'
   },
   slideStyle: {
     flex: 1,
     width: SCREEN_WIDTH,
     justifyContent: 'center',
     alignItems: 'center'
   },
   buttonStyle: {
     backgroundColor: '#0288D1',
     marginTop: 15,
   }
 };

export default Slides;
