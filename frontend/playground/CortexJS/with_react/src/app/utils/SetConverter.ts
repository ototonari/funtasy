export const SetConverter = {
  stringify: <T>(set: Set<T>) => {
    // stringify
    return JSON.stringify(set, (k, v) => {
      if (v instanceof Set) {
        return {
          dataType: "Set",
          value: [...v],
        };
      }
      return v;
    });
  },

  parse: <T>(json): Set<T> => {
    // parse
    return JSON.parse(json, (k, v) => {
      if (typeof v === "object" && v !== null) {
        if (v.dataType === "Set") {
          return new Set(v.value);
        }
      }
      return v;
    });
  },
};
