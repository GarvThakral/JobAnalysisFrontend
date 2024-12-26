import { RecoilRoot } from 'recoil'
import { Route , BrowserRouter, Routes} from 'react-router-dom'
import { JobBoard } from "./components/JobBoard"
import { NavBar } from "./components/navbar"
import { JobView } from './components/JobView'
import { SignUp } from './components/signup'
import { SignIn } from './components/signin'
import { AddContent } from './components/addContent'
import { DashBoard } from './components/dashboard'
import { Unauthorized } from './components/Unauthorized'
function App() {

return<BrowserRouter>
  <RecoilRoot>
    <div>
      <NavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/job/:id" element ={<JobView/>} />
          <Route path="/signup" element ={<SignUp/>} />
          <Route path="/signin" element ={<SignIn/>} />
          <Route path="/addContent" element ={<AddContent/>} />
          <Route path="/unauthorized" element ={<Unauthorized/>} />
        </Routes>
      </div>
    </div>
  </RecoilRoot>
</BrowserRouter>
}

export default App
