// ==UserScript==
// @name        VoiceLinks
// @namespace   Sanya
// @description Makes RJ codes more useful.(8-bit RJCode supported.)
// @include     *://*/*
// @version     2.9.3
// @connect     dlsite.com
// @connect     media.ci-en.jp
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// @homepage    https://greasyfork.org/zh-CN/scripts/456775
// @downloadURL https://update.greasyfork.org/scripts/456775/VoiceLinks.user.js
// @updateURL https://update.greasyfork.org/scripts/456775/VoiceLinks.meta.js
// ==/UserScript==

(function () {
    'use strict';

    //------持久化设置项------
    const settings = {
        /***是否解析链接（鼠标移动到指向dlsite对应作品的链接时也显示音声信息）***/
        parse_url: GM_getValue("parse_url", true),

        /***是否在DLSite相关网站显示音声信息（开启链接解析才可在DL上有效使用）***/
        use_in_dl: GM_getValue("use_in_dl", false),

        /***DLSite网页是否显示大家翻对应语言的翻译版标题（默认是）***/
        use_translated_title: GM_getValue("use_translated_title", true),

        save: function () {
            GM_setValue("use_translated_title", settings.use_translated_title);
            GM_setValue("use_in_dl", settings.use_in_dl);
            GM_setValue("parse_url", settings.parse_url);
        },
        load: function () {
            settings.parse_url = GM_getValue("parse_url", true);
            settings.use_translated_title = GM_getValue("use_translated_title", true);
            settings.use_in_dl = GM_getValue("use_in_dl", false);
        }
    }
    //----------------------


    const RJ_REGEX = new RegExp("(R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6})", "gi");
    const URL_REGEX = new RegExp("dlsite.com/.*/product_id/((R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6}))", "g");
    const VOICELINK_CLASS = 'voicelink';
    const RJCODE_ATTRIBUTE = 'rjcode';
    const css = `
      .voicepopup {
          min-width: 600px !important;
          z-index: 2147483646 !important;
          max-width: 80% !important;
          position: fixed !important;
          line-height: 1.4em;
          font-size:1.1em!important;
          margin-bottom: 10px;
          box-shadow: 0 0 .125em 0 rgba(0,0,0,.5);
          border-radius: 0.5em;
          background-color:#8080C0;
          color:#F6F6F6;
          text-align: left;
          padding: 10px;
          pointer-events: none;
      }
 
      .voicepopup-maniax{
          background-color:#8080C0;
      }
 
      .voicepopup-girls{
          background-color:#B33761;
      }
 
      .voicepopup img {
          width: 270px;
          height: auto;
          margin: 3px 15px 3px 3px;
          max-width: fit-content;
      }
 
      .voicepopup a {
          text-decoration: none;
          color: pink;
      }
 
      .voicepopup .age-18{
          color: hsl(300deg 76% 77%);
      }
 
      .voicepopup .age-all{
          color: hsl(157deg 82% 52%);
      }
 
      .voice-title {
          font-size: 1.4em;
          font-weight: bold;
          text-align: center;
          margin: 5px 10px 0 0;
          display: block;
      }
 
      .rjcode {
          text-align: center;
          font-size: 1.2em;
          font-style: italic;
          opacity: 0.3;
      }
 
      .error {
          height: 210px;
          line-height: 210px;
          text-align: center;
      }
 
      .discord-dark {
          background-color: #36393f;
          color: #dcddde;
          font-size: 0.9375rem;
      }
 
      .${VOICELINK_CLASS}_work_title:hover #${VOICELINK_CLASS}_copy_btn {
          opacity: 1;
      }
 
      #${VOICELINK_CLASS}_copy_btn {
          background: transparent;
          border-color: transparent;
          cursor: pointer;
          transition: all 0.3s;
          opacity: 0;
          font-size: 0.75em;
          user-select: none;
          position: absolute;
      }
 
      #${VOICELINK_CLASS}_copy_btn:hover {
          scale: 1.2;
      }
 
      #${VOICELINK_CLASS}_copy_btn:active {
          scale: 1.1;
      }
 
  `

    /**
     * Work promise cache
     * @type {{info:{}, api:{}}}
     */
    const work_promise = {};

    function getAdditionalPopupClasses() {
        const hostname = document.location.hostname;
        switch (hostname) {
            case "boards.4chan.org": return "post reply";
            case "discordapp.com": return "discord-dark";
            default: return null;
        }
    }

    function getVoiceLinkTarget(target){
        while (target && !target.classList.contains(VOICELINK_CLASS)){
            target = target.parentElement;
        }
        return target;
    }

    function isInDLSite(){
        return document.location.hostname.endsWith("dlsite.com");
    }

    /**
     * Convert to valid file name.
     * @param {String} original
     */
    function convertToValidFileName(original){
        const charMap = {
            "/": "／",
            "\\": "＼",
            ":": "：",
            "*": "＊",
            "?": "？",
            "\"": "＂",
            "<": "＜",
            ">": "＞",
            "|": "｜"
        }

        let fileName = original;
        for (let key in charMap){
            fileName = fileName.replaceAll(key, charMap[key]);
        }
        return fileName;
    }

    function setUserSelectTitle(){
        // Make title selectable
        const hostname = document.location.hostname;
        if(!hostname.endsWith("dlsite.com")){
            return;
        }
        const rjList = document.URL.match(RJ_REGEX)
        const rj = rjList[rjList.length - 1]

        const title = document.getElementById("work_name");
        if(!title){
            return;
        }
        let titleStr = title.innerText;

        const button = document.createElement("button");
        button.id = `${VOICELINK_CLASS}_copy_btn`;
        button.innerHTML = "📃";
        button.addEventListener("mouseenter", function(){
            button.innerHTML = "📃 复制为有效文件名";
        });
        button.addEventListener("mouseleave", function(){
            button.innerHTML = "📃";
        });
        button.addEventListener("click", function(){
            const fileName = convertToValidFileName(titleStr);
            const promise = navigator.clipboard.writeText(fileName);
            promise.then(() => {
                button.innerHTML = "✔ 复制成功";
            });
            promise.catch(e => {
                window.prompt("复制失败，请手动复制", fileName);
                button.innerHTML = "📃";
            });
        });

        title.style.userSelect = "text";
        title.classList.add(`${VOICELINK_CLASS}_work_title`);
        title.appendChild(button);

        if(settings.use_translated_title){
            //将Title替换成大家翻对应的语言翻译版本
            WorkPromise.getWorkTitle(rj).then(t => {
                titleStr = t
                title.innerText = t
                title.appendChild(button)
            })
        }
    }

    function getXmlHttpRequest() {
        return (typeof GM !== "undefined" && GM !== null ? GM.xmlHttpRequest : GM_xmlhttpRequest);
    }

    const Parser = {
        walkNodes: function (elem) {
            const rjNodeTreeWalker = document.createTreeWalker(
                elem,
                NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        if(settings.parse_url && node.nodeName === "A"){
                            if(!settings.use_in_dl && document.location.hostname.endsWith("dlsite.com")){
                                return NodeFilter.FILTER_SKIP;
                            }

                            let href = node.href;
                            if(href.match(URL_REGEX)){
                                return NodeFilter.FILTER_ACCEPT;
                            }
                        }

                        if (node.nodeName !== "#text") return NodeFilter.FILTER_SKIP;

                        if (node.parentElement.classList.contains(VOICELINK_CLASS))
                            return NodeFilter.FILTER_ACCEPT;
                        if (node.nodeValue.match(RJ_REGEX))
                            return NodeFilter.FILTER_ACCEPT;

                        return NodeFilter.FILTER_SKIP;
                    }
                },
                false,
            );
            while (rjNodeTreeWalker.nextNode()) {
                const node = rjNodeTreeWalker.currentNode;

                //Ignore Element which let user input (textarea), input can be ignored because it's not a text node.
                if(node.parentElement.nodeName === "TEXTAREA"){
                    continue;
                }

                if (node.parentElement.classList.contains(VOICELINK_CLASS))
                    Parser.rebindEvents(node.parentElement);
                else if(node.nodeName === "A") {
                    Parser.linkifyURL(node);
                }else{
                    Parser.linkify(node);
                }
            }
        },

        wrapRJCode: function (rjCode) {
            let e;
            e = document.createElement("a");
            e.classList = VOICELINK_CLASS;
            e.href = `https://www.dlsite.com/maniax/work/=/product_id/${rjCode.toUpperCase()}.html`
            e.innerHTML = rjCode;
            e.target = "_blank";
            e.rel = "noreferrer";
            e.setAttribute(RJCODE_ATTRIBUTE, rjCode.toUpperCase());
            e.addEventListener("mouseover", Popup.over);
            e.addEventListener("mouseout", Popup.out);
            e.addEventListener("mousemove", Popup.move);
            return e;
        },

        /***
         * 处理直链
         * @param {Node} node
         ***/
        linkifyURL: function(node) {
            const e = node;
            const href = e.href;
            const rjs = href.match(RJ_REGEX);
            const rj = rjs[rjs.length - 1];
            if(!rj) return;

            e.classList.add(VOICELINK_CLASS);
            e.setAttribute(RJCODE_ATTRIBUTE, rj.toUpperCase());
            e.addEventListener("mouseover", Popup.over);
            e.addEventListener("mouseout", Popup.out);
            e.addEventListener("mousemove", Popup.move);
        },

        linkify: function (textNode) {
            const nodeOriginalText = textNode.nodeValue;
            const matches = [];

            let match;
            while (match = RJ_REGEX.exec(nodeOriginalText)) {
                matches.push({
                    index: match.index,
                    value: match[0],
                });
            }

            // Keep text in text node until first RJ code
            textNode.nodeValue = nodeOriginalText.substring(0, matches[0].index);

            // Insert rest of text while linkifying RJ codes
            let prevNode = null;
            for (let i = 0; i < matches.length; ++i) {
                // Insert linkified RJ code
                let code = matches[i].value
                const rjLinkNode = Parser.wrapRJCode(code);
                textNode.parentNode.insertBefore(
                    rjLinkNode,
                    prevNode ? prevNode.nextSibling : textNode.nextSibling,
                );

                // Insert text after if there is any
                let upper;
                if (i === matches.length - 1)
                    upper = undefined;
                else
                    upper = matches[i + 1].index;
                let substring;
                if (substring = nodeOriginalText.substring(matches[i].index + matches[i].value.length, upper)) {
                    const subtextNode = document.createTextNode(substring);
                    textNode.parentNode.insertBefore(
                        subtextNode,
                        rjLinkNode.nextElementSibling,
                    );
                    prevNode = subtextNode;
                }
                else {
                    prevNode = rjLinkNode;
                }
            }
        },

        rebindEvents: function (elem) {
            if (elem.nodeName === "A") {
                elem.addEventListener("mouseover", Popup.over);
                elem.addEventListener("mouseout", Popup.out);
                elem.addEventListener("mousemove", Popup.move);
            }
            else {
                const voicelinks = elem.querySelectorAll("." + VOICELINK_CLASS);
                for (let i = 0, j = voicelinks.length; i < j; i++) {
                    const voicelink = voicelinks[i];
                    voicelink.addEventListener("mouseover", Popup.over);
                    voicelink.addEventListener("mouseout", Popup.out);
                    voicelink.addEventListener("mousemove", Popup.move);
                }
            }
        },

    }

    const Popup = {
        popupElement: {
            popup: null,
            notFound: null,
            img: {container: null},
            title: null,
            rjCode: null,
            flag: null,
            circle: null,
            debug: null,
            translator: null,
            releaseDate: null,
            updateDate: null,
            age: null,
            cv: null,
            tags: null,
            fileSize: null,
        },

        makePopup: function () {
            const popup = document.createElement("div");
            const ele = Popup.popupElement;
            ele.popup = popup;

            popup.className = "voicepopup voicepopup-maniax " + (getAdditionalPopupClasses() || '');
            popup.id = `${VOICELINK_CLASS}-voice-popup`;  // + rjCode;
            popup.style = "display: flex";
            document.body.appendChild(popup);

            const notFoundElement = document.createElement("div");
            ele.notFound = notFoundElement;
            //占满整个popup
            notFoundElement.style = "display: none; width: 100%; height: 100%";
            notFoundElement.innerText = "Work Not Found.";
            popup.appendChild(notFoundElement);

            const imgContainer = document.createElement("div")
            ele.img.container = imgContainer;

            const infoContainer = document.createElement("div");

            const titleElement = document.createElement("div");
            ele.title = titleElement;
            titleElement.classList.add("voice-title");
            infoContainer.appendChild(titleElement);

            const rjCodeElement = document.createElement("div");
            ele.rjCode = rjCodeElement;
            rjCodeElement.classList.add("rjcode");
            infoContainer.appendChild(rjCodeElement);

            const flagElement = document.createElement("div");
            ele.flag = flagElement;
            flagElement.style.marginTop = "20px";
            infoContainer.appendChild(flagElement);

            const circleElement = document.createElement("div");
            ele.circle = circleElement;
            infoContainer.appendChild(circleElement);

            const debugElement = document.createElement("div");
            ele.debug = debugElement;
            infoContainer.appendChild(debugElement);

            const translatorElement = document.createElement("div");
            ele.translator = translatorElement;
            infoContainer.appendChild(translatorElement);

            const releaseElement = document.createElement("div");
            ele.releaseDate = releaseElement;
            infoContainer.appendChild(releaseElement);

            const updateElement = document.createElement("div");
            ele.updateDate = updateElement;
            infoContainer.appendChild(updateElement);

            const ageElement = document.createElement("div");
            ele.age = ageElement;
            infoContainer.appendChild(ageElement);

            const cvElement = document.createElement("div");
            ele.cv = cvElement;
            infoContainer.appendChild(cvElement);

            const tagsElement = document.createElement("div");
            ele.tags = tagsElement;
            infoContainer.appendChild(tagsElement);

            const filesizeElement = document.createElement("div");
            ele.fileSize = filesizeElement;
            infoContainer.appendChild(filesizeElement);

            infoContainer.style.paddingBottom = "3px";
            popup.appendChild(infoContainer);
            popup.insertBefore(imgContainer, popup.childNodes[0]);
        },

        updatePopup: function(e, rjCode, isParent=false) {
            const ele = Popup.popupElement;
            const popup = ele.popup;
            popup.className = "voicepopup voicepopup-maniax " + (getAdditionalPopupClasses() || '');
            // popup.id = "voice-" + rjCode;
            popup.style = "display: flex";
            popup.setAttribute(RJCODE_ATTRIBUTE, rjCode);

            let workFound = true;
            Popup.setFoundState(true);
            WorkPromise.getFound(rjCode).then(found => {
                //尝试ParentWork
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;

                return new Promise(async (resolve, _) => {
                    if (found) {
                        resolve({found: true, parentRJ: rjCode});
                        return;
                    }
                    let parentRJ = await WorkPromise.getParentRJ(rjCode);
                    if(parentRJ === rjCode) {
                        resolve({found: false, parentRJ: rjCode});
                    }
                    found = await WorkPromise.getFound(parentRJ);
                    resolve({found: found, parentRJ: parentRJ});
                });
            }).then((state) => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;

                const found = state.found;
                const rj = state.parentRJ;
                if(found && rj !== rjCode){
                    //如果找到了父作品的信息但子作品找不到，就重新update
                    this.updatePopup(e, rj, true);
                    return;
                }

                ele.notFound.style.display = found ? "none" : "block";
                Popup.setFoundState(found);
                workFound = found;
            });

            WorkPromise.getGirls(rjCode).then(isGirls => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                if(isGirls) popup.className += (" voicepopup-girls")
            }).catch(e => {});

            const imgContainer = ele.img.container;
            let img = ele.img[rjCode];
            if(!img){
                //由于切换图片src会导致加载延迟，故根据RJ号保留所有图片的img元素并按需显示
                img = document.createElement("img");
                ele.img[rjCode] = img;
                imgContainer.appendChild(img);
            }
            for (let i = 0; i < imgContainer.childNodes.length; ++i) {
                imgContainer.childNodes[i].style.display = "none";
            }
            img.style.display = "block"
            WorkPromise.getImgLink(rjCode).then(link => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                img.src = link;
            }).catch(e => {});

            const titleElement = ele.title;
            titleElement.innerText = "Loading...";
            WorkPromise.getWorkTitle(rjCode).then(title => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                titleElement.innerText = title
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                titleElement.innerHTML = ""
            });

            const rjCodeElement = ele.rjCode;
            rjCodeElement.innerText = `[${isParent ? " ↑ " : ""}${rjCode}]`;

            const flagElement = ele.flag;
            flagElement.style.marginTop = "20px"
            flagElement.innerHTML = "";
            WorkPromise.getWorkPromise(rjCode).api.then(data => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                if(data.is_special){
                    //特典作品
                    flagElement.innerHTML = `<span style="color: gold; font-size: 15px; align-self: center; font-weight: bold">[BONUS]</span>`;
                }
                else if(!data.is_sale && !data.is_coming_soon) {
                    flagElement.innerHTML = `<span style="color: darkred; font-size: 15px; align-self: center">(No longer for Sale)</span>`;
                }
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                flagElement.innerHTML = "";
            });

            const circleElement = ele.circle;
            circleElement.innerHTML = "Circle: Loading...";
            WorkPromise.getCircle(rjCode).then(circle => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                circleElement.innerHTML = `Circle: <a>${circle}</a>`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                circleElement.innerHTML = "";
            });

            const debugElement = ele.debug;
            debugElement.innerHTML = "";
            WorkPromise.getDebug(rjCode).then(debug => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                debugElement.innerHTML = debug;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                debugElement.innerHTML = "";
            });

            const translatorElement = ele.translator;
            translatorElement.innerHTML = "";
            WorkPromise.getTranslatorName(rjCode).then(name => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                translatorElement.innerHTML = `Translator: <a>${name}</a>`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                translatorElement.innerHTML = "";
            });

            const releaseElement = ele.releaseDate;
            releaseElement.innerHTML = "Release: Loading...";
            WorkPromise.getReleaseDate(rjCode).then(date => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                releaseElement.innerHTML = `Release: <a>${date}</a>`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                releaseElement.innerHTML = "";
            });

            const updateElement = ele.updateDate;
            updateElement.innerHTML = "";
            WorkPromise.getUpdateDate(rjCode).then(date => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                updateElement.innerHTML = `Update: <a>${date}</a>`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                updateElement.innerHTML = "";
            });

            const ageElement = ele.age;
            ageElement.innerHTML = "Age rating: Loading...";
            WorkPromise.getAgeRating(rjCode).then(rating => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                let ratingClass = "age-all";
                if(rating.includes("18")){
                    ratingClass = "age-18";
                }
                ageElement.innerHTML = `Age rating: <a class="${ratingClass}">${rating}</a>`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                ageElement.innerHTML = "";
            });

            const cvElement = ele.cv;
            cvElement.innerHTML = "CV: Loading...";
            WorkPromise.getCV(rjCode).then(cv => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                cvElement.innerHTML = `CV: <a>${cv}</a>`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                cvElement.innerHTML = "";
            });

            const tagsElement = ele.tags;
            tagsElement.innerHTML = "Tags: Loading...";
            WorkPromise.getTags(rjCode).then(tags => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                let tagsHtml = "Tags: <a>";
                tags.forEach(tag => {
                    tagsHtml += tag + "\u3000";
                });
                tagsHtml += "</a>";
                tagsElement.innerHTML = tagsHtml;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                tagsElement.innerHTML = "";
            });

            const filesizeElement = ele.fileSize;
            filesizeElement.innerHTML = "File size: Loading...";
            WorkPromise.getFileSize(rjCode).then(filesize => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                filesizeElement.innerHTML = `File size: ${filesize}`;
            }).catch(_ => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;
                filesizeElement.innerHTML = "";
            });

            Popup.move(e);
        },

        setFoundState(found){
            const ele = Popup.popupElement;
            const popup = ele.popup;

            ele.notFound.style.display = found ? "none" : "block";
            ele.img.container.style.display = found ? "block" : "none";
            ele.title.style.display = found ? "block" : "none";
            ele.rjCode.style.display = found ? "block" : "none";
            ele.flag.style.display = found ? "block" : "none";
            ele.circle.style.display = found ? "block" : "none";
            ele.debug.style.display = found ? "block" : "none";
            ele.translator.style.display = found ? "block" : "none";
            ele.releaseDate.style.display = found ? "block" : "none";
            ele.updateDate.style.display = found ? "block" : "none";
            ele.age.style.display = found ? "block" : "none";
            ele.cv.style.display = found ? "block" : "none";
            ele.tags.style.display = found ? "block" : "none";
            ele.fileSize.style.display = found ? "block" : "none";
        },

        over: function (e) {
            const target = isInDLSite() ? e.target : getVoiceLinkTarget(e.target);
            if(!target || !target.classList.contains(VOICELINK_CLASS)) return;

            const rjCode = target.getAttribute(RJCODE_ATTRIBUTE);
            const popup = document.querySelector(`div#${VOICELINK_CLASS}-voice-popup`);  // + rjCode);
            if (popup) {
                popup.style.display = "flex";
            }
            else {
                Popup.makePopup();
            }
            Popup.updatePopup(e, rjCode);
        },

        out: function (e) {
            const popup = document.querySelector(`div#${VOICELINK_CLASS}-voice-popup`);  // + rjCode);
            if (popup) {
                popup.style.display = "none";
            }
        },

        move: function (e) {
            const popup = document.querySelector(`div#${VOICELINK_CLASS}-voice-popup`);  // + rjCode);
            if (popup) {
                if (popup.offsetWidth + e.clientX + 10 < window.innerWidth - 10) {
                    popup.style.left = (e.clientX + 10) + "px";
                }
                else {
                    popup.style.left = (window.innerWidth - popup.offsetWidth - 10) + "px";
                }

                if (popup.offsetHeight + e.clientY + 50 > window.innerHeight) {
                    popup.style.top = (e.clientY - popup.offsetHeight - 8) + "px";
                }
                else {
                    popup.style.top = (e.clientY + 20) + "px";
                }
            }
        },
    }

    const WorkPromise = {
        /**
         * 标题、社团、发行日期、更新日期、年龄指定
         * CV、标签、文件大小、封面地址
         */

        checkNotNull: function (obj){
            if(!obj) throw new Error();
            return obj;
        },

        getWorkPromise: function (rjCode){
            if(work_promise[rjCode]){
                return work_promise[rjCode];
            }
            work_promise[rjCode] = DLsite.getWorkRequestPromise(rjCode);
            return work_promise[rjCode];
        },

        getFound: async function(rjCode){
            try{
                const data = await this.getWorkPromise(rjCode).api;
                return data !== null;
            }catch (e){
                //说明是网络问题，删除缓存并返回true
                delete work_promise[rjCode];
                return true;
            }
        },

        getParentRJ: async function(rjCode){
            try{
                const data = await this.getWorkPromise(rjCode).info;
                return data.parentWork;
            }catch (e){
                return null;
            }
        },

        getGirls: async function(rjCode){
            const data = await this.getWorkPromise(rjCode).api;
            this.checkNotNull(data.is_girls)
            return data.is_girls;
        },

        getDebug: async function(rjCode){
            return "";
            /*const work = this.getWorkPromise(rjCode);
            const api = await work.api;
            const info = await work.info;
            const circle = work.circle;

            return `is_sale: ${api.is_sale} <br/>
                    is_free: ${api.is_free} <br/>
                    is_oly: ${api.is_oly} <br/>
                    is_led: ${api.is_led} <br/>`;*/

        },

        getImgLink: async function(rjCode){
            try{
                const apiData = await this.getWorkPromise(rjCode).api;
                if(apiData.img_url) return "https://" + apiData.img_url;
                this.checkNotNull(apiData.img_url);
            }catch (e) {
                const info = await this.getWorkPromise(rjCode).info;
                this.checkNotNull(info.img);
                return info.img;
            }
        },

        getWorkTitle: async function(rjCode){
            const apiData = await this.getWorkPromise(rjCode).api;
            this.checkNotNull(apiData.title);
            return apiData.title;
        },

        getAgeRating: async function(rjCode){
            const info = await this.getWorkPromise(rjCode).info;
            this.checkNotNull(info.rating);
            return info.rating;
        },

        getCircle: async function(rjCode){
            let work = this.getWorkPromise(rjCode);
            let info = await work.info;

            if(!info.circleId){
                //页面解析失败，可能作品无法显示，此时直接获取RG信息
                const circleInfo = await work.circle;
                this.checkNotNull(circleInfo);
                this.checkNotNull(circleInfo.name);
                return circleInfo.name;
            }

            if(info.circleId && info.circleId !== "RG60289"){
                //RG魔法值为大家翻的RG号
                this.checkNotNull(info.circle);
                return info.circle;
            }

            //匹配原版社团名，而不是大家翻
            const api = await work.api;
            this.checkNotNull(api.original_rj);
            work = this.getWorkPromise(api.original_rj)
            info = await work.info;
            this.checkNotNull(info.circle);
            return info.circle;
        },

        getTranslatorName: async function(rjCode){
            const api = await this.getWorkPromise(rjCode).api;
            this.checkNotNull(api.maker_name);
            return api.maker_name;
        },

        getReleaseDate: async function(rjCode){
            const info = await this.getWorkPromise(rjCode).info;
            if(info && info.date) return info.date;

            //从api中查找发售时间
            const api = await this.getWorkPromise(rjCode).api;
            this.checkNotNull(api.regist_date)
            return api.regist_date;
        },

        getUpdateDate: async function(rjCode) {
            const info = await this.getWorkPromise(rjCode).info;
            this.checkNotNull(info["update"]);
            return info["update"];
        },

        getCV: async function(rjCode){
            const info = await this.getWorkPromise(rjCode).info;
            this.checkNotNull(info.cv);
            return info.cv;
        },

        getTags: async function(rjCode) {
            const info = await this.getWorkPromise(rjCode).info;
            this.checkNotNull(info.tags);
            return info.tags;
        },

        getFileSize: async function(rjCode) {
            let info = await this.getWorkPromise(rjCode).info;
            if(info.filesize) return info.filesize;

            let api = await this.getWorkPromise(rjCode).api;
            const original_rj = api.original_rj;
            info = await this.getWorkPromise(original_rj).info;
            this.checkNotNull(info.filesize);
            return info.filesize;
        }
    }

    const DLsite = {
        parseWorkDOM: function (dom, rj) {
            // workInfo: {
            //     rj: any;
            //     img: string;
            //     title: any;
            //     circle: any;
            //     date: any;
            //     rating: any;
            //     tags: any[];
            //     cv: any;
            //     filesize: any;
            //     dateAnnounce: any;
            // }
            const workInfo = {};
            workInfo.rj = rj;

            let rj_group;
            if (rj.slice((rj.length === 10 ? 7 : 5)) === "000")
                rj_group = rj;
            else {
                rj_group = (parseInt(rj.slice(2, (rj.length === 10 ? 7 : 5))) + 1).toString() + "000";
                if(rj_group.length < rj.length - 2){
                    let zero = Math.pow(10, rj.length - rj_group.length - 2).toString().slice(1)
                    rj_group = zero + rj_group
                }
                rj_group = "RJ" + rj_group; //("000000" + rj_group).substring(rj_group.length);
            }

            workInfo.img = "https://img.dlsite.jp/modpub/images2/work/doujin/" + rj_group + "/" + rj + "_img_main.jpg";

            let metaList = dom.getElementsByTagName("meta")
            for (let i = 0; i < metaList.length; i++){
                let meta = metaList[i];
                if(meta.getAttribute("property") === 'og:image'){
                    workInfo.img = meta.content;
                    break;
                }
            }

            workInfo.title = dom.getElementById("work_name").innerText;
            workInfo.circle = dom.querySelector("span.maker_name").innerText;
            workInfo.circleId = dom.querySelector("#work_maker a").href;
            workInfo.circleId = workInfo.circleId.substring(workInfo.circleId.lastIndexOf("/") + 1, workInfo.circleId.lastIndexOf(".")).trim();

            const table_outline = dom.querySelector("table#work_outline");
            for (var i = 0, ii = table_outline.rows.length; i < ii; i++) {
                const row = table_outline.rows[i];
                const row_header = row.cells[0].innerText;
                const row_data = row.cells[1];
                switch (true) {
                    case (row_header.includes("販売日")||row_header.includes("贩卖日")||row_header.includes("Release date")||row_header.includes("販賣日")||row_header.includes("판매일")):
                        workInfo.date = row_data.innerText;
                        break;
                    case (row_header.includes("更新情報")||row_header.includes("更新信息")||row_header.includes("Update information")||row_header.includes("更新資訊")||row_header.includes("갱신 정보")):
                        workInfo.update = row_data.firstChild.data;
                        break;
                    case (row_header.includes("年齢指定")||row_header.includes("年龄指定")||row_header.includes("Age")||row_header.includes("年齡指定")||row_header.includes("연령 지정")):
                        workInfo.rating = row_data.innerText;
                        break;
                    case (row_header.includes("ジャンル")||row_header.includes("分类")||row_header.includes("Genre")||row_header.includes("分類")||row_header.includes("장르")):
                        const tag_nodes = row_data.querySelectorAll("a");
                        workInfo.tags = [...tag_nodes].map(a => { return a.innerText });
                        break;
                    case (row_header.includes("声優")||row_header.includes("声优")||row_header.includes("Voice Actor")||row_header.includes("聲優")||row_header.includes("성우")):
                        workInfo.cv = row_data.innerText;
                        break;
                    case (row_header.includes("ファイル容量")||row_header.includes("文件容量")||row_header.includes("File size")||row_header.includes("檔案容量")||row_header.includes("파일 용량")):
                        workInfo.filesize = row_data.innerText.trim();
                        break;
                    default:
                        break;
                }
            }

            const work_date_ana = dom.querySelector("strong.work_date_ana");
            if (work_date_ana) {
                workInfo.dateAnnounce = work_date_ana.innerText;
                workInfo.img = "https://img.dlsite.jp/modpub/images2/ana/doujin/" + rj_group + "/" + rj + "_ana_img_main.jpg"
            }

            return workInfo;
        },

        request: function (rjCode, callback) {
            const url = `https://www.dlsite.com/maniax/work/=/product_id/${rjCode}.html`;
            getXmlHttpRequest()({
                method: "GET",
                url,
                headers: {
                    "Accept": "text/xml",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0)"
                },
                onload: function (resp) {
                    if (resp.readyState === 4 && resp.status === 200) {
                        const dom = new DOMParser().parseFromString(resp.responseText, "text/html");
                        const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                        callback(workInfo);
                    }
                    else if (resp.readyState === 4 && resp.status === 404)
                        DLsite.requestAnnounce(rjCode, callback);
                },
            });
        },

        requestAnnounce: function (rjCode, callback) {
            const url = `https://www.dlsite.com/maniax/announce/=/product_id/${rjCode}.html`;
            getXmlHttpRequest()({
                method: "GET",
                url,
                headers: {
                    "Accept": "text/xml",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0)"
                },
                onload: function (resp) {
                    if (resp.readyState === 4 && resp.status === 200) {
                        const dom = new DOMParser().parseFromString(resp.responseText, "text/html");
                        const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                        callback(workInfo);
                    }
                    else if (resp.readyState === 4 && resp.status === 404)
                        callback(null);
                },
            });
        },

        // Get language code for DLSite API
        getLangCode: function (lang) {
            if(!lang) return "ja-JP";

            switch (lang.toUpperCase()) {
                case "JPN":
                    return "ja-JP";
                case "ENG":
                    return "en-US";
                case "KO_KR":
                    return "ko-KR";
                case "CHI_HANS":
                    return "zh-CN";
                case "CHI_HANT":
                    return "zh-TW";
                default:
                    return "ja-JP"
            }
        },

        parseApiData: function (rjCode, data){
            if(!data) data = {};
            const translation_info = data.translation_info ? data.translation_info : {};
            let apiData = {
                title: data.work_name,
                img_url: data.work_image ? data.work_image.substring(2) : null,
                original_rj: translation_info.original_workno ? translation_info.original_workno : rjCode,
                maker_name: data.maker_name,
                maker_id: data.maker_id,
                regist_date: data.regist_date,
                is_sale: data.is_sale,
                is_free: data.is_free,
                is_oly: data.is_oly,
                is_led: data.is_led,
                is_special: !data.is_sale && data.is_free && data.is_oly && data.wishlist_count === false,
                is_girls: (data.options && data.options.indexOf("OTM") >= 0) || (data.site_id === "girls")
            }

            if(data.regist_date){
                let reg_date = data.regist_date.replace(/-/g, '/');
                let releaseDate = new Date(reg_date);
                apiData.regist_timestamp = releaseDate.getTime();
                apiData.regist_date = `${releaseDate.getFullYear()} / ${releaseDate.getMonth() + 1} / ${releaseDate.getDate()}`;
                if(apiData.regist_timestamp > Date.now()){
                    apiData.is_coming_soon = true;

                    //计算倒计时天数
                    let date_reg = new Date(releaseDate.getFullYear(), releaseDate.getMonth(), releaseDate.getDate());
                    let date_today = new Date(Date.now());
                    date_today = new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate());
                    let days = (date_reg.getTime() - date_today.getTime()) / (1000 * 60 * 60 * 24);

                    apiData.regist_date += `<span style="color:#ffeb3b; font-size: 16px; font-style: italic; margin-left: 16px">(Coming in ${days} day${(days > 1 ? "s" : "")})</span>`;
                }
            }
            return apiData;
        },

        getHttp: function (url, onload, onerror){
            return getXmlHttpRequest()({
                method: "GET",
                url,
                headers: {
                    "Accept": "text/xml",
                    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0)"
                },
                onload: onload,
                onerror: onerror
            });
        },

        getAnnouncePromise: function (rjCode, parentRJ) {
            const url = `https://www.dlsite.com/maniax/announce/=/product_id/${rjCode}.html`;
            return new Promise(
                (resolve, reject) => {
                    this.getHttp(url, resp => {
                        if (resp.readyState === 4 && resp.status === 200) {
                            const dom = new DOMParser().parseFromString(resp.responseText, "text/html");
                            const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                            workInfo.parentWork = parentRJ === rjCode ? null : parentRJ;
                            resolve(workInfo);
                        }
                        else if (resp.readyState === 4 && resp.status === 404) {
                            resolve({parentWork: parentRJ === rjCode ? null : parentRJ});
                        }
                    }, () => reject(null))
                }
            )
        },

        getHtmlPromise: function (rjCode) {
            const url = `https://www.dlsite.com/maniax/work/=/product_id/${rjCode}.html`;
            return new Promise(
                (resolve, reject) => {
                    this.getHttp(url, resp => {
                        if (resp.readyState === 4 && resp.status === 200) {
                            const dom = new DOMParser().parseFromString(resp.responseText, "text/html");
                            const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                            workInfo.parentWork = DLsite.getParentWorkRjCode(resp.finalUrl);
                            workInfo.parentWork = workInfo.parentWork === rjCode ? null : workInfo.parentWork;
                            resolve(workInfo);
                        }
                        else if (resp.readyState === 4 && resp.status === 404) {
                            resolve(this.getAnnouncePromise(rjCode, DLsite.getParentWorkRjCode(resp.finalUrl)));
                        }
                    }, () => reject(null))
                }
            )
        },

        getApiPromise: function (rjCode){
            const url = `https://www.dlsite.com/maniax/product/info/ajax?product_id=${rjCode}&cdn_cache_min=1`
            const p1 = new Promise(
                (resolve, reject) => {
                    this.getHttp(url, resp => {
                        if (resp.readyState === 4 && resp.status === 200) {
                            const data = JSON.parse(resp.responseText);
                            if(Array.prototype.isPrototypeOf(data)){
                                resolve(data)
                            }
                            resolve(data[rjCode]);
                        }
                        else if (resp.readyState === 4 && resp.status === 404) {
                            reject(null);
                        }
                    })
                }
            )

            return p1.then(data => {
                if(Array.prototype.isPrototypeOf(data)){
                    return data;
                }

                const translation_info = data.translation_info ? data.translation_info : {};
                const lang = this.getLangCode(translation_info.lang);
                let next_rj = rjCode;
                let translator_name = undefined;
                if(translation_info.is_child) {
                    //找到父级RJ信息，因为子级信息不全面
                    next_rj = translation_info.parent_workno;

                    //子级可以先获取翻译者的信息
                    translator_name = data.maker_name;
                }

                const url = `https://www.dlsite.com/maniax/product/info/ajax?product_id=${next_rj}&cdn_cache_min=1` + (translation_info.is_original ? "" : `&locale=${lang}`);
                return new Promise(
                    (resolve, reject) => {
                        this.getHttp(url,
                            resp => {
                                if (resp.readyState === 4 && resp.status === 200) {
                                    const data = JSON.parse(resp.responseText);
                                    data[next_rj].maker_name = translator_name;
                                    resolve(data[next_rj]);
                                }
                                else if (resp.readyState === 4 && resp.status === 404) {
                                    reject(null);
                                }
                            })
                    }
                )
            }).then(data => {
                if(Array.prototype.isPrototypeOf(data)){
                    return null;
                }
                return this.parseApiData(rjCode, data)
            });
        },

        getCirclePromise: function (rjCode, apiPromise){
            return apiPromise.then(data => {
                if(!data.maker_id) return null;
                const maker_id = data.maker_id;
                const url = `https://media.ci-en.jp/dlsite/lookup/${maker_id}.json`;
                return new Promise(
                    (resolve, reject) => {
                        this.getHttp(url, resp => {
                            if (resp.readyState === 4 && resp.status === 200) {
                                const data = JSON.parse(resp.responseText);
                                data[0] = data[0] ? data[0] : {};
                                data[0].maker_id = maker_id;
                                resolve(data[0]);
                            }
                            else if (resp.readyState === 4 && resp.status === 404) {
                                reject(null);
                            }
                        })
                    }
                )
            }).then(data => {
                data = data ? data : {}
                return {
                    maker_id: data.maker_id,
                    id: data.id,
                    name: data.name,
                    rating: data.rating,
                }
            });
        },

        getWorkRequestPromise: function (rjCode) {
            let infoPromise = this.getHtmlPromise(rjCode);
            let apiPromise = this.getApiPromise(rjCode);
            let circlePromise = this.getCirclePromise(rjCode, apiPromise);
            return {
                info: infoPromise,
                api: apiPromise,
                circle: circlePromise
            }
        },

        getParentWorkRjCode: function (redirectUrl){
            const reg = new RegExp("(?<=product_id/)((R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6}))")
            return redirectUrl.match(reg)[0];
        }
    }

    const SettingsPopup = {
        css: `.${VOICELINK_CLASS}_settings{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 500px;
            height: 200px;
            margin: auto;
            background-color: white;
            z-index: 999;
 
            padding: 20px 20px;
            border-radius: 10px;
            border-style: solid;
            border-width: 1px;
            border-color: black;
        }
 
        .${VOICELINK_CLASS}_settings table{
            box-sizing: border-box;
            width: 100%;
            font-size: 16px;
            margin-bottom: 10px;
            border-collapse: collapse;
        }
 
        .${VOICELINK_CLASS}_settings table td{
            font-size: 16px;
            border: 1px solid lightgrey;
            padding: 5px;
            text-align: center;
        }
 
        .${VOICELINK_CLASS}_settings table td abbr{
            cursor: help;
        }
 
        .${VOICELINK_CLASS}_settings table td input[type=checkbox]{
            margin: 0;
            width: 20px;
            height: 20px;
        }
 
        .${VOICELINK_CLASS}_settings .${VOICELINK_CLASS}_label{
            text-align: left;
        }`,
        popup: null,
        createPopup: function(){
            SettingsPopup.popup = document.createElement("div")
            SettingsPopup.popup.className = `${VOICELINK_CLASS}_settings`

            let form = `
<table>
    <tbody>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_parse_url">解析URL (<abbr title="鼠标悬停到指向DLSite作品页面的URL时，同样显示作品信息">?</abbr>)</td>
            <td><input type="checkbox" id="${VOICELINK_CLASS}_parse_url_" name="parse_url" ${settings.parse_url ? "checked" : ""}/></td>
        </tr>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_use_in_dl">&nbsp┕在DLSite上启用URL解析 (<abbr title="URL较多可能影响正常阅读">?</abbr>)</td>
            <td><input type="checkbox" id="${VOICELINK_CLASS}_use_in_dl_" name="use_in_dl" ${settings.use_in_dl ? "checked" : ""}/></td>
        </tr>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_use_translated_title">在DLSite显示对应语言的翻译标题 (<abbr title="作品信息页面标题修改，会出现加载延迟">?</abbr>)</td>
            <td><input type="checkbox" id="${VOICELINK_CLASS}_use_translated_title_" name="use_translated_title" ${settings.use_translated_title ? "checked" : ""}/></td>
        </tr>
    </tbody>
</table>
<div style="box-sizing: border-box; text-align: right;">
    <input style="font-size: 16px" type="button" value="Cancel"/>
    <input style="font-size: 16px" type="button" value="Save"/>
</div>`
            SettingsPopup.popup.innerHTML = form

            //添加按钮事件
            let pp = SettingsPopup.popup
            pp.querySelector("input[type=button][value=Cancel]").addEventListener("click", function(){
                SettingsPopup.popup.style.display = "none"
            })
            pp.querySelector("input[type=button][value=Save]").addEventListener("click", function(){
                settings.parse_url = pp.querySelector(`#${VOICELINK_CLASS}_parse_url_`).checked
                settings.use_translated_title = pp.querySelector(`#${VOICELINK_CLASS}_use_translated_title_`).checked
                settings.use_in_dl = pp.querySelector(`#${VOICELINK_CLASS}_use_in_dl_`).checked
                settings.save()
                SettingsPopup.popup.style.display = "none"
            })

            document.body.appendChild(SettingsPopup.popup)
        },
        getPopup: function () {
            if(!SettingsPopup.popup){
                SettingsPopup.createPopup()
            }

            if(SettingsPopup.popup.style.display === "block"){
                SettingsPopup.popup.style.display = "none"
            }else{
                SettingsPopup.updateValues()
                SettingsPopup.popup.style.display = "block"
            }
        },
        updateValues: function(){
            let pp = SettingsPopup.popup
            pp.querySelector(`#${VOICELINK_CLASS}_parse_url_`).checked = settings.parse_url
            pp.querySelector(`#${VOICELINK_CLASS}_use_translated_title_`).checked = settings.use_translated_title
            pp.querySelector(`#${VOICELINK_CLASS}_use_in_dl_`).checked = settings.use_in_dl
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const style = document.createElement("style");
        style.innerHTML = Csp.createHTML(css + SettingsPopup.css);
        document.head.appendChild(style);
        // SettingsPopup.getPopup()
        GM_registerMenuCommand("Settings", SettingsPopup.getPopup)

        Parser.walkNodes(document.body);

        const observer = new MutationObserver(function (m) {
            for (let i = 0; i < m.length; ++i) {
                let addedNodes = m[i].addedNodes;

                for (let j = 0; j < addedNodes.length; ++j) {
                    Parser.walkNodes(addedNodes[j]);
                }
            }
        });

        document.addEventListener("securitypolicyviolation", function (e) {
            if (e.blockedURI.includes("img.dlsite.jp")) {
                const img = document.querySelector(`img[src="${e.blockedURI}"]`);
                img.remove();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true })
        setUserSelectTitle();

        //显示重要通知
        showUpdateNotice();
    });

    function showUpdateNotice(){
        const firstTimeToken = 101;
        if(GM_getValue("first_token", undefined) === firstTimeToken){
            return;
        }

        let popup = document.createElement("div");
        popup.style = `
        position: fixed;
        width: 500px;
        height: auto;
        margin: 20px auto;
        padding: 10px;
        left: 0;
        right: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.9);
        z-index: 999;
 
        border-radius: 10px;
        border: 2px solid gray`;
        popup.innerHTML = `
        <h1 style="text-indent: 0; color: black;">Notice from VoiceLinks</h1>
        <p style="font-size: 16px">本次更新后，可通过点击Tampermonkey的扩展程序图标，找到VoiceLinks脚本的设置按钮进行部分设置。</p>
        <p style="font-size: 14px; font-style: italic">Users now can find a setting button for the "VoiceLinks" script by clicking on the Tampermonkey extension icon.</p>
        <p> </p>
        <p style="font-size: 14px; line-height: 20px">主要更新：
        <br/>- 使用单一弹框，避免单页面生成过多弹框对象等问题。
        <br/>- 添加设置页面。
        <br/>- 添加URL解析，悬停至作品URL上也可显示信息（可在设置中开关）。
        <br/>- DLSite作品信息界面，作品名称将会显示为对应语言的标题（可在设置中开关）。
        <br/>- 原版作品弹框标题本地化。
        <br/>- 部分CSP限制页面也可进行解析。
        </p>
        <br/>
        <input style="font-size: 16px; text-align: center; width: 100%; padding: 5px 10px" type="button" value="OK">
        `
        popup.querySelector("input[type=button][value=OK]").addEventListener("click", function(){
            popup.style.display = "none";
            GM_setValue("first_token", firstTimeToken);
        })

        document.body.appendChild(popup);
    }



    //Deal with Trusted Types

    let Csp = {
        createHTML: (str) => str
    };
    if(window.isSecureContext === true && trustedTypes){
        Csp = trustedTypes.createPolicy(
            trustedTypes.defaultPolicy ? "VoiceLinkTrustedTypes" : "default",
            Csp);
    }
})();
