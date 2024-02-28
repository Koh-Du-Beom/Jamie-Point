/*eslint-disable*/
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Activity from "../../components/Activity/Activity";
import ActivityType from "../../types/ActivityType.type";
import { useState, useEffect } from "react";
import classes from './ActivityPageStyles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../../stores/redux/store";
import { updateActivity, removeActivity, updateSWCoreInfo } from "../../stores/redux/activitySlice";
import { v4 as uuidv4 } from 'uuid';
import plusButton from '../../assets/plusButton.webp';
import summaryButton from '../../assets/summaryButton.webp';

const SWCorePage:React.FC = () => {

	const area:string = 'SW핵심역량';
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
	}, [activityInfo.activities, area]);

	//현재 상태를 하위컴포넌트의 handleActivityChange를 통해서 상위컴포넌트의 activityData를 업데이트해주는 로직을
	//선택했는데, 이거 때문에 최신값이 반영이 안되는 문제점이 있었음,
	const handleActivityChange = (activityId : string, updatedActivity : ActivityType) => {
		setActivitiesData(activitiesData => {
			const updatedActivitiesData = activitiesData.map(activity =>
				activity.id === activityId ? updatedActivity : activity
			);
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

			dispatch(updateSWCoreInfo({ activityCount, totalPoint }));
		};

		calculateSWCoreInfo();
	}, [activitiesData, dispatch]);
	
	// 사이드이펙트의 관리. 원래 handleActivityChange에서 calculate을 했지만, 이 경우 
	//Cannot update a component (`SWCooperationPage`) while rendering a different component 오류가 발생
	//리액트최적화와 안맞는 코드이므로 useEffect를 통해 sideEffect를 관리해야한다.
	//이 경우 발생하는 이슈는 렌더링 최적화가 안되어 만약 포인트가 바뀐경우 바로 반영되지 않고 다른 컴포넌트 정보를 바꿔야
	//되는 이슈가 가장 크다. 이걸 해결하기 위해 useEffect를 사용하는것임.
	
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
			{/* 원래 activitiesData를 그래도 map해서 보여주는 식으로 했지만, slice를 통한 얕은 복사를 통해 
			원본인 activititiesData에도 손상이 가지 않으면서 의도한 대로 보여주기 */}
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

export default SWCorePage;