// Conservative list of common tracking parameters to remove from URLs
// These are well-established tracking prefixes that are safe to remove
// without affecting content delivery or functionality

module.exports = [
    // Google Analytics and Ads
    'utm_',           // utm_source, utm_medium, utm_campaign, utm_term, utm_content
    'gclid',          // Google Click Identifier
    'gclsrc',         // Google Click Source
    
    // Facebook/Meta
    'fbclid',         // Facebook Click Identifier
    
    // Campaign management
    'cmpid',          // Campaign ID (various platforms)
    'mc_',            // MailChimp parameters (mc_cid, mc_eid)
    
    // Email marketing
    'emailid',        // Email tracking ID
    '_hsenc',         // HubSpot encoding parameter
    '_hsmi',          // HubSpot message ID
    
    // Microsoft/Bing
    'msclkid',        // Microsoft Click ID
    
    // Other common tracking
    'ref',            // Simple referrer tracking
    'source'          // Generic source tracking
];