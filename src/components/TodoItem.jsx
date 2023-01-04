import { useContext } from "react";
import { TodoContext } from "./contexts/context";

export default function TodoItem({ todo }) {
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
}
