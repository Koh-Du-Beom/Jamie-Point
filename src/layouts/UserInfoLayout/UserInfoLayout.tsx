
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
		<div className={classes.userInfoLayout}>
			<TopNavBar/>
			<div className={classes.content}>
				{children}
				{ isModalOpen ? <FinalCheckModal onClose={closeModal}/> : null }
			</div>
			<BottomNavBar openModal={openModal}/>
			<div className={classes.footer_wrapper}>
				<BottomInfo/>
			</div>
		</div>
	)
};

export default UserInfoLayout;