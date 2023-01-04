import { useState, useContext } from "react";
import { TodoContext } from "./contexts/context";

export default function AddTodo() {
	const dispatch = useContext(TodoContext);
	const [task, setTask] = useState("");

	const handleSubmit = (event) => {
		console.log("handleSubmit");
		if (task) {
			console.log("task", task);
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
}
