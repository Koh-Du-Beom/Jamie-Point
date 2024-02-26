
import { useState, useEffect } from 'react';
import classes from '../../../styles/FormStyles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../stores/redux/store';
import { updateUserInfo } from '../../../stores/redux/userSlice';
import Divider from '../../Divider/Divider';
import { isValidEmail, isValidName, isValidPhoneNumber, isValidStudentNumber, } from '../../../utils/regularExpression/isValidUserInfo';

const ContactInfo : React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const userInfo = useSelector((state: RootState) => state.userInfo);

	
	return (
		<>

		</>
	)
}

export default ContactInfo;