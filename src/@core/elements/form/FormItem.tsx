import { resolve } from '@core/elements/form/form.util';
import { mergeClassName } from '@core/utils';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './FormItem.module.scss';

interface Props {
	name: string;
	label?: string;
	labelPosition?: 'left' | 'top';
	rules?: any;
	inputRender?: any;
	[key: string]: any;
}

const FormItem = ({ name, label, rules, inputRender, labelPosition = 'top', ...props }: Props) => {
	const {
		control,
		formState: { errors },
		setValue,
		getValues,
	} = useFormContext();

	useEffect(() => {
		if (getValues(name) === undefined || getValues(name) === null) {
			setValue(name, props.defaultValue);
		}
	}, [props.defaultValue]);

	const isRequired = rules?.required?.value ?? rules?.required;

	const render = ({ field }: any) => {
		const onChange = (value: any) => {
			value = value?.target?.value ?? value;
			field.onChange(value);
			if (props.onChange) {
				props.onChange(value);
			}
		};
		return inputRender({ field: { status: resolve(name, errors) ? 'error' : '', ...props, ...field, onChange } });
	};

	return (
		<div className={mergeClassName(styles.container, labelPosition, props.className)}>
			{label && (
				<div className={`label-wrapper ${styles.labelWrapper} ${labelPosition}`}>
					<label className={`label ${styles.label} ${labelPosition}`}>
						{label}
						{isRequired && <span className={styles.required}>&nbsp;*</span>}
					</label>
				</div>
			)}
			<div className={`input-wrapper ${styles.inputWrapper} ${props.prefix ? '' : 'notPrefix'}`}>
				<Controller name={name} control={control} rules={rules} render={render} />
				<span className={mergeClassName(styles.errorMessage, resolve(name, errors) ? 'show' : 'hidden')}>
					{resolve(name, errors)?.message || 'Vui lòng điền thông tin'}
				</span>
			</div>
		</div>
	);
};

export default FormItem;
