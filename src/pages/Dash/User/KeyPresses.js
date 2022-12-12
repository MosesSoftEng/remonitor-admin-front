    const apiGetUserKeyPresses = function () {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        fetch(`${API_URL}/user/key-presses/${props.token}/${client.userId}`, requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                if (data.success) {
                    setKeyPresses(data.data);
                }
            }).catch(function (error) {
                props.showToast(`Connection error`);
            });
    }
        apiGetUserKeyPresses();
        </>
    );
}
