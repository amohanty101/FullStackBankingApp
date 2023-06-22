function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  //fetch from api
  function handle(){
    console.log(name,email,password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    props.setShow(false);
  }   
  
  function validate(field, label){
      if (!field) {
        setStatus('Missing field: ' + label);
        return false;
  }
 //validate password 8 characters//
      if (label === "password" && field.length < 8) {
        setStatus("Wait: " + label + " must be 8 or more characters");
 
  return false;
}

  return true;
}

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

      //create user in MongoDB
      const url = `/createaccount/${name}/${email}/${password}`;
      (async () => {
        const res  = await fetch(url);
        const data = await res.text();    
    
      })();
    setShow(false);
  }    

  function newFunction(data) {
    setData(JSON.stringify(data));
  }

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      txtcolor="info"
      bgcolor="light"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Must be 8 characters" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" disabled={!name && !email && !password} className="btn btn-info" onClick={handleCreate}>Submit</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-info" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )}