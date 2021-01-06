/** 
 * @author Kevin Mathew
*/

(function() {
    /**
     * Check and set a global guard variable
     * This prevents the script from executing twice on the same page
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    // browser namespace depending on browser
    // chrome for Chrome OR browser for Firefox
    browser = (function() { return chrome || browser; })();


    /**
     * @function showDefinitionOfSelection
     * This method will show the definition of a word in a popup
     */
    function showDefinitionOfSelection(info, tab) {
        console.log(info)
        browser.windows.create({
            "url": `https://www.urbandictionary.com/define.php?term=${info.selectionText}`,
            // "type": "popup",
            "height": 500,
            "width": 500,
            "left": 200,
            "top": 100          
        })
    }
    

    browser.contextMenus.create({
        "title": "Find definition on Urban Dictionary with Milton.",
        "contexts": ["selection"],
        "onclick": showDefinitionOfSelection,
    })

    /**
     * Here, the api call is made to Urban Dictionary and the 
     * response is returned
     */
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(message, sender)
        let definitions = []
        if( message.action === "getDefinitions" ) {
            let endpoint = `http://api.urbandictionary.com/v0/define?term=${message.word}`
            console.log(`loading ${message.word}`)
            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.length == 0) sendResponse([])
                    else {
                        for(let i = 0; i < 2; i++) {
                            const definition = data[`list`][i].definition.replace(/[\[\]']+/g,'')
                            const link = data[`list`][i].permalink
                            definitions.push({definition: definition, link: link})
                        }
                        console.log(definitions)
                        sendResponse(definitions)
                    }
                })
                .catch(error => sendResponse([]))
                
                return true
        }
        
    })
    
     
})()