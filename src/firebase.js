import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBC0-OsjEr4JDQcwhm2pCOlJMMEmuW9F3I',
	authDomain: 'todosproject-f4ec1.firebaseapp.com',
	projectId: 'todosproject-f4ec1',
	storageBucket: 'todosproject-f4ec1.firebasestorage.app',
	messagingSenderId: '885279688708',
	appId: '1:885279688708:web:8de6203ee3e85a20e6cd51',
	databaseURL:
		'https://todosproject-f4ec1-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
