function startApp() {
  
}
let ArrToHide;
let specifyChar;
let scrambledMessage;

let displayDiv = document.getElementById("forSecond");
const redactBtn = document.getElementById("redact-btn");
const editButton = document.querySelector(".Edit");
let writeMessage = document.getElementById("message");
let wordsTohide = document.getElementById("message-tohide")

// DOM for SocialHandles
const whatsapp = document.querySelector('.fa-whatsapp');
const facebook = document.querySelector('.fa-facebook');
const twitter = document.querySelector('.fa-twitter');
const telegram = document.querySelector('.fa-telegram');


if ( document.body.getAttribute("id")  === 'page-one') {
    if(localStorage.messageSaved !== 'true') {
        localStorage.clear();
    }
    if(localStorage.runCounts !== undefined) {
        let formerFirstMessage = localStorage.
        getItem('firstMessage')
        writeMessage.value = formerFirstMessage;
    }

    redactBtn.addEventListener('click', function handleRedact(event) {
        if(writeMessage.value.trim() === "" || wordsTohide.value.trim() === "") {
        event.preventDefault();
        alert(`Please input texts to scramble!`);
                // console.log(writeMessage.value.trim());
                // console.log(wordsTohide);
        }
        specifyChar = document.getElementById("custom-replace").value;
        scrambledMessage =  writeMessage.value;
        //getting number of  ScannedWords
        const NumberOfWords = scrambledMessage.
        replace(/\n/gi, " ").split(' ').length;
        localStorage.setItem('wordsNumber', NumberOfWords);
        //getting the number of scrambled words
        ArrToHide = wordsTohide.value.
        replace(/\n/gi, " ").split(' ');
        //   console.log(ArrToHide);
        localStorage.setItem('runCounts', 'true')
        localStorage.setItem('messageSaved', 'false');
        let start = Date.now();
        let sym
        ArrToHide.forEach(element => {
        
            const regex = new RegExp("\\b"+element+"\\b", "gi");
            if (!specifyChar) {
                scrambledMessage =  scrambledMessage.replace( regex, "*".repeat(element.length));
            } else {
                sym = specifyChar[0].repeat(element.length);
                scrambledMessage =  scrambledMessage.replace( regex, sym);
            }
            
        }); 
        let miliSecs = Date.now() - start;
        let seconds = miliSecs/1000;
        localStorage.setItem('firstMessage', writeMessage.value);
        localStorage.setItem('displayRedacted', scrambledMessage);
        localStorage.setItem('timeTaken', miliSecs);

        const numberOfScrambled = scrambledMessage.
        replace(/\n/gi, " ").split(' ').filter( (item) => {
               
                if (!specifyChar) { 
                    if((item === '*'.repeat(item.length))){
                        return item;
                    }
                }
                else {
                    if( (item === specifyChar[0].repeat(item.length)) ||
                    (item === '*'.repeat(item.length))){
                        return item;
                    }
                }
        });
        localStorage.setItem('scrambleWordsCounter', 
        numberOfScrambled.length);
      
        const numberOfScrambledChars = numberOfScrambled.join(' ').length;
        localStorage.
        setItem('numberOfScrambledChars', numberOfScrambledChars);
     
    })
}

let redactedMessage;
if ( document.body.getAttribute("id")  != 'page-one') {
    redactedMessage = localStorage.getItem('displayRedacted');
    displayDiv.value = redactedMessage;
 
    editButton.addEventListener('click', () => {
        localStorage.messageSaved = 'true';
    })

    let copyButton = document.querySelector('.CopyRedactedMessage');
    copyButton.addEventListener('click', (e) => {
        // e.preventDefault();
        displayDiv.select();
        displayDiv.setSelectionRange(0, 99999); /* For mobile 
        devices */
         /* Copy the text inside the text field */
        navigator.clipboard.writeText(displayDiv.value);
        // alert("Message copied to clipboard");
        // let timeTakenElem = document.querySelector('.time-taken');
        // let copyMessage = document.createElement('div');
        // copyMessage.setAttribute('class','copy-message')
        // copyMessage.innerText = `Copied to clipboard`;

        // copyButton.appendChild(copyMessage)
    })
  
      // SocialHandlesFunction
    // const pageURL = location.href;

    whatsapp.addEventListener('click', () => {
      const whatsappAPI = `https://wa.me/?text= ${redactedMessage}`;
      window.open(URL = whatsappAPI);
    })

    twitter.addEventListener('click', () => {
      const twitterAPI = `https://twitter.com/intent/tweet?text= 
      ${redactedMessage}`
      window.open(URL = twitterAPI)
    })
  
    telegram.addEventListener('click', () => {
    const telegramAPI = `https://t.me/share/url? 
    url=text=${redactedMessage}`
    window.open (URL = telegramAPI);
    })

  // show the total of words scanned
  let scannedEl = document.getElementById('total-scanned');
  let scannedSec = document.createElement('div');
  scannedEl.appendChild(scannedSec)
  scannedSec.innerText = `${localStorage.wordsNumber}`;

  //Scramble words 
  let matchedWords = document.getElementById('matched-words');
  let matchedWordsCount = document.createElement('div');
  matchedWordsCount.innerText = `${localStorage.scrambleWordsCounter}`;
  matchedWords.appendChild(matchedWordsCount)

  //Redacted characters
  let totalScrambledChars = document.getElementById('total-scrambled-chars');
  let totalScrambledCharsCount = document.createElement('div');
  totalScrambledCharsCount.innerText = `${localStorage.numberOfScrambledChars}`;
  totalScrambledChars.appendChild(totalScrambledCharsCount);
//   console.log(localStorage.numberOfScrambledChars);



   //Time taken
   let timeTakenElem = document.querySelector('.time-taken');
   let timeTakenVar = document.createElement('div');
   timeTakenElem.appendChild(timeTakenVar)
   timeTakenVar.innerText = `${localStorage.timeTaken}ms`;
}







  // ======= DO NOT EDIT ============== //
  export default startApp;
  // ======= EEND DO NOT EDIT ========= //