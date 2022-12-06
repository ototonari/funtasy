export const MapConverter = {
  stringify: <T>(map: Map<string, T>) => {
    // stringify
    return JSON.stringify(map, (k, v) => {
      if (v instanceof Map) {
        return {
          dataType: "Map",
          value: [...v],
        };
      }
      return v;
    });
  },

  parse: <T>(json): Map<string, T> => {
    // parse
    return JSON.parse(json, (k, v) => {
      if (typeof v === "object" && v !== null) {
        if (v.dataType === "Map") {
          return new Map(v.value);
        }
      }
      return v;
    });
  },
};
