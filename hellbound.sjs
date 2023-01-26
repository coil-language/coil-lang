let frame = window

fn $(query) = ::querySelector(query)
fn $$(query) = ::querySelectorAll(query)

let assert = (cond) => {
  if (!cond) throw new Error("Assertion failure");
};


let OURL = (b) => URL.createObjectURL(b);
let pname = (src) => new URL(src).pathname.replaceAll("/", "_");

let t = (text) => frame.document.createTextNode(text);

function c(type, attrs, ...children) {
  let e = frame.document.createElement(type);
  for (let [key, value] of Object.entries(attrs)) {
    e.setAttribute(key, value);
  }
  e.replaceChildren(...children);
  return e;
}

async function saveImg(img) {
  let bimg = await fetch(img.src).then((i) => i.blob());
  c("a", { download: pname(img.src), href: (img.href = OURL(bimg)) }).click();
}

let toLocal = (src) => "http://localhost:8080/" + pname(src);

function convertImg(img) {
  try {
    img.srcset = img.srcset
      ?.split(",")
      .map((size) => size.trim().split(" "))
      .map(([src, size]) => `${toLocal(src)} ${size}`)
      .join(", ");
    img.src = toLocal(img.src);
  } catch {}
  return img;
}

async fn saveAllImgs(article) {
  await Promise.all(article::$$("img")::map(saveImg))
}

function saveText(text) {
  c("a", {
    download: pname(frame.location),
    href: OURL(new Blob([text], { type: "text/html" })),
  }).click()
}

function convertParentA(img) {
  let a = img.parentElement;
  assert(a.tagName === "A");
  a.href = toLocal(a.href);
}

let ready = () => new Promise((resolve) => frame.setTimeout(resolve, 5000));

async function savePage(frame) {
  await ready();
  let article = frame::$("article");
  await saveAllImgs(article);
  let title = article::$("header h1").textContent.trim();
  let headerImg = article::$(".entry-media img");
  let content = article
    ::$(".wrapper .grids .grid-8 .entry-content")
    .cloneNode(true)

  content::$$("img")::each(convertImg);
  content::$$("a img")::each(convertParentA);
  content::$("#author-box")?.remove();
  saveText(
    c(
      "article",
      {},
      c("header", {}, c("h1", {}, t(title))),
      c("div", { class: "entry-media" }, convertImg(headerImg.cloneNode())),
      c(
        "div",
        { class: "wrapper" },
        c("div", { class: "grids" }, c("div", { class: "grid-8" }, content))
      )
    ).outerHTML
  );
}

async function saveAllPages() {
  for (let a of ::$$(".entry-title a")) {
    frame = window.open(a.href, "_blank");
    await savePage(frame);
  }
}

saveAllPages();
