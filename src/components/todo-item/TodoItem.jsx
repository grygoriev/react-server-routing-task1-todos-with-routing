import styles from './TodoItem.module.css';
import { NavLink } from 'react-router-dom';

const MAX_TODO_LEN = 45;

export const TodoItem = ({ id, title }) => {
	const shortTitle =
		title.length > MAX_TODO_LEN ? `${title.slice(0, MAX_TODO_LEN)}...` : title;

	return (
		<li className={styles.todoElement} id={id}>
			<span>
				{' '}
				<NavLink to={`task/${id}`}>{shortTitle}</NavLink>{' '}
			</span>
		</li>
	);
};
