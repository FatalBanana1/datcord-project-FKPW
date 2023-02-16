const GET_FRIENDSHIPS = "friendships/GET_FRIENDSHIPS";
const ADD_FRIENDSHIP = "friendships/ADD_FRIENDSHIPS";
const EDIT_FRIENDSHIP = "friendships/EDIT_FRIENDSHIP";
const DELETE_FRIENDSHIP = "friendships/DELETE_FRIENDSHIP";
const RESET_FRIENDSHIPS = "friendships/RESET_SEREVERMEMBER";

// Actions

// GET
export const actionGetFriendships = (friendships) => ({
	type: GET_FRIENDSHIPS,
	friendships,
});

// CREATE
export const actionAddFriendship = (serverMember) => ({
	type: ADD_FRIENDSHIP,
	serverMember,
});

// EDIT
export const actionEditFriendship = (serverMember) => ({
	type: EDIT_FRIENDSHIP,
	serverMember,
});

// DELETE
export const actionDeleteFriendship = (memberId) => ({
	type: DELETE_FRIENDSHIP,
	memberId,
});

// RESET
export const actionResetFriendship = () => ({
	type: RESET_FRIENDSHIPS,
});

//Thunks

// GET
export const thunkGetFriendships = () => async (dispatch) => {
	console.log("friendships front store get PRE =========")

	const res = await fetch(`/api/friends`);

	console.log("friendships front store get POST=========", res)

	if (res.ok) {
		const serverMembers = await res.json();
		dispatch(actionGetFriendships(serverMembers.server_members));
		return serverMembers.server_members;
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
export const thunkAddFriendship = (serverId, role) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/members`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			role,
		}),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(actionAddFriendship(data.server_member));
		return data.server_member;
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
export const thunkEditFriendship =
	(serverId, serverMemberId, serverMember) => async (dispatch) => {
		console.log("pre-Fetch ----->", serverMember);
		const res = await fetch(
			`/api/servers/${serverId}/membership/${serverMemberId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					serverMember,
				}),
			}
		);
		if (res.ok) {
			const data = await res.json();
			dispatch(actionEditFriendship(data.server_member));
			return data.server_member;
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
export const thunkDeleteFriendship =
	(friendshipId, permission) => async (dispatch) => {
		// console.log("Pre-Fetch ------>", serverId, serverMemberId, permission);
		const res = await fetch(
			`/api/friends/${friendshipId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					permission: permission,
				}),
			}
		);
		// console.log("Post-Fetch ------>", res);
		if (res.ok) {
			const data = await res.json();
			dispatch(actionDeleteFriendship(friendshipId));
			return data.server_member;
		} else if (res.status < 500) {
			const data = await res.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

const normalize = (serverMembers) => {
	const data = {};
	if (serverMembers === "No current members in this server") {
		return {};
	}
	if (serverMembers) {
		serverMembers.forEach((member) => (data[member.id] = member));
		return data;
	}
};

const initialState = {};

export default function friendshipsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_FRIENDSHIPS: {
			console.log(`action in reducer FRIend >>>>>>>>>>>>`, action);
			let newState = { ...state };
			newState = normalize(action.friendships);
			return newState;
		}
		case ADD_FRIENDSHIP: {
			let newState = { ...state };
			newState = {
				...state.serverMembers,
				[action.serverMember.id]: action.serverMember,
			};
			return newState;
		}
		case EDIT_FRIENDSHIP: {
			let newState = { ...state };
			// newState = { ...state.serverMembers, [action.serverMember.id]: action.serverMember}
			newState[action.serverMember.id] = action.serverMember;
			return newState;
		}
		case DELETE_FRIENDSHIP: {
			// console.log(`action in reducer SMBR >>>>>>>>>>>>`, action);
			// console.log(`action in reducer SMBR >>>>>>>>>>>>`, action.memberId);
			let newState = { ...state };
			delete newState[action.memberId];
			return newState;
		}
		case RESET_FRIENDSHIPS: {
			return initialState;
		}
		default:
			return state;
	}
}
