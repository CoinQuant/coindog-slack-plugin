const _ = require('lodash');
const request = require('urllib').request;
const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

module.exports = async (text, rated = 0, name, link, colored = false) => {
  // if WEBHOOK_URL hasn't injected into env, throw error directly
  if (!WEBHOOK_URL) throw new Error('WEBHOOK_URL should be provided!');
  const payload = { text };
  let attachments = [];
  if (!_.isEmpty(name) && _.isEmpty(link)) {
    attachments.push({
      title: name,
      title_link: link,
      color: '#3AA3E3',
    });
  }
  if (rated) {
    let stars;
    if (colored) stars = _.repeat(':star2:', rated);
    else stars = _.repeat(':star:', rated);
    attachments.push({ title: stars, color: '#D00000' });
  }
  payload.attachments = attachments;
  try {
    const result = await request(WEBHOOK_URL, {
      method: 'POST',
      contentType: 'json',
      data: payload,
      timeout: 30000,
    });
    return result.data.toString();
  } catch (err) {
    console.error(err);
  }
};
