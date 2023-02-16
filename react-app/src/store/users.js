const SET_THEME = "users/SET_THEME";

const setTheme = (user) => ({
  type: SET_THEME,
  payload: user,
});

export const thunkSetTheme = (userId, theme) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theme,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("thunkSetTheme---------------->", data);
    dispatch(setTheme(data));
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

const initialState = { user: null };

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return { user: action.payload };
    default:
      return state;
  }
}
