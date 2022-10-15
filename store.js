import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import actionCreators from "./actions/contactActions";
import contactReducers from "./redux";

const composeEnhancers = composeWithDevTools({
    actionCreators,
    trace: true,
    traceLimit: 25,
});
const store = createStore(
  contactReducers,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;