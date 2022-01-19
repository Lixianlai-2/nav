const $siteList = $(".siteList");
const $lastLi = $siteList.find(".lastLi");
const simplifyUrl = function (url) {
  // 注意原字符串不会改变，所以这里直接return
  return (
    url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(".com", "")
      // 用正则表达式，删除/之后的所有代码
      .replace(/\/.*/, "")
  );
};

const render = () => {
  $siteList.find("li:not(.lastLi)").remove();
  hashMap.forEach((siteObj, index) => {
    const $li = $(`
    <li>
            <div class="site">
                <div class="logo">
                    ${siteObj.logo[0]}
                </div>
                <div class="link">${simplifyUrl(siteObj.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true"> 
                      <use xlink:href="#icon-Close"></use> 
                    </svg>
                </div>
            </div>
    </li>
    `).insertBefore($lastLi);

    // 当点击li的时候，使用window.open
    $li.on("click", () => {
      window.open(siteObj.url);
    });

    // 这里就相当于在点击close按钮了
    $li.on("click", ".close", (e) => {
      e.stopPropagation();

      // 删除当前所在的页面
      hashMap.splice(index, 1);

      // 删除后重新渲染页面
      render();
    });
  });
};
// let noHttpsUrl;
// JSON.parse(localStorage.getItem("saveHashMapString")) ||
const saveHashMapString = localStorage.getItem("saveHashMapString");
const saveHashMapObj = JSON.parse(saveHashMapString);
// console.log(saveHashMapObj);

const hashMap = saveHashMapObj || [
  { logo: "B", url: "https://bilibili.com" },
  { logo: "G", url: "https://github.com" },
  {
    logo: "S",
    url: "https://stackoverflow.com",
  },
];

// console.log(hashMap);
// 这里用render是因为需要读取目前local storage中的内容
render();

// console.log(hashMap);
// -----------------------------------------
// 添加新网站
$(".newSite").on("click", () => {
  let url = window.prompt("输入您想添加的网址吧");
  console.log(url);
  let noHttpsUrl;
  //   indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
  if (url.indexOf("http") === -1) {
    noHttpsUrl = url;
    url = "https://" + url;
  }
  // push是将参数放到数组的最后
  hashMap.push({
    // 取简化后的首字母作为logo，然后对这个字母进行大写处理
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });

  render();
});

// 当关闭页面时，存储hashMap中的内容到localStorage
window.onbeforeunload = () => {
  // console.log("页面要关闭了");
  const hashMapString = JSON.stringify(hashMap);
  localStorage.setItem("saveHashMapString", hashMapString);
};

// -----------------------------------------
// 键盘导航
$(document).on("keypress", (e) => {
  // 在键盘上打出什么，key就是什么
  console.log(e.key);
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    // 遍历hashMap，如果它的logo小写等于我们输入的键盘事件key，那么就让用winodw.open打开相应网页
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

// -----------------------------------------
// 手机长按出现删除按钮

let timer = null;
let startTime = "";
let endTime = "";
const closeBtn = $(".close");
console.log(closeBtn);

const $li = $("li");

$li.on("touchstart", (e) => {
  startTime = +new Date();

  timer = setTimeout(() => {
    for (let i = 0; i < closeBtn.length; i++) {
      // closeBtn[i].classList.add("closeSelected");
      closeBtn[i].style.display = "block";
    }
  }, 700);
});

$li.on("touchend", (e) => {
  endTime = +new Date();
  console.log(timer);

  clearTimeout(timer);

  if (endTime - startTime < 700) {
    for (let i = 0; i < closeBtn.length; i++) {
      closeBtn[i].classList.add("closeSelected");
    }
  }
});
