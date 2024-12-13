// Данный импорт - декларативное описание зависимости
// (указывает, какой ресурс нужен, но не говорит, "как" именно его обрабатывать).
import ReactLogo from './assets/react.svg?react';
import { createElement } from 'react';

export const App = () => {
	// Начинается декларативный стиль: мы описываем желаемую структуру,
	// а не говорим пошагово, как её создавать или изменять.
	return createElement(
		'div',
		{ className: 'container' },
		createElement('h1', null, 'Hello World!'),
		createElement(ReactLogo), // Декларативно вставляем компонент
		createElement('hr'),
		// Здесь вызывается метод new Date().getFullYear().
		// Сам вызов — императивен, но результат используется в декларативном описании интерфейса.
		createElement('span', { className: 'span-year' }, new Date().getFullYear()),
	);
	// На этом месте декларативный стиль для UI завершается.
};
