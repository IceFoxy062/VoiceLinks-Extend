// ==UserScript==
// @name        VoiceLinks
// @namespace   Sanya
// @description Makes RJ codes more useful.(8-bit RJCode supported.)
// @include     *://*/*
// @version     3.0.1
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
        _s_parse_url: GM_getValue("parse_url", true),

        /***是否在DLSite相关网站显示音声信息（开启链接解析才可在DL上有效使用）***/
        _s_use_in_dl: GM_getValue("use_in_dl", false),

        /***DLSite网页是否显示大家翻对应语言的翻译版标题（默认是）***/
        _s_use_translated_title: GM_getValue("use_translated_title", true),

        /***为了防止URL被整个解析覆盖，会在链接开头（1）或末尾（2）添加额外文本***/
        _s_url_insert: GM_getValue("url_insert", "before_rj_with_coverage"),

        /***自定义url插入文本***/
        _s_url_insert_text: GM_getValue("url_insert_text", "🔗"),

        save: function () {
            for(let key in settings){
                if(!key.startsWith("_s_")) continue;
                GM_setValue(key.substring(3), settings[key]);
            }
        },
        load: function () {
            for(let key in settings){
                if(!key.startsWith("_s_")) continue;
                settings[key] = GM_getValue(key.substring(3), settings[key]);
            }
        }
    }
    //----------------------


    const RJ_REGEX = new RegExp("(R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6})", "gi");
    const URL_REGEX = new RegExp("dlsite.com/.*/product_id/((R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6}))", "g");
    const VOICELINK_CLASS = 'voicelink';
    const VOICELINK_IGNORED_CLASS = `${VOICELINK_CLASS}_ignored`;
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
          text-decoration: none !important;
          color: pink !important;
      }
      
      .voicepopup .age-18{
          color: hsl(300deg 76% 77%) !important;
      }
      
      .voicepopup .age-all{
          color: hsl(157deg 82% 52%) !important;
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

        if(settings._s_use_translated_title){
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
                        if(node.parentElement.classList.contains(VOICELINK_IGNORED_CLASS)){
                            return NodeFilter.FILTER_SKIP;
                        }

                        if(settings._s_parse_url && node.nodeName === "A"){
                            if(!settings._s_use_in_dl && document.location.hostname.endsWith("dlsite.com")){
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

                if (node.parentElement.classList.contains(VOICELINK_CLASS)) {
                    Parser.rebindEvents(node.parentElement);
                }else if(node.nodeName === "A") {
                    // alert("准备解析链接：" + node.nodeValue)
                    Parser.linkifyURL(node);
                }else{
                    // alert("准备解析文本：" + node.nodeValue)
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

        calculateCoverage: function(text){
            const matches = text.match(RJ_REGEX);
            //覆盖大小 = 所有匹配项的长度总和
            const coverSize = matches.reduce((total, current) => total + current.length, 0);
            return (coverSize / text.length) * 100;
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

            // alert(`解析链接：${e.nodeValue}`)

            e.classList.add(VOICELINK_CLASS);
            e.setAttribute(RJCODE_ATTRIBUTE, rj.toUpperCase());
            e.addEventListener("mouseover", Popup.over);
            e.addEventListener("mouseout", Popup.out);
            e.addEventListener("mousemove", Popup.move);
        },

        linkify: function (textNode) {
            const nodeOriginalText = textNode.nodeValue;
            const matches = [];

            let insert = settings._s_url_insert;
            let tagA = textNode.parentElement.closest("a");
            if(!tagA || insert.includes("_with_coverage") && this.calculateCoverage(tagA.innerText) < 71){
                insert = "none";
            }

            let match;
            while (match = RJ_REGEX.exec(nodeOriginalText)) {
                matches.push({
                    index: match.index,
                    value: match[0],
                });
            }
            if(matches.length === 0) return;

            // alert(`解析文本：${textNode.nodeValue}`)

            // Keep text in text node until first RJ code
            textNode.nodeValue = nodeOriginalText.substring(0, matches[0].index);
            if(insert.startsWith("prefix")){
                //加前缀
                textNode.nodeValue = `${settings._s_url_insert_text}${textNode.nodeValue}`
            }

            // Insert rest of text while linkifying RJ codes
            let prevNode = null;
            for (let i = 0; i < matches.length; ++i) {
                // Insert linkified RJ code
                let code = matches[i].value
                const rjLinkNode = Parser.wrapRJCode(code);
                if(insert.startsWith("before_rj")){
                    //用导向文本替代RJ号链接，RJ号保留到后面的文本里不变
                    rjLinkNode.innerHTML = settings._s_url_insert_text;
                }
                textNode.parentNode.insertBefore(
                    rjLinkNode,
                    prevNode ? prevNode.nextSibling : textNode.nextSibling,
                );

                // Insert text after if there is any
                //找到当前RJ和下一个RJ之间的字符串
                let nextRJ = undefined;
                if (i < matches.length - 1) {
                    nextRJ = matches[i + 1].index;
                }
                let substring = nodeOriginalText.substring(matches[i].index + (insert.startsWith("before_rj") ? 0 : matches[i].value.length), nextRJ);

                if (substring) {
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

            //保证后续游走时忽略当前节点
            textNode.parentElement.classList.add(VOICELINK_IGNORED_CLASS);
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

    const DateParser = {
        parseDateStr: function(dateStr, lang){
            dateStr = dateStr.trim().replace(/ /g, "");
            lang = lang.trim().toLowerCase().replace(/_/g, "-");
            let nums = this.parseNumbers(dateStr);
            if(!nums || nums.length < 3 && lang !== "en-us" || nums.length < 2 && lang === "en-us"){
                //数字不够，无法解析
                return null;
            }

            let parsers = [
                this.parseAsiaDateStr,
                this.parseEnglishDateStr,
                this.parseEuropeanDateStr,
                this.parseSpanishDateStr
            ]
            let date = null;
            for (let i = 0; i < parsers.length; i++){
                date = parsers[i](dateStr, nums, lang);
                if(date){
                    break;
                }
            }

            return date;
        },
        parseNumbers: function (dateStr){
            let nums = dateStr.match(/\d+/g);
            if(!nums) return null;

            for (let i = 0; i < nums.length; i++) {
                nums[i] = Number(nums[i]);
            }
            return nums;
        },
        parseAsiaDateStr: function(dateStr, nums, lang){
            //2024年10月05日
            //2024년 10월 05일（已去除空格）
            if (!dateStr.match(/\d{4}年\d{1,2}月\d{1,2}日/)
                && !dateStr.match(/\d{4}년\d{1,2}월\d{1,2}일/)) {
                return null;
            }
            return new Date(nums[0], nums[1] - 1, nums[2]);
        },
        parseEnglishDateStr: function(dateStr, nums, lang){
            //Oct/05/2024
            if(!dateStr.match(/[a-zA-Z]{3}\/\d{1,2}\/\d{4}/)){
                return null;
            }
            const monthMap = {
                "Jan": 0, "Feb": 1, "Mar": 2,
                "Apr": 3, "May": 4, "Jun": 5,
                "Jul": 6, "Aug": 7, "Sep": 8,
                "Oct": 9, "Nov": 10, "Dec": 11
            }
            let monthStr = dateStr.substring(0, dateStr.indexOf("/")).toLowerCase();
            monthStr = monthStr[0].toUpperCase() + monthStr.substring(1);
            return new Date(nums[1], monthMap[monthStr], nums[0])
        },
        parseSpanishDateStr: function (dateStr, nums, lang) {
            //10/05/2024
            if(lang !== "es-es" || !dateStr.match(/\d{1,2}\/\d{1,2}\/\d{4}/)){
                return null;
            }
            return new Date(nums[2], nums[0] - 1, nums[1]);
        },
        parseEuropeanDateStr: function (dateStr, nums, lang) {
            //05/10/2024
            if(lang === "es-es" || !dateStr.match(/\d{1,2}\/\d{1,2}\/\d{4}/)){
                return null;
            }
            return new Date(nums[2], nums[1] - 1, nums[0]);
        },
        /***
         获得带倒计时的文本HTML
         @param date {Date}
         ***/
        getCountDownDateText: function(date){
            if(!date) return "";

            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            if(date.getTime() < today.getTime()) return "";
            let days = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
            return `<span style="color:#ffeb3b; font-size: 16px; font-style: italic; margin-left: 16px">(Coming in ${days} day${(days > 1 ? "s" : "")})</span>`
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
            infoContainer.style.flexGrow = "1";
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
            WorkPromise.getFound(rjCode).then(async found => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;

                if(found){
                    //找到则直接返回交给下一级处理
                    return {found: true, parentRJ: rjCode};
                }

                //没找到则尝试找到父作品的RJ号，填补子作品信息的缺失
                let parentRJ = await WorkPromise.getParentRJ(rjCode);
                if(parentRJ === rjCode || !parentRJ) {
                    return {found: false, parentRJ: rjCode};
                }
                found = await WorkPromise.getFound(parentRJ);
                return {found: found, parentRJ: parentRJ};

            }).then((state) => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;

                const found = state.found;
                const rj = state.parentRJ;
                if(found && rj !== rjCode){
                    //如果找到了父作品的信息但子作品找不到，就重新update
                    Popup.updatePopup(e, rj, true);
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
            WorkPromise.getWorkPromise(rjCode).api.then(async data => {
                if(rjCode !== popup.getAttribute(RJCODE_ATTRIBUTE)) return;

                let info = await WorkPromise.getWorkPromise(rjCode).info;
                if(data.is_special){
                    //特典作品
                    flagElement.innerHTML = `<span style="color: gold; font-size: 15px; align-self: center; font-weight: bold">[BONUS]</span>`;
                }
                else if(!data.is_sale && !info.is_announce) {
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
                return data !== null && data.is_sale !== undefined;
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
                const info = await this.getWorkPromise(rjCode).info;
                this.checkNotNull(info.img);
                return info.img;
            }catch (e) {
                const apiData = await this.getWorkPromise(rjCode).api;
                if(apiData.img_url) return "https://" + apiData.img_url;
            }
            throw new Error("无法获取图片链接");
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
            const api = await work.api;
            let info = await work.info;

            if(info.circleId && info.circle && info.circleId !== "RG60289"){
                //RG魔法值为大家翻的RG号
                return info.circle;
            }

            if(api.maker_id !== "RG60289"){
                //如果社团不是大家翻，但作品已经下架导致html无法解析，则通过circle接口获取社团名
                const circleInfo = await work.circle;
                this.checkNotNull(circleInfo);
                this.checkNotNull(circleInfo.name);
                return circleInfo.name;
            }

            //匹配原版社团名，而不是大家翻
            this.checkNotNull(api.original_rj);
            work = this.getWorkPromise(api.original_rj)

            //优先匹配html的（因为circle接口不一定能获取到社团信息）
            info = await work.info;
            if(info.circle) return info.circle;

            //若作品已下架导致html无法解析，则通过circle接口获取社团名
            let circle = await work.circle;
            this.checkNotNull(circle.name);
            return circle.name;
        },

        getTranslatorName: async function(rjCode){
            const api = await this.getWorkPromise(rjCode).api;
            this.checkNotNull(api.maker_name);
            return api.maker_name;
        },

        getReleaseDate: async function(rjCode){
            const info = await this.getWorkPromise(rjCode).info;
            if(info && !info.is_announce && info.date) return info.date;
            if(info && info.is_announce && info.dateAnnounce) {
                return `<span style="color: gold">${info.dateAnnounce}</span>${DateParser.getCountDownDateText(DateParser.parseDateStr(info.dateAnnounce, info.lang))}`
            }

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

            let metaList = dom.getElementsByTagName("meta")
            for (let i = 0; i < metaList.length; i++){
                let meta = metaList[i];
                if(meta.getAttribute("property") === 'og:image'){
                    workInfo.img = meta.content;
                    break;
                }
            }

            workInfo.lang = dom.querySelector("html").getAttribute("lang");
            workInfo.title = dom.getElementById("work_name").innerText;
            workInfo.circle = dom.querySelector("span.maker_name").innerText;
            workInfo.circleId = dom.querySelector("#work_maker a").href;
            workInfo.circleId = workInfo.circleId.substring(workInfo.circleId.lastIndexOf("/") + 1, workInfo.circleId.lastIndexOf(".")).trim();

            const table_outline = dom.querySelector("table#work_outline");
            for (let i = 0, ii = table_outline.rows.length; i < ii; i++) {
                const row = table_outline.rows[i];
                const row_header = row.cells[0].innerText.trim();
                const row_data = row.cells[1];
                const lambda = text => row_header === text;
                switch (true) {
                    case (["販売日", "贩卖日", "販賣日", "Release date", "판매일", "Lanzamiento", "Veröffentlicht",
                        "Date de sortie", "Tanggal rilis", "Data di rilascio", "Lançamento", "Utgivningsdatum",
                        "วันที่ขาย", "Ngày phát hành"].some(lambda)):
                        workInfo.date = row_data.innerText;
                        break;
                    case (["更新情報", "更新信息", "更新資訊", "Update information", "갱신 정보", "Actualizar información",
                        "Aktualisierungen", "Mise à jour des informations", "Perbarui informasi", "Aggiorna informazioni",
                        "Atualizar informações", "Uppdatera information", "ข้อมูลอัปเดต", "Thông tin cập nhật"].some(lambda)):
                        workInfo.update = row_data.firstChild.data;
                        break;
                    case (["年齢指定", "年龄指定", "年齡指定", "Age", "연령 지정", "Edad", "Altersfreigabe", "Âge", "Batas usia",
                        "Età", "Idade", "Ålder", "การกำหนดอายุ", "Độ tuổi chỉ định"].some(lambda)):
                        workInfo.rating = row_data.innerText;
                        break;
                    case (["ジャンル", "分类", "分類", "Genre", "장르", "Género", "Genre", "Genre", "Genre", "Genere", "Gênero",
                        "Genre", "ประเภท", "Thể loại"].some(lambda)):
                        const tag_nodes = row_data.querySelectorAll("a");
                        workInfo.tags = [...tag_nodes].map(a => { return a.innerText });
                        break;
                    case (["声優", "声优", "聲優", "Voice Actor", "성우", "Doblador", "Synchronsprecher", "Doubleur",
                        "Pengisi suara", "Doppiatore/Doppiatrice", "Ator de voz", "Röstskådespelare", "นักพากย์",
                        "Diễn viên lồng tiếng"].some(lambda)):
                        workInfo.cv = row_data.innerText;
                        break;
                    case (["ファイル容量", "文件容量", "檔案容量", "File size", "파일 용량", "Tamaño del Archivo", "Dateigröße",
                        "Taille du fichier", "Ukuran file", "Dimensione del file", "Tamanho do arquivo", "Filstorlek",
                        "ขนาดไฟล์", "Dung lượng tệp"].some(lambda)):
                        workInfo.filesize = row_data.innerText.trim();
                        break;
                    default:
                        break;
                }
            }

            //获取发售预告时间
            const work_date_ana = dom.querySelector("strong.work_date_ana");
            if (work_date_ana) {
                workInfo.dateAnnounce = work_date_ana.innerText;
                //workInfo.img = "https://img.dlsite.jp/modpub/images2/ana/doujin/" + rj_group + "/" + rj + "_ana_img_main.jpg"
            }

            return workInfo;
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
                }
            }
            return apiData;
        },

        getHttpAsync: async function (url){
            return new Promise((resolve, reject) => {
                getXmlHttpRequest()({
                    method: "GET",
                    url,
                    headers: {
                        "Accept": "text/xml",
                        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0)"
                    },
                    onload: resolve,
                    onerror: reject
                });
            })
        },

        getAnnouncePromise: async function (rjCode, parentRJ) {
            const url = `https://www.dlsite.com/maniax/announce/=/product_id/${rjCode}.html`;
            let resp = await this.getHttpAsync(url);
            if (resp.readyState === 4 && resp.status === 200) {
                const dom = new DOMParser().parseFromString(resp.responseText, "text/html");
                const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                workInfo.parentWork = parentRJ === rjCode ? null : parentRJ;
                workInfo.is_announce = true;
                return workInfo;
            }
            else if (resp.readyState === 4 && resp.status === 404) {
                return {
                    parentWork: parentRJ === rjCode ? null : parentRJ,
                    is_announce: false
                };
            }

        },

        getHtmlPromise: async function (rjCode) {
            const url = `https://www.dlsite.com/maniax/work/=/product_id/${rjCode}.html`;
            let resp = await this.getHttpAsync(url);
            if (resp.readyState === 4 && resp.status === 200) {
                const dom = new DOMParser().parseFromString(resp.responseText, "text/html");
                const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                workInfo.parentWork = DLsite.getParentWorkRjCode(resp.finalUrl);
                workInfo.parentWork = workInfo.parentWork === rjCode ? null : workInfo.parentWork;
                workInfo.is_announce = false;
                return workInfo;
            }
            else if (resp.readyState === 4 && resp.status === 404) {
                return await this.getAnnouncePromise(rjCode, DLsite.getParentWorkRjCode(resp.finalUrl));
            }
        },

        getApiPromise: async function (rjCode){
            let url = `https://www.dlsite.com/maniax/product/info/ajax?product_id=${rjCode}&cdn_cache_min=1`
            let p = this.getHttpAsync(url);
            let resp = await p;
            let data = undefined;
            if (resp.readyState === 4 && resp.status === 200) {
                data = JSON.parse(resp.responseText);
                data = data ? data[rjCode] : {};
                data = data ? data : {}
            }
            else if (resp.readyState === 4 && resp.status === 404) {
                return {};
            }
            else {
                throw new Error(`无法通过API获取${rjCode}的信息：${resp.status} ${resp.statusText}`);
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

            //第二次请求，获取对应语言下的实际信息
            url = `https://www.dlsite.com/maniax/product/info/ajax?product_id=${next_rj}&cdn_cache_min=1` + (translation_info.is_original ? "" : `&locale=${lang}`);
            p = this.getHttpAsync(url);
            resp = await p;
            if (resp.readyState === 4 && resp.status === 200) {
                data = JSON.parse(resp.responseText);
                data = data ? data[next_rj] : {};
                data = data ? data : {};
                data.maker_name = translator_name;
            }
            else if(resp.readyState === 4 && resp.status === 404){
                return {};
            }
            else {
                throw new Error(`无法通过API获取${rjCode}的信息：${resp.status} ${resp.statusText}`);
            }

            return this.parseApiData(rjCode, data);
        },

        getCirclePromise: async function (rjCode, apiPromise){
            let apiData = await apiPromise;
            if(!apiData.maker_id) return null;
            const maker_id = apiData.maker_id;

            let url = undefined;
            let resp = undefined;
            let data = undefined;
            try {
                url = `https://media.ci-en.jp/dlsite/lookup/${maker_id}.json`;
                resp = await this.getHttpAsync(url);
                data = undefined;
                if (resp.readyState === 4 && resp.status === 200) {
                    data = JSON.parse(resp.responseText);
                    data = data ? data[0] : {};
                    data = data ? data : {};
                    data.maker_id = maker_id;
                }
            }catch (e){}

            if(!data || !data.name){
                //未获取到社团名称则使用html解析获取
                url = `https://www.dlsite.com/maniax/circle/profile/=/maker_id/${maker_id}.html`;
                resp = await this.getHttpAsync(url);
                data = data ? data : {};
                if(resp.readyState === 4 && resp.status === 200){
                    let doc = new DOMParser().parseFromString(resp.responseText, "text/html");
                    let name = doc.querySelector("strong.prof_maker_name");
                    name = name ? name.innerText : null;
                    data.name = name;
                }
            }

            return {
                maker_id: data.maker_id,
                id: data.id,
                name: data.name,
                rating: data.rating,
            }
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
            width: 60%;
            max-width: 600px;
            height: auto;
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
            font-size: 16px !important;
            border: 1px solid lightgrey !important;
            padding: 5px !important;
            text-align: center !important;
            display: table-cell !important;
            vertical-align: middle !important;
        }
        
        .${VOICELINK_CLASS}_settings table td abbr{
            cursor: help;
        }
        
        .${VOICELINK_CLASS}_settings table td input[type=checkbox]{
            margin: 0 !important;
            width: 20px !important;
            height: 20px !important;
        }
        
        .${VOICELINK_CLASS}_settings .${VOICELINK_CLASS}_label{
            text-align: left !important;
        }
        
        .voicelink_settings div input[type=button] {
            margin: 0 !important;
            width: 100px !important;
            height: 30px !important;
            font-size: 16px !important;
            margin-top: 10px !important;
            margin-left: 5px !important;
            border: gray solid 1px !important;
            border-radius: 4px !important;
            cursor: default !important;
        }
        
        .voicelink_settings div input[type=button]:active {
            background-color: lightgray !important;
        }
        
        `,
        popup: null,
        createPopup: function(){
            SettingsPopup.popup = document.createElement("div")
            SettingsPopup.popup.className = `${VOICELINK_CLASS}_settings`

            let form = `
<table>
    <tbody>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_parse_url">解析URL (<abbr title="鼠标悬停到指向DLSite作品页面的URL时，同样显示作品信息">?</abbr>)</td>
            <td><input type="checkbox" id="${VOICELINK_CLASS}_parse_url_" name="parse_url" ${settings._s_parse_url ? "checked" : ""}/></td>
        </tr>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_use_in_dl">&nbsp┕在DLSite上启用URL解析 (<abbr title="URL较多可能影响正常阅读">?</abbr>)</td>
            <td><input type="checkbox" id="${VOICELINK_CLASS}_use_in_dl_" name="use_in_dl" ${settings._s_use_in_dl ? "checked" : ""}/></td>
        </tr>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_use_translated_title">在DLSite显示对应语言的翻译标题 (<abbr title="作品信息页面标题修改，会出现加载延迟">?</abbr>)</td>
            <td><input type="checkbox" id="${VOICELINK_CLASS}_use_translated_title_" name="use_translated_title" ${settings._s_use_translated_title ? "checked" : ""}/></td>
        </tr>
        <tr>
            <td class="${VOICELINK_CLASS}_label" id="${VOICELINK_CLASS}_use_translated_title">URL插入原链接导向文本 (<abbr title="如果链接被解析成功，为保证原链接不被完全覆盖，会在URL中的文本前/后插入特定导向文本">?</abbr>)</td>
            <td>
                <select id="${VOICELINK_CLASS}_url_insert_">
                    <option value="none" ${settings._s_url_insert === "none" ? "selected" : ""}>不插入</option>
                    <option value="prefix_with_coverage" ${settings._s_url_insert === "prefix_with_coverage" ? "selected" : ""}>高覆盖时前缀插入</option>
                    <option value="before_rj_with_coverage" ${settings._s_url_insert === "before_rj_with_coverage" ? "selected" : ""}>高覆盖时插入代替RJ号链接</option>
                </select>
            </td>
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
                settings._s_parse_url = pp.querySelector(`#${VOICELINK_CLASS}_parse_url_`).checked;
                settings._s_use_translated_title = pp.querySelector(`#${VOICELINK_CLASS}_use_translated_title_`).checked;
                settings._s_use_in_dl = pp.querySelector(`#${VOICELINK_CLASS}_use_in_dl_`).checked;
                settings._s_url_insert = pp.querySelector(`#${VOICELINK_CLASS}_url_insert_`).value;
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
            pp.querySelector(`#${VOICELINK_CLASS}_parse_url_`).checked = settings._s_parse_url
            pp.querySelector(`#${VOICELINK_CLASS}_use_translated_title_`).checked = settings._s_use_translated_title
            pp.querySelector(`#${VOICELINK_CLASS}_use_in_dl_`).checked = settings._s_use_in_dl
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const style = document.createElement("style");
        style.innerHTML = Csp.createHTML(css + SettingsPopup.css);
        document.head.appendChild(style);
        // SettingsPopup.getPopup()
        GM_registerMenuCommand("Settings", SettingsPopup.getPopup)
        GM_registerMenuCommand("Notice", () => showUpdateNotice(true))

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

    function showUpdateNotice(force = false) {
        const firstTimeToken = 103;
        if(GM_getValue("first_token", undefined) === firstTimeToken && !force){
            return;
        }

        let popup = document.createElement("div");
        popup.style = `
        position: fixed; 
        width: 60%;
        max-width: 800px; 
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
        <p style="font-size: 16px">可通过点击Tampermonkey的扩展程序图标，找到VoiceLinks脚本的设置按钮进行部分设置。</p>
        <p style="font-size: 14px; font-style: italic">Users now can find a setting button for the "VoiceLinks" script by clicking on the Tampermonkey extension icon.</p>
        <p> </p>
        <p style="font-size: 14px; line-height: 20px">主要更新：
        <br/>- 现在，当链接文本绝大部分都是RJ号时，为了保证原链接不被覆盖，添加了URL导向文本插入功能，可在设置中进行选择。
        <br/>- - 选择<strong>不插入</strong>，所有内容将保持不变。
        <br/>- - 选择<strong>前缀插入</strong>，就会在RJ号覆盖率较高时（>71%)，<strong>在链接文本前面插入导向文本</strong>（默认为🔗，以后可通过设置修改）
        <br/>- - 选择<strong>插入替代RJ号链接</strong>，就会在覆盖率较高时，<strong>将RJ号原有的功能</strong>（悬停弹出信息，点击进入DL作品页面）<strong>放在导向文本上</strong>，导向文本将会放在RJ号的前面。此时点击RJ号也会跳转到原有的链接，而不是DL页面。
        </p>
        <br/>
        <input style="font-size: 16px; text-align: center; width: 100%; padding: 5px 10px" type="button" value="OK">
        `
        popup.querySelector("input[type=button][value=OK]").addEventListener("click", function(){
            popup.remove();
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
