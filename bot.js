// Imports a popular library for making HTTP requests.
const request = require('request')

/**
 * A function which sends a GroupMe message as this bot to the
 * bot's group.
 *
 * Information about the request library can be found here:
 * https://github.com/request/request
 *
 * Information about the GroupMe API can be found here:
 * https://dev.groupme.com/tutorials/bots
 *
 * @param {string} text - Represents the message text which should
 *                        be sent as this bot to the bot's group.
 */
const sendMessage = text => {
  /* The GroupMe API specifies that messages should be sent to
   * the https://api.groupme.com/v3/bots/post url as a POST request.
   *
   * The request should contain:
   * 1. A valid GroupMe access token as a query parameter like so:
   *    https://api.groupme.com/v3/bots/post?token=YOUR_ACCESS_TOKEN
   * 2. A JSON string in the body/payload of the POST request which
   *    should contain:
   *    i. A 'bot_id' attribute with a valid GroupMe bot ID as its
   *       value.
   *    ii. A 'text' attribute with the message text to be sent as
   *        its value.
   *
   * The code below accomplishes all of this using the object passed
   * to the request library method. Lastly, if the message could not
   * be sent for some reason then the response from the request is
   * logged to the Heroku console.
   */
  request({
    method: 'POST',
    url: 'https://api.groupme.com/v3/bots/post',
    qs: {
      token: process.env.ACCESS_TOKEN
    },
    body: {
      'bot_id': process.env.BOT_ID,
      'text': text
    },
    json: true
  }, (err, response) => {
    if (err != null) {
      console.log(response)
    }
  })
}

/**
 * A function which responds to a GroupMe message in the
 * bot's group.
 *
 * A sample GroupMe message object from
 * https://dev.groupme.com/tutorials/bots is shown below:
 * {
 *   "attachments": [],
 *   "avatar_url": "https://i.groupme.com/123456789",
 *   "created_at": 1302623328,
 *   "group_id": "1234567890",
 *   "id": "1234567890",
 *   "name": "John",
 *   "sender_id": "12345",
 *   "sender_type": "user",
 *   "source_guid": "GUID",
 *   "system": false,
 *   "text": "Hello world",
 *   "user_id": "1234567890"
 *  } 
 *
 * @param [object] message - A GroupMe message object
 *                           representing the message which 
 *                           was sent in the bot's group.
 */

var totd = new Array("Schedule time for the people and things that bring you joy. If you perceive yourself as too busy, tell yourself that finding joy is necessary to be our best self",
"The tighter we cling to an identity, the harder it becomes to grow beyond it.","The greatest threat to success is not failure but boredom. As habits become routine they become less satisfying and less interesting. It's the ability to keep going when work isn't exciting that makes the difference. Professionals stick to the schedule; amateurslet life get in the way.", "Motion and taking action are similar sounding ideas, but they are not the same. When in motion you are planning, strategizing, and learning. All good things, but they don't produce a result. Action is the type of behavior that delivers an outcome. Motion makes you feel like you're getting things done, but really you're only preparing. When preparation becomes a form of procrastination you need to change something.","Desire, per say, is not the root of suffering. Craving is! The key is to have wholesome intentions withoutbeing attached to their results.","Whatever you have within yourself is with you always. You won't unlearn the inner strengths you grow over time. The harder your life is and the lesssupport you're getting from external sources, the more important it is to look for those little opportunities each day to highlight a useful or enjoyable experience and consciously take itinto yourself.",  "Boundless Kindness - All joy in this world comes from wanting others to be happy, and suffering in this world comes from wanting only oneself to be happy.",
"A Chinese proverb, 'That the birds of worry and care fly over your head, this you cannot change, but that they build nests in your hair, this you can prevent.",
"The Stoics never promised freedom from disturbing emotions and hardships. They promised the freedom to have emotional well-being despite our problems. It's not a matter of resisting our feelings or pretending they don't exist. Examine your reactions to your day-to-day experiences. Challenge your reactions, not other people, to uproot your conditioned responses.","Conversing with strangers allows people to feel connected to the community around them. Human connectionis more important than income when it comes to happiness! So the next time you want to strike a conversation with someone you don't know, go for it! You have far more to gain than lose.",
"Life throws us curve-balls. Don't let it throw you off track when you do mess up! The very next chance you get just do what you should do.", 
"As virtues go, patience is a quiet one. It's often exhibited by the absence of a reaction. Having patience means being able to wait calmly in the face of frustration or adversity which is everywhere. This can make the difference between annoyance and equanimity, between worry and tranquility.","Checking in with ourselves throughout the day to make sure we are thinking kind thoughts and putting others first can go a long way in benefiting not just our relationship with others, but also our own health.", "What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others!", "Your life doesn't have to remain on the same trajectory that it is today. You can hit reset if you need to.","There are a few types or relationships with people in our lives. Those where both benefit, those where we benefit most, and those where the other person benefits most. Balance is important in this area. Evaluate the current relationships in your life. Are your closest friends moving you toward the person you wish to be, or are they holding you back?");


const messageListener = message => {
  /* Checks that the sender of the message is a user.
   * This is done so that the bot does not respond to
   * itself.
   */
  
  //change to containing string "Mary Ann and return a randomly selected ToTD
  if (message['sender_type'] === 'user') {
    // Checks if the sent message contained the string 'bot'.
    if (message['text'].indexOf('Mary Ann') !== -1) {
      /* Sends a GroupMe message as this bot to the bot's
       * group, indicating its insecurity about the topic
       * of conversation.
       */
      sendMessage(totd[Math.floor(Math.random() * totd.length)])
    }
    else if (message['text'.indexOf('Hey MaryAnn, who owns you') !== -1){
      sendMessage("One person can never own another. However, companies can and FIS owns me."
    }
  }
}


/* Exports the messageListener function as a function
 * which can be used outside of this bot.js file. The
 * exported function is used in the server.js file.
 */
module.exports.messageListener = messageListener
