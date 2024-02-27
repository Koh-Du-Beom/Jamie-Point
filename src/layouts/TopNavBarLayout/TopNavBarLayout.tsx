import React from 'react';
import classes from './TopNavBarLayout.module.css'
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import BottomInfo from '../../components/Footer/BottomInfo/BottomInfo';

const HomeLayout : React.FC<{children : React.ReactNode}> = ({ children }) => {
	return (
		<>
			<TopNavBar/>	
			<div className={classes.homeLayout}>
				
				<div className={classes.content}>
					{children}
				</div>
				<div className={classes.footer_wrapper}>
					<BottomInfo/>
				</div>
				
			</div>
		</>
		
	)
};

export default HomeLayout;

