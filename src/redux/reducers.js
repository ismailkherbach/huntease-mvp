import { combineReducers } from "redux";
import settings from "./settings/reducer";
import authUser from "./auth/reducer";
import dashboard from "./app/dashboard/reducers";
import team from "./app/team/reducers";
import guide from "./app/guide/reducers";
import call from "./app/calls/reducers";
import payment from "./app/payment/reducers";
const reducers = combineReducers({
  settings,
  authUser,
  dashboard,
  team,
  guide,
  call,
  payment,
});

export default reducers;
