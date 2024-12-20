import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTask = (title, setInputTitle) => {
	const [isCreating, setIsCreating] = useState(true);

	const requestAddTask = () => {
		setIsCreating(true);

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: title
		})
			.then((response) => {
				console.log('ответ сервера', response);
				setInputTitle('');
			})
			.finally(() => setIsCreating(false));
	};

	return { isCreating, requestAddTask, setIsCreating };
};
