/*
  Post to Memos with Access Token
*/

// Create a credential object
let credential = Credential.create("Memos Instance URL & Access Token",
`URL example: https://demo.usememos.com

Get Access Token from your memos instance: "Settings > My Account > Create"`);

// Add URL field for Memos instance URL
credential.addURLField("memos_instance", "Memos Instance URL");

// Add password field for Memos access token
credential.addPasswordField("memos_access_token", "Memos Access Token");

// Authorize the credential object
credential.authorize();

// Get the Memos instance URL and access token from the credential object
let endpoint = credential.getValue("memos_instance") + "/api/v1/memo";
let accessToken = credential.getValue("memos_access_token");

// Get the content from draft
let content = draft.content;

// Check if the content is not empty
if (content.length > 0) {
    // Create an HTTP object
    let http = HTTP.create();

    // Send a POST request to the Memos API with the content
    var response = http.request({
        "url": endpoint,
        "method": "POST",
        "data": {
            "content": content
        },
        "headers": {
            "Content-type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    });
}

// Log the response status code
console.log("Response: " + response.statusCode);

// Check if the response status code is not 200 or 202
if (response.statusCode != 200 && response.statusCode != 202) {
    // Fail the context
    context.fail();
}