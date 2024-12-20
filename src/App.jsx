import { useState, useEffect } from 'react';
import styles from './App.module.css';
import {
	useRequestGetTodos,
	useRequestAddTask,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
	useDebounce,
} from './hooks';
import { TodoItem } from './components/todo-item/TodoItem.jsx';
import { InputForm } from './components/input-form/InputForm.jsx';

export const App = () => {
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
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(refreshTodos);
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodos);

	const onChangeHandle = (value) => {
		setInputTitle(value);
		if (value) {
			setIsCreating(false);
		}
	};

	const handleDeleteTodo = (id) => {
		requestDeleteTodo(id);
	};

	const handleSaveTodo = (id, newTitle) => {
		requestUpdateTodo(id, newTitle);
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
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
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
										<TodoItem
											key={id}
											id={id}
											title={title}
											onDelete={handleDeleteTodo}
											onSave={handleSaveTodo}
											isUpdating={isUpdating}
											isDeleting={isDeleting}
										/>
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
