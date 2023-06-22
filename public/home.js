function Home(){
  return (
    <Card
      txtcolor="info"
      header="MIT Mern Bank"
      bgcolor="light"
      title="Welcome to the MIT Mern full stack banking experience"
      text="Your Banking experience is now secured."
      body={(<img src="badbank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
