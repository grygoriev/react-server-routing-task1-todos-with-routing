import { useEffect, useState } from 'react';

export const useRequestGetTodos = (refreshTodosFlag) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTodos(loadedTasks);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);

	return {todos, isLoading}
};
