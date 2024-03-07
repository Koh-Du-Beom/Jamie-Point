/*eslint-disable*/
import { useEffect, useState } from "react";
import classes from "../../styles/FormStyles.module.css";
import ImageControler from "../ImageControler/ImageControler";
import ActivityDropDown from "./ActivityDropDown/ActivityDropDown";
import ActivityType from "../../types/ActivityType.type";
import styled from "styled-components";
import TierCalculator from "./TierCalculator/TierCalculator";
import Divider from "../Divider/Divider";
import convertToBase64 from "../../utils/commonFunctions/convertToBase64";
import { useDispatch, } from "react-redux";
import { AppDispatch, } from "../../stores/redux/store";
import { updateActivity } from "../../stores/redux/activitySlice";
import Calender from "../Calender/Calender";

const AreaWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

interface ActivityProps {
	area: string;
	activitiesData : ActivityType;
	onRemove: (activityId: string) => void;
  onActivityChange: (activityId: string, updatedActivity: ActivityType) => void;
	id : string;
}

interface ActivityDropDownProps {
	program : string;
	type : string;
	topic : string;
	point : number;
}


const Activity : React.FC<ActivityProps> = ({area, activitiesData, onRemove, onActivityChange , id}) => {
	
	const [activityImg, setActivityImg] = useState<string>("");
	const [program, setProgram] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [topic, setTopic] = useState<string>("");
	const [point, setPoint] = useState<number>(0);
	
	const [agency, setAgency] = useState<string>("");
	const [detail, setDetail] = useState<string>("");
	const dispatch = useDispatch<AppDispatch>();

	const dropDowns : ActivityDropDownProps= {
		program : program,
		type : type,
		topic : topic,
		point : point,
	};

	const handleActivityImg = (newImage: File) => {
		if (newImage) {
			convertToBase64(newImage, (base64String) => {
				setActivityImg(base64String);
				const updatedActivity: ActivityType = {
					...activitiesData,
					activityImg: base64String,
				};
				onActivityChange(id, updatedActivity);
			});
			
		} else {
			setActivityImg("");
			const updatedActivity: ActivityType = {
				...activitiesData,
				activityImg: "",
			};
			onActivityChange(id, updatedActivity);
		}
	};

	const handleAgencyBlur = () => {
		const updatedActivity : ActivityType = {
			...activitiesData,
			agency : agency,
		};
		onActivityChange(id, updatedActivity);
	}

	const handleDetailBlur = () => {
		const updatedActivity : ActivityType = {
			...activitiesData,
			detail : detail,
		};
		onActivityChange(id, updatedActivity);
	}

	useEffect(() => {		
		setActivityImg(activitiesData.activityImg);
    setProgram(activitiesData.program)
		setType(activitiesData.type);
		setTopic(activitiesData.topic);
		setPoint(activitiesData.point);

		setAgency(activitiesData.agency);
		setDetail(activitiesData.detail);
		

	}, [activitiesData]); // 페이지가 처음 렌더링 될때 실행

	const handleDropDownChange = (selectedData : ActivityDropDownProps) => {
		const {program, type, topic, point} = selectedData;
		setProgram(program);
		setType(type);
		setTopic(topic);
		setPoint(point);
		
		const updatedActivity: ActivityType = {
			...activitiesData,
			program: program,
			type: type,
			topic: topic,
			point: point,
		};
	
		onActivityChange(id, updatedActivity);
	}

	const handlePsChange = (point : number, newDetail: string) => {
		dispatch(updateActivity({ id: id, activity: { ...activitiesData, point : point, detail: newDetail }}));
	}

	return (
		<div className={classes.container}>
			
			<div className={`${classes.end_double}`}>
				<AreaWrapper>
					<div className={classes.big_title}>{area}</div>
				</AreaWrapper>
				<div className={`${classes.wrapper}`}>
					<button className={`${classes.button_wrapper} ${classes.close_button}`} onClick={()=>onRemove(id)}/>		
				</div>			
			</div>
			<Divider/>
			
			<div className={classes.wrapper}>
				<div className={classes.big_title}>사진 입력</div>
				<ImageControler onImageChange={handleActivityImg} data={activityImg}/>
			</div>

			<div className={classes.wrapper}>
				<div className={classes.big_title}>활동 내역</div>
				<ActivityDropDown 
					selectedArea={area}
					onDropDownChange={handleDropDownChange}
					dropDownData={dropDowns}
				/>
				{program === '코딩 문제풀이' && type && <TierCalculator selectedType={type} activityImg={activityImg} handlePsChange={handlePsChange}/>}
				{point ? <div className={classes.small_title}>{`환산점수 : ${point}`}</div> : null}
				
			</div>
			
			<div className={classes.big_title}>활동 세부 사항 </div>
			
			<div className={classes.wrapper}>
				<div className={classes.small_title}>취득기관</div>
				<input 
					className={classes.input}
					type='text'
					onChange={(e) =>setAgency(e.target.value)}
					onBlur={handleAgencyBlur}
					value={agency}
					name="agency"
				/>
			</div>

			<div className={classes.wrapper}>
				<div className={classes.small_title}>취득일자</div>
				<Calender activitiesData={activitiesData} onActivityChange={onActivityChange} id={id}/>
				
			</div>
			

			<div className={classes.wrapper}>
				<div className={classes.small_title}>상세정보</div>
				<input 
					className={classes.input}
					type='text'
					onChange={(e) => setDetail(e.target.value)}
					onBlur={handleDetailBlur}
					value={detail}
					name="detail"
				/>
			</div>
		</div>
	)
}

export default Activity;