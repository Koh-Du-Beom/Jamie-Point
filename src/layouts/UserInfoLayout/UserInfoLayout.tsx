
import BottomInfo from "../../components/Footer/BottomInfo/BottomInfo";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import classes from './UserInfoLayout.module.css'
import BottomNavBar from "../../components/Footer/BottomNavBar/BottomNavBar";
import FinalCheckModal from "../../components/Modal/FinalCheckModal";
import { useState } from "react";

const UserInfoLayout : React.FC <{children : React.ReactNode}> = ({children}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return( 
		<>
			<TopNavBar/>
			<div className={classes.userInfoLayout}>
				
				<div className={classes.content}>
					{children}
					{ isModalOpen ? <FinalCheckModal closeModal={closeModal}/> : null }
				</div>
				
			</div>
			<BottomNavBar openModal={openModal}/>
				<div className={classes.footer_wrapper}>
					<BottomInfo/>
				</div>
		</>
		
	)
};

export default UserInfoLayout;