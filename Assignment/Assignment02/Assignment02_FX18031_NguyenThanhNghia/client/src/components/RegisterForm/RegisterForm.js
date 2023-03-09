import './RegisterForm.css'
import Container from '../UI/Container';


const RegisterForm = (props)=>{
    return <Container className="register-form">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you </p>
        <form className='register-form-control'>
            <input type="text" placeholder='Your Email'></input>
            <button>Subcribe</button>
        </form>
    </Container>
}

export default RegisterForm;