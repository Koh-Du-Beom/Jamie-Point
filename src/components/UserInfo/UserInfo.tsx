/*eslint-disable*/
import classes from '../../styles/FormStyles.module.css';
import ImageControler from '../ImageControler/ImageControler';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../stores/redux/store';
import { updateUserInfo } from '../../stores/redux/userSlice';
import Divider from '../Divider/Divider';
import { isValidAccountNumber, isValidEmail, isValidName, isValidPhoneNumber, isValidStudentNumber, } from '../../utils/regularExpression/isValidUserInfo';

//million-ignore
//지금 프로젝트에서 million.js를 설치해서 blur 이벤트가 제대로 동작하지 않는데,
//useRef 훅을 사용해서 일단 해결해보고, 안되면 million.js를 제거.
const UserInfo : React.FC = () => {
	const [name, setName] = useState<string>('');
	const [grade, setGrade] = useState<string>('');
	const [major, setMajor] = useState<string>(''); //전공
	const [studentNumber, setStudentNumber] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	
	const [bankAccount, setBankAccount] = useState<string>('');//계좌번호
	const [bankName, setBankName] = useState<string>(''); // 은행명
	const [bankBookImg, setBankBookImg] = useState<string>('');
	const [idCardImg, setIdCardImg] = useState<string>('');
	const [signImg, setSignImg] = useState<string>('');
	
	const [lastBlurTime, setLastBlurTime] = useState<number>(0);
	const [isValueChanged, setIsValueChanged] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<{
		name?: string;
		grade?: string;
		major?: string;
		email?: string;
		phoneNumber?: string;
		studentNumber?: string;
		bankAccount?: string;
		bankName?: string;
	}>({});

	const dispatch = useDispatch<AppDispatch>();
	const userInfo = useSelector((state: RootState) => state.userInfo);

	const handleSaveButtonClick = () => {
		if(!isValueChanged){
			return;
		}
		setIsValueChanged(false);
		setLastBlurTime(0);
		
		dispatch(updateUserInfo({
			name: name,
      grade: grade,
      major: major,
      studentNumber: studentNumber,
      phoneNumber: phoneNumber,
      email: email,
      bankAccount: bankAccount,
      bankName: bankName,
      bankBookImg: bankBookImg,
      idCardImg: idCardImg,
      signImg: signImg,
		}));
		
  };

	const handleBlur = () => {
		setLastBlurTime(Date.now());
	}

	useEffect(() => {
		if (lastBlurTime === 0 || !isValueChanged) return;
		
		const timer = setTimeout(()=>{
			handleSaveButtonClick(); // 둘 다 비동기 함수지만 아래 코드가 먼저 실행될 수 있음. 그런 동작 막기위함
			setIsValueChanged(false);
		}, 1000); // 라우터(페이지 이동 시에도 실행되도록 하기)

		return () => clearTimeout(timer);
	}, [lastBlurTime, isValueChanged, handleSaveButtonClick])

	useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setGrade(userInfo.grade);
      setMajor(userInfo.major);
      setStudentNumber(userInfo.studentNumber);
      setPhoneNumber(userInfo.phoneNumber);
      setEmail(userInfo.email);
      setBankAccount(userInfo.bankAccount);
      setBankName(userInfo.bankName);
      setBankBookImg(userInfo.bankBookImg || '');
      setIdCardImg(userInfo.idCardImg || '');
      setSignImg(userInfo.signImg || '');
    }		
		
  }, [userInfo]);

	const handleName = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newName = event.target.value;
		setName(newName);
		setIsValueChanged(true);
	};

	const handleNameBlur = () => {
		
		if (!isValidName(name)){
			setErrorMsg((prev) => ({...prev, name : `${name? '올바른 이름이 아닙니다' : ''}`}));
			setName('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, name : undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handleGrade = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newGrade = event.target.value;
		setGrade(newGrade);
		setIsValueChanged(true);
	};

	const handleGradeBlur = () => {
		if (!isValidStudentNumber(grade)){
			setErrorMsg((prev) => ({...prev, grade : `${grade? '올바른 학년이 아닙니다' : ''}`}));
			setGrade('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, grade : undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handleMajor = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newMajor = event.target.value;
		setMajor(newMajor);
		setIsValueChanged(true);
	};

	const handleMajorBlur = () => {
		if(!isValidName(major)){
			setErrorMsg((prev) => ({...prev, major : `${major? '올바른 학과가 아닙니다' : ''}`}));
			setMajor('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, major : undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handleStudentNumber = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newStudentNumber = event.target.value;
		setStudentNumber(newStudentNumber);
		setIsValueChanged(true);
	};

	const handleStudentNumberBlur = () => {
		if (!isValidStudentNumber(studentNumber)){
			setErrorMsg((prev) => ({...prev, studentNumber : `${studentNumber? '올바른 학번이 아닙니다' : ''}`}));
			setStudentNumber('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, studentNumber: undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handlePhoneNumber = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newPhoneNumber = event.target.value;
		setPhoneNumber(newPhoneNumber);
		setIsValueChanged(true);
	};

	const handlePhoneNumberBlur = () => {
		if (!isValidPhoneNumber(phoneNumber)){
			setErrorMsg((prev) => ({...prev, phoneNumber : `${phoneNumber? '올바른 연락처가 아닙니다' : ''}`}));
			setPhoneNumber('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, phoneNumber : undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handleEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = event.target.value;
		setEmail(newEmail);
		setIsValueChanged(true);
	};

	const handleEmailBlur = () => {
		if (!isValidEmail(email)){
			setErrorMsg((prev) => ({...prev, email : `${email? '올바른 이메일이 아닙니다' : ''}`}));
			setEmail('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, email : undefined}));
			setLastBlurTime(Date.now());
		}
	};


	const handleBankAccount = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newBankAccount = event.target.value;
		setBankAccount(newBankAccount);
		setIsValueChanged(true);
	};

	const handleBankAccountBlur = () => {
		if (!isValidAccountNumber(bankAccount)){
			setErrorMsg((prev) => ({...prev, bankAccount : `${bankAccount? '올바른 계좌번호가 아닙니다' : ''}`}));
			setBankAccount('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, bankAccount : undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handleBankName = (event : React.ChangeEvent<HTMLInputElement>) => {
		const newBankName = event.target.value;
		setBankName(newBankName);
		setIsValueChanged(true);
	};

	const handleBankNameBlur = () => {
		if(!isValidName(bankName)){
			setErrorMsg((prev) => ({...prev, bankName : `${bankName? '올바른 은행명이 아닙니다' : ''}`}));
			setBankName('');
			setIsValueChanged(false);
		}else{
			setErrorMsg((prev) => ({...prev, bankName : undefined}));
			setLastBlurTime(Date.now());
		}
	};

	const handlebankBookImg = (file : File | null) => {
		if(file){
			convertToBase64(file, setBankBookImg);
			setIsValueChanged(true);
		}else{
			setBankBookImg('');
		}
		handleBlur();
	};

	const handleIdCardImg= (file : File | null) => {
		if(file){
			convertToBase64(file, setIdCardImg);
			setIsValueChanged(true);
		}else{
			setIdCardImg('');
		}
		handleBlur();
	};

	const handleSignImg = (file : File | null) => {
		if(file){
			convertToBase64(file, setSignImg);
			setIsValueChanged(true);
		}else{
			setSignImg('');
		}
		handleBlur();
	};

	const convertToBase64 = (file : File, callback: (base64String : string) => void) => {
		const reader = new FileReader();
		reader.onload = () => {
			callback(reader.result as string);
		};
		reader.readAsDataURL(file); 
	};//fileReader 알아보기
	

	return (
		<form className={classes.container}>
			<div className={`${classes.wrapper} ${classes.end_double}`}>
				<div>
					<div className={classes.big_title}>내 정보</div>
				</div>
			</div>
			<Divider/>		
			<div className={classes.big_title}>기본 정보</div>

			<div className={`${classes.wrapper} ${classes.double}`}>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>이름</div>
						<input 
							className={classes.input}
							type='text'
							onChange={handleName}
							onBlur={handleNameBlur}
							value={name}
						/>
						{errorMsg.name && <div className={classes.errorMsg}>{errorMsg.name}</div>}
					</div>
				</div>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>학과</div>
						<input
							className={classes.input} 
							type='text'
							onChange={handleMajor}	
							onBlur={handleMajorBlur}
							value={major}
						/>
						{errorMsg.major && <div className={classes.errorMsg}>{errorMsg.major}</div>}
					</div>
				</div>
			</div>

			<div className={`${classes.wrapper} ${classes.double}`}>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>학년</div>
						<input 
							className={classes.input}
							type='text'
							onChange={handleGrade}
							onBlur={handleGradeBlur}
							value={!grade ? '' : grade.toString()}
						/>
						{errorMsg.grade && <div className={classes.errorMsg}>{errorMsg.grade}</div>}
					</div>
				</div>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>학번</div>
						<input
							className={classes.input} 
							type='text'
							onChange={handleStudentNumber}	
							onBlur={handleStudentNumberBlur}
							value={studentNumber}
						/>
						{errorMsg.studentNumber && <div className={classes.errorMsg}>{errorMsg.studentNumber}</div>}
					</div>
				</div>
			</div>

			<div className={`${classes.wrapper} ${classes.double}`}>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>전화번호</div>
						<input 
							className={classes.input}
							type='text'
							onChange={handlePhoneNumber}
							onBlur={handlePhoneNumberBlur}
							value={phoneNumber}
						/>
						{errorMsg.phoneNumber && <div className={classes.errorMsg}>{errorMsg.phoneNumber}</div>}
					</div>
				</div>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>이메일</div>
						<input
							className={classes.input} 
							type='text'
							onChange={handleEmail}	
							onBlur={handleEmailBlur}
							value={email}
						/>
						{errorMsg.email && <div className={classes.errorMsg}>{errorMsg.email}</div>}
					</div>
				</div>
			</div>
			
			<Divider/>	
			
			<div className={classes.big_title}>통장 및 신분증사본</div>
			<div className={classes.wrapper}>
				<div>
					<div className={classes.small_title}>통장사본</div>
					<ImageControler onImageChange={handlebankBookImg} data={bankBookImg}/>
				</div>
			</div>
			<div className={`${classes.wrapper} ${classes.double}`}>
				<div className={classes.wrapper}>
					<div>
						<div className={classes.small_title}>계좌번호</div>
						<input
							className={classes.input} 
							type='text'
							onChange={handleBankAccount}	
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
							onChange={handleBankName}
							onBlur={handleBankNameBlur}
							value={bankName}
						/>
						{errorMsg.bankName && <div className={classes.errorMsg}>{errorMsg.bankName}</div>}
					</div>
				</div>
			</div>


			<div className={classes.wrapper}>
				<div>
					<div className={classes.small_title}>신분증사본</div>
					<ImageControler onImageChange={handleIdCardImg} data={idCardImg}/>
				</div>
			</div>

			<div className={classes.wrapper}>
				<div>
					<div className={classes.small_title}>서명 사진</div>
					<ImageControler onImageChange={handleSignImg} data={signImg}/>
				</div>
			</div>
		</form>
	)
}

export default UserInfo;