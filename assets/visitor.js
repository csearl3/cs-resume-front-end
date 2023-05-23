/* Separate API resources to request respective Lambda functions */
const uniqueApi = "https://a26mzduu4j.execute-api.us-east-1.amazonaws.com/dev/uniquelambda";
const countApi = "https://a26mzduu4j.execute-api.us-east-1.amazonaws.com/dev/countlambda";

const options = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	}
};

async function apiRequest() {
	try {
		const uniqueData = await fetch(uniqueApi).then(response => response.json());
		console.log("Success:", uniqueData);
		/* First response body contains boolean property to determine if visitor is unique */
		if (uniqueData.Unique) {
			try {
				/* If unique, send POST request to update database count */
				const countData = await fetch(countApi, options).then(response => response.json());
				console.log("Success:", countData);
				document.getElementById("vc").innerHTML = "Unique Visitors: " + countData.Visitor_Count;
			}	catch (error) {
				console.error("Error:", error);
			}
		} else {
			try {
				/* If not unique, send GET request to read from database count */
				const countData = await fetch(countApi).then(response => response.json());
				console.log("Success:", countData);
				document.getElementById("vc").innerHTML = "Unique Visitors: " + countData.Visitor_Count;
			}	catch (error) {
				console.error("Error:", error);
			}
		}
	}	catch (error) {
		console.error("Error:", error);
	}
}

apiRequest();
