/*eslint-disable*/
import classes from './BottomNavBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../stores/redux/store';

interface BottomNavBarProps{
	openModal : () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({openModal}) => {

	const activityInfo = useSelector((state : RootState) => state.activityInfo)
	const isAbleToDocument = () => {
		const swCorePoint = activityInfo.swCoreInfo.totalPoint;
		const swCooperationPoint = activityInfo.swCooperationInfo.totalPoint;
		const swValuePoint = activityInfo.swValueInfo.totalPoint;
		const swConvergencePoint = activityInfo.swConvergenceInfo.totalPoint;

		return swCorePoint || swCooperationPoint || swValuePoint || swConvergencePoint;
	}

	return (
		<div className={classes.navbar}>
			<div className={classes.wrapper}>
				<button className={classes.web_button}>web</button>
				<button 
					className={isAbleToDocument()? classes.send_button : classes.disabled_button} 
					onClick={isAbleToDocument() ? openModal : undefined} 
					disabled={!isAbleToDocument()}
				>
					문서화하기
				</button>
			</div>
		</div>
	)
};

export default BottomNavBar;