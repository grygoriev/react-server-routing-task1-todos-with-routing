import styles from './InputForm.module.css';

export const InputForm = ({ inputTitle, onChangeHandle, requestAddTask, isCreating }) => {
	return (
		<form className={styles.form}>
			<input
				className={styles.input}
				placeholder="Введите новую задачу"
				name="title"
				value={inputTitle}
				onChange={(e) => onChangeHandle(e.target.value)}
			/>
			<button
				onClick={requestAddTask}
				disabled={isCreating}
				className={styles.button}
			>
				Добавить задачу
			</button>
		</form>
	);
};
