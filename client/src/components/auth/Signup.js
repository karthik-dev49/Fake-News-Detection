import {useState} from "react"
// import {  useNavigate} from "react-router-dom";
import "./Signup.css"
export const Signup = ({ onSignupSuccess }) => {
  const [userName, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isRegistering, setRegistering] = useState(false);
//   const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        setRegistering(true);
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        // Registration successful, navigate to login page or display a success message
        // navigate("/auth");
        setRegistering(false);
        onSignupSuccess();
      } else {
        // Registration failed, display an error message
        setRegistering(false);
        console.error(data.message);
        alert(data.message);
      }
    } catch (error) {
        setRegistering(false);
      console.error("An error occurred during registration:", error);
      alert("An error occurred during registration:", error);
    }
  }
  return (
    <div className="cont">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="userName-box">
            <div className="userName-title">Name</div>
            <input
              type="text"
              placeholder="Enter Name"
              // autoComplete="off"
              name="name"
              className="userName-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email-box">
            <div className="email-title">Email</div>
            <input
              type="email"
              placeholder="Enter Email"
              // autoComplete="off"
              name="email"
              className="email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-box">
            <div className="password-title">Password</div>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
      {isRegistering && (
        <div className="registration-modal">
          <p>Registering...</p>
        </div>
      )}
    </div>
  );
};

