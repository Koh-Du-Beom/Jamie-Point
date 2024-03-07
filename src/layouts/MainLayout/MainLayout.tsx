import React, { useState } from 'react';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import RightNavBar from '../../components/RightNavBar/RightNavBar';
import classes from './MainLayout.module.css';
import BottomNavBar from '../../components/Footer/BottomNavBar/BottomNavBar';
import BottomInfo from '../../components/Footer/BottomInfo/BottomInfo';
import FinalCheckModal from '../../components/Modal/FinalCheckModal';
import { useEffect } from 'react';

const MainLayout: React.FC<{children : React.ReactNode}> = ({children}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // rightNavBarWrapper의 스타일을 동적으로 조정하기 위한 객체
  const rightNavBarStyle = {
    transform: `translateY(${scrollY}px)`,
    transition: 'transform 0.5s ease-out',
  };

  return (
		<>
			<TopNavBar/>
			<div className={classes.mainLayout}>    
				
				<div className={classes.content}>
					<div className={classes.childrenWrapper}>{children}</div>
					<div className={classes.rightNavBarWrapper} style={rightNavBarStyle}><RightNavBar/></div>
					{ isModalOpen ? <FinalCheckModal closeModal={closeModal}/> : null }
					
				</div>		
			</div>
			<BottomNavBar openModal={openModal}/>
			<div className={classes.footer_wrapper}><BottomInfo/></div>
				
		</>
    
  )
}

export default MainLayout;