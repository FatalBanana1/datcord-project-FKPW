//-------------------------------------------------------

//types crud - posts
const READ_ALL_SERVERS = `servers/READ_ALL`;
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

// GET: Get All Servers by user id
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
  } else if (res.status < 500) {
    const data = await res.json();
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
    dispatch(actionUpdateServer(updatedServer.server));
    return updatedServer.server;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// DELETE
export const thunkDeleteServer = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const deletedServer = await response.json();
    dispatch(actionDeleteServer(deletedServer(serverId)));
    return deletedServer;
  } else if (res.status < 500) {
    const data = await res.json();
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

    case CREATE_SERVER:
      newState = { ...state };
      newState[action.userId] = {
        ...state[action.userId],
        [action.server.id]: action.server,
      };
      return newState;

    case DELETE_SERVER:
      newState = { ...state };
      delete newState[action.id];
      return newState;

    case UPDATE_SERVER:
      newState = { ...state };
      newState[action.serverId] = action.server;
      return newState;

    case RESET_SERVERS:
      return defaultState();

    default:
      return state;
  }
};

export default serverReducer;

// csrf_token=IjVkZjRlYzU2NmQxNzRiZGM4OTQ3MGRhZTY4MTkwZmFjNGFmZmFkYTgi.Y-hzpg.ctI5nOaFhjP6gSRDBvqjfqytRWQ; HttpOnly; Path
