import { useState } from 'react';
import styles from './Todos.module.css';
import { useRequestGetTodos, useRequestAddTask, useDebounce } from '../../hooks';
import { TodoItem } from '../todo-item/TodoItem.jsx';
import { InputForm } from '../input-form/InputForm.jsx';
import { Loader } from '../loader/Loader.jsx';

export const Todos = () => {
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [inputTitle, setInputTitle] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);
	const { isCreating, requestAddTask, setIsCreating } = useRequestAddTask(
		refreshTodos,
		inputTitle,
		setInputTitle,
	);

	const onChangeHandle = (value) => {
		setInputTitle(value);
		if (value) {
			setIsCreating(false);
		}
	};

	const debouncedSetSearchValue = useDebounce(searchInput, 500);

	const searchedTodos = todos.filter(({ title }) =>
		title.toLowerCase().includes(debouncedSetSearchValue.trim().toLowerCase()),
	);

	const sortedTodos = isSorted
		? searchedTodos.sort((a, b) => a.title.localeCompare(b.title))
		: [...searchedTodos];

	const handleValueChange = (event) => {
		setSearchInput(event.target.value);
	};

	return (
		<div className={styles.todos}>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					{todos.length > 0 ? (
						<>
							<input
								type="text"
								value={searchInput}
								className={styles.searchInput}
								onChange={handleValueChange}
							/>
							<button
								onClick={() => setIsSorted(!isSorted)}
								className={`${styles.sortButton} ${isSorted ? styles.sortButtonActive : ''}`}
							>
								Ая
							</button>
							{searchedTodos.length > 0 ? (
								<ul className={styles.todosElements}>
									{sortedTodos.map(({ id, title }) => (
										<TodoItem key={id} id={id} title={title} />
									))}
								</ul>
							) : (
								<p>Не найдены задачи</p>
							)}
							<InputForm
								inputTitle={inputTitle}
								onChangeHandle={onChangeHandle}
								requestAddTask={requestAddTask}
								isCreating={isCreating}
							/>
						</>
					) : (
						<InputForm
							inputTitle={inputTitle}
							onChangeHandle={onChangeHandle}
							requestAddTask={requestAddTask}
							isCreating={isCreating}
						/>
					)}
				</div>
			)}
		</div>
	);
};
