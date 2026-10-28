const test = require('node:test');
const assert = require('node:assert/strict');

test('application project metadata is configured', () => {
    const pkg = require('../package.json');

    assert.equal(pkg.name, 'devops-capstone-nodejs');
    assert.equal(pkg.scripts.start, 'node app.js');
});
