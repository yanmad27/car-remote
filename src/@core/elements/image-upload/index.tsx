import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Config from '@core/configs';
import { notify } from '@core/elements/message';
import { Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Props {
	upload: any;
	callback?: any;
	value?: string;
}

const ImageUpload: React.FC<Props> = ({ value, ...props }) => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	useEffect(() => {
		setImageUrl(value);
	}, [value]);
	const beforeUpload = (file: RcFile) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			notify.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			notify.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};

	const customRequest = (options: any) => {
		const { file } = options;

		props?.upload &&
			props
				.upload(file)
				.then((res: any) => {
					setImageUrl(res.data.data);
					notify.success(`File uploaded successfully.`);
					props?.callback && props.callback(res.data.data);
				})
				.catch((err: any) => {
					notify.error(`File upload failed.`);
				});
	};
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<Upload
			className={styles.container}
			listType="picture-card"
			showUploadList={false}
			beforeUpload={beforeUpload}
			customRequest={customRequest}
		>
			{imageUrl ? (
				<img src={Config.Env.NEXT_PUBLIC_BE_URL + imageUrl} alt="avatar" style={{ width: '100%' }} />
			) : (
				uploadButton
			)}
		</Upload>
	);
};

export default ImageUpload;
