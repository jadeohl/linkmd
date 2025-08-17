describe('CleanUrl', function () {
    const CleanUrl = require('../src/CleanUrl');
    let cu;

    beforeEach(function () {
        cu = new CleanUrl();
    });

    it('should not break good URLs', function () {
        const test = [
            'https://google.com',
            'https://twitter.com/jadeonly/status/1555564057427464192',
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf',
            'http://utm.utm_utm.com/utm_1/'
        ];
        test.forEach((url) => {
            expect(cu.clean(url)).toEqual(url);
        });
    });

    it('should remove trackers', function () {
        expect(cu.clean(
            'https://www.bloomberg.com/news/articles/2022-08-12/billionaire-turns-from-finance-to-living-out-his-inner-ted-lasso?utm_medium=social&utm_source=twitter&cmpid%3D=socialflow-twitter-bloomberguk&utm_content=bloomberguk&utm_campaign=socialflow-organic'
        )).toEqual(
            'https://www.bloomberg.com/news/articles/2022-08-12/billionaire-turns-from-finance-to-living-out-his-inner-ted-lasso'
        );
    });

    it('should remove additional tracking parameters', function () {
        // Google tracking
        expect(cu.clean('https://example.com?gclid=abc123')).toEqual('https://example.com');
        expect(cu.clean('https://example.com?gclsrc=aw.ds')).toEqual('https://example.com');
        
        // Facebook tracking
        expect(cu.clean('https://example.com?fbclid=xyz789')).toEqual('https://example.com');
        
        // MailChimp tracking
        expect(cu.clean('https://example.com?mc_cid=abc&mc_eid=def')).toEqual('https://example.com');
        
        // HubSpot tracking
        expect(cu.clean('https://example.com?_hsenc=encoded&_hsmi=message')).toEqual('https://example.com');
        
        // Microsoft tracking
        expect(cu.clean('https://example.com?msclkid=microsoft123')).toEqual('https://example.com');
        
        // Generic tracking
        expect(cu.clean('https://example.com?ref=twitter&source=newsletter')).toEqual('https://example.com');
    });

    it('should do nothing to other strings', function () {
        expect(cu.clean('abc')).toEqual('abc');
        expect(cu.clean('')).toEqual('');
    });

    it('should not fail on other types', function () {
        expect(cu.clean(true)).toEqual(true);
        expect(cu.clean(5)).toEqual(5);
    });

    it('should preserve non-tracking parameters', function () {
        expect(cu.clean('https://example.com?page=1&limit=10')).toEqual('https://example.com?page=1&limit=10');
        expect(cu.clean('https://example.com?id=123')).toEqual('https://example.com?id=123');
    });

    it('should remove tracking parameters while preserving others', function () {
        expect(cu.clean('https://example.com?page=1&utm_source=google&limit=10&utm_medium=cpc')).toEqual('https://example.com?page=1&limit=10');
        expect(cu.clean('https://example.com?id=123&cmpid=email&category=news')).toEqual('https://example.com?id=123&category=news');
    });

    it('should handle URLs with fragment identifiers', function () {
        expect(cu.clean('https://example.com?utm_source=twitter#section1')).toEqual('https://example.com#section1');
        expect(cu.clean('https://example.com?page=1&utm_medium=social#top')).toEqual('https://example.com?page=1#top');
        expect(cu.clean('https://example.com#section')).toEqual('https://example.com#section');
    });

    it('should handle edge cases and malformed URLs', function () {
        expect(cu.clean('https://example.com?')).toEqual('https://example.com');
        expect(cu.clean('https://example.com?utm_source=test&')).toEqual('https://example.com');
        expect(cu.clean('https://example.com?&utm_medium=test')).toEqual('https://example.com');
        expect(cu.clean('https://example.com?utm_source=')).toEqual('https://example.com');
    });

    it('should be case sensitive for parameter names', function () {
        expect(cu.clean('https://example.com?UTM_SOURCE=google')).toEqual('https://example.com?UTM_SOURCE=google');
        expect(cu.clean('https://example.com?Utm_Medium=social')).toEqual('https://example.com?Utm_Medium=social');
        expect(cu.clean('https://example.com?utm_source=google')).toEqual('https://example.com');
    });

    it('should clean up trailing separators', function () {
        expect(cu.clean('https://example.com?page=1&utm_source=test&')).toEqual('https://example.com?page=1');
        expect(cu.clean('https://example.com?utm_source=test&utm_medium=social')).toEqual('https://example.com');
    });
});