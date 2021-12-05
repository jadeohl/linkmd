describe('ToMarkdown', function () {
	var ToMarkdown = require('../src/ToMarkdown');
	var md;

	beforeEach(function () {
		md = new ToMarkdown();
	});

	it('should be able to alpha', function () {
		expect(md.alpha('xyz')).toEqual('xyz1');
	});
});