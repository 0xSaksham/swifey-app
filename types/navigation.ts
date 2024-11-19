import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define the root stack parameter list
export type RootStackParamList = {
  index: undefined;
  profile: undefined;
  explore: undefined;
  user: {
    id: string;
  };
  "user/[id]": {
    id: string;
  };
};

// Export screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Define commonly used navigation prop types
export type NavigateToUser = {
  id: string;
};

// Define route params for specific screens
export type UserScreenParams = {
  id: string;
};
