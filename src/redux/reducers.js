import { combineReducers } from "redux";
import settings from "./settings/reducer";
import authUser from "./auth/reducer";
import dashboard from "./app/dashboard/reducers";
import team from "./app/team/reducers";
const reducers = combineReducers({
  settings,
  authUser,
  dashboard,
  team,
});

export default reducers;
