// src/pages/Home.tsx
import React from 'react';
import AllCustomers from "../components//customerDetails/customer"
import globalStore from '../globals';

const Home: React.FC = () => {
    return (
        <div>
            {<AllCustomers />}
        </div>
    );
};

export default Home;