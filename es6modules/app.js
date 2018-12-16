import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';

const ages = [1,1,3,4,23,43,4];

console.log(uniq(ages));