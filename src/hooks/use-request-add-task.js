import { useState } from 'react';

const ULR = 'http://localhost:3005/todos';

export const useRequestAddTask = (refreshProd, title, setTitle) => {
	const [isCreating, setIsCreating] = useState(true);

	const requestAddTask = () => {
		setIsCreating(true);

		fetch(ULR, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				title: title,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Ответ сервера ', response);
				refreshProd();
			})
			.finally(() => {
				setTitle('');
			});
	};

	return { isCreating, requestAddTask, setIsCreating };
};
