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

//delete
const actionDeleteChannelMessage = (channelMessages) => ({
	type: DELETE_CHANNEL_MESSAGE,
	channelMessages,
});

//reset
export const actionResetChannelMessages = () => ({
	type: RESET_CHANNEL_MESSAGES,
});

//-------------------------------------------------------

//thunk actions

// GET: Get All channel messages by channel id
// Route: /api/channel/:serverId/:channelId/cms
export const thunkReadAllChannelMessages =
	(serverId, channelId) => async (dispatch) => {
		let response = await fetch(
			`/api/channels/${serverId}/${channelId}/cms`
		);

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

// DELETE: Delete channel message by channel id
// Route: /api/channel/:serverId/:channelId/cms
export const thunkDeleteChannelMessage = (payload) => async (dispatch) => {
	// console.log(`thunk delete ====`, payload);
	let response = await fetch(`/api/cms/${payload.id}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(actionDeleteChannelMessage(data));
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
			// console.log(`reducer-----`, action.channelMessages.channel_message);
			newState = {};
			action.channelMessages.channel_message.forEach(
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
			// console.log(`reducer-----`, action.channelMessages.id);
			newState = { ...state };
			delete newState[action.channelMessages.id];
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
