import './App.css';
import  { useEffect } from 'react';
import { getUser} from "./store/users/users.actions"
import {useAppSelector ,useAppDispatch} from "./hooks"
function App() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state)=>state.users.currentUser)
  useEffect(() => {
    dispatch(getUser(2))
}, [])

  return (
    <div className="App">
      <h1>{typeof currentUser === "object" && currentUser.email}</h1>
     </div>
  );
}

export default App;
