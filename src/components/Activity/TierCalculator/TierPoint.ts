import BaekJoonTierPoint from "./BaekJoonTierPoint"
import ProgrammersTierPoint from "./ProgrammersTierPoint"

const TierPoint = (selectedType : string, prevTier : string, currentTier : string) => {
	
	if (selectedType === '프로그래머스 1레벨/2레벨/3레벨 이상'){
		const prevTierPoint = ProgrammersTierPoint.find((item) => (item.tier === prevTier))?.point;
		const currentTierPoint = ProgrammersTierPoint.find((item) => (item.tier === currentTier))?.point;

		if (prevTierPoint && currentTierPoint){
			const finalPoint = currentTierPoint - prevTierPoint;
			return finalPoint >= 30 ? 30 : finalPoint
		}
	}else{
		const prevBigTier = prevTier.split(' ')[0];
		const prevSmallTier = prevTier.split(' ')[1];

		const currentBigTier = currentTier.split(' ')[0];
		const currentSmallTier = currentTier.split(' ')[1];

		if (prevBigTier !== currentBigTier){
			const prevTierPoint = BaekJoonTierPoint.find((item) => (item.bigTier === prevBigTier))?.smallTier.find((item) => item.tier === prevSmallTier)?.point;
			const currentTierPoint = BaekJoonTierPoint.find((item) => (item.bigTier === currentBigTier))?.smallTier.find((item) => item.tier === currentSmallTier)?.point;

			if (prevTierPoint && currentTierPoint){
				const finalPoint = currentTierPoint - prevTierPoint;
				return finalPoint >= 30 ? 30 : finalPoint;
			}
		}
	}
};

export default TierPoint;