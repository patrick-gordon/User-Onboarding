import React, {useState, useEffect} from 'react'
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import styled from 'styled-components'

//styled components

const OnboardFormStyle = styled.div`
    width: 460px;
    margin: auto 100px;
    padding: 32px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
`



const OnboardForm = ({ errors, touched, values, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(status) {
            setUsers([...users, status]);
        }
    }, [status]);


    return (
        <OnboardFormStyle>
            <h1>Sign Up</h1>
            <Form>
                <Field type='text' name='userName' placeholder="User Name" />
                {touched.userName && errors.userName && (
                    <p>{errors.userName}</p>
                )}

                <Field type='text' name='email' placeholder="Email" />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <Field type='text' name='password' placeholder="Password" />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}

                <label>
                    Terms Of Service
                    <Field type='checkbox' name='termsOfService' checked={values.termsOfService} />
                </label>
                <button type='submit'>Submit!</button>
            </Form>
        </OnboardFormStyle>
    );
};


//HOC
const FormikOnboardForm = withFormik({
    mapPropsToValues({ userName, email, password, termsOfService }) {
        return {
            userName: userName || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        }
    },

    validationSchema: Yup.object().shape({
        userName: Yup.string().required('Hey bro or broess, you need a user name!'),
        email: Yup.string().required('Hey bro or broess, you need an email in here!'),
        password: Yup.string(6).required('Hey bro or broess, you need a password here!'),
        termsOfService: Yup.bool().oneOf([true], 'Hey man you have to check this box to move on')
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        Axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err.response))
    }
})(OnboardForm)



export default FormikOnboardForm