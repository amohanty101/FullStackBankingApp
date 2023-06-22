function Balance() {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [balance, setBalance] = React.useState('')
  const[loaded, setLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const navCreateAccount = document.getElementById('nav-create-account');
    const navLogin = document.getElementById('nav-login');
    const navDeposit = document.getElementById('nav-deposit');
    const navWithdraw = document.getElementById('nav-withdraw');
    const navBalance = document.getElementById('nav-balance');
    const navAllData = document.getElementById('nav-allData');
    const navLogout = document.getElementById('nav-logout');



    //console.log(ctx);

    // Get Logged in user from MongoDB
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        if(data?.message){
        console.log(data.message)
        }
        console.log('JSON:', JSON.stringify(data))
      } catch (err) {
        console.log('err:', text)
      }
    })
    setLoaded(true);
  },[loaded])

  const spinner =  <h1>Loading...</h1>;

  return (
    <>


 

    {!loaded ? <div>{spinner}</div> : (
      <>
   <div className="hi-msg">&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello {ctx.user}</div>  <div></div>

    
      <Card
        txtcolor="black"
        bgcolor="info"
        header="Balance"
        body={
          <>
            <ul className="list-group list-group-flush make-center bg-dark">
              <li className="list-group-item make-center">
                Account balance: ${balance}
              </li>
            </ul>
          </>
        }
      />
      </>
    )}
    </>
  );
}
