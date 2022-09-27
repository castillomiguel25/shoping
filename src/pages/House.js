import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import firebaseApp from "../Callfirebase/firebase";
import Carousel from "../components/Carousel";
import Canvas from "../components/Canvas";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect, GoogleAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore"

import logo from '@logos/logo_yard_sale.svg'
import logogoogle from '@logos/google-logo.svg'

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const handlerAuth = () => {
  let provider = new firebaseApp.auth.GoogleAuthProvider(GoogleAuthProvider);
  firebaseApp.auth().signInWithPopup(provider)
    .then(function (result) {
      setUser(result.user)
      console.log(' ha iniciado session');
    })
    .catch(function (error) {
      console.log(error.code, error.message)
    })
}

function Logins() {
  const firestore = getFirestore(firebaseApp)
  const [isRegister, setIsRegister] = useState(false);

  async function RegisterUser(email, password) {
    const infUser = await createUserWithEmailAndPassword(auth, email, password).then((usuariofirebase) => {
      return usuariofirebase;
    });
    console.log(infUser.user.uid);
    const docuRef = doc(firestore, `usuarios/${infUser.user.uid}`);
    setDoc(docuRef, { correo: email })
    // setDoc(docuRef, { correo: email, rol: rol })
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    // const rol = e.target.elements.rol.value;
    console.log('submit', email, password);
    // console.log('submit', email, password, rol);
    if (isRegister) {
      //REGIS
      RegisterUser(email, password);
      // RegisterUser(email, password, rol);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div className={styles.home}>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center mt-5'>
            <h1 className={styles.presentation}> Shoping On-Line</h1>
          </div>
          <div className='col-12 col-md-6 col-lg-4  mt-5 text-center'>
            <Carousel />
          </div>
          <div className='col-lg-4 mt-2'>
            <Carousel />
          </div>

          <div className='col-lg-4 mt-5'>
            <Carousel />
          </div>
          <div className='col-12 text-center mt-3'>
              <Canvas />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Logins