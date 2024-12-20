import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTodo = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (id, title) => {
		setIsUpdating(true);

		const todosDbRef = ref(db, `todos/${id}`);

		set(todosDbRef, {
			title: title
		})
			.then((response) => {
				console.log('ответ сервера', response);
			})
			.finally(() => setIsUpdating(false));
	};

	return { isUpdating, requestUpdateTodo };
};
