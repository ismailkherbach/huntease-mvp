import { combineReducers } from "redux";
import settings from "./settings/reducer";
import authUser from "./auth/reducer";
import dashboard from "./app/dashboard/reducers";
const reducers = combineReducers({
  settings,
  authUser,
  dashboard
});

export default reducers;
