import { useState, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "./contexts/TodoContext";
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

	return (
		<div className="App">
			<TodoContext.Provider value={dispatchTodos}>
				<Filter dispatch={dispatchFilter} />
				<TodoList todos={filteredTodos} />
				<AddTodo />
			</TodoContext.Provider>
		</div>
	);
}

export default App;
