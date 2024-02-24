import classes from './BottomInfo.module.css';
import githubLogo from '../../../assets/github-mark-white.png';
import JPointLogo from '../../../assets/JPointLogo2.webp';
import discordLogo from '../../../assets/discordmage.webp';

const BottomInfo:React.FC = () => {
	return (
		<div className={classes.container}>
			<div className={classes.main_logo}>
				<img src={JPointLogo} alt='JpointLogo'/>
			</div>
			<div className={classes.menus}>
				<div className={classes.menu}>
					<div className={classes.menu_title}>
						<img src={githubLogo} alt='githubLogo'/>
						개발자들
					</div>
					<div className={classes.menu_content}><a className={classes.link} href='https://github.com/zs0057'>김지성</a></div>
					<div className={classes.menu_content}><a className={classes.link} href='https://github.com/Koh-Du-Beom'>고두범</a></div>
				</div>
				<div className={classes.menu}>
					<div className={classes.menu_title}>
						<img src={discordLogo} alt='discordLogo'/>
						디스코드
					</div>
					<div className={classes.menu_content}>JPoint</div>
				</div>
				<div className={classes.menu}>
					<div className={classes.menu_title}>추가내용 1</div>
				</div>
				<div className={classes.menu}>
					<div className={classes.menu_title}>추가내용 2</div>
				</div>
			</div>
		</div>
	)
};

export default BottomInfo;