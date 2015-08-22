# Seaden 

[Note: spec for proposed application]

This application is a proof of concept 'database backed static site generator'. What the hell is that? This is a proposed type of website where public content is hosted on a static web server, but that static content is updated by publishing html files from a separately hosted database backed application. Having a separate database backed application allows for associating complex data with content, such as multiple authors, and for editing that content via a private CMS.

Why 'Seaden'?The name is a pun on 'CDN' but a 'Sea Den' also expresses tradeoffs with the approach. Being at the bottom of the ocean, it is safe from sabotage or natural disaster, but is challenging to modify and update.

What is this trying to solve?
- out of the box globally distributed website
- easy to author content for large groups of non-engineers
- sub 100ms response time in developed nations around the world
- traffic independent performance
- highly resistant to DDOS (common in publishing)
- negligible cost even for large sites
- correctly support client side caching (e-tag and if-none-match headers are not supported by most static sites)

## Recommended setup

The recommended Seaden deployment requires two separate applications. 1) For public consumption, a CDN such as CloudFront/CloudFlare/Akamai in front of an S3 bucket/File Store. 2) A separately hosted admin application with a database. The admin application serves to authenticate authors and allows them to store drafts and preview posts before publishing. This example uses Node for the admin application to easily render previews of pages exactly as they will be seen live. When publishing, it simply uploads the previewed HTML file to the S3 bucket, which is then instantly globally available via CDN.

I recommend setting a low max and min TTL for the CDN -- around 20 minutes. TTL on a CDN just means 'how long should something stay in the CDN before checking for a new version'. Each application will have different TTL needs. For deriving a number, think of the worst case 'longest acceptable time something can be out of date' -- set that as your max TTL. If you want to optimize for cost or performance, increase that number. Due to the time it takes to distribute content in a CDN, do not use this if you are uncomfortable with a TTL of 20 minutes**.

## Example Sea Den styles architecture:

**Auction application**
admin app (admin.auction.com)
rails app
allows internal team to create auction item pages
publishes updates to public auction website s3 bucket
seaden gem which re-generates site html on edit of certain models
public auction website (www.auction.com)
static html pages that default to 'logged out' 
logged state fetched via "auction backend" API
served via cloudfront
auction backend (api.auction.com)
auction runner which processes bids
includes API accessible by public auction website to get updated bid state
Auth API (public auction website fetches)

## What problems does this create?

Being something new and different, it is not a magic bullet but rather a different set of tradeoffs. There are three simple qualities of a website - Fast, cheap, 'fresh' (up to date) - pick two. My exploration with this project is to see if it is possible to get a fast and cheap website that is also 'reasonably fresh' by using a CDN.

This setup creates one key problem: freshness. The problems stems from having an intermediate service between the web server and the user. Standard systems use a variety of caching techniques (russian doll caching and tools like memcached) to do caching 'smart'. This sidesteps that by saying

### Updating individual content pages

For small sites, the entire application can be recompiled and new pages can be pushed near-instantly. They are then subject to the 20 minute TTL.

### Updating collection pages

A collection page is perhaps vague in this case. The 'nightmare' scenario in this case would be the nytimes homepage where the homepage would be nearly constantly updated.

TODO: Outline different options for this scenario

## Developer workflow

All assets need to be deployed with versioned urls (a good idea anyway), keeping all past versions such that new pages get new JS when they are invalidated in the CDN.

When a new version of the site is deployed, all pages need to be re-deployed.

## Future features

This is a proof of concept application, not a full web publishing platform. Currently it lacks
scheduling posts
??

Other reading

https://www.mnot.net/cache_docs/
http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html
https://gist.github.com/6a68/4971859
