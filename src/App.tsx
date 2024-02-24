
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import UserInfoPage from './pages/UserInfoPage';
import ActivityIntroPage from './pages/ActivityIntro/ActivityIntroPage';
import SWCorePage from './pages/ActivityPage/SWCorePage';
import SWCooperationPage from './pages/ActivityPage/SWCooperationPage';
import SWValuePage from './pages/ActivityPage/SWValuePage';
import SWConvergencePage from './pages/ActivityPage/SWConvergencePage';

function App() {
  return (
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path='/info' element={<UserInfoPage/>}/>
			<Route path='/activity' element={<ActivityIntroPage/>}/>

			<Route path='/activity/SW핵심역량' element={<SWCorePage/>}/>
			<Route path='/activity/SW산학협력·창업역량' element={<SWCooperationPage/>}/>
			<Route path='/activity/SW가치확산역량' element={<SWValuePage/>}/>
			<Route path='/activity/SW융합역량' element={<SWConvergencePage/>}/>
			
			{/* <Route path="activity/:area/:activityId" element={<ActivityPage/>}/> */}

		</Routes>
    
  );
}

export default App;