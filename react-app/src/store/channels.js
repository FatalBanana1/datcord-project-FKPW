const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";
const EDIT_CHANNEL = "channel/EDIT_CHANNEL";


// Actions
export const actionGetServerChannels = (serverId, channels) => ({
  type: GET_SERVER_CHANNELS,
  serverId,
  channels,
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
  const res = await fetch(`/api/channels/${serverId}`);
  const data = await res.json();
  if (data.errors) return;
  dispatch(actionGetServerChannels(data.channels));
  return data.channels;
};





const normalize = (channels) => {
    const data = {};
    if (channels) {
        channels.forEach(channel => data[channel.id] = channel);
        return data;
    }
}

const initialState = { channels: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERVER_CHANNELS:
      const newState = { ...state }
      newState.channels = normalize(action.channels);
      return newState;
    default:
      return state;
  }
}
