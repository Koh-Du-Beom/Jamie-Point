/*eslint-disable*/
import TopNavBarLayout from '../../layouts/TopNavBarLayout/TopNavBarLayout';
import classes from './ActivityIntroPage.module.css'
import userInfoLogo from '../../assets/userInfo.webp';
import userInfoIntroFirst from '../../assets/Intro/UserInfoIntro/userInfoIntroFirst.png';
import userInfoIntroSecond from '../../assets/Intro/UserInfoIntro/userInfoIntroSecond.png';
import userInfoIntroThird from '../../assets/Intro/UserInfoIntro/userInfoIntroThird.png';

import activityIntroFirst from '../../assets/Intro/ActivityIntro/activityIntroFirst.png';
import activityIntroSecond from '../../assets/Intro/ActivityIntro/activityIntroSecond.png'
import activityIntroThird from '../../assets/Intro/ActivityIntro/activityIntroThird.png'

import documentationIntroFirst from '../../assets/Intro/DocumentationIntro/documentationIntroFirst.png';
import documentationIntroSecond from '../../assets/Intro/DocumentationIntro/documentationIntroSecond.png';

import useScrollFadeIn from '../../hooks/useScrollFadeIn';
import { useEffect, useState } from 'react';

const ActivityIntroPage:React.FC = () => {

	const [activeContent, setActiveContent] = useState<number>(0);
	const handleNext = () => {
		setActiveContent((prevContent) => prevContent + 1);
	};

	const handlePrev = () => {
		setActiveContent((prevIndex) => prevIndex - 1);
	};
	
	return (
		<TopNavBarLayout>
			<div className={classes.container}>
				<div className={classes.title_container}>
					<div className={classes.big_title}>How To Use</div>
					<div className={classes.sub_title}>Our Project?</div>
				</div>
				
				<div className={classes.content_container}>
					
					{activeContent > 0 && (
						<button className={`${classes.navigation_button} ${classes.button_prev}`} onClick={handlePrev}>이전</button>
					)}
					{activeContent < 2 && (
						<button className={`${classes.navigation_button} ${classes.button_next}`} onClick={handleNext}>다음</button>
					)}

					{activeContent === 0 && (
						<div className={`${classes.content_wrapper} ${classes.fadeIn}`}>
							<div className={classes.content_title}>개인정보 입력하기</div>
							<div className={classes.content_box}>
								<div className={classes.content}>
									1.<span><img src={userInfoLogo} className={classes.content_Icon} alt="userInfoLogo"/></span>
									버튼을 눌러 사용자 개인정보를 입력합니다
								</div>
							</div>
							<div className={classes.content_box}>
								<div className={classes.content}>
									2. 기본정보란에 정보를 모두 입력해주세요
								</div>
								<div className={classes.content}>
									<img className={classes.introImage} src={userInfoIntroFirst} alt="userInfoIntro1"/>
								</div>
							</div>
							
							<div className={classes.content_box}>
								<div className={classes.content}>
									3. 이미지를 업로드 해주세요
								</div>
								<div className={classes.content}>
									<img className={classes.introImage} src={userInfoIntroSecond} alt="userInfoIntroSecond"/>
									→
									<img className={classes.introImage} src={userInfoIntroThird} alt="userInfoIntroThird"/>
								</div>
							</div>
						</div>
					)}

					{activeContent === 1 && (
						<div className={`${classes.content_wrapper} ${classes.fadeIn}`}>
							<div className={classes.content_title}>활동정보 입력하기</div>
							<div className={classes.content_box}>
								<div className={classes.content}>1. 활동사진이 있다면 입력해주세요!</div>
								<div className={classes.content}>
									<img src={activityIntroFirst} alt='activityIntroFirst'/>
								</div>
							</div>
							<div className={classes.content_box}>
								<div className={classes.content}>
									2. 활동 내역을 입력해주세요
								</div>
								<div className={classes.content}>
									<img src={activityIntroSecond} alt='activityIntroSecond'/>
								</div>
							</div>

							<div className={classes.content_box}>
								<div className={classes.content}>
									3. 활동 세부사항을 입력해주세요 
								</div>
								<div className={classes.content}>
									<img src={activityIntroThird} alt='activityIntroThird'/>
								</div>
							</div>
							
						</div>
					)}

					{activeContent === 2 && (
						<div className={`${classes.content_wrapper} ${classes.fadeIn}`}>
							<div className={classes.content_title}>문서화하기</div>
							<div className={classes.content_box}>
								<div className={classes.content}>
									1. 오른쪽 하단에 있는 문서화하기 버튼을 눌러주세요
								</div>
								<div className={classes.content}>
									<img className={classes.content_Icon} src={documentationIntroFirst} alt='documentationIntroFirst'/>
								</div>
							</div>
							<div className={classes.content_box}>
								<div className={classes.content}>
									2. 내용을 확인하고 저장버튼을 눌러 문서화해주세요
								</div>
								<div className={classes.content}>
									<img className={classes.introImage} src={documentationIntroSecond} alt='documentationIntroSecond'/>
								</div>
							</div>
						</div>
					)}	
					
				</div>
			
			</div>
		</TopNavBarLayout>
	)
}

//지금 각자 다른 시간에 나오는거로 되어있는데, 스크롤 내릴 때 점점 선명하게 보이는 식으로 구현하기
export default ActivityIntroPage;