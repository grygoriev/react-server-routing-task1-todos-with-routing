import { useState } from 'react';

const ULR = 'http://localhost:3005/todos';

export const useRequestDeleteTodo = (refreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteTodo = (id) => {
		setIsDeleting(true);

		fetch(`${ULR}/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Ответ сервера', response);
				refreshTodos();
			})
			.finally(() => setIsDeleting(false));
	};

	return { isDeleting, requestDeleteTodo };
};
