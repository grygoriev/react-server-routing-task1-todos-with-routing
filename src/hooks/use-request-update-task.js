import { useState } from 'react';

const ULR = 'http://localhost:3005/todos';

export const useRequestUpdateTodo = (refreshTodo) => {
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
				refreshTodo();
			})
			.finally(() => setIsUpdating(false));
	};

	return { isUpdating, requestUpdateTodo };
};
