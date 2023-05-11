async function handleButtonClick(action) {
    console.log('LOG ~ handleButtonClick ~ action:', action);
    const res = await callApi('/' + action, 'POST', JSON.stringify({ action }));
    console.log(res);
}