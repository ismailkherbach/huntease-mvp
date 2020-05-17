import { combineReducers } from "redux";
import settings from "./settings/reducer";
import authUser from "./auth/reducer";
import dashboard from "./app/dashboard/reducers";
import team from "./app/team/reducers";
import guide from "./app/guide/reducers";
import call from "./app/calls/reducers";
const reducers = combineReducers({
  settings,
  authUser,
  dashboard,
  team,
  guide,
  call,
});

export default reducers;
