import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Send } from "./pages/Send"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
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
