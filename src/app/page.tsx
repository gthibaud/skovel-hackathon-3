'use client';

import { db } from '@/api/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './page.css';

export default function Home() {
    const [raceName, setRaceName] = useState('');

    useEffect(() => {
        const docRef = doc(db, 'races', 'GekA3snByurjvyh0bG6H');
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    setRaceName(doc.data().name);
                } else {
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }, []);

    return (
        <main>
            <header>
                <h1>{raceName} 2024</h1>
            </header>
            <img
                src="banner.jpeg"
                alt="Banner image"
                className="banner-image"
            />
            <p className="presentation">A unique 200Km trail in the wild.</p>
            <p className="date">Starting 24/08/2024 in Mulhouse (68)</p>
            <div className="actions">
                <Link
                    href={'/register'}
                    className="action register"
                >
                    Register
                </Link>
                <Link
                    href={'/infos'}
                    className="action"
                >
                    More infos
                </Link>
            </div>
            <div className="bento">
                <div className="bento-card">
                    <h3>Infos</h3>
                    <p>
                        Starting: <b>24/08/2024 - 10h</b>
                    </p>
                    <p>
                        Price: <b>150€</b>
                    </p>
                    <p>
                        Distance: <b>200Km</b>
                    </p>
                    <p>
                        Duration: <b>3 days</b>
                    </p>
                    <p>
                        Difficulty: <b>Hard</b>
                    </p>
                    <Link href="/infos">More infos</Link>
                </div>
                <div className="bento-card">
                    <h3>Location</h3>
                    <img
                        src="map.png"
                        alt="Map"
                    />
                </div>
            </div>
        </main>
    );
}
