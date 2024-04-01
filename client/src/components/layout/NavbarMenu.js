import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'

const NavbarMenu = () => {
	const navigate = useNavigate();

	const {
		authState: {
			user, 
			isAuthenticated 
		},
		logoutUser
	} = useContext(AuthContext)

	useEffect(() => {
		if(!isAuthenticated){
			navigate(`/login`)
		  }
	},[])
	const logout = () => {
		logoutUser();
		navigate(`/login`);
	}


	return (
		<Navbar expand='lg' bg='warning' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>
				LearnIt
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/about'
						as={Link}
					>
						About
					</Nav.Link>
				</Nav>

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' disabled>
						Welcome {user.username}
					</Nav.Link>
					<Button
						variant='danger'
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu