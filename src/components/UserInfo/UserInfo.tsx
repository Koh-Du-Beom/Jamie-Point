/*eslint-disable*/
import classes from '../../styles/FormStyles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../stores/redux/store';
import Divider from '../Divider/Divider';
import IdentityInfo from './IdentityInfo/IdentityInfo';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import ContactInfo from './ContactInfo/ContactInfo';
import BankInfo from './BankInfo/BankInfo';

const UserInfo : React.FC = () => {
	
	const dispatch = useDispatch<AppDispatch>();
	const userInfo = useSelector((state: RootState) => state.userInfo);
	
	return (
		<form className={classes.container}>
			<IdentityInfo userInfo={userInfo} dispatch={dispatch}/>
			<Divider/>		

			<ContactInfo userInfo={userInfo} dispatch={dispatch}/>
			<Divider/>

			<PersonalInfo userInfo={userInfo} dispatch={dispatch}/>
			<Divider/>	
			
			<BankInfo userInfo={userInfo} dispatch={dispatch}/>
			<Divider/>
		</form>
	)
}

export default UserInfo;