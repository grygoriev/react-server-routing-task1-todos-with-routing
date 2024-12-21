import { useState } from 'react';

const ULR = 'http://localhost:3005/todos';

export const useRequestDeleteTodo = (navigate) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteTodo = (id) => {
		setIsDeleting(true);

		fetch(`${ULR}/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Ответ сервера', response);
				navigate('/');
			})
			.finally(() => setIsDeleting(false));
	};

	return { isDeleting, requestDeleteTodo };
};
