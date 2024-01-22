import { createStore } from "redux";
import rootReducer from "./reducers"; // import your root reducer

const store = createStore(rootReducer);

export default store;
