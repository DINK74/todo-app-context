import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
	{
		id: uuidv4(),
		task: "Learn React",
		complete: true,
	},
	{
		id: uuidv4(),
		task: "Learn Firebase",
		complete: true,
	},
	{
		id: uuidv4(),
		task: "Learn GraphQL",
		complete: false,
	},
];

const filterReducer = (state, action) => {
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
};

const todoReducer = (state, action) => {
	switch (action.type) {
		case "DO_TODO":
			return state.map((todo) => {
				if (todo.id === action.id) {
					return { ...todo, complete: true };
				} else {
					return todo;
				}
			});
		case "UNDO_TODO":
			return state.map((todo) => {
				if (todo.id === action.id) {
					return { ...todo, complete: false };
				} else {
					return todo;
				}
			});
		case "ADD_TODO":
			return state.concat({
				task: action.task,
				id: action.id,
				complete: false,
			});
		default:
			throw new Error();
	}
};

function App() {
	const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
	const [task, setTask] = useState("");
	const [filter, dispatchFilter] = useReducer(filterReducer, filterReducer(null, { type: "SHOW_ALL" }) /* ALL */);

	/* dispatchFilter(action) calls filterReducer(filter, action) and assigns return value to filter */

	const filteredTodos = todos.filter((todo) => {
		if (filter === "ALL") {
			return true;
		}

		if (filter === "COMPLETE" && todo.complete) {
			return true;
		}

		if (filter === "INCOMPLETE" && !todo.complete) {
			return true;
		}

		return false;
	});

	const handleChangeInput = (event) => {
		setTask(event.target.value);
	};

	const handleShowAll = () => {
		dispatchFilter({ type: "SHOW_ALL" });
	};

	const handleShowComplete = () => {
		dispatchFilter({ type: "SHOW_COMPLETE" });
	};

	const handleShowIncomplete = () => {
		dispatchFilter({ type: "SHOW_INCOMPLETE" });
	};

	const handleChangeCheckbox = (todo) => {
		dispatchTodos({
			type: todo.complete ? "UNDO_TODO" : "DO_TODO",
			id: todo.id,
		});
	};

	const handleSubmit = (event) => {
		if (task) {
			dispatchTodos({ type: "ADD_TODO", task, id: uuidv4() });
		}

		setTask("");

		event.preventDefault();
	};

	return (
		<div className="App">
			<div>
				<button type="button" onClick={handleShowAll}>
					Show All
				</button>
				<button type="button" onClick={handleShowComplete}>
					Show Complete
				</button>
				<button type="button" onClick={handleShowIncomplete}>
					Show Incomplete
				</button>
			</div>
			<ul>
				{filteredTodos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.complete}
							onChange={() => handleChangeCheckbox(todo)}
						></input>
						<label>
							{todo.task} (...{todo.id.slice(-4)})
						</label>
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<input type="text" value={task} onChange={handleChangeInput} />
				<button type="submit">Add Todo</button>
			</form>{" "}
		</div>
	);
}

export default App;
