
import { useState, useEffect } from 'react';
import classes from '../../../styles/FormStyles.module.css';
import {  AppDispatch } from '../../../stores/redux/store';
import { updateUserInfo } from '../../../stores/redux/userSlice';
import { isValidEmail, isValidPhoneNumber, } from '../../../utils/regularExpression/isValidUserInfo';
import UserInfoType from '../../../types/UserInfoType.type';

interface InfoProps {
  userInfo: UserInfoType;
  dispatch: AppDispatch; // AppDispatch 타입을 직접 사용
}

const ContactInfo : React.FC<InfoProps> = ({userInfo, dispatch}) => {
	
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const [errorMsg, setErrorMsg] = useState<{
		phoneNumber?: string;
		email?: string;
	}>({});

	const handlePhoneNumberBlur = () => {
		if(!isValidPhoneNumber(phoneNumber)){
			setErrorMsg((prev) => ({...prev, phoneNumber : `${phoneNumber? '올바른 연락처가 아닙니다' : ''}`}));
			setPhoneNumber('');
			dispatch(updateUserInfo({...userInfo, phoneNumber : ''}));
		}else{
			if(phoneNumber.length > 12){
				setErrorMsg((prev) => ({...prev, phoneNumber : `${phoneNumber? '올바른 연락처가 아닙니다' : ''}`}));
				setPhoneNumber('');
				dispatch(updateUserInfo({...userInfo, phoneNumber : ''}));
				return;
			}
			const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
			console.log(formattedPhoneNumber);
			setPhoneNumber(formattedPhoneNumber);
			setErrorMsg((prev) => ({...prev, phoneNumber : undefined}));
			dispatch(updateUserInfo({...userInfo, phoneNumber : formattedPhoneNumber}));
		}
	}

	const handleEmailBlur = () => {
		if(!isValidEmail(email)){
			setErrorMsg((prev) => ({...prev, email : `${email? '올바른 이메일이 아닙니다' : ''}`}));
			setEmail('');
			dispatch(updateUserInfo({...userInfo, email : ''}));
		}else{
			setErrorMsg((prev) => ({...prev, email : undefined}));
			dispatch(updateUserInfo({...userInfo, email}));
		}
	}

	useEffect(()=> {
		if(userInfo){
			setPhoneNumber(userInfo.phoneNumber);
      setEmail(userInfo.email);
		}
		console.log(userInfo);
		
	}, [userInfo]);

	return (
		<>
			<div className={classes.big_title}>연락처</div>
			<div className={classes.wrapper}>
				<div className={classes.small_title}>전화번호</div>
				<input 
					className={classes.input}
					type='text'
					onChange={(e) => {setPhoneNumber(e.target.value)}}
					onBlur={handlePhoneNumberBlur}
					value={phoneNumber}
				/>
				{errorMsg.phoneNumber && <div className={classes.errorMsg}>{errorMsg.phoneNumber}</div>}
			</div>
			<div className={classes.wrapper}>
				<div>
					<div className={classes.small_title}>이메일</div>
					<input
						className={classes.input} 
						type='text'
						onChange={(e) => {setEmail(e.target.value)}}	
						onBlur={handleEmailBlur}
						value={email}
					/>
					{errorMsg.email && <div className={classes.errorMsg}>{errorMsg.email}</div>}
				</div>
			</div>
		</>
	)
}

export default ContactInfo;