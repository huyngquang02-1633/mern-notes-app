import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarMenu from "../components/layout/NavbarMenu";

const About = () => {
	return (
		<>
		<NavbarMenu />
		<Row className='mt-5' style={{ marginRight: 0 }}>
			<Col className='text-center'>
				<Button
					variant='danger'
					href='https://www.facebook.com/profile.php?id=100011847931844'
					size='lg'
				>
					Fan Mu 22 years
				</Button>
			</Col>
		</Row>
		</>
	)
}

export default About