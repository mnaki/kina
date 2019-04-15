const worder = require("worder")

const sortByFrequency = (array) => {
	var frequency = {}
	// set all initial frequencies for each word to zero
	array.forEach(
		function(value) { frequency[value] = 0 }
	)
	// create new array with words and their frequencies
	var uniques = array.filter(
		function(value) { return ++frequency[value] == 1 }
	)
	// sort words by abc order
	return uniques.sort(
		function(a, b) { return frequency[b] - frequency[a] }
	)
}

const wordcloud = (words) => {
    new Promise((resolve, reject) => {
        unirest.post("https://wordcloudservice.p.rapidapi.com/generate_wc")
        .header("X-RapidAPI-Host", "wordcloudservice.p.rapidapi.com")
        .header("X-RapidAPI-Key", "SIGN-UP-FOR-KEY")
        .header("Content-Type", "application/json")
        .send({"f_type":"png","width":800,"height":500,"s_max":"7","s_min":"1","f_min":1,"r_color":"TRUE","r_order":"TRUE","s_fit":"FALSE","fixed_asp":"TRUE","rotate":"TRUE","textblock":"generate word cloud generate word cloud awesome great png jpg pdf awesome generate word cloud"})
        .end(function (result) {
            console.log("WORDCLOUD RESULT :")
            console.log(result.status, result.headers, result.body);
            resolve()
        });
    })
}

module.exports = {
    doc: {
        description: "Wordcloud (WIP)",
        example: "wc number"
    },
    fun: (ctx) => {
        const count = ctx.args[2]
        ctx.msg.channel.fetchMessages({ limit: count })
        .then(messages => messages.map(m => m.content).map((content) => (worder(content))).flat())
        .then(sortByFrequency)
        //.then(wordcloud)
        .then((url) => {
            ctx.msg.channel.send(url)
        })
    }
}