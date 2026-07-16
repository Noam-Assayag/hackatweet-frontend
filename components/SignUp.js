import { useState } from 'react';
import styles from '../styles/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function SignUp({ closeModal }) {
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSignUp = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                username,
                password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.result) {
                    console.log('Compte créé');
                    closeModal();
                } else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    };


    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <img
                    src="/logo.png"
                    alt="Logo Hackatweet"
                    className={styles.logo}
                />

                <h2>Create your Hackatweet account</h2>

                <div className={styles.form}>

                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Firstname"
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className={styles.submitButton} onClick={handleSignUp}>
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default SignUp;