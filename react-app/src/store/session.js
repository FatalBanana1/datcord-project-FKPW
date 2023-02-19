// constants
const SET_USER = "session/SET_USER";
const SET_FRIEND = "session/SET_FRIEND";
const REMOVE_USER = "session/REMOVE_USER";
const SET_THEME = "users/SET_THEME";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const setFriend = (user) => ({
	type: SET_FRIEND,
	user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const setTheme = (user) => ({
	type: SET_THEME,
	payload: user,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
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

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp =
  (type, formData) => async (dispatch) => {
    let response;

	// console.log("TPE AND FORMDATA ----->", type, formData)

    if (type === "aws") {
      response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData
      });
    } else {
      const { username, email, password, display_pic } = formData;

      response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          display_pic
        })
      });
    }



		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return data;
		} else if (response.status < 500) {
			const data = await response.json();
			// console.log("res = not ok!")
			if (data.errors) {
				// console.log("STORE SIGNUP - data.errors:", data.errors)
				return data;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

// -------------------------------------------------------

// thunks

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
		// console.log("thunkSetTheme---------------->", data);
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

// get friend user - DMs
export const thunkGetUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/`);

	if (response.ok) {
		const data = await response.json();

		dispatch(setFriend(data));
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

// -------------------------------------------------------

// reducer

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case SET_FRIEND:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case SET_THEME:
			return { user: action.payload };
		default:
			return state;
	}
}
