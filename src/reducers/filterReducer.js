export default function filterReducer(state, action) {
	switch (action.type) {
		case "SHOW_ALL":
			return "ALL";
		case "SHOW_COMPLETE":
			return "COMPLETE";
		case "SHOW_INCOMPLETE":
			return "INCOMPLETE";
		default:
			throw new Error();
	}
}
