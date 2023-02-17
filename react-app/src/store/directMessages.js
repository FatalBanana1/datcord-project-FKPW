//-------------------------------------------------------

//types crud - posts
const READ_ALL_DIRECT_MESSAGES = `directMessages/READ_ALL`;
const CREATE_DIRECT_MESSAGE = `directMessage/CREATE`;
const UPDATE_DIRECT_MESSAGE = `directMessage/UPDATE`;
const DELETE_DIRECT_MESSAGE = `directMessage/DELETE`;
const RESET_DIRECT_MESSAGES = "directMessages/RESET_DIRECT_MESSAGES";

//-------------------------------------------------------

//regular actions

//read
const actionReadAllDirectMessages = (directMessages) => ({
	type: READ_ALL_DIRECT_MESSAGES,
	directMessages,
});

// CREATE
const actionCreateDirectMImage = (directMessages) => ({
	type: CREATE_DIRECT_MESSAGE,
	directMessages,
});

//edit
const actionEditDirectMessage = (directMessages) => ({
	type: UPDATE_DIRECT_MESSAGE,
	directMessages,
});

//delete
const actionDeleteDirectMessage = (directMessages) => ({
	type: DELETE_DIRECT_MESSAGE,
	directMessages,
});

//reset
export const actionResetDirectMessages = () => ({
	type: RESET_DIRECT_MESSAGES,
});

//-------------------------------------------------------

//thunk actions

// GET: Get All direct messages by user id
// Route: /api/dms
export const thunkReadAllDirectMessages = (friendId) => async (dispatch) => {
	let response = await fetch(`/api/dms/${friendId}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(actionReadAllDirectMessages(data));
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
export const thunkCreateDirectMImage = (payload) => async (dispatch) => {
	const response = await fetch(`/api/cms`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(actionCreateDirectMImage(data));
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

// EDIT: Edit channel messages
// Route: /api/dms/:userId
export const thunkEditDirectMessage = (payload) => async (dispatch) => {
	// console.log(`thunk edit ====`, payload);
	let response = await fetch(`/api/dms/${payload.id}`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(actionEditDirectMessage(data));
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

// DELETE: Delete channel message by channel id
// Route: /api/channel/:serverId/:channelId/cms
export const thunkDeleteDirectMessage = (payload) => async (dispatch) => {
	// console.log(`thunk delete ====`, payload);
	let response = await fetch(`/api/dms/${payload.id}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(actionDeleteDirectMessage(data));
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

const dmReducer = (state = defaultState(), action) => {
	let newState;

	switch (action.type) {
		case READ_ALL_DIRECT_MESSAGES:
			console.log(`reducer-----`, action.directMessages);
			console.log(`reducer-----`, action.directMessages.direct_message);
			newState = { ...state };
			action.directMessages.direct_message.forEach(
				(el) => (newState[el.id] = el)
			);
			return newState;

		case CREATE_DIRECT_MESSAGE:
			newState = { ...state };
			newState[action.directMessages.id] = action.directMessages;
			return newState;

		case DELETE_DIRECT_MESSAGE:
			// console.log(`reducer-----`, action.directMessages.id);
			newState = { ...state };
			delete newState[action.directMessages.id];
			return newState;

		case UPDATE_DIRECT_MESSAGE:
			// console.log(`RED -- update cms ======?>>>>>>>>`, action);
			newState = { ...state };
			newState[action.directMessages.id] = action.directMessages;
			return newState;

		case RESET_DIRECT_MESSAGES:
			return defaultState();

		default:
			return state;
	}
};

export default dmReducer;
