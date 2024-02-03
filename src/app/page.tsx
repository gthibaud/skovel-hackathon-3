import { MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import './page.css';

export default function Home() {
    return (
        <body>
            <menu className='menu-container'>
                <div className='menu-card' data-tilt data-tilt-max="2" data-tilt-axis="x" data-tilt-speed="400" data-tilt-scale="1.01" data-tilt-perspective="500">
                    <img src="capybarace-logo.png" alt="Logo" />
                    <h2>Capybarace</h2>
                    <Select value={10} fullWidth>
                        <MenuItem value={10}>2024</MenuItem>
                        <MenuItem value={11}>2022</MenuItem>
                        <MenuItem value={12}>2021</MenuItem>
                    </Select>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/events">
                        Events
                    </Link>
                    <Link href="/race">
                        The race
                    </Link>
                    <Link href="/infos">
                        Infos
                    </Link>
                    <Link href="/register">
                        Register
                    </Link>
                </div>
            </menu>
            <main>
                <header>
                    <h1>CapybaRace 2024</h1>
                </header>
                <img src="banner.jpeg" alt="Banner image" className='banner-image' />
                <p className='presentation'>A unique 200Km trail in the wild.</p>
                <p className='date'>Starting 24/08/2024 in Mulhouse (68)</p>
                <div className='actions'>
                    <Link href={"/register"} className='action register'>Register</Link>
                    <Link href={"/infos"} className='action'>More infos</Link>
                </div>
                <div className='bento'>
                    <div className='bento-card'>
                        <h3>Infos</h3>
                        <p>Starting: <b>24/08/2024 - 10h</b></p>
                        <p>Price: <b>150€</b></p>
                        <p>Distance: <b>200Km</b></p>
                        <p>Duration: <b>3 days</b></p>
                        <p>Difficulty: <b>Hard</b></p>
                        <Link href="/infos">More infos</Link>
                    </div>
                    <div className='bento-card'>
                        <h3>Location</h3>
                        <img src="map.png" alt="Map" />
                    </div>
                </div>
            </main>
            {/* <script type="text/javascript" src="vanilla-tilt.js"></script> */}
        </body>
    );
};
