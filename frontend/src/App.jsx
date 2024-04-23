import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Signup } from "./components/Signup"
import { Send } from "./components/Send"
import { Signin } from "./components/Signin"
import { Dashboard } from "./components/Dashboard"
function App() {

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/signup" Component={Signup}/>
        <Route path="/signin" Component={Signin}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/send" Component={Send}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
