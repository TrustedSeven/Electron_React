import Fuse from "fuse.js";

const PageListSearchPattern = {
  TASKS: ["keyword", "mode", "profile", "size", "proxy", "status"],
  PROFILE: [
    "cardDetails.profileName",
    "cardDetails.cardName",
    "cardDetails.cardNumber",
    "cardDetails.cardCVV",
    "cardDetails.cardExpiryMonth",
    "cardDetails.cardExpiryYear",
    "cardDetails.email",
    "cardDetails.phone",
    "shippingDetails.fName",
    "shippingDetails.lName",
    "shippingDetails.address1",
    "shippingDetails.address2",
    "shippingDetails.city",
    "shippingDetails.province",
    "shippingDetails.postalCode",
  ],
  ACCOUNT: ["account"],
};

/**
 * function that search in array of objects
 * @param {String} searchText
 * @param {Array} searchInList
 * @param {String} searchKey
 * @returns  An array of search results
 */
export const searchInArrayFunction = ({
  searchText = "",
  searchInList = [],
  searchKey = "TASKS" || "PROFILE" || "ACCOUNT",
}) => {
  const fuse = new Fuse(searchInList, {
    keys: PageListSearchPattern[searchKey],
    isCaseSensitive: false,
  });
  return fuse.search(searchText).map((search) => search["item"]);
};
