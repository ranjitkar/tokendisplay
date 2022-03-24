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
  // const options = {
  //   chain: "eth",
  //   addresses: "0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA",
  // };
  // var tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
  // console.log(tokenMetadata[0].logo);

  text = `<table id='customers'> <tr> <th>Token Balance (${all_balance.length})</th>  </tr>`
    for (x in all_balance) {
      const totalbalance = all_balance[x].balance
      const totaldecimal = all_balance[x].decimals
      const toknaddress=all_balance[x].tokenAddress
      console.log(toknaddress)

      if(toknaddress!=undefined){

        const options = {
          chain: "eth",
          addresses: toknaddress,
        };
        var tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        if(tokenMetadata[0].logo!=null){

          const afterDecimal = totalbalance/Math.pow(10, totaldecimal);
          text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name +`<img src="${tokenMetadata[0].logo}" alt="">`+ "</td>"  ;
        }else{
          const afterDecimal = totalbalance/Math.pow(10, totaldecimal);
          text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name + "</td>"  ; 
        }
        
        


      }else{
        if(all_balance[x].symbol="ETH"){
          const afterDecimal = totalbalance/Math.pow(10, totaldecimal);
          text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name + `<img src="./images/ethereum-eth-logo.svg" alt="">`+"</td>"  ; 
        }else{

          const afterDecimal = totalbalance/Math.pow(10, totaldecimal);
          text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name + "</td>"  ; 
        }

      }


      // newer codes //

      // if(tokenMetadata[0].logo= null){

      //   text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name + "</td>"  ; 
      // }else{
      //   text += "<tr><td>" + afterDecimal +"  "+ all_balance[x].symbol  + "</td>" + "<td>" + all_balance[x].name + +" "+`<img src="${tokenMetadata[x].logo}" alt="">`+"</td>"  ; 
        
      // }

    }
    text += "</table>"    
    document.getElementById("output").innerHTML = text;

}