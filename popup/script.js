browser = (function() { return  chrome || browser; })();


let definitionsRegion = document.querySelector("#submitBtn")

document.querySelector("#submitBtn").addEventListener("click", (e) => {
    e.preventDefault()
    let word = document.querySelector('#word').value
    // if(word = '')
    console.log(`Sending ${word} to milton.js`);
    browser.runtime.sendMessage({action: "getDefinitions", word: word}, response => {
        console.log(response)
        // $('.definitions').html('');
        // console.log(`response(script.js) ${response}`)
        // response.map((definition) => {
            
        //     $('.definitionsRegion').append(`<li><p>${definition}</p></li>`);
        // })
    })
})