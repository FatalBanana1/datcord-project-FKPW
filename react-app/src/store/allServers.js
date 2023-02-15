//-------------------------------------------------------

//types crud - posts
const READ_ALLSERVERS = `allServers/READ_ALLSERVERS`;
const RESET_ALLSERVERS = "allServers/RESET_ALLSERVERS";

//-------------------------------------------------------

// Actions

// GET
const actionReadAllAllServers = (allServers) => ({
	type: READ_ALLSERVERS,
	allServers,
});

// RESET
export const actionResetServers = () => ({
	type: RESET_ALLSERVERS,
});

//-------------------------------------------------------

//thunk actions

// GET: Get All Servers
// Route: /api/servers
export const thunkReadAllAllServers = () => async (dispatch) => {
	let response = await fetch(`/api/servers/`);

	if (response.ok) {
		const data = await response.json();
		dispatch(actionReadAllAllServers(data));
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

//-------------------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	return initialState;
}

const allServerReducer = (state = defaultState(), action) => {
	let newState;

	switch (action.type) {
		case READ_ALLSERVERS:
			console.log(`reducer-----`, action);
			newState = {};
			action.allServers.servers.forEach((el) => (newState[el.id] = el));
			return newState;

		case RESET_ALLSERVERS:
			return defaultState();

		default:
			return state;
	}
};

export default allServerReducer;

// csrf_token=IjVkZjRlYzU2NmQxNzRiZGM4OTQ3MGRhZTY4MTkwZmFjNGFmZmFkYTgi.Y-hzpg.ctI5nOaFhjP6gSRDBvqjfqytRWQ; HttpOnly; Path
