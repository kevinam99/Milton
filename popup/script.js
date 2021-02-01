browser = (function() { return  chrome || browser; })();


let definitionsRegion = document.querySelector("#definitions")
let errorMsg = document.querySelector('.error')
document.querySelector("#submitBtn").addEventListener("click", (e) => {
    e.preventDefault()
    let word = document.querySelector('#word').value
    definitionsRegion.innerHTML = ""
    if(word == '') errorMsg.innerHTML = "Enter a word"
    
    else {
        errorMsg.innerHTML = ""
        definitionsRegion.innerHTML = "Getting your definition..."
        browser.runtime.sendMessage({action: "getDefinitions", word: word}, response => {
            // $('.definitions').html('');
            if(response.length == 0) {
                definitionsRegion.innerHTML = ""
                errorMsg.innerHTML = `${word} does not exist in the Urban Dictionary. Try another word.`
            } 

            else {
                definitionsRegion.innerHTML = ""
                response.forEach(defn => {
                    const defnBody = `<p>${defn.definition}\n</p>`
                    const defnLink = `<a style = "color: white" href = ${defn.link} target = "_blank"> View definition on Urban Dictionary </a>`
                    definitionsRegion.innerHTML+=`<li>${defnBody}\n${defnLink}</li>\n`;
                })
            }
            
        })
    }
})