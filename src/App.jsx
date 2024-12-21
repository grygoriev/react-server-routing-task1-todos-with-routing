import styles from './App.module.css';
import { Todos } from './components/todos/Todos.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Todo } from './components/todo-details/Todo.jsx';
import { NotFound } from './components/not-found/NotFound.jsx';

export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<Todos />}></Route>
				<Route path="/task/:id" element={<Todo />}></Route>
				<Route path="/task-not-exist" element={<NotFound />}></Route>
				<Route path="/404" element={<NotFound />}></Route>
				<Route path="*" element={<Navigate to="/404" />}></Route>
			</Routes>
		</div>
	);
};
