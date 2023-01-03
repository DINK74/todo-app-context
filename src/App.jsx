import { useState } from "react";
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

function App() {
	const [todos, setTodos] = useState(initialTodos);
	const [task, setTask] = useState("");

	const handleChangeInput = (event) => {
		setTask(event.target.value);
	};

	const handleChangeCheckbox = (id) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, complete: !todo.complete } : todo)));
	};

	const handleSubmit = (event) => {
		if (task) {
			setTodos(todos.concat({ id: uuidv4(), task, complete: false }));
		}

		setTask("");

		event.preventDefault();
	};

	return (
		<div className="App">
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.complete}
							onChange={() => handleChangeCheckbox(todo.id)}
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
