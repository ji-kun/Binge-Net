import React from "react";
import styles from "./SignIn.module.css";
import bgimg from "../../assets/binge.gif";

function SignIn({ setUser }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={bgimg} className={styles.image} alt="pic" />
      </div>
      <div className={styles.form}>
        <input className={styles.uname} type="text" placeholder="Username" />
        <input
          className={styles.uname}
          type="email"
          placeholder="Email address"
        />
        <input
          className={styles.uname}
          type="password"
          placeholder="Password"
        />
        <button
          className={styles.button}
          onClick={() => {
            setUser({
              name: "hhhhhh",
              email: "abc@abc.abc",
            });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignIn;
