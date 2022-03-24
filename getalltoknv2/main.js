/* Moralis init code */
const serverUrl = "https://2pnsuljnqf1g.usemoralis.com:2053/server";
const appId = "l7nf2CiwqeWDOR2Qy63XAHDoOnkh6w8x8uTDxxw3";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));

      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

function formHandler(){
  // alert("Anything: "+document.forms["test"].anything.value);
  let xyz=document.forms["test"].anything.value;
  console.log(xyz);
  outputt=play(xyz);

  // document.getElementById("output").innerHTML=outputt[1].name;
  
}

async function play(xyz){
  const all_balance=await Moralis.Web3.getAllERC20({address:xyz});
  console.log(all_balance);
  console.log("here");
  console.log();

  text = `<table id='customers'> <tr> <th>Token Balance (${all_balance.length})</th>  </tr>`
    for (x in all_balance) {
      const totalbalance = all_balance[x].balance
      const totaldecimal = all_balance[x].decimals

      // newer codes //
      const afterDecimal = totalbalance/Math.pow(10, totaldecimal);

      text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name + "</td>"  ; 
    }
    text += "</table>"    
    document.getElementById("output").innerHTML = text;

}