import React from 'react';
import { View,Text, StyleSheet} from 'react-native';
const Title_Subtitle = ({title,subtitle,style}) => {

  
  return (
    <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
    topContainer:{
        marginBottom:10
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 14,
        color:'grey',
        fontWeight: 'regular',
      },
    
});

export default Title_Subtitle;
