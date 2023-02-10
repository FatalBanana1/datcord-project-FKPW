//-------------------------------------------------------

//types crud - posts
const READ_ALL_CHANNEL_MESSAGES = `channelMessages/READ_ALL`;
const CREATE_CHANNEL_MESSAGE = `channelMessage/CREATE`;
const UPDATE_CHANNEL_MESSAGE = `channelMessage/UPDATE`;
const DELETE_CHANNEL_MESSAGE = `channelMessage/DELETE`;
const RESET_CHANNEL_MESSAGES = "channelMessages/RESET_CHANNEL_MESSAGES";

//-------------------------------------------------------

//regular actions

//read
const actionReadAllChannelMessages = (channelMessages) => ({
	type: READ_ALL_CHANNEL_MESSAGES,
	channelMessages,
});

//reset
export const actionResetChannelMessages = () => ({
	type: RESET_CHANNEL_MESSAGES,
});

//-------------------------------------------------------

//thunk actions

// GET: Get All channel messages by channel id
// Route: /api/channel/:channelId/cm
export const thunkReadAllChannelMessages = () => async (dispatch) => {
	let response = await fetch(`/api/cms/`);

	if (response.ok) {
		const data = await response.json();
		dispatch(actionReadAllChannelMessages(data));
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

const cmReducer = (state = defaultState(), action) => {
	let newState;

	switch (action.type) {
		case READ_ALL_CHANNEL_MESSAGES:
			// console.log(`reducer-----`, action.channelMessages.channel_messages);
			newState = {};
			action.channelMessages.channel_messages.forEach(
				(el) => (newState[el.id] = el)
			);
			return newState;

		case CREATE_CHANNEL_MESSAGE:
			newState = { ...state };
			// newState[action.userId] = {
			// 	...state[action.userId],
			// 	[action.server.id]: action.server,
			// };
			return newState;

		case DELETE_CHANNEL_MESSAGE:
			newState = { ...state };
			delete newState[action.id];
			return newState;

		case UPDATE_CHANNEL_MESSAGE:
			newState = { ...state };
			newState[action.serverId] = action.server;
			return newState;

		case RESET_CHANNEL_MESSAGES:
			return defaultState();

		default:
			return state;
	}
};

export default cmReducer;
