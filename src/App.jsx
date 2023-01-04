import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "./contexts/context";
import filterReducer from "./reducers/filterReducer";
import todoReducer from "./reducers/todoReducer";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Filter from "./Filter";

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
