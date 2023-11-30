import Auth from "@src/views/Auth/store";
import headPostOffices from "@src/views/HeadPostOffice/store";
import postOffices from "@src/views/PostOffice/store";
import types from "@src/views/Type/store";
import users from "@src/views/User/store";
import zones from "@src/views/Zone/store";

import layout from "./layout";
import navbar from "./navbar";

const rootReducer = {
  navbar,
  layout,
  Auth,
  zones,
  headPostOffices,
  postOffices,
  types,
  users
};

export default rootReducer;
