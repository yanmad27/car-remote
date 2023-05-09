'use client';

import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
const LoginForm = () => {
	const router = useRouter();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		router.push('/dashboard');
	};
	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<h1>Login Form</h1>
			<div />
			<div />
			<div />
			<div />
			<label htmlFor="email">Email</label>
			<input name="email" id="email" />
			<label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" />
			<button>Login</button>
		</form>
	);
};
export default LoginForm;
