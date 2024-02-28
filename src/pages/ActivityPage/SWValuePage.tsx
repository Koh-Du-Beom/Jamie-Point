/*eslint-disable*/
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Activity from "../../components/Activity/Activity";
import { useState, useEffect } from "react";
import ActivityType from "../../types/ActivityType.type";
import classes from './ActivityPageStyles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../../stores/redux/store";
import { updateActivity, removeActivity, updateSWValueInfo, } from "../../stores/redux/activitySlice";
import {v4 as uuidv4} from 'uuid';
import plusButton from '../../assets/plusButton.webp';
import summaryButton from '../../assets/summaryButton.webp';

const SWValuePage:React.FC = () => {
	const area:string = 'SW가치확산역량';
	const defaultActivity: ActivityType = {
		id: uuidv4(),
		pageType: area,
		activityImg: "",
		program: "",
		type: "",
		topic: "", 
		point: 0,
		agency: "",
		date: "",
		detail: "",
	};
	const [activitiesData, setActivitiesData] = useState<ActivityType[]>([defaultActivity]);

	const handlePlusButton = () => {
		const newActivity : ActivityType= {
			id : uuidv4(),
			pageType : area,
			activityImg : "",
			program: "",
			type : "",
			topic : "", 
			point : 0,
			agency : "",
			date : "",
			detail : "",
		}
		setActivitiesData([...activitiesData, newActivity]);
	}


	const dispatch = useDispatch<AppDispatch>();
	const activityInfo = useSelector((state : RootState) => state.activityInfo);
	

	useEffect(()=>{
		const filteredActivities = activityInfo.activities.filter(activity => activity.pageType === area);
		if (filteredActivities.length === 0){
			setActivitiesData([defaultActivity]);
		}else{
			setActivitiesData(filteredActivities);
		}
	}, [activityInfo.activities, area])

	//현재 상태를 하위컴포넌트의 handleActivityChange를 통해서 상위컴포넌트의 activityData를 업데이트해주는 로직을
	//선택했는데, 이거 때문에 최신값이 반영이 안되는 문제점이 있었음,
	const handleActivityChange = (activityId : string, updatedActivity : ActivityType) => {
		setActivitiesData(activitiesData => {
			const updatedActivitiesData = activitiesData.map(activity =>
				activity.id === activityId ? updatedActivity : activity
			);
			// 업데이트된 activitiesData로 상태를 설정한 직후에 리덕스 스토어를 업데이트합니다.
			updatedActivitiesData.forEach(activity => {
				dispatch(updateActivity({id: activity.id, activity}))
			});
			return updatedActivitiesData;
		});
	};

	const handleRemoveActivity = (activityId : string) => {
    setActivitiesData(activitiesData.filter(activity => activity.id !== activityId));
		dispatch(removeActivity({ id : activityId}))
	};

	useEffect(()=>{
		const calculateSWCoreInfo = () => {
			const realActivitiesData = activitiesData.filter(activity => activity.point !== 0)
			// point가 0이 아닌, 즉 올바르게 입력된 데이터에 대해서만 정보를 업데이트
			
			const totalPoint = realActivitiesData.reduce((acc, activity) => acc + (activity.point || 0), 0);
			const activityCount = realActivitiesData.length;
			dispatch(updateSWValueInfo({ activityCount, totalPoint }));
		};

		calculateSWCoreInfo();
	}, [activitiesData, dispatch]);

	return (
		<MainLayout>	
			<div className={`${classes.button_container}` }>
				<div className={`${classes.button_wrapper} ${classes.tooltip}`}>
					<img src={plusButton} onClick={handlePlusButton} alt="plusButton"/>
					<span className={classes.tooltiptext}>활동 추가하기</span>
				</div>
				<div className={`${classes.button_wrapper} ${classes.tooltip}`}>
					<img src={summaryButton} alt="summaryButton"/>
					<span className={classes.tooltiptext}>등록 활동 목록</span>
				</div>
			</div>
			
			{activitiesData.slice().reverse().map((activity) => (
				<Activity
					key={activity.id}
					id={activity.id}
					area={area}
					activitiesData={activity}
					onRemove={handleRemoveActivity}
					onActivityChange={handleActivityChange}
				/>
			))}
		</MainLayout>
	)
};

export default SWValuePage;