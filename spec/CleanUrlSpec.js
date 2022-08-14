describe('CleanUrl', function () {
    const CleanUrl = require('../src/CleanUrl');
    var cu;

    beforeEach(function () {
        cu = new CleanUrl();
    });

    it('should not break good URLs', function () {
        var test = [
            'https://google.com',
            'https://twitter.com/jadeonly/status/1555564057427464192',
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf',
            'http://utm.utm_utm.com/utm_1/'
        ];
        test.forEach((url) => {
            expect(cu.clean(url)).toEqual(url);
        })
    });

    it('should do nothing to other strings', function () {
        expect(cu.clean('abc')).toEqual('abc');
    });

    it('should remove trackers', function () {
        expect(cu.clean(
            'https://www.bloomberg.com/news/articles/2022-08-12/billionaire-turns-from-finance-to-living-out-his-inner-ted-lasso?utm_medium=social&utm_source=twitter&cmpid%3D=socialflow-twitter-bloomberguk&utm_content=bloomberguk&utm_campaign=socialflow-organic'
        )).toEqual(
            'https://www.bloomberg.com/news/articles/2022-08-12/billionaire-turns-from-finance-to-living-out-his-inner-ted-lasso'
        );
    });
});