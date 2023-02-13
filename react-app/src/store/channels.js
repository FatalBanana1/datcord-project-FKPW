const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
const EDIT_CHANNEL = "channel/EDIT_CHANNEL";


// Actions
export const actionGetServerChannels = (channels, server) => ({
  type: GET_SERVER_CHANNELS,
  channels,
  server
})

export const actionCreateChannel = (channel) => ({
  type: CREATE_CHANNEL,
  channel,
});


export const actionDeleteChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  channelId,
});

export const actionEditChannel = (channelId, channel) => ({
  type: EDIT_CHANNEL,
  channelId,
  channel,
});



// Thunks
export const thunkGetChannels = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/channels`);
  const data = await res.json();
  if (data.errors) return;
  dispatch(actionGetServerChannels(data.channels, data.server));
  console.log("CHANNEL DATA", data)
  return data.channels;
};

<<<<<<< HEAD
export const thunkCreateChannel = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/channels`);
=======
export const thunkCreateChannel = (serverId, newChannel) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    headers: {
        "Content-Type":
        "application/json"
    },
    body: JSON.stringify(newChannel)
  });
>>>>>>> create-channel-form

  if (res.ok) {
		const data = await res.json();
    console.log("thunkCreateChannel - data:", data);
<<<<<<< HEAD
		dispatch(actionCreateChannel(data));
=======
		dispatch(actionCreateChannel(data.channel));
>>>>>>> create-channel-form
		return null;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}



const normalize = (channels) => {
    const data = {};
    console.log("channels", channels)
    if (channels) {
        channels.forEach(channel => data[channel.id] = channel);
        return data;
    }
}

const initialState = { channels: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERVER_CHANNELS:
      const getChannelsState = { ...state };
      getChannelsState.server = action.server;
      if (action.channels === "Server has no channels") {
        getChannelsState.channels = "";
        return getChannelsState;
      }
      getChannelsState.channels = normalize(action.channels);
      console.log("NEW STATE", getChannelsState)
      return getChannelsState;
    case CREATE_CHANNEL: {
      const createChannelState = { ...state };
      createChannelState.channels = { ...state.channels, [action.channel.id]: action.channel };
      console.log("CREATE_CHANNEL - createChannelState:", createChannelState);
      return createChannelState;

    }
    default:
      return state;
  }
}
