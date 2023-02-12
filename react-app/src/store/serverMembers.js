const GET_SERVERMEMBERS = "server/GET_SERVERMEMBERS";
const ADD_SERVERMEMBER = "server/ADD_SERVERMEMBERS";
const EDIT_SERVERMEMBER = "server/EDIT_SERVERMEMBER";
const DELETE_SERVERMEMBER = "server/DELETE_SERVERMEMBER"

// Actions
export const actionGetServerMembers = (serverMembers) => ({
	type: GET_SERVERMEMBERS,
	serverMembers,
});

export const actionAddServerMember = (serverMember) => ({
	type: ADD_SERVERMEMBER,
	serverMember
})

export const actionEditServerMember = (serverMember) => ({
	type: EDIT_SERVERMEMBER,
	serverMember
})

export const actionDeleteServerMember = (memberId) => ({
	type: DELETE_SERVERMEMBER,
	memberId
})



//Thunks
export const thunkGetServerMembers = (serverId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/members`);
	if (res.ok) {
		const serverMembers = await res.json();
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



export const thunkAddServerMember = (serverId, role) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify({
            role
        })
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
}


export const thunkEditServerMember = (serverId, serverMemberId, serverMember) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/membership/${serverMemberId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify({
            serverMember
        })
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
}


export const thunkDeleteServerMember = (serverId, serverMemberId) => async (dispatch) => {
	const res = await fetch(`/api/servers/${serverId}/membership/${serverMemberId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
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
}




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
		case GET_SERVERMEMBERS: {
			const newState = { ...state }
			newState.serverMembers = normalize(action.serverMembers)
			return newState
		}
		case ADD_SERVERMEMBER: {
			const newState = { ...state }
			newState.serverMembers = { ...state.serverMembers, [action.serverMember.id]: action.serverMember}
            return newState
		}
		case EDIT_SERVERMEMBER: {
			const newState = { ...state }
			newState.serverMembers = { ...state.serverMembers, [action.serverMember.id]: action.serverMember}
            return newState
		}
		case DELETE_SERVERMEMBER: {
			const newState = { ...state }
			delete newState.serverMembers[action.memberId]
            return newState
		}
		default:
			return state;
	}
}
