import React, { useState } from "react";
import styles from "../styles/login.module.css";
import firebaseApp from "../Callfirebase/firebase";


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import logogoogle from "@logos/google-logo.svg";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const handlerAuth = () => {
  let provider = new firebaseApp.auth.GoogleAuthProvider(GoogleAuthProvider);
  firebaseApp
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      setUser(result.user);
      console.log(" ha iniciado session");
    })
    .catch(function (error) {
      console.log(error.code, error.message);
    });
};

function Logins() {
  const firestore = getFirestore(firebaseApp);
  const [isRegister, setIsRegister] = useState(false);

  async function RegisterUser(email, password) {
    const infUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuariofirebase) => {
      return usuariofirebase;
    });
    console.log(infUser.user.uid);
    const docuRef = doc(firestore, `usuarios/${infUser.user.uid}`);
    setDoc(docuRef, { correo: email });
    // setDoc(docuRef, { correo: email, rol: rol })
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    // const rol = e.target.elements.rol.value;
    console.log("submit", email, password);
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
    
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-12 text-center mt-3">
            <div className={styles.box}>
              <form onSubmit={submitHandler}>
                <fieldset>
                  <legend>
                    <b>
                      <h1>{isRegister ? "Registrate" : "Inicia Sesión"}</h1>
                    </b>
                  </legend>

                  <div className={styles.inputBox}>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className={styles.inputUser}
                      required
                    />
                    <label for="email" className={styles.labelInput}>
                      Email
                    </label>
                  </div>

                  <div className={styles.inputBox}>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={styles.inputUser}
                      required
                    />
                    <label for="password" className={styles.labelInput}>
                      Contrasena
                    </label>
                  </div>

                  <div className={styles.father}>
                    <input
                      className={styles.submit}
                      type="submit"
                      value={isRegister ? "Registrar" : "Iniciar Sesión"}
                      name="submit"
                      id="submit"
                    />

                    <button
                      className={styles.submitss}
                      onClick={() => {
                        signInWithRedirect(auth, googleProvider);
                      }}
                    >
                      <img
                        src={logogoogle}
                        alt="logo"
                        className={styles.logo}
                      />
                    </button>

                    <button
                      className={styles.submits}
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister
                        ? "Ya tengo una cuenta"
                        : "Quiero Registrarme"}
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Logins;
