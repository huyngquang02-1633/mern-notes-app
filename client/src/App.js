import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
// import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'

function App() {
	return (
		<AuthContextProvider>
			<PostContextProvider>
				<BrowserRouter>
					<Routes>
						<Route exact path='/' element={<Auth authRoute='login'/>} />
						<Route
							exact
							path='/login'
							element={<Auth authRoute='login'/>}
						/>
						<Route
							exact
							path='/register'
							element={<Auth authRoute='register'/>}
						/>
						<Route exact path='/dashboard' element={<Dashboard/>} />
						<Route exact path='/about' element={<About/>} />
					</Routes>
				</BrowserRouter>
			</PostContextProvider>
		</AuthContextProvider>
	)
}

export default App