//-------------------------------------------------------

//types crud - posts
const READ_ALL_SERVERS = `servers/READ_ALL`;
const READ_USER_SERVERS = `servers/READ_USER_SERVERS`;
// const READ_SERVER_DETAILS = `server/READ_DETAILS`;
const CREATE_SERVER = `server/CREATE`;
const UPDATE_SERVER = `server/UPDATE`;
const DELETE_SERVER = `server/DELETE`;
const RESET_SERVERS = "servers/RESET_SERVERS";

//-------------------------------------------------------

// Actions

// GET
const actionReadAllServers = (servers) => ({
  type: READ_ALL_SERVERS,
  servers,
});

// GET SERVERS BY USERS
const actionReadUserServers = (servers) => ({
  type: READ_USER_SERVERS,
  servers,
});

// CREATE
const actionCreateServer = (server) => ({
  type: CREATE_SERVER,
  server,
});

// EDIT
export const actionUpdateServer = (serverId, server) => ({
  type: UPDATE_SERVER,
  serverId,
  server,
});

// DELETE
export const actionDeleteServer = (server) => ({
  type: DELETE_SERVER,
  server,
});

// RESET
export const actionResetServers = () => ({
  type: RESET_SERVERS,
});

//-------------------------------------------------------

//thunk actions

// GET: Get All Servers
// Route: /api/servers
export const thunkReadAllServers = () => async (dispatch) => {
  let response = await fetch(`/api/servers/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionReadAllServers(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// GET: Get ALL Servers by user id
export const thunkReadUserServers = () => async (dispatch) => {
  let response = await fetch(`/api/servers/user`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(actionReadUserServers(servers.servers));
    return servers.servers;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// CREATE
export const thunkCreateServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });

  if (response.ok) {
    const newServer = await response.json();
    dispatch(actionCreateServer(newServer.server));
    return newServer.server;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// EDIT
export const thunkUpdateServer = (serverId, server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });

  if (response.ok) {
    const updatedServer = await response.json();
    dispatch(actionUpdateServer(serverId, updatedServer.server));
    // console.log("EDIT THUNK==============>", updatedServer);
    return updatedServer.server;
  } else if (response.status < 500) {
    const data = await response.json();
    // console.log("EDIT THUNK ELSE IF ==========>", data);
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// DELETE
export const thunkDeleteServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  // console.log("DELETE THUNK", response);
  if (response.ok) {
    const deletedServer = await response.json(); // { server : { ... }}
    // console.log("response ok", deletedServer.server);
    // TO DO:  import actionDeleteChannel, dispatch delete action for each channel in deletedServer.server.channels
    // OR: Create new channel action to reset channel store
    dispatch(actionDeleteServer(deletedServer.server));
    return deletedServer.server;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//-------------------------------------------------------

//reducer

function defaultState() {
  const initialState = {};
  return initialState;
}

const serverReducer = (state = defaultState(), action) => {
  let newState;

  switch (action.type) {
    case READ_ALL_SERVERS:
      // console.log(`reducer-----`, action);
      newState = {};
      action.servers.servers.forEach((el) => (newState[el.id] = el));
      return newState;

    case READ_USER_SERVERS:
      // console.log(`REDUCER - user  servers >>>>>>>>>`, action);
      newState = { ...state };
      if (action.servers && action.servers.length) {
        action.servers.forEach((el) => (newState[el.id] = el));
      }
      // newState.userServers = action.servers;
      return newState;

    case CREATE_SERVER:
      // console.log("CREATE THUNK++++++++++++++>>>>>>>>>>>>", action);
      newState = { ...state };
      newState[action.server.id] = action.server;
      return newState;

    case DELETE_SERVER:
      // console.log(`DELETE reducer====>>>>>`);
      newState = { ...state };
      // remove deleted server from server store
      // console.log("DELETE REDUCER");
      // console.log("ID TO DELETE", action.server.id);
      // console.log(newState);
      delete newState[action.server.id];
      // console.log("NEW STATE", newState);
      return newState;

    case UPDATE_SERVER:
      // console.log(`UPDATE reducer====>>>>>`);
      newState = { ...state };
      newState[action.server.id] = action.server;
      // console.log("NEW UPDATE STATE==============>>>>", action.server);
      return newState;

    case RESET_SERVERS:
      return defaultState();

    default:
      return state;
  }
};

export default serverReducer;

// csrf_token=IjVkZjRlYzU2NmQxNzRiZGM4OTQ3MGRhZTY4MTkwZmFjNGFmZmFkYTgi.Y-hzpg.ctI5nOaFhjP6gSRDBvqjfqytRWQ; HttpOnly; Path
