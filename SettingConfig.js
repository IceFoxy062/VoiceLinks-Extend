// const VOICELINK_CLASS = 'voicelink';
const VOICELINK_CLASS = '';

const localizationMap = {
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
    zh_CN: "韩文",
    zh_TW: "韓文",
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
    zh_CN: "德文",
    zh_TW: "德文",
    en_US: "German"
  },

  language_french: {
    zh_CN: "法文",
    zh_TW: "法文",
    en_US: "French"
  },

  language_spanish: {
    zh_CN: "西班牙文",
    zh_TW: "西班牙文",
    en_US: "Spanish"
  },

  language_indonesian: {
    zh_CN: "印尼文",
    zh_TW: "印尼文",
    en_US: "Indonesian"
  },

  language_italian: {
    zh_CN: "意大利文",
    zh_TW: "意大利文",
    en_US: "Italian"
  },

  language_portuguese: {
    zh_CN: "葡萄牙文",
    zh_TW: "葡萄牙文",
    en_US: "Portuguese"
  },

  language_swedish: {
    zh_CN: "瑞典文",
    zh_TW: "瑞典文",
    en_US: "Swedish"
  },

  language_thai: {
    zh_CN: "泰文",
    zh_TW: "泰文",
    en_US: "Thai"
  },

  language_vietnamese: {
    zh_CN: "越南文",
    zh_TW: "越南文",
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

  save_complete: {
    zh_CN: "设置已保存",
    zh_TW: "設置已保存",
    en_US: "Settings saved",
  },

  save_failed: {
    zh_CN: "设置保存失败",
    zh_TW: "設置保存失敗",
    en_US: "Settings save failed",
  },

  reset_confirm: {
    zh_CN: "确定要将设置重置到最初始的状态吗？",
    zh_TW: "確定要將設置重置到最初始的狀態嗎？",
    en_US: "Are you sure you want to reset settings to the initial state?",
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

  get: function (key) {
    return typeof key === "string" ? localizationMap[key][settings._s_lang] : key[settings._s_lang];
  }
}

let settings = {
  //语言设置
  _s_lang: "zh_CN",
  _s_popup_lang: "en_US",

  //常规设置
  _s_parse_url: true,
  _s_parse_url_in_dl: false,
  _s_show_translated_title_in_dl: true,
  _s_copy_as_filename_btn: true,
  _s_show_compatibility_warning: true,
  _s_url_insert_mode: "before_rj",
  _s_url_insert_text: "🔗",

  //信息显示设置
  _s_category_preset: "voice",
  _s_voice__info_display_order: [
    "voice__circle_name",
    "voice__translator_name",
    "voice__release_date",
    "voice__update_date",
    "voice__age_rating",
    "voice__scenario",
    "voice__illustration",
    "voice__voice_actor",
    "voice__genre",
    "voice__file_size"
  ],
  _s_voice__circle_name: true,
  _s_voice__translator_name: true,
  _s_voice__release_date: true,
  _s_voice__update_date: true,
  _s_voice__age_rating: true,
  _s_voice__scenario: false,
  _s_voice__illustration: false,
  _s_voice__voice_actor: true,
  _s_voice__genre: true,
  _s_voice__file_size: true,
  _s_game__info_display_order: [
    "game__circle_name",
    "game__translator_name",
    "game__release_date",
    "game__update_date",
    "game__age_rating",
    "game__scenario",
    "game__illustration",
    "game__voice_actor",
    "game__genre",
    "game__file_size"
  ],
  _s_game__circle_name: true,
  _s_game__translator_name: true,
  _s_game__release_date: true,
  _s_game__update_date: true,
  _s_game__age_rating: true,
  _s_game__scenario: true,
  _s_game__illustration: true,
  _s_game__voice_actor: true,
  _s_game__genre: true,
  _s_game__file_size: true,
  _s_manga__info_display_order: [
    "manga__circle_name",
    "manga__translator_name",
    "manga__release_date",
    "manga__update_date",
    "manga__age_rating",
    "manga__scenario",
    "manga__illustration",
    "manga__voice_actor",
    "manga__genre",
    "manga__file_size"
  ],
  _s_manga__circle_name: true,
  _s_manga__translator_name: true,
  _s_manga__release_date: true,
  _s_manga__update_date: true,
  _s_manga__age_rating: true,
  _s_manga__scenario: true,
  _s_manga__illustration: true,
  _s_manga__voice_actor: true,  //音声漫画
  _s_manga__genre: true,
  _s_manga__file_size: true,
  _s_video__info_display_order: [
    "video__circle_name",
    "video__translator_name",
    "video__release_date",
    "video__update_date",
    "video__age_rating",
    "video__scenario",
    "video__illustration",
    "video__voice_actor",
    "video__genre",
    "video__file_size"
  ],
  _s_video__circle_name: true,
  _s_video__translator_name: true,
  _s_video__release_date: true,
  _s_video__update_date: true,
  _s_video__age_rating: true,
  _s_video__scenario: true,
  _s_video__illustration: true,
  _s_video__voice_actor: true,
  _s_video__genre: true,
  _s_video__file_size: true,
  _s_novel__info_display_order: [
    "novel__circle_name",
    "novel__translator_name",
    "novel__release_date",
    "novel__update_date",
    "novel__age_rating",
    "novel__scenario",
    "novel__illustration",
    "novel__voice_actor",
    "novel__genre",
    "novel__file_size"
  ],
  _s_novel__circle_name: true,
  _s_novel__translator_name: true,
  _s_novel__release_date: true,
  _s_novel__update_date: true,
  _s_novel__age_rating: true,
  _s_novel__scenario: true,
  _s_novel__illustration: true,
  _s_novel__voice_actor: false,
  _s_novel__genre: true,
  _s_novel__file_size: true,
  _s_other__info_display_order: [
    "other__circle_name",
    "other__translator_name",
    "other__release_date",
    "other__update_date",
    "other__age_rating",
    "other__scenario",
    "other__illustration",
    "other__voice_actor",
    "other__genre",
    "other__file_size"
  ],
  _s_other__circle_name: true,
  _s_other__translator_name: true,
  _s_other__release_date: true,
  _s_other__update_date: true,
  _s_other__age_rating: true,
  _s_other__scenario: true,
  _s_other__illustration: true,
  _s_other__voice_actor: true,
  _s_other__genre: true,
  _s_other__file_size: true,

  //标签显示设置
  _s_tag_main_switch: true,
  _s_tag_display_order: [
      "tag_no_longer_available",
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
  _s_tag_work_type: true,
  _s_tag_translatable: true,
  _s_tag_not_translatable: false,
  _s_tag_translated: false,
  _s_tag_language_support: true,
  _s_tag_bonus_work: true,
  _s_tag_has_bonus: true,
  _s_tag_file_format: false,
  _s_tag_no_longer_available: true,
  _s_tag_ai: false,

  _s_tag_translation_request: true,
  _s_tag_translation_request_display_order: [
      "tag_translation_request_simplified_chinese",
      "tag_translation_request_traditional_chinese",
      "tag_translation_request_english",
      "tag_translation_request_korean",
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
  _s_tag_translation_request_german: false,
  _s_tag_translation_request_french: false,
  _s_tag_translation_request_indonesian: false,
  _s_tag_translation_request_italian: false,
  _s_tag_translation_request_portuguese: false,
  _s_tag_translation_request_swedish: false,
  _s_tag_translation_request_thai: false,
  _s_tag_translation_request_vietnamese: false,

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
    for(let key in this){
      if(!key.startsWith("_s_")) continue;
      this[key] = GM_getValue(key.substring(3), this[key]);
    }
  },

  save: function () {
    //将暂存修改应用至Settings
    for (let key in this.temp_edited) {
      if(!key.startsWith("_s_")) continue;
      if(this[key] === undefined) continue;
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


function localize(key) {
  return localizationMap.get(key);
}


const ui = {
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
              type: "input",
              title: localize(localizationMap.url_insert_text),
              id: "url_insert_text",
              indent: 1
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
                  //作品类型
                  title: localize(localizationMap.tag_work_type),
                  id: "tag_work_type",
                  class: "tag-darkblue",
                  tooltip: `
<div class="tags">
    <span class="tag-purple">${localize(localizationMap.work_type_game)}</span>
    <span class="tag-green">${localize(localizationMap.work_type_comic)}</span>
    <span class="tag-teal">${localize(localizationMap.work_type_illustration)}</span>
    <span class="tag-gray">${localize(localizationMap.work_type_novel)}</span>
    <span class="tag-darkblue">${localize(localizationMap.work_type_video)}</span>
    <span class="tag-orange">${localize(localizationMap.work_type_voice)}</span>
    <span class="tag-yellow">${localize(localizationMap.work_type_music)}</span>
    <span class="tag-gray">${localize(localizationMap.work_type_tool)}</span>
    <span class="tag-blue">${localize(localizationMap.work_type_voice_comic)}</span>
    <span class="tag-gray">${localize(localizationMap.work_type_other)}</span>
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
<div class="tags">
<span class="tag-pink">${localize(localizationMap.language_japanese)}</span>
<span class="tag-pink">${localize(localizationMap.language_simplified_chinese)}</span>
<span class="tag-pink">${localize(localizationMap.language_traditional_chinese)}</span>
<span class="tag-pink">${localize(localizationMap.language_english)}</span>
<span class="tag-pink">${localize(localizationMap.language_korean)}</span>
<span class="tag-pink">${localize(localizationMap.language_german)}</span>
<span class="tag-pink">${localize(localizationMap.language_french)}</span>
<span class="tag-pink">${localize(localizationMap.language_indonesian)}</span>
<span class="tag-pink">${localize(localizationMap.language_italian)}</span>
<span class="tag-pink">${localize(localizationMap.language_portuguese)}</span>
<span class="tag-pink">${localize(localizationMap.language_swedish)}</span>
<span class="tag-pink">${localize(localizationMap.language_thai)}</span>
<span class="tag-pink">${localize(localizationMap.language_vietnamese)}</span>
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
          items:[
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
          items:[
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
        }
      ]
    }
  ]
}


class SettingPageBuilder {
  constructor(structure, settings) {
    this.structure = structure;
    this.settings = settings;
    this.container = null;
  }

  getClass(name) {
    if(!VOICELINK_CLASS || VOICELINK_CLASS === "") return name;
    if(name !== "settings-container" || name !== "button-save"
    || name !== "button-cancel" || name !== "button-reset"){
      return name;
    }
    return `${VOICELINK_CLASS}_${name}`;
  }

  build() {
    const f = this.structure;

    //清空设置暂存
    this.settings.clearTemp();

    //创建container
    const container = document.createElement("div");
    container.className = this.getClass("container");
    container.id = this.getClass("settings-container");
    this.container = container;

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
        this.settings.reset();
        window.alert(localize(localizationMap.reset_complete))
      }catch (e) {
        window.alert(e);
      }
      this.refreshSettings();
    };
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(resetButton);
    container.appendChild(buttonContainer);

    this.initSortableElement();
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
        resetCell.style.textAlign = "right";
        const resetButton = document.createElement("button");
        resetButton.classList.add(this.getClass("button-flat"));
        resetButton.title = localize(localizationMap.reset_order);
        resetButton.style.marginRight = "0";
        resetButton.style.marginBottom = "0";
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

  createToggleRow(row){
    //创建Row
    const rowElement = document.createElement("tr");
    if(row.indent) {
      rowElement.classList.add(this.getClass(`indent-${row.indent}`));
    }

    //创建设置项标题
    const titleCell = document.createElement("td");
    titleCell.className = this.getClass("tooltip");
    const title = document.createElement("span");
    title.className = this.getClass("row-title") + " " + this.getClass("ignore-drag");
    title.innerHTML = row.title;
    titleCell.appendChild(title);

    if(row.tooltip) {
      const tooltip = document.createElement("span");
      tooltip.className = this.getClass("tooltip-text");
      tooltip.innerHTML = row.tooltip;
      titleCell.appendChild(tooltip);
    }

    //创建开关和重置按钮
    const settingId = `_s_${row.id}`;
    const inputCell = document.createElement("td");
    inputCell.classList.add(this.getClass("input-cell"));

    //创建开关
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = this.getClass(row.id);
    input.name = input.id;
    inputCell.appendChild(input);

    const label = document.createElement("label");
    label.classList.add(this.getClass("toggle"));
    label.setAttribute("for", input.id);
    const hidden = document.createElement("span");
    hidden.classList.add(this.getClass("hidden"));
    hidden.innerHTML = row.title;
    label.appendChild(hidden);
    inputCell.appendChild(label);

    //创建重置按钮
    if(row.ignore_reset !== true){
      const defaultValue = this.settings.getDefaultValue(settingId);
      const resetButton = document.createElement("button");
      resetButton.className = this.getClass("reset-btn-small") + " " + this.getClass("ignore-drag");
      resetButton.title = localize(localizationMap.button_reset);
      resetButton.onclick = () => {
        input.checked = defaultValue === true;
        input.dispatchEvent(new Event("change"));
      };
      inputCell.insertBefore(resetButton, inputCell.firstChild);

      input.addEventListener("change", () => {
        //决定是否显示重置按钮
        resetButton.style.display = input.checked === defaultValue ? "none" : "inline-block";
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
    const rowElement = document.createElement("tr");
    if(row.indent) {
      rowElement.classList.add(this.getClass(`indent-${row.indent}`));
    }

    const titleCell = document.createElement("td");
    titleCell.className = this.getClass("tooltip");
    const label = document.createElement("label");
    label.className = this.getClass("row-title") + " " + this.getClass("ignore-drag");
    label.setAttribute("for", this.getClass(row.id));
    label.innerHTML = row.title;
    titleCell.appendChild(label);

    if(row.tooltip) {
      const tooltip = document.createElement("span");
      tooltip.className = this.getClass("tooltip-text");
      tooltip.innerHTML = row.tooltip;
      titleCell.appendChild(tooltip);
    }

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
      const defaultValue = this.settings.getDefaultValue(settingId);
      const resetButton = document.createElement("button");
      resetButton.className = this.getClass("reset-btn-small") + " " + this.getClass("ignore-drag");
      resetButton.title = localize(localizationMap.button_reset);
      resetButton.onclick = () => {
        select.value = defaultValue;
        select.dispatchEvent(new Event("change"));
      };
      inputCell.insertBefore(resetButton, inputCell.firstChild);

      select.addEventListener("change", () => {
        //决定是否显示重置按钮
        resetButton.style.display = select.value === defaultValue ? "none" : "inline-block";
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
    const rowElement = document.createElement("tr");
    if(row.indent) {
      rowElement.classList.add(this.getClass(`indent-${row.indent}`));
    }

    const titleCell = document.createElement("td");
    titleCell.className = this.getClass("tooltip");
    const label = document.createElement("label");
    label.className = this.getClass("row-title") + " " + this.getClass("ignore-drag");
    label.setAttribute("for", this.getClass(row.id));
    label.innerHTML = row.title;
    titleCell.appendChild(label);

    if(row.tooltip) {
      const tooltip = document.createElement("span");
      tooltip.className = this.getClass("tooltip-text");
      tooltip.innerHTML = row.tooltip;
      titleCell.appendChild(tooltip);
    }

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
      const defaultValue = this.settings.getDefaultValue(settingId);
      const resetButton = document.createElement("button");
      resetButton.className = this.getClass("reset-btn-small") + " " + this.getClass("ignore-drag");
      resetButton.title = localize(localizationMap.button_reset);
      resetButton.onclick = () => {
        input.value = defaultValue;
        input.dispatchEvent(new Event("change"));
      };
      inputCell.insertBefore(resetButton, inputCell.firstChild);

      input.addEventListener("change", () => {
        //决定是否显示重置按钮
        resetButton.style.display = input.value === defaultValue ? "none" : "inline-block";
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
    const rowElement = document.createElement("tr");
    if(row.indent) {
      rowElement.classList.add(this.getClass(`indent-${row.indent}`));
    }

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
      const switchInput = document.createElement("input");
      switchInput.style.display = "none";
      switchInput.type = "checkbox";
      switchInput.id = this.getClass(tag.id);
      switchInput.name = switchInput.id;
      switchInput.checked = this.settings[`_s_${tag.id}`] === true;
      switchInput.addEventListener("change", (event) => {
        if(event.target.checked) {
          tagSpan.classList.remove(this.getClass("tag-off"));
        }else if(!tagSpan.classList.contains(this.getClass("tag-off"))) {
          tagSpan.classList.add(this.getClass("tag-off"));
        }
      })
      tagSpan.classList.toggle(this.getClass("tag-off"), !switchInput.checked);
      tagSpan.appendChild(switchInput);

      if(tag.tooltip) {
        tagSpan.classList.add(this.getClass("tooltip"));
        const tooltip = document.createElement("span");
        tooltip.className = this.getClass("tooltip-text");
        tooltip.innerHTML = tag.tooltip;
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
      element.style.display = value === binding.value || checked === binding.value ? showState : "none";
    });

    element.style.display = target.value === binding.value || target.checked === binding.value ? showState : "none";
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

  refreshSettings() {
    //刷新设置项值的展示情况（保持input值和设置中的实际值一致）
    //清空设置暂存
    this.settings.clearTemp();

    //刷新设置项
    for(const key in this.settings){
      if(!key.startsWith("_s_")) continue;
      const targetId = this.getClass(key.substring(3));

      if(this.settings[key] && Array.isArray(this.settings[key])){
        //可能是排序对象，先搜索排序目标，搜不到再按默认值处理
        if(this.reorderSortable(key.substring(3))) continue;
      }

      //非排序对象
      const target = this.container.querySelector("#" + targetId);
      if(!target) continue;

      if(target.tagName === "INPUT") {
        if(target.type === "checkbox") {
          target.checked = this.settings[key] === true;
        }else{
          target.value = this.settings[key];
        }
      }else if(target.tagName === "SELECT") {
        target.value = this.settings[key];
      }
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

      this.settings.saveTemp(sort_id, list);
      return true;
    }
    return false;
  }

  initSortableElement() {
    //初始化排序组件
    const sortableGroups = this.container.querySelectorAll(".sortable");
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

  init() {
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(event) {
    if(event.target.nodeName === "INPUT" || event.target.classList.contains("toggle") || event.target.classList.contains("ignore-drag")) return;
    if (event.target.closest('.sortable')) {
      this.dragging = event.target.closest('.sortable');
      this.dragging.classList.add('dragging');
    }
  }

  onMouseMove(event) {
    if (this.dragging) {
      event.preventDefault();

      try{
        let sibling = document.elementFromPoint(event.clientX, event.clientY).closest('.sortable');
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
      this.dragging.classList.remove('dragging');
      this.dragging = null;
    }
  }
}

