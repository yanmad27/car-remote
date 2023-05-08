import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Config from '@core/configs';
import Button from '@core/elements/button';
import FormItem from '@core/elements/form/FormItem';
import { notify } from '@core/elements/message';
import { Upload as AntdUpload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MediaApi from 'services/apis/media';
import { AddPhotoIcon } from 'shared/icons/AddPhotoIcon';
import styles from '../FormItem.module.scss';
const { Dragger } = AntdUpload;

interface Props {
	name: string;
	label?: string;
	rules?: any;
	[key: string]: any;
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const UploadImage = ({ ...props }: Props) => {
	const [value, setValue] = useState();
	const [imageUrl, setImageUrl] = useState<string>();
	const [loading, setLoading] = useState(false);

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

	const methods = useFormContext();

	useEffect(() => {
		methods.setValue(props.name, value, { shouldDirty: true });
	}, [value]);

	const mediaId = methods.watch(props.name);

	const { data } = MediaApi.swr.useOne(mediaId);

	useEffect(() => {
		if (!imageUrl && data?.path) setImageUrl(data.path);
	}, [data]);

	const customRequest = (file: any) => {
		setLoading(false);
		props.customRequest &&
			props
				.customRequest(file.file)
				.then((data: any) => {
					setValue(data?.data?.id);
					setImageUrl(data?.data?.path);
				})
				.catch((err: any) => {
					console.error('ERR ~ ', err);
					notify.error('Tải lên thất bại, vui lòng thử lại sau');
				})
				.finally(() => {
					setLoading(false);
				});
	};

	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	const handleCancel = () => {
		setImageUrl(undefined);
	};
	let inputRender = ({ field }: any) => {
		const internalProps = {
			maxCount: 1,
			beforeUpload: beforeUpload,
			showUploadList: false,
			accept: 'image/*',
			onChange: handleChange,
			customRequest: props?.customRequest ? customRequest : undefined,
		};

		return (
			<div className={styles.uploadContainer}>
				<Dragger {...internalProps}>
					{loading && <LoadingOutlined />}
					{!loading && !imageUrl && <PlusOutlined />}
					{!loading && imageUrl && (
						<img
							src={(props.customRequest ? Config.Env.NEXT_PUBLIC_BE_URL : '') + imageUrl}
							alt="avatar"
							style={{ objectFit: 'contain' }}
						/>
					)}
				</Dragger>
				<div className={styles.action}>
					<AntdUpload {...internalProps}>
						<Button prefixIcon={<AddPhotoIcon size={20} />}>Tải ảnh lên</Button>
					</AntdUpload>
					<Button styleType={'cancel'} onClick={handleCancel}>
						Huỷ
					</Button>
				</div>
			</div>
		);
	};
	return <FormItem {...props} inputRender={inputRender} />;
};

export default UploadImage;
