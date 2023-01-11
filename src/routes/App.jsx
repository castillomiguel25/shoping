import React, { useState } from "react";
import Home from "../pages/Home";
import House from "../pages/House";
// import Register from "../register/Register"
import "../styles/global.css";
import firebaseApp from "../Callfirebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);





function App() {
  // const [user, setUser] = useState(null);
  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docucif = await getDoc(docuRef);
    const information = docucif.data().rol;
    return information;
  }

  function rolAndFirebase(usuariofirebase) {
    getRol(usuariofirebase.uid).then((rol) => {
      const userData = {
        uid: usuariofirebase.uid,
        email: usuariofirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
  }
  onAuthStateChanged(auth, (usuariofirebase) => {
    if (usuariofirebase) {
      //userss
      if (!user) {
        rolAndFirebase(usuariofirebase);
      }
    } else {
      setUser(null);
    }
  });
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (usuariofirebase) => {
    if (usuariofirebase) {
      setUser(usuariofirebase);
    } else {
      setUser(null);
    }
  });
  return <>{user ? <Home user={user} /> : <House />} </>;
}

// const App = () => {
//     const initialState = useInitialState();
//     return (
//         <AppContext.Provider value={initialState}>
//             <Router >
//                 <Layout>
//                     <Routes>
//                         <Route exact path="/" element={<Home />} />
//                         {/* <Route exact path="/login" element={<Login />}/> */}
//                         {/* <Route exact path="/Register" element={<Register />}/> */}
//                         <Route exact path="/password-recovery" element={<PasswordRecovery />}/>
//                         <Route exact path="/send-email" element={<SendEmail />}/>
//                         <Route exact path="/new-password" element={<NewPassword />}/>
//                         <Route exact path="/my-account" element={<MyAccount />}/>
//                         <Route exact path="/create-account" element={<CreateAccount />}/>
//                         <Route exact path="/Checkout" element={<Checkout />}/>
//                         <Route exact path="/Orders" element={<Orders />}/>

//                         <Route component={NotFound} />
//                     </Routes>
//                 </Layout>
//             </Router>
//         </AppContext.Provider>

//     );
// }

export default App;
