/*eslint-disable*/
import classes from './BottomNavBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../stores/redux/store';

interface BottomNavBarProps{
	openModal : () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({openModal}) => {

	const userInfo = useSelector((state : RootState) => state.userInfo)
	const isAbleToDocument = () => {
		const swCorePoint = userInfo.swCoreInfo.totalPoint;
		const swCooperationPoint = userInfo.swCooperationInfo.totalPoint;
		const swValuePoint = userInfo.swValueInfo.totalPoint;
		const swConvergencePoint = userInfo.swConvergenceInfo.totalPoint;

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