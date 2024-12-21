import { useEffect, useState } from 'react';

export const useRequestGetTodo = (id, refreshTodoFlag, navigate) => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3005/todos/${id}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTask) => {
				setTodo(loadedTask);
			})
			.catch(() => {
				if (!todo.title) {
					navigate('/task-not-exist');
				}
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodoFlag, navigate]);

	return {todo, isLoading}
};
