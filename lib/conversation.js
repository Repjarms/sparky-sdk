var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version: 'v1',
  version_date: '2016-09-20'
});

var context = '';

module.exports = {

	talkBack: function (text) {
		return new Promise(function(resolve, reject) {
			conversation.message({
			  workspace_id: process.env.CONVERSATION_WORKSPACE,
			  input: {'text': text},
			  //context: context
			},  function(err, response) {
			  if (err)
			    reject(err);
			  else
			    resolve(jsonMap(response));
			});
		});
	}

};

function jsonMap(object) {
	return object.output.text[0];
}