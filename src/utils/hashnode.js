/**
 * Fetches and parses the Hashnode RSS feed directly to bypass third-party caching.
 */
export const fetchHashnodePosts = async () => {
  // Use a 5-minute cache buster to ensure the blog stays dynamic while avoiding API spam
  const cacheBuster = Math.floor(Date.now() / 300000); 
  const url = `/api/hashnode-rss?v=${cacheBuster}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Hashnode RSS');
  }
  
  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  
  const items = Array.from(xmlDoc.querySelectorAll("item")).map(item => {
    // Helper to safely get CDATA text content
    const getText = (selector) => {
      const node = item.querySelector(selector);
      return node ? node.textContent : "";
    };
    
    // content:encoded needs special handling because of the namespace
    let content = "";
    const encodedNodes = item.getElementsByTagNameNS("*", "encoded");
    if (encodedNodes.length > 0) {
      content = encodedNodes[0].textContent;
    } else {
      content = getText("description");
    }
    
    return {
      guid: getText("guid") || getText("link"),
      title: getText("title"),
      description: getText("description"),
      link: getText("link"),
      pubDate: getText("pubDate"),
      content: content,
      enclosure: {
        link: item.querySelector("enclosure")?.getAttribute("url")
      },
      thumbnail: item.querySelector("enclosure")?.getAttribute("url")
    };
  });
  
  return { status: 'ok', items };
};
