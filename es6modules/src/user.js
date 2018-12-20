import slug from 'slug';
import { url } from './config';

function User(name, email, website) {
	return{ name, email,website }
}

function createURL(name) {
	return `${url}/users/${slug(name)}`;
}

function gravatar(email) {
	const photoURL = 'https://www.gravatar.com/avatar/'
}