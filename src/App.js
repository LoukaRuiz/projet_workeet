import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NewUser from './components/Home/newUser';
import Init from './components/Init/Init';
import Invitations from './components/Invitations/Invitations';
import MainSpace from './components/MainSpace/MainSpace';
import NewProject from './components/NewProject/NewProject';

function App() {
  return (
    <div>
		<Routes>
		

			<Route path="/:projectId/invitation" exact element={<Invitations />} />

			<Route path="/" exact element={<Init />} />
			
			<Route path="/workspace/:id" exact element={<MainSpace />} />

			<Route path="/new" exact element={<Home />}>
				  <Route path="username" exact element={<NewUser />} />
				  <Route path="project" exact element={<NewProject />} />
			</Route>


		</Routes>
    </div>
  );
}

export default App;
