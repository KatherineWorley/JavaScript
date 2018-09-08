/* globals twttr */
/* globals ga */

var weather = new Promise((resolve) => {
	setTimeout(() => {
		resolve({ temp: 29, conditions: 'Sunny with Clouds' });
	}, 2000);
});

const tweets = new Promise((resolve) => {
	setTimeout(() => {
		resolve(['I like cake', 'BBQ is good too!']);
	}, 500);
});


Promise
	.all([weather, tweets])
	.then(responses => {
		const [weatherInfo, tweetInfo] = responses;
		console.log(weatherInfo, tweetInfo);
	});

const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
	.all([postsPromise, streetCarsPromise])
	.then(responses => {
		return Promise.all(responses.map(res => res.json()));
	})
	.then(responses => {
		console.log(responses);
	});


ga.track();
twttr.trackConversation();

/* eslint-disable */
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function(searchElement, fromIndex) {
			/* eslint-disable no-extend-native */

			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			// 1. Let O be ? ToObject(this value).
			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(searchElement, elementK) is true, return true.
				if (sameValueZero(o[k], searchElement)) {
					return true;
				}
				// c. Increase k by 1. 
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}
/* eslint-enable */