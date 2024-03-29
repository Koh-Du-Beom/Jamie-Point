
import { useState, useEffect } from 'react';
import classes from '../../../styles/FormStyles.module.css';
import { AppDispatch } from '../../../stores/redux/store';
import { updateUserInfo } from '../../../stores/redux/userSlice';
import { isValidName, isValidStudentNumber, } from '../../../utils/regularExpression/isValidUserInfo';
import UserInfoType from '../../../types/UserInfoType.type';

interface InfoProps {
  userInfo: UserInfoType;
  dispatch: AppDispatch; // AppDispatch 타입을 직접 사용
}

const IdentityInfo : React.FC<InfoProps> = ({userInfo, dispatch}) => {
	
	const [name, setName] = useState<string>('');
	const [major, setMajor] = useState<string>(''); //전공
	const [grade, setGrade] = useState<string>('');
	const [studentNumber, setStudentNumber] = useState<string>('');

	const [errorMsg, setErrorMsg] = useState<{
		name?: string;
		grade?: string;
		major?: string;
		studentNumber?: string;
	}>({});

	//useRef 이용해 만약 잘못된 입력값이면 커서를 잘못된 필드로 옮겨보기

	const handleNameBlur = () => {
		if (!isValidName(name)){
			setErrorMsg((prev) => ({...prev, name : `${name? '올바른 이름이 아닙니다' : ''}`}));
			setName('');
			dispatch(updateUserInfo({ ...userInfo, name : '' }));
		}else{
			setErrorMsg((prev) => ({...prev, name : undefined}));
			dispatch(updateUserInfo({ ...userInfo, name }));
		}
	}

	const handleMajorBlur = () => {
		if(!isValidName(major)){
			setErrorMsg((prev) => ({...prev, major : `${major? '올바른 학과가 아닙니다' : ''}`}));
			setMajor('');
			dispatch(updateUserInfo({ ...userInfo, major : ''}));
		}else{
			setErrorMsg((prev) => ({...prev, major : undefined}));
			dispatch(updateUserInfo({ ...userInfo, major}));
		}
	}

	const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newGrade = e.target.value;
		setGrade(newGrade); // grade 상태 업데이트
		dispatch(updateUserInfo({ ...userInfo, grade: newGrade })); // redux 상태 업데이트
};

	const handleStudentNumberBlur = () => {
		if (!isValidStudentNumber(studentNumber)){
			setErrorMsg((prev) => ({...prev, studentNumber : `${studentNumber? '올바른 학번이 아닙니다' : ''}`}));
			setStudentNumber('');
			dispatch(updateUserInfo({ ...userInfo, studentNumber : ''}));
		}else{
			setErrorMsg((prev) => ({...prev, studentNumber: undefined}));
			dispatch(updateUserInfo({ ...userInfo, studentNumber}));
		}
	}

	useEffect(()=> {
		if(userInfo){
			setName(userInfo.name);
      setGrade(userInfo.grade);
      setMajor(userInfo.major);
      setStudentNumber(userInfo.studentNumber);
		}	
	}, [userInfo]);
	// redux의 상태로 다른페이지를 다녀와도 업데이트 해주는 로직

	return (
		<>
			<div className={classes.big_title}>기본 정보</div>
			<div className={classes.wrapper}>
				<div className={classes.small_title}>이름</div>
				<input 
					className={classes.input}
					type='text'
					value={name}
					onChange={(e)=>setName(e.target.value)}
					onBlur={handleNameBlur}
					name='name'
				/>
				{errorMsg.name && <div className={classes.errorMsg}>{errorMsg.name}</div>}
			</div>

			<div className={classes.wrapper}>		
				<div className={classes.small_title}>학과</div>
				<input
					className={classes.input} 
					type='text'
					value={major}
					onChange={(e)=>{setMajor(e.target.value)}}	
					onBlur={handleMajorBlur}
					name='major'
				/>
				{errorMsg.major && <div className={classes.errorMsg}>{errorMsg.major}</div>}
			
			</div>

			<div className={classes.wrapper}>
				<div className={classes.small_title}>학년</div>
				<select 
					value={grade} 
					onChange={handleGradeChange}
					name='grade'
					
				>
					<option value="">학년을 선택해주세요</option>
					{[1, 2, 3, 4].map((item, index) => (
						<option value={item} key={index}>{item}</option>
					))}
				</select>
				{errorMsg.grade && <div className={classes.errorMsg}>{errorMsg.grade}</div>}
			</div>
			

			<div className={classes.wrapper}>
				<div className={classes.small_title}>학번</div>
				<input
					className={classes.input} 
					type='text'
					value={studentNumber}
					onChange={(e) => {setStudentNumber(e.target.value)}}	
					onBlur={handleStudentNumberBlur}
					name='studentNumber'
				/>
				{errorMsg.studentNumber && <div className={classes.errorMsg}>{errorMsg.studentNumber}</div>}
				
			</div>
		</>
	)
}

export default IdentityInfo;