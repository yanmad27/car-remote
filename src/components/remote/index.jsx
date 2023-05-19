import { useEffect } from 'react';
import Button from 'src/elements/button/Button';
import useMqtt from 'src/mqtt';


const Remote = (props) => {
    const { client, isConnected } = useMqtt();
    useEffect(() => {
        if (!isConnected) return;
        client.subscribe('test', (err) => {
            if (!err) return;
            //handle something
            client.publish('test', 'Hello mqtt');
        });
    }, [client]);

    const handleClick = (id) => {
        console.log('LOG ~ :', 'click', id);
        if (isConnected) {
            client.publish('EspCar/button', id, { qos: 0, retain: false }, (error) => {
                if (error) console.log(error);
                else console.log('Published', id);
            });
        }
    };
    return (
        <div className={'remote'}>
            <Button icon={1} label={'button 1'} onClick={() => handleClick('1')} />
            <Button icon={2} label={'button 2'} onClick={() => handleClick('2')} />
            <Button icon={3} label={'button 3'} onClick={() => handleClick('3')} />
            <Button icon={4} label={'button 4'} onClick={() => handleClick('4')} />
            <Button icon={5} label={'button 5'} onClick={() => handleClick('5')} />
            <Button icon={6} label={'button 6'} onClick={() => handleClick('6')} />
        </div>
    );
};
export default Remote;
