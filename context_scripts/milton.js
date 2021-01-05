/** 
 * @author Kevin Mathew
 * Parts of this script is based off the good work done by my friend, Julius.
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
     * @function getMeaning
     * This function takes in the word from the user and then makes an
     * api call to get the meanings. After receiving the data,
     * it is sent m=back to the client (popus).
     */
    function getMeaning(word) {
        browser.runtime.onMessage.addListener((message) => {
            if( message.command === "getMeanings" ) {
                let endpoint = `http://api.urbandictionary.com/v0/define?term=${word}`
                const https = require("https")
                let meanings
                https.get(endpoint, resp => {
                    resp.on(`data`, chunk => {
                    meanings = chunk
                    })
                })
            }
        
    })}

    /**
     * @function notify
     * Wrapper method that creates a new notification object or requests permissions
     * to do so if it's disabled. Throws an error if the browser doesn't support extensions
     * This is the example script found on MDN
     */
    function notify(notifBody) {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
    
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission == "granted") {
            // If it's okay let's create a notification
            new Notification("Milton", {body: `Milton at your service. I'm activated now.`, icon: iconURL});
            console.log('Permission was granted for notifications');
        }
    
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission == "granted") {
                new Notification("Milton", {body: `Milton at your service. I'm activated now.`});
                console.log('Permission was granted for notifications');
            }
            });
        }
    
        // At last, if the user has denied notifications, and you 
        // want to be respectful there is no need to bother them any more.
    }
    

    chrome.contextMenus.create({
        "title": "Find meaning on Urban Dictionary with Milton.",
        "contexts": ["selection"],
        "onclick": MyQuoteClick(word)
    })
    
        
})();