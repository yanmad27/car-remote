'use client';

import Button from '@core/elements/button';
import Checkbox from '@core/elements/form/items/Checkbox';
import Input from '@core/elements/form/items/Input';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
	const methods = useForm();
	// const router = useRouter();
	const [loading, setLoading] = useState(false);
	const handleSubmit = (data: any) => {
		setLoading(true);
		// login(data)
		// 	.then(() => {
		// 		notify.success('Đăng nhập thành công');
		// 		router.push('/homepage');
		// 	})
		// 	.catch((err) => {
		// 		console.error('ERR ~ ', err);
		// 		setTimeout(() => {
		// 			notify.error('Sai tên tài khoản hoặc mật khẩu!');
		// 			setLoading(false);
		// 		}, 500);
		// 	});
	};

	return (
		<FormProvider {...methods}>
			<form className={styles.container} onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className={styles.title}>Đăng nhập</div>
				<div className={styles.description}>Hãy đăng nhập tài khoản của bạn để bắt đầu!</div>

				<Input
					name={'username'}
					placeholder={'Tên tài khoản'}
					label={'Tên tài khoản'}
					rules={{ required: true }}
				/>
				<Input
					name={'password'}
					placeholder={'Mật khẩu'}
					label={'Mật khẩu'}
					type={'password'}
					rules={{ required: true }}
				/>
				{false && (
					<div className="flex justify-between items-baseline">
						<Checkbox name={'savePassword'} options={[{ label: 'Lưu mật khẩu', value: 1 }]} />
					</div>
				)}
				<Button htmlType="submit" loading={loading}>
					Đăng nhập
				</Button>
			</form>
		</FormProvider>
	);
};
export default LoginForm;
