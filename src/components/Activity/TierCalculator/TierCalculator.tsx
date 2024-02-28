/*eslint-disable*/
import { useEffect, useState } from "react";
import classes from '../../../styles/FormStyles.module.css';
import TierPoint from "./TierPoint";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../stores/redux/store";
import { updatePS } from "../../../stores/redux/psSlice";


interface TierCalculatorProps{
	selectedType : string;
	activityImg : string;
	setPoint : (point : number) => void;
	detail : string;
	setDetail : (detail : string) => void;
}

const TierCalculator: React.FC<TierCalculatorProps> = ({selectedType, activityImg, setPoint, detail, setDetail}) => {
	
	const [prevBigTier, setPrevBigTier] = useState<string>('');
	const [prevTier, setPrevTier] = useState('');

	const [currentBigTier, setCurrentBigTier] = useState<string>('');
	const [currentTier, setCurrentTier] = useState<string>('');

	const bojBigTiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'];
	const bojSmallTiers = ['I', 'II', 'III', 'IV', 'V'];
	const programmersTiers = ['Lv.0', 'Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5'];

	const dispatch = useDispatch<AppDispatch>();
	const psInfo = useSelector((state : RootState) => state.psInfo);

	const [psId, setPsId] = useState<string>('');

	const handlePrevBigTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPrevBigTier(event.target.value);
		setPrevTier('');
	};
	
	// 선택한 큰 티어에 따라 작은 티어 선택지 생성
	const getBojPrevTierOptions = () => {
		if (!prevBigTier) return []; 
		return bojSmallTiers.map(smallTier => `${prevBigTier} ${smallTier}`);
	};

	const handleCurrentBigTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentBigTier(event.target.value);
		setCurrentTier('');
	};

	const getBojCurrentTierOptions = () => {
		if (!currentBigTier) return []; 
		return bojSmallTiers.map(smallTier => `${currentBigTier} ${smallTier}`);
	};


	const handleProgPrevTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPrevTier(event.target.value);
	}

	const handleProgCurrentTierChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentTier(event.target.value);
	}

	const handlePsIdBlur = () => {
		dispatch(updatePS({...psInfo, psID : psId}));
	}

	useEffect(() => {
		if (prevTier && currentTier) {
			const newDetail = prevTier + ' → ' + currentTier;
			setDetail(newDetail);
			const point = TierPoint(selectedType, prevTier, currentTier);
			if (point){
				setPoint(point);
				console.log('포인트설정됨');
			}
		
			// detail이 업데이트될 때 Redux 상태 업데이트
			dispatch(updatePS({
				type: selectedType,
				psID: psId,
				detail: newDetail,
				psImage: activityImg
			}));
		}

		// 지금 해야할거 : updateSWTotal 이런거 해주고, p
	}, [prevTier, currentTier, selectedType, psId, activityImg, dispatch]);

	useEffect(()=>{
		console.log(psInfo);
		
	}, [psInfo]);

	useEffect(()=>{
		if (psInfo.detail){
			const prevTierInfos = psInfo.detail.split(" → ")[0];
			const currentTierInfos = psInfo.detail.split(" → ")[1];
			
			setPrevBigTier(prevTierInfos.split(" ")[0]);
			setPrevTier(prevTierInfos);

			setCurrentBigTier(currentTierInfos.split(" ")[0]);
			setCurrentTier(currentTierInfos);
			setPsId(psInfo.psID);
			setDetail(psInfo.detail);
			const point = TierPoint(selectedType, prevTier, currentTier);
			if (point){
				setPoint(point);
				console.log('포인트설정됨');
			}
		}
		
	}, [psInfo])

	return (
		
		<>
			<div className={classes.wrapper}>
				<div className={classes.wrapper}>
					<div className={classes.small_title}>
						{selectedType === '프로그래머스 1레벨/2레벨/3레벨 이상' ? '프로그래머스ID' : '백준ID'}
					</div>
					<input 
						className={classes.input}
						type="text"
						onChange={(e) => setPsId(e.target.value)}
						onBlur={handlePsIdBlur}
						value={psId}
					/>
				</div>
				
				<div className={classes.wrapper}>
					<div className={classes.small_title}>이전 티어 선택</div>		
					
				{selectedType === '프로그래머스 1레벨/2레벨/3레벨 이상' ? (
					<div className={classes.wrapper}>
						<select value={prevTier} onChange={handleProgPrevTierChange}>
							<option value="">이전 티어를 선택해주세요</option>
							{programmersTiers.map((tier, index) => <option key={index} value={tier}>{tier}</option>)}
						</select>	
					</div>
				) : (
					<div style={{display: "flex"}}>
						<div className={classes.wrapper}>
							<select value={prevBigTier} onChange={handlePrevBigTierChange}>
								<option value="">큰 티어를 선택해주세요</option>
								{bojBigTiers.map((tier, index) => <option key={index} value={tier}>{tier}</option>)}
							</select>
						</div>
						{prevBigTier? (
							<div className={classes.wrapper}>
								<select value={prevTier} onChange={(e) => setPrevTier(e.target.value)}>
									<option value="">전체 티어를 선택해주세요</option>
									{getBojPrevTierOptions().map((option, index) => <option key={index} value={option}>{option}</option>)}
								</select>	
							</div>
						) : null}
						
					</div>)}
			</div>
			<div className={classes.wrapper}>
				<div className={classes.small_title}>현재 티어 선택</div>
				{selectedType === '프로그래머스 1레벨/2레벨/3레벨 이상' ? (
					<div className={classes.wrapper}>
						<select value={currentTier} onChange={handleProgCurrentTierChange}>
							<option value="">현재 티어를 선택해주세요</option>
							{programmersTiers.map((tier, index) => <option key={index} value={tier}>{tier}</option>)}
						</select>	
					</div>
				) : (
					<div style={{display: "flex"}}>
						<div className={classes.wrapper}>
							<select value={currentBigTier} onChange={handleCurrentBigTierChange}>
								<option value="">큰 티어를 선택해주세요</option>
								{bojBigTiers.map((tier, index) => <option key={index} value={tier}>{tier}</option>)}
							</select>
						</div>
						{currentBigTier ? (
							<div className={classes.wrapper}>
								<select value={currentTier} onChange={(e) => setCurrentTier(e.target.value)}>
									<option value="">전체 티어를 선택해주세요</option>
									{getBojCurrentTierOptions().map((option, index) => <option key={index} value={option}>{option}</option>)}
								</select>
							</div>
						) : null}
						
					</div>)}
				</div>
				
					
					
			</div>
		</>
	);
}

export default TierCalculator;