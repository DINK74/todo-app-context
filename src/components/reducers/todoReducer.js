export default function todoReducer(state, action) {
	switch (action.type) {
		case "DO_TODO":
			return state.map((todo) => (todo.id === action.id ? { ...todo, complete: true } : todo));
		case "UNDO_TODO":
			return state.map((todo) => (todo.id === action.id ? { ...todo, complete: false } : todo));
		case "ADD_TODO":
			return state.concat({
				task: action.task,
				id: action.id,
				complete: false,
			});
		default:
			throw new Error();
	}
}
