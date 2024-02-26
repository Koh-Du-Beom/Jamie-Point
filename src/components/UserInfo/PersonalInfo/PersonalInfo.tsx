
import { useState, useEffect } from 'react';
import classes from '../../../styles/FormStyles.module.css';
import { AppDispatch } from '../../../stores/redux/store';

import ImageControler from '../../ImageControler/ImageControler';
import convertToBase64 from '../../../utils/commonFunctions/convertToBase64';
import UserInfoType from '../../../types/UserInfoType.type';
import { updateUserInfo } from '../../../stores/redux/userSlice';

interface InfoProps {
  userInfo: UserInfoType;
  dispatch: AppDispatch; // AppDispatch 타입을 직접 사용
}

const PersonalInfo : React.FC<InfoProps> = ({ userInfo, dispatch }) => {

	const [idCardImg, setIdCardImg] = useState<string>('');
	const [signImg, setSignImg] = useState<string>('');

	const handleIdCardImg= (file : File | null) => {
		if(file){
			convertToBase64(file, setIdCardImg);
			dispatch(updateUserInfo({...userInfo, idCardImg}));
		}else{
			setIdCardImg('');
		}
	};

	const handleSignImg = async (file : File | null) => {
		if(file){
			convertToBase64(file, setSignImg);
			dispatch(updateUserInfo({...userInfo, signImg}));
		}else{
			setSignImg('');
		}
	};

	useEffect(()=> {
		if(userInfo){
			setIdCardImg(userInfo.idCardImg);
			setSignImg(userInfo.signImg);
		}

	}, [userInfo]);

	return (
		<>
			<div className={classes.big_title}>개인 정보</div>
			<div className={classes.wrapper}>
				<div className={classes.small_title}>신분증사본</div>
				<ImageControler onImageChange={handleIdCardImg} data={idCardImg}/>
			</div>
			<div className={classes.wrapper}>
				<div>
					<div className={classes.small_title}>서명 사진</div>
					<ImageControler onImageChange={handleSignImg} data={signImg}/>
				</div>
			</div>
		
		</>
	)
}

export default PersonalInfo;