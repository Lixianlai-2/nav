const $siteList = $(".siteList"),
  $lastLi = $siteList.find(".lastLi"),
  simplifyUrl = function (e) {
    return e
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(".com", "")
      .replace(/\/.*/, "");
  },
  render = () => {
    $siteList.find("li:not(.lastLi)").remove(),
      hashMap.forEach((e, s) => {
        const o = $(
          `\n    <li>\n            <div class="site">\n                <div class="logo">\n                    ${
            e.logo[0]
          }\n                </div>\n                <div class="link">${simplifyUrl(
            e.url
          )}</div>\n                <div class="close">\n                    <svg class="icon" aria-hidden="true"> \n                      <use xlink:href="#icon-Close"></use> \n                    </svg>\n                </div>\n            </div>\n    </li>\n    `
        ).insertBefore($lastLi);
        o.on("click", () => {
          window.open(e.url);
        }),
          o.on("click", ".close", (e) => {
            e.stopPropagation(), hashMap.splice(s, 1), render();
          });
      });
  },
  saveHashMapString = localStorage.getItem("saveHashMapString"),
  saveHashMapObj = JSON.parse(saveHashMapString),
  hashMap = saveHashMapObj || [
    { logo: "B", url: "https://bilibili.com" },
    { logo: "G", url: "https://github.com" },
    { logo: "S", url: "https://stackoverflow.com" },
  ];
render(),
  $(".newSite").on("click", () => {
    let e,
      s = window.prompt("输入您想添加的网址吧");
    console.log(s),
      -1 === s.indexOf("http") && ((e = s), (s = "https://" + s)),
      hashMap.push({
        logo: simplifyUrl(s)[0].toUpperCase(),
        logoType: "text",
        url: s,
      }),
      render();
  }),
  (window.onbeforeunload = () => {
    const e = JSON.stringify(hashMap);
    localStorage.setItem("saveHashMapString", e);
  }),
  $(document).on("keypress", (e) => {
    console.log(e.key);
    const { key: s } = e;
    for (let e = 0; e < hashMap.length; e++)
      hashMap[e].logo.toLowerCase() === s && window.open(hashMap[e].url);
  });
let timer = null,
  startTime = "",
  endTime = "";
const closeBtn = $(".close");
console.log(closeBtn);
const $li1 = $("li");
$li1.on("touchstart", (e) => {
  console.log("触摸开始了"),
    (startTime = +new Date()),
    (timer = setTimeout(() => {
      for (let e = 0; e < closeBtn.length; e++)
        closeBtn[e].style.display = "block";
    }, 2e3));
}),
  $li1.on("touchend", () => {
    (endTime = +new Date()),
      console.log(timer),
      endTime - startTime < 2e3 && clearTimeout(timer);
  });
