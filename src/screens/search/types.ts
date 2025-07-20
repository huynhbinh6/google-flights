import { NavigationProp, RouteProp } from "@react-navigation/native";

export type IDeparture = {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams?: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
};

export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface RelevantParams {
  skyId?: string;
  entityId: string;
  flightPlaceType?: string;
  localizedName: string;
  entityType?: string;
}

export interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantParams;
  relevantHotelParams: RelevantParams;
}

export interface Place {
  presentation: Presentation;
  navigation: Navigation;
}

export interface CurrentPlace extends Place {
  skyId?: string;
}

export interface LocationData {
  current: CurrentPlace;
  nearby: Place[];
  recent: Place[];
}

export interface ApiResponse {
  status: boolean;
  timestamp: number;
  data: LocationData;
}

export type ISearchScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};
