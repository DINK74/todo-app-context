import { useState, useReducer, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext(null);

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
};

const Filter = ({ dispatch }) => {
	const handleShowAll = () => {
		dispatch({ type: "SHOW_ALL" });
	};

	const handleShowComplete = () => {
		dispatch({ type: "SHOW_COMPLETE" });
	};

	const handleShowIncomplete = () => {
		dispatch({ type: "SHOW_INCOMPLETE" });
	};

	return (
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
	);
};

const TodoList = ({ todos }) => (
	<ul>
		{todos.map((todo) => (
			<TodoItem key={todo.id} todo={todo} />
		))}
	</ul>
);

const TodoItem = ({ todo }) => {
	const dispatch = useContext(TodoContext);
	const handleChange = () =>
		dispatch({
			type: todo.complete ? "UNDO_TODO" : "DO_TODO",
			id: todo.id,
		});

	return (
		<li>
			<label>
				<input type="checkbox" checked={todo.complete} onChange={handleChange} />
				{todo.task}
			</label>
		</li>
	);
};

const AddTodo = () => {
	const dispatch = useContext(TodoContext);
	const [task, setTask] = useState("");

	const handleSubmit = (event) => {
		if (task) {
			dispatch({ type: "ADD_TODO", task, id: uuidv4() });
		}

		setTask("");

		event.preventDefault();
	};

	const handleChange = (event) => setTask(event.target.value);

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={task} onChange={handleChange} />
			<button type="submit">Add Todo</button>
		</form>
	);
};

function App() {
	const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
	const [task, setTask] = useState("");
	const [filter, dispatchFilter] = useReducer(filterReducer, filterReducer(null, { type: "SHOW_ALL" }) /* ALL */);

	/* dispatchFilter(action) calls filterReducer(filter, action) and assigns return value to filter state */

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
			<TodoContext.Provider value={dispatchTodos}>
				<Filter dispatch={dispatchFilter} />
				<TodoList dispatch={dispatchTodos} todos={filteredTodos} />
				<AddTodo dispatch={dispatchTodos} />
			</TodoContext.Provider>
		</div>
	);
}

export default App;
