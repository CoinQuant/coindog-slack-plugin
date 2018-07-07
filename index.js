const _ = require('lodash');
const coindog = require('./coindog');
const slack = require('./slack');

let latestId = 0;

async function upgrade() {
  const [list, id] = await coindog();
  if (latestId < id) {
    const latest = _.first(list);
    const { content, grade, link_name, link } = latest;
    const colorized = !_.isEmpty(latest.highlight_color) ? true : false;
    const result =
      (await slack(content, grade, link_name, link, colorized)) || 'error';
    console.log(`news [${id}] sent with result: ${result}`);
    if (result === 'ok') latestId = id;
  }
}

(async () => {
  await setInterval(upgrade, 1 * 60 * 1000);
})();
