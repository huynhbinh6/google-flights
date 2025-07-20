import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type FlightTicketProps = {
  from: string;
  to: string;
  departureTime: string;
  flightCode: string;
  duration: string;
  price: string;
  onPress?: () => void;
};

const FlightTicket: React.FC<FlightTicketProps> = ({
  from,
  to,
  departureTime,
  flightCode,
  duration,
  price,
  onPress,
}) => {
  return (
    <View style={styles.ticket}>
      <View style={styles.row}>
        {/* FROM */}
        <View>
          <Text style={styles.label}>From</Text>
          <Text style={styles.city}>{from}</Text>
          <Text style={styles.depart}>{departureTime}</Text>
        </View>

        {/* CENTER - AIRLINE & DURATION */}
        <View style={styles.center}>
          <View style={styles.logo} />
          <Text style={styles.duration}>{duration}</Text>
          <FontAwesome name="plane" size={20} color="white" />
        </View>

        {/* TO */}
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.city}>{to}</Text>
          <Text style={styles.depart}>{flightCode}</Text>
        </View>
      </View>

      <View style={styles.rowBottom}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.viewDetails} onPress={onPress}>View Details</Text>
      </View>
    </View>
  );
};

export default FlightTicket;

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: '#1B355D',
    borderRadius: 20,
    padding: 20,
    // margin: 16,
    // width: width - 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 12,
  },
  city: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  depart: {
    color: '#ccc',
    fontSize: 14,
  },
  center: {
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 20,
    backgroundColor: '#F8C21C',
    borderRadius: 4,
    marginBottom: 4,
  },
  duration: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewDetails: {
    color: '#4AB6F5',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
