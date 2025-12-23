import React, { useState , useContext} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import classes from './SignUp.module.css'
import {auth} from '../../Components/Utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Components/Utility/action.type'
import { ClipLoader } from 'react-spinners'


function Auth() {
  const [email , setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [loading, setLoading] = useState({
     signIn: false,
     signUp: false,
   });
  const [{user}, dispatch] =useContext(DataContext);
  const navigate = useNavigate()
  const navStateData = useLocation()
 
  console.log(user);
  const authHandler= async (e) =>{
    e.preventDefault();
console.log(e.target.name);
setLoading({...loading, signIn:true})
if (e.target.name=='signin'){
  signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
    dispatch({
      type:Type.SET_USER,
      user: userInfo.user
    })
    setLoading({ ...loading, signIn: false });
    navigate(navStateData?.state?.redirect || "/");
  }).catch((err)=>{
    setError(err.message);
    setLoading({ ...loading, signIn: false });

  })

}else{
  setLoading({ ...loading, signUp: true });
  createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
     dispatch({
       type: Type.SET_USER,
       user: userInfo.user,
     });
    setLoading({ ...loading, signUp: false });
    navigate(navStateData?.state?.redirect || "/");
  }).catch((err)=>{
    setError(err.message);
    setLoading({ ...loading, signUp: false });
  })

}
  }
  return (
    <section className={classes.login}>
      <Link to = "/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign-In</h1>
        <form action="" className={classes.for}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.signin}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className={classes.paragraph}>
          By signing- in you afree to the AMAZON FAKE CLONE Conditions of usse &
          saale. please see our privacy notice, our cookies notice and our
          interest-based ADs Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.register_button}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;