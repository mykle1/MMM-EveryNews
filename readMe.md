## MMM-EveryNews

* Over 30,000 News sources!
* Choose up to 10 at once.
* Simplified addition to your config entry.

## Examples

![](images/1.png), ![](images/2.png), ![](images/3.png),

## Installation

* `git clone https://github.com/mykle1/MMM-EveryNews` into the `~/MagicMirror/modules` directory.
* Get FREE API key --> https://newsapi.org/register
* Annotated .css file included for your convenience.

## Config.js entry and options
```
{
  disabled: f,
    module: 'MMM-EveryNews',
    position: 'bottom center',
    config: {
      source: 'bbc-news,cbs-news,fox-news,nbc-news,national-geographic', any source from https://newsapi.org/sources. // Up to 10 at once
      scroll: true,                                  // description scroll or static
      scrollSpeed: "3",                              // if scroll is true
      apiKey: 'bdc660fcecc745228206b1865e7d0612',    // free API key from https://newsapi.org/register
      useHeader: true,                               // False if you don't want a header
      header: "Over 30,000 News Sources!",           // Any text you want. useHeader must be true
      maxWidth: "350px",
      animationSpeed: 3000,                          // fade speed
      rotateInterval: 5 * 60 * 1000,
    }
},
```

## For multiple News sources

* Separate sources by commas
* (Ex. 'bbc-news,national-geographic'). Any source from https://newsapi.org/sources
* Up to 10 at a time

## Sources

Open the "sources.json" file in a code editor (or text editor) and use the id's (as written) in your config entry. This is just a sample of the news sources available for this module. You can use any source from https://newsapi.org/sources.
Use up to 10 at a time.

## Special thanks to cowboysdude for continuous support and wizardry
