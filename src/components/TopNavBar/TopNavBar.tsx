import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './TopNavBar.module.css';
import JPointLogo from '../../assets/JPointLogo2.webp';
import userInfoLogo from '../../assets/userInfo.webp';
const TopNavBar : React.FC = () => {
	const navigate = useNavigate();

  return (
    <div className={classes.navbar}>
			<div className={classes.logo} onClick={()=> navigate('/')}>
				<img src={JPointLogo} alt='JPointLogo'/>
			</div>
			<div className={classes.navItems}>
				<div className={classes.navItem} onClick={()=>navigate('/activity')}>How To Use?</div>
				<div className={classes.navItem}>어떤내용할지 고민</div>
			</div>
			<div className={classes.navItems}>
				
				<div className={classes.navItem} onClick={()=>navigate('/activity/SW핵심역량')}>활동 입력</div>
				<div className={classes.navItem} onClick={()=>navigate('/info')}>
					<img src={userInfoLogo} alt='userInfoLogo'/>
				</div>
			</div>
		</div>
  );
}

export default TopNavBar;
