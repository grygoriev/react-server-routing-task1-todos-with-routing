import styles from './TodoItem.module.css';
import { useState } from 'react';

export const TodoItem = ({ id, title, onDelete, onSave, isUpdating, isDeleting }) => {
	const [editedTitle, setEditedTitle] = useState(title);
	const [isEditing, setIsEditing] = useState(false);

	const handleSave = () => {
		setIsEditing(false);
		onSave(id, editedTitle);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle(title);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const isChanging = isUpdating || isUpdating;

	return (
		<li className={styles.todoElement} id={id}>
			{isEditing ? (
				<>
					<input
						className={styles.editInput}
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
					/>
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
				</>
			) : (
				<>
					<span>{title}</span>
					<div>
						<button
							className={styles.editButton}
							onClick={handleEdit}
							disabled={isChanging}
						>
							Изменить
						</button>
						<button
							className={styles.deleteButton}
							onClick={() => onDelete(id)}
							disabled={isChanging}
						>
							Удалить
						</button>
					</div>
				</>
			)}
		</li>
	);
};
