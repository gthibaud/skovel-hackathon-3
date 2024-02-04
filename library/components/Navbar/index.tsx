import { MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import './styles.css';

export const Navbar = () => {
    return (
        <menu className="menu-container">
            <div
                className="menu-card"
                data-tilt
                data-tilt-max="2"
                data-tilt-axis="x"
                data-tilt-speed="400"
                data-tilt-scale="1.01"
                data-tilt-perspective="500"
            >
                <Link href={'/'}>
                    <img
                        src="/capybarace-logo.png"
                        alt="Logo"
                    />
                    <h2>Capybarace</h2>
                </Link>
                <Select
                    value={10}
                    fullWidth
                >
                    <MenuItem value={10}>2024</MenuItem>
                    <MenuItem value={11}>2022</MenuItem>
                    <MenuItem value={12}>2021</MenuItem>
                </Select>
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                <Link href="/race">The race</Link>
                <Link href="/infos">Infos</Link>
                <Link href="/register">Register</Link>
            </div>
        </menu>
    );
};
