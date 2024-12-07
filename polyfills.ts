import "react-native-get-random-values";
import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";

// Polyfill crypto.getRandomValues
if (typeof global.crypto !== "object") {
  global.crypto = {
    getRandomValues: (array: ArrayBufferView | null) => {
      if (array === null) return array;
      return expoCryptoGetRandomValues(array as any);
    },
    subtle: undefined as any,
    randomUUID: undefined as any,
  };
}
