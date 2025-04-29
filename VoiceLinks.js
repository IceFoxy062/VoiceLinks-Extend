// ==UserScript==
// @name        VoiceLinks
// @namespace   Sanya
// @description Makes RJ codes more useful.(8-bit RJCode supported.)
// @match       *://*/*
// @match       file:///*
// @version     p-4.9.0
// @connect     dlsite.com
// @connect     media.ci-en.jp
// @connect     *
// @grant       GM_setClipboard
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_addElement
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// @homepage    https://sleazyfork.org/zh-CN/scripts/456775-voicelinks
// @downloadURL https://update.sleazyfork.org/scripts/456775/VoiceLinks.user.js
// @updateURL   https://update.sleazyfork.org/scripts/456775/VoiceLinks.meta.js
// ==/UserScript==

(function () {
    'use strict';

    const IS_PREVIEW = false;

    //region 持久化设置项
    let settings = {
        //语言设置
        _s_lang: "zh_CN",
        _s_popup_lang: "zh_CN",

        //常规设置
        _s_parse_url: true,
        _s_parse_url_in_dl: false,
        _s_show_translated_title_in_dl: true,
        _s_copy_as_filename_btn: true,
        _s_show_compatibility_warning: true,
        _s_url_insert_mode: "before_rj",
        _s_url_insert_text: "🔗",
        _s_sfw_mode: false,
        _s_sfw_blur_level: "medium",
        _s_sfw_remove_when_hover: true,
        _s_sfw_blur_transition: true,

        //信息显示设置
        _s_category_preset: "voice",
        _s_voice__info_display_order: [
            "voice__dl_count",
            "voice__circle_name",
            "voice__translator_name",
            "voice__release_date",
            "voice__update_date",
            "voice__age_rating",
            "voice__scenario",
            "voice__illustration",
            "voice__voice_actor",
            "voice__music",
            "voice__genre",
            "voice__file_size"
        ],
        _s_voice__dl_count: false,
        _s_voice__circle_name: true,
        _s_voice__translator_name: true,
        _s_voice__release_date: true,
        _s_voice__update_date: true,
        _s_voice__age_rating: true,
        _s_voice__scenario: false,
        _s_voice__illustration: false,
        _s_voice__voice_actor: true,
        _s_voice__music: true,
        _s_voice__genre: true,
        _s_voice__file_size: true,
        _s_game__info_display_order: [
            "game__dl_count",
            "game__circle_name",
            "game__translator_name",
            "game__release_date",
            "game__update_date",
            "game__age_rating",
            "game__scenario",
            "game__illustration",
            "game__voice_actor",
            "game__music",
            "game__genre",
            "game__file_size"
        ],
        _s_game__dl_count: false,
        _s_game__circle_name: true,
        _s_game__translator_name: true,
        _s_game__release_date: true,
        _s_game__update_date: true,
        _s_game__age_rating: true,
        _s_game__scenario: true,
        _s_game__illustration: true,
        _s_game__voice_actor: true,
        _s_game__music: true,
        _s_game__genre: true,
        _s_game__file_size: true,
        _s_manga__info_display_order:[
            "manga__dl_count",
            "manga__circle_name",
            "manga__translator_name",
            "manga__release_date",
            "manga__update_date",
            "manga__age_rating",
            "manga__scenario",
            "manga__illustration",
            "manga__voice_actor",
            "manga__music",
            "manga__genre",
            "manga__file_size"
        ],
        _s_manga__dl_count: false,
        _s_manga__circle_name: true,
        _s_manga__translator_name: true,
        _s_manga__release_date: true,
        _s_manga__update_date: true,
        _s_manga__age_rating: true,
        _s_manga__scenario: true,
        _s_manga__illustration: true,
        _s_manga__voice_actor: true,  //音声漫画
        _s_manga__music: true,
        _s_manga__genre: true,
        _s_manga__file_size: true,
        _s_video__info_display_order: [
            "video__dl_count",
            "video__circle_name",
            "video__translator_name",
            "video__release_date",
            "video__update_date",
            "video__age_rating",
            "video__scenario",
            "video__illustration",
            "video__voice_actor",
            "video__music",
            "video__genre",
            "video__file_size"
        ],
        _s_video__dl_count: false,
        _s_video__circle_name: true,
        _s_video__translator_name: true,
        _s_video__release_date: true,
        _s_video__update_date: true,
        _s_video__age_rating: true,
        _s_video__scenario: true,
        _s_video__illustration: true,
        _s_video__voice_actor: true,
        _s_video__music: true,
        _s_video__genre: true,
        _s_video__file_size: true,
        _s_novel__info_display_order: [
            "novel__dl_count",
            "novel__circle_name",
            "novel__translator_name",
            "novel__release_date",
            "novel__update_date",
            "novel__age_rating",
            "novel__scenario",
            "novel__illustration",
            "novel__voice_actor",
            "novel__music",
            "novel__genre",
            "novel__file_size"
        ],
        _s_novel__dl_count: false,
        _s_novel__circle_name: true,
        _s_novel__translator_name: true,
        _s_novel__release_date: true,
        _s_novel__update_date: true,
        _s_novel__age_rating: true,
        _s_novel__scenario: true,
        _s_novel__illustration: true,
        _s_novel__voice_actor: false,
        _s_novel__music: false,
        _s_novel__genre: true,
        _s_novel__file_size: true,
        _s_other__info_display_order: [
            "other__dl_count",
            "other__circle_name",
            "other__translator_name",
            "other__release_date",
            "other__update_date",
            "other__age_rating",
            "other__scenario",
            "other__illustration",
            "other__voice_actor",
            "other__music",
            "other__genre",
            "other__file_size"
        ],
        _s_other__dl_count: false,
        _s_other__circle_name: true,
        _s_other__translator_name: true,
        _s_other__release_date: true,
        _s_other__update_date: true,
        _s_other__age_rating: true,
        _s_other__scenario: true,
        _s_other__illustration: true,
        _s_other__voice_actor: true,
        _s_other__music: true,
        _s_other__genre: true,
        _s_other__file_size: true,

        //标签显示设置
        _s_tag_main_switch: true,
        _s_tag_display_order: [
            "tag_no_longer_available",
            "tag_rate",
            "tag_work_type",
            "tag_translatable",
            "tag_not_translatable",
            "tag_translated",
            "tag_bonus_work",
            "tag_has_bonus",
            "tag_language_support",
            "tag_file_format",
            "tag_ai",
        ],
        _s_tag_rate: true,
        _s_tag_work_type: true,
        _s_tag_translatable: true,
        _s_tag_not_translatable: true,
        _s_tag_translated: true,
        _s_tag_language_support: true,
        _s_tag_bonus_work: true,
        _s_tag_has_bonus: true,
        _s_tag_file_format: false,
        _s_tag_no_longer_available: true,
        _s_tag_ai: true,

        _s_show_rate_count: false,

        _s_tag_translation_request: true,
        _s_tag_translation_request_display_order: [
            "tag_translation_request_simplified_chinese",
            "tag_translation_request_traditional_chinese",
            "tag_translation_request_english",
            "tag_translation_request_korean",
            "tag_translation_request_spanish",
            "tag_translation_request_german",
            "tag_translation_request_french",
            "tag_translation_request_indonesian",
            "tag_translation_request_italian",
            "tag_translation_request_portuguese",
            "tag_translation_request_swedish",
            "tag_translation_request_thai",
            "tag_translation_request_vietnamese",
        ],
        _s_tag_translation_request_english: false,
        _s_tag_translation_request_simplified_chinese: true,
        _s_tag_translation_request_traditional_chinese: true,
        _s_tag_translation_request_korean: false,
        _s_tag_translation_request_spanish: false,
        _s_tag_translation_request_german: false,
        _s_tag_translation_request_french: false,
        _s_tag_translation_request_indonesian: false,
        _s_tag_translation_request_italian: false,
        _s_tag_translation_request_portuguese: false,
        _s_tag_translation_request_swedish: false,
        _s_tag_translation_request_thai: false,
        _s_tag_translation_request_vietnamese: false,

        //搜索相关
        _s_base_search: false,
        _s_search_url_pattern: "",
        _s_show_url_pattern: "",
        _s_search_url_headers: "",
        _s_cue_languages: "CHI_HANS CHI_HANT",
        _ss_search_profiles: [],
        _ss_cue_lang: ["CHI_HANS", "CHI_HANT"],  //限制关联搜索的语言范围，每多一种语言意味着多一次查询请求
        _s_full_linkage: true,  //开启后，会从DLSite上获取作品的所有关联情况。关闭则会尽力在不进行额外请求的情况下，找到部分作品关联。
        _s_search_linkage: true,  //开启后，会到仓库中查找所有关联作品，可能会产生多次网络请求（如果你的仓库搜索自带该功能，开启此项也不会严重影响速度）。

        backup: function() {
            let backup = {};
            for (let key in this) {
                if(!key.startsWith("_s_")) continue;
                //如果类型为列表，则需要将其拷贝出来
                if(this[key] && Array.isArray(this[key])){
                    backup[key] = [...this[key]];
                }else{
                    backup[key] = this[key];
                }
            }
            this.default_backup = backup;
        },

        //备份默认值
        default_backup: {},

        //暂存已修改值，不更新到设置
        temp_edited: {},

        load: function(){
            let need_reorder = false;
            for(let key in this){
                if(!key.startsWith("_s_")) continue;
                let val = GM_getValue(key.substring(3), this[key]);
                if(typeof val !== typeof this[key]){
                    val = this[key];
                }
                if(Array.isArray(val) && val.length !== this[key].length){
                    val = this[key];
                    need_reorder = true;
                }
                this[key] = val !== undefined ? val : this[key];
            }

            if(need_reorder) {
                window.addEventListener("load", () => {
                    window.alert("VoiceLinks: " + localize(localizationMap.need_reorder));
                });
                this.save();
            }
        },

        save: function () {
            //将暂存修改应用至Settings
            for (let key in this.temp_edited) {
                if(!key.startsWith("_s_")) continue;
                if(this[key] === undefined || this.temp_edited[key] === undefined) continue;
                this[key] = this.temp_edited[key];
                this.temp_edited[key] = undefined;
            }

            //将修改保存至GM
            for(let key in this){
                if(!key.startsWith("_s_")) continue;
                GM_setValue(key.substring(3), this[key]);
            }
        },

        //保存临时修改
        saveTemp: function (key, value){
            if(!key.startsWith("_s_")) key = "_s_" + key;
            this.temp_edited[key] = value;
        },

        clearTemp: function (){
            this.temp_edited = {};
        },

        reset: function () {
            if(!this.default_backup) return;
            for(let key in this.default_backup){
                if(!key.startsWith("_s_")) continue;
                GM_setValue(key.substring(3), this.default_backup[key]);
            }
        },

        hasEdited: function (key) {
            if(!key.startsWith("_s_")) key = "_s_" + key;
            if(this[key] === undefined) return false;
            return this[key] !== this.default_backup[key];
        },

        getDefaultValue: function (key) {
            if(!key.startsWith("_s_")) key = "_s_" + key;
            return this.default_backup[key];
        }
    }
    settings.backup();
    settings.load();
    //endregion

    //region 本地化选项
    const localizationMap = {
        notice_update: {
            zh_CN: "VoiceLinks公告更新，可能包含重要的新功能说明，是否跳转至说明页面？",
            zh_TW: "VoiceLinks公告更新，可能包含重要的新功能説明，是否跳轉至説明頁面？",
            en_US: "VoiceLinks Notice Update, may contain important new features, do you want to jump to the notice page?"
        },

        title_settings: {
            zh_CN: "VoiceLinks 设置",
            zh_TW: "VoiceLinks 設定",
            en_US: "VoiceLinks Settings"
        },

        title_language_settings: {
            zh_CN: "语言设置",
            zh_TW: "語言設定",
            en_US: "Language Settings"
        },

        display_language: {
            zh_CN: "显示语言",
            zh_TW: "顯示語言",
            en_US: "Language"
        },

        popup_language: {
            zh_CN: "弹窗语言",
            zh_TW: "彈窗語言",
            en_US: "Popup Language"
        },

        popup_language_tooltip: {
            zh_CN: "仅修改标题和标签显示语言，信息本身的语言以DLSite网页设置的语言为准。",
            zh_TW: "只修改標題和標籤顯示語言，資訊本身的語言以DLSite網頁設定的語言為準。",
            en_US: "Only modify the title and tag display language, the language of the information itself is determined by the language of the DLSite page settings."
        },

        title_general_settings: {
            zh_CN: "常规",
            zh_TW: "常規",
            en_US: "General"
        },

        parse_url: {
            zh_CN: "解析URL",
            zh_TW: "解析URL",
            en_US: "Parse URL"
        },

        parse_url_tooltip: {
            zh_CN: "鼠标悬停导指向DLSite作品页面的URL时，同样显示作品信息",
            zh_TW: "鼠標懸停導向DLSite作品頁面的URL時，同樣顯示作品資訊",
            en_US: "Show work info when hovering over DLSite work URL"
        },

        parse_url_in_dl: {
            zh_CN: "在DLSite上解析URL",
            zh_TW: "在DLSite上解析URL",
            en_US: "Parse URL in DLSite"
        },

        parse_url_in_dl_tooltip: {
            zh_CN: "URL较多可能影响正常阅读",
            zh_TW: "URL較多可能影響正常閱讀",
            en_US: "URL is more likely to affect normal reading"
        },

        show_translated_title_in_dl: {
            zh_CN: "在DLSite显示对应语言的翻译标题",
            zh_TW: "在DLSite顯示對應語言的翻譯標題",
            en_US: "Show translated title in DLSite"
        },

        show_translated_title_in_dl_tooltip: {
            zh_CN: "作品信息页面的标题将会被修改为与翻译语言对应的标题，避免简中看繁中作品标题为日文的问题",
            zh_TW: "作品資訊頁面的標題將會被修改為與翻譯語言對應的標題，避免繁中看簡中作品標題為日文的問題",
            en_US: "The title of the work info page will be modified to match the corresponding translation language, to avoid viewing the title as Japanese when viewing a work in non-English language."
        },

        copy_as_filename_btn: {
            zh_CN: "“复制为有效文件名”按钮",
            zh_TW: "“複製為有效檔案名”按鈕",
            en_US: '"Copy as filename" button'
        },

        copy_as_filename_btn_tooltip: {
            zh_CN: "鼠标悬停至DLSite作品标题部分将会出现该按钮，点击即可将标题复制为有效文件名，有效文件名指的是会将标题中的非法部分用相似的符号代替",
            zh_TW: "鼠標懸停至DLSite作品標題部分將會出現按鈕，點擊即可將標題複製為有效檔案名，有效檔案名指的是會將標題中的非法部分用相似的符號代替",
            en_US: "Show button when hovering over DLSite work title. Clicking it will copy the title to a valid filename, which will replace the illegal part of the title with similar symbols."
        },

        show_compatibility_warning: {
            zh_CN: "显示兼容性警告",
            zh_TW: "顯示兼容性警告",
            en_US: "Show compatibility warning"
        },

        show_compatibility_warning_tooltip: {
            zh_CN: "如果脚本中，修改DLSite页面元素的功能覆盖了其它脚本的修改，则会触发该弹窗警告",
            zh_TW: "如果腳本中，修改DLSite頁面元素的功能覆蓋了其它腳本的修改，则會觸發該彈窗警告",
            en_US: "If the script modifies the functionality of DLSite elements that are covered by other scripts, the warning will be triggered"
        },

        url_insert_mode: {
            zh_CN: "导向文本的插入方式",
            zh_TW: "導向文本的插入方式",
            en_US: "Type of the insertion"
        },

        url_insert_mode_tooltip: {
            zh_CN: "如果某段链接中的RJ号被解析成功，为了保证原链接不被完全覆盖，会根据需要，在URL的文本前/后插入特定导向文本",
            zh_TW: "如果某段連結中的RJ號被解析成功，為了保證原連結不被完全覆蓋，會根據需要，在URL的文本前/後插入特定導向文本",
            en_US: "If the RJ number in a link is parsed successfully, it is necessary to insert a specific text in the URL before/after the link when the link is almost completely covered by the script"
        },

        url_insert_mode_none: {
            zh_CN: "不插入",
            zh_TW: "不插入",
            en_US: "None"
        },

        url_insert_mode_prefix: {
            zh_CN: "前缀插入代替原链接",
            zh_TW: "前綴插入代替原連結",
            en_US: "Insert before the link as original link."
        },

        url_insert_mode_before_rj: {
            zh_CN: "插入到RJ号前代替RJ链接",
            zh_TW: "插入到RJ號前代替RJ連結",
            en_US: "Insert before the RJ link as the RJ link."
        },

        url_insert_text: {
            zh_CN: "导向文本",
            zh_TW: "導向文本",
            en_US: "Text to insert"
        },

        sfw_mode: {
            zh_CN: "SFW 模式",
            zh_TW: "SFW 模式",
            en_US: "SFW Mode"
        },

        sfw_mode_tooltip: {
            zh_CN: "启用后，所有作品封面均会模糊处理（固定窗口时将鼠标移动到图片上可临时去除模糊）",
            zh_TW: "啟用後，所有作品封面均會模糊處理（固定視窗時將滑鼠移動到圖片上可暫時去除模糊）",
            en_US: "Turn on to blur the cover of all works (temporarily remove the blur by moving the mouse over the image when the window is fixed)."
        },

        sfw_blur_level: {
            zh_CN: "模糊程度",
            zh_TW: "模糊程度",
            en_US: "Blur level"
        },

        sfw_remove_when_hover: {
            zh_CN: "鼠标移到图片上时移除模糊",
            zh_TW: "滑鼠移到圖片上時移除模糊",
            en_US: "Remove the blur when the mouse moves over the image"
        },

        sfw_blur_transition: {
            zh_CN: "模糊动画（卡顿请关闭）",
            zh_TW: "模糊動畫（卡頓請關閉）",
            en_US: "Blur animation"
        },

        low: {
            zh_CN: "低 - 仅模糊细节",
            zh_TW: "低 - 僅模糊細節",
            en_US: "Low - Only blur details"
        },

        medium: {
            zh_CN: "中 - 依稀可见",
            zh_TW: "中 - 依稀可見",
            en_US: "Medium - Hard to see"
        },

        high: {
            zh_CN: "高 - 完全无法辨认",
            zh_TW: "高 - 完全無法辨識",
            en_US: "High - Unrecognizable"
        },

        title_info_settings: {
            zh_CN: "信息显示",
            zh_TW: "信息顯示",
            en_US: "Info Display"
        },

        category_preset: {
            zh_CN: "类别预设",
            zh_TW: "類別預設",
            en_US: "Category Preset"
        },

        category_preset_tooltip: {
            zh_CN: "使不同类别的作品根据需要显示不同的信息<br/><br/>注意：即使勾选了显示，若作品中不存在该信息则也会隐藏。",
            zh_TW: "使不同類別的作品根據需要顯示不同的信息<br/><br/>注意：即使勾選了顯示，若作品中不存在該信息則也會隱藏。",
            en_US: "Show the information of different categories of works. <br/><br/>Note: even if checked, the information of a work that does not exist will be hidden."
        },

        rate: {
            zh_CN: "评分",
            zh_TW: "評分",
            en_US: "Rate"
        },

        rate_tooltip: {
            zh_CN: "星数★ (评分人数 (设置开启))",
            zh_TW: "星數★ (評分人數 (設置開啟))",
            en_US: "Star★ (number of ratings (enable in settings))"
        },

        dl_count: {
            zh_CN: "销量",
            zh_TW: "銷量",
            en_US: "Sales"
        },

        circle_name: {
            zh_CN: "社团名",
            zh_TW: "社團名",
            en_US: "Circle Name"
        },

        translator_name: {
            zh_CN: "翻译者",
            zh_TW: "翻譯者",
            en_US: "Translator"
        },

        release_date: {
            zh_CN: "发售日",
            zh_TW: "發售日",
            en_US: "Release Date"
        },

        update_date: {
            zh_CN: "更新日",
            zh_TW: "更新日",
            en_US: "Update Date"
        },

        age_rating: {
            zh_CN: "年龄指定",
            zh_TW: "年齡指定",
            en_US: "Age Rating"
        },

        scenario: {
            zh_CN: "剧情",
            zh_TW: "劇情",
            en_US: "Scenario"
        },

        illustration: {
            zh_CN: "插画",
            zh_TW: "插圖",
            en_US: "Illustration"
        },

        voice_actor: {
            zh_CN: "声优",
            zh_TW: "聲優",
            en_US: "Voice Actor"
        },

        music: {
            zh_CN: "音乐",
            zh_TW: "音樂",
            en_US: "Music"
        },

        genre: {
            zh_CN: "分类",
            zh_TW: "分類",
            en_US: "Genre"
        },

        file_size: {
            zh_CN: "文件容量",
            zh_TW: "檔案容量",
            en_US: "File Size"
        },

        title_tag_settings: {
            zh_CN: "标签显示",
            zh_TW: "標籤顯示",
            en_US: "Tag Display"
        },

        tag_main_switch: {
            zh_CN: "标签总开关",
            zh_TW: "標籤總開關",
            en_US: "Tag Main Switch"
        },

        tag_main_switch_tooltip: {
            zh_CN: "关闭则所有标签均不显示",
            zh_TW: "關閉則所有標籤都不顯示",
            en_US: "If turned off, all tags will not be displayed"
        },

        tag_work_type: {
            zh_CN: "作品类型",
            zh_TW: "作品類型",
            en_US: "Work Type"
        },

        work_type_game: {
            zh_CN: "游戏",
            zh_TW: "遊戲",
            en_US: "Game"
        },

        work_type_comic: {
            zh_CN: "漫画",
            zh_TW: "漫畫",
            en_US: "Manga"
        },

        work_type_illustration: {
            zh_CN: "CG・插画",
            zh_TW: "CG・插畫",
            en_US: "CG + Illustrations"
        },

        work_type_novel: {
            zh_CN: "小说",
            zh_TW: "小說",
            en_US: "Novel"
        },

        work_type_video: {
            zh_CN: "视频",
            zh_TW: "影片",
            en_US: "Video"
        },

        work_type_voice: {
            zh_CN: "音声・ASMR",
            zh_TW: "聲音作品・ASMR",
            en_US: "Voice / ASMR"
        },

        work_type_music: {
            zh_CN: "音乐",
            zh_TW: "音樂",
            en_US: "Music"
        },

        work_type_tool: {
            zh_CN: "工具/装饰",
            zh_TW: "工具/配件",
            en_US: "Tools / Accessories"
        },

        work_type_voice_comic: {
            zh_CN: "音声漫画",
            zh_TW: "有聲漫畫",
            en_US: "Voiced Comics"
        },

        work_type_other: {
            zh_CN: "其他",
            zh_TW: "其他",
            en_US: "Miscellaneous"
        },

        tag_translatable: {
            zh_CN: "可翻译",
            zh_TW: "可翻譯",
            en_US: "Translatable"
        },

        tag_translatable_tooltip: {
            zh_CN: "大家一起来翻译 授权作品",
            zh_TW: "大家一起翻譯 授权作品",
            en_US: "Translators Unite translation permitted work"
        },

        tag_not_translatable: {
            zh_CN: "不可翻译",
            zh_TW: "不可翻譯",
            en_US: "Not Translatable"
        },

        tag_not_translatable_tooltip: {
            zh_CN: "未授权 大家一起来翻译",
            zh_TW: "未授權 大家一起來翻譯",
            en_US: "Not Translators Unite translation permitted work"
        },

        tag_translated: {
            zh_CN: "翻译作品",
            zh_TW: "翻譯作品",
            en_US: "Translated"
        },

        tag_translated_tooltip: {
            zh_CN: "当前作品为 大家一起来翻译 作品",
            zh_TW: "當前作品為 大家一起來翻譯 作品",
            en_US: "Current work is Translators Unite translation work"
        },

        tag_language_support: {
            zh_CN: "语言支持",
            zh_TW: "語言支援",
            en_US: "Language Support"
        },

        language_japanese: {
            zh_CN: "日文",
            zh_TW: "日文",
            en_US: "Japanese"
        },

        language_english: {
            zh_CN: "英文",
            zh_TW: "英文",
            en_US: "English"
        },

        language_korean: {
            zh_CN: "韩语",
            zh_TW: "韓語",
            en_US: "Korean"
        },

        language_simplified_chinese: {
            zh_CN: "简体中文",
            zh_TW: "簡體中文",
            en_US: "Simplified Chinese"
        },

        language_traditional_chinese: {
            zh_CN: "繁体中文",
            zh_TW: "繁體中文",
            en_US: "Traditional Chinese"
        },

        language_german: {
            zh_CN: "德语",
            zh_TW: "德語",
            en_US: "German"
        },

        language_french: {
            zh_CN: "法语",
            zh_TW: "法語",
            en_US: "French"
        },

        language_russian: {
            zh_CN: "俄语",
            zh_TW: "俄語",
            en_US: "Russian"
        },

        language_spanish: {
            zh_CN: "西班牙语",
            zh_TW: "西班牙語",
            en_US: "Spanish"
        },

        language_indonesian: {
            zh_CN: "印尼文",
            zh_TW: "印尼文",
            en_US: "Indonesian"
        },

        language_italian: {
            zh_CN: "意大利语",
            zh_TW: "義大利語",
            en_US: "Italian"
        },

        language_arabic: {
            zh_CN: "阿拉伯语",
            zh_TW: "阿拉伯語",
            en_US: "Arabic"
        },

        language_portuguese: {
            zh_CN: "葡萄牙语",
            zh_TW: "葡萄牙語",
            en_US: "Portuguese"
        },

        language_finnish: {
            zh_CN: "芬兰语",
            zh_TW: "芬蘭語",
            en_US: "Finnish"
        },

        language_polish: {
            zh_CN: "波兰语",
            zh_TW: "波蘭語",
            en_US: "Polish"
        },

        language_swedish: {
            zh_CN: "瑞典文",
            zh_TW: "瑞典文",
            en_US: "Swedish"
        },

        language_thai: {
            zh_CN: "泰语",
            zh_TW: "泰語",
            en_US: "Thai"
        },

        language_vietnamese: {
            zh_CN: "越南语",
            zh_TW: "越南語",
            en_US: "Vietnamese"
        },

        language_japanese_abbr: {
            zh_CN: "日",
            zh_TW: "日",
            en_US: "JP"
        },

        language_english_abbr: {
            zh_CN: "英",
            zh_TW: "英",
            en_US: "EN"
        },

        language_korean_abbr: {
            zh_CN: "韩",
            zh_TW: "韩",
            en_US: "KO"
        },

        language_simplified_chinese_abbr: {
            zh_CN: "简中",
            zh_TW: "簡中",
            en_US: "ZH"
        },

        language_traditional_chinese_abbr: {
            zh_CN: "繁中",
            zh_TW: "繁中",
            en_US: "TW"
        },

        language_german_abbr: {
            zh_CN: "德",
            zh_TW: "德",
            en_US: "DE"
        },

        language_french_abbr: {
            zh_CN: "法",
            zh_TW: "法",
            en_US: "FR"
        },

        language_spanish_abbr: {
            zh_CN: "西",
            zh_TW: "西",
            en_US: "ES"
        },

        language_indonesian_abbr: {
            zh_CN: "印",
            zh_TW: "印",
            en_US: "ID"
        },

        language_italian_abbr: {
            zh_CN: "意",
            zh_TW: "意",
            en_US: "IT"
        },

        language_portuguese_abbr: {
            zh_CN: "葡",
            zh_TW: "葡",
            en_US: "PT"
        },

        language_swedish_abbr: {
            zh_CN: "瑞典",
            zh_TW: "瑞典",
            en_US: "SV"
        },

        language_thai_abbr: {
            zh_CN: "泰",
            zh_TW: "泰",
            en_US: "TH"
        },

        language_vietnamese_abbr: {
            zh_CN: "越",
            zh_TW: "越",
            en_US: "VN"
        },

        show_rate_count: {
            zh_CN: "显示评分人数",
            zh_TW: "顯示評分人數",
            en_US: "Show Rate Count"
        },

        tag_translation_request: {
            zh_CN: "翻译申请情况",
            zh_TW: "翻譯申請情况",
            en_US: "Translation Request"
        },

        tag_translation_request_tooltip: {
            zh_CN: "当前作品目前的翻译申请情况，格式为：语言简写 申请数-发售数",
            zh_TW: "當前作品目前的翻譯申請情況，格式為：语言簡稱 申請數-發售數",
            en_US: "Current work's translation request. Format: Language_Abbr Number_of_Requests - Number_of_Sales"
        },

        tag_bonus_work: {
            zh_CN: "特典",
            zh_TW: "特典",
            en_US: "Bonus"
        },

        tag_bonus_work_tooltip: {
            zh_CN: "当前作品是某部作品的特典",
            zh_TW: "當前作品是某部作品的特典",
            en_US: "Current work is a bonus work"
        },

        tag_has_bonus: {
            zh_CN: "有特典",
            zh_TW: "有特典",
            en_US: "Has Bonus"
        },

        tag_has_bonus_tooltip: {
            zh_CN: "当前作品目前附赠特典，若特典已下架则不会显示该标签",
            zh_TW: "當前作品目前附赠特典，若特典已下架則不會顯示該標籤",
            en_US: "Current work has bonus. If bonus is not available, the tag will not be displayed."
        },

        tag_file_format: {
            zh_CN: "文件格式",
            zh_TW: "檔案形式",
            en_US: "File Format"
        },

        tag_file_format_tooltip: {
            zh_CN: "WAV、EXE、MP3等",
            zh_TW: "WAV、EXE、MP3等",
            en_US: "WAV, EXE, MP3, etc."
        },

        tag_no_longer_available: {
            zh_CN: "已下架",
            zh_TW: "已下架",
            en_US: "Unavailable"
        },

        tag_announce: {
            zh_CN: "预告",
            zh_TW: "預告",
            en_US: "Announce"
        },

        tag_ai: {
            zh_CN: "AI & 部分AI",
            zh_TW: "AI & 部分AI",
            en_US: "AI & Partial AI"
        },

        tag_aig: {
            zh_CN: "AI生成",
            zh_TW: "AI生成",
            en_US: "AI Gen",
        },

        tag_aip: {
            zh_CN: "AI部分使用",
            zh_TW: "AI部分使用",
            en_US: "AI Partial",
        },

        tag_ai_tooltip: {
            zh_CN: "全部或部分使用AI的作品",
            zh_TW: "全部或部分使用AI的作品",
            en_US: "Full or partial use of AI",
        },

        button_save: {
            zh_CN: "保存设置",
            zh_TW: "保存設置",
            en_US: "Save",
        },

        button_cancel: {
            zh_CN: "取消设置",
            zh_TW: "取消設置",
            en_US: "Cancel",
        },

        button_reset: {
            zh_CN: "重置设置",
            zh_TW: "重置設置",
            en_US: "Reset",
        },

        need_reorder: {
            zh_CN: "检测到设置更新，可能添加了新的信息位，请重新设置对应设置项的排列",
            zh_TW: "檢查到設置更新，可能添加了新的信息位，请重新設置對應設置項的排列",
            en_US: "There is a new setting item added. Please reorder the corresponding setting item",
        },

        save_complete: {
            zh_CN: "设置已保存，部分设置需要刷新对应页面以生效",
            zh_TW: "設置已保存，部分設置需要刷新對應頁面以生效",
            en_US: "Settings saved, some settings need to refresh the corresponding page to take effect",
        },

        save_failed: {
            zh_CN: "设置保存失败",
            zh_TW: "設置保存失敗",
            en_US: "Settings save failed",
        },

        reset_confirm: {
            zh_CN: "确定要将设置重置到最初始的状态吗？（重置后，需要再点击保存才会生效）",
            zh_TW: "確定要將設置重置到最初始的狀態嗎？（重置後，需要再點擊保存才會生效）",
            en_US: "Are you sure you want to reset the settings to the initial state? (After resetting, you need to click Save to take effect)",
        },

        reset_complete: {
            zh_CN: "设置已重置",
            zh_TW: "設置已重置",
            en_US: "Settings reset",
        },

        reset_failed: {
            zh_CN: "设置重置失败",
            zh_TW: "設置重置失敗",
            en_US: "Settings reset failed",
        },

        reset_order: {
            zh_CN: "重置顺序",
            zh_TW: "重置順序",
            en_US: "Reset Order",
        },

        reset_order_confirm: {
            zh_CN: "确定要将元素顺序重置到最初始的状态吗？",
            zh_TW: "確定要將元素順序重置到最初始的狀態嗎？",
            en_US: "Are you sure you want to reset the element order to the initial state?",
        },

        reset_order_and_setting: {
            zh_CN: "重置元素顺序和各自的设置值",
            zh_TW: "重置元素順序和各自的設置值",
            en_US: "Reset element order and their settings",
        },

        hint_pin: {
            zh_CN: "按住CTRL以固定弹框，固定时可复制信息",
            zh_TW: "按住CTRL以固定彈窗，固定時可複製資訊",
            en_US: "Hold CTRL to pin the popup, info can be copied.",
        },

        hint_unpin: {
            zh_CN: "抬起CTRL以关闭弹框 & 查看其它作品RJ信息",
            zh_TW: "抬起CTRL以關閉彈窗 & 查看其它作品RJ信息",
            en_US: "Release CTRL to close the popup & view other works.",
        },

        hint_copy: {
            zh_CN: "左键单击以复制信息",
            zh_TW: "左鍵單擊以複製資訊",
            en_US: "Left click to copy info.",
        },

        hint_copy_all: {
            zh_CN: "左键单击以复制内部所有信息",
            zh_TW: "左鍵單擊以複製內部所有資訊",
            en_US: "Left click to copy all contained info.",
        },

        hint_copy_work_title: {
            zh_CN: "单击复制标题，Alt+单击复制为有效文件名",
            zh_TW: "單擊複製標題，Alt+單擊複製為有效檔名",
            en_US: "Click to copy title, Alt+click to copy as valid filename.",
        },

        search_result_this: {
            zh_CN: "本作",
            zh_TW: "本作",
            en_US: "This"
        },

        search_result_this_lang: {
            zh_CN: "该语言",
            zh_TW: "该语言",
            en_US: "Lang"
        },

        search_result_orig: {
            zh_CN: "原版",
            zh_TW: "原版",
            en_US: "Orig"
        },

        search_result_translation: {
            zh_CN: "翻译",
            zh_TW: "翻译",
            en_US: "🌐"
        },



        get: function (key, langKey = "_s_lang") {
            return typeof key === "string" ? localizationMap[key][settings[langKey]] : key[settings[langKey]];
        }
    }

    function localize(key) {
        return localizationMap.get(key);
    }

    function localizePopup(key) {
        return localizationMap.get(key, "_s_popup_lang");
    }
    //endregion

    //region 常量
    const RJ_REGEX = new RegExp("(R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6})", "gi");
    const URL_REGEX = new RegExp("dlsite.com/.*/product_id/((R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6}))", "g");
    const VOICELINK_CLASS = 'voicelink-' + Math.random().toString(36).slice(2);
    const VOICELINK_IGNORED_CLASS = `${VOICELINK_CLASS}_ignored`;
    const RJCODE_ATTRIBUTE = 'rjcode';
    const LANG_MAP = {
        JPN: localizePopup(localizationMap.language_japanese),
        ENG: localizePopup(localizationMap.language_english),
        CHI_HANS: localizePopup(localizationMap.language_simplified_chinese),
        CHI_HANT: localizePopup(localizationMap.language_traditional_chinese),
        KO_KR: localizePopup(localizationMap.language_korean),
        SPA: localizePopup(localizationMap.language_spanish),
        FRE: localizePopup(localizationMap.language_french),
        RUS: localizePopup(localizationMap.language_russian),
        THA: localizePopup(localizationMap.language_thai),
        GER: localizePopup(localizationMap.language_german),
        FIN: localizePopup(localizationMap.language_finnish),
        POR: localizePopup(localizationMap.language_portuguese),
        VIE: localizePopup(localizationMap.language_vietnamese),
        ITA: localizePopup(localizationMap.language_italian),
        ARA: localizePopup(localizationMap.language_arabic),
        POL: localizePopup(localizationMap.language_polish),
    };
    const LANG_MAP_ABBR = {
        JPN: localizePopup(localizationMap.language_japanese_abbr),
        ENG: localizePopup(localizationMap.language_english_abbr),
        CHI_HANS: localizePopup(localizationMap.language_simplified_chinese_abbr),
        CHI_HANT: localizePopup(localizationMap.language_traditional_chinese_abbr),
        KO_KR: localizePopup(localizationMap.language_korean_abbr),
        SPA: localizePopup(localizationMap.language_spanish_abbr),
        FRE: localizePopup(localizationMap.language_french_abbr),
        THA: localizePopup(localizationMap.language_thai_abbr),
        GER: localizePopup(localizationMap.language_german_abbr),
        POR: localizePopup(localizationMap.language_portuguese_abbr),
        VIE: localizePopup(localizationMap.language_vietnamese_abbr),
        ITA: localizePopup(localizationMap.language_italian_abbr),
    };
    const POPUP_CSS = `
    .${VOICELINK_CLASS}_voicepopup {
        min-width: 630px !important;
        z-index: 2147483646 !important;
        max-width: 80% !important;
        position: fixed !important;
        line-height: normal !important;  /*原1.4em !important;*/
        font-size:1.1em!important;
        margin-bottom: 10px !important;
        box-shadow: 0 0 .125em 0 rgba(0,0,0,.5) !important;
        border-radius: 0.5em !important;
        background-color:#8080C0 !important;
        color:#F6F6F6 !important;
        text-align: left !important;
        padding: 10px !important;
        pointer-events: none !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup[pin][mouse-in] *[copy-text] {
        text-decoration: underline !important;
        cursor: pointer !important;
    }
    .${VOICELINK_CLASS}_voicepopup[pin][mouse-in] *[copy-text]:active {
        opacity: 0.5 !important;
    }
    
    #${VOICELINK_CLASS}_info-container {
        font-size: 1em !important;
    }
    #${VOICELINK_CLASS}_info-container > div {
        margin-bottom: 3px !important;
        font-size: 1em !important;
    }
    #${VOICELINK_CLASS}_info-container > div > a {
        display: inline;
    }
    #${VOICELINK_CLASS}_info-container > div > .info-title {
        margin-right: 5px !important;
        display: inline-block;
    }
    #${VOICELINK_CLASS}_info-container > div > .info-title::after {
        content: ":" !important;
        text-decoration: none !important;
        display: inline-block !important;
    }
    #${VOICELINK_CLASS}_info-container .${VOICELINK_CLASS}_tags {
        margin-top: 12px !important;
        margin-bottom: 0 !important;
        font-size: 0.909091em !important;
    }
    
    .${VOICELINK_CLASS}_loader {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 300px !important;
        min-height: 30px !important;
        z-index: -1 !important;
    }
    .${VOICELINK_CLASS}_dot {
        width: 20px !important;
        height: 20px !important;
        margin: 0 8px !important;
        background-color: #fbfbfb !important;
        border-radius: 50% !important;
        animation: ${VOICELINK_CLASS}_scale 1s infinite !important;
    }
    .${VOICELINK_CLASS}_dot:nth-child(1) {
        animation-delay: 0s !important;
    }
    .${VOICELINK_CLASS}_dot:nth-child(2) {
        animation-delay: 0.2s !important;
    }
    .${VOICELINK_CLASS}_dot:nth-child(3) {
        animation-delay: 0.4s !important;
    }
    @keyframes ${VOICELINK_CLASS}_scale {
      0%, 100% {
          transform: scale(1);
      }
      50% {
          transform: scale(1.5);
      }
    }
    
    .${VOICELINK_CLASS}_voicepopup-maniax{
        background-color:#8080C0 !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup-girls{
        background-color:#B33761 !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup .${VOICELINK_CLASS}_left_panel{
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        margin: 0 16px 0 0 !important;
        width: 310px !important;
        flex-shrink: 0 !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup .${VOICELINK_CLASS}_img_container{
        width: 100% !important;
        padding: 3px !important;
        position: relative;
    }

    .${VOICELINK_CLASS}_img_container img {
        width: 100% !important;
        height: auto !important;
    }
    
    #${VOICELINK_CLASS}_hint {
        font-size: 0.8em !important;
        opacity: 0.5 !important;
        max-width: 300px !important;
        margin-top: 5px !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup a {
        text-decoration: none !important;
        color: pink !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup .${VOICELINK_CLASS}_age-18{
        color: hsl(300deg 76% 77%) !important;
    }
    
    .${VOICELINK_CLASS}_voicepopup .${VOICELINK_CLASS}_age-all{
        color: hsl(157deg 82% 52%) !important;
    }

    .${VOICELINK_CLASS}_voice-title {
        font-size: 1.363636em !important;   /*原1.4em*/
        font-weight: bold !important;
        text-align: center !important;
        margin: 5px 10px 0 0 !important;
        display: block !important;
    }

    .${VOICELINK_CLASS}_rjcode {
        text-align: center !important;
        margin: 5px 0 !important;
        font-size: 1.2012987em !important;  /*原1.2em !important;*/
        font-style: italic !important;
        opacity: 0.3 !important;
    }

    .${VOICELINK_CLASS}_error {
        height: 210px !important;
        line-height: 210px !important;
        text-align: center !important;
    }

    .${VOICELINK_CLASS}_discord-dark {
        background-color: #36393f !important;
        color: #dcddde !important;
        font-size: 0.9375rem !important;
    }
    
    .${VOICELINK_CLASS}_work_title:hover #${VOICELINK_CLASS}_copy_btn {
        opacity: 1 !important;
    }
    
    #${VOICELINK_CLASS}_copy_btn {
        background: transparent !important;
        border-color: transparent !important;
        cursor: pointer !important;
        transition: all 0.3s !important;
        opacity: 0 !important;
        font-size: 0.75em !important;
        user-select: none !important;
        position: absolute !important;
    }
    
    #${VOICELINK_CLASS}_copy_btn:hover {
        scale: 1.2 !important;
    }
    
    #${VOICELINK_CLASS}_copy_btn:active {
        scale: 1.1 !important;
    }
    
  `
    const SETTINGS_CSS = `
        #${VOICELINK_CLASS}_settings-container {
            font-family: Arial, sans-serif !important;
            background-color: #f4f4f9 !important;
            margin: auto !important;
            padding: 20px 30px !important;
            line-height: unset !important;
            
            position: fixed !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            top: 20px !important;
            bottom: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            box-sizing: border-box !important;
            max-width: 800px !important;
            width: 100% !important;
            height: calc(100% - 40px) !important;
            z-index: 2147483647 !important;
            border-radius: 20px !important;
            box-shadow: darkgray 0px 0px 17px 2px !important;
            
            /*scrollbar-width: none;*/
            /*-ms-overflow-style: none;*/
        }
        #${VOICELINK_CLASS}_settings-container::-webkit-scrollbar {
            width: 5px !important;
            height: 5px !important;
        }
        #${VOICELINK_CLASS}_settings-container::-webkit-scrollbar-track {
            background-color: #f4f4f9 !important;
            border-radius: 5px !important;
        }
        #${VOICELINK_CLASS}_settings-container::-webkit-scrollbar-thumb {
            background-color: #888 !important;
            border-radius: 5px !important; 
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_container {
            max-width: 800px !important;
            margin: auto !important;
            background: #fff !important;
            padding: 20px !important;
            border-radius: 10px !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;
        }
        #${VOICELINK_CLASS}_settings-container h1 {
            display: block !important;
            text-align: center !important;
            color: #333 !important;
            font-size: 32px !important;
            margin: 21.44px 0 !important;
            font-weight: bold !important;
            line-height: normal !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_section-container {
            margin: 20px 0 !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_section-container h2 {
            display: block !important;
            color: #007bff !important;
            font-size: 24px !important;
            margin: 22px 0 14px 0 !important;
            font-weight: bold !important;
            line-height: normal !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting {
            /*display: flex;*/
            /*align-items: center;*/
            /*justify-content: space-between;*/
            margin: 10px 0 !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting .${VOICELINK_CLASS}_row-title {
            margin: 0 0 0 10px !important;
            color: #555 !important;
            font-size: 18px !important;
            font-weight: normal !important;
            /*flex-grow: 1;*/
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="text"],
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="password"],
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="number"],
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="email"],
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting select {
            width: 100% !important;
            padding: 10px !important;
            border: 1px solid #ddd !important;
            border-radius: 5px !important;
            background: #fafafa !important;
            box-sizing: border-box !important;
            color: #666666FF !important;
            font-size: 13.3333px !important;
            height: unset !important;
            max-height: unset !important;
            max-width: unset !important;
            /*margin-bottom: 10px;*/
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="checkbox"] {
            display: none !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_toggle-container {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-end !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting .${VOICELINK_CLASS}_toggle {
            display: inline-block !important;
            margin: 0 !important;
            width: 60px !important;
            height: 30px !important;
            padding: 0 !important;
            background: #ccc !important;
            border-radius: 15px !important;
            position: relative !important;
            cursor: pointer !important;
            transition: background 0.3s !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_toggle:before {
            content: "" !important;
            display: block !important;
            width: 24px !important;
            height: 24px !important;
            background: #fff !important;
            border-radius: 50% !important;
            position: absolute !important;
            top: 3px !important;
            left: 3px !important;
            transition: transform 0.3s !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="checkbox"]:checked + label {
            background: #007bff !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_setting input[type="checkbox"]:checked + label:before {
            transform: translateX(30px) !important;
        }
        #${VOICELINK_CLASS}_button-close{
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
            font-size: 24px !important;
            cursor: pointer !important;
            background: rgba(0, 0, 0, 0.05) !important;
            border: none !important;
            width: 42px !important;
            height: 42px !important;
            border-radius: 50% !important;
        }
        #${VOICELINK_CLASS}_button-save,
        #${VOICELINK_CLASS}_button-cancel,
        #${VOICELINK_CLASS}_button-reset{
            display: block !important;
            width: 100% !important;
            padding: 10px !important;
            border: none !important;
            border-radius: 5px !important;
            background: #007bff !important;
            color: #fff !important;
            font-size: 16px !important;
            cursor: pointer !important;
            margin-top: 10px !important;

            transition: background 0.3s, filter 0.3s !important;
        }
        #${VOICELINK_CLASS}_button-reset{
            background: #999 !important;
        }
        #${VOICELINK_CLASS}_button-save:hover,
        #${VOICELINK_CLASS}_button-cancel:hover,
        #${VOICELINK_CLASS}_button-reset:hover{
            filter: brightness(1.3) !important;
        }
        #${VOICELINK_CLASS}_button-save:active,
        #${VOICELINK_CLASS}_button-cancel:active,
        #${VOICELINK_CLASS}_button-reset:active{
            filter: brightness(0.9) !important;
        }

        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_tooltip {
            position: relative !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_tooltip .${VOICELINK_CLASS}_tooltip-text {
            visibility: hidden !important;
            min-width: 200px !important;
            max-width: 100% !important;
            background-color: #555 !important;
            color: #fff !important;
            font-size: 14px !important;
            text-align: center !important;
            border-radius: 5px !important;
            padding: 8px 10px !important;
            position: absolute !important;
            z-index: 1 !important;
            bottom: 125% !important;
            left: 0 !important;
            /*margin-left: -100px;*/
            opacity: 0 !important;
            filter: brightness(1.0) !important;
            transition: opacity 0.3s !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_tooltip:hover .${VOICELINK_CLASS}_tooltip-text {
            visibility: visible !important;
            opacity: 1 !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_sortable {
            cursor: move !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_sortable span{
            cursor: default !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_dragging{
            background-color: #1e82ff38 !important;
            user-select: none !important;
            transition: background-color 0.3s !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_sortable .${VOICELINK_CLASS}_setting {
            cursor: move !important;
        }
        #${VOICELINK_CLASS}_settings-container table {
            width: 100% !important;
            margin-bottom: 20px !important;
            border-collapse: collapse !important;
            font-size: unset !important;
        }
        #${VOICELINK_CLASS}_settings-container table,
        #${VOICELINK_CLASS}_settings-container th,
        #${VOICELINK_CLASS}_settings-container td {
            border: 0 solid #ddd !important;
        }
        #${VOICELINK_CLASS}_settings-container th,
        #${VOICELINK_CLASS}_settings-container td {
            border-bottom: 1px dashed rgba(221, 221, 221, 0.64) !important;
            /*border-top: 1px solid #ddd;*/
            padding: 8px 10px !important;
            text-align: left !important;
            vertical-align: middle !important;
        }

        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_hidden{
            display: none !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_input-cell{
            text-align: right !important;
            padding-right: 20px !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_indent-1 > td {
            padding: 8px 24px !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_indent-1 .${VOICELINK_CLASS}_input-cell {
            padding: 8px 20px !important;
        }

        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_tags {
            font-size: 14px;
        }
        .${VOICELINK_CLASS}_tags {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: left !important;
            align-items: stretch !important;
        }
        .${VOICELINK_CLASS}_tags > label,
        .${VOICELINK_CLASS}_tags > span {
            border-radius: 5px !important;
            font-size: 1em !important;
            margin-right: 8px !important;
            margin-bottom: 8px !important;
            padding: 5px 8px !important;
            
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;

            transition: color 0.3s, background-color 0.3s !important;
        }
        .${VOICELINK_CLASS}_tags > label.${VOICELINK_CLASS}_tag_tight,
        .${VOICELINK_CLASS}_tags > span.${VOICELINK_CLASS}_tag_tight{
            padding: 2px 7px !important;
        }
        .${VOICELINK_CLASS}_tags > label.${VOICELINK_CLASS}_tag_small,
        .${VOICELINK_CLASS}_tags > span.${VOICELINK_CLASS}_tag_small{
            padding: 2px 7px !important;
            font-size: 0.857143em !important;
        }

        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_tag-off{
            background-color: #ffffff !important;
            color: #aaaaaa !important;
        }

        .${VOICELINK_CLASS}_tag-purple{
            background-color: #EED9F2 !important;
            color: #7B1FA2 !important;
        }

        .${VOICELINK_CLASS}_tag-blue{
            background-color: #d9eefc !important;
            color: #4285F4 !important;
        }

        .${VOICELINK_CLASS}_tag-red{
            background-color: #ffd6da !important;
            color: #EA4335 !important;
        }

        .${VOICELINK_CLASS}_tag-yellow{
            background-color: #FFF8E1 !important;
            color: #F57F17 !important;
        }

        .${VOICELINK_CLASS}_tag-green{
            background-color: #dcf5e4 !important;
            color: #34A853 !important;
        }

        .${VOICELINK_CLASS}_tag-teal{
            background-color: #d8eced !important;
            color: #0097A7 !important;
        }

        .${VOICELINK_CLASS}_tag-gray{
            background-color: #E0E0E0 !important;
            color: #424242 !important;
        }

        .${VOICELINK_CLASS}_tag-pink{
            background-color: #ffd9e7 !important;
            color: #f032a7 !important;
        }

        .${VOICELINK_CLASS}_tag-orange{
            background-color: #ffebcc !important;
            color: #f04000 !important;
        }

        .${VOICELINK_CLASS}_tag-darkblue{
            background-color: #d2e7fa !important;
            color: #0D47A1 !important;
        }

        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_reset-btn-small {
            position: relative !important;
            display: inline-block !important;
            width: 16px !important;
            height: 16px !important;
            margin-right: 4px !important;
            padding: 0 !important;
            color: transparent !important;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA6xJREFUeF7tmlFy2jAQhn+ZHIScJOEixYQ++BYJt/BDSU0vUnKSuvcoVkeq3RpXsndlScYAMzwwyLL20+rXarUCN/4RN24/7gDuHnDjBO5LYEoHSF+ytHjPiynHMJkHrLfZVwApgOKwzzdTQZgEQMv4xu7JIEQHYDB+UghRAfQYDyGwKr7kx9hLIRqASzRewY4C4FKNjwKgz3gAZesLIfGhBhVzawzqAQPG9y13DUZIHFDhWBS5+h3kEwxA+jl7lhLfPYxaGX8UJ+xCgAgHIM2WVYK1EHjzAEF1UUqJ4tt7vvPUn+4mGADVeeofggYhTlj58oagAAgQSiGwwS+UeMASFZZS4KkOkXs1wpc3BAdAgmCYUeU9coHXPhhS4m3skogCwBVC85xcQB2cnk0uMRZCNAAECMfDPl+ZjBzQEr2MXMPoqAB6IJSHff44pO6fXrJXy67iLIzRARggkIxv4KgkihR6SXQ/rH6ahycB0IbgImI2TxASG24YPRmAIXcf+t8Cge0FswVQb5Mq1F62YXG9YLYA9DIy6wHLC+YN4E+w9F+MwMkuzRqA8gKTFnCCo9kDqLXgR0c0rUFVV1xnD0AZtN5mSgzPQuXDPifZRmo0tCVN/b8JgDjhkXJkvhYAzS3T37mgCuFVADAJoVcASmiQdI6jgZOVnGVligeoARHJA0wJTs5WwzHGpa3RA4jngqsAYEq/exXBsXuty6xyngkOoN5rZWdQrJibYxC37XqbqUDo7FDkPQ4w7rUT3eh2Aa23WXdy4B3A2JibO6vU9pYTIbnggiSCTQZHLuAcc1MN4rYbEwWqd5EB2GJuasDBNYzS3pYfpLo/G4CPBATFMGobk/hx4xOWB1i2Q3BfSjWwr50tMcqZfbYHaC2wpKGExI6bkXUFYbt6p4a/7feyPKAlhqarqlE3NFQYNi9Ut8aUy5Xue9gANAR78YPzDQ0FQF/RhasYOwFQg+27pvJ1dd2G0ms88eBjguwMYACCFsakwoGSlembfUKRBTn/5x0AYXDOZS2EvpU9o4x32gW6FIkD/Vf1laC0XWW3+lIJTmM9QPN+X1vvqCXQhtGjCTYPb5e+nZ3khgTRVfC8LwGTNwyVtQwZN/C/KpfbjNWVUXEAxYB6r7aWtVD66LQJFmN4WwImo+qokVL1ZXpcC2gC/AwZYQYF0Fils8oPWFYVnoTQmZv2t9ECLZRSokwSfLjW/HC9KwoA7qBitr8DiEn7Et9194BLnJWYY7p5D/gNXP0HX03p5E0AAAAASUVORK5CYII=") !important;
            background-position: center !important;
            background-size: contain !important;
            background-color: transparent !important;
            border-radius: 3px !important;
            border: none !important;
            opacity: 0.5 !important;
        }
        #${VOICELINK_CLASS}_settings-container button.${VOICELINK_CLASS}_reset-btn-small:hover {
            opacity: 1 !important;
        }

        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_button-flat {
            background-color: transparent !important;
            border: none !important;
            color: #aaa !important;
            cursor: pointer !important;
            border-radius: 5px !important;
            padding: 5px 5px !important;
            margin-bottom: 6px !important;
            margin-right: 6px !important;

            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;

            transition: background-color 0.3s !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_button-flat:hover {
            background-color: rgba(0, 0, 0, 0.1) !important;
        }
        #${VOICELINK_CLASS}_settings-container .${VOICELINK_CLASS}_button-flat span{
            display: inline-block !important;
        }
    `
    //endregion

    //region Utilities

    /**
     * Work promise cache
     * @type {{info:{}, api:{}, api2: {}, circle: {}}}
     */
    const work_promise = {};

    function getAdditionalPopupClasses() {
        const hostname = document.location.hostname;
        switch (hostname) {
            case "boards.4chan.org": return "post reply";
            case "discordapp.com": return `${VOICELINK_CLASS}_discord-dark`;
            default: return null;
        }
    }

    function getOS() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Windows NT 10.0") !== -1) return "Windows 10";
        if (userAgent.indexOf("Windows NT 6.2") !== -1) return "Windows 8";
        if (userAgent.indexOf("Windows NT 6.1") !== -1) return "Windows 7";
        if (userAgent.indexOf("Windows NT 6.0") !== -1) return "Windows Vista";
        if (userAgent.indexOf("Windows NT 5.1") !== -1) return "Windows XP";
        if (userAgent.indexOf("Windows NT 5.0") !== -1) return "Windows 2000";
        if (userAgent.indexOf("Mac") !== -1) return "Mac";
        if (userAgent.indexOf("X11") !== -1) return "UNIX";
        if (userAgent.indexOf("Linux") !== -1) return "Linux";
        return "Other";
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
        const charMapRegs = {
            "\\/": "／",
            "\\\\": "＼",
            "\\:": "：",
            "\\*": "＊",
            "\\?": "？",
            "\"": "＂",
            "\\<": "＜",
            "\\>": "＞",
            "\\|": "｜"
        }

        let fileName = original;
        for (let key in charMapRegs){
            fileName = fileName.replaceAll(new RegExp(key, "g"), charMapRegs[key]);
        }
        return fileName;
    }

    function getXmlHttpRequest() {
        return (typeof GM !== "undefined" && GM !== null ? GM.xmlHttpRequest : GM_xmlhttpRequest);
    }

    function getHttpAsync (url, anonymous = false, cacheAge = 0, customHeaders = {}){
        let headers = {...customHeaders};
        headers["Accept"] = "text/xml";
        headers["User-Agent"] = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:67.0)";
        headers["Cache-Control"] = cacheAge <= 0 ? "no-cache" : "max-age=" + cacheAge;
        return new Promise((resolve, reject) => {
            getXmlHttpRequest()({
                method: "GET",
                url,
                headers: headers,
                onload: resolve,
                onerror: resp => {
                    reject(resp);
                },
                anonymous: anonymous
            });
        })
    }

    /**
     * 将文本转化成 'SHA-256|原文本长度' 格式的哈希字符串
     * @param text {string} 待转换的文本
     * @returns {Promise<string>}
     */
    async function hash(text) {
        const enc = new TextEncoder();
        const data = enc.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('') + `|${text.length.toString(16)}`;
    }

    //endregion

    //region DLSite页面覆盖

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
        let titleHtml = title.innerHTML;

        const button = document.createElement("button");
        button.id = `${VOICELINK_CLASS}_copy_btn`;
        button.innerText = "📃";
        button.addEventListener("mouseenter", function(){
            button.innerText = "📃 复制为有效文件名";
        });
        button.addEventListener("mouseleave", function(){
            button.innerText = "📃";
        });
        button.addEventListener("click", function(){
            const fileName = convertToValidFileName(titleStr);
            // const promise = navigator.clipboard.writeText(fileName);
            const promise = GM_setClipboard(fileName, "text");
            promise?.then(() => {
                button.innerText = "✔ 复制成功";
            });
            promise?.catch(e => {
                window.prompt("复制失败，请手动复制", fileName);
                button.innerText = "📃";
            });
        });

        title.style.setProperty("user-select", "text", "important");  //userSelect = "text !important";
        title.classList.add(`${VOICELINK_CLASS}_work_title`);

        if(settings._s_show_translated_title_in_dl){
            //将Title替换成大家翻对应的语言翻译版本
            WorkPromise.getTranslationInfo(rj).then(info => {
                if(info.is_original) {
                    return null;
                }
                else{
                    return WorkPromise.getWorkTitle(rj);
                }
            }).then(t => {
                if(!t){
                    if(settings._s_copy_as_filename_btn) title.appendChild(button);
                    return;
                }
                compatibilityCheck(title, titleHtml);
                titleStr = t
                title.innerText = t
                if(settings._s_copy_as_filename_btn) title.appendChild(button);
            })
        }else{
            if(settings._s_copy_as_filename_btn) title.appendChild(button);
        }
    }

    function compatibilityCheck(titleElement, titleHtml){
        if(!settings._s_show_compatibility_warning) return;

        if(titleElement.innerHTML.trim() === titleHtml.trim()){
            return;
        }

        //其它脚本修改了标题内部，进行警告
        window.alert("警告：\n" +
            "VoiceLinks检测到DL作品标题元素发生变化，该变化可能是脚本与其它插件冲突导致的。\n" +
            "可以关闭本脚本中的 “在DLSite显示对应语言的翻译标题” 设置项，以尝试解决冲突。（也可根据情况酌情关闭 “在DL作品标题旁添加复制为文件名按钮” 选项）\n\n" +
            "本脚本的设置方法：点击Tampermonkey等扩展程序的按钮，在弹出的脚本列表中找到当前脚本，点击下方的Settings按钮即可打开设置页面。\n\n" +
            "注意：如果不想看到该警告，可以同时关闭“显示兼容性警告”设置项。")
    }

    //endregion

    //region 解析器

    const Parser = {
        walkNodes: function (elem) {
            const rjNodeTreeWalker = document.createTreeWalker(
                elem,
                NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        if(node.nodeName === "SCRIPT" || node.parentElement && node.parentElement.nodeName === "SCRIPT"){
                            return NodeFilter.FILTER_REJECT;
                        }

                        if(node.parentElement.isContentEditable){
                            return NodeFilter.FILTER_SKIP;
                        }

                        if(settings._s_parse_url && node.nodeName === "A"){
                            if(!settings._s_parse_url_in_dl && document.location.hostname.endsWith("dlsite.com")){
                                return NodeFilter.FILTER_SKIP;
                            }

                            let href = node.href;
                            if(href.match(URL_REGEX) && !node.classList.contains(VOICELINK_IGNORED_CLASS)){
                                return NodeFilter.FILTER_ACCEPT;
                            }
                        }

                        if (node.nodeName !== "#text") return NodeFilter.FILTER_SKIP;
                        if(node.parentElement.classList.contains(VOICELINK_IGNORED_CLASS)
                            || node.parentElement.hasAttribute(RJCODE_ATTRIBUTE)){
                            return NodeFilter.FILTER_SKIP;
                        }

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

        wrapPlaceholder: function (content) {
            let e;
            e = document.createElement("span");
            e.classList = VOICELINK_CLASS;
            e.innerText = content;
            e.classList.add(VOICELINK_IGNORED_CLASS);
            e.setAttribute(RJCODE_ATTRIBUTE, "");
            return e;
        },

        wrapRJCode: function (rjCode) {
            let e;
            e = document.createElement("a");
            e.classList = VOICELINK_CLASS;
            e.href = `https://www.dlsite.com/maniax/work/=/product_id/${rjCode.toUpperCase()}.html`
            e.innerText = rjCode;
            e.target = "_blank";
            e.rel = "noreferrer";
            e.classList.add(VOICELINK_IGNORED_CLASS);
            e.style.setProperty("display", "inline", "important");  //display = "inline !important";

            e.setAttribute(RJCODE_ATTRIBUTE, rjCode.toUpperCase());
            e.setAttribute("voicelink-linkified", "true");
            e.addEventListener("mouseover", Popup.over);
            e.addEventListener("mouseout", Popup.out);
            e.addEventListener("mousemove", Popup.move);
            e.addEventListener("keydown", Popup.keydown);
            //e.addEventListener("keyup", Popup.keyup);
            return e;
        },

        calculateCoverage: function(text){
            const matches = text.match(RJ_REGEX);
            if (!matches) return 0;
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
            e.addEventListener("keydown", Popup.keydown);
            //e.addEventListener("keyup", Popup.keyup);
        },

        linkify: function (textNode) {
            const nodeOriginalText = textNode.nodeValue;
            const matches = [];

            let insert = settings._s_url_insert_mode;
            let tagA = textNode.parentElement.closest("a");
            let tagB = textNode.parentElement.closest("button");
            let tag = tagA ? tagA : tagB;
            if((!tagA && !tagB) || insert.trim() !== "none" && this.calculateCoverage(tag.innerText) < 71){
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
                let rjLinkNode = Parser.wrapRJCode(code);
                //保证后续游走时忽略当前节点
                if(insert.startsWith("before_rj")){
                    //用导向文本替代RJ号链接，RJ号保留到后面的文本里不变
                    rjLinkNode.innerText = settings._s_url_insert_text;
                    textNode.parentNode.insertBefore(
                        rjLinkNode,
                        prevNode ? prevNode.nextSibling : textNode.nextSibling,
                    );
                    prevNode = rjLinkNode;
                    rjLinkNode = Parser.wrapPlaceholder(code);
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
                let substring = nodeOriginalText.substring(matches[i].index + matches[i].value.length, nextRJ);

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
        },

        rebindEvents: function (elem) {
            if (elem.nodeName === "A") {
                elem.addEventListener("mouseover", Popup.over);
                elem.addEventListener("mouseout", Popup.out);
                elem.addEventListener("mousemove", Popup.move);
                elem.addEventListener("keydown", Popup.keydown);
                //elem.addEventListener("keyup", Popup.keyup);
            }
            else {
                const voicelinks = elem.querySelectorAll("." + VOICELINK_CLASS);
                for (let i = 0, j = voicelinks.length; i < j; i++) {
                    const voicelink = voicelinks[i];
                    voicelink.addEventListener("mouseover", Popup.over);
                    voicelink.addEventListener("mouseout", Popup.out);
                    voicelink.addEventListener("mousemove", Popup.move);
                    voicelink.addEventListener("keydown", Popup.keydown);
                    //voicelink.addEventListener("keyup", Popup.keyup);
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
        getCountDownDateElement: function(date){
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
            let element = document.createElement("span");
            element.innerText = `(Coming in ${days} day${(days > 1 ? "s" : "")})`;
            element.style.setProperty("color", "#ffeb3b", "important");
            element.style.setProperty("font-style", "italic", "important");
            return element;
            //return `<span style="color:#ffeb3b !important; font-size: 16px !important; font-style: italic !important; margin-left: 16px !important"></span>`
        },
    }

    //endregion

    //region 搜索支持

    class SearchProfile {
        /**
         * @param name {string}
         * @param searchUrlTemplate {string}
         * @param showUrlTemplate {string}
         * @param apiType {string}
         * @param customHeaders {{}}
         */
        constructor(name, searchUrlTemplate, showUrlTemplate, apiType, customHeaders) {
            this.name = name;
            this.searchUrlTemplate = searchUrlTemplate;
            this.showUrlTemplate = showUrlTemplate;
            this.apiType = apiType;
            this.customHeaders = customHeaders;
            this.enabled = true;

            this.init(apiType);
        }

        init(apiType) {
            if(apiType === "kikoeru") {
                //http://192.168.196.226:8088/api/search?page=1&sort=desc&order=release&nsfw=0&lyric=&seed=26&isAdvance=0&keyword=%s
                let apiPos = this.searchUrlTemplate.lastIndexOf("/api/");
                let showPos = this.showUrlTemplate.lastIndexOf("/works");

                if(apiPos >= 0 && this.showUrlTemplate === "") {
                    let urlPrefix = this.searchUrlTemplate.substring(0, apiPos);
                    this.showUrlTemplate = `${urlPrefix}/works?keyword=%s`;
                }else if(showPos >= 0 && this.searchUrlTemplate === "") {
                    let urlPrefix = this.showUrlTemplate.substring(0, showPos);
                    this.searchUrlTemplate = `${urlPrefix}/api/search?page=1&sort=desc&order=release&nsfw=0&lyric=&seed=26&isAdvance=0&keyword=%s`;
                }
            }
        }

        async getHash() {
            return await hash(`${this.apiType}|${this.searchUrlTemplate}`)
        }
    }

    class SearchWorkInfo {
        constructor(workno, type, lang) {
            this.workno = workno;
            this.type = type;
            this.lang = lang;
        }
    }

    class SearchResult {

        /*
        一共有以下几种情况：
        1. 有/无本作
        2. 有原版
        3. 有翻译版（未知子版本）
        4. 有翻译版（其它子版本）
        5. 有翻译版（其它语言）

        各种组合方案预览（极端情况）：
        对原版来说：
        ---
        已存：本作、翻译（简中-2/繁中-1/英-1）
        未存本作｜已存：翻译（简中-2/繁中-1/英-1）
        ---
        ✔ 本作 翻译 (简中-2/繁中-1/英-1)
        ✔ 本作 翻译(简中/繁中/英...

        ✘本作｜✔ 翻译 (简中-2/繁中-1/英-1)
        ✘本作｜✔ 翻译(简中/繁中/英...  [只有用父作品当rj时会显示这些翻译结果]

        对翻译版父RJ来说：
        ---
        已存：此语言、原版、翻译 (简中-2/繁中-1/英-1)
        未存此语言｜已存：原版、翻译 (繁中-1/英-1)
        ---
        ✔ 此语言 原版 翻译(简中-2/繁中-1/英-1)     ✔ Lang, Orig, 🌐(SC-2/TC-1/EN-1)
        ✔ 此语言(简中-2) 原版...

        ✘此语言｜✔ 原版 翻译(繁中-1/英-1)
        ✘此语言｜✔ 原版...

        对子RJ来说：
        ---
        已存：本作、原版、翻译 (简中-2/繁中-1/英-1)
        未存本作｜已存：原版、翻译 (简中-1/繁中-1/英-1)
        ---
        ✔ 本作 原版 翻译(简中-2/繁中-1/英-1)     ✔ This, Orig, 🌐(SC-2/TC-1/EN-1)
        ✔ 本作 原版...

        ✘本作｜✔ 原版 翻译(简中-1/繁中-1/英-1)       ✘This｜✔ This, 🌐(SC-1/TC-1/EN-1)
        ✘本作｜✔ 原版...
         */

        #analyzeInfo = null;

        /**
         * @param searchProfileName {string}
         * @param searchWorkInfo {SearchWorkInfo}
         * @param resultList {[SearchWorkInfo]}
         */
        constructor(searchProfileName, searchWorkInfo, resultList) {
            this.profileName = searchProfileName;
            this.workInfo = searchWorkInfo;

            /**
             * @type {{String: SearchWorkInfo}}
             */
            this.result = {};

            for (let res of resultList) {
                this.result[res.workno] = res;
            }
        }

        analyze() {
            if (this.#analyzeInfo) {
                return this.#analyzeInfo;
            }
            let work = this.workInfo;
            let result = this.result;
            let info = {
                hasCurrent: false,
                hasOriginal: false,
                hasTranslation: false,
                langList: {},
            }

            for (const res of Object.values(result)) {
                if (res.workno === work.workno) {
                    info.hasCurrent = true;
                }

                if(work.type === "parent" && res.type === "child" && work.lang === res.lang){
                    info.hasCurrent = true;
                }

                if(work.type !== "original" && res.type === "original") {
                    info.hasOriginal = true;
                }

                if (res.type !== "original") {
                    info.hasTranslation = true;

                    let ll = info.langList;
                    ll[res.lang] = ll[res.lang] ? ll[res.lang] : 0;
                    ll[res.lang] += res.type === "child" ? 1 : 11;
                }
            }

            this.#analyzeInfo = info;
            return info;
        }

        getStatusText() {
            let etc = !settings._s_full_linkage || !settings._s_search_linkage;
            let work = this.workInfo;
            let info = this.analyze();
            let text = info.hasCurrent ?
                `✔ ${work.type === "parent" ? localizePopup(localizationMap.search_result_this_lang) : localizePopup(localizationMap.search_result_this)}` :
                `✘ ${work.type === "parent" ? localizePopup(localizationMap.search_result_this_lang) : localizePopup(localizationMap.search_result_this)}`;
            if (info.hasOriginal || info.hasTranslation){
                text += info.hasCurrent ? ` ` : `｜✔ `;
            }
            if (info.hasOriginal){
                text += `${localizePopup(localizationMap.search_result_orig)}${info.hasTranslation ? " " : ""}`;
            }
            if (info.hasTranslation){
                text += `${localizePopup(localizationMap.search_result_translation)}`
            } else {
                return `${text}${etc ? "..." : ""}`;
            }

            let str = "";
            for (let lang of settings._ss_cue_lang) {
                let langStr = LANG_MAP_ABBR[lang];
                let langCot = info.langList[lang];
                if(!langCot || langCot % 10 === 0) continue;

                str += `${langStr}x${langCot % 10}${langCot > 11 ? "?" : ""}/`
            }
            if(!str.endsWith("/")){
                //代表语言的括号内是空的，说明有该作品但是语言不在cue lang中，此时在里面加"..."代表还有未知语言
                //TODO 以后改成按已有语言展示而不是按cue lang展示
                etc = true;
            }else{
                str = str.substring(0, str.length - 1);
            }

            return `${text}(${str}${etc ? "..." : ""})`;
        }
    }

    //endregion

    //region 缓存系统

    class DataCache {
        _data;
        _timeAdd;
        _timeUpdate;
        _timeAccess;
        _timeExpire = 0;
        constructor(data, timeExp = 0) {
            this._data = data;
            this._timeAdd = Date.now();
            this._timeUpdate = undefined;
            this._timeAccess = undefined;
            this._timeExpire = timeExp;
        }

        get data() {
            this._timeAccess = Date.now();
            return this._data;
        }
        get timeAdd() { return this._timeAdd; }
        get timeUpdate() { return this._timeUpdate; }
        get timeAccess() { return this._timeAccess; }
        get timeExpire() { return this._timeExpire; }
        get hasExpired() { return this._timeExpire > 0 && this._timeExpire < Date.now()}  //0代表无过期时间

        set timeExpire(value) {
            if(typeof value !== "number" || value < 0) return;
            this._timeExpire = value;
        }

        update(data, expTime = -1) {
            this._data = data;
            this._timeUpdate = Date.now();
            this.timeExpire = expTime;
        }
    }

    class DataCacheStorage {
        static #activeStorages = {}
        _name;
        _maxSize;
        _autoSave;
        _dropExpired;
        _dataMap;

        get #head() { return this._dataMap["-head"]; }
        get #tail() { return this._dataMap["-tail"]; }

        get name() { return this._name; }
        get maxSize() { return this._maxSize; }
        get autoSave() { return this._autoSave; }
        get dropExpired() { return this._dropExpired; }

        /**
         * @param value {string}
         */
        set name(value) {
            if(typeof value !== "string") throw new Error("Invalid Storage Name");
            this._name = value;
        }

        /**
         * @param value {number}
         */
        set maxSize(value) {
            if(typeof value !== "number" || value <= 0) return;
            this._maxSize = value;
        }

        /**
         * @param value {boolean}
         */
        set autoSave(value) {
            if(typeof value !== "boolean") return;
            this._autoSave = value;
        }

        /**
         * @param value {boolean}
         */
        set dropExpired(value) {
            if(typeof value !== "boolean") return;
            this._dropExpired = value;
        }

        /**
         * 不要在外部调用该构造器，请使用CacheStorage.open()
         */
        constructor(name, maxSize = 128, dropExpired = false, autoSave = true) {
            this.name = name;
            this._dataMap = {
                "-head": {next: "-tail", prev: null},
                "-tail": {next: null, prev: "-head"}
            };
            this.maxSize = maxSize;
            this.dropExpired = dropExpired;
            this.autoSave = autoSave;
        }

        static fromObject(obj, name) {
            if(!obj._name) return new DataCacheStorage(name);
            let storage = Object.assign(new DataCacheStorage(name), obj);
            for (const keyX in storage._dataMap) {
                let node = storage._dataMap[keyX];
                let cache = node.cache;
                if(cache) {
                    cache = Object.assign(new DataCache(null, -1), cache);
                    node.cache = cache;
                }
            }
            return storage;
        }

        /**
         * 打开指定的缓存库，若库不存在则会新建。可通过额外参数指定或覆盖缓存库设置
         * @param storageName {string} 库名称
         * @param maxSize {number} 最大缓存记录条数
         * @param dropExpired {boolean} 是否删除过期记录
         * @param autoSave {boolean} 是否自动保存
         * @param replaceProp {boolean} 如果库已存在，是否使用设置的值替换原有设置
         * @returns {DataCacheStorage} 名称对应的存储库
         */
        static open(storageName, maxSize = undefined, dropExpired = undefined, autoSave = undefined, replaceProp = false) {
            if (!(storageName in this.#activeStorages)) {
                this.#activeStorages[storageName] = DataCacheStorage.fromObject(GM_getValue(`cache_${storageName}`, new DataCacheStorage(storageName, maxSize, dropExpired, autoSave)), storageName);
            }
            let storage = this.#activeStorages[storageName];

            if(replaceProp){
                storage.maxSize = maxSize;
                storage.dropExpired = dropExpired;
                storage.autoSave = autoSave;
            }

            if(storage.dropExpired) {
                storage.dropExpiredCache();
            }

            return this.#activeStorages[storageName];
        }

        static dropStorage(storageName) {
            if(storageName in this.#activeStorages){
                delete this.#activeStorages[storageName];
            }
            GM_deleteValue(`cache_${storageName}`);
        }

        /**
         * 保存缓存库至持久化存储
         */
        save() {
            GM_setValue(`cache_${this.name}`, this);
        }

        #disconnectNode(node) {
            if(node.next) this._dataMap[node.next].prev = node.prev;
            if(node.prev) this._dataMap[node.prev].next = node.next;

            node.next = null;
            node.prev = null;
        }

        #moveNodeNextTo(key, node, prevKey) {
            let keyX = "_" + key;
            let prevKeyX = prevKey ? "_" + prevKey : "-head";
            this.#disconnectNode(node);

            node.prev = prevKeyX;
            node.next = this._dataMap[prevKeyX].next;
            this._dataMap[prevKeyX].next = keyX;
            this._dataMap[node.next].prev = keyX;
        }

        #moveNodeBefore(key, node, nextKey) {
            let keyX = "_" + key;
            let nextKeyX = nextKey ? "_" + nextKey : "-tail";
            this.#disconnectNode(node);

            node.next = nextKeyX;
            node.prev = this._dataMap[nextKeyX].prev;
            this._dataMap[nextKeyX].prev = keyX;
            this._dataMap[node.prev].next = keyX;
        }

        #sizeLimitCheck() {
            let overflow = Object.keys(this._dataMap).length - 2 - this.maxSize;
            for (let i = 0; i < overflow; i++) {
                if(this.#head.next === "-tail") break;
                this.drop(this.#head.next);
            }
        }

        #isExpired(key) {
            let keyX = "_" + key;
            if(!(keyX in this._dataMap)) return true;
            let cache = this._dataMap[keyX].cache;
            let expired = cache.hasExpired;

            if (expired && this.dropExpired) this.drop(key);
            return expired;
        }

        /**
         * 提交或新增对缓存记录的更改
         * @param key {string}
         * @param data {*}
         * @param expTime {number} 过期时间（毫秒数），为-1则不修改
         */
        commit(key, data, expTime = -1) {
            let keyX = "_" + key;
            let node = this._dataMap[keyX];
            if (node) {
                node.cache.update(data, expTime);
            } else {
                node = {
                    cache: new DataCache(data, expTime),
                    next: null,
                    prev: null
                };
                this._dataMap[keyX] = node;
                this.#sizeLimitCheck();
            }
            this.#moveNodeBefore(key, node, null);

            if(this.autoSave) this.save();
        }

        /**
         * 删除指定key对应的缓存记录
         * @param key {string}
         */
        drop(key) {
            let keyX = "_" + key;
            if (!(keyX in this._dataMap)) return;
            this.#disconnectNode(this._dataMap[keyX])
            delete this._dataMap[keyX];

            if(this.autoSave) this.save();
        }

        /**
         * 删除所有过期的缓存记录
         */
        dropExpiredCache() {
            for (let keyX in this._dataMap){
                if(keyX.startsWith("-")) continue;
                let node = this._dataMap[keyX];
                if(!node.cache.hasExpired) continue;

                this.drop(keyX.substring(1));
            }
        }

        /**
         * 获取指定缓存记录的数据
         * @param key {string}
         * @returns {*}
         */
        get(key) {
            let keyX = "_" + key;
            let value;
            if(keyX in this._dataMap && !this.#isExpired(key)) {
                this.#moveNodeBefore(key, this._dataMap[keyX], null);
                value = this._dataMap[keyX].cache.data;
            }

            if(this.autoSave) this.save();
            return value;
        }

        /**
         * 获取key对应的缓存对象（包含添加、修改、访问时间信息），注意该方法不会触发自动保存。
         * @param key {string}
         * @param keepExpired {boolean} 是否返回已过期的缓存记录？（如果缓存已删除，如设置了dropExpired为true，则无法获取到对象）
         * @returns {DataCache}
         */
        getCache(key, keepExpired) {
            let keyX = "_" + key;
            let value;
            if(keyX in this._dataMap && (keepExpired || !this.#isExpired(key))) {
                this.#moveNodeBefore(key, this._dataMap[keyX], null);
                value = this._dataMap[keyX].cache;
            }

            //if(this.autoSave) this.save();
            return value;
        }
    }

    //endregion

    //region 弹框生成 & 更新

    const Popup = {
        popupElement: {
            popup: null,
            not_found: null,
            left_panel: null,
            img: {container: null},
            right_panel: null,
            title: null,
            rj_code: null,
            info_container: null,
            loader: null,
            flag: null,
            tags: null,
            dl_count: null,
            circle_name: null,
            debug: null,
            translator_name: null,
            release_date: null,
            update_date: null,
            age_rating: null,
            scenario: null,
            illustration: null,
            voice_actor: null,
            music: null,
            genre: null,
            file_size: null,

            _state: {
                workno: undefined,
                mouseX: 0,
                mouseY: 0
            }
        },

        get currentWorkno() {
            return Popup.popupElement._state.workno;
        },

        isCurrentWork(workno) {
            return Popup.popupElement._state.workno === workno;
        },

        setCurrentWork(workno) {
            Popup.popupElement._state.workno = workno;
        },

        makePopup: function (display) {
            const popup = document.createElement("div");
            const ele = Popup.popupElement;
            ele.popup = popup;

            popup.className = `${VOICELINK_CLASS}_voicepopup ${VOICELINK_CLASS}_voicepopup-maniax ` + (getAdditionalPopupClasses() || '');
            popup.id = `${VOICELINK_CLASS}-voice-popup`;  // + rjCode;
            popup.style.setProperty("display", display === false ? "none" : "flex", "important");  //display = display === false ? "none" : "flex";
            document.body.appendChild(popup);

            popup.addEventListener("mouseenter", () => {
                popup.setAttribute("mouse-in", "");
            });
            popup.addEventListener("mouseleave", () => {
                popup.removeAttribute("mouse-in");
            })

            const notFoundElement = document.createElement("div");
            ele.not_found = notFoundElement;
            //占满整个popup
            //"display: none; width: 100%; height: 100%";
            notFoundElement.style.setProperty("display", "none", "important");
            notFoundElement.style.setProperty("width", "100%", "important");
            notFoundElement.style.setProperty("height", "100%", "important");
            notFoundElement.innerText = "Work Not Found.";
            popup.appendChild(notFoundElement);

            const leftPanel = document.createElement("div");
            leftPanel.classList.add(`${VOICELINK_CLASS}_left_panel`);
            popup.appendChild(leftPanel);
            ele.left_panel = leftPanel;

            const imgContainer = document.createElement("div")
            imgContainer.classList.add(`${VOICELINK_CLASS}_img_container`);
            ele.img.container = imgContainer;
            leftPanel.appendChild(imgContainer);

            //左下角提示状态栏
            ele.hint = document.createElement("div");
            leftPanel.appendChild(ele.hint);
            ele.hint.id = `${VOICELINK_CLASS}_hint`;

            const rightPanel = document.createElement("div");
            ele.right_panel = rightPanel;

            const titleElement = Popup.createCopyTag("div", "", false, localizePopup(localizationMap.hint_copy_work_title));
            ele.title = titleElement;
            titleElement.classList.add(`${VOICELINK_CLASS}_voice-title`);
            rightPanel.appendChild(titleElement);

            const rjCodeElement = document.createElement("div");
            ele.rj_code = rjCodeElement;
            rjCodeElement.classList.add(`${VOICELINK_CLASS}_rjcode`);
            rightPanel.appendChild(rjCodeElement);

            const infoContainer = document.createElement("div");
            ele.info_container = infoContainer;
            infoContainer.id = `${VOICELINK_CLASS}_info-container`;
            infoContainer.style.setProperty("position", "relative", "important");  //position = "relative !important";
            infoContainer.style.setProperty("min-height", "70px", "important");  //minHeight = "70px !important";
            rightPanel.appendChild(infoContainer);

            const loader = document.createElement("div");
            loader.className = `${VOICELINK_CLASS}_loader`;
            loader.innerHTML = Csp.createHTML(`
            <div class="${VOICELINK_CLASS}_dot"></div>
            <div class="${VOICELINK_CLASS}_dot"></div>
            <div class="${VOICELINK_CLASS}_dot"></div>
            `);
            ele.loader = loader;
            infoContainer.appendChild(loader);

            ele.tags = document.createElement("div");
            infoContainer.appendChild(ele.tags);

            ele.dl_count = document.createElement("div");
            ele.circle_name = document.createElement("div");
            ele.debug = document.createElement("div");
            ele.translator_name = document.createElement("div");
            ele.release_date = document.createElement("div");
            ele.update_date = document.createElement("div");
            ele.age_rating = document.createElement("div");
            ele.scenario = document.createElement("div");
            ele.illustration = document.createElement("div");
            ele.voice_actor = document.createElement("div");
            ele.music = document.createElement("div");
            ele.genre = document.createElement("div");
            ele.file_size = document.createElement("div");

            rightPanel.style.setProperty("padding-bottom", "3px", "important");  //paddingBottom = "3px !important";
            rightPanel.style.setProperty("flex-grow", "1", "important");  //flexGrow = "1 !important";
            popup.appendChild(rightPanel);
            popup.insertBefore(leftPanel, popup.childNodes[0]);
        },

        updatePopup: function(e, rjCode, isParent=false) {
            const ele = Popup.popupElement;
            const popup = ele.popup;
            popup.className = `${VOICELINK_CLASS}_voicepopup ${VOICELINK_CLASS}_voicepopup-maniax ` + (getAdditionalPopupClasses() || '');
            // popup.id = "voice-" + rjCode;
            popup.style.setProperty("display", "flex", "important");  //= "display: flex";
            popup.setAttribute(RJCODE_ATTRIBUTE, rjCode);
            Popup.setCurrentWork(rjCode);

            //------检查作品存在情况------
            let workFound = true;
            Popup.setFoundState(true);
            WorkPromise.getFound(rjCode).then(async found => {
                if(!Popup.isCurrentWork(rjCode)) return;

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
                if(!Popup.isCurrentWork(rjCode)) return;

                const found = state.found;
                const rj = state.parentRJ;
                if(found && rj !== rjCode){
                    //如果找到了父作品的信息但子作品找不到，就重新update
                    Popup.updatePopup(e, rj, true);
                    return;
                }

                ele.not_found.style.setProperty("display", found ? "none" : "block", "important");  //display = found ? "none" : "block";
                Popup.setFoundState(found);
                workFound = found;
            });

            //------检查是否为女性向------
            WorkPromise.getGirls(rjCode).then(isGirls => {
                if(!Popup.isCurrentWork(rjCode)) return;
                if(isGirls) popup.className += (` ${VOICELINK_CLASS}_voicepopup-girls`)
            }).catch(e => {});

            //------获取作品封面------
            const imgContainer = ele.img.container;

            //NSFW模糊等级
            const blur_map = {
                low: "6px",
                medium: "12px",
                high: "24px"
            };

            //先对Container内的所有img进行隐藏
            for (let i = 0; i < imgContainer.childNodes.length; ++i) {
                imgContainer.childNodes[i].style.setProperty("display", "none", "important");  //display = "none !important";
            }

            //NOTE: 注意这里可能因为快速的多次获取导致同时加载两个图片，可使用占位符来预先占用图片位置
            new Promise((resolve, reject) => {
                let img = ele.img[rjCode];
                if(img) resolve(img);
                else throw Error("首次加载图片");
            }).catch(_ => {
                //首次加载图片，对图片添加占位
                ele.img[rjCode] = 1;
                return WorkPromise.getImgLink(rjCode);
            }).then(link => {
                if(typeof link !== "string"){
                    //图片已经加载过，传递的是img，不通过当前then
                    return link;  //实际上是img
                }

                if(!Popup.isCurrentWork(rjCode)) {
                    //清除占位
                    ele.img[rjCode] = null;
                    return null;
                }
                let img;
                try{
                    img = GM_addElement("img", {
                        src: link,
                    });
                    if(!img) { // noinspection ExceptionCaughtLocallyJS
                        throw new Error("API调用生成失败");
                    }
                }catch (e) {
                    img = document.createElement("img");
                    img.src = link;
                }

                imgContainer.appendChild(img);
                console.warn("添加封面！")
                ele.img[rjCode] = img;

                //开启动画
                if(settings._s_sfw_blur_transition){
                    img.style.setProperty("transition", "all 0.3s", "important");
                }

                //鼠标移动上去解除模糊
                img.addEventListener("mouseenter", e => {
                    if(!settings._s_sfw_remove_when_hover){
                        return;
                    }
                    img.style.setProperty("filter", "inherit", "important");
                });
                img.addEventListener("mouseleave", e => {
                    if(settings._s_sfw_mode){
                        img.style.setProperty("filter", `blur(${blur_map[settings._s_sfw_blur_level]})`, "important");
                    }else{
                        img.style.setProperty("filter", "inherit", "important");
                    }
                });

                return img;
            }).then(img => {
                if(!(img instanceof HTMLElement)) return;
                img.style.setProperty("display", "block", "important");  //display = "block"

                //设置NSFW模糊
                if(settings._s_sfw_mode){
                    img.style.setProperty("filter", `blur(${blur_map[settings._s_sfw_blur_level]})`, "important");
                }else{
                    img.style.setProperty("filter", "inherit", "important");
                }
            }).catch(e => {
                //清理并在下次重试
                if(ele.img[rjCode] instanceof HTMLElement) img.remove();
                ele.img[rjCode] = null;
                console.error(e)
            });

            //------设置hint可见------
            ele.hint.style.setProperty("display", "block", "important");

            //------设置标题------
            const titleElement = ele.title;
            titleElement.innerText = "Loading...";
            titleElement.setHint(localizePopup(localizationMap.hint_copy_work_title));
            titleElement.setCopyText(null);
            titleElement.setSecondaryCopyText(null);
            WorkPromise.getWorkTitle(rjCode).then(title => {
                if(!Popup.isCurrentWork(rjCode)) return;
                titleElement.innerText = title;
                titleElement.setCopyText(title);
                titleElement.setSecondaryCopyText(convertToValidFileName(title));
            }).catch(_ => {
                if(!Popup.isCurrentWork(rjCode)) return;
                titleElement.innerHTML = Csp.createHTML("");
            })

            //------设置RJ号------
            const rjCodeElement = ele.rj_code;
            rjCodeElement.innerHTML = Csp.createHTML(`[ ${isParent ? " ↑ " : ""}<span class="${VOICELINK_IGNORED_CLASS}" style="font-weight: bold !important;text-decoration-line: underline !important;">${rjCode}</span> ]`);
            WorkPromise.getRJChain(rjCode).then(chain => {
                if(!Popup.isCurrentWork(rjCode)) return;
                rjCodeElement.innerText = "[ ";
                //构造chain
                for (let i = 0; i < chain.length; i++) {
                    const rj = chain[i];
                    let e = Popup.createCopyTag("span", rj);
                    e.innerText = rj;
                    e.classList.add(VOICELINK_IGNORED_CLASS);
                    if(i === 0) {
                        //第一个元素，也就是当前RJ号
                        e.style.setProperty("font-weight", "bold", "important");
                        e.style.setProperty("text-decoration", "underline", "important");
                    }else{
                        rjCodeElement.appendChild(document.createTextNode(" → "));
                    }
                    rjCodeElement.appendChild(e);
                }
                rjCodeElement.appendChild(document.createTextNode(" ]"));
            });

            //清除原有信息并展示加载界面
            for(let child of [...this.popupElement.info_container.children]){
                if(child === this.popupElement.loader) continue;
                child.remove();
            }
            ele.loader.style.setProperty("display", "flex", "important");  //display = "flex !important";
            WorkPromise.getWorkCategory(rjCode).then(category => {
                if(!Popup.isCurrentWork(rjCode)) return;
                this.set_info_container(rjCode, category);
            }).catch(e => {
                if (!Popup.isCurrentWork(rjCode)) return;
                //默认other
                this.set_info_container(rjCode, "other");
            });

            Popup.move(e);
        },

        setFoundState(found){
            const ele = Popup.popupElement;

            ele.not_found.style.setProperty("display", found ? "none" : "block", "important");
            //ele.img.container.style.setProperty("display", found && !Popup.hideImg ? "block" : "none", "important");
            ele.left_panel.style.setProperty("display", found ? "flex" : "none", "important");
            ele.right_panel.style.setProperty("display", found ? "block" : "none", "important");
            ele.title.style.setProperty("display", found ? "block" : "none", "important");
            ele.rj_code.style.setProperty("display", found ? "block" : "none", "important");
            ele.info_container.style.setProperty("display", found ? "block" : "none", "important");
            ele.hint.style.setProperty("display", found ? "block" : "none", "important");
            /*ele.dl_count.style.setProperty("display", found ? "block" : "none", "important");
            ele.circle_name.style.setProperty("display", found ? "block" : "none", "important");
            ele.debug.style.setProperty("display", found ? "block" : "none", "important");
            ele.translator_name.style.setProperty("display", found ? "block" : "none", "important");
            ele.release_date.style.setProperty("display", found ? "block" : "none", "important");
            ele.update_date.style.setProperty("display", found ? "block" : "none", "important");
            ele.age_rating.style.setProperty("display", found ? "block" : "none", "important");
            ele.voice_actor.style.setProperty("display", found ? "block" : "none", "important");
            ele.music.style.setProperty("display", found ? "block" : "none", "important");
            ele.genre.style.setProperty("display", found ? "block" : "none", "important");
            ele.file_size.style.setProperty("display", found ? "block" : "none", "important");*/
        },

        /**
         * 创建可复制标签
         * @param tag {string|HTMLElement} 标签名或标签对象（如果为标签对象，则会将对象原地转化成可复制标签）
         * @param copyText {string} 需要复制的文本
         * @param isTitle {boolean} 是否为标题元素（使用特殊class）
         * @param hint {string} 提示栏显示的提示文本
         * @returns {HTMLElement} 创建/转换后的标签
         */
        createCopyTag: function (tag, copyText, isTitle = false, hint = isTitle ? localizePopup(localizationMap.hint_copy_all) : localizePopup(localizationMap.hint_copy)) {
            tag = (typeof tag === "string") ? document.createElement(tag) : tag;
            if(isTitle) tag.classList.add("info-title");

            //添加自定义方法
            tag.getCopyText = () => tag.getAttribute("copy-text");
            tag.setCopyText = text => {
                if(!text){
                    tag.removeAttribute("copy-text");
                    return;
                }
                tag.setAttribute("copy-text", text);
            };

            tag.getSecondaryCopyText = () => tag.getAttribute("sec-copy-text");
            tag.setSecondaryCopyText = text => {
                if(!text){
                    tag.removeAttribute("sec-copy-text");
                    return;
                }
                tag.setAttribute("sec-copy-text", text);
            };

            tag.getHint = () => tag.getAttribute("hint");
            tag.setHint = hint => {
                tag.setAttribute("hint", hint);
            };

            tag.setCopyText(copyText);
            tag.setHint(hint);
            tag.addEventListener("click", e => {
                const attr = e.altKey ? "sec-copy-text" : "copy-text";
                if(!tag.hasAttribute(attr)) return;
                GM_setClipboard(tag.getAttribute(attr), "text")?.finally();
                // navigator.clipboard.writeText(tag.getAttribute(attr)).finally();
            });
            tag.addEventListener("mouseenter", e => {
                let hint = tag.getHint();
                Popup.popupElement.hint.innerText = hint ? hint : Popup.popupElement.hint.innerText;
            })
            return tag;
        },

        /**
         * 显示某行的信息
         * @param rjCode {string} 信息对应的RJ号
         * @param id {string} 信息对应的ID
         * @param rowElement {HTMLElement} 行对应的Element元素
         * @param title {string} 行信息标题
         * @param contentProvider {Promise<any|Array|HTMLElement>} 无参内容Provider，返回字符串/字符串列表等用于生成文本
         * @param suffixProvider {Promise<HTMLElement>} 无参后缀Provider，返回一个Element用于放在Content后面
         * @param contentSeperator {string, HTMLElement}  Content如果是列表，则该内容为作为分隔符
         * @param contentSeperatorText {string} 如果采用HTMLElement的分隔符，则在复制的时候需要有一个文本表示
         */
        set_info_row: function (rjCode, id, rowElement, title, contentProvider, suffixProvider, contentSeperator = " ", contentSeperatorText = undefined ){
            const settingId = `_s_${id}`;
            //如果设置了不展示信息，或信息没在设置中定义，则不显示
            if(!settings[settingId]) return;

            const ele = Popup.popupElement;
            const popup = ele.popup;
            const titleElement = Popup.createCopyTag("span", "", true);
            titleElement.innerText = title;
            const contentElement = Popup.createCopyTag("span", null);
            contentElement.innerText = "Loading...";

            rowElement.innerHTML = Csp.createHTML("");
            rowElement.appendChild(titleElement);
            rowElement.appendChild(contentElement);

            contentProvider.then(contents => {
                if(!Popup.isCurrentWork(rjCode)) return;
                if(!Array.isArray(contents)){
                    //单个结果转化成列表
                    contents = [contents];
                }

                //处理结果列表
                contentElement.setCopyText(null);
                contentElement.innerText = "";
                //以指定的分隔符文本为准，不指定分隔符文本再使用分隔符内的文本
                let sepText = contentSeperatorText ? contentSeperatorText : contentSeperator.toString();
                let sep;
                if(typeof contentSeperator === "string"){
                    sep = document.createElement("span");
                    sep.innerText = contentSeperator;
                }else{
                    sep = contentSeperator;
                }

                let contentsText = [];
                for (let i = 0; i < contents.length; i++) {
                    let c = contents[i];
                    if(i > 0) {
                        //如果Seperator是Element，则直接复制一个出来添加，否则创建一个span然后把内容转换成文本放进去。
                        contentElement.appendChild(sep.cloneNode(true));
                    }

                    let element;
                    if(c instanceof HTMLElement){
                        element = c;
                    }else{
                        element = Popup.createCopyTag("a", c);
                        element.innerText = c;
                    }

                    //将复制文本加入复制列表
                    const copyText = element.getAttribute("copy-text");
                    if(copyText) contentsText.push(copyText);

                    contentElement.appendChild(element);
                }

                //为标题添加复制文本
                titleElement.setCopyText(contentsText.join(sepText));
            }).catch(e => {
                if(!Popup.isCurrentWork(rjCode)) return;
                rowElement.innerHTML = Csp.createHTML("");
                //console.error(e);
            }).finally(() => {
                Popup.adjustPopup(ele._state.mouseX, ele._state.mouseY, true);
            });

            if(suffixProvider){
                suffixProvider.then((element) => {
                    if(!Popup.isCurrentWork(rjCode)) return;
                    rowElement.appendChild(element);
                }).catch(_ => {});
            }

            return rowElement;
        },
        set_dl_count: function (rjCode, category){
            const id = `${category}__dl_count`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.dl_count, localizePopup(localizationMap.dl_count),
                WorkPromise.getDLCount(rjCode));
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_circle_name: function (rjCode, category){
            const id = `${category}__circle_name`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.circle_name, localizePopup(localizationMap.circle_name),
                WorkPromise.getCircle(rjCode), null);
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_translator_name: function (rjCode, category){
            const id = `${category}__translator_name`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.translator_name,
                localizePopup(localizationMap.translator_name), WorkPromise.getTranslatorName(rjCode), null);
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_release_date: function (rjCode, category){
            const id = `${category}__release_date`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.release_date, localizePopup(localizationMap.release_date),
                WorkPromise.getReleaseDate(rjCode).then(async (date) => {
                    const [dateStr, isAnnounce] = date;
                    const e = Popup.createCopyTag("a", dateStr);
                    e.innerText = dateStr;
                    if(isAnnounce) e.style.setProperty("color", "gold", "important");
                    return e;
                }), WorkPromise.getReleaseCountDownElement(rjCode).then(element => {
                    element.style.setProperty("margin-left", "16px", "important");
                    return element;
                }));

            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_update_date: function (rjCode, category){
            const id = `${category}__update_date`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.update_date, localizePopup(localizationMap.update_date),
                WorkPromise.getUpdateDate(rjCode));
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_age_rating: function (rjCode, category){
            const id = `${category}__age_rating`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.age_rating, localizePopup(localizationMap.age_rating),
                WorkPromise.getAgeRating(rjCode).then(rating => {
                    let ratingClass = `${VOICELINK_CLASS}_age-all`;
                    if(rating.includes("18")){
                        ratingClass = `${VOICELINK_CLASS}_age-18`;
                    }
                    let e = Popup.createCopyTag("a", rating);
                    e.innerText = rating;
                    e.classList.add(ratingClass);
                    return e;
                }));
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_scenario: function (rjCode, category){
            const id = `${category}__scenario`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.scenario, localizePopup(localizationMap.scenario),
                WorkPromise.getScenario(rjCode), null, " / ");
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_illustration: function (rjCode, category){
            const id = `${category}__illustration`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.illustration, localizePopup(localizationMap.illustration),
                WorkPromise.getIllustrator(rjCode), null, " / ");
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_voice_actor: function (rjCode, category){
            const id = `${category}__voice_actor`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.voice_actor, localizePopup(localizationMap.voice_actor),
                WorkPromise.getCV(rjCode), null, " / ");
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_music: function (rjCode, category) {
            const id = `${category}__music`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.music, localizePopup(localizationMap.music),
                WorkPromise.getMusic(rjCode), null, " / ");
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_genre: function (rjCode, category){
            const id = `${category}__genre`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.genre, localizePopup(localizationMap.genre),
                WorkPromise.getTags(rjCode), null, "\u3000");
            if(element) Popup.popupElement.info_container.appendChild(element);
        },
        set_file_size: function (rjCode, category){
            const id = `${category}__file_size`;
            const element = Popup.set_info_row(rjCode, id, Popup.popupElement.file_size, localizePopup(localizationMap.file_size),
                WorkPromise.getFileSize(rjCode));
            if(element) Popup.popupElement.info_container.appendChild(element);
        },

        get_tag: function (text, tagClass) {
            if(!tagClass.startsWith(`${VOICELINK_CLASS}_`)){
                tagClass = `${VOICELINK_CLASS}_${tagClass}`
            }
            const tag = document.createElement("span");
            tag.classList.add(`${VOICELINK_CLASS}_tag_tight`);
            tag.classList.add(tagClass);
            tag.innerText = text;
            return tag;
        },
        get_tag_rate: async function (rjCode) {
            let rate = await WorkPromise.getRateAvg(rjCode);
            let cot = await WorkPromise.getRateCount(rjCode);
            return Popup.get_tag(`${rate.toFixed(2)}★` + (settings._s_show_rate_count ? ` (${cot})` : ""), "tag-yellow");
        },
        get_tag_no_longer_available: async function (rjCode) {
            let sale = await WorkPromise.getSale(rjCode);
            if(sale) return;
            return Popup.get_tag(localizePopup(localizationMap.tag_no_longer_available),
                "tag-gray");
        },
        get_tag_work_type: async function (rjCode) {
            let type = await WorkPromise.getWorkTypeText(rjCode);
            let tagClass = "tag-gray";
            switch (type) {
                case localizePopup(localizationMap.work_type_game):
                    tagClass = "tag-purple";
                    break;
                case localizePopup(localizationMap.work_type_comic):
                    tagClass = "tag-green";
                    break;
                case localizePopup(localizationMap.work_type_illustration):
                    tagClass = "tag-teal";
                    break;
                case localizePopup(localizationMap.work_type_novel):
                    tagClass = "tag-gray";
                    break;
                case localizePopup(localizationMap.work_type_video):
                    tagClass = "tag-darkblue";
                    break;
                case localizePopup(localizationMap.work_type_voice):
                    tagClass = "tag-orange";
                    break;
                case localizePopup(localizationMap.work_type_music):
                    tagClass = "tag-yellow";
                    break;
                case localizePopup(localizationMap.work_type_tool):
                    tagClass = "tag-gray";
                    break;
                case localizePopup(localizationMap.work_type_voice_comic):
                    tagClass = "tag-blue";
                    break;
                case localizePopup(localizationMap.work_type_other):
                    tagClass = "tag-gray";
                    break;
                default:
                    tagClass = "tag-gray";
                    break;
            }
            return Popup.get_tag(type, tagClass);
        },
        get_tag_translatable: async function (rjCode) {
            let able = await WorkPromise.getTranslatable(rjCode);
            if(!able) return;
            return Popup.get_tag(localizePopup(localizationMap.tag_translatable),
                "tag-green");
        },
        get_tag_not_translatable: async function (rjCode) {
            let able = await WorkPromise.getTranslatable(rjCode);
            let translated = await WorkPromise.getTranslated(rjCode);
            if(able || translated) return;
            return Popup.get_tag(localizePopup(localizationMap.tag_not_translatable),
                "tag-red");
        },
        get_tag_translated: async function (rjCode) {
            let translated = await WorkPromise.getTranslated(rjCode);
            if(!translated) return;
            return Popup.get_tag(localizePopup(localizationMap.tag_translated), "tag-teal");
        },
        get_tag_bonus_work: async function (rjCode) {
            let bonus = await WorkPromise.getBonus(rjCode);
            if(!bonus) return;
            return Popup.get_tag(localizePopup(localizationMap.tag_bonus_work),
                "tag-yellow");
        },
        get_tag_has_bonus: async function (rjCode) {
            let has = await WorkPromise.getHasBonus(rjCode);
            if(!has) return;
            return Popup.get_tag(localizePopup(localizationMap.tag_has_bonus),
                "tag-orange");
        },
        get_tag_language_support: async function (rjCode) {
            const lang = await WorkPromise.getLanguages(rjCode);
            if(!lang || lang.length <= 0){
                return;
            }
            let txt = "";
            lang.forEach(l => {
                txt += ` | ${l}`;
            });
            txt = txt.substring(3);
            return Popup.get_tag(txt, "tag-pink");
        },
        get_tag_file_format: async function (rjCode) {
            const format = await WorkPromise.getFileFormats(rjCode);
            if(!format || format.length <= 0){
                return;
            }
            let txt = "";
            format.forEach(f => {
                txt += ` | ${f}`;
            });
            txt = txt.substring(3);
            return Popup.get_tag(txt, "tag-darkblue");
        },
        get_tag_ai: async function (rjCode) {
            const ai = await WorkPromise.getAIUsedText(rjCode);
            if(!ai) return;
            return Popup.get_tag(ai, "tag-purple");
        },
        get_translatable_tag: async function (rjCode, tag_id) {
            if(settings[`_s_${tag_id}`] !== true) return;

            if(tag_id.startsWith("tag_")) tag_id = tag_id.substring(4);
            const t = await WorkPromise.getWorkPromise(rjCode).translatable;
            const stat = t[tag_id];

            const hasRequest = stat.request > 0;
            const hasSale = stat.sale > 0;
            const displayCount = stat.agree || hasRequest || hasSale;
            const lang = tag_id.substring("translation_request_".length);
            const tag = Popup.get_tag(`${localizePopup(localizationMap[`language_${lang}_abbr`])}${stat.agree ? "" : (stat.agree === false ? " ✘" : " ?")} ${displayCount ? ` ${stat.request}-${stat.sale}` : ""}`,
                hasSale ? "tag-green" : (hasRequest ? "tag-orange" : "tag-gray"));
            tag.classList.add(`${VOICELINK_CLASS}_tag_small`);
            return tag;
        },
        get_tag_base_search: async function(rjCode, searchProfile) {
            const textPrefix = `${searchProfile.name}: `;
            const tag = Popup.get_tag(`${textPrefix}⏳`, "tag-gray");
            let urlList = [];
            const updateUrlList = function (result) {
                urlList = [];

                if(!result) {
                    urlList.push(searchProfile.showUrlTemplate?.replaceAll("%s", rjCode));
                    return;
                }

                let findCurrent = false;
                for (const workno of Object.keys(result.result)) {
                    let url = searchProfile.showUrlTemplate?.replaceAll("%s", workno);
                    urlList.push(url);

                    findCurrent = findCurrent || (workno === rjCode);
                }

                if(!findCurrent) {
                    let url = searchProfile.showUrlTemplate?.replaceAll("%s", rjCode);
                    urlList.unshift(url);
                }

                urlList.reverse();
            }

            const onClick = function (e) {
                for (const url of urlList) {
                    GM_openInTab(url);
                }
            }

            const updateTag = (result, done, error = false, errText = "error") => {
                if(error) {
                    updateUrlList(null);

                    tag.classList.remove("tag-gray", "tag-orange", "tag-green", "tag-blue");
                    tag.classList.add("tag-gray");
                    tag.innerText = `${textPrefix}❌${errText}`;
                    return;
                }

                updateUrlList(result);

                let info = result.analyze();
                let tagClass = `${VOICELINK_CLASS}_tag-gray`;
                tag.innerText = `${textPrefix}${result.getStatusText()}${done ? "" : "⏳"}`;
                tag.classList.remove(`${VOICELINK_CLASS}_tag-gray`,
                    `${VOICELINK_CLASS}_tag-orange`, `${VOICELINK_CLASS}_tag-green`, `${VOICELINK_CLASS}_tag-blue`);
                if(info.hasCurrent) {
                    tagClass = `${VOICELINK_CLASS}_tag-green`;
                } else if (info.hasTranslation) {
                    tagClass = `${VOICELINK_CLASS}_tag-blue`;
                } else if (info.hasOriginal) {
                    tagClass = `${VOICELINK_CLASS}_tag-orange`;
                }
                tag.classList.add(tagClass);

                return Popup.isCurrentWork(rjCode);
            }

            WorkPromise.getSearchResult(rjCode, searchProfile, result => {
                return updateTag(result, false);
            }).then(result => {
                return updateTag(result, true);
            }).catch(e => {
                console.error(e);
                return updateTag(null, false, true);
            });

            tag.classList.add(`${VOICELINK_CLASS}_tag_small`);
            tag.addEventListener("click", onClick);
            tag.style.cursor = "pointer";
            return tag;
        },

        get_tag_container: function (rjCode, tag_list) {
            const container = document.createElement("div");
            container.classList.add(`${VOICELINK_CLASS}_tags`);
            for (const tag_id of tag_list) {
                if(settings[`_s_${tag_id}`] !== true) continue;

                let shadowTag = document.createElement("span");
                shadowTag.style.setProperty("display", "none", "important");  //display = "none !important";
                shadowTag.setAttribute("data-id", tag_id);
                container.appendChild(shadowTag);

                let tag_get = this[`get_${tag_id}`];
                tag_get(rjCode).then(tag => {
                    if(tag){
                        container.insertBefore(tag, shadowTag);
                        shadowTag.remove();
                    }
                });
            }
            return container;
        },
        get_translatable_tag_container: function (rjCode, tag_list) {
            const container = document.createElement("div");
            container.classList.add(`${VOICELINK_CLASS}_tags`);
            container.style.setProperty("margin-top", "0", "important");  //marginTop = "0 !important";
            for (const tag_id of tag_list) {
                let shadowTag = document.createElement("span");
                shadowTag.style.setProperty("display", "none", "important");  //display = "none !important";
                shadowTag.setAttribute("data-id", tag_id);
                container.appendChild(shadowTag);

                Popup.get_translatable_tag(rjCode, tag_id).then(tag => {
                    if(tag){
                        container.insertBefore(tag, shadowTag);
                        shadowTag.remove();
                    }
                }).catch(e => {});
            }
            return container;
        },
        get_search_tag_container: function (rjCode) {
            const container = document.createElement("div");
            container.classList.add(`${VOICELINK_CLASS}_tags`);
            container.style.setProperty("margin-top", "0", "important");  //marginTop = "0 !important";
            Popup.get_tag_base_search(rjCode, settings._ss_search_profiles[0]).then(tag => {
                if(tag){
                    container.appendChild(tag);
                }
            }).catch(e => {});
            return container;
        },

        //整合顺序
        set_info_container: function (rjCode, category) {
            //清除上次的信息
            for(let child of [...this.popupElement.info_container.children]){
                if(child === this.popupElement.loader) {
                    child.style.setProperty("display", "none", "important");  //display = "none !important";
                    continue;
                }
                child.remove();
            }

            //TAG部分
            const infoContainer = this.popupElement.info_container;

            let tagContainer = null;
            if(settings._s_tag_main_switch === true){
                const container = this.get_tag_container(rjCode,
                    settings[`_s_tag_display_order`]);
                tagContainer = container;
                infoContainer.appendChild(container);
            }

            //翻译申请情况
            const shadowContainer = document.createElement("div");
            shadowContainer.style.setProperty("display", "none", "important");  //display = "none !important";
            infoContainer.appendChild(shadowContainer);
            WorkPromise.getTranslatable(rjCode).then(able => {
                if(!Popup.isCurrentWork(rjCode)) return;
                if(able && settings._s_tag_translation_request === true){
                    const translatableContainer = this.get_translatable_tag_container(rjCode,
                        settings._s_tag_translation_request_display_order);
                    infoContainer.insertBefore(translatableContainer, shadowContainer);
                    shadowContainer.remove();
                }
            }).catch(e => {});

            //仓库搜索情况
            const searchContainer = Popup.get_search_tag_container(rjCode);
            infoContainer.appendChild(searchContainer);

            //信息部分
            const order = settings[`_s_${category}__info_display_order`];
            order.forEach(id => {
                try{
                    id = id.substring(id.indexOf("__") + 2);
                    this["set_" + id](rjCode, category);
                }catch (e) {
                    console.error(e);
                }
            });

            const debugElement = document.createElement("div");
            this.popupElement.info_container.appendChild(debugElement);
            WorkPromise.getDebug(rjCode).then(t => {
                debugElement.innerHTML = Csp.createHTML(t);
            });
        },

        //调整弹框位置
        adjustPopup: function (mouseX, mouseY, force = false){
            // console.log("定位修正")

            //定位修正
            const popup = Popup.popupElement.popup;
            const ele = Popup.popupElement;
            if(!Popup.pinRJ || force){
                if (popup.offsetWidth + mouseX + 10 < window.innerWidth - 10) {
                    popup.style.setProperty("left", (mouseX + 10) + "px", "important");
                }
                else {
                    popup.style.setProperty("left", (window.innerWidth - popup.offsetWidth - 10) + "px", "important");
                }
            }

            let rect = popup.getBoundingClientRect();
            if(!Popup.pinRJ || force || rect.top < 0 || rect.bottom > window.innerHeight){
                if (mouseY > window.innerHeight / 2) {
                    let top = Math.max(mouseY - popup.offsetHeight - 8, 0);
                    popup.style.setProperty("top", top + "px", "important");
                }
                else {
                    let top = Math.min(mouseY + 20, window.innerHeight - popup.offsetHeight);
                    popup.style.setProperty("top", top + "px", "important");
                }
            }

            //大小修正
            let currentFontSize = popup.computedStyleMap().get("font-size").toString();
            currentFontSize = parseFloat(currentFontSize.substring(0, Math.max(currentFontSize.indexOf("px"), 1)));
            const sizeLevel = [15, 14.5, 14, 13.5, 13, 12.5, 12];
            let size = sizeLevel[sizeLevel.length - 1];
            if(popup.offsetHeight > window.innerHeight){
                //计算popup的高度与window高度的比值，找到离它最相近且更大的当前字体大小和sizeLevel的比值
                for (const s of sizeLevel) {
                    if(popup.offsetHeight / window.innerHeight < currentFontSize / s){
                        size = s;
                        break;
                    }
                }
                popup.style.setProperty("font-size", size + "px", "important");
            }

            //封面图位置修正
            ele.img.container.style.top = `${Math.max(0, -popup.offsetTop)}px`;
        },

        pinRJ: undefined,
        setPinState: function (rjCode, pin, close = true){
            const ele = Popup.popupElement;
            const popup = ele.popup;
            if(!pin){
                //关闭弹框
                popup.style.setProperty("pointer-events", "none", "important");
                Popup.pinRJ = undefined;
                popup.removeAttribute("pin");

                if(close) popup.style.setProperty("display", "none", "important");

                //取消注册自动关闭监听
                document.removeEventListener("keyup", Popup.keyup);
                document.removeEventListener("mousemove", Popup.domMove);
                return
            }

            popup.style.setProperty("pointer-events", "auto", "important");
            Popup.pinRJ = rjCode;
            popup.setAttribute("pin", "");

            //添加监听器
            document.addEventListener("keyup", Popup.keyup);
            document.addEventListener("mousemove", Popup.domMove);
        },
        hasPinned: function (){
            return Popup.popupElement.popup.hasAttribute("pin");
        },
        /**
         * @param e {KeyboardEvent}
         */
        isHoldPinKey: function(e){
            if(getOS() === "Mac"){
                return e.metaKey;
            }
            return e.ctrlKey;
        },
        /**
         * @param e {KeyboardEvent}
         */
        isPinKeyDown: function (e) {
            if(getOS() === "Mac"){
                return e.key === "Meta";
            }
            return e.key === "Control";
        },

        /**
         * 监听网页内的鼠标移动事件，来保证弹框正常移除
         * @param e {MouseEvent}
         */
        domMove: function (e) {
            if(!Popup.hasPinned() || Popup.isHoldPinKey(e)){
                return;
            }
            Popup.setPinState(null, false);
        },
        /**
         * 鼠标移动到链接上触发
         * @param e {MouseEvent}
         */
        over: function (e) {
            const target = isInDLSite() ? e.target : getVoiceLinkTarget(e.target);
            if(!target || !target.classList.contains(VOICELINK_CLASS)) return;

            const rjCode = target.getAttribute(RJCODE_ATTRIBUTE);
            if(rjCode === null) return;

            //记录鼠标位置
            let ele = Popup.popupElement;
            ele._state.mouseX = e.clientX;
            ele._state.mouseY = e.clientY;

            //如果用户固定了弹框，则提示用户必须ctrl关闭弹框才能解析
            if(Popup.isHoldPinKey(e) && Popup.pinRJ){
                ele.hint.innerText = localizePopup(localizationMap.hint_unpin);
                return;
            }else{
                //没有固定弹框的话清理pinRJ，因为有时候pinRJ没办法被keyup清理（如keyup未触发）
                Popup.pinRJ = undefined
                ele.hint.innerText = localizePopup(localizationMap.hint_pin);
            }

            //修正链接
            if(target.hasAttribute("voicelink-linkified")){
                WorkPromise.getWorkPromise(rjCode).info.then(info => {
                    if(info.is_announce === true){
                        target.href = `https://www.dlsite.com/maniax/announce/=/product_id/${rjCode}.html`;
                    }
                });
            }

            let popup = document.querySelector(`div#${VOICELINK_CLASS}-voice-popup`);  // + rjCode);
            if (popup) {
                popup.style.setProperty("display", "flex", "important");  //display = "flex !important";
                //先将字体大小变回原样
                popup.style.setProperty("font-size", "15.4px", "important");
            }
            else {
                Popup.makePopup();
                popup = ele.popup;
            }
            Popup.updatePopup(e, rjCode);

            //如果按住了CTRL，则将popup可被点击，否则设置穿透
            //并设置Copy显示情况
            if(Popup.isHoldPinKey(e)){
                Popup.setPinState(rjCode, true)
                ele.hint.innerText = localizePopup(localizationMap.hint_unpin);
            }else{
                Popup.setPinState(rjCode, false, false)
            }

            //设置焦点至链接上
            target.focus();
            target.style.setProperty("outline", "none", "important");

        },

        /**
         * 鼠标离开时触发
         * @param e {MouseEvent}
         */
        out: function (e) {
            //如果固定则禁止关闭
            if(Popup.isHoldPinKey(e)) {
                return
            }

            const target = isInDLSite() ? e.target : getVoiceLinkTarget(e.target);
            if(!target || !target.classList.contains(VOICELINK_CLASS)) return;

            const rjCode = target.getAttribute(RJCODE_ATTRIBUTE);
            if(rjCode === null) return;

            //取消固定并关闭
            Popup.setPinState(rjCode, false)

            //取消focus
            target.blur();
            target.style.setProperty("outline", null);
        },

        /**
         * 鼠标移动时触发
         * @param e {MouseEvent}
         */
        move: function (e) {
            const target = isInDLSite() ? e.target : getVoiceLinkTarget(e.target);
            if(!target || !target.classList.contains(VOICELINK_CLASS)) return;

            const popup = document.querySelector(`div#${VOICELINK_CLASS}-voice-popup`);  // + rjCode);
            if(!popup) return;

            const rjCode = e.target.getAttribute(RJCODE_ATTRIBUTE);
            if(rjCode === null) return;

            let ele = Popup.popupElement;
            ele._state.mouseX = e.clientX;
            ele._state.mouseY = e.clientY;

            //焦点不在浏览器上的时候无法触发keydown，因此需要用move来辅助激活pin
            if(Popup.isHoldPinKey(e) && !Popup.pinRJ){
                //按下pin键但没激活pin模式的时候手动激活
                Popup.setPinState(rjCode, true);
            }

            //如果弹框已固定且固定的并非当前所选链接RJ号，则不进行定位修正
            if(Popup.pinRJ && rjCode !== Popup.pinRJ){
                return;
            }

            Popup.adjustPopup(e.clientX, e.clientY);

        },

        /**
         * 按键按下时触发
         * @param e {KeyboardEvent}
         */
        keydown: function (e) {
            const target = isInDLSite() ? e.target : getVoiceLinkTarget(e.target);
            if(!target || !target.classList.contains(VOICELINK_CLASS)) return;

            const rjCode = target.getAttribute(RJCODE_ATTRIBUTE);
            if(rjCode === null) return;

            let popup = Popup.popupElement.popup;
            if(popup.style.display !== "none" && Popup.isPinKeyDown(e)){
                //按住CTRL以固定显示弹框
                Popup.setPinState(rjCode, true);
            }
        },

        /**
         * 按键抬起时触发
         * @param e {KeyboardEvent}
         */
        keyup: function (e) {
            let popup = Popup.popupElement.popup;
            if(popup && Popup.isPinKeyDown(e)){
                Popup.setPinState(null, false);
            }
        }
    }

    //endregion

    //region 作品信息爬取

    const WorkPromise = {

        checkNotNull: function (obj){
            if(obj === null || obj === undefined) throw new Error();
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
                const data = await WorkPromise.getWorkPromise(rjCode).api2;
                if(data && data.product_id !== undefined) return true;

                //否则再次检查api1
                const api = await WorkPromise.getWorkPromise(rjCode).api;
                return api && api.is_sale !== undefined;
            }catch (e){
                //说明是网络问题，删除缓存并返回true
                delete work_promise[rjCode];
                return true;
            }
        },

        getTranslationInfo: async function(rjCode){
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api2;
            if(data.translation_info) return data.translation_info;

            data = await p.api;
            return data.translation_info ? data.translation_info : {};
        },

        getRJChain: async function(rjCode) {
            //RJxxx → RJxxx → RJxxx，这样从子级指向父级
            const trans = await WorkPromise.getTranslationInfo(rjCode);
            let chain = [rjCode];
            if(trans.is_child){
                chain.push(trans.parent_workno, trans.original_workno);
            }else if(trans.is_parent){
                chain.push(trans.original_workno);
            }
            return chain;
        },

        getParentRJ: async function(rjCode){
            try{
                const p = WorkPromise.getWorkPromise(rjCode);
                let trans = await WorkPromise.getTranslationInfo(rjCode);
                if(trans.is_original || trans.is_parent) return rjCode;
                if(trans.parent_workno) return trans.parent_workno;

                let data = await p.info;
                return data.parentWork;
            }catch (e){
                return null;
            }
        },

        getGirls: async function(rjCode){
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api2;
            if(data.sex_category && data.sex_category === 2) return true;
            if(data.site_id === "girls") return true;

            //否则再次检查api1
            data = await WorkPromise.getWorkPromise(rjCode).api;
            WorkPromise.checkNotNull(data.is_girls)
            return data.is_girls;
        },

        getAnnounce: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const info = await p.info;
            return info.is_announce;
        },

        getSale: async function(rjCode, checkAnnounce = true){
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            if(!checkAnnounce){
                return data.is_sale;
            }
            return data.is_sale || await WorkPromise.getAnnounce(rjCode);
        },

        getDLCount: async function (rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            WorkPromise.checkNotNull(data.dl_count);
            return data.dl_count;
        },

        getRateAvg: async function (rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            if(data.rate_average_2dp) return data.rate_average_2dp;

            //还可以累加api2的结果获得
            data = await p.api2;
            this.checkNotNull(data.rate_count_detail);
            let sum = 0;
            let count = 0;
            for (const key in data.rate_count_detail) {
                let rate = parseInt(key);
                let cot = parseInt(data.rate_count_detail[key]);
                count += cot
                sum += rate * cot;
            }
            return sum / count;
        },

        getRateCount: async function (rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            if(data.rate_count) return data.rate_count;

            //还可以累加api2的结果获得
            data = await p.api2;
            this.checkNotNull(data.rate_count_detail);
            let count = 0;
            for (const key in data.rate_count_detail) {
                count += parseInt(data.rate_count_detail[key]);
            }
            return count;
        },

        getWishlistCount: async function (rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            this.checkNotNull(data.wishlist_count);
            return data.wishlist_count;
        },

        getPriceText: async function (rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            //TODO: 价格以后再加，还要考虑汇率和添加设置项
        },

        getBonus: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            return !data.is_sale && data.is_free && data.is_oly && data.wishlist_count === 0;
            // return data.is_bonus;
        },

        getHasBonus: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            let data = await p.api;
            return data.bonuses && data.bonuses.length > 0;
        },

        getTranslatable: async function(rjCode) {
            const trans = await WorkPromise.getTranslationInfo(rjCode);
            return trans.is_translation_agree === true;
        },

        getTranslated: async function(rjCode) {
            const trans = await WorkPromise.getTranslationInfo(rjCode);
            return trans.is_parent === true || trans.is_child === true;
        },

        getLanguages: async function(rjCode){
            //返回字符串数组，根据popup设置的语言返回支持的语言列表
            const p = WorkPromise.getWorkPromise(rjCode);
            let api = await p.api2;
            api = api.options ? api : await p.api;
            const options = api.options?.split("#");
            const result = [];
            for (const key in LANG_MAP) {
                const lang = LANG_MAP[key];
                if(options?.includes(key)) result.push(lang);
            }
            return result;
        },

        getFileFormats: async function(rjCode){
            //返回字符串数组，返回文件格式列表
            const result = [];
            const p = WorkPromise.getWorkPromise(rjCode);
            let api = await p.api2;
            if(api.file_type === "EXE"){
                result.push("EXE");
            }else if(api.file_type_string){
                result.push(api.file_type_string);
            }
            if(api.file_type_special) result.push(api.file_type_special);

            if(!api.options) api = await p.api;
            if(api.options && api.options.includes("WPD")){
                result.push("PDF");
            }
            if(api.options && api.options.includes("WAP")){
                result.push("APK");
            }

            return result;
        },

        getAIUsedText: async function(rjCode) {
            //返回是否使用或部分使用AI，根据popup语言返回字符串。
            const p = WorkPromise.getWorkPromise(rjCode);
            let api = await p.api2;
            api = api.options ? api : await p.api;
            const options = api.options ? api.options : "";
            if(options.includes("AIG")){
                return localizePopup(localizationMap.tag_aig);
            }else if(options.includes("AIP")){
                return localizePopup(localizationMap.tag_aip);
            }
            return null;
        },

        getDebug: async function(rjCode){
            return "";
            const work = WorkPromise.getWorkPromise(rjCode);
            const api2 = await work.api2;
            const api = await work.api;
            const info = await work.info;
            const circle = work.circle;

            return `is_ana_api2: ${api2.is_ana}<br/>
                    is_ana_api: ${api.is_ana}`;
        },

        getWorkCategory: async function(rjCode){
            const type = await WorkPromise.getWorkType(rjCode);
            /* voice: 音声
             * game: 游戏
             * manga: 漫画/插画/音声漫画
             * video: 视频
             * novel: 小说
             * other: 其它
            */
            switch (type) {
                case 0:
                    return "voice";
                case 1:
                    return "game";
                case 2 || 3 || 8:
                    return "manga";
                case 5:
                    return "video";
                case 4:
                    return "novel";
                default:
                    return "other";
            }
        },

        getWorkTypeText: async function(rjCode) {
            const mapping = [
                localizePopup(localizationMap.work_type_voice),
                localizePopup(localizationMap.work_type_game),
                localizePopup(localizationMap.work_type_comic),
                localizePopup(localizationMap.work_type_illustration),
                localizePopup(localizationMap.work_type_novel),
                localizePopup(localizationMap.work_type_video),
                localizePopup(localizationMap.work_type_music),
                localizePopup(localizationMap.work_type_tool),
                localizePopup(localizationMap.work_type_voice_comic),
                localizePopup(localizationMap.work_type_other),
            ];
            return mapping[await WorkPromise.getWorkType(rjCode)];
        },

        getWorkType: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const api2 = await p.api2;
            let workType = api2.work_type;
            if(!workType) workType = (await p.api).work_type;

            switch (workType) {
                case "SOU":
                    return 0;
                case (["ACN", "QIZ", "ADV", "RPG", "TBL", "DNV", "SLN", "TYP", "STG", "PZL", "ETC"]
                    .includes(workType) ? workType : "ERR"):
                    return 1;
                case (["MNG", "SCM", "WBT"]
                    .includes(workType) ? workType : "ERR"):
                    return 2;
                case "ICG":
                    return 3;
                case (["NRE", "KSV"].includes(workType) ? workType : "ERR"):
                    return 4;
                case "MOV":
                    return 5;
                case "MUS":
                    return 6;
                case (["TOL", "IMT", "AMT"]
                    .includes(workType) ? workType : "ERR"):
                    return 7;
                case "VCM":
                    return 8;
                case "ET3":
                    return 9;
                default:
                    throw new Error("无法获取作品类型/未知作品类型：" + workType);
            }
        },

        getImgLink: async function(rjCode){
            let link = undefined;
            const p = WorkPromise.getWorkPromise(rjCode);

            try {
                let data = await p.api2;
                if (data.image_main && data.image_main.url) link = "https:" + data.image_main.url;
            } catch (e) {}

            if(link && !link.includes("no_img_main.gif")){
                return link;
            }

            try{
                const info = await p.info;
                WorkPromise.checkNotNull(info.img);
                return info.img;
            }catch (e) {
            }

            try{
                const apiData = await WorkPromise.getWorkPromise(rjCode).api;
                if(apiData.work_image) return "https:" + apiData.work_image;
            }catch (e){}

            throw new Error("无法获取图片链接");
        },

        getWorkTitle: async function(rjCode){
            return await WorkPromise.getWorkPromise(rjCode).translated_title;
        },

        getAgeRating: async function(rjCode){
            let p = WorkPromise.getWorkPromise(rjCode);
            let api = await p.api2;
            if(!api.age_category) api = await p.api;
            switch (api.age_category){
                case 1:
                    return "All";
                case 2:
                    return "R15";
                case 3:
                    return "R18";
            }

            const info = await p.info;
            WorkPromise.checkNotNull(info.rating);
            return info.rating;
        },

        getCircle: async function(rjCode, findOriginal = true){
            let trans = await WorkPromise.getTranslationInfo(rjCode);
            if(!trans.is_original && findOriginal){
                //使用原作RJ号开始寻找，如果找不到翻译信息就没办法了
                rjCode = trans.original_workno ? trans.original_workno : rjCode;
            }

            let work = WorkPromise.getWorkPromise(rjCode);
            let api2 = await work.api2;
            if(api2.maker_name) return api2.maker_name;

            /**
             * 接下来有两种搜索方式：
             * 1. api1 + circle接口
             * 2. info搜索
             * 前者成功率更高（下架后还能获取到api1，社团没解散就能获得社团信息），两个加载速度不确定谁快谁慢，所以把1放在前面
             */

            const circleInfo = await work.circle;
            if(circleInfo && circleInfo.name) return circleInfo.name;

            let info = await work.info;
            if(info.circle) return info.circle.trim();

            throw new Error("无法获取社团信息");
        },

        getTranslatorName: async function(rjCode){
            let trans = await WorkPromise.getTranslationInfo(rjCode);
            if(!trans.is_child) throw new Error("非翻译作品RJ号");
            return await WorkPromise.getCircle(rjCode, false);
        },

        getReleaseDate: async function(rjCode){
            const p = WorkPromise.getWorkPromise(rjCode);
            const info = await p.info;
            if(info && !info.is_announce && info.date) return [info.date.trim(), false];
            if(info && info.is_announce && info.dateAnnounce) return [info.dateAnnounce.trim(), true];

            //从api中查找发售时间
            let api = await p.api2;
            api = api.regist_date ? api : await p.api;
            WorkPromise.checkNotNull(api.regist_date)

            return [api.regist_date, api.is_announce];
        },

        getReleaseCountDownElement: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const info = await p.info;
            if(info && info.is_announce && info.dateAnnounce) {
                return DateParser.getCountDownDateElement(DateParser.parseDateStr(info.dateAnnounce, info.lang));
            }
            return null;
        },

        getUpdateDate: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const info = await p.info;
            if(info["update"]) return info["update"].trim();

            throw new Error();
        },

        getScenario: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const api2 = await p.api2;
            if(api2.creaters && api2.creaters.scenario_by && api2.creaters.scenario_by.length > 0){
                return api2.creaters.scenario_by.map(v => v.name);
            }

            //无法获取api2则直接通过html获取
            const info = await WorkPromise.getWorkPromise(rjCode).info;
            WorkPromise.checkNotNull(info.scenario);
            return info.scenario;
        },

        getIllustrator: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const api2 = await p.api2;
            if(api2.creaters && api2.creaters.illust_by && api2.creaters.illust_by.length > 0){
                return api2.creaters.illust_by.map(v => v.name);
            }

            //无法获取api2则直接通过html获取
            const info = await WorkPromise.getWorkPromise(rjCode).info;
            WorkPromise.checkNotNull(info.illustration);
            return info.illustration;
        },

        getCV: async function(rjCode){
            const p = WorkPromise.getWorkPromise(rjCode);
            const api2 = await p.api2;
            if(api2.creaters && api2.creaters.voice_by && api2.creaters.voice_by.length > 0){
                return api2.creaters.voice_by.map(v => v.name);
            }

            //无法获取api2则直接通过html获取
            const info = await WorkPromise.getWorkPromise(rjCode).info;
            WorkPromise.checkNotNull(info.cv);
            return info.cv;
        },

        getMusic: async function(rjCode) {
            const p = WorkPromise.getWorkPromise(rjCode);
            const api2 = await p.api2;
            if(api2.creaters && api2.creaters.music_by && api2.creaters.music_by.length > 0){
                return api2.creaters.music_by.map(v => v.name);
            }

            //无法获取api2则直接通过html获取
            const info = await WorkPromise.getWorkPromise(rjCode).info;
            WorkPromise.checkNotNull(info.music);
            return info.music;
        },

        getTags: async function(rjCode) {
            //注意该方法返回字符串数组而不是纯字符串
            const p = WorkPromise.getWorkPromise(rjCode);
            const api2 = await p.api2;
            if(api2.genres && api2.genres.length > 0){
                return api2.genres.map(genre => genre.name);
            }

            //无法获取api2时通过html获取
            const info = await p.info;
            WorkPromise.checkNotNull(info.tags);
            return info.tags;
        },

        getFileSizeStr: function(byteCount = 0){
            const units = ["B", "KB", "MB", "GB", "TB"];
            let unit = "B";
            for (let i = 1; byteCount >= 1024; i++){
                byteCount /= 1024;
                unit = units[i];
            }
            return `${Math.round(byteCount * 100) / 100}${unit}`;
        },

        getFileSize: async function(rjCode) {
            const trans = await WorkPromise.getTranslationInfo(rjCode);
            if(trans.is_parent){
                //翻译版本的父级没有内容信息，自然无法显示文件大小，所以需要获得原作品的大小信息
                //Child和Original都有各自的大小信息，正常获取计算即可
                rjCode = trans.original_workno ? trans.original_workno : rjCode;
            }

            const p = WorkPromise.getWorkPromise(rjCode);
            let api2 = await p.api2;
            if(api2.contents_file_size && api2.contents_file_size > 0){
                return WorkPromise.getFileSizeStr(api2.contents_file_size);
            }

            //通过html获取
            let info = trans.is_child && trans.original_workno ? await WorkPromise.getWorkPromise(trans.original_workno).info : await p.info;
            if(info.filesize) return info.filesize;

            throw new Error("无法获取文件大小信息");
        },

        mergeLinkage: function(l1, l2) {
            let linkage = {}
            for (const work of Object.values(l1)) {
                if(!work.workno) continue;
                linkage[work.workno] = work;
            }
            for (const work of Object.values(l2)) {
                if(!work.workno) continue;
                linkage[work.workno] = work;
            }
            return linkage;
        },

        cacheLinkage: function(originalWorkno, linkage) {
            //缓存与rjCode相关的关联作品信息，任意一个关联作品RJ均能找到此关联信息

            function getExpireTime() {
                //UTC+9第二天的0点
                const now = new Date();
                const nowMs = now.getTime();
                const utc9Ms = nowMs + now.getTimezoneOffset() * 60000 + 9 * 3600 * 1000;
                const localeOffset = utc9Ms - nowMs;
                const dayMs = 24 * 3600 * 1000;
                const nextDayUtc9 = utc9Ms - (utc9Ms % dayMs) + dayMs;
                return nextDayUtc9 - localeOffset;
            }

            let maxLinkMapSize = 128;
            let linkCache = DataCacheStorage.open(
                "work-linkages", maxLinkMapSize, true, true, true);

            //存入Linkage
            let langs = settings._ss_cue_lang.join();
            let data = linkCache.get(originalWorkno);
            if(Array.isArray(data)){
                //已存在部分Linkage则合并它们
                data = WorkPromise.mergeLinkage(data, linkage);
            } else {
                data = linkage;
            }
            linkCache.commit(`${originalWorkno}|${langs}`, data, getExpireTime());
        },

        getLinkageFromCache: function(originalWorkno) {
            const hashKey = `${originalWorkno}|${settings._ss_cue_lang.join()}`
            let storage = DataCacheStorage.open("work-linkages", 128, true, true, true);
            return storage.get(hashKey);
        },

        getLinkedWorks: async function(rjCode) {
            try {
                let trans = await WorkPromise.getTranslationInfo(rjCode);
                let p = await WorkPromise.getWorkPromise(rjCode);
                let api = await p.api2;
                let result = {};
                if(trans.is_original){
                    result[rjCode] = {workno: rjCode, type: "original", lang: "JPN"};
                    let languageEditions = api.language_editions;
                    for (let edition of languageEditions) {
                        result[edition.workno] = {workno: edition.workno, type: "parent", lang: edition.lang};
                    }
                }else if(trans.is_parent) {
                    //parent作品可以获取当前语言下所有的作品关联，但无法获取其它语言作品关联，作品数更新时也无法注意到
                    result[trans.original_workno] = {workno: trans.original_workno, type: "original", lang: "JPN"};
                    result[rjCode] = {workno: rjCode, type: "parent", lang: trans.lang};
                    for (let workno of trans.child_worknos) {
                        result[workno] = {workno: workno, type: "child", lang: trans.lang}
                    }
                }else if(trans.is_child){
                    result[trans.original_workno] = {workno: trans.original_workno, type: "original", lang: "JPN"};
                    result[trans.parent_workno] = {workno: trans.parent_workno, type: "parent", lang: trans.lang};
                    result[rjCode] = {workno: rjCode, type: "child", lang: trans.lang};
                }

                return result;
            } catch (e) {
                console.error(e);
                return {};
            }

        },

        /**
         * 查找指定作品的所有语言版本作品关联
         * @param rjCode 查找关联的RJ号
         * @param useCache 是否使用缓存中的记录
         * @param saveCache 是否记录/更新至缓存
         */
        getLinkedWorksFull: async function(rjCode, useCache = true, saveCache = true) {
            let trans = await WorkPromise.getTranslationInfo(rjCode);
            if(trans.is_original === undefined || trans.is_original === null) return {};
            if(!trans.is_original) {
                //TODO 将结果和待搜索RJ号的本地关联搜索结果merge一下再返回（不存缓存，否则会破坏缓存内语言和cue_lang的对应性
                //TODO 上面那个不算，改成临时添加cue lang，然后方法改成用参数接收cue lang而不是读设置项，缓存那边也要改成参数传递
                let result = WorkPromise.getLinkedWorksFull(trans.original_workno, useCache, saveCache);
                result = WorkPromise.mergeLinkage(result, await WorkPromise.getLinkedWorks(rjCode));
                return result;
            }

            //先尝试从缓存获取
            let cache = WorkPromise.getLinkageFromCache(rjCode)
            if(cache) {
                return cache;
            }

            let p = await WorkPromise.getWorkPromise(rjCode);
            let api = await p.api2;
            let result = {};

            result[rjCode] = {workno: rjCode, type: "original", lang: "JPN"};
            let languageEditions = api.language_editions;
            for (let edition of languageEditions) {
                if (!settings._ss_cue_lang.includes(edition.lang)) continue;
                //是需要的查询语言，进行Link递归查询
                result = WorkPromise.mergeLinkage(result, await WorkPromise.getLinkedWorks(edition.workno));
            }

            if (saveCache) WorkPromise.cacheLinkage(rjCode, result);
            return result;
        },

        //仓库搜索

        cacheSearchResult(rjCode, searchProfileHash, fullSearch, data) {
            const hashKey = `${rjCode}|${searchProfileHash}|${fullSearch}`;
            const storage = DataCacheStorage.open("search-results", 128, true, true, true)
            storage.commit(hashKey, data, Date.now() + 3 * 60 * 1000)
        },

        getSearchResultFromCache(rjCode, searchProfileHash, fullSearch) {
            const hashKey = `${rjCode}|${searchProfileHash}|${fullSearch}`;
            const storage = DataCacheStorage.open("search-results", 128, true, true, true)
            return storage.get(hashKey);
        },

        /**
         * 获取来自Kikoeru API的搜索结果
         * @param rjCode {string}
         * @param searchProfile {SearchProfile}
         * @param linkages {{}}
         * @returns {[SearchWorkInfo]}
         */
        getKikoeruSearchResult: async function(rjCode, searchProfile, linkages) {
            let url = searchProfile.searchUrlTemplate?.replaceAll("%s", rjCode);

            try{
                let resp = await getHttpAsync(url, false, 180, searchProfile.customHeaders);
                if (!(resp.readyState === 4 && resp.status === 200)) {
                    return;
                }

                let data = JSON.parse(resp.responseText);
                if (!Array.isArray(data.works)) {
                    throw new Error("Invalid Response.");
                } else if (data.works.length <= 0) {
                    return [];
                }

                let result = [];
                for (const work of data.works) {
                    let rj = work.id > 999999 ? `RJ0${work.id}` : `RJ${work.id}`;
                    let link = linkages[rj];
                    if(!link) continue;

                    result.push(new SearchWorkInfo(link.workno, link.type, link.lang));
                }

                return result;
            } catch (e) {
                console.error(e);
                return null;
            }

        },

        /**
         * 获取指定仓库的搜索结果
         * @param rjCode {string}
         * @param searchProfile {SearchProfile}
         * @param progressCallback {function (result: SearchResult): boolean} 搜索的阶段性成果，如果返回false则停止搜索
         */
        getSearchResult: async function(rjCode, searchProfile, progressCallback) {
            let searchFunction = null;
            switch (searchProfile.apiType.toLowerCase()) {
                case "kikoeru":
                    searchFunction = WorkPromise.getKikoeruSearchResult;
                    break;
                default:
                    throw new Error(`Invalid API Type: ${searchProfile.apiType.toLowerCase()}`);
            }

            let linkages = settings._s_full_linkage ?
                await WorkPromise.getLinkedWorksFull(rjCode) : await WorkPromise.getLinkedWorks(rjCode);
            let searchSet = new Set(Object.keys(linkages));
            let work = linkages[rjCode];
            work = new SearchWorkInfo(work.workno, work.type, work.lang);

            //检查缓存是否存在，存在则直接使用缓存结果
            let cache = WorkPromise.getSearchResultFromCache(rjCode, await searchProfile.getHash(), settings._s_search_linkage)
            if(Array.isArray(cache)) return new SearchResult(searchProfile.name, work, cache);

            let result = {};
            let res = await searchFunction(rjCode, searchProfile, linkages);
            res.forEach(v => result[v.workno] = v);

            if(!settings._s_search_linkage) {
                //直接保存并返回
                WorkPromise.cacheSearchResult(rjCode, await searchProfile.getHash(), false, res)
                return new SearchResult(searchProfile.name, work, res);
            }

            //---进行完整搜索---

            searchSet.delete(rjCode);
            for (const work of res) {
                searchSet.delete(work.workno);
            }

            while(searchSet.size > 0) {
                //提交当前搜索到的部分结果（最后一次的完整结果通过返回值提交，故这段放在while开头
                if(!progressCallback(new SearchResult(searchProfile.name, work, res))) {
                    //非完整结果不保存
                    return new SearchResult(searchProfile.name, work, res);
                }

                let target = searchSet.values().next().value;
                res = await searchFunction(target, searchProfile, linkages);
                res.forEach(v => result[v.workno] = v);

                searchSet.delete(target);
                for(const work of res) {
                    searchSet.delete(work.workno);
                }

                //res也需要合并先前搜索到的部分结果
                res = Object.values(result);
            }

            //保存结果并返回
            WorkPromise.cacheSearchResult(rjCode, await searchProfile.getHash(), true, res)
            return new SearchResult(searchProfile.name, work, res);
        },
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
                        workInfo.date = row_data.innerText.trim();
                        break;
                    case (["更新情報", "更新信息", "更新資訊", "Update information", "갱신 정보", "Actualizar información",
                        "Aktualisierungen", "Mise à jour des informations", "Perbarui informasi", "Aggiorna informazioni",
                        "Atualizar informações", "Uppdatera information", "ข้อมูลอัปเดต", "Thông tin cập nhật"].some(lambda)):
                        workInfo.update = row_data.firstChild.data.trim();
                        break;
                    case (["年齢指定", "年龄指定", "年齡指定", "Age", "연령 지정", "Edad", "Altersfreigabe", "Âge", "Batas usia",
                        "Età", "Idade", "Ålder", "การกำหนดอายุ", "Độ tuổi chỉ định"].some(lambda)):
                        workInfo.rating = row_data.innerText.trim();
                        break;
                    case (["ジャンル", "分类", "分類", "Genre", "장르", "Género", "Genre", "Genre", "Genre", "Genere", "Gênero",
                        "Genre", "ประเภท", "Thể loại"].some(lambda)):
                        const tag_nodes = row_data.querySelectorAll("a");
                        workInfo.tags = [...tag_nodes].map(a => { return a.innerText.trim() });
                        break;
                    case (["シナリオ", "Scenario", "剧情", "劇本", "시나리오", "Guión", "Szenario", "Scénario", "Skenario",
                        "Scenario", "Cenário", "Scenario", "บทละคร", "Kịch bản"].some(lambda)):
                        workInfo.scenario = row_data.innerText.trim();
                        break;
                    case (["イラスト", "Illustration", "插画", "插畫", "일러스트", "Ilustración", "AbbilDung", "Illustration",
                        "Ilustrasi", "Illustrazione", "Ilustração", "Illustration", "ภาพประกอบ", "Tranh minh họa"].some(lambda)):
                        workInfo.illustration = row_data.innerText.trim();
                        break;
                    case (["声優", "声优", "聲優", "Voice Actor", "성우", "Doblador", "Synchronsprecher", "Doubleur",
                        "Pengisi suara", "Doppiatore/Doppiatrice", "Ator de voz", "Röstskådespelare", "นักพากย์",
                        "Diễn viên lồng tiếng"].some(lambda)):
                        workInfo.cv = row_data.innerText.trim();
                        break;
                    case (["音楽", "Music", "音乐", "音樂", "음악", "Música", "Musik", "Musique", "Musik", "Musica.",
                        "Música", "musik", "ดนตรี", "Âm nhạc"].some(lambda)):
                        workInfo.music = row_data.innerText.trim();
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
            let apiData = data;
            apiData.is_bonus = !data.is_sale && data.is_free && data.is_oly && data.wishlist_count === false;
            apiData.is_girls = (data.options && data.options.indexOf("OTM") >= 0) || (data.site_id === "girls");

            if(data.regist_date){
                let reg_date = data.regist_date.replace(/-/g, '/');
                let releaseDate = new Date(reg_date);
                apiData.regist_timestamp = releaseDate.getTime();
                apiData.regist_date = `${releaseDate.getFullYear()} / ${releaseDate.getMonth() + 1} / ${releaseDate.getDate()}`;
                if(apiData.regist_timestamp > Date.now()){
                    apiData.is_announce = true;
                }
            }
            return apiData;
        },

        parseApi2Data: function (rjCode, data) {
            const translation_info = data.translation_info ? data.translation_info : {};
            data.lang = DLsite.getLangCode(translation_info.lang);

            if(data.regist_date){
                let reg_date = data.regist_date.replace(/-/g, '/');
                let releaseDate = new Date(reg_date);
                data.regist_timestamp = releaseDate.getTime();
                data.regist_date = `${releaseDate.getFullYear()} / ${releaseDate.getMonth() + 1} / ${releaseDate.getDate()}`;
                if(data.regist_timestamp > Date.now()){
                    data.is_announce = true;
                }
            }

            return data;
        },

        getAnnouncePromise: async function (rjCode, parentRJ) {
            const url = `https://www.dlsite.com/maniax/announce/=/product_id/${rjCode}.html`;
            let resp = await getHttpAsync(url);
            if (resp.readyState === 4 && resp.status === 200) {
                const dom = new DOMParser().parseFromString(Csp.createHTML(resp.responseText), "text/html");
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
            let resp = await getHttpAsync(url);
            if (resp.readyState === 4 && resp.status === 200) {
                const dom = new DOMParser().parseFromString(Csp.createHTML(resp.responseText), "text/html");
                const workInfo = DLsite.parseWorkDOM(dom, rjCode);
                workInfo.parentWork = DLsite.getParentWorkRjCode(resp.finalUrl);
                workInfo.parentWork = workInfo.parentWork === rjCode ? null : workInfo.parentWork;
                workInfo.is_announce = false;
                return workInfo;
            }
            else if (resp.readyState === 4 && resp.status === 404) {
                return await DLsite.getAnnouncePromise(rjCode, DLsite.getParentWorkRjCode(resp.finalUrl));
            }
        },

        getApi2Promise: async function (rjCode, locale = undefined) {
            let url = `https://www.dlsite.com/maniax/api/=/product.json?workno=${rjCode}` + (locale ? `&locale=${locale}` : "");
            let resp = await getHttpAsync(url);
            let data;
            if (resp.readyState === 4 && resp.status === 200) {
                data = JSON.parse(resp.responseText);
                data = data ? data[0] : {};
                data = data ? data : {}
            }
            else if (resp.readyState === 4 && resp.status === 404) {
                return {};
            }
            else {
                throw new Error(`无法通过API2获取${rjCode}的信息：${resp.status} ${resp.statusText}`);
            }

            return DLsite.parseApi2Data(rjCode, data);
        },

        getApiPromise: async function (rjCode, locale = undefined) {
            //获取对应语言下的实际信息
            let url = `https://www.dlsite.com/maniax/product/info/ajax?product_id=${rjCode}&cdn_cache_min=1` + (locale ? `&locale=${locale}` : "");
            let resp = await getHttpAsync(url);
            let data;
            if (resp.readyState === 4 && resp.status === 200) {
                data = JSON.parse(resp.responseText);
                data = data ? data[rjCode] : {};
                data = data ? data : {};
            }
            else if(resp.readyState === 4 && resp.status === 404){
                return {};
            }
            else {
                throw new Error(`无法通过API获取${rjCode}的信息：${resp.status} ${resp.statusText}`);
            }

            const translation_info = data.translation_info ? data.translation_info : {};
            data.lang = DLsite.getLangCode(translation_info.lang);

            return DLsite.parseApiData(rjCode, data);
        },

        getCirclePromise: async function (rjCode, apiPromise){
            let apiData = await apiPromise;
            if(!apiData.maker_id) return null;
            const maker_id = apiData.maker_id;

            let url;
            let resp;
            let data;
            try {
                url = `https://media.ci-en.jp/dlsite/lookup/${maker_id}.json`;
                resp = await getHttpAsync(url);
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
                resp = await getHttpAsync(url);
                data = data ? data : {};
                if(resp.readyState === 4 && resp.status === 200){
                    let doc = new DOMParser().parseFromString(Csp.createHTML(resp.responseText), "text/html");
                    let name = doc.querySelector("strong.prof_maker_name");
                    name = name ? name.innerText : null;
                    data.name = name;
                }
            }

            return data;
        },

        getTranslatablePromise: async function (rjCode, site = "maniax") {
            rjCode = rjCode.toUpperCase();
            const result = {
                translation_request_english: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_simplified_chinese:{
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_traditional_chinese:{
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_korean: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_spanish: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_german: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_french: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_indonesian: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_italian: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_portuguese: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_swedish: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_thai: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
                translation_request_vietnamese: {
                    agree: undefined,
                    request: undefined,
                    sale: undefined
                },
            };
            const data = await DLsite.getTranslatableApiPromise(rjCode, site);
            if(!data.translationStatusForTranslator){
                return result;
            }

            const map = {
                translation_request_english: "ENG",
                translation_request_simplified_chinese: "CHI_HANS",
                translation_request_traditional_chinese: "CHI_HANT",
                translation_request_korean: "KO_KR",
                translation_request_spanish: "SPA",
                translation_request_german: "GER",
                translation_request_french: "FRE",
                translation_request_indonesian: "IND",
                translation_request_italian: "ITA",
                translation_request_portuguese: "POR",
                translation_request_swedish: "SWE",
                translation_request_thai: "THA",
                translation_request_vietnamese: "VIE",
            };
            for (let key in map) {
                let lang = map[key];
                let status = data.translationStatusForTranslator[lang];
                if(!status){
                    //状况未知
                    continue;
                }
                result[key].agree = status.available;
                result[key].request = status.count;
                result[key].sale = status.on_sale_count;
            }

            return result;
        },

        getTranslatableApiPromise: async function (rjCode, site = "maniax") {
            //新的可用api，用于搜索作品翻译情况，但也可以获得其它信息。
            rjCode = rjCode.toUpperCase();
            let url = `https://www.dlsite.com/${site}/api/=/translatableProducts.json?keyword=${rjCode}`;    //可以使用locale参数指定语言，但这里不需要
            let resp = await getHttpAsync(url, true);
            let data;
            if (resp.readyState === 4 && resp.status === 200) {
                data = JSON.parse(resp.responseText);
            }
            else {
                throw new Error(`无法通过API获取${rjCode}的翻译信息：${resp.status} ${resp.statusText}`);
            }

            //从结果中找到对应RJ号，由于关键字是RJ号的话结果一般都在第一页，所以就放弃翻页寻找了
            if(data.meta && data.meta.code !== 200){
                throw new Error(`无法通过API查询${rjCode}的翻译信息：${data.meta.code} - ${data.meta.errorType} - ${data.meta.errorMessage}`);
            }
            if(!data.data || !Array.isArray(data.data.products)){
                throw new Error(`无法通过API查询${rjCode}的翻译信息：未预料到的响应格式。`);
            }

            for (const work of data.data.products) {
                if(work.id === rjCode){
                    return work;
                }
            }

            //未找到则返回空对象
            return {};

        },

        getWorkRequestPromise: function (rjCode) {
            return {
                _info: undefined,
                _api: undefined,
                _api2: undefined,
                _circle: undefined,
                _translatable: undefined,
                _translated_title: undefined,
                get info(){
                    return this._info ? this._info : this._info = DLsite.getHtmlPromise(rjCode);
                },
                get api() {
                    return this._api ? this._api : this._api = DLsite.getApiPromise(rjCode);
                },
                get api2() {
                    return this._api2 ? this._api2 : this._api2 = DLsite.getApi2Promise(rjCode);
                },
                get circle(){
                    return this._circle ? this._circle : this._circle = DLsite.getCirclePromise(rjCode, this.api);
                },
                get translatable() {
                    async function getter(t){
                        let api = await t.api2;
                        if(!api.site_id) api = await t.api;

                        return t._translatable ? t._translatable : t._translatable = DLsite.getTranslatablePromise(rjCode,
                            api.site_id ? api.site_id : "maniax");
                    }
                    return getter(this);
                },
                get translated_title(){
                    async function getter(t){
                        if(t._translated_title) return t._translated_title;

                        let api = await t.api2;
                        if(api.translation_info){
                            //api2有效
                            if(!api.translation_info.is_original) {
                                //通过再次查询获得翻译标题
                                api = await DLsite.getApi2Promise(rjCode, api.lang);
                            }
                            t._translated_title = api.work_name;
                            return t._translated_title;
                        }

                        //api2无效，通过api查询
                        api = await t.api;
                        if(!api.translation_info){
                            //api无效则无法获取标题（网页获取希望渺茫）
                            t._translated_title = null;
                            return null;
                        }

                        if(!api.translation_info.is_original) {
                            //非原作则再次查询
                            api = await DLsite.getApiPromise(rjCode, api.lang);
                        }
                        t._translated_title = api.work_name;
                        return t._translated_title;
                    }

                    return getter(this);
                }
            }
        },

        getParentWorkRjCode: function (redirectUrl){
            const reg = new RegExp("(?<=product_id/)((R[JE][0-9]{8})|(R[JE][0-9]{6})|([VB]J[0-9]{8})|([VB]J[0-9]{6}))")
            return redirectUrl.match(reg)[0];
        }
    }

    //endregion

    //region 设置页面构造

    /**
     * 设置页面模板对象
     */
    function getSettingsUi() {
        return {
            //这一层是设置界面最顶层，编辑大标题信息
            title: localize(localizationMap.title_settings),
            items: [
                {
                    //这一层是设置界面的大分类
                    title: localize(localizationMap.title_language_settings),
                    items: [
                        {
                            //这一层是设置项列表集合（使用表格呈现设置项）"
                            items: [
                                {
                                    //这一层是设置项
                                    type: "dropdown",
                                    title: localize(localizationMap.display_language),
                                    id: "lang",
                                    ignore_reset: true,
                                    options: [
                                        {
                                            title: "简体中文",
                                            value: "zh_CN"
                                        },
                                        {
                                            title: "繁體中文",
                                            value: "zh_TW"
                                        },
                                        {
                                            title: "English",
                                            value: "en_US"
                                        }
                                    ]
                                },
                                {
                                    //这一层是设置项
                                    type: "dropdown",
                                    title: localize(localizationMap.popup_language),
                                    id: "popup_lang",
                                    ignore_reset: true,
                                    tooltip: localize(localizationMap.popup_language_tooltip),
                                    options: [
                                        {
                                            title: "简体中文",
                                            value: "zh_CN"
                                        },
                                        {
                                            title: "繁體中文",
                                            value: "zh_TW"
                                        },
                                        {
                                            title: "English",
                                            value: "en_US"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    //这一层是设置界面的大分类
                    title: localize(localizationMap.title_general_settings),
                    items: [
                        {
                            //这一层是设置项列表集合（使用表格呈现设置项）
                            items: [
                                {
                                    //解析URL
                                    type: "checkbox",
                                    title: localize(localizationMap.parse_url),
                                    id: "parse_url",
                                    tooltip: localize(localizationMap.parse_url_tooltip)
                                },
                                {
                                    //DL上解析URL
                                    binding: {
                                        target: "parse_url",
                                        value: true
                                    },

                                    type: "checkbox",
                                    title: localize(localizationMap.parse_url_in_dl),
                                    id: "parse_url_in_dl",
                                    indent: 1,  //设置项缩进
                                    tooltip: localize(localizationMap.parse_url_in_dl_tooltip)
                                },
                                {
                                    //DL显示翻译标题
                                    type: "checkbox",
                                    title: localize(localizationMap.show_translated_title_in_dl),
                                    id: "show_translated_title_in_dl",
                                    tooltip: localize(localizationMap.show_translated_title_in_dl_tooltip)
                                },
                                {
                                    //“复制为有效文件名”按钮
                                    type: "checkbox",
                                    title: localize(localizationMap.copy_as_filename_btn),
                                    id: "copy_as_filename_btn",
                                    tooltip: localize(localizationMap.copy_as_filename_btn_tooltip)
                                },
                                {
                                    //**显示兼容性警告**
                                    type: "checkbox",
                                    title: `<strong>**${localize(localizationMap.show_compatibility_warning)}**</strong>`,
                                    id: "show_compatibility_warning",
                                    tooltip: localize(localizationMap.show_compatibility_warning_tooltip)
                                },
                                {
                                    //导向文本插入方式
                                    type: "dropdown",
                                    title: localize(localizationMap.url_insert_mode),
                                    id: "url_insert_mode",
                                    tooltip: localize(localizationMap.url_insert_mode_tooltip),
                                    options: [
                                        {
                                            title: localize(localizationMap.url_insert_mode_none),
                                            value: "none"
                                        },
                                        {
                                            title: localize(localizationMap.url_insert_mode_prefix),
                                            value: "prefix"
                                        },
                                        {
                                            title: localize(localizationMap.url_insert_mode_before_rj),
                                            value: "before_rj"
                                        }
                                    ]
                                },
                                {
                                    //导向文本
                                    type: "input",
                                    title: localize(localizationMap.url_insert_text),
                                    id: "url_insert_text",
                                    indent: 1
                                },

                                {
                                    //NSFW模式
                                    type: "checkbox",
                                    title: localize(localizationMap.sfw_mode),
                                    id: "sfw_mode",
                                    tooltip: localize(localizationMap.sfw_mode_tooltip)
                                },
                                {
                                    //模糊程度
                                    binding: {
                                        target: "sfw_mode",
                                        value: true
                                    },

                                    type: "dropdown",
                                    title: localize(localizationMap.sfw_blur_level),
                                    id: "sfw_blur_level",
                                    indent: 1,
                                    options: [
                                        {
                                            title: localize(localizationMap.low),
                                            value: "low"
                                        },
                                        {
                                            title: localize(localizationMap.medium),
                                            value: "medium"
                                        },
                                        {
                                            title: localize(localizationMap.high),
                                            value: "high"
                                        }
                                    ]
                                },
                                {
                                    //鼠标移至图片上方移除模糊
                                    binding: {
                                        target: "sfw_mode",
                                        value: true
                                    },

                                    type: "checkbox",
                                    title: localize(localizationMap.sfw_remove_when_hover),
                                    id: "sfw_remove_when_hover",
                                    indent: 1,
                                },
                                {
                                    //是否开启模糊动画
                                    binding: {
                                        target: "sfw_mode",
                                        value: true
                                    },

                                    type: "checkbox",
                                    title: localize(localizationMap.sfw_blur_transition),
                                    id: "sfw_blur_transition",
                                    indent: 1,
                                }
                            ]
                        }
                    ]
                },
                {
                    //分类：信息显示
                    title: localize(localizationMap.title_info_settings),
                    items: [
                        {
                            //预设表格
                            items: [
                                {
                                    type: "dropdown",
                                    title: localize(localizationMap.category_preset),
                                    id: "category_preset",
                                    tooltip: localize(localizationMap.category_preset_tooltip),
                                    ignore_reset: true,  //不显示重置按钮
                                    options: [
                                        {
                                            title: localize(localizationMap.work_type_voice),
                                            value: "voice"
                                        },
                                        {
                                            title: localize(localizationMap.work_type_game),
                                            value: "game"
                                        },
                                        {
                                            title: `${localize(localizationMap.work_type_comic)} / ${localize(localizationMap.work_type_illustration)} / ${localize(localizationMap.work_type_voice_comic)}`,
                                            value: "manga"
                                        },
                                        {
                                            title: localize(localizationMap.work_type_video),
                                            value: "video"
                                        },
                                        {
                                            title: localize(localizationMap.work_type_novel),
                                            value: "novel"
                                        },
                                        {
                                            title: localize(localizationMap.work_type_other),
                                            value: "other"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            //音声Preset对应的表格，注意使用Binding来决定表格是否显示
                            binding: {
                                target: "category_preset",
                                value: "voice"
                            },
                            sortable: true,  //为true则代表该表格内的行可以排序
                            sort_id: "voice__info_display_order",  //若排序则一定要指定id，该id将会存储在设置项中，作为列表记录每个元素的顺序
                            items: [
                                {
                                    //销量
                                    type: "checkbox",
                                    title: localize(localizationMap.dl_count),
                                    id: "voice__dl_count",  //注意这里不同的preset要改成不同的值
                                },
                                {
                                    //社团名
                                    type: "checkbox",
                                    title: localize(localizationMap.circle_name),
                                    id: "voice__circle_name",  //注意这里不同的preset要改成不同的值
                                },
                                {
                                    //翻译者
                                    type: "checkbox",
                                    title: localize(localizationMap.translator_name),
                                    id: "voice__translator_name",
                                },
                                {
                                    //发售日
                                    type: "checkbox",
                                    title: localize(localizationMap.release_date),
                                    id: "voice__release_date",
                                },
                                {
                                    //更新日
                                    type: "checkbox",
                                    title: localize(localizationMap.update_date),
                                    id: "voice__update_date",
                                },
                                {
                                    //年龄指定
                                    type: "checkbox",
                                    title: localize(localizationMap.age_rating),
                                    id: "voice__age_rating",
                                },
                                {
                                    //剧情作者
                                    type: "checkbox",
                                    title: localize(localizationMap.scenario),
                                    id: "voice__scenario",
                                },
                                {
                                    //插画作者
                                    type: "checkbox",
                                    title: localize(localizationMap.illustration),
                                    id: "voice__illustration",
                                },
                                {
                                    //配音者
                                    type: "checkbox",
                                    title: localize(localizationMap.voice_actor),
                                    id: "voice__voice_actor",
                                },
                                {
                                    //音乐作者
                                    type: "checkbox",
                                    title: localize(localizationMap.music),
                                    id: "voice__music",
                                },
                                {
                                    //作品标签/分类
                                    type: "checkbox",
                                    title: localize(localizationMap.genre),
                                    id: "voice__genre",
                                },
                                {
                                    //文件大小
                                    type: "checkbox",
                                    title: localize(localizationMap.file_size),
                                    id: "voice__file_size",
                                }
                            ]
                        },
                        {
                            //游戏Preset对应的表格
                            binding: {
                                target: "category_preset",
                                value: "game"
                            },
                            sortable: true,  //为true则代表该表格内的行可以排序
                            sort_id: "game__info_display_order",
                            items: [
                                {
                                    //销量
                                    type: "checkbox",
                                    title: localize(localizationMap.dl_count),
                                    id: "game__dl_count",
                                },
                                {
                                    //社团名
                                    type: "checkbox",
                                    title: localize(localizationMap.circle_name),
                                    id: "game__circle_name",
                                },
                                {
                                    //翻译者
                                    type: "checkbox",
                                    title: localize(localizationMap.translator_name),
                                    id: "game__translator_name",
                                },
                                {
                                    //发售日
                                    type: "checkbox",
                                    title: localize(localizationMap.release_date),
                                    id: "game__release_date",
                                },
                                {
                                    //更新日
                                    type: "checkbox",
                                    title: localize(localizationMap.update_date),
                                    id: "game__update_date",
                                },
                                {
                                    //年龄指定
                                    type: "checkbox",
                                    title: localize(localizationMap.age_rating),
                                    id: "game__age_rating",
                                },
                                {
                                    //剧情作者
                                    type: "checkbox",
                                    title: localize(localizationMap.scenario),
                                    id: "game__scenario",
                                },
                                {
                                    //插画作者
                                    type: "checkbox",
                                    title: localize(localizationMap.illustration),
                                    id: "game__illustration",
                                },
                                {
                                    //配音者
                                    type: "checkbox",
                                    title: localize(localizationMap.voice_actor),
                                    id: "game__voice_actor",
                                },
                                {
                                    //音乐作者
                                    type: "checkbox",
                                    title: localize(localizationMap.music),
                                    id: "game__music",
                                },
                                {
                                    //作品标签/分类
                                    type: "checkbox",
                                    title: localize(localizationMap.genre),
                                    id: "game__genre",
                                },
                                {
                                    //文件大小
                                    type: "checkbox",
                                    title: localize(localizationMap.file_size),
                                    id: "game__file_size",
                                }
                            ]
                        },
                        {
                            //漫画对应preset
                            binding: {
                                target: "category_preset",
                                value: "manga"
                            },
                            sortable: true,  //为true则代表该表格内的行可以排序
                            sort_id: "manga__info_display_order",
                            items: [
                                {
                                    //销量
                                    type: "checkbox",
                                    title: localize(localizationMap.dl_count),
                                    id: "manga__dl_count",
                                },
                                {
                                    //社团名
                                    type: "checkbox",
                                    title: localize(localizationMap.circle_name),
                                    id: "manga__circle_name",
                                },
                                {
                                    //翻译者
                                    type: "checkbox",
                                    title: localize(localizationMap.translator_name),
                                    id: "manga__translator_name",
                                },
                                {
                                    //发售日
                                    type: "checkbox",
                                    title: localize(localizationMap.release_date),
                                    id: "manga__release_date",
                                },
                                {
                                    //更新日
                                    type: "checkbox",
                                    title: localize(localizationMap.update_date),
                                    id: "manga__update_date",
                                },
                                {
                                    //年龄指定
                                    type: "checkbox",
                                    title: localize(localizationMap.age_rating),
                                    id: "manga__age_rating",
                                },
                                {
                                    //剧情作者
                                    type: "checkbox",
                                    title: localize(localizationMap.scenario),
                                    id: "manga__scenario",
                                },
                                {
                                    //插画作者
                                    type: "checkbox",
                                    title: localize(localizationMap.illustration),
                                    id: "manga__illustration",
                                },
                                {
                                    //配音者
                                    type: "checkbox",
                                    title: localize(localizationMap.voice_actor),
                                    id: "manga__voice_actor",
                                    tooltip: localize(localizationMap.work_type_voice_comic)
                                },
                                {
                                    //音乐作者
                                    type: "checkbox",
                                    title: localize(localizationMap.music),
                                    id: "manga__music",
                                },
                                {
                                    //作品标签/分类
                                    type: "checkbox",
                                    title: localize(localizationMap.genre),
                                    id: "manga__genre",
                                },
                                {
                                    //文件大小
                                    type: "checkbox",
                                    title: localize(localizationMap.file_size),
                                    id: "manga__file_size",
                                }
                            ]
                        },
                        {
                            //视频对应preset
                            binding: {
                                target: "category_preset",
                                value: "video"
                            },
                            sortable: true,  //为true则代表该表格内的行可以排序
                            sort_id: "video__info_display_order",
                            items: [
                                {
                                    //销量
                                    type: "checkbox",
                                    title: localize(localizationMap.dl_count),
                                    id: "video__dl_count",
                                },
                                {
                                    //社团名
                                    type: "checkbox",
                                    title: localize(localizationMap.circle_name),
                                    id: "video__circle_name",
                                },
                                {
                                    //翻译者
                                    type: "checkbox",
                                    title: localize(localizationMap.translator_name),
                                    id: "video__translator_name",
                                },
                                {
                                    //发售日
                                    type: "checkbox",
                                    title: localize(localizationMap.release_date),
                                    id: "video__release_date",
                                },
                                {
                                    //更新日
                                    type: "checkbox",
                                    title: localize(localizationMap.update_date),
                                    id: "video__update_date",
                                },
                                {
                                    //年龄指定
                                    type: "checkbox",
                                    title: localize(localizationMap.age_rating),
                                    id: "video__age_rating",
                                },
                                {
                                    //剧情作者
                                    type: "checkbox",
                                    title: localize(localizationMap.scenario),
                                    id: "video__scenario",
                                },
                                {
                                    //插画作者
                                    type: "checkbox",
                                    title: localize(localizationMap.illustration),
                                    id: "video__illustration",
                                },
                                {
                                    //配音者
                                    type: "checkbox",
                                    title: localize(localizationMap.voice_actor),
                                    id: "video__voice_actor",
                                },
                                {
                                    //音乐作者
                                    type: "checkbox",
                                    title: localize(localizationMap.music),
                                    id: "video__music",
                                },
                                {
                                    //作品标签/分类
                                    type: "checkbox",
                                    title: localize(localizationMap.genre),
                                    id: "video__genre",
                                },
                                {
                                    //文件大小
                                    type: "checkbox",
                                    title: localize(localizationMap.file_size),
                                    id: "video__file_size",
                                }
                            ]
                        },
                        {
                            //小说对应Preset
                            binding: {
                                target: "category_preset",
                                value: "novel"
                            },
                            sortable: true,  //为true则代表该表格内的行可以排序
                            sort_id: "novel__info_display_order",
                            items: [
                                {
                                    //销量
                                    type: "checkbox",
                                    title: localize(localizationMap.dl_count),
                                    id: "novel__dl_count",
                                },
                                {
                                    //社团名
                                    type: "checkbox",
                                    title: localize(localizationMap.circle_name),
                                    id: "novel__circle_name",
                                },
                                {
                                    //翻译者
                                    type: "checkbox",
                                    title: localize(localizationMap.translator_name),
                                    id: "novel__translator_name",
                                },
                                {
                                    //发售日
                                    type: "checkbox",
                                    title: localize(localizationMap.release_date),
                                    id: "novel__release_date",
                                },
                                {
                                    //更新日
                                    type: "checkbox",
                                    title: localize(localizationMap.update_date),
                                    id: "novel__update_date",
                                },
                                {
                                    //年龄指定
                                    type: "checkbox",
                                    title: localize(localizationMap.age_rating),
                                    id: "novel__age_rating",
                                },
                                {
                                    //剧情作者
                                    type: "checkbox",
                                    title: localize(localizationMap.scenario),
                                    id: "novel__scenario",
                                },
                                {
                                    //插画作者
                                    type: "checkbox",
                                    title: localize(localizationMap.illustration),
                                    id: "novel__illustration",
                                },
                                {
                                    //配音者
                                    type: "checkbox",
                                    title: localize(localizationMap.voice_actor),
                                    id: "novel__voice_actor",
                                },
                                {
                                    //音乐作者
                                    type: "checkbox",
                                    title: localize(localizationMap.music),
                                    id: "novel__music",
                                },
                                {
                                    //作品标签/分类
                                    type: "checkbox",
                                    title: localize(localizationMap.genre),
                                    id: "novel__genre",
                                },
                                {
                                    //文件大小
                                    type: "checkbox",
                                    title: localize(localizationMap.file_size),
                                    id: "novel__file_size",
                                }
                            ]
                        },
                        {
                            //其他对应Preset
                            binding: {
                                target: "category_preset",
                                value: "other"
                            },
                            sortable: true,  //为true则代表该表格内的行可以排序
                            sort_id: "other__info_display_order",
                            items: [
                                {
                                    //销量
                                    type: "checkbox",
                                    title: localize(localizationMap.dl_count),
                                    id: "other__dl_count",
                                },
                                {
                                    //社团名
                                    type: "checkbox",
                                    title: localize(localizationMap.circle_name),
                                    id: "other__circle_name",
                                },
                                {
                                    //翻译者
                                    type: "checkbox",
                                    title: localize(localizationMap.translator_name),
                                    id: "other__translator_name",
                                },
                                {
                                    //发售日
                                    type: "checkbox",
                                    title: localize(localizationMap.release_date),
                                    id: "other__release_date",
                                },
                                {
                                    //更新日
                                    type: "checkbox",
                                    title: localize(localizationMap.update_date),
                                    id: "other__update_date",
                                },
                                {
                                    //年龄指定
                                    type: "checkbox",
                                    title: localize(localizationMap.age_rating),
                                    id: "other__age_rating",
                                },
                                {
                                    //剧情作者
                                    type: "checkbox",
                                    title: localize(localizationMap.scenario),
                                    id: "other__scenario",
                                },
                                {
                                    //插画作者
                                    type: "checkbox",
                                    title: localize(localizationMap.illustration),
                                    id: "other__illustration",
                                },
                                {
                                    //配音者
                                    type: "checkbox",
                                    title: localize(localizationMap.voice_actor),
                                    id: "other__voice_actor",
                                },
                                {
                                    //音乐作者
                                    type: "checkbox",
                                    title: localize(localizationMap.music),
                                    id: "other__music",
                                },
                                {
                                    //作品标签/分类
                                    type: "checkbox",
                                    title: localize(localizationMap.genre),
                                    id: "other__genre",
                                },
                                {
                                    //文件大小
                                    type: "checkbox",
                                    title: localize(localizationMap.file_size),
                                    id: "other__file_size",
                                }
                            ]
                        }
                    ]
                },
                {
                    //分类：标签显示
                    title: localize(localizationMap.title_tag_settings),
                    items: [
                        {
                            //总开关表格
                            items: [
                                {
                                    type: "checkbox",
                                    title: localize(localizationMap.tag_main_switch),
                                    tooltip: localize(localizationMap.tag_main_switch_tooltip),
                                    id: "tag_main_switch"
                                },
                                {
                                    //显示评分人数
                                    type: "checkbox",
                                    title: localize(localizationMap.show_rate_count),
                                    id: "show_rate_count",
                                    indent: 1
                                }
                            ]
                        },
                        {
                            //标签开关表格
                            binding: {
                                target: "tag_main_switch",
                                value: true
                            },
                            items: [
                                {
                                    //所有的标签开关集合
                                    type: "tag_switch",
                                    //标签之间可以排序
                                    sortable: true,
                                    sort_id: "tag_display_order",
                                    items: [
                                        {
                                            //销量
                                            title: localize(localizationMap.rate),
                                            id: "tag_rate",
                                            class: "tag-yellow",
                                            tooltip: localize(localizationMap.rate_tooltip)
                                        },
                                        {
                                            //作品类型
                                            title: localize(localizationMap.tag_work_type),
                                            id: "tag_work_type",
                                            class: "tag-darkblue",
                                            tooltip: `
<div class="${VOICELINK_CLASS}_tags">
    <span class="${VOICELINK_CLASS}_tag-purple">${localize(localizationMap.work_type_game)}</span>
    <span class="${VOICELINK_CLASS}_tag-green">${localize(localizationMap.work_type_comic)}</span>
    <span class="${VOICELINK_CLASS}_tag-teal">${localize(localizationMap.work_type_illustration)}</span>
    <span class="${VOICELINK_CLASS}_tag-gray">${localize(localizationMap.work_type_novel)}</span>
    <span class="${VOICELINK_CLASS}_tag-darkblue">${localize(localizationMap.work_type_video)}</span>
    <span class="${VOICELINK_CLASS}_tag-orange">${localize(localizationMap.work_type_voice)}</span>
    <span class="${VOICELINK_CLASS}_tag-yellow">${localize(localizationMap.work_type_music)}</span>
    <span class="${VOICELINK_CLASS}_tag-gray">${localize(localizationMap.work_type_tool)}</span>
    <span class="${VOICELINK_CLASS}_tag-blue">${localize(localizationMap.work_type_voice_comic)}</span>
    <span class="${VOICELINK_CLASS}_tag-gray">${localize(localizationMap.work_type_other)}</span>
</div>`,
                                        },
                                        {
                                            //可翻译
                                            title: localize(localizationMap.tag_translatable),
                                            id: "tag_translatable",
                                            class: "tag-green",
                                            tooltip: localize(localizationMap.tag_translatable_tooltip)
                                        },
                                        {
                                            //不可翻译
                                            title: localize(localizationMap.tag_not_translatable),
                                            id: "tag_not_translatable",
                                            class: "tag-red",
                                            tooltip: localize(localizationMap.tag_not_translatable_tooltip)
                                        },
                                        {
                                            //翻译作品
                                            title: localize(localizationMap.tag_translated),
                                            id: "tag_translated",
                                            class: "tag-teal",
                                            tooltip: localize(localizationMap.tag_translated_tooltip)
                                        },
                                        {
                                            //支持语言
                                            title: localize(localizationMap.tag_language_support),
                                            id: "tag_language_support",
                                            class: "tag-pink",
                                            tooltip: `
<div class="${VOICELINK_CLASS}_tags">
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_japanese)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_simplified_chinese)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_traditional_chinese)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_english)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_korean)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_german)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_french)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_indonesian)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_italian)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_portuguese)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_swedish)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_thai)}</span>
<span class="${VOICELINK_CLASS}_tag-pink">${localize(localizationMap.language_vietnamese)}</span>
</div>
                  `
                                        },
                                        {
                                            //特典作品
                                            title: localize(localizationMap.tag_bonus_work),
                                            id: "tag_bonus_work",
                                            class: "tag-yellow",
                                            tooltip: localize(localizationMap.tag_bonus_work_tooltip)
                                        },
                                        {
                                            //含特典
                                            title: localize(localizationMap.tag_has_bonus),
                                            id: "tag_has_bonus",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.tag_has_bonus_tooltip)
                                        },
                                        {
                                            //文件格式
                                            title: localize(localizationMap.tag_file_format),
                                            id: "tag_file_format",
                                            class: "tag-darkblue",
                                            tooltip: localize(localizationMap.tag_file_format_tooltip)
                                        },
                                        {
                                            //已下架
                                            title: localize(localizationMap.tag_no_longer_available),
                                            id: "tag_no_longer_available",
                                            class: "tag-gray",
                                        },
                                        {
                                            //AI & 部分AI
                                            title: localize(localizationMap.tag_ai),
                                            id: "tag_ai",
                                            class: "tag-purple",
                                            tooltip: localize(localizationMap.tag_ai_tooltip)
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            //翻译情况显示表格
                            items: [
                                {
                                    //翻译情况显示开关
                                    type: "checkbox",
                                    title: localize(localizationMap.tag_translation_request),
                                    id: "tag_translation_request",
                                    tooltip: localize(localizationMap.tag_translation_request_tooltip)
                                },
                            ]
                        },
                        {
                            //翻译情况标签显示表格
                            binding: {
                                target: "tag_translation_request",
                                value: true
                            },
                            items: [
                                {
                                    //各种翻译情况显示
                                    type: "tag_switch",
                                    sortable: true,
                                    sort_id: "tag_translation_request_display_order",
                                    items: [
                                        {
                                            //英语
                                            title: `${localize(localizationMap.language_english_abbr)} 1-1`,
                                            id: "tag_translation_request_english",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_english)
                                        },
                                        {
                                            //简体中文
                                            title: `${localize(localizationMap.language_simplified_chinese_abbr)} 1-1`,
                                            id: "tag_translation_request_simplified_chinese",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_simplified_chinese)
                                        },
                                        {
                                            //繁体中文
                                            title: `${localize(localizationMap.language_traditional_chinese_abbr)} 1-1`,
                                            id: "tag_translation_request_traditional_chinese",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_traditional_chinese)
                                        },
                                        {
                                            //韩语
                                            title: `${localize(localizationMap.language_korean_abbr)} 1-1`,
                                            id: "tag_translation_request_korean",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_korean)
                                        },
                                        {
                                            //西班牙语
                                            title: `${localize(localizationMap.language_spanish_abbr)} 1-1`,
                                            id: "tag_translation_request_spanish",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_spanish)
                                        },
                                        {
                                            //德语
                                            title: `${localize(localizationMap.language_german_abbr)} 1-1`,
                                            id: "tag_translation_request_german",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_german)
                                        },
                                        {
                                            //法语
                                            title: `${localize(localizationMap.language_french_abbr)} 1-1`,
                                            id: "tag_translation_request_french",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_french)
                                        },
                                        {
                                            //印尼语
                                            title: `${localize(localizationMap.language_indonesian_abbr)} 1-1`,
                                            id: "tag_translation_request_indonesian",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_indonesian)
                                        },
                                        {
                                            //意大利语
                                            title: `${localize(localizationMap.language_italian_abbr)} 1-1`,
                                            id: "tag_translation_request_italian",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_italian)
                                        },
                                        {
                                            //葡萄牙语
                                            title: `${localize(localizationMap.language_portuguese_abbr)} 1-1`,
                                            id: "tag_translation_request_portuguese",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_portuguese)
                                        },
                                        {
                                            //瑞典语
                                            title: `${localize(localizationMap.language_swedish_abbr)} 1-1`,
                                            id: "tag_translation_request_swedish",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_swedish)
                                        },
                                        {
                                            //泰语
                                            title: `${localize(localizationMap.language_thai_abbr)} 1-1`,
                                            id: "tag_translation_request_thai",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_thai)
                                        },
                                        {
                                            //越南语
                                            title: `${localize(localizationMap.language_vietnamese_abbr)} 1-1`,
                                            id: "tag_translation_request_vietnamese",
                                            class: "tag-orange",
                                            tooltip: localize(localizationMap.language_vietnamese)
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    //分类：仓库检查
                    //TODO 本地化
                    title: "仓库检查",
                    items: [
                        {
                            items: [
                                {
                                    //仓检开关
                                    type: "checkbox",
                                    title: "开启仓检",
                                    id: "base_search",
                                    tooltip: "开启后，会检查特定仓库内的作品及其相关版本是否存在，并以标签的形式展示每个仓库的搜索结果。<br/><br/>" +
                                        "<b><u>注意：该功能会向第三方仓库API发送查询信息，若仓库不属于你，请在确认仓库所有者允许的情况下使用该功能！</u></b>"
                                },
                                {
                                    //仓库地址(API)
                                    binding: {
                                        target: "base_search",
                                        value: true
                                    },

                                    type: "input",
                                    title: "仓库查询url (API)",
                                    id: "search_url_pattern",
                                    tooltip: "仓库搜索url模板，输入%s表示RJ号（请输入API地址而非前端地址）<br/>" +
                                        "如果你不知道api地址，请留空仅填写结果展示url，保存并刷新页面后，系统会尝试匹配可能的api地址<br/><br/>" +
                                        "<b>例如：https://www.xxx.com/api/search?desc=1&keyword=%s</b>",
                                },
                                {
                                    //仓库地址(前端)
                                    binding: {
                                        target: "base_search",
                                        value: true
                                    },

                                    type: "input",
                                    title: "结果展示url (前端)",
                                    id: "show_url_pattern",
                                    tooltip: "结果展示url模板，输入%s表示RJ号（请输入你在仓库搜索时，地址栏展示的url）<br/><br/>" +
                                        "<b>例如：https://www.xxx.com/works?search=%s</b>",
                                },
                                {
                                    //自定义请求头
                                    binding: {
                                        target: "base_search",
                                        value: true
                                    },

                                    type: "textarea",
                                    title: "自定义请求头",
                                    id: "search_url_headers",
                                    tooltip: "每行一个，格式为key:value，用换行符分隔。（通常仓库需要身份认证才可访问，此时需要添加认证用请求头）<br/><br/>" +
                                        "<b>例如：<br/>Authorization: Bearer xxxxxxxxxx</b>",
                                },
                                {
                                    //是否查找完整关联
                                    binding: {
                                        target: "base_search",
                                        value: true
                                    },

                                    type: "checkbox",
                                    title: "完整关联",
                                    id: "full_linkage",
                                    tooltip: "查询仓库前，会先寻找与该作品相关的其它作品（如原版、翻译版等）<br/>" +
                                        "会产生多次网络请求，但能使得仓库搜索结果更完整（需要同时开启连锁查询）"
                                },
                                {
                                    //搜索语言列表
                                    binding: {
                                        target: "base_search",
                                        value: true
                                    },

                                    type: "input",
                                    title: "语言列表",
                                    id: "cue_languages",
                                    tooltip: "用空格分隔的语言代码，代表你想要搜索的所有语言关联。<br/>" +
                                        "语言个数会影响搜索效率和发往DLSite的请求数量。<br/><br/>" +
                                        "<b>例子：CHI_HANS CHI_HANT ENG</b><br/>" +
                                        "上例表示需要搜索简体中文、繁体中文、英文语言的翻译作品关联，其它语言的关联将不会搜寻。"
                                },
                                {
                                    //是否进行连锁查询
                                    binding: {
                                        target: "base_search",
                                        value: true
                                    },

                                    type: "checkbox",
                                    title: "连锁查询",
                                    id: "search_linkage",
                                    tooltip: "搜索仓库时，对所有关联的RJ号进行搜索，可能产生多次请求。<br/>" +
                                        "如果你的仓库包含搜索其它语言版本的功能，开启此项也不会影响速度。"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    class SettingPageBuilder {
        constructor(structure, settings) {
            this.structure = structure;
            this.settings = settings;
            this.container = null;
        }

        getClass(name) {
            if(!VOICELINK_CLASS || VOICELINK_CLASS === "") return name;
            return `${VOICELINK_CLASS}_${name}`;
        }

        build(useTemp = false) {
            const f = this.structure;
            let tempSettings = this.settings;

            //若未要求则清空设置暂存
            if(useTemp){
                tempSettings = {};
                for(let key in this.settings.temp_edited){
                    if(!key.startsWith("_s_")) continue;
                    tempSettings[key] = this.settings.temp_edited[key];
                }
            }else{
                this.settings.clearTemp();
            }

            //创建container
            const container = document.createElement("div");
            container.className = this.getClass("container");
            container.id = this.getClass("settings-container");
            this.container = container;

            //创建关闭按钮
            const closeButton = document.createElement("button");
            closeButton.id = this.getClass("button-close");
            closeButton.innerText = "X";
            closeButton.onclick = () => {
                container.remove();
            };
            container.appendChild(closeButton);

            //创建标题
            const title = document.createElement("h1");
            title.innerText = f.title;
            container.appendChild(title);

            //遍历构建Section
            for(const section of f.items){
                container.appendChild(this.buildSection(section));
            }

            //添加保存、重置按钮
            const buttonContainer = document.createElement("div");
            buttonContainer.className = this.getClass("button-container");
            const saveButton = document.createElement("button");
            saveButton.id = this.getClass("button-save");
            saveButton.innerText = localize(localizationMap.button_save);
            saveButton.onclick = () => {
                try{
                    this.settings.save();
                    window.alert(localize(localizationMap.save_complete))
                    container.remove();
                }catch (e){
                    window.alert(e);
                }
            };
            const resetButton = document.createElement("button");
            resetButton.id = this.getClass("button-reset");
            resetButton.innerText = localize(localizationMap.button_reset);
            resetButton.onclick = () => {
                if(!window.confirm(localize(localizationMap.reset_confirm))){
                    return;
                }
                try{
                    // this.settings.reset();
                    window.alert(localize(localizationMap.reset_complete))
                }catch (e) {
                    window.alert(e);
                }
                this.refreshSettings(this.settings.default_backup);
            };
            buttonContainer.appendChild(saveButton);
            buttonContainer.appendChild(resetButton);
            container.appendChild(buttonContainer);

            this.initSortableElement();
            this.refreshSettings(tempSettings);
            return container;
        };

        buildSection(section){
            //创建容器
            const container = document.createElement("div");
            container.className = this.getClass("section-container");

            //创建标题
            const title = document.createElement("h2");
            title.innerText = section.title;
            container.appendChild(title);

            //遍历构建Table
            for(const item of section.items){
                container.appendChild(this.buildTable(item, container));
            }

            return container;
        };

        buildTable(table, section){
            //创建table
            const tableElement = document.createElement("table");

            //创建可能存在的preset绑定
            this.createBinding(table, tableElement, section);

            //遍历构建Row（先把row缓存在列表里，经过排序后构建）
            let rowList = [];
            const nodesCache = document.createElement("div");
            for(const row of table.items){
                let rowElement = this.buildRow(row, nodesCache);
                if(table.sortable){
                    this.setSortable(rowElement);
                }
                rowList.push(rowElement);

                //存入缓存用于绑定
                nodesCache.appendChild(rowElement);
            }

            //重置按钮行
            let resetRow;
            if(table.sortable){
                tableElement.setAttribute("data-sort-id", table.sort_id);
                this.sortSortable(rowList, table.sort_id);

                //若可排序则还要添加重置按钮
                if(table.ignore_reset !== true){
                    resetRow = document.createElement("tr");
                    const resetCell = document.createElement("td");
                    resetCell.classList.add(this.getClass("input-cell"))
                    resetCell.colSpan = 2;
                    resetCell.style.setProperty("text-align", "right", "important");  //textAlign = "right !important";
                    const resetButton = document.createElement("button");
                    resetButton.classList.add(this.getClass("button-flat"));
                    resetButton.title = localize(localizationMap.reset_order);
                    resetButton.style.setProperty("margin-right", "0", "important");  //marginRight = "0 !important";
                    resetButton.style.setProperty("margin-bottom", "0", "important");  //marginBottom = "0 !important";
                    const icon = document.createElement("span");
                    icon.classList.add(this.getClass("reset-btn-small"));
                    resetButton.appendChild(icon);
                    const title = document.createElement("span");
                    title.innerText = localize(localizationMap.reset_order);
                    resetButton.appendChild(title);
                    resetButton.onclick = () => {
                        if(!window.confirm(localize(localizationMap.reset_order_confirm))){
                            return;
                        }
                        this.reorderSortable(table.sort_id, this.settings.getDefaultValue(table.sort_id));
                        // tableElement.insertBefore(resetRow, tableElement.firstChild);
                    };
                    resetCell.appendChild(resetButton);
                    resetRow.appendChild(resetCell);
                    // tableElement.appendChild(resetRow);
                }
            }

            rowList.forEach((row) => {
                tableElement.appendChild(row);
            });
            if(resetRow){
                tableElement.appendChild(resetRow);
            }

            return tableElement;
        };

        buildRow(row, table){
            //创建row
            let rowElement = document.createElement("tr");

            //根据类型创建内容
            switch (row.type) {
                case "checkbox":
                    rowElement = this.createToggleRow(row);
                    break;
                case "dropdown":
                    rowElement = this.createDropdownRow(row);
                    break;
                case "input":
                    rowElement = this.createInputRow(row);
                    break;
                case "textarea":
                    rowElement = this.createTextareaRow(row);
                    break;
                case "tag_switch":
                    rowElement = this.createTagSwitchRow(row);
                    break;
                default:
                    console.error(`Unknown row type: ${row.type}`);
                    break;
            }

            //设置Binding
            if(row.binding){
                this.createBinding(row, rowElement, table)
            }

            rowElement.classList.add(this.getClass("setting"));
            if(row.id){
                rowElement.setAttribute("data-id", row.id);
            }
            return rowElement;
        };

        createEmptyRow(row) {
            const rowElement = document.createElement("tr");
            if(row.indent) {
                rowElement.classList.add(this.getClass(`indent-${row.indent}`));
            }
            return rowElement;
        };

        createTitleCell(row, titleTag = "label") {
            const titleCell = document.createElement("td");
            titleCell.className = this.getClass("tooltip");

            let titleElement;
            if(titleTag === "label") {
                titleElement = document.createElement("label");
                titleElement.setAttribute("for", this.getClass(row.id));
            } else {
                titleElement = document.createElement(titleTag);
            }
            titleElement.className = this.getClass("row-title") + " " + this.getClass("ignore-drag");
            titleElement.innerHTML = Csp.createHTML(row.title);
            titleCell.appendChild(titleElement);

            if(row.tooltip) {
                const tooltip = document.createElement("span");
                tooltip.className = this.getClass("tooltip-text");
                tooltip.innerHTML = Csp.createHTML(row.tooltip);
                titleCell.appendChild(tooltip);
            }

            return [titleCell, titleElement];
        };

        createResetButtonSmall(row, resetFunction) {
            const settingId = `_s_${row.id}`;
            const defaultValue = this.settings.getDefaultValue(settingId);
            const resetButton = document.createElement("button");
            resetButton.className = this.getClass("reset-btn-small") + " " + this.getClass("ignore-drag");
            resetButton.title = localize(localizationMap.button_reset);
            resetButton.onclick = () => resetFunction(defaultValue);

            return [resetButton, defaultValue];
        }

        createToggleRow(row){
            //创建Row
            const rowElement = this.createEmptyRow(row);
            //创建设置项标题
            const [titleCell, titleElement] = this.createTitleCell(row, "span");

            //创建开关和重置按钮
            const settingId = `_s_${row.id}`;
            const inputCell = document.createElement("td");
            inputCell.classList.add(this.getClass("input-cell"));
            const inputContainer = document.createElement("div");
            inputContainer.classList.add(this.getClass("toggle-container"));
            inputCell.appendChild(inputContainer);

            //创建开关
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = this.getClass(row.id);
            input.name = input.id;
            // inputCell.appendChild(input);
            inputContainer.appendChild(input);

            const label = document.createElement("label");
            label.classList.add(this.getClass("toggle"));
            label.setAttribute("for", input.id);
            const hidden = document.createElement("span");
            hidden.classList.add(this.getClass("hidden"));
            hidden.innerHTML = Csp.createHTML(row.title);
            label.appendChild(hidden);
            // inputCell.appendChild(label);
            inputContainer.appendChild(label);

            //创建重置按钮
            if(row.ignore_reset !== true){
                const [resetBtn, defaultValue] = this.createResetButtonSmall(row, defaultValue => {
                    input.checked = defaultValue === true;
                    input.dispatchEvent(new Event("change"));
                });

                inputContainer.insertBefore(resetBtn, inputContainer.firstChild);
                input.addEventListener("change", () => {
                    //决定是否显示重置按钮
                    resetBtn.style.setProperty("display", input.checked === defaultValue ? "none" : "inline-block", "important");  //display = input.checked === defaultValue ? "none" : "inline-block";
                });
            }

            //监听器都创建好了再设置初始值
            input.addEventListener("change", () => {
                //更新到暂存设置
                this.settings.saveTemp(settingId, input.checked);
            })
            input.checked = this.settings[settingId] === true;
            input.dispatchEvent(new Event("change"));

            rowElement.appendChild(titleCell);
            rowElement.appendChild(inputCell);
            return rowElement;
        };

        createDropdownRow(row){
            const rowElement = this.createEmptyRow(row);
            const [titleCell, titleElement] = this.createTitleCell(row, "label");

            const inputCell = document.createElement("td");
            inputCell.classList.add(this.getClass("input-cell"));
            const select = document.createElement("select");
            select.className = this.getClass("ignore-drag");
            select.id = this.getClass(row.id);
            select.name = select.id;
            for(const item of row.options){
                const option = document.createElement("option");
                option.value = item.value;
                option.innerText = item.title;
                select.appendChild(option);
            }
            inputCell.appendChild(select);

            //创建重置按钮
            const settingId = `_s_${row.id}`;
            if(row.ignore_reset !== true){
                const [resetBtn, defaultValue] = this.createResetButtonSmall(row, defaultValue => {
                    select.value = defaultValue;
                    select.dispatchEvent(new Event("change"));
                });

                inputCell.insertBefore(resetBtn, inputCell.firstChild);
                select.addEventListener("change", () => {
                    //决定是否显示重置按钮
                    resetBtn.style.setProperty("display", select.value === defaultValue ? "none" : "inline-block", "important");  //display = select.value === defaultValue ? "none" : "inline-block";
                });
            }

            //监听器都创建好了再设置初始值
            select.addEventListener("change", () => {
                //更新到暂存设置
                this.settings.saveTemp(settingId, select.value);
            })
            select.value = this.settings[settingId];
            select.dispatchEvent(new Event("change"));

            rowElement.appendChild(titleCell);
            rowElement.appendChild(inputCell);
            return rowElement;
        };

        createInputRow(row){
            const rowElement = this.createEmptyRow(row);
            const [titleCell, titleElement] = this.createTitleCell(row, "label");

            const inputCell = document.createElement("td");
            inputCell.classList.add(this.getClass("input-cell"));
            const input = document.createElement("input");
            input.type = "text";
            input.id = this.getClass(row.id);
            input.name = input.id;
            inputCell.appendChild(input);

            //创建重置按钮
            const settingId = `_s_${row.id}`;
            if(row.ignore_reset !== true){
                const [resetBtn, defaultValue] = this.createResetButtonSmall(row, defaultValue => {
                    input.value = defaultValue;
                    input.dispatchEvent(new Event("change"));
                });

                inputCell.insertBefore(resetBtn, inputCell.firstChild);
                input.addEventListener("change", () => {
                    //决定是否显示重置按钮
                    resetBtn.style.setProperty("display", input.value === defaultValue ? "none" : "inline-block", "important");  //display = input.value === defaultValue ? "none" : "inline-block";
                });
            }

            //监听器都创建好了再设置初始值
            input.addEventListener("change", () => {
                //更新到暂存设置
                this.settings.saveTemp(settingId, input.value);
            })
            input.value = this.settings[settingId];
            input.dispatchEvent(new Event("change"));

            rowElement.appendChild(titleCell);
            rowElement.appendChild(inputCell);
            return rowElement;
        };

        createTextareaRow(row){
            const rowElement = this.createEmptyRow(row);
            const [titleCell, titleElement] = this.createTitleCell(row, "label");

            const inputCell = document.createElement("td");
            inputCell.classList.add(this.getClass("input-cell"));
            const input = document.createElement("textarea");
            input.id = this.getClass(row.id);
            input.name = input.id;
            input.style.minWidth = "100%";
            input.style.maxWidth = "100%";
            input.style.height = "100px";
            input.style.resize = "vertical"
            inputCell.appendChild(input);

            //创建重置按钮
            const settingId = `_s_${row.id}`;
            if(row.ignore_reset !== true){
                const [resetBtn, defaultValue] = this.createResetButtonSmall(row, defaultValue => {
                    input.value = defaultValue;
                    input.dispatchEvent(new Event("change"));
                });

                inputCell.insertBefore(resetBtn, inputCell.firstChild);
                input.addEventListener("change", () => {
                    //决定是否显示重置按钮
                    resetBtn.style.setProperty("display", input.value === defaultValue ? "none" : "inline-block", "important");  //display = input.value === defaultValue ? "none" : "inline-block";
                });
            }

            //监听器都创建好了再设置初始值
            input.addEventListener("change", () => {
                //更新到暂存设置
                this.settings.saveTemp(settingId, input.value);
            })
            input.value = this.settings[settingId];
            input.dispatchEvent(new Event("change"));

            rowElement.appendChild(titleCell);
            rowElement.appendChild(inputCell);
            return rowElement;
        };

        createTagSwitchRow(row){
            const rowElement = this.createEmptyRow(row);

            const tagCell = document.createElement("td");
            tagCell.colSpan = 2;
            //用内部容器再次包裹标签，保证重置按钮的位置
            const tagContainer = document.createElement("div");
            tagContainer.className = this.getClass("tags");
            tagCell.appendChild(tagContainer);

            const tagList = [];
            for(const tag of row.items){
                const tagSpan = document.createElement("label");
                tagSpan.classList.add(this.getClass(tag["class"]));
                tagSpan.innerText = tag.title;
                tagSpan.setAttribute("for", this.getClass(tag.id));
                tagSpan.setAttribute("data-id", tag.id);
                this.setSortable(tagSpan);

                //添加switch
                const settingId = `_s_${tag.id}`;
                const switchInput = document.createElement("input");
                switchInput.style.setProperty("display", "none", "important");  //display = "none !important";
                switchInput.type = "checkbox";
                switchInput.id = this.getClass(tag.id);
                switchInput.name = switchInput.id;
                switchInput.addEventListener("change", (event) => {
                    if(event.target.checked) {
                        tagSpan.classList.remove(this.getClass("tag-off"));
                    }else if(!tagSpan.classList.contains(this.getClass("tag-off"))) {
                        tagSpan.classList.add(this.getClass("tag-off"));
                    }

                    //更新到暂存设置
                    this.settings.saveTemp(settingId, switchInput.checked);
                })
                switchInput.checked = this.settings[`_s_${tag.id}`] === true;
                switchInput.dispatchEvent(new Event("change"));

                tagSpan.classList.toggle(this.getClass("tag-off"), !switchInput.checked);
                tagSpan.appendChild(switchInput);

                if(tag.tooltip) {
                    tagSpan.classList.add(this.getClass("tooltip"));
                    const tooltip = document.createElement("span");
                    tooltip.className = this.getClass("tooltip-text");
                    tooltip.innerHTML = Csp.createHTML(tag.tooltip);
                    tagSpan.appendChild(tooltip);
                }

                tagList.push(tagSpan);
            }

            if(row.sortable){
                tagContainer.setAttribute("data-sort-id", row.sort_id);
                this.sortSortable(tagList, row.sort_id);

                //添加排列重置按钮
                if(row.ignore_reset !== true){
                    const resetOrderButton = document.createElement("button");
                    resetOrderButton.classList.add(this.getClass("button-flat"));
                    resetOrderButton.title = localize(localizationMap.button_reset);
                    resetOrderButton.onclick = () => {
                        if(!window.confirm(localize(localizationMap.reset_order_confirm))){
                            return;
                        }
                        this.reorderSortable(row.sort_id, this.settings.getDefaultValue(row.sort_id));
                    };

                    const icon = document.createElement("span");
                    icon.classList.add(this.getClass("reset-btn-small"));
                    resetOrderButton.appendChild(icon);

                    const title = document.createElement("span");
                    title.innerText = localize(localizationMap.reset_order);
                    resetOrderButton.appendChild(title);

                    tagCell.appendChild(resetOrderButton);
                    // tagCell.insertBefore(resetOrderButton, tagCell.firstChild);
                }
            }

            //添加设置重置按钮
            if(row.ignore_reset !== true){
                const resetSettingsButton = document.createElement("button");
                resetSettingsButton.classList.add(this.getClass("button-flat"));
                resetSettingsButton.title = localize(localizationMap.button_reset);
                resetSettingsButton.onclick = () => {
                    if(!window.confirm(localize(localizationMap.reset_confirm))){
                        return;
                    }
                    for (const item of row.items) {
                        let tag = tagContainer.querySelector("#" + this.getClass(item.id));
                        if(!tag) continue;
                        tag.checked = this.settings.getDefaultValue(item.id);
                        tag.dispatchEvent(new Event("change"));
                    }
                };

                const icon = document.createElement("span");
                icon.classList.add(this.getClass("reset-btn-small"));
                resetSettingsButton.appendChild(icon);

                const title = document.createElement("span");
                title.innerText = localize(localizationMap.button_reset);
                resetSettingsButton.appendChild(title);

                tagCell.appendChild(resetSettingsButton);
                // tagCell.insertBefore(resetOrderButton, tagCell.firstChild);
            }


            tagList.forEach((tag) => {
                tagContainer.appendChild(tag);
            });
            rowElement.appendChild(tagCell);
            return rowElement;
        };

        createBinding(data, element, section){
            if(!data.binding || !this.container) return;

            const binding = data.binding;
            const target = section.querySelector("#" + this.getClass(binding.target));
            if(!target) return;

            let showState = "unset";
            switch (element.nodeName){
                case "TABLE":
                    showState = "table";
                    break;
                case "TR":
                    showState = "table-row";
                    break;
            }

            target.addEventListener("change", (event) => {
                const value = event.target.value;
                const checked = event.target.checked;
                element.style.setProperty("display", value === binding.value || checked === binding.value ? showState : "none", "important");  //display = value === binding.value || checked === binding.value ? showState : "none";
            });

            element.style.setProperty("display", target.value === binding.value || target.checked === binding.value ? showState : "none", "important");  //display = target.value === binding.value || target.checked === binding.value ? showState : "none";
        };

        sortSortable(sortList, sortId, orderList){
            orderList = orderList ? orderList : this.settings[`_s_${sortId}`];
            if(!orderList) return;

            for (let i = 0; i < orderList.length; ++i) {
                for (let j = 0; j < sortList.length; ++j){
                    if(orderList[i] === sortList[j].getAttribute("data-id")) {
                        let tmp = sortList[i];
                        sortList[i] = sortList[j];
                        sortList[j] = tmp;
                        break;
                    }
                }
            }
        };

        setSortable(ele){
            ele.classList.add(this.getClass("sortable"));
        };

        refreshSettings(settings) {
            //刷新设置项值的展示情况（保持input值和设置中的实际值一致）
            //清空设置暂存
            this.settings.clearTemp();
            settings = settings ? settings : this.settings;

            //刷新设置项
            for(const key in settings){
                if(!key.startsWith("_s_")) continue;
                const targetId = this.getClass(key.substring(3));

                if(settings[key] && Array.isArray(settings[key])){
                    //可能是排序对象，先搜索排序目标，搜不到再按默认值处理
                    if(this.reorderSortable(key.substring(3), settings[key])) continue;
                }

                //非排序对象
                const target = this.container.querySelector("#" + targetId);
                if(!target) continue;

                if(target.tagName === "INPUT") {
                    if(target.type === "checkbox") {
                        target.checked = settings[key] === true;
                    }else{
                        target.value = settings[key];
                    }
                }else if(target.tagName === "SELECT") {
                    target.value = settings[key];
                }

                if(key === "_s_lang") continue;
                target.dispatchEvent(new Event("change"));
            }
        };

        reorderSortable(sort_id, orderList) {
            const target = this.container.querySelector(`*[data-sort-id="${sort_id}"]`);
            if(target) {
                let list = [...target.children];
                this.sortSortable(list, sort_id, orderList);

                for(let i = 0; i < list.length; ++i) {
                    target.removeChild(list[i]);
                }

                for(let i = 0; i < list.length; ++i) {
                    target.appendChild(list[i]);
                }

                this.settings.saveTemp(sort_id, list.map(ele => ele.getAttribute("data-id")).filter(val => val && val !== ""));
                return true;
            }
            return false;
        }

        initSortableElement() {
            //初始化排序组件
            const sortableGroups = this.container.querySelectorAll(`.${this.getClass('sortable')}`);
            sortableGroups.forEach(group => {
                new Sortable(group, group.parentElement.getAttribute("data-sort-id"), this.settings);
            });
        };

    }

    class Sortable {
        constructor(element, sort_id, settings, options) {
            this.element = element;
            this.options = options;
            this.sortId = sort_id;
            this.settings = settings;
            this.dragging = null;

            if(!sort_id) {
                throw new Error("sort_id is required");
            }

            this.init();
        }

        getClass(name) {
            if(!VOICELINK_CLASS || VOICELINK_CLASS === "") return name;
            return `${VOICELINK_CLASS}_${name}`;
        }

        init() {
            this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
            document.addEventListener('mouseup', this.onMouseUp.bind(this));
        }

        onMouseDown(event) {
            if(event.target.nodeName === "INPUT" || event.target.classList.contains(this.getClass("toggle")) || event.target.classList.contains(this.getClass("ignore-drag"))) return;
            if (event.target.closest(`.${this.getClass('sortable')}`)) {
                this.dragging = event.target.closest(`.${this.getClass('sortable')}`);
                this.dragging.classList.add(this.getClass('dragging'));
            }
        }

        onMouseMove(event) {
            if (this.dragging) {
                event.preventDefault();

                try{
                    let sibling = document.elementFromPoint(event.clientX, event.clientY).closest(`.${this.getClass('sortable')}`);
                    if (sibling && sibling !== this.dragging) {
                        this.element.parentNode.insertBefore(this.dragging, sibling.nextSibling === this.dragging ? sibling : sibling.nextSibling);
                        //暂存当前顺序
                        const order = [...this.element.parentNode.children].map(item => item.getAttribute("data-id")).filter(item => item || item === "");
                        this.settings.saveTemp(this.sortId, order);
                    }
                }catch (e) {
                    console.error(e)
                }

            }
        }

        onMouseUp(event) {
            if (this.dragging) {
                this.dragging.classList.remove(this.getClass('dragging'));
                this.dragging = null;
            }
        }
    }

    const SettingsPopup = {
        showPopup(useTemp = false) {
            let uiBuilder = new SettingPageBuilder(getSettingsUi(), settings);
            let ui = uiBuilder.build(useTemp);
            const displayLangElement = ui.querySelector(`#${VOICELINK_CLASS}_lang`);
            displayLangElement.addEventListener("change", e => {
                settings._s_lang = displayLangElement.value;
                GM_setValue("lang", settings._s_lang);
                ui.remove();
                SettingsPopup.showPopup(true);
            });
            document.body.appendChild(ui);
        }
    };

    //endregion

    //region 初始化加载

    let isInit = false;
    let observing = false;
    function init () {
        if(!isInit) {
            const style = document.createElement("style");
            style.innerHTML = Csp.createHTML(POPUP_CSS + SETTINGS_CSS);
            document.head.appendChild(style);
            // SettingsPopup.getPopup()
            GM_registerMenuCommand("Settings - 设置", () => SettingsPopup.showPopup())
            GM_registerMenuCommand("Notice - 公告", () => showUpdateNotice(true));
            GM_registerMenuCommand("Home / Update - 主页 / 更新", () =>
                GM_openInTab(IS_PREVIEW ? "https://sleazyfork.org/zh-CN/scripts/521128-voicelinks-preview" : "https://sleazyfork.org/zh-CN/scripts/456775-voicelinks", {active: true}));

            document.addEventListener("securitypolicyviolation", function (e) {
                if (e.blockedURI.includes("img.dlsite.jp")) {
                    const img = document.querySelector(`img[src="${e.blockedURI}"]`);
                    img.remove();

                    const imgContainer = Popup.popupElement.img.container;
                    if(imgContainer){
                        imgContainer.style.setProperty("display", "none", "important");  //display = "none !important";
                        Popup.hideImg = true;
                    }
                }
            });

            isInit = true;
        }

        //将设置项内容导入到searchProfile中，cue_lang也要更新
        let customHeaders = {};
        for (const headerText of settings._s_search_url_headers.split("\n")) {
            try{
                let val = headerText.split(":", 2);
                customHeaders[val[0].trim()] = val[1].trim();
            } catch (e) {}
        }
        let searchProfile = new SearchProfile(
            "kikoeru", settings._s_search_url_pattern, settings._s_show_url_pattern,
            "kikoeru", customHeaders);
        settings._ss_search_profiles = [
            searchProfile
        ];
        settings._ss_cue_lang = settings._s_cue_languages.split(" ").map(val => val.trim());
        settings._s_search_url_pattern = searchProfile.searchUrlTemplate.trim();
        settings._s_show_url_pattern = searchProfile.showUrlTemplate.trim();
        settings.save();
        /*settings._s_search_profiles = [
            new SearchProfile(
                "kikoeru",
                "http://192.168.196.226:8088/api/search?page=1&sort=desc&order=release&nsfw=0&lyric=&seed=26&isAdvance=0&keyword=%s",
                "kikoeru", {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8va2lrb2VydSIsInN1YiI6ImFkbWluIiwiYXVkIjoiaHR0cDovL2tpa29lcnUvYXBpIiwibmFtZSI6ImFkbWluIiwiZ3JvdXAiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzQ1ODI5NTc2LCJleHAiOjE3NDg0MjE1NzZ9.VYHZHxLR1X5_iMZcNrXTJsYa2yY9CWhIVXXHXM1wCQ0",
                }),
        ];*/

        if(!document.body || observing){
            return;
        }

        Parser.walkNodes(document.body);
        if(!document.getElementById(`${VOICELINK_CLASS}-voice-popup`)) Popup.makePopup(false);

        const observer = new MutationObserver(function (m) {
            for (let i = 0; i < m.length; ++i) {
                let addedNodes = m[i].addedNodes;
                let removedNodes = m[i].removedNodes;

                for (let j = 0; j < removedNodes.length; ++j){
                    let node = removedNodes[j];
                }

                for (let j = 0; j < addedNodes.length; ++j) {
                    Parser.walkNodes(addedNodes[j]);
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true})
        setUserSelectTitle();

        //显示重要通知
        showUpdateNotice();

        observing = true;
    }

    document.addEventListener("DOMContentLoaded", init);

    //endregion

    //region 公告显示

    function showUpdateNotice(force = false) {
        const firstTimeToken = 105;
        if(GM_getValue("first_token", undefined) === firstTimeToken && !force){
            return;
        }
        GM_setValue("first_token", firstTimeToken);

        if(!force && window.confirm(localize(localizationMap.notice_update)) === false) {
            return;
        }

        GM_openInTab(
            IS_PREVIEW ? `https://github.com/IceFoxy062/VoiceLinks-Extend/blob/dev/docs/major_updates/v4.8.6/v4.8.6-${settings._s_lang}.md` : `https://github.com/IceFoxy062/VoiceLinks-Extend/blob/dev/docs/major_updates/v4.8.6/v4.8.6-${settings._s_lang}.md`,
            {active: true});
    }

    //endregion

    //region CSP绕过

    //Deal with Trusted Types
    let Csp = {
        createHTML: (str) => str
    };
    if(window.isSecureContext === true && window.trustedTypes){
        Csp = window.trustedTypes.createPolicy(
            window.trustedTypes.defaultPolicy ? "VoiceLinkTrustedTypes" : "VoiceLinkTrustedTypes",
            Csp);
    }

    //endregion

    init();
})();
