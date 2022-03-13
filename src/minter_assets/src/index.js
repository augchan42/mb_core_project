// The minter is the representation of the minter contract in main.mo but in JavaScript
import { minter } from "../../declarations/minter";

// This is library to use with principal that is provided by Dfinity
import { Principal } from "@dfinity/principal";

// For beginners : This is really basic Javascript code that add an event to the "Mint" button so that the mint_nft function is called when the button is clicked.
const mint_button = document.getElementById("mint");
mint_button.addEventListener("click", mint_nft);

const connect_button = document.getElementById("connect");
connect_button.addEventListener("click", connect_plug_wallet);

const random_button = document.getElementById("random");
random_button.addEventListener("click", pick_random_nft);

async function mint_nft() {
  // Get the url of the image from the input field
  const name = document.getElementById("name").value.toString();
  console.log("The url we are trying to mint is " + name);

  // Get the principal from the input field.
  const principal_string = document.getElementById("principal").value.toString();
  const principal = Principal.fromText(principal_string);

  // Mint the image by calling the mint_principal function of the minter.
  const mintId = await minter.mint_principal(name, principal);
  console.log("The id is " + Number(mintId));
  // Get the id of the minted image.

  // Get the url by asking the minter contract.
  document.getElementById("nft").src = await minter.tokenURI(mintId);

  // Show some information about the minted image.
  document.getElementById("greeting").innerText = "this nft owner is " + principal_string + "\nthis token id is " + Number(mintId);
}

async function connect_plug_wallet() {
  // const publicKey = await window.ic.plug.requestConnect();
  // document.getElementById("principal").value = publicKey;

  const nnsCanisterId = 'qumey-pqaaa-aaaai-abtla-cai'

  // Whitelist
  const whitelist = [
    nnsCanisterId,
  ];

  // Make the request
  const isConnected = await window.ic.plug.requestConnect({
    whitelist,
  });

  // Get the user principal id
  const principalId = await window.ic.plug.agent.getPrincipal();
  document.getElementById("principal").value = principalId;

  console.log(`Plug's user principal Id is ${principalId}`);
}

async function pick_random_nft() {
  try {
    // const maxNumber = document.getElementById("random");
    // const maxNumber = 42;
    // const randomNumber = await minter.getRandomNumber(parseInt(maxNumber));
    console.log("Generating random number, please wait...");
    document.getElementById("name").value = "Please wait while we generate a random mint";
    let randomNumber = await minter.getRandomNumber();
    //https://qumey-pqaaa-aaaai-abtla-cai.ic0.app/diamond-giraffe-peanut/32.png
    let uri = "https://qumey-pqaaa-aaaai-abtla-cai.ic0.app/diamond-giraffe-peanut/";
    uri += randomNumber;
    uri += ".png";
    document.getElementById("name").value =  uri;
    console.log("Random number is: " + uri);
  } catch (e) {
    console.log(e);
  }
}
