import { NavigateFunction } from "react-router-dom"
const rightNavBarData = (navigate : NavigateFunction) => {
	//받아온 데이터가 없으면 새로 만들어주는 페이지로 이동하는 식으로 구현해야할듯.
	return [
		{
			title: '↑',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
		},
		{
			title : 'SW핵심역량',
			onClick : () => {navigate('/activity/SW핵심역량')},
		},
		{
			title : 'SW산학협력',
			onClick : () => {navigate('/activity/SW산학협력·창업역량')},
		},
		{
			title : 'SW가치확산',
			onClick : () => {navigate('/activity/SW가치확산역량')},
		},
		{
			title : 'SW융합',
			onClick : () => {navigate('/activity/SW융합역량')},
		},
		{
			title: '↓',
      onClick: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
		}
		
	]
	
};

export default rightNavBarData;