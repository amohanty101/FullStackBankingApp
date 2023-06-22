function Login() { 
	const [show, setShow] = React.useState(true);
	const [status, setStatus] = React.useState("");
	const [success, setSuccess] = React.useState(false);
	const [loaded, setLoaded] = React.useState(false);
	const [user, setUser] = React.useState("");
	const [message, setMessage] = React.useState("");
	const ctx = React.useContext(UserContext);
	
	return (
	  <>
	  {loaded? <div className="hi-msg">&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome {user}</div> : <div></div>}
	  
	  <div className="login-card">
	  <Card
		txtcolor="info"
		bgcolor="light"
		header="Login"
		status={status}
		body={
		  show ? (
			<LoginForm setUser={setUser} setShow={setShow} setStatus={setStatus} />
		  ) : (
			<LoginMessage setShow={setShow} setStatus={setStatus} />
		  )
		}
	  />
	  </div>
	  </>
	);
  
	
  
	function LoginForm() {
	  const [email, setEmail] = React.useState("");
	  const [password, setPassword] = React.useState("");
	  const [disabled, setDisabled] = React.useState(true);
  
	  function handleLogin() {
		if (!validate(email, "email")) return;
		if (!validate(password, "password")) return;
		
		fetch(`/account/login/${email}/${password}`)
		  .then(response => response.json())
		  .then(data => {
			if (data.user) {
			  const token = data.token;
			  // Retrieve the token here and perform further operations
			  console.log('Token:', token);
			  localStorage.setItem('token', token);
			  setShow(false);
			  setUser(data.user.name);
			  setLoaded(true);
			  setSuccess(true);
			  ctx.user = data.user.name;
			  ctx.email = data.user.email;
			} else {
			  setMessage(data);
			  setSuccess(false);
			  setShow(false);
			}
		  });
	  }
  
	  return (
		<>
		  Email
		  <br />
		  <input
			type="input"
			className="form-control"
			id="email"
			placeholder="Enter email"
			value={email}
			onChange={(e) => {
			  setEmail(e.currentTarget.value);
			  setDisabled(false);
			}}
		  />
		  <br />
		  Password
		  <br />
		  <input
			type="password"
			className="form-control"
			id="password"
			placeholder="Enter password"
			value={password}
			onChange={(e) => {
			  setPassword(e.currentTarget.value);
			  setDisabled(false);
			}}
		  />
		  <br />
		  <div className="login-btn">
			<button
			  type="submit"
			  className="btn btn-info"
			  onClick={handleLogin}
			  disabled={disabled}
			  
			>Login</button>
		  </div>
		</>
	  );
	}
  
	function LoginMessage(props) {
	  return success ? (
		<>
		  <h5>Login Success</h5>
		  <a href="#/balance/">
			<button
			type="submit"
			className="btn btn-info"
			onClick={() => props.setShow(true)}
			>Check Balance</button>
			
		</a>
		<br />
		<br />
		<br />
		<a href="#/login/">
			<button
          	type="submit"
          	className="btn btn-info"
          	onClick={() => {props.setShow(true); props.setStatus('');}}
        	>Log Out</button>
		
					 
		  </a>

		</>
	  ) : (
		<>
		  <h5>{message}</h5>
		  <button
			type="submit"
			className="btn btn-info"
			onClick={() => props.setShow(true)}
		  >Retry</button>
		</>
	  );
	}
  
	function validate(field, label) {
	  if (!field) {
		setStatus("Error: " + label + " is required");
		setTimeout(() => setStatus(""), 3000);
		return false;
	  }
	  return true;
	}
  }
  
  
  
  