import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => (
	<div className={styles.container}>
		<h1 className={styles.errorCode}>404</h1>
		<p className={styles.message}>Страница не найдена</p>
		<NavLink to="/" className={styles.homeLink}>
			Вернуться на главную
		</NavLink>
	</div>
);
