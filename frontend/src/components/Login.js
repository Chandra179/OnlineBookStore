import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// async function loginUser(credentials) {
//     let config = {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//     let data = JSON.stringify(credentials)

//     axios.post('http://127.0.0.1:8000/account/', data, config)
//         .then(response => console.log(response));
//     return 'chandra'
// }

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function loginUser(credentials) {
        let config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        let body = JSON.stringify(credentials)
        axios.post(
            'http://127.0.0.1:8000/account/',
            body,
            config
        ).then(function (response){
            setToken(response)
            console.log(response)
        });
    }

    useEffect(() => {
        loginUser()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({ email, password })
    }

    return (
        <div>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}