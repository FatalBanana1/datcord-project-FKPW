const GET_SERVERMEMBERS = "server/GET_SERVERMEMBERS";
const ADD_SERVERMEMBER = "server/ADD_SERVERMEMBERS";
const EDIT_SERVERMEMBER = "server/EDIT_SERVERMEMBER";
const DELETE_SERVERMEMBER = "server/DELETE_SERVERMEMBER";
const RESET_SERVERMEMBER = "server/RESET_SEREVERMEMBER";

// Actions

// GET
export const actionGetServerMembers = (serverMembers) => ({
	type: GET_SERVERMEMBERS,
	serverMembers,
});

// CREATE
export const actionAddServerMember = (serverMember) => ({
	type: ADD_SERVERMEMBER,
	serverMember,
});

// EDIT
export const actionEditServerMember = (serverMember) => ({
	type: EDIT_SERVERMEMBER,
	serverMember,
});

// DELETE
export const actionDeleteServerMember = (memberId) => ({
	type: DELETE_SERVERMEMBER,
	memberId,
});

// RESET
export const actionResetServerMember = () => ({
	type: RESET_SERVERMEMBER,
});

//Thunks

// GET
export const thunkGetServerMembers = (serverId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/members`);
	if (res.ok) {
		const serverMembers = await res.json();
		// console.log("serverMembers get =========", serverMembers.server_members)
		dispatch(actionGetServerMembers(serverMembers.server_members));
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
export const thunkAddServerMember = (serverId, role) => async (dispatch) => {
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
		const serverMember = await res.json();
		dispatch(actionAddServerMember(serverMember.server_member));
		return serverMember.server_member;
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
export const thunkEditServerMember =
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
			const serverMember = await res.json();
			dispatch(actionEditServerMember(serverMember.server_member));
			return serverMember.server_member;
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
export const thunkDeleteServerMember =
	(serverId, serverMemberId, permission) => async (dispatch) => {
		// console.log("Pre-Fetch ------>", serverId, serverMemberId, permission);
		const res = await fetch(
			`/api/servers/${serverId}/membership/${serverMemberId}`,
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
			const serverMember = await res.json();
			dispatch(actionDeleteServerMember(serverMemberId));
			return serverMember.server_member;
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

export default function ServerMembers(state = initialState, action) {
	switch (action.type) {
		case GET_SERVERMEMBERS: {
			let newState = { ...state };
			newState = normalize(action.serverMembers);
			return newState;
		}
		case ADD_SERVERMEMBER: {
			let newState = { ...state };
			newState = {
				...state.serverMembers,
				[action.serverMember.id]: action.serverMember,
			};
			return newState;
		}
		case EDIT_SERVERMEMBER: {
			let newState = { ...state };
			// newState = { ...state.serverMembers, [action.serverMember.id]: action.serverMember}
			newState[action.serverMember.id] = action.serverMember;
			return newState;
		}
		case DELETE_SERVERMEMBER: {
			// console.log(`action in reducer SMBR >>>>>>>>>>>>`, action);
			// console.log(`action in reducer SMBR >>>>>>>>>>>>`, action.memberId);
			let newState = { ...state };
			delete newState[action.memberId];
			return newState;
		}
		case RESET_SERVERMEMBER: {
			return initialState;
		}
		default:
			return state;
	}
}
