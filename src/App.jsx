import { useState } from 'react';
import styles from './App.module.css';
import { useRequestGetTodos } from './hooks';

export const App = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ol className={styles.todosElements}>
					{todos.map(({ id, title }) => (
						<li key={id} className={styles.todoElement}>{title}</li>
					))}
				</ol>
			)}
		</div>
	);
};
