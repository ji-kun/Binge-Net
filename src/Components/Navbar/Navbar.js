import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import poco from "../../assets/poco.jpg";

function Navbar({ user }) {
  //   useState[(show, handleShow)] = useState(false);

  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       if (window.scrollY > 100) {
  //         handleShow(true);
  //       } else {
  //         handleShow(false);
  //       }
  //     });
  //     return () => {
  //       window.removeEventListener("scroll");
  //     };
  //   }, []);

  return (
    <div className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="logo" />
      <img className={styles.poco} src={poco} alt="poco" />
    </div>
  );
}

export default Navbar;
