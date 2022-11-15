describe('ToMarkdown', function () {
	const ToMarkdown = require('../src/ToMarkdown');
	var md;

	beforeEach(function () {
		md = new ToMarkdown();
	});

	it('should escape', function () {
		expect(md.escapeString('abc')).toEqual('abc');
		expect(md.escapeString('a(b(c')).toEqual('a\\(b\\(c');
		expect(md.escapeString('_a')).toEqual('\\_a');
	});

	it('should collapse', function () {
		expect(md.collapseString('abc')).toEqual('abc');
		expect(md.collapseString('ab\rc')).toEqual('ab c');
		expect(md.collapseString('ab  c')).toEqual('ab c');
	});

	it('should make links', function () {
		expect(md.link('Google', 'http://google.com')).toEqual('[Google](http://google.com)');
		expect(md.link('Google [3]', 'http://google.com')).toEqual('[Google \\[3\\]](http://google.com)');
		expect(md.link('Google', 'http://google.com/(a)')).toEqual('[Google](http://google.com/(a))');
		expect(md.link('Google [3]', 'http://google.com/test_page')).toEqual('[Google \\[3\\]](http://google.com/test_page)');
	});

	it('should make quotes', function () {
		expect(md.quote('abc')).toEqual('_abc_');
	});

	it('should make quote links', function () {
		expect(md.quoteLink('abc', 'Google', 'http://google.com')).toEqual('_abc_ - [Google](http://google.com)');
	});
});