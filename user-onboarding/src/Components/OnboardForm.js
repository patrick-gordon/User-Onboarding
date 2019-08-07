import React from 'react'
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';



const OnboardForm = ({ errors, touched, values}) => {
    return(
        <div>
            <h1>Sign Up</h1>
            <Form>
                <Field type='text' name='userName' placeholder="User Name" />
                {touched.userName && errors.userName && (
                    <p>{errors.userName}</p>
                )}
            </Form>
        </div>
    );
};


//HOC
const FormikOnboardForm = withFormik({
    mapPropsToValues({ userName, email, password, termsOfService }) {
        return{
            userName: userName || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        }
    }
})



export default FormikOnboardForm