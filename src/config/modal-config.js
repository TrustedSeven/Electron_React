export const TaskModalSiteLists = [
  { value: "canadacomputers", label: "Canada Computers" },
  { value: "canadiantire", label: "Canadian Tire" },
  { value: "ssense", label: "SSENSE" },
  { value: "ebgames", label: "EB Games" },
  { value: "sdm", label: "Shoppers Drug Mart" },
  { value: "tru", label: "Toys 'R' Us" },
  { value: "chapters", label: "Chapters" },
  { value: "amazon", label: "Amazon CA" },
  { value: "footlockerca", label: "Footlocker CA" },
  { value: "amd", label: "AMD" },
  { value: "sportchek", label: "Sport Chek" },
  { value: "source", label: "Source" },
  { value: "walmartca", label: "Walmart CA" },
  { value: "microsoftca", label: "Microsoft CA" },
  { value: "bestbuyca", label: "BestBuy CA" },
];

export const TaskModeOptions = [
  { value: "safe", label: "Safe" },
  { value: "advanced", label: "Advanced" },
  { value: "turbo", label: "Turbo" },
];

export const SameTaskModalForDifferentSites = [
  "ssense",
  "ebgames",
  "sdm",
  "tru",
  "chapters",
  "canadiantire",
  "microsoftca",
  "footlockerca",
  "amd",
  "sportchek",
  "walmartca",
];

export const extractName = (data) => {
  const { taskSite } = data;
  const KeyToValue = TaskModalSiteLists;
  let index = KeyToValue.findIndex((p) => p.value === taskSite);
  if (index !== -1) {
    let name = KeyToValue[index];
    return name.label;
  }
  return "";
};

export const dateValid = (string = "") => {
  const date = string.match(/\w{3}\s\w{3}\s\d{2}\s\d{4}/);
  const time = string.match(/\d{2}:\d{2}:\w{2}/);
  if (time !== null && date !== null) {
    if (date[0].length > 0 && time[0].length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const profileSelectionList = (list = []) => {
  let arr = [];
  list?.forEach((profile) => {
    if (profile["list"]?.length > 0) {
      for (let j = 0; j < profile["list"]?.length; j++) {
        let obj = {};
        obj["profileGroup"] = profile["title"];
        obj["title"] = profile["list"][j]["cardDetails"]["profileName"];
        obj["id"] = profile["list"][j]["id"];
        arr.push(obj);
      }
    }
  });
  return arr;
};

/**
 * Helper  function to get single slected profile value
 * from profile group
 */
export const getSingleProfileValue = (profileList = [], profileID) => {
  for (let i = 0; i < profileList?.length; i++) {
    for (let j = 0; j < profileList[i]?.list?.length; j++) {
      if (profileList[i]["list"][j]["id"] === profileID) {
        return {
          id: profileID,
          value: profileID,
          label: profileList[i]["list"][j]["cardDetails"]["profileName"],
        };
      }
    }
  }
};
