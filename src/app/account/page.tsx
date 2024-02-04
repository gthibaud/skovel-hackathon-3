'use client'

import Link from 'next/link';
import './styles.css';

export default function Account() {
    return (
        <main>
            <header>
                <h1>Register</h1>
            </header>
            <div className='already-registered'>
                <p>Already registered?</p>
                <Link href={"/account"} className='action register'>View my account</Link>
            </div>
            <form>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Confirm Password</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <div className='form-group'>
                    <button type='submit'>Register</button>
                </div>
            </form>
            <div id="checkout">
            </div>
        </main>
    );
};
