
import classes from '../../../styles/FormStyles.module.css';
import ImageControler from '../../ImageControler/ImageControler';
import { useState, useEffect } from 'react';
import { AppDispatch } from '../../../stores/redux/store';
import { updateUserInfo } from '../../../stores/redux/userSlice';
import { isValidAccountNumber, isValidName } from '../../../utils/regularExpression/isValidUserInfo';
import convertToBase64 from '../../../utils/commonFunctions/convertToBase64';
import UserInfoType from '../../../types/UserInfoType.type';

interface InfoProps {
  userInfo: UserInfoType;
  dispatch: AppDispatch; // AppDispatch 타입을 직접 사용
}

const BankInfo : React.FC<InfoProps> = ({ userInfo, dispatch}) => {
	
	const [bankAccount, setBankAccount] = useState<string>('');//계좌번호
	const [bankName, setBankName] = useState<string>(''); // 은행명
	const [bankBookImg, setBankBookImg] = useState<string>('');

	const [errorMsg, setErrorMsg] = useState<{
		bankAccount?: string;
		bankName?: string;
	}>({})

	const handleBankAccountBlur = () => {
		if(!isValidAccountNumber(bankAccount)){
			setErrorMsg((prev) => ({...prev, bankAccount : `${bankAccount? '올바른 계좌번호가 아닙니다' : ''}`}));
			setBankAccount('');
			dispatch(updateUserInfo({...userInfo, bankAccount : ''}));
		}else{
			setErrorMsg((prev) => ({...prev, bankAccount : undefined}));
			dispatch(updateUserInfo({...userInfo, bankAccount}));
		}
	}

	const handleBankNameBlur = () => {
		if(!isValidName(bankName)){
			setErrorMsg((prev) => ({...prev, bankName : `${bankName? '올바른 은행명이 아닙니다' : ''}`}));
			setBankName('');
			dispatch(updateUserInfo({...userInfo, bankName : ''}));
		}else{
			setErrorMsg((prev) => ({...prev, bankName : undefined}));
			dispatch(updateUserInfo({...userInfo, bankName}));
		}
	}

	const handleBankBookImg = (file : File | null) => {
		if(file){
			convertToBase64(file, (base64String: string) => {
				setBankBookImg(base64String);
				dispatch(updateUserInfo({ ...userInfo, bankBookImg: base64String }));
			});
		}else{
			setBankBookImg('');
			dispatch(updateUserInfo({ ...userInfo, idCardImg: '' }))
		}
	}

	useEffect(()=> {
		if(userInfo){
			setBankAccount(userInfo.bankAccount);
			setBankName(userInfo.bankName);
		}
	}, [userInfo]);

	return (
		<>
			<div className={classes.big_title}>통장 정보</div>
			<div className={classes.wrapper}>
				<div className={classes.small_title}>통장사본 사진</div>
				<ImageControler onImageChange={handleBankBookImg} data={bankBookImg}/>
			</div>
			<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>계좌번호</div>
						<input
							className={classes.input} 
							type='text'
							onChange={(e) => {setBankAccount(e.target.value)}}	
							onBlur={handleBankAccountBlur}
							value={bankAccount}
						/>
						{errorMsg.bankAccount && <div className={classes.errorMsg}>{errorMsg.bankAccount}</div>}
					</div>
				</div>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>은행명</div>
						<input 
							className={classes.input}
							type='text'
							onChange={(e) => {setBankName(e.target.value)}}
							onBlur={handleBankNameBlur}
							value={bankName}
						/>
						{errorMsg.bankName && <div className={classes.errorMsg}>{errorMsg.bankName}</div>}
					</div>
				</div>
		</>
	)
};

export default BankInfo;