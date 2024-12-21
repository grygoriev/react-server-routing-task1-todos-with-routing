import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
	useRequestDeleteTodo,
	useRequestGetTodo,
	useRequestUpdateTodo,
} from '../../hooks/index.js';
import styles from '../todo-details/Todo.module.css';
import { useState } from 'react';
import { Loader } from '../loader/Loader.jsx';

export const Todo = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const { todo, isLoading } = useRequestGetTodo(id, refreshTodoFlag, navigate);

	const [editedTitle, setEditedTitle] = useState(todo.title);

	const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);

	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(navigate);
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(refreshTodo);

	const handleSave = () => {
		setIsEditing(false);
		requestUpdateTodo(id, editedTitle);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle(todo.title);
	};

	const handleEdit = () => {
		setIsEditing(true);
		setEditedTitle(todo.title);
	};

	const handleDeleteTodo = () => {
		requestDeleteTodo(id);
	};

	const isChanging = isUpdating || isDeleting;

	return (
		<div className={styles.todoContainer}>
			{isLoading ? (
				<Loader/>
			) : (
				<>
					<div>
						{' '}
						<NavLink to="/" className={styles.backLink}>
							Назад
						</NavLink>
					</div>
					{isEditing ? (
						<>
							<textarea
								className={styles.editInput}
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
								rows="5"
								cols="60"
							></textarea>
							<div className={styles.todoActions}>
								<button
									className={styles.saveButton}
									onClick={handleSave}
									disabled={isChanging}
								>
									Сохранить
								</button>
								<button
									className={styles.cancelButton}
									onClick={handleCancel}
									disabled={isChanging}
								>
									Отмена
								</button>
							</div>
						</>
					) : (
						<>
							<span className={styles.todoTitle}>{todo.title}</span>
							<div className={styles.todoActions}>
								<button
									className={styles.editButton}
									onClick={handleEdit}
									disabled={isChanging}
								>
									Изменить
								</button>
								<button
									className={styles.deleteButton}
									onClick={handleDeleteTodo}
									disabled={isChanging}
								>
									Удалить
								</button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};
