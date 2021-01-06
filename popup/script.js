browser = (function() { return  chrome || browser; })();


let definitions = []


$(document).on('click', '#submitBtn', (e) => {
    e.preventDefault()
    let word = document.querySelector('#word').value
    console.log(`Sending ${word} to milton.js`);
    browser.runtime.sendMessage({action: "getDefinitions", word: word}, response => {
        console.log(response)
        // $('.definitions').html('');
        // console.log(`response(script.js) ${response}`)
        // response.map((definition) => {
            
        //     $('.definitions').append(`<li><p>${definition}</p></li>`);
        // })
    })
})