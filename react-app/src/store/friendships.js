const GET_FRIENDSHIPS = "friendships/GET_FRIENDSHIPS";
const ADD_FRIENDSHIP = "friendships/ADD_FRIENDSHIPS";
const EDIT_FRIENDSHIP = "friendships/EDIT_FRIENDSHIP";
const DELETE_FRIENDSHIP = "friendships/DELETE_FRIENDSHIP";
const RESET_FRIENDSHIPS = "friendships/RESET_FRIENDSHIPS";

// Actions

// GET
export const actionGetFriendships = (friendships) => ({
	type: GET_FRIENDSHIPS,
	friendships,
});

// CREATE
export const actionAddFriendship = (friendship) => ({
	type: ADD_FRIENDSHIP,
	friendship,
});

// EDIT
export const actionEditFriendship = (friendship) => ({
	type: EDIT_FRIENDSHIP,
	friendship,
});

// DELETE
export const actionDeleteFriendship = (friendshipId) => ({
	type: DELETE_FRIENDSHIP,
	friendshipId,
});

// RESET
export const actionResetFriendship = () => ({
	type: RESET_FRIENDSHIPS,
});

//Thunks

// GET
export const thunkGetFriendships = () => async (dispatch) => {
	const res = await fetch(`/api/friendships/`);
	// console.log("friendships front store get POST=========", res);
	if (res.ok) {
		const data = await res.json();
		dispatch(actionGetFriendships(data.friendships));
		return data;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// CREATE
export const thunkAddFriendship = (memberId) => async (dispatch) => {
	const res = await fetch(`/api/friendships/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			memberId,
		}),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(actionAddFriendship(data.friendship));
		return data.friendship;
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
export const thunkEditFriendship = (friendId, role) => async (dispatch) => {
	// console.log("pre-Fetch ----->", friendId);
	const res = await fetch(`/api/friendships/${friendId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			role,
		}),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(actionEditFriendship(data.friendship));
		return data.friendship;
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
export const thunkDeleteFriendship = (friendId) => async (dispatch) => {
	// console.log("Pre-Fetch ------>", serverId, serverMemberId, permission);
	const res = await fetch(`/api/friendships/${friendId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	// console.log("Post-Fetch ------>", res);
	if (res.ok) {
		const data = await res.json();
		dispatch(actionDeleteFriendship(friendId));
		return data.friendship;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const normalize = (data) => {
	const newData = {};
	if (data === "You do not have friends") {
		return {};
	}
	if (data) {
		data.forEach((el) => (newData[el.id] = el));
		return newData;
	}
};

const initialState = {};

export default function friendshipsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_FRIENDSHIPS: {
			let newState = { ...state };
			newState = normalize(action.friendships);
			return newState;
		}
		case ADD_FRIENDSHIP: {
			let newState = { ...state };
			newState[action.friendship.id] = action.friendship;
			return newState;
		}
		case EDIT_FRIENDSHIP: {
			let newState = { ...state };
			// newState = { ...state.friendships, [action.friendship.id]: action.friendship}
			// newState[action.friendship.id] = action.friendship;
			return newState;
		}
		case DELETE_FRIENDSHIP: {
			// console.log(`action in reducer SMBR >>>>>>>>>>>>`, action);
			// console.log(`action in reducer SMBR >>>>>>>>>>>>`, action.memberId);
			let newState = { ...state };
			delete newState[action.friendshipId];
			return newState;
		}
		case RESET_FRIENDSHIPS: {
			return {};
		}
		default:
			return state;
	}
}
