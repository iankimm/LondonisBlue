
const GET_USER = "session/GET_USER"

const getUser = (users) => ({
	type: GET_USER,
	payload: users
})

export const fetchUsers = () => async (dispatch) => {
	try{
    const response = await fetch("/api/auth/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const users = await response.json();
      dispatch(getUser(users));
      return users
    }
  } catch (error) {
    throw error;
  }
}

export default function reducer(state = {}, action) {
	switch (action.type) {
		case GET_USER:
			if(action.payload.Users) {
				const users = {}
				action.payload.Users.forEach((user) => {
					users[user.id] = user
				})
				return users
			}
		default:
			return state;
	}
}
