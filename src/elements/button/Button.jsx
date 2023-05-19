
const Button = (props) => {
    return (
        <div className={'button'} {...props}>
            <div className={'button__btn'}>{props.icon}</div>
            {props.label && <div className={'button__label'}>{props.label}</div>}
        </div>
    );
};
export default Button;
