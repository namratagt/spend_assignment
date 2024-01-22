// src/redux/actions.js
export const saveItemDetails = (itemDetails) => ({
  type: "SAVE_ITEM_DETAILS",
  payload: itemDetails,
});

// src/redux/reducers.js
const initialState = {
  itemDetails: {
    name: "",
    description: "",
    category: "",
    quantity: 0,
    unitPrice: 0,
    manufacturer: "",
    weight: 0,
    storageLocation: "",
    room: "",
    shelf: 0,
    image: "../assets/lcksrw.jpeg", // Assuming you'll save the image file here
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ITEM_DETAILS":
      return {
        ...state,
        itemDetails: {
          ...state.itemDetails,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
