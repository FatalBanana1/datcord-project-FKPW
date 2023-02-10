const GET_SERVERMEMBERS = "server/GET_SERVERMEMBERS";

// Actions
export const actionGetServerMembers = (serverMembers) => ({
	type: GET_SERVERMEMBERS,
	serverMembers,
});

//Thunks
export const thunkGetServerMembers = (serverId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/serverMembers`);
	if (response.ok) {
		const serverMembers = await res.json();
		dispatch(actionGetServerMembers(serverUsersArr));
		return serverMembers;
	}
};

const normalize = (serverMembers) => {
	const data = {};
	if (serverMembers) {
		serverMembers.forEach((member) => (data[member.id] = member));
		return data;
	}
};

const initialState = { serverMembers: {} };

export default function serveruser(state = initialState, action) {
	switch (action.type) {
		case GET_SERVERMEMBERS:
			const newState = { ...state };
			newState.serverMembers = normalize(action.serverMembers);
			return newState;
		default:
			return state;
	}
}
