function Withdraw() {
  const[balance, setBalance] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  //const [movements, setMovements] = React.useState([]);
  const[loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // get logged in user info from MongoDB
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        console.log('JSON:', data)
      } catch (err) {
        console.log('err:', text)
      }
    })
    setLoaded(true);
  },[loaded])


  return (
    <>
    <div className="hi-msg">&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello {ctx.user}</div>  <div></div>
    <Card
      txtcolor="white"
      bgcolor="info"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus}  />
        ) : (
          <WithdrawMessage setShow={setShow} setStatus={setStatus}/>
        )
      }
    />
    </>
  );

  function WithdrawForm() {
    const [withdraw, setWithdraw] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleWithdraw() {
      //validate input from user
      if (!validate(Number(withdraw), balance)) return;
      //console.log(typeof(withdraw))

      // update user balance in MongoDB 
      fetch(`/account/update/${ctx.email}/-${Number(withdraw)}/${balance}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          //props.setStatus(JSON.stringify(data.amount));
          setShow(false);
          setAmount(data.amount);
          console.log('JSON:', data);
        } catch(err) {
          //setStatus('Withdraw failed')
          console.log('err:', text);
        }
      });
      setBalance(balance - withdraw);
    }

    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        Withdraw Amount
        <input
          type="input"
          className="form-control"
          id="withdraw"
          placeholder="Withdraw Amount"
          value={withdraw}
          onChange={(e) => {
            setWithdraw(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleWithdraw}
          disabled={disabled}
        >Withdraw</button>
      </>
    );
  }

  function WithdrawMessage(props) {
    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Withdrawl</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >Withdraw Again</button>
      </>
    );
  }

  function validate(withdraw, balance) {
    if (isNaN(withdraw)) {
      setStatus("Error: did not enter a valid number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw > balance) {
      setStatus("Error: Insuffienct funds");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw < 1) {
      setStatus("Error: Lowest withdrawl amount is $1");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}

