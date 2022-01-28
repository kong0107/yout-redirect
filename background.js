const proxy = (typeof browser === "undefined" ? chrome : browser);

proxy.pageAction.onClicked.addListener(tab => {
    const match = /[?&]v=([\w\-]{11})/.exec(tab.url);
    if(!match) return;
    const video_id = match[1];
    console.debug(video_id);
    const url = "https://yout.com/video/?url=https://youtube.com/watch?v=" + video_id;
    proxy.tabs.update(tab.id, {url});
});

proxy.tabs.onUpdated.addListener((tab_id, _, tab) => {
    if(/^https?\:\/\/(www|music)\.youtube\.com\/watch\?(.+&)*v=[\w\-]{11}/.test(tab.url))
        proxy.pageAction.show(tab_id);
});
