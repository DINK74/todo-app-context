import { useContext } from "react";
import { TodoContext } from "./contexts/TodoContext";

export default function Status({todos}) {
	const dispatch = useContext(TodoContext);

	return <div>items: {todos.length}</div>;
}
