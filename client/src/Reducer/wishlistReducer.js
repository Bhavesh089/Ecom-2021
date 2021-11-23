export function wishlistReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return action.payload;
    default:
      return state;
  }
}
