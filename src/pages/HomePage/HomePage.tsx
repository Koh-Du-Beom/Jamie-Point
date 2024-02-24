
import TopNavBarLayout from "../../layouts/TopNavBarLayout/TopNavBarLayout";
import classes from './HomePage.module.css';
import { useState, useEffect } from "react";
import homePicture1 from '../../assets/HomePageMock/homePicture1.jpg';
import homePicture2 from '../../assets/HomePageMock/homePicture2.jpg';
import homePicture3 from '../../assets/HomePageMock/homePicture3.jpg';
import homePicture4 from '../../assets/HomePageMock/homePicture4.jpg';
import homePicture5 from '../../assets/HomePageMock/homePicture5.png';
import homePicture6 from '../../assets/HomePageMock/homePicture6.jpg';


const homePictures = [
	homePicture1,
	homePicture2,
	homePicture3,
	homePicture4,
	homePicture5,
	homePicture6
];



const HomePage = () => {

	const [currentImage, setCurrentImage] = useState<number>(0);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

	useEffect(()=>{
		const intervalId = setInterval(() => {
      setIsTransitioning(true); 
      setTimeout(() => {
        setCurrentImage((prevIndex) => 
          prevIndex === homePictures.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false); 
      }, 1000); 
    }, 3000); 

    return () => clearInterval(intervalId);
	})

  return (
    <TopNavBarLayout>
			<div className={classes.container}>
				<div className={classes.wrapper}>Made By JBNU CSAI</div>
				<div className={classes.imgContainer}>
					<div className={`${classes.imgWrapper} ${isTransitioning ? classes.fade : ''}`}>
						<img src={homePictures[currentImage]} alt="showImage animation"/>
					</div>
				</div>

				<div className={classes.wrapper}>
					About Our Project
				</div>
			</div>
		</TopNavBarLayout>
  )
}

export default HomePage;