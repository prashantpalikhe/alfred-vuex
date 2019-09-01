const alfy = require('alfy');
const algoliasearch = require('algoliasearch');
const { last } = require('lodash');

const client = algoliasearch('BH4D9OD16A', '97f135e4b5f5487fb53f0f2dae8db59d');
const index = client.initIndex('vuex');

(async () => {
	const { hits } = await index.search({
		query: alfy.input,
		hitsPerPage: 5,
		facetFilters: ['lang:en-US']
	});

	const output = hits.map(hit => {
		const result = {
			title: hit.anchor,
			subtitle: hit.anchor,
			arg: hit.url,
			quicklookurl: hit.url
		};

		if (hit.hierarchy) {
			const hierarchies = Object.values(hit.hierarchy).filter(Boolean);

			result.title = last(hierarchies);
			result.subtitle = hierarchies.join(' > ');
		}

		return result;
	});

	alfy.output(output);
})();
