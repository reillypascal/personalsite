const https = require("https");

function addLeadingZero(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function buildRFC822Date(dateString) {

}

async function getPosts() {

}

function buildRssItems(items) {
    return items
        .map((item) => {
            return `
                <item>
                    <title>${item.text}</title>
                    <author>Reilly Spitzfaden (@reillypascal@hachyderm.io)</author>
                    <link>https://reillyspitzfaden.com/${item.sys.id}</link>
                    <guid>https://reillyspitzfaden.com/${item.sys.id}</guid>
                    <pubDate>${item.sys.firstPublishedAt}</pubDate>
                </item>
                `;
        })
        .join("");
};


exports.handler = async function (event, context) {
    const rssFeed = `<?xml version="1.0"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Reilly Spitzfaden, Composer</title>
            <link>https://reillyspitzfaden.com/blog/</link>
            <description>A blog about my personal interests, including C++ audio plugin development, composition/sound design in Max/MSP, open tech, and web development</description>
        </channel>

        
        
    </rss>`;

    return {
        statusCode: 200,
        contentType: "text/xml",
        body: rssFeed,
    };
};

//${buildRssItems(await getHeapCodeStatistics())}