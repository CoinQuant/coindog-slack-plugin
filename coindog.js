const URL = require('url').URL;
const _ = require('lodash');
const request = require('urllib').request;

module.exports = async (id = 0, limit = 20) => {
  const url = new URL('http://api.coindog.com/live/list');
  url.searchParams.append('id', id);
  url.searchParams.append('limit', limit);
  try {
    const resp = await request(url.toString(), { dataType: 'json' });
    const datas = _
      .chain(resp)
      .get('data.list')
      .first()
      .get('lives')
      .value();
    return [datas, _.get(resp, 'data.top_id')];
  } catch (err) {
    console.error(err);
    return;
  }
};
