import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Place } from "@screens/search/types";

export type IResultScreenProps = {
  navigation: NavigationProp<any>;
  route: {
    params: {
      searchParams: {
        from: Place;
        to: Place;
        departDate: string;
        returnDate?: string;
        tripType: string | "one-way" | "round-trip";
        passengers: {
          adults: number;
          children: number;
          infants: number;
        };
      };
    };
  };
};
