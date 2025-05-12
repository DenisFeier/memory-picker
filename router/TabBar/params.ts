import { NavigatorScreenParams } from "@react-navigation/native";
import { FindPeopleParamList } from "../FindPeopleStack/FindPeopleParams";

export type TabBarParams = {
  Home: undefined;
  Camera: undefined;
  Profile: undefined;
  'Find People': NavigatorScreenParams<FindPeopleParamList>;
};