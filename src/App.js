//import React from 'react';
import React, { useState, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AvatarGenerator from './pages/AvatarGenerator';
import TextGenerator from './pages/TextGenerator';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import SignIn from './pages/signin';

import { useOnClickOutside } from './hooks';

function App() {
const [open, setOpen] = useState(false);

const node = useRef();
useOnClickOutside(node, () => setOpen(false));

return (
	<Router>
	<Navbar open={open} setOpen={setOpen}/>
	<Routes>
		<Route path='/' exact element={<Home />} />
		<Route path="about" element={<About />} />
		<Route path='events' element={<Events />} />
	
		<Route path='avatar' element={<AvatarGenerator />} />
		<Route path='avatar/:key/:chain/:contract/:token' element={<AvatarGenerator />} />
		<Route path='story' element={<TextGenerator />} />				
		<Route path='story/:key/:chain/:contract/:token' element={<TextGenerator />} />				
		<Route path='team' element={<Teams />} />
		<Route path='blogs' element={<Blogs />} />
		<Route path='sign-up' element={<SignUp />} />
		<Route path='signin' element={<SignIn />} />		
	</Routes>
	</Router>
);
}

export default App;
