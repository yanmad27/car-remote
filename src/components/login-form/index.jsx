import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useMqtt from 'src/mqtt';

const LoginForm = (props) => {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { client, isConnected } = useMqtt();

    useEffect(() => {
        if (!isConnected) return;
        console.log('isconnected')
        client.subscribe('EspCar/loginStatus', (err) => {
            if (err) {
                console.log('failed')
                return;
            }
            console.log('ok');

            const messageArrived = (topic, packet) => {
                console.log(`message from ${topic.toString()}: ${packet.toString()}`);
                if (topic.toString() === 'EspCar/loginStatus') {
                    let msg = packet.toString();
                    if (msg.toLowerCase() == 'success') {
                        router.push('/home');
                    }
                    else if (msg.toLowerCase() == 'fail') {
                        alert('Login failed');
                    }
                }
            }
            client.on('message', messageArrived);
        });
    }, [isConnected, client]);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('LOG ~ handleLogin ~ isConnected:', isConnected);
        if (!isConnected) return;

        client.publish('EspCar/login', JSON.stringify({
            user: username,
            password: password
        }), { qos: 0, retain: false },
            (error) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log('LOG ~ :', 'Login');
            });
    };
    return (
        <form onSubmit={handleLogin}>
            <div className={'login-form'}>
                <div className={'login-form__input'}>
                    <input
                        type="text"
                        placeholder={'Username'}
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={'login-form__input'}>
                    <input
                        type="password"
                        placeholder={'Password'}
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className={'login-form__button'} type="submit">
                    Login
                </button>
            </div>
        </form>
    );
};
export default LoginForm;
