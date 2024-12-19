import { useState } from 'react';

const ULR = 'http://localhost:3005/todos';

export const useRequestUpdateTodo = (refreshTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (id, title) => {
		setIsUpdating(true);

		fetch(`${ULR}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				title: title
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Ответ сервера', response);
				refreshTodos();
			})
			.finally(() => setIsUpdating(false));
	};

	return { isUpdating, requestUpdateTodo };
};
