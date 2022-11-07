/** VERSION: 4.4.0-2020.07.22-09.38.54-H Please don't modify or unzip this content. It will be updated regularly **/
function BCSfFilterCallback(a) {
    bcsffilter.afterGetFilterData(a, a.event_type);
}
function viewMoreFilterOption(a) {
    var b = "." + bcsffilter.getClass("filterBlockContent"),
        c = jQ(a).parents(bcsffilter.selector.filterTreeHorizontal).length > 0 ? b + "-inner" : b,
        d = jQ(a)
            .parents("." + bcsffilter.class.filterOption)
            .find(b),
        e = "." + bcsffilter.getClass("filterOptionViewMoreList");
    (a = jQ(a).parent()), jQ(a).siblings(c).css({ "overflow-y": "auto" }), jQ(a).siblings(c).find("li").show(), 1 == d.data("has-scrollbar") && bcsffilter.buildFilterScrollbar(d);
    var f = jQ(e).length > 0 ? jQ(e).val().split(",") : [];
    f.push(
        jQ(a)
            .parents("." + bcsffilter.class.filterOption)
            .attr("data-id")
    ),
        jQ(e).val(f.join(","));
    var g = bcsffilter.getTemplate("filterOptionViewLess").replace(/{{label.viewLess}}/g, bcsffilter.getSettingValue("label.viewLess"));
    jQ(a).after(g), jQ(a).remove();
}
function viewLessFilterOption(a) {
    var b = "." + bcsffilter.getClass("filterBlockContent"),
        c = jQ(a).parents(bcsffilter.selector.filterTreeHorizontal).length > 0 ? b + "-inner" : b,
        d = jQ(a)
            .parents("." + bcsffilter.class.filterOption)
            .find(b),
        e = "." + bcsffilter.getClass("filterOptionViewMoreList"),
        f = jQ(a).parents(bcsffilter.selector.filterTreeHorizontal).length > 0;
    a = jQ(a).parent();
    var g = jQ(a)
        .parents("." + bcsffilter.class.filterOption)
        .data("display-type");
    1 == d.data("has-scrollbar") && bcsffilter.removeScrollbar(jQ(a).siblings(c));
    var h = f ? bcsffilter.getSettingValue("general.startViewMoreH") : bcsffilter.getSettingValue("general.startViewMore"),
        i = h.hasOwnProperty(g) ? h[g] : 15;
    jQ(a)
        .siblings(c)
        .find("li:gt(" + (i - 1) + ")")
        .hide(),
        jQ(a).siblings(c).css({ overflow: "hidden" });
    var j = jQ(e).length > 0 ? jQ(e).val().split(",") : [],
        k = jQ(a)
            .parents("." + bcsffilter.class.filterOption)
            .attr("data-id");
    (j = jQ.grep(j, function (a) {
        return a !== k;
    })),
        jQ(e).val(j.join(","));
    var l = bcsffilter.getTemplate("filterOptionViewMore").replace(/{{label.viewMore}}/g, bcsffilter.getSettingValue("label.viewMore"));
    jQ(a).after(l), jQ(a).remove();
}
function onInteractWithFilterOptionValue(a, b, c, d, e, f) {
    var g = bcsffilter,
        h = jQ(b).data("count"),
        f = void 0 !== f && "true" === f;
    if (g.isMobile() && "style2" == g.mobileStyle)
        a.preventDefault(),
            (h > 0 || (!0 === f && "collection" == c)) &&
                ((g.internalClick = !0),
                "single" == e && jQ(".bc-sf-filter-option-block-active").find("ul li").children().removeClass("selected"),
                jQ(b).toggleClass("selected"),
                jQ(b).siblings().toggleClass("selected"),
                g.buildFilterSelectionMobile());
    else if (!1 === f && (a.preventDefault(), h > 0 || void 0 == h)) {
        g.internalClick = !0;
        var i = jQ(b).attr("data-id"),
            j = decodeURIComponent(jQ(b).attr("data-value"));
        "collection" == c && (g.queryParams.collection_scope = g.collectionId = jQ(b).data("collection-scope"));
        var k = "list" != d || "single" != e || ("collection" != c && "sub_category" != d) ? g.buildFilterOptionLink(i, j, c, d, e) : jQ(b).attr("href");
        g.onChangeData(k, c, j, i);
    }
}
function onSelectFilterOptionItem(a, b) {
    if (jQ(b).data("count") > 0) {
        bcsffilter.selectFilter = !0;
        var c = jQ(b).data("value").toString(),
            d =
                jQ(b)
                    .parents("." + bcsffilter.class.filterOption)
                    .data("selected") || [];
        jQ(b).hasClass("selected")
            ? (jQ(b).parent().children().removeClass("selected"), jQ(b).parent().children().attr("aria-expanded", "false"), d.length && d.splice(d.indexOf(c), 1))
            : (jQ(b).parent().children().addClass("selected"), jQ(b).parent().children().attr("aria-expanded", "true"), d.push(c)),
            (d = d.filter(function (a) {
                return a.length > 0;
            })),
            jQ(b)
                .parents("." + bcsffilter.class.filterOption)
                .attr("data-selected", JSON.stringify(d));
    }
}
function clearAllFilterOptions(a) {
    jQ("#" + bcsffilter.selector.filterOptionOpenValue).val(null), (bcsffilter.internalClick = !0);
    for (var b = window.location.search.substr(1).split("&"), c = [], d = 0; d < b.length; d++)
        ((b[d].indexOf("sort=") > -1 && -1 === b[d].indexOf("pf_")) || (b[d].indexOf("display=") > -1 && -1 === b[d].indexOf("pf_")) || (b[d].indexOf("q=") > -1 && -1 === b[d].indexOf("pf_"))) && c.push(b[d]);
    var e = window.location.href.split("?")[0];
    c.length > 0 && (e += "?" + c.join("&")), bcsffilter.onChangeData(e, "clearAllFilterOptions");
}
function clearFilterOption(a, b, c) {
    if ((a.preventDefault(), (bcsffilter.internalClick = !0), bcsffilter.queryParams.hasOwnProperty(c))) {
        var d = window.location.href.split("?")[0];
        if (window.location.search.length) {
            for (var e, f = [], g = [], h = 0, i = window.location.search.substr(1).split("&"); h < i.length; h++)
                if (((e = i[h].split("=")), e.length > 1)) {
                    var j = e[0],
                        k = e[1];
                    j != c && "_" != j && j != c + "_and_condition" && j != c + "_show_exact_rating" && (j.indexOf("pf_") > -1 ? f.push(j + "=" + k) : "page" != j && g.push(j + "=" + k));
                }
            (f.length > 0 || g.length > 0) && (g.length > 0 ? ((d += "?"), (d += g.join("&")), f.length > 0 && (d += "&_=" + bcsffilter.prefix + "&" + f.join("&"))) : f.length > 0 && (d += "?_=" + bcsffilter.prefix + "&" + f.join("&")));
        }
        c.indexOf("pf_c_") > -1 && (d = removeCollectionScopeParamFromUrl(d)), jQ('[data-id="' + c + '"]').data("keep-scroll-disabled", !0), bcsffilter.onChangeData(d, "f");
    }
}
function applyFilterOption() {
    bcsffilter.buildFilterSelectionMobile(), showResultMobile();
}
function showResultMobile(a) {
    jQ(".bc-sf-filter-option-amount").hide();
    var b = jQ(".bc-sf-filter-option-block-active"),
        c = b.data("type"),
        d = "&sort=" + bcsffilter.queryParams.sort + "&display=" + bcsffilter.queryParams.display,
        e = window.location.pathname + "?_=pf" + d + jQ("#bc-sf-filter-params").val(),
        f = "filter";
    bcsffilter.isCollectionParam(c) &&
        b.find(".selected").length > 0 &&
        ((e = b.find(".selected").attr("href")),
        (bcsffilter.queryParams.collection_scope = bcsffilter.collectionId = jQ(".bc-sf-filter-option-block-active").find(".selected").closest("[data-collection-scope]").data("collection-scope")),
        (f = "collection")),
        bcsffilter.onChangeData(e, f, "", function () {
            var a = jQ("#bc-sf-filter-options-wrapper");
            a.length > 0 &&
                a.animate({ width: "toggle" }, "fast", function () {
                    var a = bcsffilter.class;
                    jQ("." + a.filterOption).show(), jQ("." + a.filterBlockTitle).show(), jQ("." + a.filterBlockContent).hide(), jQ("." + a.filterOption).removeClass("bc-sf-filter-option-block-active");
                });
        }),
        void 0 !== a && !0 === a && closeFilterMobile();
}
function clearFilterOptionMobile() {
    var a = jQ(".bc-sf-filter-option-block-active"),
        b = a.attr("data-id");
    if ("range" == a.data("display-type")) {
        var c = a.find(".bc-sf-filter-option-range-slider").attr("id"),
            d = document.getElementById(c),
            e = d.noUiSlider.options.range;
        d.noUiSlider.set([e.min, e.max]), jQ("#" + c).removeClass("selected");
    } else
        a.each(function () {
            jQ(this).find("ul li").children().removeClass("selected"), bcsffilter.queryParams.hasOwnProperty(b) && bcsffilter.queryParams[b] && bcsffilter.queryParams[b].length && (bcsffilter.queryParams[b] = []);
        });
    bcsffilter.buildFilterSelectionMobile();
}
function closeFilterMobile() {
    jQ("#bc-sf-filter-tree").removeClass("bc-sf-filter-tree-mobile-open");
}
function onInteractWithToolbar(a, b, c, d) {
    a.preventDefault(), (bcsffilter.internalClick = !0);
    var e = bcsffilter.buildToolbarLink(b, c, d);
    bcsffilter.onChangeData(e, b);
}
function closeSuggestionMobile(a, b) {
    jQ(a).autocomplete("close"),
        jQ("." + bcsffilter.class.searchSuggestion + '[data-search-box="' + a + '"]')
            .parent()
            .hide();
    var b = void 0 !== b && b;
    b && jQ(".bc-sf-search-suggestion-mobile-top-panel,.bc-sf-search-suggestion-mobile-overlay").hide(),
        setValueAllSearchBoxes(),
        jQ(".bc-sf-search-no-tabindex").attr("tabindex", -1),
        jQ("body").hasClass(bcsffilter.getClass("searchSuggestionMobileOpen")) && jQ("body").removeClass(bcsffilter.getClass("searchSuggestionMobileOpen")),
        bcsffilter.afterCloseSuggestionMobile(a, b);
}
function clearSuggestionMobile(a) {
    hideClearSuggestionBtn(), (bcsffilter.currentTerm = ""), setValueAllSearchBoxes(), closeSuggestionMobile(a), jQ(a).focus();
}
function setValueAllSearchBoxes(a) {
    var a = void 0 !== a ? a : bcsffilter.currentTerm;
    jQ('input[name="' + bcsffilter.searchTermKey + '"]').val(a);
}
function submitSearchFormMobile(a, b) {
    var c = bcsffilter.getSearchRedirectUrl(bcsffilter.currentTerm, a, b);
    bcsffilter.submitSearch(bcsffilter.currentTerm, a, c, b);
}
function beforeSubmitSearchForm(a, b) {
    var c = jQ(a).val();
    !c && b && b.target && (c = b.target.value);
    var d = bcsffilter.getSearchRedirectUrl(c);
    bcsffilter.submitSearch(c, a, d, b);
}
function getSuggestionInstance(a) {
    if (jQ(a).data("ui-autocomplete")) {
        var b = jQ(a).autocomplete("instance");
        if (void 0 !== b) return b.menu.element[0];
    }
}
function getSuggestionPosition(a) {
    var b = bcsffilter.getSettingValue("search.suggestionPosition");
    if ("" != b) return b;
    var c = jQ(window).width() / 2;
    return jQ(a).offset().left < c ? "left" : "right";
}
function BCSfSuggestionCallback(a) {
    var b = bcsffilter,
        c = b.suggestionCache;
    if (a.hasOwnProperty("prev_query")) {
        var d = a.prev_query;
        if (c.hasOwnProperty(d)) {
            var e,
                f = c[d],
                g = ["collections", "did_you_mean", "pages", "suggestions", "suggest_query"],
                h = g.length;
            for (e = 0; e < h; e++) a[g[e]] = getValueInObjectArray(g[e], f);
            a.prev_total_product = getValueInObjectArray("total_product", f);
            (f[b.findIndexArray("products", f, "key")].values = a.products), f.push({ key: "local_cache", values: !0 }), f.push({ key: "suggest_total_product", values: a.total_product }), (b.suggestionCache[d] = f);
        }
    }
    suggestionCallback(
        jQ.map(a, function (a, b) {
            return { key: b, values: a };
        })
    );
}
function hideClearSuggestionBtn() {
    jQ(".bc-sf-search-btn-clear-suggestion").hide();
}
function showClearSuggestionBtn() {
    jQ(".bc-sf-search-btn-clear-suggestion").show();
}
function removePageParamFromUrl(a) {
    var b = bcsffilter;
    return (
        b.queryParams.hasOwnProperty("page") &&
            (a = a
                .replace("&page=" + b.queryParams.page, "")
                .replace("?page=" + b.queryParams.page + "&", "?")
                .replace("?page=" + b.queryParams.page, "")),
        a
    );
}
function removeCollectionScopeParamFromUrl(a) {
    var b = bcsffilter;
    return b.queryParams.hasOwnProperty("collection_scope") && (a = a.replace("&collection_scope=" + b.queryParams.collection_scope, "")), a;
}
function encodeURIParamValue(a) {
    return encodeURIComponent(a).replace(/&/g, "%26").replace(/'/g, "%27").replace(/\*/g, "%2A");
}
function convertObjectToArray(a) {
    return Object.keys(a).map(function (b) {
        return a[b];
    });
}
function sortArrayObject(a, b) {
    void 0 !== b &&
        a.sort(function (a, c) {
            var d = a[b],
                e = c[b];
            return "string" == typeof d && (d = d.toLowerCase()), "string" == typeof e && (e = e.toLowerCase()), d < e ? -1 : d > e ? 1 : 0;
        });
}
function getParam(a, b) {
    b || (b = window.location.href), (a = a.replace(/[\[\]]/g, "\\$&"));
    var c = new RegExp("[?&]" + a + "(=([^&#]*)|&|#|$)"),
        d = c.exec(b);
    return d ? (d[2] ? decodeURIComponent(d[2].replace(/\+/g, " ")) : "") : null;
}
function mergeObject(a, b) {
    for (var c in b)
        try {
            a[c] = b[c].constructor == Object ? mergeObject(a[c], b[c]) : b[c];
        } catch (d) {
            a[c] = b[c];
        }
    return a;
}
function capitalize(a, b, c) {
    var b = void 0 !== b && b,
        c = void 0 !== c && c;
    return (
        b && (a = a.toLowerCase()),
        c
            ? a.charAt(0).toUpperCase() + a.slice(1)
            : a.replace(/(?:^|\s)\S/g, function (a) {
                  return a.toUpperCase();
              })
    );
}
function getValueInObjectArray(a, b, c, d) {
    void 0 === c && (c = "key"), void 0 === d && (d = "values");
    var e = bcsffilter.findIndexArray(a, b, c);
    return e > -1 && b[e].hasOwnProperty(d) ? b[e][d] : "";
}
function isInt(a) {
    return Number(a) === a && a % 1 == 0;
}
function isFloat(a) {
    return Number(a) === a && a % 1 != 0;
}
function getNumberDecimals(a) {
    return (a.toString().split(".")[1] || []).length;
}
function uniq(a) {
    return a.filter(function (a, b, c) {
        return c.indexOf(a) === b;
    });
}
function stripHtml(a) {
    return jQ("<p>" + a + "</p>").text();
}
function stripScriptTag(a) {
    if (a) return a.replace(/<script[^>]*>.*?<\/script>/gi, "");
}
function getFilePath(a, b, c) {
    var d = bcsffilter,
        b = void 0 !== b ? b : "png",
        c = void 0 !== c ? c : "1",
        e = d.fileUrl.lastIndexOf("?");
    if (e > 0) var f = d.fileUrl.substring(0, e);
    else var f = d.fileUrl;
    return (f += a + "." + b + "?v=" + c);
}
!(function (a, b) {
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = a.document
              ? b(a, !0)
              : function (a) {
                    if (!a.document) throw new Error("jQuery requires a window with a document");
                    return b(a);
                })
        : b(a);
})("undefined" != typeof window ? window : this, function (a, b) {
    function c(a) {
        var b = a.length,
            c = da.type(a);
        return "function" !== c && !da.isWindow(a) && (!(1 !== a.nodeType || !b) || "array" === c || 0 === b || ("number" == typeof b && b > 0 && b - 1 in a));
    }
    function d(a, b, c) {
        if (da.isFunction(b))
            return da.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c;
            });
        if (b.nodeType)
            return da.grep(a, function (a) {
                return (a === b) !== c;
            });
        if ("string" == typeof b) {
            if (la.test(b)) return da.filter(b, a, c);
            b = da.filter(b, a);
        }
        return da.grep(a, function (a) {
            return da.inArray(a, b) >= 0 !== c;
        });
    }
    function e(a, b) {
        do {
            a = a[b];
        } while (a && 1 !== a.nodeType);
        return a;
    }
    function f(a) {
        var b = (sa[a] = {});
        return (
            da.each(a.match(ra) || [], function (a, c) {
                b[c] = !0;
            }),
            b
        );
    }
    function g() {
        na.addEventListener ? (na.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (na.detachEvent("onreadystatechange", h), a.detachEvent("onload", h));
    }
    function h() {
        (na.addEventListener || "load" === event.type || "complete" === na.readyState) && (g(), da.ready());
    }
    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(xa, "-$1").toLowerCase();
            if ("string" == typeof (c = a.getAttribute(d))) {
                try {
                    c = "true" === c || ("false" !== c && ("null" === c ? null : +c + "" === c ? +c : wa.test(c) ? da.parseJSON(c) : c));
                } catch (a) {}
                da.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function j(a) {
        var b;
        for (b in a) if (("data" !== b || !da.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function k(a, b, c, d) {
        if (da.acceptData(a)) {
            var e,
                f,
                g = da.expando,
                h = a.nodeType,
                i = h ? da.cache : a,
                j = h ? a[g] : a[g] && g;
            if ((j && i[j] && (d || i[j].data)) || void 0 !== c || "string" != typeof b)
                return (
                    j || (j = h ? (a[g] = W.pop() || da.guid++) : g),
                    i[j] || (i[j] = h ? {} : { toJSON: da.noop }),
                    ("object" == typeof b || "function" == typeof b) && (d ? (i[j] = da.extend(i[j], b)) : (i[j].data = da.extend(i[j].data, b))),
                    (f = i[j]),
                    d || (f.data || (f.data = {}), (f = f.data)),
                    void 0 !== c && (f[da.camelCase(b)] = c),
                    "string" == typeof b ? null == (e = f[b]) && (e = f[da.camelCase(b)]) : (e = f),
                    e
                );
        }
    }
    function l(a, b, c) {
        if (da.acceptData(a)) {
            var d,
                e,
                f = a.nodeType,
                g = f ? da.cache : a,
                h = f ? a[da.expando] : da.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    da.isArray(b) ? (b = b.concat(da.map(b, da.camelCase))) : b in d ? (b = [b]) : ((b = da.camelCase(b)), (b = b in d ? [b] : b.split(" "))), (e = b.length);
                    for (; e--; ) delete d[b[e]];
                    if (c ? !j(d) : !da.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, j(g[h]))) && (f ? da.cleanData([a], !0) : ca.deleteExpando || g != g.window ? delete g[h] : (g[h] = null));
            }
        }
    }
    function m() {
        return !0;
    }
    function n() {
        return !1;
    }
    function o() {
        try {
            return na.activeElement;
        } catch (a) {}
    }
    function p(a) {
        var b = Ia.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement) for (; b.length; ) c.createElement(b.pop());
        return c;
    }
    function q(a, b) {
        var c,
            d,
            e = 0,
            f = typeof a.getElementsByTagName !== va ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== va ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || da.nodeName(d, b) ? f.push(d) : da.merge(f, q(d, b));
        return void 0 === b || (b && da.nodeName(a, b)) ? da.merge([a], f) : f;
    }
    function r(a) {
        Ca.test(a.type) && (a.defaultChecked = a.checked);
    }
    function s(a, b) {
        return da.nodeName(a, "table") && da.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function t(a) {
        return (a.type = (null !== da.find.attr(a, "type")) + "/" + a.type), a;
    }
    function u(a) {
        var b = Ta.exec(a.type);
        return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function v(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) da._data(c, "globalEval", !b || da._data(b[d], "globalEval"));
    }
    function w(a, b) {
        if (1 === b.nodeType && da.hasData(a)) {
            var c,
                d,
                e,
                f = da._data(a),
                g = da._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, (g.events = {});
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) da.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = da.extend({}, g.data));
        }
    }
    function x(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (((c = b.nodeName.toLowerCase()), !ca.noCloneEvent && b[da.expando])) {
                e = da._data(b);
                for (d in e.events) da.removeEvent(b, d, e.handle);
                b.removeAttribute(da.expando);
            }
            "script" === c && b.text !== a.text
                ? ((t(b).text = a.text), u(b))
                : "object" === c
                ? (b.parentNode && (b.outerHTML = a.outerHTML), ca.html5Clone && a.innerHTML && !da.trim(b.innerHTML) && (b.innerHTML = a.innerHTML))
                : "input" === c && Ca.test(a.type)
                ? ((b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value))
                : "option" === c
                ? (b.defaultSelected = b.selected = a.defaultSelected)
                : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    function y(b, c) {
        var d,
            e = da(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : da.css(e[0], "display");
        return e.detach(), f;
    }
    function z(a) {
        var b = na,
            c = Za[a];
        return (
            c ||
                ((c = y(a, b)),
                ("none" !== c && c) ||
                    ((Ya = (Ya || da("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement)), (b = (Ya[0].contentWindow || Ya[0].contentDocument).document), b.write(), b.close(), (c = y(a, b)), Ya.detach()),
                (Za[a] = c)),
            c
        );
    }
    function A(a, b) {
        return {
            get: function () {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments);
            },
        };
    }
    function B(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = kb.length; e--; ) if ((b = kb[e] + c) in a) return b;
        return d;
    }
    function C(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            (d = a[g]),
                d.style &&
                    ((f[g] = da._data(d, "olddisplay")),
                    (c = d.style.display),
                    b
                        ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Aa(d) && (f[g] = da._data(d, "olddisplay", z(d.nodeName))))
                        : ((e = Aa(d)), ((c && "none" !== c) || !e) && da._data(d, "olddisplay", e ? c : da.css(d, "display"))));
        for (g = 0; h > g; g++) (d = a[g]), d.style && ((b && "none" !== d.style.display && "" !== d.style.display) || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function D(a, b, c) {
        var d = gb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function E(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
            "margin" === c && (g += da.css(a, c + za[f], !0, e)),
                d
                    ? ("content" === c && (g -= da.css(a, "padding" + za[f], !0, e)), "margin" !== c && (g -= da.css(a, "border" + za[f] + "Width", !0, e)))
                    : ((g += da.css(a, "padding" + za[f], !0, e)), "padding" !== c && (g += da.css(a, "border" + za[f] + "Width", !0, e)));
        return g;
    }
    function F(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = $a(a),
            g = ca.boxSizing && "border-box" === da.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (((e = _a(a, b, f)), (0 > e || null == e) && (e = a.style[b]), bb.test(e))) return e;
            (d = g && (ca.boxSizingReliable() || e === a.style[b])), (e = parseFloat(e) || 0);
        }
        return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function G(a, b, c, d, e) {
        return new G.prototype.init(a, b, c, d, e);
    }
    function H() {
        return (
            setTimeout(function () {
                lb = void 0;
            }),
            (lb = da.now())
        );
    }
    function I(a, b) {
        var c,
            d = { height: a },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) (c = za[e]), (d["margin" + c] = d["padding" + c] = a);
        return b && (d.opacity = d.width = a), d;
    }
    function J(a, b, c) {
        for (var d, e = (rb[b] || []).concat(rb["*"]), f = 0, g = e.length; g > f; f++) if ((d = e[f].call(c, b, a))) return d;
    }
    function K(a, b, c) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = this,
            l = {},
            m = a.style,
            n = a.nodeType && Aa(a),
            o = da._data(a, "fxshow");
        c.queue ||
            ((h = da._queueHooks(a, "fx")),
            null == h.unqueued &&
                ((h.unqueued = 0),
                (i = h.empty.fire),
                (h.empty.fire = function () {
                    h.unqueued || i();
                })),
            h.unqueued++,
            k.always(function () {
                k.always(function () {
                    h.unqueued--, da.queue(a, "fx").length || h.empty.fire();
                });
            })),
            1 === a.nodeType &&
                ("height" in b || "width" in b) &&
                ((c.overflow = [m.overflow, m.overflowX, m.overflowY]),
                (j = da.css(a, "display")),
                "inline" === ("none" === j ? da._data(a, "olddisplay") || z(a.nodeName) : j) && "none" === da.css(a, "float") && (ca.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? (m.zoom = 1) : (m.display = "inline-block"))),
            c.overflow &&
                ((m.overflow = "hidden"),
                ca.shrinkWrapBlocks() ||
                    k.always(function () {
                        (m.overflow = c.overflow[0]), (m.overflowX = c.overflow[1]), (m.overflowY = c.overflow[2]);
                    }));
        for (d in b)
            if (((e = b[d]), nb.exec(e))) {
                if ((delete b[d], (f = f || "toggle" === e), e === (n ? "hide" : "show"))) {
                    if ("show" !== e || !o || void 0 === o[d]) continue;
                    n = !0;
                }
                l[d] = (o && o[d]) || da.style(a, d);
            } else j = void 0;
        if (da.isEmptyObject(l)) "inline" === ("none" === j ? z(a.nodeName) : j) && (m.display = j);
        else {
            o ? "hidden" in o && (n = o.hidden) : (o = da._data(a, "fxshow", {})),
                f && (o.hidden = !n),
                n
                    ? da(a).show()
                    : k.done(function () {
                          da(a).hide();
                      }),
                k.done(function () {
                    var b;
                    da._removeData(a, "fxshow");
                    for (b in l) da.style(a, b, l[b]);
                });
            for (d in l) (g = J(n ? o[d] : 0, d, k)), d in o || ((o[d] = g.start), n && ((g.end = g.start), (g.start = "width" === d || "height" === d ? 1 : 0)));
        }
    }
    function L(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (((d = da.camelCase(c)), (e = b[d]), (f = a[c]), da.isArray(f) && ((e = f[1]), (f = a[c] = f[0])), c !== d && ((a[d] = f), delete a[c]), (g = da.cssHooks[d]) && "expand" in g)) {
                (f = g.expand(f)), delete a[d];
                for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
            } else b[d] = e;
    }
    function M(a, b, c) {
        var d,
            e,
            f = 0,
            g = qb.length,
            h = da.Deferred().always(function () {
                delete i.elem;
            }),
            i = function () {
                if (e) return !1;
                for (var b = lb || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
            },
            j = h.promise({
                elem: a,
                props: da.extend({}, b),
                opts: da.extend(!0, { specialEasing: {} }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: lb || H(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = da.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d;
                },
                stop: function (b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
                },
            }),
            k = j.props;
        for (L(k, j.opts.specialEasing); g > f; f++) if ((d = qb[f].call(j, a, k, j.opts))) return d;
        return (
            da.map(k, J, j),
            da.isFunction(j.opts.start) && j.opts.start.call(a, j),
            da.fx.timer(da.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
            j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        );
    }
    function N(a) {
        return function (b, c) {
            "string" != typeof b && ((c = b), (b = "*"));
            var d,
                e = 0,
                f = b.toLowerCase().match(ra) || [];
            if (da.isFunction(c)) for (; (d = f[e++]); ) "+" === d.charAt(0) ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function O(a, b, c, d) {
        function e(h) {
            var i;
            return (
                (f[h] = !0),
                da.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? (g ? !(i = j) : void 0) : (b.dataTypes.unshift(j), e(j), !1);
                }),
                i
            );
        }
        var f = {},
            g = a === Pb;
        return e(b.dataTypes[0]) || (!f["*"] && e("*"));
    }
    function P(a, b) {
        var c,
            d,
            e = da.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && da.extend(!0, a, c), a;
    }
    function Q(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break;
                }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function R(a, b, c, d) {
        var e,
            f,
            g,
            h,
            i,
            j = {},
            k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; )
            if ((a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), (i = f), (f = k.shift())))
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
                    if (!(g = j[i + " " + f] || j["* " + f]))
                        for (e in j)
                            if (((h = e.split(" ")), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))) {
                                !0 === g ? (g = j[e]) : !0 !== j[e] && ((f = h[0]), k.unshift(h[1]));
                                break;
                            }
                    if (!0 !== g)
                        if (g && a.throws) b = g(b);
                        else
                            try {
                                b = g(b);
                            } catch (a) {
                                return { state: "parsererror", error: g ? a : "No conversion from " + i + " to " + f };
                            }
                }
        return { state: "success", data: b };
    }
    function S(a, b, c, d) {
        var e;
        if (da.isArray(b))
            da.each(b, function (b, e) {
                c || Sb.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
            });
        else if (c || "object" !== da.type(b)) d(a, b);
        else for (e in b) S(a + "[" + e + "]", b[e], c, d);
    }
    function T() {
        try {
            return new a.XMLHttpRequest();
        } catch (a) {}
    }
    function U() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (a) {}
    }
    function V(a) {
        return da.isWindow(a) ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow);
    }
    var W = [],
        X = W.slice,
        Y = W.concat,
        Z = W.push,
        $ = W.indexOf,
        _ = {},
        aa = _.toString,
        ba = _.hasOwnProperty,
        ca = {},
        da = function (a, b) {
            return new da.fn.init(a, b);
        },
        ea = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        fa = /^-ms-/,
        ga = /-([\da-z])/gi,
        ha = function (a, b) {
            return b.toUpperCase();
        };
    (da.fn = da.prototype = {
        jquery: "1.11.1",
        constructor: da,
        selector: "",
        length: 0,
        toArray: function () {
            return X.call(this);
        },
        get: function (a) {
            return null != a ? (0 > a ? this[a + this.length] : this[a]) : X.call(this);
        },
        pushStack: function (a) {
            var b = da.merge(this.constructor(), a);
            return (b.prevObject = this), (b.context = this.context), b;
        },
        each: function (a, b) {
            return da.each(this, a, b);
        },
        map: function (a) {
            return this.pushStack(
                da.map(this, function (b, c) {
                    return a.call(b, c, b);
                })
            );
        },
        slice: function () {
            return this.pushStack(X.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: Z,
        sort: W.sort,
        splice: W.splice,
    }),
        (da.extend = da.fn.extend = function () {
            var a,
                b,
                c,
                d,
                e,
                f,
                g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && ((j = g), (g = arguments[h] || {}), h++), "object" == typeof g || da.isFunction(g) || (g = {}), h === i && ((g = this), h--); i > h; h++)
                if (null != (e = arguments[h]))
                    for (d in e)
                        (a = g[d]),
                            (c = e[d]),
                            g !== c &&
                                (j && c && (da.isPlainObject(c) || (b = da.isArray(c)))
                                    ? (b ? ((b = !1), (f = a && da.isArray(a) ? a : [])) : (f = a && da.isPlainObject(a) ? a : {}), (g[d] = da.extend(j, f, c)))
                                    : void 0 !== c && (g[d] = c));
            return g;
        }),
        da.extend({
            expando: "jQuery" + ("1.11.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (a) {
                throw new Error(a);
            },
            noop: function () {},
            isFunction: function (a) {
                return "function" === da.type(a);
            },
            isArray:
                Array.isArray ||
                function (a) {
                    return "array" === da.type(a);
                },
            isWindow: function (a) {
                return null != a && a == a.window;
            },
            isNumeric: function (a) {
                return !da.isArray(a) && a - parseFloat(a) >= 0;
            },
            isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0;
            },
            isPlainObject: function (a) {
                var b;
                if (!a || "object" !== da.type(a) || a.nodeType || da.isWindow(a)) return !1;
                try {
                    if (a.constructor && !ba.call(a, "constructor") && !ba.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (a) {
                    return !1;
                }
                if (ca.ownLast) for (b in a) return ba.call(a, b);
                for (b in a);
                return void 0 === b || ba.call(a, b);
            },
            type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[aa.call(a)] || "object" : typeof a;
            },
            globalEval: function (b) {
                b &&
                    da.trim(b) &&
                    (
                        a.execScript ||
                        function (b) {
                            a.eval.call(a, b);
                        }
                    )(b);
            },
            camelCase: function (a) {
                return a.replace(fa, "ms-").replace(ga, ha);
            },
            nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
            },
            each: function (a, b, d) {
                var e = 0,
                    f = a.length,
                    g = c(a);
                if (d) {
                    if (g) for (; f > e && !1 !== b.apply(a[e], d); e++);
                    else for (e in a) if (!1 === b.apply(a[e], d)) break;
                } else if (g) for (; f > e && !1 !== b.call(a[e], e, a[e]); e++);
                else for (e in a) if (!1 === b.call(a[e], e, a[e])) break;
                return a;
            },
            trim: function (a) {
                return null == a ? "" : (a + "").replace(ea, "");
            },
            makeArray: function (a, b) {
                var d = b || [];
                return null != a && (c(Object(a)) ? da.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d;
            },
            inArray: function (a, b, c) {
                var d;
                if (b) {
                    if ($) return $.call(b, a, c);
                    for (d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0; d > c; c++) if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function (a, b) {
                for (var c = +b.length, d = 0, e = a.length; c > d; ) a[e++] = b[d++];
                if (c !== c) for (; void 0 !== b[d]; ) a[e++] = b[d++];
                return (a.length = e), a;
            },
            grep: function (a, b, c) {
                for (var d = [], e = 0, f = a.length, g = !c; f > e; e++) !b(a[e], e) !== g && d.push(a[e]);
                return d;
            },
            map: function (a, b, d) {
                var e,
                    f = 0,
                    g = a.length,
                    h = c(a),
                    i = [];
                if (h) for (; g > f; f++) null != (e = b(a[f], f, d)) && i.push(e);
                else for (f in a) null != (e = b(a[f], f, d)) && i.push(e);
                return Y.apply([], i);
            },
            guid: 1,
            proxy: function (a, b) {
                var c, d, e;
                return (
                    "string" == typeof b && ((e = a[b]), (b = a), (a = e)),
                    da.isFunction(a)
                        ? ((c = X.call(arguments, 2)),
                          (d = function () {
                              return a.apply(b || this, c.concat(X.call(arguments)));
                          }),
                          (d.guid = a.guid = a.guid || da.guid++),
                          d)
                        : void 0
                );
            },
            now: function () {
                return +new Date();
            },
            support: ca,
        }),
        da.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
            _["[object " + b + "]"] = b.toLowerCase();
        });
    var ia = (function (a) {
        function b(a, b, c, d) {
            var e, f, g, h, j, l, m, n, o, p;
            if (((b ? b.ownerDocument || b : M) !== E && D(b), (b = b || E), (c = c || []), !a || "string" != typeof a)) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (G && !d) {
                if ((e = qa.exec(a)))
                    if ((g = e[1])) {
                        if (9 === h) {
                            if (!(f = b.getElementById(g)) || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c;
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && K(b, f) && f.id === g) return c.push(f), c;
                    } else {
                        if (e[2]) return Z.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && t.getElementsByClassName && b.getElementsByClassName) return Z.apply(c, b.getElementsByClassName(g)), c;
                    }
                if (t.qsa && (!H || !H.test(a))) {
                    if (((n = m = L), (o = b), (p = 9 === h && a), 1 === h && "object" !== b.nodeName.toLowerCase())) {
                        for (l = x(a), (m = b.getAttribute("id")) ? (n = m.replace(sa, "\\$&")) : b.setAttribute("id", n), n = "[id='" + n + "'] ", j = l.length; j--; ) l[j] = n + k(l[j]);
                        (o = (ra.test(a) && i(b.parentNode)) || b), (p = l.join(","));
                    }
                    if (p)
                        try {
                            return Z.apply(c, o.querySelectorAll(p)), c;
                        } catch (a) {
                        } finally {
                            m || b.removeAttribute("id");
                        }
                }
            }
            return z(a.replace(ga, "$1"), b, c, d);
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > u.cacheLength && delete a[b.shift()], (a[c + " "] = d);
            }
            var b = [];
            return a;
        }
        function d(a) {
            return (a[L] = !0), a;
        }
        function e(a) {
            var b = E.createElement("div");
            try {
                return !!a(b);
            } catch (a) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), (b = null);
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; ) u.attrHandle[c[d]] = b;
        }
        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || U) - (~a.sourceIndex || U);
            if (d) return d;
            if (c) for (; (c = c.nextSibling); ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function h(a) {
            return d(function (b) {
                return (
                    (b = +b),
                    d(function (c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--; ) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
                    })
                );
            });
        }
        function i(a) {
            return a && typeof a.getElementsByTagName !== T && a;
        }
        function j() {}
        function k(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function l(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = O++;
            return b.first
                ? function (b, c, f) {
                      for (; (b = b[d]); ) if (1 === b.nodeType || e) return a(b, c, f);
                  }
                : function (b, c, g) {
                      var h,
                          i,
                          j = [N, f];
                      if (g) {
                          for (; (b = b[d]); ) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                      } else
                          for (; (b = b[d]); )
                              if (1 === b.nodeType || e) {
                                  if (((i = b[L] || (b[L] = {})), (h = i[d]) && h[0] === N && h[1] === f)) return (j[2] = h[2]);
                                  if (((i[d] = j), (j[2] = a(b, c, g)))) return !0;
                              }
                  };
        }
        function m(a) {
            return a.length > 1
                ? function (b, c, d) {
                      for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                      return !0;
                  }
                : a[0];
        }
        function n(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d;
        }
        function o(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g;
        }
        function p(a, b, c, e, f, g) {
            return (
                e && !e[L] && (e = p(e)),
                f && !f[L] && (f = p(f, g)),
                d(function (d, g, h, i) {
                    var j,
                        k,
                        l,
                        m = [],
                        p = [],
                        q = g.length,
                        r = d || n(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || (!d && b) ? r : o(r, m, a, h, i),
                        t = c ? (f || (d ? a : q || e) ? [] : g) : s;
                    if ((c && c(s, t, h, i), e)) for (j = o(t, p), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (t[p[k]] = !(s[p[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--; ) (l = t[k]) && j.push((s[k] = l));
                                f(null, (t = []), j, i);
                            }
                            for (k = t.length; k--; ) (l = t[k]) && (j = f ? _.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                        }
                    } else (t = o(t === g ? t.splice(q, t.length) : t)), f ? f(null, g, t, i) : Z.apply(g, t);
                })
            );
        }
        function q(a) {
            for (
                var b,
                    c,
                    d,
                    e = a.length,
                    f = u.relative[a[0].type],
                    g = f || u.relative[" "],
                    h = f ? 1 : 0,
                    i = l(
                        function (a) {
                            return a === b;
                        },
                        g,
                        !0
                    ),
                    j = l(
                        function (a) {
                            return _.call(b, a) > -1;
                        },
                        g,
                        !0
                    ),
                    n = [
                        function (a, c, d) {
                            return (!f && (d || c !== A)) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                        },
                    ];
                e > h;
                h++
            )
                if ((c = u.relative[a[h].type])) n = [l(m(n), c)];
                else {
                    if (((c = u.filter[a[h].type].apply(null, a[h].matches)), c[L])) {
                        for (d = ++h; e > d && !u.relative[a[d].type]; d++);
                        return p(h > 1 && m(n), h > 1 && k(a.slice(0, h - 1).concat({ value: " " === a[h - 2].type ? "*" : "" })).replace(ga, "$1"), c, d > h && q(a.slice(h, d)), e > d && q((a = a.slice(d))), e > d && k(a));
                    }
                    n.push(c);
                }
            return m(n);
        }
        function r(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function (d, g, h, i, j) {
                    var k,
                        l,
                        m,
                        n = 0,
                        p = "0",
                        q = d && [],
                        r = [],
                        s = A,
                        t = d || (f && u.find.TAG("*", j)),
                        v = (N += null == s ? 1 : Math.random() || 0.1),
                        w = t.length;
                    for (j && (A = g !== E && g); p !== w && null != (k = t[p]); p++) {
                        if (f && k) {
                            for (l = 0; (m = a[l++]); )
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break;
                                }
                            j && (N = v);
                        }
                        e && ((k = !m && k) && n--, d && q.push(k));
                    }
                    if (((n += p), e && p !== n)) {
                        for (l = 0; (m = c[l++]); ) m(q, r, g, h);
                        if (d) {
                            if (n > 0) for (; p--; ) q[p] || r[p] || (r[p] = X.call(i));
                            r = o(r);
                        }
                        Z.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                    }
                    return j && ((N = v), (A = s)), q;
                };
            return e ? d(g) : g;
        }
        var s,
            t,
            u,
            v,
            w,
            x,
            y,
            z,
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H,
            I,
            J,
            K,
            L = "sizzle" + -new Date(),
            M = a.document,
            N = 0,
            O = 0,
            P = c(),
            Q = c(),
            R = c(),
            S = function (a, b) {
                return a === b && (C = !0), 0;
            },
            T = "undefined",
            U = 1 << 31,
            V = {}.hasOwnProperty,
            W = [],
            X = W.pop,
            Y = W.push,
            Z = W.push,
            $ = W.slice,
            _ =
                W.indexOf ||
                function (a) {
                    for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
                    return -1;
                },
            aa = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ba = "[\\x20\\t\\r\\n\\f]",
            ca = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            da = ca.replace("w", "w#"),
            ea = "\\[" + ba + "*(" + ca + ")(?:" + ba + "*([*^$|!~]?=)" + ba + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ba + "*\\]",
            fa = ":(" + ca + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
            ga = new RegExp("^" + ba + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ba + "+$", "g"),
            ha = new RegExp("^" + ba + "*," + ba + "*"),
            ia = new RegExp("^" + ba + "*([>+~]|" + ba + ")" + ba + "*"),
            ja = new RegExp("=" + ba + "*([^\\]'\"]*?)" + ba + "*\\]", "g"),
            ka = new RegExp(fa),
            la = new RegExp("^" + da + "$"),
            ma = {
                ID: new RegExp("^#(" + ca + ")"),
                CLASS: new RegExp("^\\.(" + ca + ")"),
                TAG: new RegExp("^(" + ca.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ea),
                PSEUDO: new RegExp("^" + fa),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ba + "*(even|odd|(([+-]|)(\\d*)n|)" + ba + "*(?:([+-]|)" + ba + "*(\\d+)|))" + ba + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + aa + ")$", "i"),
                needsContext: new RegExp("^" + ba + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ba + "*((?:-\\d)?\\d*)" + ba + "*\\)|)(?=[^-]|$)", "i"),
            },
            na = /^(?:input|select|textarea|button)$/i,
            oa = /^h\d$/i,
            pa = /^[^{]+\{\s*\[native \w/,
            qa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ra = /[+~]/,
            sa = /'|\\/g,
            ta = new RegExp("\\\\([\\da-f]{1,6}" + ba + "?|(" + ba + ")|.)", "ig"),
            ua = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
            };
        try {
            Z.apply((W = $.call(M.childNodes)), M.childNodes), W[M.childNodes.length].nodeType;
        } catch (a) {
            Z = {
                apply: W.length
                    ? function (a, b) {
                          Y.apply(a, $.call(b));
                      }
                    : function (a, b) {
                          for (var c = a.length, d = 0; (a[c++] = b[d++]); );
                          a.length = c - 1;
                      },
            };
        }
        (t = b.support = {}),
            (w = b.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return !!b && "HTML" !== b.nodeName;
            }),
            (D = b.setDocument = function (a) {
                var b,
                    c = a ? a.ownerDocument || a : M,
                    d = c.defaultView;
                return c !== E && 9 === c.nodeType && c.documentElement
                    ? ((E = c),
                      (F = c.documentElement),
                      (G = !w(c)),
                      d &&
                          d !== d.top &&
                          (d.addEventListener
                              ? d.addEventListener(
                                    "unload",
                                    function () {
                                        D();
                                    },
                                    !1
                                )
                              : d.attachEvent &&
                                d.attachEvent("onunload", function () {
                                    D();
                                })),
                      (t.attributes = e(function (a) {
                          return (a.className = "i"), !a.getAttribute("className");
                      })),
                      (t.getElementsByTagName = e(function (a) {
                          return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length;
                      })),
                      (t.getElementsByClassName =
                          pa.test(c.getElementsByClassName) &&
                          e(function (a) {
                              return (a.innerHTML = "<div class='a'></div><div class='a i'></div>"), (a.firstChild.className = "i"), 2 === a.getElementsByClassName("i").length;
                          })),
                      (t.getById = e(function (a) {
                          return (F.appendChild(a).id = L), !c.getElementsByName || !c.getElementsByName(L).length;
                      })),
                      t.getById
                          ? ((u.find.ID = function (a, b) {
                                if (typeof b.getElementById !== T && G) {
                                    var c = b.getElementById(a);
                                    return c && c.parentNode ? [c] : [];
                                }
                            }),
                            (u.filter.ID = function (a) {
                                var b = a.replace(ta, ua);
                                return function (a) {
                                    return a.getAttribute("id") === b;
                                };
                            }))
                          : (delete u.find.ID,
                            (u.filter.ID = function (a) {
                                var b = a.replace(ta, ua);
                                return function (a) {
                                    var c = typeof a.getAttributeNode !== T && a.getAttributeNode("id");
                                    return c && c.value === b;
                                };
                            })),
                      (u.find.TAG = t.getElementsByTagName
                          ? function (a, b) {
                                return typeof b.getElementsByTagName !== T ? b.getElementsByTagName(a) : void 0;
                            }
                          : function (a, b) {
                                var c,
                                    d = [],
                                    e = 0,
                                    f = b.getElementsByTagName(a);
                                if ("*" === a) {
                                    for (; (c = f[e++]); ) 1 === c.nodeType && d.push(c);
                                    return d;
                                }
                                return f;
                            }),
                      (u.find.CLASS =
                          t.getElementsByClassName &&
                          function (a, b) {
                              return typeof b.getElementsByClassName !== T && G ? b.getElementsByClassName(a) : void 0;
                          }),
                      (I = []),
                      (H = []),
                      (t.qsa = pa.test(c.querySelectorAll)) &&
                          (e(function (a) {
                              (a.innerHTML = "<select msallowclip=''><option selected=''></option></select>"),
                                  a.querySelectorAll("[msallowclip^='']").length && H.push("[*^$]=" + ba + "*(?:''|\"\")"),
                                  a.querySelectorAll("[selected]").length || H.push("\\[" + ba + "*(?:value|" + aa + ")"),
                                  a.querySelectorAll(":checked").length || H.push(":checked");
                          }),
                          e(function (a) {
                              var b = c.createElement("input");
                              b.setAttribute("type", "hidden"),
                                  a.appendChild(b).setAttribute("name", "D"),
                                  a.querySelectorAll("[name=d]").length && H.push("name" + ba + "*[*^$|!~]?="),
                                  a.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"),
                                  a.querySelectorAll("*,:x"),
                                  H.push(",.*:");
                          })),
                      (t.matchesSelector = pa.test((J = F.matches || F.webkitMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector || F.msMatchesSelector))) &&
                          e(function (a) {
                              (t.disconnectedMatch = J.call(a, "div")), J.call(a, "[s!='']:x"), I.push("!=", fa);
                          }),
                      (H = H.length && new RegExp(H.join("|"))),
                      (I = I.length && new RegExp(I.join("|"))),
                      (b = pa.test(F.compareDocumentPosition)),
                      (K =
                          b || pa.test(F.contains)
                              ? function (a, b) {
                                    var c = 9 === a.nodeType ? a.documentElement : a,
                                        d = b && b.parentNode;
                                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
                                }
                              : function (a, b) {
                                    if (b) for (; (b = b.parentNode); ) if (b === a) return !0;
                                    return !1;
                                }),
                      (S = b
                          ? function (a, b) {
                                if (a === b) return (C = !0), 0;
                                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                return (
                                    d ||
                                    ((d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1),
                                    1 & d || (!t.sortDetached && b.compareDocumentPosition(a) === d)
                                        ? a === c || (a.ownerDocument === M && K(M, a))
                                            ? -1
                                            : b === c || (b.ownerDocument === M && K(M, b))
                                            ? 1
                                            : B
                                            ? _.call(B, a) - _.call(B, b)
                                            : 0
                                        : 4 & d
                                        ? -1
                                        : 1)
                                );
                            }
                          : function (a, b) {
                                if (a === b) return (C = !0), 0;
                                var d,
                                    e = 0,
                                    f = a.parentNode,
                                    h = b.parentNode,
                                    i = [a],
                                    j = [b];
                                if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : B ? _.call(B, a) - _.call(B, b) : 0;
                                if (f === h) return g(a, b);
                                for (d = a; (d = d.parentNode); ) i.unshift(d);
                                for (d = b; (d = d.parentNode); ) j.unshift(d);
                                for (; i[e] === j[e]; ) e++;
                                return e ? g(i[e], j[e]) : i[e] === M ? -1 : j[e] === M ? 1 : 0;
                            }),
                      c)
                    : E;
            }),
            (b.matches = function (a, c) {
                return b(a, null, null, c);
            }),
            (b.matchesSelector = function (a, c) {
                if (((a.ownerDocument || a) !== E && D(a), (c = c.replace(ja, "='$1']")), !(!t.matchesSelector || !G || (I && I.test(c)) || (H && H.test(c)))))
                    try {
                        var d = J.call(a, c);
                        if (d || t.disconnectedMatch || (a.document && 11 !== a.document.nodeType)) return d;
                    } catch (a) {}
                return b(c, E, null, [a]).length > 0;
            }),
            (b.contains = function (a, b) {
                return (a.ownerDocument || a) !== E && D(a), K(a, b);
            }),
            (b.attr = function (a, b) {
                (a.ownerDocument || a) !== E && D(a);
                var c = u.attrHandle[b.toLowerCase()],
                    d = c && V.call(u.attrHandle, b.toLowerCase()) ? c(a, b, !G) : void 0;
                return void 0 !== d ? d : t.attributes || !G ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
            }),
            (b.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a);
            }),
            (b.uniqueSort = function (a) {
                var b,
                    c = [],
                    d = 0,
                    e = 0;
                if (((C = !t.detectDuplicates), (B = !t.sortStable && a.slice(0)), a.sort(S), C)) {
                    for (; (b = a[e++]); ) b === a[e] && (d = c.push(e));
                    for (; d--; ) a.splice(c[d], 1);
                }
                return (B = null), a;
            }),
            (v = b.getText = function (a) {
                var b,
                    c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += v(a);
                    } else if (3 === e || 4 === e) return a.nodeValue;
                } else for (; (b = a[d++]); ) c += v(b);
                return c;
            }),
            (u = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: ma,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (a) {
                        return (a[1] = a[1].replace(ta, ua)), (a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua)), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                    },
                    CHILD: function (a) {
                        return (
                            (a[1] = a[1].toLowerCase()),
                            "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), (a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3]))), (a[5] = +(a[7] + a[8] || "odd" === a[3]))) : a[3] && b.error(a[0]),
                            a
                        );
                    },
                    PSEUDO: function (a) {
                        var b,
                            c = !a[6] && a[2];
                        return ma.CHILD.test(a[0])
                            ? null
                            : (a[3] ? (a[2] = a[4] || a[5] || "") : c && ka.test(c) && (b = x(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))), a.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(ta, ua).toLowerCase();
                        return "*" === a
                            ? function () {
                                  return !0;
                              }
                            : function (a) {
                                  return a.nodeName && a.nodeName.toLowerCase() === b;
                              };
                    },
                    CLASS: function (a) {
                        var b = P[a + " "];
                        return (
                            b ||
                            ((b = new RegExp("(^|" + ba + ")" + a + "(" + ba + "|$)")) &&
                                P(a, function (a) {
                                    return b.test(("string" == typeof a.className && a.className) || (typeof a.getAttribute !== T && a.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (a, c, d) {
                        return function (e) {
                            var f = b.attr(e, a);
                            return null == f
                                ? "!=" === c
                                : !c ||
                                      ((f += ""),
                                      "=" === c
                                          ? f === d
                                          : "!=" === c
                                          ? f !== d
                                          : "^=" === c
                                          ? d && 0 === f.indexOf(d)
                                          : "*=" === c
                                          ? d && f.indexOf(d) > -1
                                          : "$=" === c
                                          ? d && f.slice(-d.length) === d
                                          : "~=" === c
                                          ? (" " + f + " ").indexOf(d) > -1
                                          : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"));
                        };
                    },
                    CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e
                            ? function (a) {
                                  return !!a.parentNode;
                              }
                            : function (b, c, i) {
                                  var j,
                                      k,
                                      l,
                                      m,
                                      n,
                                      o,
                                      p = f !== g ? "nextSibling" : "previousSibling",
                                      q = b.parentNode,
                                      r = h && b.nodeName.toLowerCase(),
                                      s = !i && !h;
                                  if (q) {
                                      if (f) {
                                          for (; p; ) {
                                              for (l = b; (l = l[p]); ) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                              o = p = "only" === a && !o && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                                          for (k = q[L] || (q[L] = {}), j = k[a] || [], n = j[0] === N && j[1], m = j[0] === N && j[2], l = n && q.childNodes[n]; (l = (++n && l && l[p]) || (m = n = 0) || o.pop()); )
                                              if (1 === l.nodeType && ++m && l === b) {
                                                  k[a] = [N, n, m];
                                                  break;
                                              }
                                      } else if (s && (j = (b[L] || (b[L] = {}))[a]) && j[0] === N) m = j[1];
                                      else for (; (l = (++n && l && l[p]) || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[L] || (l[L] = {}))[a] = [N, m]), l !== b)); );
                                      return (m -= e) === d || (m % d == 0 && m / d >= 0);
                                  }
                              };
                    },
                    PSEUDO: function (a, c) {
                        var e,
                            f = u.pseudos[a] || u.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[L]
                            ? f(c)
                            : f.length > 1
                            ? ((e = [a, a, "", c]),
                              u.setFilters.hasOwnProperty(a.toLowerCase())
                                  ? d(function (a, b) {
                                        for (var d, e = f(a, c), g = e.length; g--; ) (d = _.call(a, e[g])), (a[d] = !(b[d] = e[g]));
                                    })
                                  : function (a) {
                                        return f(a, 0, e);
                                    })
                            : f;
                    },
                },
                pseudos: {
                    not: d(function (a) {
                        var b = [],
                            c = [],
                            e = y(a.replace(ga, "$1"));
                        return e[L]
                            ? d(function (a, b, c, d) {
                                  for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                              })
                            : function (a, d, f) {
                                  return (b[0] = a), e(b, null, f, c), !c.pop();
                              };
                    }),
                    has: d(function (a) {
                        return function (c) {
                            return b(a, c).length > 0;
                        };
                    }),
                    contains: d(function (a) {
                        return function (b) {
                            return (b.textContent || b.innerText || v(b)).indexOf(a) > -1;
                        };
                    }),
                    lang: d(function (a) {
                        return (
                            la.test(a || "") || b.error("unsupported lang: " + a),
                            (a = a.replace(ta, ua).toLowerCase()),
                            function (b) {
                                var c;
                                do {
                                    if ((c = G ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-");
                                } while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id;
                    },
                    root: function (a) {
                        return a === F;
                    },
                    focus: function (a) {
                        return a === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                    },
                    enabled: function (a) {
                        return !1 === a.disabled;
                    },
                    disabled: function (a) {
                        return !0 === a.disabled;
                    },
                    checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return ("input" === b && !!a.checked) || ("option" === b && !!a.selected);
                    },
                    selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected;
                    },
                    empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (a) {
                        return !u.pseudos.empty(a);
                    },
                    header: function (a) {
                        return oa.test(a.nodeName);
                    },
                    input: function (a) {
                        return na.test(a.nodeName);
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return ("input" === b && "button" === a.type) || "button" === b;
                    },
                    text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                    },
                    first: h(function () {
                        return [0];
                    }),
                    last: h(function (a, b) {
                        return [b - 1];
                    }),
                    eq: h(function (a, b, c) {
                        return [0 > c ? c + b : c];
                    }),
                    even: h(function (a, b) {
                        for (var c = 0; b > c; c += 2) a.push(c);
                        return a;
                    }),
                    odd: h(function (a, b) {
                        for (var c = 1; b > c; c += 2) a.push(c);
                        return a;
                    }),
                    lt: h(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                        return a;
                    }),
                    gt: h(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                        return a;
                    }),
                },
            }),
            (u.pseudos.nth = u.pseudos.eq);
        for (s in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
            u.pseudos[s] = (function (a) {
                return function (b) {
                    return "input" === b.nodeName.toLowerCase() && b.type === a;
                };
            })(s);
        for (s in { submit: !0, reset: !0 })
            u.pseudos[s] = (function (a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a;
                };
            })(s);
        return (
            (j.prototype = u.filters = u.pseudos),
            (u.setFilters = new j()),
            (x = b.tokenize = function (a, c) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k = Q[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = u.preFilter; h; ) {
                    (!d || (e = ha.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push((f = []))), (d = !1), (e = ia.exec(h)) && ((d = e.shift()), f.push({ value: d, type: e[0].replace(ga, " ") }), (h = h.slice(d.length)));
                    for (g in u.filter) !(e = ma[g].exec(h)) || (j[g] && !(e = j[g](e))) || ((d = e.shift()), f.push({ value: d, type: g, matches: e }), (h = h.slice(d.length)));
                    if (!d) break;
                }
                return c ? h.length : h ? b.error(a) : Q(a, i).slice(0);
            }),
            (y = b.compile = function (a, b) {
                var c,
                    d = [],
                    e = [],
                    f = R[a + " "];
                if (!f) {
                    for (b || (b = x(a)), c = b.length; c--; ) (f = q(b[c])), f[L] ? d.push(f) : e.push(f);
                    (f = R(a, r(e, d))), (f.selector = a);
                }
                return f;
            }),
            (z = b.select = function (a, b, c, d) {
                var e,
                    f,
                    g,
                    h,
                    j,
                    l = "function" == typeof a && a,
                    m = !d && x((a = l.selector || a));
                if (((c = c || []), 1 === m.length)) {
                    if (((f = m[0] = m[0].slice(0)), f.length > 2 && "ID" === (g = f[0]).type && t.getById && 9 === b.nodeType && G && u.relative[f[1].type])) {
                        if (!(b = (u.find.ID(g.matches[0].replace(ta, ua), b) || [])[0])) return c;
                        l && (b = b.parentNode), (a = a.slice(f.shift().value.length));
                    }
                    for (e = ma.needsContext.test(a) ? 0 : f.length; e-- && ((g = f[e]), !u.relative[(h = g.type)]); )
                        if ((j = u.find[h]) && (d = j(g.matches[0].replace(ta, ua), (ra.test(f[0].type) && i(b.parentNode)) || b))) {
                            if ((f.splice(e, 1), !(a = d.length && k(f)))) return Z.apply(c, d), c;
                            break;
                        }
                }
                return (l || y(a, m))(d, b, !G, c, (ra.test(a) && i(b.parentNode)) || b), c;
            }),
            (t.sortStable = L.split("").sort(S).join("") === L),
            (t.detectDuplicates = !!C),
            D(),
            (t.sortDetached = e(function (a) {
                return 1 & a.compareDocumentPosition(E.createElement("div"));
            })),
            e(function (a) {
                return (a.innerHTML = "<a href='#'></a>"), "#" === a.firstChild.getAttribute("href");
            }) ||
                f("type|href|height|width", function (a, b, c) {
                    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
                }),
            (t.attributes &&
                e(function (a) {
                    return (a.innerHTML = "<input/>"), a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
                })) ||
                f("value", function (a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
                }),
            e(function (a) {
                return null == a.getAttribute("disabled");
            }) ||
                f(aa, function (a, b, c) {
                    var d;
                    return c ? void 0 : !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
                }),
            b
        );
    })(a);
    (da.find = ia), (da.expr = ia.selectors), (da.expr[":"] = da.expr.pseudos), (da.unique = ia.uniqueSort), (da.text = ia.getText), (da.isXMLDoc = ia.isXML), (da.contains = ia.contains);
    var ja = da.expr.match.needsContext,
        ka = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        la = /^.[^:#\[\.,]*$/;
    (da.filter = function (a, b, c) {
        var d = b[0];
        return (
            c && (a = ":not(" + a + ")"),
            1 === b.length && 1 === d.nodeType
                ? da.find.matchesSelector(d, a)
                    ? [d]
                    : []
                : da.find.matches(
                      a,
                      da.grep(b, function (a) {
                          return 1 === a.nodeType;
                      })
                  )
        );
    }),
        da.fn.extend({
            find: function (a) {
                var b,
                    c = [],
                    d = this,
                    e = d.length;
                if ("string" != typeof a)
                    return this.pushStack(
                        da(a).filter(function () {
                            for (b = 0; e > b; b++) if (da.contains(d[b], this)) return !0;
                        })
                    );
                for (b = 0; e > b; b++) da.find(a, d[b], c);
                return (c = this.pushStack(e > 1 ? da.unique(c) : c)), (c.selector = this.selector ? this.selector + " " + a : a), c;
            },
            filter: function (a) {
                return this.pushStack(d(this, a || [], !1));
            },
            not: function (a) {
                return this.pushStack(d(this, a || [], !0));
            },
            is: function (a) {
                return !!d(this, "string" == typeof a && ja.test(a) ? da(a) : a || [], !1).length;
            },
        });
    var ma,
        na = a.document,
        oa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    ((da.fn.init = function (a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (!(c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : oa.exec(a)) || (!c[1] && b)) return !b || b.jquery ? (b || ma).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (((b = b instanceof da ? b[0] : b), da.merge(this, da.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : na, !0)), ka.test(c[1]) && da.isPlainObject(b)))
                    for (c in b) da.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this;
            }
            if ((d = na.getElementById(c[2])) && d.parentNode) {
                if (d.id !== c[2]) return ma.find(a);
                (this.length = 1), (this[0] = d);
            }
            return (this.context = na), (this.selector = a), this;
        }
        return a.nodeType
            ? ((this.context = this[0] = a), (this.length = 1), this)
            : da.isFunction(a)
            ? void 0 !== ma.ready
                ? ma.ready(a)
                : a(da)
            : (void 0 !== a.selector && ((this.selector = a.selector), (this.context = a.context)), da.makeArray(a, this));
    }).prototype = da.fn),
        (ma = da(na));
    var pa = /^(?:parents|prev(?:Until|All))/,
        qa = { children: !0, contents: !0, next: !0, prev: !0 };
    da.extend({
        dir: function (a, b, c) {
            for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !da(e).is(c)); ) 1 === e.nodeType && d.push(e), (e = e[b]);
            return d;
        },
        sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        },
    }),
        da.fn.extend({
            has: function (a) {
                var b,
                    c = da(a, this),
                    d = c.length;
                return this.filter(function () {
                    for (b = 0; d > b; b++) if (da.contains(this, c[b])) return !0;
                });
            },
            closest: function (a, b) {
                for (var c, d = 0, e = this.length, f = [], g = ja.test(a) || "string" != typeof a ? da(a, b || this.context) : 0; e > d; d++)
                    for (c = this[d]; c && c !== b; c = c.parentNode)
                        if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && da.find.matchesSelector(c, a))) {
                            f.push(c);
                            break;
                        }
                return this.pushStack(f.length > 1 ? da.unique(f) : f);
            },
            index: function (a) {
                return a ? ("string" == typeof a ? da.inArray(this[0], da(a)) : da.inArray(a.jquery ? a[0] : a, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (a, b) {
                return this.pushStack(da.unique(da.merge(this.get(), da(a, b))));
            },
            addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
            },
        }),
        da.each(
            {
                parent: function (a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null;
                },
                parents: function (a) {
                    return da.dir(a, "parentNode");
                },
                parentsUntil: function (a, b, c) {
                    return da.dir(a, "parentNode", c);
                },
                next: function (a) {
                    return e(a, "nextSibling");
                },
                prev: function (a) {
                    return e(a, "previousSibling");
                },
                nextAll: function (a) {
                    return da.dir(a, "nextSibling");
                },
                prevAll: function (a) {
                    return da.dir(a, "previousSibling");
                },
                nextUntil: function (a, b, c) {
                    return da.dir(a, "nextSibling", c);
                },
                prevUntil: function (a, b, c) {
                    return da.dir(a, "previousSibling", c);
                },
                siblings: function (a) {
                    return da.sibling((a.parentNode || {}).firstChild, a);
                },
                children: function (a) {
                    return da.sibling(a.firstChild);
                },
                contents: function (a) {
                    return da.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : da.merge([], a.childNodes);
                },
            },
            function (a, b) {
                da.fn[a] = function (c, d) {
                    var e = da.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = da.filter(d, e)), this.length > 1 && (qa[a] || (e = da.unique(e)), pa.test(a) && (e = e.reverse())), this.pushStack(e);
                };
            }
        );
    var ra = /\S+/g,
        sa = {};
    (da.Callbacks = function (a) {
        a = "string" == typeof a ? sa[a] || f(a) : da.extend({}, a);
        var b,
            c,
            d,
            e,
            g,
            h,
            i = [],
            j = !a.once && [],
            k = function (f) {
                for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)
                    if (!1 === i[g].apply(f[0], f[1]) && a.stopOnFalse) {
                        c = !1;
                        break;
                    }
                (b = !1), i && (j ? j.length && k(j.shift()) : c ? (i = []) : l.disable());
            },
            l = {
                add: function () {
                    if (i) {
                        var d = i.length;
                        !(function b(c) {
                            da.each(c, function (c, d) {
                                var e = da.type(d);
                                "function" === e ? (a.unique && l.has(d)) || i.push(d) : d && d.length && "string" !== e && b(d);
                            });
                        })(arguments),
                            b ? (e = i.length) : c && ((h = d), k(c));
                    }
                    return this;
                },
                remove: function () {
                    return (
                        i &&
                            da.each(arguments, function (a, c) {
                                for (var d; (d = da.inArray(c, i, d)) > -1; ) i.splice(d, 1), b && (e >= d && e--, g >= d && g--);
                            }),
                        this
                    );
                },
                has: function (a) {
                    return a ? da.inArray(a, i) > -1 : !(!i || !i.length);
                },
                empty: function () {
                    return (i = []), (e = 0), this;
                },
                disable: function () {
                    return (i = j = c = void 0), this;
                },
                disabled: function () {
                    return !i;
                },
                lock: function () {
                    return (j = void 0), c || l.disable(), this;
                },
                locked: function () {
                    return !j;
                },
                fireWith: function (a, c) {
                    return !i || (d && !j) || ((c = c || []), (c = [a, c.slice ? c.slice() : c]), b ? j.push(c) : k(c)), this;
                },
                fire: function () {
                    return l.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!d;
                },
            };
        return l;
    }),
        da.extend({
            Deferred: function (a) {
                var b = [
                        ["resolve", "done", da.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", da.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", da.Callbacks("memory")],
                    ],
                    c = "pending",
                    d = {
                        state: function () {
                            return c;
                        },
                        always: function () {
                            return e.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var a = arguments;
                            return da
                                .Deferred(function (c) {
                                    da.each(b, function (b, f) {
                                        var g = da.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a = g && g.apply(this, arguments);
                                            a && da.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
                                        });
                                    }),
                                        (a = null);
                                })
                                .promise();
                        },
                        promise: function (a) {
                            return null != a ? da.extend(a, d) : d;
                        },
                    },
                    e = {};
                return (
                    (d.pipe = d.then),
                    da.each(b, function (a, f) {
                        var g = f[2],
                            h = f[3];
                        (d[f[1]] = g.add),
                            h &&
                                g.add(
                                    function () {
                                        c = h;
                                    },
                                    b[1 ^ a][2].disable,
                                    b[2][2].lock
                                ),
                            (e[f[0]] = function () {
                                return e[f[0] + "With"](this === e ? d : this, arguments), this;
                            }),
                            (e[f[0] + "With"] = g.fireWith);
                    }),
                    d.promise(e),
                    a && a.call(e, e),
                    e
                );
            },
            when: function (a) {
                var b,
                    c,
                    d,
                    e = 0,
                    f = X.call(arguments),
                    g = f.length,
                    h = 1 !== g || (a && da.isFunction(a.promise)) ? g : 0,
                    i = 1 === h ? a : da.Deferred(),
                    j = function (a, c, d) {
                        return function (e) {
                            (c[a] = this), (d[a] = arguments.length > 1 ? X.call(arguments) : e), d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                        };
                    };
                if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && da.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                return h || i.resolveWith(d, f), i.promise();
            },
        });
    var ta;
    (da.fn.ready = function (a) {
        return da.ready.promise().done(a), this;
    }),
        da.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? da.readyWait++ : da.ready(!0);
            },
            ready: function (a) {
                if (!0 === a ? !--da.readyWait : !da.isReady) {
                    if (!na.body) return setTimeout(da.ready);
                    (da.isReady = !0), (!0 !== a && --da.readyWait > 0) || (ta.resolveWith(na, [da]), da.fn.triggerHandler && (da(na).triggerHandler("ready"), da(na).off("ready")));
                }
            },
        }),
        (da.ready.promise = function (b) {
            if (!ta)
                if (((ta = da.Deferred()), "complete" === na.readyState)) setTimeout(da.ready);
                else if (na.addEventListener) na.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);
                else {
                    na.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
                    var c = !1;
                    try {
                        c = null == a.frameElement && na.documentElement;
                    } catch (a) {}
                    c &&
                        c.doScroll &&
                        (function a() {
                            if (!da.isReady) {
                                try {
                                    c.doScroll("left");
                                } catch (b) {
                                    return setTimeout(a, 50);
                                }
                                g(), da.ready();
                            }
                        })();
                }
            return ta.promise(b);
        });
    var ua,
        va = "undefined";
    for (ua in da(ca)) break;
    (ca.ownLast = "0" !== ua),
        (ca.inlineBlockNeedsLayout = !1),
        da(function () {
            var a, b, c, d;
            (c = na.getElementsByTagName("body")[0]) &&
                c.style &&
                ((b = na.createElement("div")),
                (d = na.createElement("div")),
                (d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                c.appendChild(d).appendChild(b),
                typeof b.style.zoom !== va && ((b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (ca.inlineBlockNeedsLayout = a = 3 === b.offsetWidth), a && (c.style.zoom = 1)),
                c.removeChild(d));
        }),
        (function () {
            var a = na.createElement("div");
            if (null == ca.deleteExpando) {
                ca.deleteExpando = !0;
                try {
                    delete a.test;
                } catch (a) {
                    ca.deleteExpando = !1;
                }
            }
            a = null;
        })(),
        (da.acceptData = function (a) {
            var b = da.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return (1 === c || 9 === c) && (!b || (!0 !== b && a.getAttribute("classid") === b));
        });
    var wa = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        xa = /([A-Z])/g;
    da.extend({
        cache: {},
        noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
        hasData: function (a) {
            return !!(a = a.nodeType ? da.cache[a[da.expando]] : a[da.expando]) && !j(a);
        },
        data: function (a, b, c) {
            return k(a, b, c);
        },
        removeData: function (a, b) {
            return l(a, b);
        },
        _data: function (a, b, c) {
            return k(a, b, c, !0);
        },
        _removeData: function (a, b) {
            return l(a, b, !0);
        },
    }),
        da.fn.extend({
            data: function (a, b) {
                var c,
                    d,
                    e,
                    f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && ((e = da.data(f)), 1 === f.nodeType && !da._data(f, "parsedAttrs"))) {
                        for (c = g.length; c--; ) g[c] && ((d = g[c].name), 0 === d.indexOf("data-") && ((d = da.camelCase(d.slice(5))), i(f, d, e[d])));
                        da._data(f, "parsedAttrs", !0);
                    }
                    return e;
                }
                return "object" == typeof a
                    ? this.each(function () {
                          da.data(this, a);
                      })
                    : arguments.length > 1
                    ? this.each(function () {
                          da.data(this, a, b);
                      })
                    : f
                    ? i(f, a, da.data(f, a))
                    : void 0;
            },
            removeData: function (a) {
                return this.each(function () {
                    da.removeData(this, a);
                });
            },
        }),
        da.extend({
            queue: function (a, b, c) {
                var d;
                return a ? ((b = (b || "fx") + "queue"), (d = da._data(a, b)), c && (!d || da.isArray(c) ? (d = da._data(a, b, da.makeArray(c))) : d.push(c)), d || []) : void 0;
            },
            dequeue: function (a, b) {
                b = b || "fx";
                var c = da.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = da._queueHooks(a, b),
                    g = function () {
                        da.dequeue(a, b);
                    };
                "inprogress" === e && ((e = c.shift()), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
            },
            _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return (
                    da._data(a, c) ||
                    da._data(a, c, {
                        empty: da.Callbacks("once memory").add(function () {
                            da._removeData(a, b + "queue"), da._removeData(a, c);
                        }),
                    })
                );
            },
        }),
        da.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return (
                    "string" != typeof a && ((b = a), (a = "fx"), c--),
                    arguments.length < c
                        ? da.queue(this[0], a)
                        : void 0 === b
                        ? this
                        : this.each(function () {
                              var c = da.queue(this, a, b);
                              da._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && da.dequeue(this, a);
                          })
                );
            },
            dequeue: function (a) {
                return this.each(function () {
                    da.dequeue(this, a);
                });
            },
            clearQueue: function (a) {
                return this.queue(a || "fx", []);
            },
            promise: function (a, b) {
                var c,
                    d = 1,
                    e = da.Deferred(),
                    f = this,
                    g = this.length,
                    h = function () {
                        --d || e.resolveWith(f, [f]);
                    };
                for ("string" != typeof a && ((b = a), (a = void 0)), a = a || "fx"; g--; ) (c = da._data(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b);
            },
        });
    var ya = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        za = ["Top", "Right", "Bottom", "Left"],
        Aa = function (a, b) {
            return (a = b || a), "none" === da.css(a, "display") || !da.contains(a.ownerDocument, a);
        },
        Ba = (da.access = function (a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === da.type(c)) {
                e = !0;
                for (h in c) da.access(a, b, h, c[h], !0, f, g);
            } else if (
                void 0 !== d &&
                ((e = !0),
                da.isFunction(d) || (g = !0),
                j &&
                    (g
                        ? (b.call(a, d), (b = null))
                        : ((j = b),
                          (b = function (a, b, c) {
                              return j.call(da(a), c);
                          }))),
                b)
            )
                for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
        }),
        Ca = /^(?:checkbox|radio)$/i;
    !(function () {
        var a = na.createElement("input"),
            b = na.createElement("div"),
            c = na.createDocumentFragment();
        if (
            ((b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (ca.leadingWhitespace = 3 === b.firstChild.nodeType),
            (ca.tbody = !b.getElementsByTagName("tbody").length),
            (ca.htmlSerialize = !!b.getElementsByTagName("link").length),
            (ca.html5Clone = "<:nav></:nav>" !== na.createElement("nav").cloneNode(!0).outerHTML),
            (a.type = "checkbox"),
            (a.checked = !0),
            c.appendChild(a),
            (ca.appendChecked = a.checked),
            (b.innerHTML = "<textarea>x</textarea>"),
            (ca.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue),
            c.appendChild(b),
            (b.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
            (ca.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (ca.noCloneEvent = !0),
            b.attachEvent &&
                (b.attachEvent("onclick", function () {
                    ca.noCloneEvent = !1;
                }),
                b.cloneNode(!0).click()),
            null == ca.deleteExpando)
        ) {
            ca.deleteExpando = !0;
            try {
                delete b.test;
            } catch (a) {
                ca.deleteExpando = !1;
            }
        }
    })(),
        (function () {
            var b,
                c,
                d = na.createElement("div");
            for (b in { submit: !0, change: !0, focusin: !0 }) (c = "on" + b), (ca[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), (ca[b + "Bubbles"] = !1 === d.attributes[c].expando));
            d = null;
        })();
    var Da = /^(?:input|select|textarea)$/i,
        Ea = /^key/,
        Fa = /^(?:mouse|pointer|contextmenu)|click/,
        Ga = /^(?:focusinfocus|focusoutblur)$/,
        Ha = /^([^.]*)(?:\.(.+)|)$/;
    (da.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q = da._data(a);
            if (q) {
                for (
                    c.handler && ((i = c), (c = i.handler), (e = i.selector)),
                        c.guid || (c.guid = da.guid++),
                        (g = q.events) || (g = q.events = {}),
                        (k = q.handle) ||
                            ((k = q.handle = function (a) {
                                return typeof da === va || (a && da.event.triggered === a.type) ? void 0 : da.event.dispatch.apply(k.elem, arguments);
                            }),
                            (k.elem = a)),
                        b = (b || "").match(ra) || [""],
                        h = b.length;
                    h--;

                )
                    (f = Ha.exec(b[h]) || []),
                        (n = p = f[1]),
                        (o = (f[2] || "").split(".").sort()),
                        n &&
                            ((j = da.event.special[n] || {}),
                            (n = (e ? j.delegateType : j.bindType) || n),
                            (j = da.event.special[n] || {}),
                            (l = da.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && da.expr.match.needsContext.test(e), namespace: o.join(".") }, i)),
                            (m = g[n]) || ((m = g[n] = []), (m.delegateCount = 0), (j.setup && !1 !== j.setup.call(a, d, o, k)) || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))),
                            j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)),
                            e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                            (da.event.global[n] = !0));
                a = null;
            }
        },
        remove: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q = da.hasData(a) && da._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(ra) || [""], j = b.length; j--; )
                    if (((h = Ha.exec(b[j]) || []), (n = p = h[1]), (o = (h[2] || "").split(".").sort()), n)) {
                        for (l = da.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--; )
                            (g = m[f]),
                                (!e && p !== g.origType) ||
                                    (c && c.guid !== g.guid) ||
                                    (h && !h.test(g.namespace)) ||
                                    (d && d !== g.selector && ("**" !== d || !g.selector)) ||
                                    (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && ((l.teardown && !1 !== l.teardown.call(a, o, q.handle)) || da.removeEvent(a, n, q.handle), delete k[n]);
                    } else for (n in k) da.event.remove(a, n + b[j], c, d, !0);
                da.isEmptyObject(k) && (delete q.handle, da._removeData(a, "events"));
            }
        },
        trigger: function (b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m = [d || na],
                n = ba.call(b, "type") ? b.type : b,
                o = ba.call(b, "namespace") ? b.namespace.split(".") : [];
            if (
                ((h = k = d = d || na),
                3 !== d.nodeType &&
                    8 !== d.nodeType &&
                    !Ga.test(n + da.event.triggered) &&
                    (n.indexOf(".") >= 0 && ((o = n.split(".")), (n = o.shift()), o.sort()),
                    (g = n.indexOf(":") < 0 && "on" + n),
                    (b = b[da.expando] ? b : new da.Event(n, "object" == typeof b && b)),
                    (b.isTrigger = e ? 2 : 3),
                    (b.namespace = o.join(".")),
                    (b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                    (b.result = void 0),
                    b.target || (b.target = d),
                    (c = null == c ? [b] : da.makeArray(c, [b])),
                    (j = da.event.special[n] || {}),
                    e || !j.trigger || !1 !== j.trigger.apply(d, c)))
            ) {
                if (!e && !j.noBubble && !da.isWindow(d)) {
                    for (i = j.delegateType || n, Ga.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), (k = h);
                    k === (d.ownerDocument || na) && m.push(k.defaultView || k.parentWindow || a);
                }
                for (l = 0; (h = m[l++]) && !b.isPropagationStopped(); )
                    (b.type = l > 1 ? i : j.bindType || n),
                        (f = (da._data(h, "events") || {})[b.type] && da._data(h, "handle")),
                        f && f.apply(h, c),
                        (f = g && h[g]) && f.apply && da.acceptData(h) && ((b.result = f.apply(h, c)), !1 === b.result && b.preventDefault());
                if (((b.type = n), !e && !b.isDefaultPrevented() && (!j._default || !1 === j._default.apply(m.pop(), c)) && da.acceptData(d) && g && d[n] && !da.isWindow(d))) {
                    (k = d[g]), k && (d[g] = null), (da.event.triggered = n);
                    try {
                        d[n]();
                    } catch (a) {}
                    (da.event.triggered = void 0), k && (d[g] = k);
                }
                return b.result;
            }
        },
        dispatch: function (a) {
            a = da.event.fix(a);
            var b,
                c,
                d,
                e,
                f,
                g = [],
                h = X.call(arguments),
                i = (da._data(this, "events") || {})[a.type] || [],
                j = da.event.special[a.type] || {};
            if (((h[0] = a), (a.delegateTarget = this), !j.preDispatch || !1 !== j.preDispatch.call(this, a))) {
                for (g = da.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = e.elem, f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped(); )
                        (!a.namespace_re || a.namespace_re.test(d.namespace)) &&
                            ((a.handleObj = d), (a.data = d.data), void 0 !== (c = ((da.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h)) && !1 === (a.result = c) && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (a, b) {
            var c,
                d,
                e,
                f,
                g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (!0 !== i.disabled || "click" !== a.type)) {
                        for (e = [], f = 0; h > f; f++) (d = b[f]), (c = d.selector + " "), void 0 === e[c] && (e[c] = d.needsContext ? da(c, this).index(i) >= 0 : da.find(c, this, null, [i]).length), e[c] && e.push(d);
                        e.length && g.push({ elem: i, handlers: e });
                    }
            return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
        },
        fix: function (a) {
            if (a[da.expando]) return a;
            var b,
                c,
                d,
                e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Fa.test(e) ? this.mouseHooks : Ea.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new da.Event(f), b = d.length; b--; ) (c = d[b]), (a[c] = f[c]);
            return a.target || (a.target = f.srcElement || na), 3 === a.target.nodeType && (a.target = a.target.parentNode), (a.metaKey = !!a.metaKey), g.filter ? g.filter(a, f) : a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c,
                    d,
                    e,
                    f = b.button,
                    g = b.fromElement;
                return (
                    null == a.pageX &&
                        null != b.clientX &&
                        ((d = a.target.ownerDocument || na),
                        (e = d.documentElement),
                        (c = d.body),
                        (a.pageX = b.clientX + ((e && e.scrollLeft) || (c && c.scrollLeft) || 0) - ((e && e.clientLeft) || (c && c.clientLeft) || 0)),
                        (a.pageY = b.clientY + ((e && e.scrollTop) || (c && c.scrollTop) || 0) - ((e && e.clientTop) || (c && c.clientTop) || 0))),
                    !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                    a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                    a
                );
            },
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    if (this !== o() && this.focus)
                        try {
                            return this.focus(), !1;
                        } catch (a) {}
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    return this === o() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function () {
                    return da.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
                },
                _default: function (a) {
                    return da.nodeName(a.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                },
            },
        },
        simulate: function (a, b, c, d) {
            var e = da.extend(new da.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });
            d ? da.event.trigger(e, null, b) : da.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        },
    }),
        (da.removeEvent = na.removeEventListener
            ? function (a, b, c) {
                  a.removeEventListener && a.removeEventListener(b, c, !1);
              }
            : function (a, b, c) {
                  var d = "on" + b;
                  a.detachEvent && (typeof a[d] === va && (a[d] = null), a.detachEvent(d, c));
              }),
        (da.Event = function (a, b) {
            return this instanceof da.Event
                ? (a && a.type ? ((this.originalEvent = a), (this.type = a.type), (this.isDefaultPrevented = a.defaultPrevented || (void 0 === a.defaultPrevented && !1 === a.returnValue) ? m : n)) : (this.type = a),
                  b && da.extend(this, b),
                  (this.timeStamp = (a && a.timeStamp) || da.now()),
                  void (this[da.expando] = !0))
                : new da.Event(a, b);
        }),
        (da.Event.prototype = {
            isDefaultPrevented: n,
            isPropagationStopped: n,
            isImmediatePropagationStopped: n,
            preventDefault: function () {
                var a = this.originalEvent;
                (this.isDefaultPrevented = m), a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                (this.isPropagationStopped = m), a && (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                (this.isImmediatePropagationStopped = m), a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
            },
        }),
        da.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
            da.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function (a) {
                    var c,
                        d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return (!e || (e !== d && !da.contains(d, e))) && ((a.type = f.origType), (c = f.handler.apply(this, arguments)), (a.type = b)), c;
                },
            };
        }),
        ca.submitBubbles ||
            (da.event.special.submit = {
                setup: function () {
                    return (
                        !da.nodeName(this, "form") &&
                        void da.event.add(this, "click._submit keypress._submit", function (a) {
                            var b = a.target,
                                c = da.nodeName(b, "input") || da.nodeName(b, "button") ? b.form : void 0;
                            c &&
                                !da._data(c, "submitBubbles") &&
                                (da.event.add(c, "submit._submit", function (a) {
                                    a._submit_bubble = !0;
                                }),
                                da._data(c, "submitBubbles", !0));
                        })
                    );
                },
                postDispatch: function (a) {
                    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && da.event.simulate("submit", this.parentNode, a, !0));
                },
                teardown: function () {
                    return !da.nodeName(this, "form") && void da.event.remove(this, "._submit");
                },
            }),
        ca.changeBubbles ||
            (da.event.special.change = {
                setup: function () {
                    return Da.test(this.nodeName)
                        ? (("checkbox" === this.type || "radio" === this.type) &&
                              (da.event.add(this, "propertychange._change", function (a) {
                                  "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
                              }),
                              da.event.add(this, "click._change", function (a) {
                                  this._just_changed && !a.isTrigger && (this._just_changed = !1), da.event.simulate("change", this, a, !0);
                              })),
                          !1)
                        : void da.event.add(this, "beforeactivate._change", function (a) {
                              var b = a.target;
                              Da.test(b.nodeName) &&
                                  !da._data(b, "changeBubbles") &&
                                  (da.event.add(b, "change._change", function (a) {
                                      !this.parentNode || a.isSimulated || a.isTrigger || da.event.simulate("change", this.parentNode, a, !0);
                                  }),
                                  da._data(b, "changeBubbles", !0));
                          });
                },
                handle: function (a) {
                    var b = a.target;
                    return this !== b || a.isSimulated || a.isTrigger || ("radio" !== b.type && "checkbox" !== b.type) ? a.handleObj.handler.apply(this, arguments) : void 0;
                },
                teardown: function () {
                    return da.event.remove(this, "._change"), !Da.test(this.nodeName);
                },
            }),
        ca.focusinBubbles ||
            da.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
                var c = function (a) {
                    da.event.simulate(b, a.target, da.event.fix(a), !0);
                };
                da.event.special[b] = {
                    setup: function () {
                        var d = this.ownerDocument || this,
                            e = da._data(d, b);
                        e || d.addEventListener(a, c, !0), da._data(d, b, (e || 0) + 1);
                    },
                    teardown: function () {
                        var d = this.ownerDocument || this,
                            e = da._data(d, b) - 1;
                        e ? da._data(d, b, e) : (d.removeEventListener(a, c, !0), da._removeData(d, b));
                    },
                };
            }),
        da.fn.extend({
            on: function (a, b, c, d, e) {
                var f, g;
                if ("object" == typeof a) {
                    "string" != typeof b && ((c = c || b), (b = void 0));
                    for (f in a) this.on(f, b, c, a[f], e);
                    return this;
                }
                if ((null == c && null == d ? ((d = b), (c = b = void 0)) : null == d && ("string" == typeof b ? ((d = c), (c = void 0)) : ((d = c), (c = b), (b = void 0))), !1 === d)) d = n;
                else if (!d) return this;
                return (
                    1 === e &&
                        ((g = d),
                        (d = function (a) {
                            return da().off(a), g.apply(this, arguments);
                        }),
                        (d.guid = g.guid || (g.guid = da.guid++))),
                    this.each(function () {
                        da.event.add(this, a, d, c, b);
                    })
                );
            },
            one: function (a, b, c, d) {
                return this.on(a, b, c, d, 1);
            },
            off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return (d = a.handleObj), da(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this;
                }
                return (
                    (!1 === b || "function" == typeof b) && ((c = b), (b = void 0)),
                    !1 === c && (c = n),
                    this.each(function () {
                        da.event.remove(this, a, c, b);
                    })
                );
            },
            trigger: function (a, b) {
                return this.each(function () {
                    da.event.trigger(a, b, this);
                });
            },
            triggerHandler: function (a, b) {
                var c = this[0];
                return c ? da.event.trigger(a, b, c, !0) : void 0;
            },
        });
    var Ia = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ja = / jQuery\d+="(?:null|\d+)"/g,
        Ka = new RegExp("<(?:" + Ia + ")[\\s/>]", "i"),
        La = /^\s+/,
        Ma = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Na = /<([\w:]+)/,
        Oa = /<tbody/i,
        Pa = /<|&#?\w+;/,
        Qa = /<(?:script|style|link)/i,
        Ra = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Sa = /^$|\/(?:java|ecma)script/i,
        Ta = /^true\/(.*)/,
        Ua = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Va = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ca.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
        },
        Wa = p(na),
        Xa = Wa.appendChild(na.createElement("div"));
    (Va.optgroup = Va.option),
        (Va.tbody = Va.tfoot = Va.colgroup = Va.caption = Va.thead),
        (Va.th = Va.td),
        da.extend({
            clone: function (a, b, c) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i = da.contains(a.ownerDocument, a);
                if (
                    (ca.html5Clone || da.isXMLDoc(a) || !Ka.test("<" + a.nodeName + ">") ? (f = a.cloneNode(!0)) : ((Xa.innerHTML = a.outerHTML), Xa.removeChild((f = Xa.firstChild))),
                    !((ca.noCloneEvent && ca.noCloneChecked) || (1 !== a.nodeType && 11 !== a.nodeType) || da.isXMLDoc(a)))
                )
                    for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
                if (b)
                    if (c) for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
                    else w(a, f);
                return (d = q(f, "script")), d.length > 0 && v(d, !i && q(a, "script")), (d = h = e = null), f;
            },
            buildFragment: function (a, b, c, d) {
                for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)
                    if ((f = a[o]) || 0 === f)
                        if ("object" === da.type(f)) da.merge(n, f.nodeType ? [f] : f);
                        else if (Pa.test(f)) {
                            for (h = h || m.appendChild(b.createElement("div")), i = (Na.exec(f) || ["", ""])[1].toLowerCase(), k = Va[i] || Va._default, h.innerHTML = k[1] + f.replace(Ma, "<$1></$2>") + k[2], e = k[0]; e--; )
                                h = h.lastChild;
                            if ((!ca.leadingWhitespace && La.test(f) && n.push(b.createTextNode(La.exec(f)[0])), !ca.tbody))
                                for (f = "table" !== i || Oa.test(f) ? ("<table>" !== k[1] || Oa.test(f) ? 0 : h) : h.firstChild, e = f && f.childNodes.length; e--; )
                                    da.nodeName((j = f.childNodes[e]), "tbody") && !j.childNodes.length && f.removeChild(j);
                            for (da.merge(n, h.childNodes), h.textContent = ""; h.firstChild; ) h.removeChild(h.firstChild);
                            h = m.lastChild;
                        } else n.push(b.createTextNode(f));
                for (h && m.removeChild(h), ca.appendChecked || da.grep(q(n, "input"), r), o = 0; (f = n[o++]); )
                    if ((!d || -1 === da.inArray(f, d)) && ((g = da.contains(f.ownerDocument, f)), (h = q(m.appendChild(f), "script")), g && v(h), c)) for (e = 0; (f = h[e++]); ) Sa.test(f.type || "") && c.push(f);
                return (h = null), m;
            },
            cleanData: function (a, b) {
                for (var c, d, e, f, g = 0, h = da.expando, i = da.cache, j = ca.deleteExpando, k = da.event.special; null != (c = a[g]); g++)
                    if ((b || da.acceptData(c)) && ((e = c[h]), (f = e && i[e]))) {
                        if (f.events) for (d in f.events) k[d] ? da.event.remove(c, d) : da.removeEvent(c, d, f.handle);
                        i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== va ? c.removeAttribute(h) : (c[h] = null), W.push(e));
                    }
            },
        }),
        da.fn.extend({
            text: function (a) {
                return Ba(
                    this,
                    function (a) {
                        return void 0 === a ? da.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || na).createTextNode(a));
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            append: function () {
                return this.domManip(arguments, function (a) {
                    (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || s(this, a).appendChild(a);
                });
            },
            prepend: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = s(this, a);
                        b.insertBefore(a, b.firstChild);
                    }
                });
            },
            before: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this);
                });
            },
            after: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
                });
            },
            remove: function (a, b) {
                for (var c, d = a ? da.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
                    b || 1 !== c.nodeType || da.cleanData(q(c)), c.parentNode && (b && da.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
                return this;
            },
            empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    for (1 === a.nodeType && da.cleanData(q(a, !1)); a.firstChild; ) a.removeChild(a.firstChild);
                    a.options && da.nodeName(a, "select") && (a.options.length = 0);
                }
                return this;
            },
            clone: function (a, b) {
                return (
                    (a = null != a && a),
                    (b = null == b ? a : b),
                    this.map(function () {
                        return da.clone(this, a, b);
                    })
                );
            },
            html: function (a) {
                return Ba(
                    this,
                    function (a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(Ja, "") : void 0;
                        if (!("string" != typeof a || Qa.test(a) || (!ca.htmlSerialize && Ka.test(a)) || (!ca.leadingWhitespace && La.test(a)) || Va[(Na.exec(a) || ["", ""])[1].toLowerCase()])) {
                            a = a.replace(Ma, "<$1></$2>");
                            try {
                                for (; d > c; c++) (b = this[c] || {}), 1 === b.nodeType && (da.cleanData(q(b, !1)), (b.innerHTML = a));
                                b = 0;
                            } catch (a) {}
                        }
                        b && this.empty().append(a);
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            replaceWith: function () {
                var a = arguments[0];
                return (
                    this.domManip(arguments, function (b) {
                        (a = this.parentNode), da.cleanData(q(this)), a && a.replaceChild(b, this);
                    }),
                    a && (a.length || a.nodeType) ? this : this.remove()
                );
            },
            detach: function (a) {
                return this.remove(a, !0);
            },
            domManip: function (a, b) {
                a = Y.apply([], a);
                var c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i = 0,
                    j = this.length,
                    k = this,
                    l = j - 1,
                    m = a[0],
                    n = da.isFunction(m);
                if (n || (j > 1 && "string" == typeof m && !ca.checkClone && Ra.test(m)))
                    return this.each(function (c) {
                        var d = k.eq(c);
                        n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b);
                    });
                if (j && ((h = da.buildFragment(a, this[0].ownerDocument, !1, this)), (c = h.firstChild), 1 === h.childNodes.length && (h = c), c)) {
                    for (f = da.map(q(h, "script"), t), e = f.length; j > i; i++) (d = h), i !== l && ((d = da.clone(d, !0, !0)), e && da.merge(f, q(d, "script"))), b.call(this[i], d, i);
                    if (e)
                        for (g = f[f.length - 1].ownerDocument, da.map(f, u), i = 0; e > i; i++)
                            (d = f[i]), Sa.test(d.type || "") && !da._data(d, "globalEval") && da.contains(g, d) && (d.src ? da._evalUrl && da._evalUrl(d.src) : da.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Ua, "")));
                    h = c = null;
                }
                return this;
            },
        }),
        da.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
            da.fn[a] = function (a) {
                for (var c, d = 0, e = [], f = da(a), g = f.length - 1; g >= d; d++) (c = d === g ? this : this.clone(!0)), da(f[d])[b](c), Z.apply(e, c.get());
                return this.pushStack(e);
            };
        });
    var Ya,
        Za = {};
    !(function () {
        var a;
        ca.shrinkWrapBlocks = function () {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return (
                (c = na.getElementsByTagName("body")[0]),
                c && c.style
                    ? ((b = na.createElement("div")),
                      (d = na.createElement("div")),
                      (d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                      c.appendChild(d).appendChild(b),
                      typeof b.style.zoom !== va &&
                          ((b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                          (b.appendChild(na.createElement("div")).style.width = "5px"),
                          (a = 3 !== b.offsetWidth)),
                      c.removeChild(d),
                      a)
                    : void 0
            );
        };
    })();
    var $a,
        _a,
        ab = /^margin/,
        bb = new RegExp("^(" + ya + ")(?!px)[a-z%]+$", "i"),
        cb = /^(top|right|bottom|left)$/;
    a.getComputedStyle
        ? (($a = function (a) {
              return a.ownerDocument.defaultView.getComputedStyle(a, null);
          }),
          (_a = function (a, b, c) {
              var d,
                  e,
                  f,
                  g,
                  h = a.style;
              return (
                  (c = c || $a(a)),
                  (g = c ? c.getPropertyValue(b) || c[b] : void 0),
                  c &&
                      ("" !== g || da.contains(a.ownerDocument, a) || (g = da.style(a, b)),
                      bb.test(g) && ab.test(b) && ((d = h.width), (e = h.minWidth), (f = h.maxWidth), (h.minWidth = h.maxWidth = h.width = g), (g = c.width), (h.width = d), (h.minWidth = e), (h.maxWidth = f))),
                  void 0 === g ? g : g + ""
              );
          }))
        : na.documentElement.currentStyle &&
          (($a = function (a) {
              return a.currentStyle;
          }),
          (_a = function (a, b, c) {
              var d,
                  e,
                  f,
                  g,
                  h = a.style;
              return (
                  (c = c || $a(a)),
                  (g = c ? c[b] : void 0),
                  null == g && h && h[b] && (g = h[b]),
                  bb.test(g) && !cb.test(b) && ((d = h.left), (e = a.runtimeStyle), (f = e && e.left), f && (e.left = a.currentStyle.left), (h.left = "fontSize" === b ? "1em" : g), (g = h.pixelLeft + "px"), (h.left = d), f && (e.left = f)),
                  void 0 === g ? g : g + "" || "auto"
              );
          })),
        (function () {
            function b() {
                var b, c, d, e;
                (c = na.getElementsByTagName("body")[0]) &&
                    c.style &&
                    ((b = na.createElement("div")),
                    (d = na.createElement("div")),
                    (d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    c.appendChild(d).appendChild(b),
                    (b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                    (f = g = !1),
                    (i = !0),
                    a.getComputedStyle &&
                        ((f = "1%" !== (a.getComputedStyle(b, null) || {}).top),
                        (g = "4px" === (a.getComputedStyle(b, null) || { width: "4px" }).width),
                        (e = b.appendChild(na.createElement("div"))),
                        (e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                        (e.style.marginRight = e.style.width = "0"),
                        (b.style.width = "1px"),
                        (i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight))),
                    (b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                    (e = b.getElementsByTagName("td")),
                    (e[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                    (h = 0 === e[0].offsetHeight),
                    h && ((e[0].style.display = ""), (e[1].style.display = "none"), (h = 0 === e[0].offsetHeight)),
                    c.removeChild(d));
            }
            var c, d, e, f, g, h, i;
            (c = na.createElement("div")),
                (c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (e = c.getElementsByTagName("a")[0]),
                (d = e && e.style) &&
                    ((d.cssText = "float:left;opacity:.5"),
                    (ca.opacity = "0.5" === d.opacity),
                    (ca.cssFloat = !!d.cssFloat),
                    (c.style.backgroundClip = "content-box"),
                    (c.cloneNode(!0).style.backgroundClip = ""),
                    (ca.clearCloneStyle = "content-box" === c.style.backgroundClip),
                    (ca.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing),
                    da.extend(ca, {
                        reliableHiddenOffsets: function () {
                            return null == h && b(), h;
                        },
                        boxSizingReliable: function () {
                            return null == g && b(), g;
                        },
                        pixelPosition: function () {
                            return null == f && b(), f;
                        },
                        reliableMarginRight: function () {
                            return null == i && b(), i;
                        },
                    }));
        })(),
        (da.swap = function (a, b, c, d) {
            var e,
                f,
                g = {};
            for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e;
        });
    var db = /alpha\([^)]*\)/i,
        eb = /opacity\s*=\s*([^)]*)/,
        fb = /^(none|table(?!-c[ea]).+)/,
        gb = new RegExp("^(" + ya + ")(.*)$", "i"),
        hb = new RegExp("^([+-])=(" + ya + ")", "i"),
        ib = { position: "absolute", visibility: "hidden", display: "block" },
        jb = { letterSpacing: "0", fontWeight: "400" },
        kb = ["Webkit", "O", "Moz", "ms"];
    da.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = _a(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                },
            },
        },
        cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
        cssProps: { float: ca.cssFloat ? "cssFloat" : "styleFloat" },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e,
                    f,
                    g,
                    h = da.camelCase(b),
                    i = a.style;
                if (((b = da.cssProps[h] || (da.cssProps[h] = B(i, h))), (g = da.cssHooks[b] || da.cssHooks[h]), void 0 === c)) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (
                    ((f = typeof c),
                    "string" === f && (e = hb.exec(c)) && ((c = (e[1] + 1) * e[2] + parseFloat(da.css(a, b))), (f = "number")),
                    null != c && c === c && ("number" !== f || da.cssNumber[h] || (c += "px"), ca.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
                )
                    try {
                        i[b] = c;
                    } catch (a) {}
            }
        },
        css: function (a, b, c, d) {
            var e,
                f,
                g,
                h = da.camelCase(b);
            return (
                (b = da.cssProps[h] || (da.cssProps[h] = B(a.style, h))),
                (g = da.cssHooks[b] || da.cssHooks[h]),
                g && "get" in g && (f = g.get(a, !0, c)),
                void 0 === f && (f = _a(a, b, d)),
                "normal" === f && b in jb && (f = jb[b]),
                "" === c || c ? ((e = parseFloat(f)), !0 === c || da.isNumeric(e) ? e || 0 : f) : f
            );
        },
    }),
        da.each(["height", "width"], function (a, b) {
            da.cssHooks[b] = {
                get: function (a, c, d) {
                    return c
                        ? fb.test(da.css(a, "display")) && 0 === a.offsetWidth
                            ? da.swap(a, ib, function () {
                                  return F(a, b, d);
                              })
                            : F(a, b, d)
                        : void 0;
                },
                set: function (a, c, d) {
                    var e = d && $a(a);
                    return D(a, c, d ? E(a, b, d, ca.boxSizing && "border-box" === da.css(a, "boxSizing", !1, e), e) : 0);
                },
            };
        }),
        ca.opacity ||
            (da.cssHooks.opacity = {
                get: function (a, b) {
                    return eb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
                },
                set: function (a, b) {
                    var c = a.style,
                        d = a.currentStyle,
                        e = da.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                        f = (d && d.filter) || c.filter || "";
                    (c.zoom = 1), ((b >= 1 || "" === b) && "" === da.trim(f.replace(db, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || (d && !d.filter))) || (c.filter = db.test(f) ? f.replace(db, e) : f + " " + e);
                },
            }),
        (da.cssHooks.marginRight = A(ca.reliableMarginRight, function (a, b) {
            return b ? da.swap(a, { display: "inline-block" }, _a, [a, "marginRight"]) : void 0;
        })),
        da.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
            (da.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + za[d] + b] = f[d] || f[d - 2] || f[0];
                    return e;
                },
            }),
                ab.test(a) || (da.cssHooks[a + b].set = D);
        }),
        da.fn.extend({
            css: function (a, b) {
                return Ba(
                    this,
                    function (a, b, c) {
                        var d,
                            e,
                            f = {},
                            g = 0;
                        if (da.isArray(b)) {
                            for (d = $a(a), e = b.length; e > g; g++) f[b[g]] = da.css(a, b[g], !1, d);
                            return f;
                        }
                        return void 0 !== c ? da.style(a, b, c) : da.css(a, b);
                    },
                    a,
                    b,
                    arguments.length > 1
                );
            },
            show: function () {
                return C(this, !0);
            },
            hide: function () {
                return C(this);
            },
            toggle: function (a) {
                return "boolean" == typeof a
                    ? a
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          Aa(this) ? da(this).show() : da(this).hide();
                      });
            },
        }),
        (da.Tween = G),
        (G.prototype = {
            constructor: G,
            init: function (a, b, c, d, e, f) {
                (this.elem = a), (this.prop = c), (this.easing = e || "swing"), (this.options = b), (this.start = this.now = this.cur()), (this.end = d), (this.unit = f || (da.cssNumber[c] ? "" : "px"));
            },
            cur: function () {
                var a = G.propHooks[this.prop];
                return a && a.get ? a.get(this) : G.propHooks._default.get(this);
            },
            run: function (a) {
                var b,
                    c = G.propHooks[this.prop];
                return (
                    (this.pos = b = this.options.duration ? da.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a),
                    (this.now = (this.end - this.start) * b + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    c && c.set ? c.set(this) : G.propHooks._default.set(this),
                    this
                );
            },
        }),
        (G.prototype.init.prototype = G.prototype),
        (G.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return null == a.elem[a.prop] || (a.elem.style && null != a.elem.style[a.prop]) ? ((b = da.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0) : a.elem[a.prop];
                },
                set: function (a) {
                    da.fx.step[a.prop] ? da.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[da.cssProps[a.prop]] || da.cssHooks[a.prop]) ? da.style(a.elem, a.prop, a.now + a.unit) : (a.elem[a.prop] = a.now);
                },
            },
        }),
        (G.propHooks.scrollTop = G.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
            },
        }),
        (da.easing = {
            linear: function (a) {
                return a;
            },
            swing: function (a) {
                return 0.5 - Math.cos(a * Math.PI) / 2;
            },
        }),
        (da.fx = G.prototype.init),
        (da.fx.step = {});
    var lb,
        mb,
        nb = /^(?:toggle|show|hide)$/,
        ob = new RegExp("^(?:([+-])=|)(" + ya + ")([a-z%]*)$", "i"),
        pb = /queueHooks$/,
        qb = [K],
        rb = {
            "*": [
                function (a, b) {
                    var c = this.createTween(a, b),
                        d = c.cur(),
                        e = ob.exec(b),
                        f = (e && e[3]) || (da.cssNumber[a] ? "" : "px"),
                        g = (da.cssNumber[a] || ("px" !== f && +d)) && ob.exec(da.css(c.elem, a)),
                        h = 1,
                        i = 20;
                    if (g && g[3] !== f) {
                        (f = f || g[3]), (e = e || []), (g = +d || 1);
                        do {
                            (h = h || ".5"), (g /= h), da.style(c.elem, a, g + f);
                        } while (h !== (h = c.cur() / d) && 1 !== h && --i);
                    }
                    return e && ((g = c.start = +g || +d || 0), (c.unit = f), (c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2])), c;
                },
            ],
        };
    (da.Animation = da.extend(M, {
        tweener: function (a, b) {
            da.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.split(" "));
            for (var c, d = 0, e = a.length; e > d; d++) (c = a[d]), (rb[c] = rb[c] || []), rb[c].unshift(b);
        },
        prefilter: function (a, b) {
            b ? qb.unshift(a) : qb.push(a);
        },
    })),
        (da.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? da.extend({}, a) : { complete: c || (!c && b) || (da.isFunction(a) && a), duration: a, easing: (c && b) || (b && !da.isFunction(b) && b) };
            return (
                (d.duration = da.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in da.fx.speeds ? da.fx.speeds[d.duration] : da.fx.speeds._default),
                (null == d.queue || !0 === d.queue) && (d.queue = "fx"),
                (d.old = d.complete),
                (d.complete = function () {
                    da.isFunction(d.old) && d.old.call(this), d.queue && da.dequeue(this, d.queue);
                }),
                d
            );
        }),
        da.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(Aa).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
            },
            animate: function (a, b, c, d) {
                var e = da.isEmptyObject(a),
                    f = da.speed(b, c, d),
                    g = function () {
                        var b = M(this, da.extend({}, a), f);
                        (e || da._data(this, "finish")) && b.stop(!0);
                    };
                return (g.finish = g), e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g);
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c);
                };
                return (
                    "string" != typeof a && ((c = b), (b = a), (a = void 0)),
                    b && !1 !== a && this.queue(a || "fx", []),
                    this.each(function () {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = da.timers,
                            g = da._data(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else for (e in g) g[e] && g[e].stop && pb.test(e) && d(g[e]);
                        for (e = f.length; e--; ) f[e].elem !== this || (null != a && f[e].queue !== a) || (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
                        (b || !c) && da.dequeue(this, a);
                    })
                );
            },
            finish: function (a) {
                return (
                    !1 !== a && (a = a || "fx"),
                    this.each(function () {
                        var b,
                            c = da._data(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = da.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, da.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish;
                    })
                );
            },
        }),
        da.each(["toggle", "show", "hide"], function (a, b) {
            var c = da.fn[b];
            da.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e);
            };
        }),
        da.each({ slideDown: I("show"), slideUp: I("hide"), slideToggle: I("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
            da.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d);
            };
        }),
        (da.timers = []),
        (da.fx.tick = function () {
            var a,
                b = da.timers,
                c = 0;
            for (lb = da.now(); c < b.length; c++) (a = b[c])() || b[c] !== a || b.splice(c--, 1);
            b.length || da.fx.stop(), (lb = void 0);
        }),
        (da.fx.timer = function (a) {
            da.timers.push(a), a() ? da.fx.start() : da.timers.pop();
        }),
        (da.fx.interval = 13),
        (da.fx.start = function () {
            mb || (mb = setInterval(da.fx.tick, da.fx.interval));
        }),
        (da.fx.stop = function () {
            clearInterval(mb), (mb = null);
        }),
        (da.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (da.fn.delay = function (a, b) {
            return (
                (a = da.fx ? da.fx.speeds[a] || a : a),
                (b = b || "fx"),
                this.queue(b, function (b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function () {
                        clearTimeout(d);
                    };
                })
            );
        }),
        (function () {
            var a, b, c, d, e;
            (b = na.createElement("div")),
                b.setAttribute("className", "t"),
                (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (d = b.getElementsByTagName("a")[0]),
                (c = na.createElement("select")),
                (e = c.appendChild(na.createElement("option"))),
                (a = b.getElementsByTagName("input")[0]),
                (d.style.cssText = "top:1px"),
                (ca.getSetAttribute = "t" !== b.className),
                (ca.style = /top/.test(d.getAttribute("style"))),
                (ca.hrefNormalized = "/a" === d.getAttribute("href")),
                (ca.checkOn = !!a.value),
                (ca.optSelected = e.selected),
                (ca.enctype = !!na.createElement("form").enctype),
                (c.disabled = !0),
                (ca.optDisabled = !e.disabled),
                (a = na.createElement("input")),
                a.setAttribute("value", ""),
                (ca.input = "" === a.getAttribute("value")),
                (a.value = "t"),
                a.setAttribute("type", "radio"),
                (ca.radioValue = "t" === a.value);
        })();
    var sb = /\r/g;
    da.fn.extend({
        val: function (a) {
            var b,
                c,
                d,
                e = this[0];
            return arguments.length
                ? ((d = da.isFunction(a)),
                  this.each(function (c) {
                      var e;
                      1 === this.nodeType &&
                          ((e = d ? a.call(this, c, da(this).val()) : a),
                          null == e
                              ? (e = "")
                              : "number" == typeof e
                              ? (e += "")
                              : da.isArray(e) &&
                                (e = da.map(e, function (a) {
                                    return null == a ? "" : a + "";
                                })),
                          ((b = da.valHooks[this.type] || da.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value")) || (this.value = e));
                  }))
                : e
                ? ((b = da.valHooks[e.type] || da.valHooks[e.nodeName.toLowerCase()]), b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : ((c = e.value), "string" == typeof c ? c.replace(sb, "") : null == c ? "" : c))
                : void 0;
        },
    }),
        da.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = da.find.attr(a, "value");
                        return null != b ? b : da.trim(da.text(a));
                    },
                },
                select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                            if (((c = d[i]), !((!c.selected && i !== e) || (ca.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || (c.parentNode.disabled && da.nodeName(c.parentNode, "optgroup"))))) {
                                if (((b = da(c).val()), f)) return b;
                                g.push(b);
                            }
                        return g;
                    },
                    set: function (a, b) {
                        for (var c, d, e = a.options, f = da.makeArray(b), g = e.length; g--; )
                            if (((d = e[g]), da.inArray(da.valHooks.option.get(d), f) >= 0))
                                try {
                                    d.selected = c = !0;
                                } catch (a) {
                                    d.scrollHeight;
                                }
                            else d.selected = !1;
                        return c || (a.selectedIndex = -1), e;
                    },
                },
            },
        }),
        da.each(["radio", "checkbox"], function () {
            (da.valHooks[this] = {
                set: function (a, b) {
                    return da.isArray(b) ? (a.checked = da.inArray(da(a).val(), b) >= 0) : void 0;
                },
            }),
                ca.checkOn ||
                    (da.valHooks[this].get = function (a) {
                        return null === a.getAttribute("value") ? "on" : a.value;
                    });
        });
    var tb,
        ub,
        vb = da.expr.attrHandle,
        wb = /^(?:checked|selected)$/i,
        xb = ca.getSetAttribute,
        yb = ca.input;
    da.fn.extend({
        attr: function (a, b) {
            return Ba(this, da.attr, a, b, arguments.length > 1);
        },
        removeAttr: function (a) {
            return this.each(function () {
                da.removeAttr(this, a);
            });
        },
    }),
        da.extend({
            attr: function (a, b, c) {
                var d,
                    e,
                    f = a.nodeType;
                if (a && 3 !== f && 8 !== f && 2 !== f)
                    return typeof a.getAttribute === va
                        ? da.prop(a, b, c)
                        : ((1 === f && da.isXMLDoc(a)) || ((b = b.toLowerCase()), (d = da.attrHooks[b] || (da.expr.match.bool.test(b) ? ub : tb))),
                          void 0 === c
                              ? d && "get" in d && null !== (e = d.get(a, b))
                                  ? e
                                  : ((e = da.find.attr(a, b)), null == e ? void 0 : e)
                              : null !== c
                              ? d && "set" in d && void 0 !== (e = d.set(a, c, b))
                                  ? e
                                  : (a.setAttribute(b, c + ""), c)
                              : void da.removeAttr(a, b));
            },
            removeAttr: function (a, b) {
                var c,
                    d,
                    e = 0,
                    f = b && b.match(ra);
                if (f && 1 === a.nodeType)
                    for (; (c = f[e++]); ) (d = da.propFix[c] || c), da.expr.match.bool.test(c) ? ((yb && xb) || !wb.test(c) ? (a[d] = !1) : (a[da.camelCase("default-" + c)] = a[d] = !1)) : da.attr(a, c, ""), a.removeAttribute(xb ? c : d);
            },
            attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!ca.radioValue && "radio" === b && da.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b;
                        }
                    },
                },
            },
        }),
        (ub = {
            set: function (a, b, c) {
                return !1 === b ? da.removeAttr(a, c) : (yb && xb) || !wb.test(c) ? a.setAttribute((!xb && da.propFix[c]) || c, c) : (a[da.camelCase("default-" + c)] = a[c] = !0), c;
            },
        }),
        da.each(da.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = vb[b] || da.find.attr;
            vb[b] =
                (yb && xb) || !wb.test(b)
                    ? function (a, b, d) {
                          var e, f;
                          return d || ((f = vb[b]), (vb[b] = e), (e = null != c(a, b, d) ? b.toLowerCase() : null), (vb[b] = f)), e;
                      }
                    : function (a, b, c) {
                          return c ? void 0 : a[da.camelCase("default-" + b)] ? b.toLowerCase() : null;
                      };
        }),
        (yb && xb) ||
            (da.attrHooks.value = {
                set: function (a, b, c) {
                    return da.nodeName(a, "input") ? void (a.defaultValue = b) : tb && tb.set(a, b, c);
                },
            }),
        xb ||
            ((tb = {
                set: function (a, b, c) {
                    var d = a.getAttributeNode(c);
                    return d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))), (d.value = b += ""), "value" === c || b === a.getAttribute(c) ? b : void 0;
                },
            }),
            (vb.id = vb.name = vb.coords = function (a, b, c) {
                var d;
                return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
            }),
            (da.valHooks.button = {
                get: function (a, b) {
                    var c = a.getAttributeNode(b);
                    return c && c.specified ? c.value : void 0;
                },
                set: tb.set,
            }),
            (da.attrHooks.contenteditable = {
                set: function (a, b, c) {
                    tb.set(a, "" !== b && b, c);
                },
            }),
            da.each(["width", "height"], function (a, b) {
                da.attrHooks[b] = {
                    set: function (a, c) {
                        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
                    },
                };
            })),
        ca.style ||
            (da.attrHooks.style = {
                get: function (a) {
                    return a.style.cssText || void 0;
                },
                set: function (a, b) {
                    return (a.style.cssText = b + "");
                },
            });
    var zb = /^(?:input|select|textarea|button|object)$/i,
        Ab = /^(?:a|area)$/i;
    da.fn.extend({
        prop: function (a, b) {
            return Ba(this, da.prop, a, b, arguments.length > 1);
        },
        removeProp: function (a) {
            return (
                (a = da.propFix[a] || a),
                this.each(function () {
                    try {
                        (this[a] = void 0), delete this[a];
                    } catch (a) {}
                })
            );
        },
    }),
        da.extend({
            propFix: { for: "htmlFor", class: "className" },
            prop: function (a, b, c) {
                var d,
                    e,
                    f,
                    g = a.nodeType;
                if (a && 3 !== g && 8 !== g && 2 !== g)
                    return (
                        (f = 1 !== g || !da.isXMLDoc(a)),
                        f && ((b = da.propFix[b] || b), (e = da.propHooks[b])),
                        void 0 !== c ? (e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a[b] = c)) : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = da.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : zb.test(a.nodeName) || (Ab.test(a.nodeName) && a.href) ? 0 : -1;
                    },
                },
            },
        }),
        ca.hrefNormalized ||
            da.each(["href", "src"], function (a, b) {
                da.propHooks[b] = {
                    get: function (a) {
                        return a.getAttribute(b, 4);
                    },
                };
            }),
        ca.optSelected ||
            (da.propHooks.selected = {
                get: function (a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
                },
            }),
        da.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            da.propFix[this.toLowerCase()] = this;
        }),
        ca.enctype || (da.propFix.enctype = "encoding");
    var Bb = /[\t\r\n\f]/g;
    da.fn.extend({
        addClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h = 0,
                i = this.length,
                j = "string" == typeof a && a;
            if (da.isFunction(a))
                return this.each(function (b) {
                    da(this).addClass(a.call(this, b, this.className));
                });
            if (j)
                for (b = (a || "").match(ra) || []; i > h; h++)
                    if (((c = this[h]), (d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Bb, " ") : " ")))) {
                        for (f = 0; (e = b[f++]); ) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        (g = da.trim(d)), c.className !== g && (c.className = g);
                    }
            return this;
        },
        removeClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h = 0,
                i = this.length,
                j = 0 === arguments.length || ("string" == typeof a && a);
            if (da.isFunction(a))
                return this.each(function (b) {
                    da(this).removeClass(a.call(this, b, this.className));
                });
            if (j)
                for (b = (a || "").match(ra) || []; i > h; h++)
                    if (((c = this[h]), (d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Bb, " ") : "")))) {
                        for (f = 0; (e = b[f++]); ) for (; d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                        (g = a ? da.trim(d) : ""), c.className !== g && (c.className = g);
                    }
            return this;
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c
                ? b
                    ? this.addClass(a)
                    : this.removeClass(a)
                : this.each(
                      da.isFunction(a)
                          ? function (c) {
                                da(this).toggleClass(a.call(this, c, this.className, b), b);
                            }
                          : function () {
                                if ("string" === c) for (var b, d = 0, e = da(this), f = a.match(ra) || []; (b = f[d++]); ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                                else (c === va || "boolean" === c) && (this.className && da._data(this, "__className__", this.className), (this.className = this.className || !1 === a ? "" : da._data(this, "__className__") || ""));
                            }
                  );
        },
        hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Bb, " ").indexOf(b) >= 0) return !0;
            return !1;
        },
    }),
        da.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (
            a,
            b
        ) {
            da.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
            };
        }),
        da.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a);
            },
            bind: function (a, b, c) {
                return this.on(a, null, b, c);
            },
            unbind: function (a, b) {
                return this.off(a, null, b);
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d);
            },
            undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
            },
        });
    var Cb = da.now(),
        Db = /\?/,
        Eb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (da.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c,
            d = null,
            e = da.trim(b + "");
        return e &&
            !da.trim(
                e.replace(Eb, function (a, b, e, f) {
                    return c && b && (d = 0), 0 === d ? a : ((c = e || b), (d += !f - !e), "");
                })
            )
            ? Function("return " + e)()
            : da.error("Invalid JSON: " + b);
    }),
        (da.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser ? ((d = new DOMParser()), (c = d.parseFromString(b, "text/xml"))) : ((c = new ActiveXObject("Microsoft.XMLDOM")), (c.async = "false"), c.loadXML(b));
            } catch (a) {
                c = void 0;
            }
            return (c && c.documentElement && !c.getElementsByTagName("parsererror").length) || da.error("Invalid XML: " + b), c;
        });
    var Fb,
        Gb,
        Hb = /#.*$/,
        Ib = /([?&])_=[^&]*/,
        Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Lb = /^(?:GET|HEAD)$/,
        Mb = /^\/\//,
        Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Ob = {},
        Pb = {},
        Qb = "*/".concat("*");
    try {
        Gb = location.href;
    } catch (a) {
        (Gb = na.createElement("a")), (Gb.href = ""), (Gb = Gb.href);
    }
    (Fb = Nb.exec(Gb.toLowerCase()) || []),
        da.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Gb,
                type: "GET",
                isLocal: Kb.test(Fb[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": Qb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /xml/, html: /html/, json: /json/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": da.parseJSON, "text xml": da.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (a, b) {
                return b ? P(P(a, da.ajaxSettings), b) : P(da.ajaxSettings, a);
            },
            ajaxPrefilter: N(Ob),
            ajaxTransport: N(Pb),
            ajax: function (a, b) {
                function c(a, b, c, d) {
                    var e,
                        k,
                        r,
                        s,
                        u,
                        w = b;
                    2 !== t &&
                        ((t = 2),
                        h && clearTimeout(h),
                        (j = void 0),
                        (g = d || ""),
                        (v.readyState = a > 0 ? 4 : 0),
                        (e = (a >= 200 && 300 > a) || 304 === a),
                        c && (s = Q(l, v, c)),
                        (s = R(l, s, v, e)),
                        e
                            ? (l.ifModified && ((u = v.getResponseHeader("Last-Modified")), u && (da.lastModified[f] = u), (u = v.getResponseHeader("etag")) && (da.etag[f] = u)),
                              204 === a || "HEAD" === l.type ? (w = "nocontent") : 304 === a ? (w = "notmodified") : ((w = s.state), (k = s.data), (r = s.error), (e = !r)))
                            : ((r = w), (a || !w) && ((w = "error"), 0 > a && (a = 0))),
                        (v.status = a),
                        (v.statusText = (b || w) + ""),
                        e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]),
                        v.statusCode(q),
                        (q = void 0),
                        i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]),
                        p.fireWith(m, [v, w]),
                        i && (n.trigger("ajaxComplete", [v, l]), --da.active || da.event.trigger("ajaxStop")));
                }
                "object" == typeof a && ((b = a), (a = void 0)), (b = b || {});
                var d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l = da.ajaxSetup({}, b),
                    m = l.context || l,
                    n = l.context && (m.nodeType || m.jquery) ? da(m) : da.event,
                    o = da.Deferred(),
                    p = da.Callbacks("once memory"),
                    q = l.statusCode || {},
                    r = {},
                    s = {},
                    t = 0,
                    u = "canceled",
                    v = {
                        readyState: 0,
                        getResponseHeader: function (a) {
                            var b;
                            if (2 === t) {
                                if (!k) for (k = {}; (b = Jb.exec(g)); ) k[b[1].toLowerCase()] = b[2];
                                b = k[a.toLowerCase()];
                            }
                            return null == b ? null : b;
                        },
                        getAllResponseHeaders: function () {
                            return 2 === t ? g : null;
                        },
                        setRequestHeader: function (a, b) {
                            var c = a.toLowerCase();
                            return t || ((a = s[c] = s[c] || a), (r[a] = b)), this;
                        },
                        overrideMimeType: function (a) {
                            return t || (l.mimeType = a), this;
                        },
                        statusCode: function (a) {
                            var b;
                            if (a)
                                if (2 > t) for (b in a) q[b] = [q[b], a[b]];
                                else v.always(a[v.status]);
                            return this;
                        },
                        abort: function (a) {
                            var b = a || u;
                            return j && j.abort(b), c(0, b), this;
                        },
                    };
                if (
                    ((o.promise(v).complete = p.add),
                    (v.success = v.done),
                    (v.error = v.fail),
                    (l.url = ((a || l.url || Gb) + "").replace(Hb, "").replace(Mb, Fb[1] + "//")),
                    (l.type = b.method || b.type || l.method || l.type),
                    (l.dataTypes = da
                        .trim(l.dataType || "*")
                        .toLowerCase()
                        .match(ra) || [""]),
                    null == l.crossDomain &&
                        ((d = Nb.exec(l.url.toLowerCase())), (l.crossDomain = !(!d || (d[1] === Fb[1] && d[2] === Fb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Fb[3] || ("http:" === Fb[1] ? "80" : "443")))))),
                    l.data && l.processData && "string" != typeof l.data && (l.data = da.param(l.data, l.traditional)),
                    O(Ob, l, b, v),
                    2 === t)
                )
                    return v;
                (i = l.global),
                    i && 0 == da.active++ && da.event.trigger("ajaxStart"),
                    (l.type = l.type.toUpperCase()),
                    (l.hasContent = !Lb.test(l.type)),
                    (f = l.url),
                    l.hasContent || (l.data && ((f = l.url += (Db.test(f) ? "&" : "?") + l.data), delete l.data), !1 === l.cache && (l.url = Ib.test(f) ? f.replace(Ib, "$1_=" + Cb++) : f + (Db.test(f) ? "&" : "?") + "_=" + Cb++)),
                    l.ifModified && (da.lastModified[f] && v.setRequestHeader("If-Modified-Since", da.lastModified[f]), da.etag[f] && v.setRequestHeader("If-None-Match", da.etag[f])),
                    ((l.data && l.hasContent && !1 !== l.contentType) || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
                    v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Qb + "; q=0.01" : "") : l.accepts["*"]);
                for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
                if (l.beforeSend && (!1 === l.beforeSend.call(m, v, l) || 2 === t)) return v.abort();
                u = "abort";
                for (e in { success: 1, error: 1, complete: 1 }) v[e](l[e]);
                if ((j = O(Pb, l, b, v))) {
                    (v.readyState = 1),
                        i && n.trigger("ajaxSend", [v, l]),
                        l.async &&
                            l.timeout > 0 &&
                            (h = setTimeout(function () {
                                v.abort("timeout");
                            }, l.timeout));
                    try {
                        (t = 1), j.send(r, c);
                    } catch (a) {
                        if (!(2 > t)) throw a;
                        c(-1, a);
                    }
                } else c(-1, "No Transport");
                return v;
            },
            getJSON: function (a, b, c) {
                return da.get(a, b, c, "json");
            },
            getScript: function (a, b) {
                return da.get(a, void 0, b, "script");
            },
        }),
        da.each(["get", "post"], function (a, b) {
            da[b] = function (a, c, d, e) {
                return da.isFunction(c) && ((e = e || d), (d = c), (c = void 0)), da.ajax({ url: a, type: b, dataType: e, data: c, success: d });
            };
        }),
        da.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            da.fn[b] = function (a) {
                return this.on(b, a);
            };
        }),
        (da._evalUrl = function (a) {
            return da.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        }),
        da.fn.extend({
            wrapAll: function (a) {
                if (da.isFunction(a))
                    return this.each(function (b) {
                        da(this).wrapAll(a.call(this, b));
                    });
                if (this[0]) {
                    var b = da(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]),
                        b
                            .map(function () {
                                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild;
                                return a;
                            })
                            .append(this);
                }
                return this;
            },
            wrapInner: function (a) {
                return this.each(
                    da.isFunction(a)
                        ? function (b) {
                              da(this).wrapInner(a.call(this, b));
                          }
                        : function () {
                              var b = da(this),
                                  c = b.contents();
                              c.length ? c.wrapAll(a) : b.append(a);
                          }
                );
            },
            wrap: function (a) {
                var b = da.isFunction(a);
                return this.each(function (c) {
                    da(this).wrapAll(b ? a.call(this, c) : a);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        da.nodeName(this, "body") || da(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        }),
        (da.expr.filters.hidden = function (a) {
            return (a.offsetWidth <= 0 && a.offsetHeight <= 0) || (!ca.reliableHiddenOffsets() && "none" === ((a.style && a.style.display) || da.css(a, "display")));
        }),
        (da.expr.filters.visible = function (a) {
            return !da.expr.filters.hidden(a);
        });
    var Rb = /%20/g,
        Sb = /\[\]$/,
        Tb = /\r?\n/g,
        Ub = /^(?:submit|button|image|reset|file)$/i,
        Vb = /^(?:input|select|textarea|keygen)/i;
    (da.param = function (a, b) {
        var c,
            d = [],
            e = function (a, b) {
                (b = da.isFunction(b) ? b() : null == b ? "" : b), (d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b));
            };
        if ((void 0 === b && (b = da.ajaxSettings && da.ajaxSettings.traditional), da.isArray(a) || (a.jquery && !da.isPlainObject(a))))
            da.each(a, function () {
                e(this.name, this.value);
            });
        else for (c in a) S(c, a[c], b, e);
        return d.join("&").replace(Rb, "+");
    }),
        da.fn.extend({
            serialize: function () {
                return da.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var a = da.prop(this, "elements");
                    return a ? da.makeArray(a) : this;
                })
                    .filter(function () {
                        var a = this.type;
                        return this.name && !da(this).is(":disabled") && Vb.test(this.nodeName) && !Ub.test(a) && (this.checked || !Ca.test(a));
                    })
                    .map(function (a, b) {
                        var c = da(this).val();
                        return null == c
                            ? null
                            : da.isArray(c)
                            ? da.map(c, function (a) {
                                  return { name: b.name, value: a.replace(Tb, "\r\n") };
                              })
                            : { name: b.name, value: c.replace(Tb, "\r\n") };
                    })
                    .get();
            },
        }),
        (da.ajaxSettings.xhr =
            void 0 !== a.ActiveXObject
                ? function () {
                      return (!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T()) || U();
                  }
                : T);
    var Wb = 0,
        Xb = {},
        Yb = da.ajaxSettings.xhr();
    a.ActiveXObject &&
        da(a).on("unload", function () {
            for (var a in Xb) Xb[a](void 0, !0);
        }),
        (ca.cors = !!Yb && "withCredentials" in Yb),
        (Yb = ca.ajax = !!Yb) &&
            da.ajaxTransport(function (a) {
                if (!a.crossDomain || ca.cors) {
                    var b;
                    return {
                        send: function (c, d) {
                            var e,
                                f = a.xhr(),
                                g = ++Wb;
                            if ((f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                            for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                            f.send((a.hasContent && a.data) || null),
                                (b = function (c, e) {
                                    var h, i, j;
                                    if (b && (e || 4 === f.readyState))
                                        if ((delete Xb[g], (b = void 0), (f.onreadystatechange = da.noop), e)) 4 !== f.readyState && f.abort();
                                        else {
                                            (j = {}), (h = f.status), "string" == typeof f.responseText && (j.text = f.responseText);
                                            try {
                                                i = f.statusText;
                                            } catch (a) {
                                                i = "";
                                            }
                                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : (h = j.text ? 200 : 404);
                                        }
                                    j && d(h, i, j, f.getAllResponseHeaders());
                                }),
                                a.async ? (4 === f.readyState ? setTimeout(b) : (f.onreadystatechange = Xb[g] = b)) : b();
                        },
                        abort: function () {
                            b && b(void 0, !0);
                        },
                    };
                }
            }),
        da.ajaxSetup({
            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
            contents: { script: /(?:java|ecma)script/ },
            converters: {
                "text script": function (a) {
                    return da.globalEval(a), a;
                },
            },
        }),
        da.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && ((a.type = "GET"), (a.global = !1));
        }),
        da.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b,
                    c = na.head || da("head")[0] || na.documentElement;
                return {
                    send: function (d, e) {
                        (b = na.createElement("script")),
                            (b.async = !0),
                            a.scriptCharset && (b.charset = a.scriptCharset),
                            (b.src = a.url),
                            (b.onload = b.onreadystatechange = function (a, c) {
                                (c || !b.readyState || /loaded|complete/.test(b.readyState)) && ((b.onload = b.onreadystatechange = null), b.parentNode && b.parentNode.removeChild(b), (b = null), c || e(200, "success"));
                            }),
                            c.insertBefore(b, c.firstChild);
                    },
                    abort: function () {
                        b && b.onload(void 0, !0);
                    },
                };
            }
        });
    var Zb = [],
        $b = /(=)\?(?=&|$)|\?\?/;
    da.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var a = Zb.pop() || da.expando + "_" + Cb++;
            return (this[a] = !0), a;
        },
    }),
        da.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e,
                f,
                g,
                h = !1 !== b.jsonp && ($b.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && $b.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0]
                ? ((e = b.jsonpCallback = da.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback),
                  h ? (b[h] = b[h].replace($b, "$1" + e)) : !1 !== b.jsonp && (b.url += (Db.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                  (b.converters["script json"] = function () {
                      return g || da.error(e + " was not called"), g[0];
                  }),
                  (b.dataTypes[0] = "json"),
                  (f = a[e]),
                  (a[e] = function () {
                      g = arguments;
                  }),
                  d.always(function () {
                      (a[e] = f), b[e] && ((b.jsonpCallback = c.jsonpCallback), Zb.push(e)), g && da.isFunction(f) && f(g[0]), (g = f = void 0);
                  }),
                  "script")
                : void 0;
        }),
        (da.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && ((c = b), (b = !1)), (b = b || na);
            var d = ka.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : ((d = da.buildFragment([a], b, e)), e && e.length && da(e).remove(), da.merge([], d.childNodes));
        });
    var _b = da.fn.load;
    (da.fn.load = function (a, b, c) {
        if ("string" != typeof a && _b) return _b.apply(this, arguments);
        var d,
            e,
            f,
            g = this,
            h = a.indexOf(" ");
        return (
            h >= 0 && ((d = da.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
            da.isFunction(b) ? ((c = b), (b = void 0)) : b && "object" == typeof b && (f = "POST"),
            g.length > 0 &&
                da
                    .ajax({ url: a, type: f, dataType: "html", data: b })
                    .done(function (a) {
                        (e = arguments), g.html(d ? da("<div>").append(da.parseHTML(a)).find(d) : a);
                    })
                    .complete(
                        c &&
                            function (a, b) {
                                g.each(c, e || [a.responseText, b, a]);
                            }
                    ),
            this
        );
    }),
        (da.expr.filters.animated = function (a) {
            return da.grep(da.timers, function (b) {
                return a === b.elem;
            }).length;
        });
    var ac = a.document.documentElement;
    (da.offset = {
        setOffset: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k = da.css(a, "position"),
                l = da(a),
                m = {};
            "static" === k && (a.style.position = "relative"),
                (h = l.offset()),
                (f = da.css(a, "top")),
                (i = da.css(a, "left")),
                (j = ("absolute" === k || "fixed" === k) && da.inArray("auto", [f, i]) > -1),
                j ? ((d = l.position()), (g = d.top), (e = d.left)) : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
                da.isFunction(b) && (b = b.call(a, c, h)),
                null != b.top && (m.top = b.top - h.top + g),
                null != b.left && (m.left = b.left - h.left + e),
                "using" in b ? b.using.call(a, m) : l.css(m);
        },
    }),
        da.fn.extend({
            offset: function (a) {
                if (arguments.length)
                    return void 0 === a
                        ? this
                        : this.each(function (b) {
                              da.offset.setOffset(this, a, b);
                          });
                var b,
                    c,
                    d = { top: 0, left: 0 },
                    e = this[0],
                    f = e && e.ownerDocument;
                return f
                    ? ((b = f.documentElement),
                      da.contains(b, e)
                          ? (typeof e.getBoundingClientRect !== va && (d = e.getBoundingClientRect()),
                            (c = V(f)),
                            { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) })
                          : d)
                    : void 0;
            },
            position: function () {
                if (this[0]) {
                    var a,
                        b,
                        c = { top: 0, left: 0 },
                        d = this[0];
                    return (
                        "fixed" === da.css(d, "position")
                            ? (b = d.getBoundingClientRect())
                            : ((a = this.offsetParent()), (b = this.offset()), da.nodeName(a[0], "html") || (c = a.offset()), (c.top += da.css(a[0], "borderTopWidth", !0)), (c.left += da.css(a[0], "borderLeftWidth", !0))),
                        { top: b.top - c.top - da.css(d, "marginTop", !0), left: b.left - c.left - da.css(d, "marginLeft", !0) }
                    );
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var a = this.offsetParent || ac; a && !da.nodeName(a, "html") && "static" === da.css(a, "position"); ) a = a.offsetParent;
                    return a || ac;
                });
            },
        }),
        da.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
            var c = /Y/.test(b);
            da.fn[a] = function (d) {
                return Ba(
                    this,
                    function (a, d, e) {
                        var f = V(a);
                        return void 0 === e ? (f ? (b in f ? f[b] : f.document.documentElement[d]) : a[d]) : void (f ? f.scrollTo(c ? da(f).scrollLeft() : e, c ? e : da(f).scrollTop()) : (a[d] = e));
                    },
                    a,
                    d,
                    arguments.length,
                    null
                );
            };
        }),
        da.each(["top", "left"], function (a, b) {
            da.cssHooks[b] = A(ca.pixelPosition, function (a, c) {
                return c ? ((c = _a(a, b)), bb.test(c) ? da(a).position()[b] + "px" : c) : void 0;
            });
        }),
        da.each({ Height: "height", Width: "width" }, function (a, b) {
            da.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
                da.fn[d] = function (d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (!0 === d || !0 === e ? "margin" : "border");
                    return Ba(
                        this,
                        function (b, c, d) {
                            var e;
                            return da.isWindow(b)
                                ? b.document.documentElement["client" + a]
                                : 9 === b.nodeType
                                ? ((e = b.documentElement), Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a]))
                                : void 0 === d
                                ? da.css(b, c, g)
                                : da.style(b, c, d, g);
                        },
                        b,
                        f ? d : void 0,
                        f,
                        null
                    );
                };
            });
        }),
        (da.fn.size = function () {
            return this.length;
        }),
        (da.fn.andSelf = da.fn.addBack),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return da;
            });
    var bc = a.jQuery,
        cc = a.$;
    return (
        (da.noConflict = function (b) {
            return a.$ === da && (a.$ = cc), b && a.jQuery === da && (a.jQuery = bc), da;
        }),
        typeof b === va && (a.jQuery = a.$ = da),
        da
    );
}),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
    })(function (a) {
        (a.ui = a.ui || {}), (a.ui.version = "1.12.1");
        var b = 0,
            c = Array.prototype.slice;
        (a.cleanData = (function (b) {
            return function (c) {
                var d, e, f;
                for (f = 0; null != (e = c[f]); f++)
                    try {
                        (d = a._data(e, "events")) && d.remove && a(e).triggerHandler("remove");
                    } catch (a) {}
                b(c);
            };
        })(a.cleanData)),
            (a.widget = function (b, c, d) {
                var e,
                    f,
                    g,
                    h = {},
                    i = b.split(".")[0];
                b = b.split(".")[1];
                var j = i + "-" + b;
                return (
                    d || ((d = c), (c = a.Widget)),
                    a.isArray(d) && (d = a.extend.apply(null, [{}].concat(d))),
                    (a.expr[":"][j.toLowerCase()] = function (b) {
                        return !!a.data(b, j);
                    }),
                    (a[i] = a[i] || {}),
                    (e = a[i][b]),
                    (f = a[i][b] = function (a, b) {
                        return this._createWidget ? void (arguments.length && this._createWidget(a, b)) : new f(a, b);
                    }),
                    a.extend(f, e, { version: d.version, _proto: a.extend({}, d), _childConstructors: [] }),
                    (g = new c()),
                    (g.options = a.widget.extend({}, g.options)),
                    a.each(d, function (b, d) {
                        return a.isFunction(d)
                            ? void (h[b] = (function () {
                                  function a() {
                                      return c.prototype[b].apply(this, arguments);
                                  }
                                  function e(a) {
                                      return c.prototype[b].apply(this, a);
                                  }
                                  return function () {
                                      var b,
                                          c = this._super,
                                          f = this._superApply;
                                      return (this._super = a), (this._superApply = e), (b = d.apply(this, arguments)), (this._super = c), (this._superApply = f), b;
                                  };
                              })())
                            : void (h[b] = d);
                    }),
                    (f.prototype = a.widget.extend(g, { widgetEventPrefix: e ? g.widgetEventPrefix || b : b }, h, { constructor: f, namespace: i, widgetName: b, widgetFullName: j })),
                    e
                        ? (a.each(e._childConstructors, function (b, c) {
                              var d = c.prototype;
                              a.widget(d.namespace + "." + d.widgetName, f, c._proto);
                          }),
                          delete e._childConstructors)
                        : c._childConstructors.push(f),
                    a.widget.bridge(b, f),
                    f
                );
            }),
            (a.widget.extend = function (b) {
                for (var d, e, f = c.call(arguments, 1), g = 0, h = f.length; h > g; g++)
                    for (d in f[g]) (e = f[g][d]), f[g].hasOwnProperty(d) && void 0 !== e && (b[d] = a.isPlainObject(e) ? (a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e)) : e);
                return b;
            }),
            (a.widget.bridge = function (b, d) {
                var e = d.prototype.widgetFullName || b;
                a.fn[b] = function (f) {
                    var g = "string" == typeof f,
                        h = c.call(arguments, 1),
                        i = this;
                    return (
                        g
                            ? this.length || "instance" !== f
                                ? this.each(function () {
                                      var c,
                                          d = a.data(this, e);
                                      return "instance" === f
                                          ? ((i = d), !1)
                                          : d
                                          ? a.isFunction(d[f]) && "_" !== f.charAt(0)
                                              ? ((c = d[f].apply(d, h)), c !== d && void 0 !== c ? ((i = c && c.jquery ? i.pushStack(c.get()) : c), !1) : void 0)
                                              : a.error("no such method '" + f + "' for " + b + " widget instance")
                                          : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'");
                                  })
                                : (i = void 0)
                            : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))),
                              this.each(function () {
                                  var b = a.data(this, e);
                                  b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new d(f, this));
                              })),
                        i
                    );
                };
            }),
            (a.Widget = function () {}),
            (a.Widget._childConstructors = []),
            (a.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: { classes: {}, disabled: !1, create: null },
                _createWidget: function (c, d) {
                    (d = a(d || this.defaultElement || this)[0]),
                        (this.element = a(d)),
                        (this.uuid = b++),
                        (this.eventNamespace = "." + this.widgetName + this.uuid),
                        (this.bindings = a()),
                        (this.hoverable = a()),
                        (this.focusable = a()),
                        (this.classesElementLookup = {}),
                        d !== this &&
                            (a.data(d, this.widgetFullName, this),
                            this._on(!0, this.element, {
                                remove: function (a) {
                                    a.target === d && this.destroy();
                                },
                            }),
                            (this.document = a(d.style ? d.ownerDocument : d.document || d)),
                            (this.window = a(this.document[0].defaultView || this.document[0].parentWindow))),
                        (this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c)),
                        this._create(),
                        this.options.disabled && this._setOptionDisabled(this.options.disabled),
                        this._trigger("create", null, this._getCreateEventData()),
                        this._init();
                },
                _getCreateOptions: function () {
                    return {};
                },
                _getCreateEventData: a.noop,
                _create: a.noop,
                _init: a.noop,
                destroy: function () {
                    var b = this;
                    this._destroy(),
                        a.each(this.classesElementLookup, function (a, c) {
                            b._removeClass(c, a);
                        }),
                        this.element.off(this.eventNamespace).removeData(this.widgetFullName),
                        this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
                        this.bindings.off(this.eventNamespace);
                },
                _destroy: a.noop,
                widget: function () {
                    return this.element;
                },
                option: function (b, c) {
                    var d,
                        e,
                        f,
                        g = b;
                    if (0 === arguments.length) return a.widget.extend({}, this.options);
                    if ("string" == typeof b)
                        if (((g = {}), (d = b.split(".")), (b = d.shift()), d.length)) {
                            for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; d.length - 1 > f; f++) (e[d[f]] = e[d[f]] || {}), (e = e[d[f]]);
                            if (((b = d.pop()), 1 === arguments.length)) return void 0 === e[b] ? null : e[b];
                            e[b] = c;
                        } else {
                            if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
                            g[b] = c;
                        }
                    return this._setOptions(g), this;
                },
                _setOptions: function (a) {
                    var b;
                    for (b in a) this._setOption(b, a[b]);
                    return this;
                },
                _setOption: function (a, b) {
                    return "classes" === a && this._setOptionClasses(b), (this.options[a] = b), "disabled" === a && this._setOptionDisabled(b), this;
                },
                _setOptionClasses: function (b) {
                    var c, d, e;
                    for (c in b) (e = this.classesElementLookup[c]), b[c] !== this.options.classes[c] && e && e.length && ((d = a(e.get())), this._removeClass(e, c), d.addClass(this._classes({ element: d, keys: c, classes: b, add: !0 })));
                },
                _setOptionDisabled: function (a) {
                    this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!a), a && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
                },
                enable: function () {
                    return this._setOptions({ disabled: !1 });
                },
                disable: function () {
                    return this._setOptions({ disabled: !0 });
                },
                _classes: function (b) {
                    function c(c, f) {
                        var g, h;
                        for (h = 0; c.length > h; h++)
                            (g = e.classesElementLookup[c[h]] || a()),
                                (g = a(b.add ? a.unique(g.get().concat(b.element.get())) : g.not(b.element).get())),
                                (e.classesElementLookup[c[h]] = g),
                                d.push(c[h]),
                                f && b.classes[c[h]] && d.push(b.classes[c[h]]);
                    }
                    var d = [],
                        e = this;
                    return (
                        (b = a.extend({ element: this.element, classes: this.options.classes || {} }, b)),
                        this._on(b.element, { remove: "_untrackClassesElement" }),
                        b.keys && c(b.keys.match(/\S+/g) || [], !0),
                        b.extra && c(b.extra.match(/\S+/g) || []),
                        d.join(" ")
                    );
                },
                _untrackClassesElement: function (b) {
                    var c = this;
                    a.each(c.classesElementLookup, function (d, e) {
                        -1 !== a.inArray(b.target, e) && (c.classesElementLookup[d] = a(e.not(b.target).get()));
                    });
                },
                _removeClass: function (a, b, c) {
                    return this._toggleClass(a, b, c, !1);
                },
                _addClass: function (a, b, c) {
                    return this._toggleClass(a, b, c, !0);
                },
                _toggleClass: function (a, b, c, d) {
                    d = "boolean" == typeof d ? d : c;
                    var e = "string" == typeof a || null === a,
                        f = { extra: e ? b : c, keys: e ? a : b, element: e ? this.element : a, add: d };
                    return f.element.toggleClass(this._classes(f), d), this;
                },
                _on: function (b, c, d) {
                    var e,
                        f = this;
                    "boolean" != typeof b && ((d = c), (c = b), (b = !1)),
                        d ? ((c = e = a(c)), (this.bindings = this.bindings.add(c))) : ((d = c), (c = this.element), (e = this.widget())),
                        a.each(d, function (d, g) {
                            function h() {
                                return b || (!0 !== f.options.disabled && !a(this).hasClass("ui-state-disabled")) ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0;
                            }
                            "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                            var i = d.match(/^([\w:-]*)\s*(.*)$/),
                                j = i[1] + f.eventNamespace,
                                k = i[2];
                            k ? e.on(j, k, h) : c.on(j, h);
                        });
                },
                _off: function (b, c) {
                    (c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                        b.off(c).off(c),
                        (this.bindings = a(this.bindings.not(b).get())),
                        (this.focusable = a(this.focusable.not(b).get())),
                        (this.hoverable = a(this.hoverable.not(b).get()));
                },
                _delay: function (a, b) {
                    function c() {
                        return ("string" == typeof a ? d[a] : a).apply(d, arguments);
                    }
                    var d = this;
                    return setTimeout(c, b || 0);
                },
                _hoverable: function (b) {
                    (this.hoverable = this.hoverable.add(b)),
                        this._on(b, {
                            mouseenter: function (b) {
                                this._addClass(a(b.currentTarget), null, "ui-state-hover");
                            },
                            mouseleave: function (b) {
                                this._removeClass(a(b.currentTarget), null, "ui-state-hover");
                            },
                        });
                },
                _focusable: function (b) {
                    (this.focusable = this.focusable.add(b)),
                        this._on(b, {
                            focusin: function (b) {
                                this._addClass(a(b.currentTarget), null, "ui-state-focus");
                            },
                            focusout: function (b) {
                                this._removeClass(a(b.currentTarget), null, "ui-state-focus");
                            },
                        });
                },
                _trigger: function (b, c, d) {
                    var e,
                        f,
                        g = this.options[b];
                    if (((d = d || {}), (c = a.Event(c)), (c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase()), (c.target = this.element[0]), (f = c.originalEvent))) for (e in f) e in c || (c[e] = f[e]);
                    return this.element.trigger(c, d), !((a.isFunction(g) && !1 === g.apply(this.element[0], [c].concat(d))) || c.isDefaultPrevented());
                },
            }),
            a.each({ show: "fadeIn", hide: "fadeOut" }, function (b, c) {
                a.Widget.prototype["_" + b] = function (d, e, f) {
                    "string" == typeof e && (e = { effect: e });
                    var g,
                        h = e ? (!0 === e || "number" == typeof e ? c : e.effect || c) : b;
                    (e = e || {}),
                        "number" == typeof e && (e = { duration: e }),
                        (g = !a.isEmptyObject(e)),
                        (e.complete = f),
                        e.delay && d.delay(e.delay),
                        g && a.effects && a.effects.effect[h]
                            ? d[b](e)
                            : h !== b && d[h]
                            ? d[h](e.duration, e.easing, f)
                            : d.queue(function (c) {
                                  a(this)[b](), f && f.call(d[0]), c();
                              });
                };
            }),
            a.widget,
            (function () {
                function b(a, b, c) {
                    return [parseFloat(a[0]) * (l.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (l.test(a[1]) ? c / 100 : 1)];
                }
                function c(b, c) {
                    return parseInt(a.css(b, c), 10) || 0;
                }
                function d(b) {
                    var c = b[0];
                    return 9 === c.nodeType
                        ? { width: b.width(), height: b.height(), offset: { top: 0, left: 0 } }
                        : a.isWindow(c)
                        ? { width: b.width(), height: b.height(), offset: { top: b.scrollTop(), left: b.scrollLeft() } }
                        : c.preventDefault
                        ? { width: 0, height: 0, offset: { top: c.pageY, left: c.pageX } }
                        : { width: b.outerWidth(), height: b.outerHeight(), offset: b.offset() };
                }
                var e,
                    f = Math.max,
                    g = Math.abs,
                    h = /left|center|right/,
                    i = /top|center|bottom/,
                    j = /[\+\-]\d+(\.[\d]+)?%?/,
                    k = /^\w+/,
                    l = /%$/,
                    m = a.fn.position;
                (a.position = {
                    scrollbarWidth: function () {
                        if (void 0 !== e) return e;
                        var b,
                            c,
                            d = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                            f = d.children()[0];
                        return a("body").append(d), (b = f.offsetWidth), d.css("overflow", "scroll"), (c = f.offsetWidth), b === c && (c = d[0].clientWidth), d.remove(), (e = b - c);
                    },
                    getScrollInfo: function (b) {
                        var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
                            d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
                            e = "scroll" === c || ("auto" === c && b.width < b.element[0].scrollWidth);
                        return { width: "scroll" === d || ("auto" === d && b.height < b.element[0].scrollHeight) ? a.position.scrollbarWidth() : 0, height: e ? a.position.scrollbarWidth() : 0 };
                    },
                    getWithinInfo: function (b) {
                        var c = a(b || window),
                            d = a.isWindow(c[0]),
                            e = !!c[0] && 9 === c[0].nodeType;
                        return { element: c, isWindow: d, isDocument: e, offset: d || e ? { left: 0, top: 0 } : a(b).offset(), scrollLeft: c.scrollLeft(), scrollTop: c.scrollTop(), width: c.outerWidth(), height: c.outerHeight() };
                    },
                }),
                    (a.fn.position = function (e) {
                        if (!e || !e.of) return m.apply(this, arguments);
                        e = a.extend({}, e);
                        var l,
                            n,
                            o,
                            p,
                            q,
                            r,
                            s = a(e.of),
                            t = a.position.getWithinInfo(e.within),
                            u = a.position.getScrollInfo(t),
                            v = (e.collision || "flip").split(" "),
                            w = {};
                        return (
                            (r = d(s)),
                            s[0].preventDefault && (e.at = "left top"),
                            (n = r.width),
                            (o = r.height),
                            (p = r.offset),
                            (q = a.extend({}, p)),
                            a.each(["my", "at"], function () {
                                var a,
                                    b,
                                    c = (e[this] || "").split(" ");
                                1 === c.length && (c = h.test(c[0]) ? c.concat(["center"]) : i.test(c[0]) ? ["center"].concat(c) : ["center", "center"]),
                                    (c[0] = h.test(c[0]) ? c[0] : "center"),
                                    (c[1] = i.test(c[1]) ? c[1] : "center"),
                                    (a = j.exec(c[0])),
                                    (b = j.exec(c[1])),
                                    (w[this] = [a ? a[0] : 0, b ? b[0] : 0]),
                                    (e[this] = [k.exec(c[0])[0], k.exec(c[1])[0]]);
                            }),
                            1 === v.length && (v[1] = v[0]),
                            "right" === e.at[0] ? (q.left += n) : "center" === e.at[0] && (q.left += n / 2),
                            "bottom" === e.at[1] ? (q.top += o) : "center" === e.at[1] && (q.top += o / 2),
                            (l = b(w.at, n, o)),
                            (q.left += l[0]),
                            (q.top += l[1]),
                            this.each(function () {
                                var d,
                                    h,
                                    i = a(this),
                                    j = i.outerWidth(),
                                    k = i.outerHeight(),
                                    m = c(this, "marginLeft"),
                                    r = c(this, "marginTop"),
                                    x = j + m + c(this, "marginRight") + u.width,
                                    y = k + r + c(this, "marginBottom") + u.height,
                                    z = a.extend({}, q),
                                    A = b(w.my, i.outerWidth(), i.outerHeight());
                                "right" === e.my[0] ? (z.left -= j) : "center" === e.my[0] && (z.left -= j / 2),
                                    "bottom" === e.my[1] ? (z.top -= k) : "center" === e.my[1] && (z.top -= k / 2),
                                    (z.left += A[0]),
                                    (z.top += A[1]),
                                    (d = { marginLeft: m, marginTop: r }),
                                    a.each(["left", "top"], function (b, c) {
                                        a.ui.position[v[b]] &&
                                            a.ui.position[v[b]][c](z, {
                                                targetWidth: n,
                                                targetHeight: o,
                                                elemWidth: j,
                                                elemHeight: k,
                                                collisionPosition: d,
                                                collisionWidth: x,
                                                collisionHeight: y,
                                                offset: [l[0] + A[0], l[1] + A[1]],
                                                my: e.my,
                                                at: e.at,
                                                within: t,
                                                elem: i,
                                            });
                                    }),
                                    e.using &&
                                        (h = function (a) {
                                            var b = p.left - z.left,
                                                c = b + n - j,
                                                d = p.top - z.top,
                                                h = d + o - k,
                                                l = {
                                                    target: { element: s, left: p.left, top: p.top, width: n, height: o },
                                                    element: { element: i, left: z.left, top: z.top, width: j, height: k },
                                                    horizontal: 0 > c ? "left" : b > 0 ? "right" : "center",
                                                    vertical: 0 > h ? "top" : d > 0 ? "bottom" : "middle",
                                                };
                                            j > n && n > g(b + c) && (l.horizontal = "center"),
                                                k > o && o > g(d + h) && (l.vertical = "middle"),
                                                (l.important = f(g(b), g(c)) > f(g(d), g(h)) ? "horizontal" : "vertical"),
                                                e.using.call(this, a, l);
                                        }),
                                    i.offset(a.extend(z, { using: h }));
                            })
                        );
                    }),
                    (a.ui.position = {
                        fit: {
                            left: function (a, b) {
                                var c,
                                    d = b.within,
                                    e = d.isWindow ? d.scrollLeft : d.offset.left,
                                    g = d.width,
                                    h = a.left - b.collisionPosition.marginLeft,
                                    i = e - h,
                                    j = h + b.collisionWidth - g - e;
                                b.collisionWidth > g
                                    ? i > 0 && 0 >= j
                                        ? ((c = a.left + i + b.collisionWidth - g - e), (a.left += i - c))
                                        : (a.left = j > 0 && 0 >= i ? e : i > j ? e + g - b.collisionWidth : e)
                                    : i > 0
                                    ? (a.left += i)
                                    : j > 0
                                    ? (a.left -= j)
                                    : (a.left = f(a.left - h, a.left));
                            },
                            top: function (a, b) {
                                var c,
                                    d = b.within,
                                    e = d.isWindow ? d.scrollTop : d.offset.top,
                                    g = b.within.height,
                                    h = a.top - b.collisionPosition.marginTop,
                                    i = e - h,
                                    j = h + b.collisionHeight - g - e;
                                b.collisionHeight > g
                                    ? i > 0 && 0 >= j
                                        ? ((c = a.top + i + b.collisionHeight - g - e), (a.top += i - c))
                                        : (a.top = j > 0 && 0 >= i ? e : i > j ? e + g - b.collisionHeight : e)
                                    : i > 0
                                    ? (a.top += i)
                                    : j > 0
                                    ? (a.top -= j)
                                    : (a.top = f(a.top - h, a.top));
                            },
                        },
                        flip: {
                            left: function (a, b) {
                                var c,
                                    d,
                                    e = b.within,
                                    f = e.offset.left + e.scrollLeft,
                                    h = e.width,
                                    i = e.isWindow ? e.scrollLeft : e.offset.left,
                                    j = a.left - b.collisionPosition.marginLeft,
                                    k = j - i,
                                    l = j + b.collisionWidth - h - i,
                                    m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                                    n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                                    o = -2 * b.offset[0];
                                0 > k
                                    ? (0 > (c = a.left + m + n + o + b.collisionWidth - h - f) || g(k) > c) && (a.left += m + n + o)
                                    : l > 0 && ((d = a.left - b.collisionPosition.marginLeft + m + n + o - i) > 0 || l > g(d)) && (a.left += m + n + o);
                            },
                            top: function (a, b) {
                                var c,
                                    d,
                                    e = b.within,
                                    f = e.offset.top + e.scrollTop,
                                    h = e.height,
                                    i = e.isWindow ? e.scrollTop : e.offset.top,
                                    j = a.top - b.collisionPosition.marginTop,
                                    k = j - i,
                                    l = j + b.collisionHeight - h - i,
                                    m = "top" === b.my[1],
                                    n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                                    o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                                    p = -2 * b.offset[1];
                                0 > k
                                    ? (0 > (d = a.top + n + o + p + b.collisionHeight - h - f) || g(k) > d) && (a.top += n + o + p)
                                    : l > 0 && ((c = a.top - b.collisionPosition.marginTop + n + o + p - i) > 0 || l > g(c)) && (a.top += n + o + p);
                            },
                        },
                        flipfit: {
                            left: function () {
                                a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments);
                            },
                            top: function () {
                                a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments);
                            },
                        },
                    });
            })(),
            a.ui.position,
            (a.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }),
            a.fn.extend({
                uniqueId: (function () {
                    var a = 0;
                    return function () {
                        return this.each(function () {
                            this.id || (this.id = "ui-id-" + ++a);
                        });
                    };
                })(),
                removeUniqueId: function () {
                    return this.each(function () {
                        /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id");
                    });
                },
            }),
            (a.ui.safeActiveElement = function (a) {
                var b;
                try {
                    b = a.activeElement;
                } catch (c) {
                    b = a.body;
                }
                return b || (b = a.body), b.nodeName || (b = a.body), b;
            }),
            a.widget("ui.menu", {
                version: "1.12.1",
                defaultElement: "<ul>",
                delay: 300,
                options: { icons: { submenu: "ui-icon-caret-1-e" }, items: "> *", menus: "ul", position: { my: "left top", at: "right top" }, role: "menu", blur: null, focus: null, select: null },
                _create: function () {
                    (this.activeMenu = this.element),
                        (this.mouseHandled = !1),
                        this.element.uniqueId().attr({ role: this.options.role, tabIndex: 0 }),
                        this._addClass("ui-menu", "ui-widget ui-widget-content"),
                        this._on({
                            "mousedown .ui-menu-item": function (a) {
                                a.preventDefault();
                            },
                            "click .ui-menu-item": function (b) {
                                var c = a(b.target),
                                    d = a(a.ui.safeActiveElement(this.document[0]));
                                !this.mouseHandled &&
                                    c.not(".ui-state-disabled").length &&
                                    (this.select(b),
                                    b.isPropagationStopped() || (this.mouseHandled = !0),
                                    c.has(".ui-menu").length
                                        ? this.expand(b)
                                        : !this.element.is(":focus") && d.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                            },
                            "mouseenter .ui-menu-item": function (b) {
                                if (!this.previousFilter) {
                                    var c = a(b.target).closest(".ui-menu-item"),
                                        d = a(b.currentTarget);
                                    c[0] === d[0] && (this._removeClass(d.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(b, d));
                                }
                            },
                            mouseleave: "collapseAll",
                            "mouseleave .ui-menu": "collapseAll",
                            focus: function (a, b) {
                                var c = this.active || this.element.find(this.options.items).eq(0);
                                b || this.focus(a, c);
                            },
                            blur: function (b) {
                                this._delay(function () {
                                    !a.contains(this.element[0], a.ui.safeActiveElement(this.document[0])) && this.collapseAll(b);
                                });
                            },
                            keydown: "_keydown",
                        }),
                        this.refresh(),
                        this._on(this.document, {
                            click: function (a) {
                                this._closeOnDocumentClick(a) && this.collapseAll(a), (this.mouseHandled = !1);
                            },
                        });
                },
                _destroy: function () {
                    var b = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                        c = b.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                    this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),
                        c.children().each(function () {
                            var b = a(this);
                            b.data("ui-menu-submenu-caret") && b.remove();
                        });
                },
                _keydown: function (b) {
                    var c,
                        d,
                        e,
                        f,
                        g = !0;
                    switch (b.keyCode) {
                        case a.ui.keyCode.PAGE_UP:
                            this.previousPage(b);
                            break;
                        case a.ui.keyCode.PAGE_DOWN:
                            this.nextPage(b);
                            break;
                        case a.ui.keyCode.HOME:
                            this._move("first", "first", b);
                            break;
                        case a.ui.keyCode.END:
                            this._move("last", "last", b);
                            break;
                        case a.ui.keyCode.UP:
                            this.previous(b);
                            break;
                        case a.ui.keyCode.DOWN:
                            this.next(b);
                            break;
                        case a.ui.keyCode.LEFT:
                            this.collapse(b);
                            break;
                        case a.ui.keyCode.RIGHT:
                            this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                            break;
                        case a.ui.keyCode.ENTER:
                        case a.ui.keyCode.SPACE:
                            this._activate(b);
                            break;
                        case a.ui.keyCode.ESCAPE:
                            this.collapse(b);
                            break;
                        default:
                            (g = !1),
                                (d = this.previousFilter || ""),
                                (f = !1),
                                (e = b.keyCode >= 96 && 105 >= b.keyCode ? "" + (b.keyCode - 96) : String.fromCharCode(b.keyCode)),
                                clearTimeout(this.filterTimer),
                                e === d ? (f = !0) : (e = d + e),
                                (c = this._filterMenuItems(e)),
                                (c = f && -1 !== c.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : c),
                                c.length || ((e = String.fromCharCode(b.keyCode)), (c = this._filterMenuItems(e))),
                                c.length
                                    ? (this.focus(b, c),
                                      (this.previousFilter = e),
                                      (this.filterTimer = this._delay(function () {
                                          delete this.previousFilter;
                                      }, 1e3)))
                                    : delete this.previousFilter;
                    }
                    g && b.preventDefault();
                },
                _activate: function (a) {
                    this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(a) : this.select(a));
                },
                refresh: function () {
                    var b,
                        c,
                        d,
                        e,
                        f,
                        g = this,
                        h = this.options.icons.submenu,
                        i = this.element.find(this.options.menus);
                    this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length),
                        (d = i
                            .filter(":not(.ui-menu)")
                            .hide()
                            .attr({ role: this.options.role, "aria-hidden": "true", "aria-expanded": "false" })
                            .each(function () {
                                var b = a(this),
                                    c = b.prev(),
                                    d = a("<span>").data("ui-menu-submenu-caret", !0);
                                g._addClass(d, "ui-menu-icon", "ui-icon " + h), c.attr("aria-haspopup", "true").prepend(d), b.attr("aria-labelledby", c.attr("id"));
                            })),
                        this._addClass(d, "ui-menu", "ui-widget ui-widget-content ui-front"),
                        (b = i.add(this.element)),
                        (c = b.find(this.options.items)),
                        c.not(".ui-menu-item").each(function () {
                            var b = a(this);
                            g._isDivider(b) && g._addClass(b, "ui-menu-divider", "ui-widget-content");
                        }),
                        (e = c.not(".ui-menu-item, .ui-menu-divider")),
                        (f = e.children().not(".ui-menu").uniqueId().attr({ tabIndex: -1, role: this._itemRole() })),
                        this._addClass(e, "ui-menu-item")._addClass(f, "ui-menu-item-wrapper"),
                        c.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                        this.active && !a.contains(this.element[0], this.active[0]) && this.blur();
                },
                _itemRole: function () {
                    return { menu: "menuitem", listbox: "option" }[this.options.role];
                },
                _setOption: function (a, b) {
                    if ("icons" === a) {
                        var c = this.element.find(".ui-menu-icon");
                        this._removeClass(c, null, this.options.icons.submenu)._addClass(c, null, b.submenu);
                    }
                    this._super(a, b);
                },
                _setOptionDisabled: function (a) {
                    this._super(a), this.element.attr("aria-disabled", a + ""), this._toggleClass(null, "ui-state-disabled", !!a);
                },
                focus: function (a, b) {
                    var c, d, e;
                    this.blur(a, a && "focus" === a.type),
                        this._scrollIntoView(b),
                        (this.active = b.first()),
                        (d = this.active.children(".ui-menu-item-wrapper")),
                        this._addClass(d, null, "ui-state-active"),
                        this.options.role && this.element.attr("aria-activedescendant", d.attr("id")),
                        (e = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper")),
                        this._addClass(e, null, "ui-state-active"),
                        a && "keydown" === a.type
                            ? this._close()
                            : (this.timer = this._delay(function () {
                                  this._close();
                              }, this.delay)),
                        (c = b.children(".ui-menu")),
                        c.length && a && /^mouse/.test(a.type) && this._startOpening(c),
                        (this.activeMenu = b.parent()),
                        this._trigger("focus", a, { item: b });
                },
                _scrollIntoView: function (b) {
                    var c, d, e, f, g, h;
                    this._hasScroll() &&
                        ((c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0),
                        (d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0),
                        (e = b.offset().top - this.activeMenu.offset().top - c - d),
                        (f = this.activeMenu.scrollTop()),
                        (g = this.activeMenu.height()),
                        (h = b.outerHeight()),
                        0 > e ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h));
                },
                blur: function (a, b) {
                    b || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", a, { item: this.active }), (this.active = null));
                },
                _startOpening: function (a) {
                    clearTimeout(this.timer),
                        "true" === a.attr("aria-hidden") &&
                            (this.timer = this._delay(function () {
                                this._close(), this._open(a);
                            }, this.delay));
                },
                _open: function (b) {
                    var c = a.extend({ of: this.active }, this.options.position);
                    clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c);
                },
                collapseAll: function (b, c) {
                    clearTimeout(this.timer),
                        (this.timer = this._delay(function () {
                            var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                            d.length || (d = this.element), this._close(d), this.blur(b), this._removeClass(d.find(".ui-state-active"), null, "ui-state-active"), (this.activeMenu = d);
                        }, this.delay));
                },
                _close: function (a) {
                    a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false");
                },
                _closeOnDocumentClick: function (b) {
                    return !a(b.target).closest(".ui-menu").length;
                },
                _isDivider: function (a) {
                    return !/[^\-\u2014\u2013\s]/.test(a.text());
                },
                collapse: function (a) {
                    var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                    b && b.length && (this._close(), this.focus(a, b));
                },
                expand: function (a) {
                    var b = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                    b &&
                        b.length &&
                        (this._open(b.parent()),
                        this._delay(function () {
                            this.focus(a, b);
                        }));
                },
                next: function (a) {
                    this._move("next", "first", a);
                },
                previous: function (a) {
                    this._move("prev", "last", a);
                },
                isFirstItem: function () {
                    return this.active && !this.active.prevAll(".ui-menu-item").length;
                },
                isLastItem: function () {
                    return this.active && !this.active.nextAll(".ui-menu-item").length;
                },
                _move: function (a, b, c) {
                    var d;
                    this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)),
                        (d && d.length && this.active) || (d = this.activeMenu.find(this.options.items)[b]()),
                        this.focus(c, d);
                },
                nextPage: function (b) {
                    var c, d, e;
                    return this.active
                        ? void (
                              this.isLastItem() ||
                              (this._hasScroll()
                                  ? ((d = this.active.offset().top),
                                    (e = this.element.height()),
                                    this.active.nextAll(".ui-menu-item").each(function () {
                                        return (c = a(this)), 0 > c.offset().top - d - e;
                                    }),
                                    this.focus(b, c))
                                  : this.focus(b, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
                          )
                        : void this.next(b);
                },
                previousPage: function (b) {
                    var c, d, e;
                    return this.active
                        ? void (
                              this.isFirstItem() ||
                              (this._hasScroll()
                                  ? ((d = this.active.offset().top),
                                    (e = this.element.height()),
                                    this.active.prevAll(".ui-menu-item").each(function () {
                                        return (c = a(this)), c.offset().top - d + e > 0;
                                    }),
                                    this.focus(b, c))
                                  : this.focus(b, this.activeMenu.find(this.options.items).first()))
                          )
                        : void this.next(b);
                },
                _hasScroll: function () {
                    return this.element.outerHeight() < this.element.prop("scrollHeight");
                },
                select: function (b) {
                    this.active = this.active || a(b.target).closest(".ui-menu-item");
                    var c = { item: this.active };
                    this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c);
                },
                _filterMenuItems: function (b) {
                    var c = b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                        d = RegExp("^" + c, "i");
                    return this.activeMenu
                        .find(this.options.items)
                        .filter(".ui-menu-item")
                        .filter(function () {
                            return d.test(a.trim(a(this).children(".ui-menu-item-wrapper").text()));
                        });
                },
            }),
            a.widget("ui.autocomplete", {
                version: "1.12.1",
                defaultElement: "<input>",
                options: {
                    appendTo: null,
                    autoFocus: !1,
                    delay: 300,
                    minLength: 1,
                    position: { my: "left top", at: "left bottom", collision: "none" },
                    source: null,
                    change: null,
                    close: null,
                    focus: null,
                    open: null,
                    response: null,
                    search: null,
                    select: null,
                },
                requestIndex: 0,
                pending: 0,
                _create: function () {
                    var b,
                        c,
                        d,
                        e = this.element[0].nodeName.toLowerCase(),
                        f = "textarea" === e,
                        g = "input" === e;
                    (this.isMultiLine = f || (!g && this._isContentEditable(this.element))),
                        (this.valueMethod = this.element[f || g ? "val" : "text"]),
                        (this.isNewMenu = !0),
                        this._addClass("ui-autocomplete-input"),
                        this.element.attr("autocomplete", "off"),
                        this._on(this.element, {
                            keydown: function (e) {
                                if (this.element.prop("readOnly")) return (b = !0), (d = !0), void (c = !0);
                                (b = !1), (d = !1), (c = !1);
                                var f = a.ui.keyCode;
                                switch (e.keyCode) {
                                    case f.PAGE_UP:
                                        (b = !0), this._move("previousPage", e);
                                        break;
                                    case f.PAGE_DOWN:
                                        (b = !0), this._move("nextPage", e);
                                        break;
                                    case f.UP:
                                        (b = !0), this._keyEvent("previous", e);
                                        break;
                                    case f.DOWN:
                                        (b = !0), this._keyEvent("next", e);
                                        break;
                                    case f.ENTER:
                                        this.menu.active && ((b = !0), e.preventDefault(), this.menu.select(e));
                                        break;
                                    case f.TAB:
                                        this.menu.active && this.menu.select(e);
                                        break;
                                    case f.ESCAPE:
                                        this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(e), e.preventDefault());
                                        break;
                                    default:
                                        (c = !0), this._searchTimeout(e);
                                }
                            },
                            keypress: function (d) {
                                if (b) return (b = !1), void ((!this.isMultiLine || this.menu.element.is(":visible")) && d.preventDefault());
                                if (!c) {
                                    var e = a.ui.keyCode;
                                    switch (d.keyCode) {
                                        case e.PAGE_UP:
                                            this._move("previousPage", d);
                                            break;
                                        case e.PAGE_DOWN:
                                            this._move("nextPage", d);
                                            break;
                                        case e.UP:
                                            this._keyEvent("previous", d);
                                            break;
                                        case e.DOWN:
                                            this._keyEvent("next", d);
                                    }
                                }
                            },
                            input: function (a) {
                                return d ? ((d = !1), void a.preventDefault()) : void this._searchTimeout(a);
                            },
                            focus: function () {
                                (this.selectedItem = null), (this.previous = this._value());
                            },
                            blur: function (a) {
                                return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(a), void this._change(a));
                            },
                        }),
                        this._initSource(),
                        (this.menu = a("<ul>").appendTo(this._appendTo()).menu({ role: null }).hide().menu("instance")),
                        this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
                        this._on(this.menu.element, {
                            mousedown: function (b) {
                                b.preventDefault(),
                                    (this.cancelBlur = !0),
                                    this._delay(function () {
                                        delete this.cancelBlur, this.element[0] !== a.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus");
                                    });
                            },
                            menufocus: function (b, c) {
                                var d, e;
                                return this.isNewMenu && ((this.isNewMenu = !1), b.originalEvent && /^mouse/.test(b.originalEvent.type))
                                    ? (this.menu.blur(),
                                      void this.document.one("mousemove", function () {
                                          a(b.target).trigger(b.originalEvent);
                                      }))
                                    : ((e = c.item.data("ui-autocomplete-item")),
                                      !1 !== this._trigger("focus", b, { item: e }) && b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(e.value),
                                      void ((d = c.item.attr("aria-label") || e.value) && a.trim(d).length && (this.liveRegion.children().hide(), a("<div>").text(d).appendTo(this.liveRegion))));
                            },
                            menuselect: function (b, c) {
                                var d = c.item.data("ui-autocomplete-item"),
                                    e = this.previous;
                                this.element[0] !== a.ui.safeActiveElement(this.document[0]) &&
                                    (this.element.trigger("focus"),
                                    (this.previous = e),
                                    this._delay(function () {
                                        (this.previous = e), (this.selectedItem = d);
                                    })),
                                    !1 !== this._trigger("select", b, { item: d }) && this._value(d.value),
                                    (this.term = this._value()),
                                    this.close(b),
                                    (this.selectedItem = d);
                            },
                        }),
                        (this.liveRegion = a("<div>", { role: "status", "aria-live": "assertive", "aria-relevant": "additions" }).appendTo(this.document[0].body)),
                        this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                        this._on(this.window, {
                            beforeunload: function () {
                                this.element.removeAttr("autocomplete");
                            },
                        });
                },
                _destroy: function () {
                    clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();
                },
                _setOption: function (a, b) {
                    this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), "disabled" === a && b && this.xhr && this.xhr.abort();
                },
                _isEventTargetInWidget: function (b) {
                    var c = this.menu.element[0];
                    return b.target === this.element[0] || b.target === c || a.contains(c, b.target);
                },
                _closeOnClickOutside: function (a) {
                    this._isEventTargetInWidget(a) || this.close();
                },
                _appendTo: function () {
                    var b = this.options.appendTo;
                    return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), (b && b[0]) || (b = this.element.closest(".ui-front, dialog")), b.length || (b = this.document[0].body), b;
                },
                _initSource: function () {
                    var b,
                        c,
                        d = this;
                    a.isArray(this.options.source)
                        ? ((b = this.options.source),
                          (this.source = function (c, d) {
                              d(a.ui.autocomplete.filter(b, c.term));
                          }))
                        : "string" == typeof this.options.source
                        ? ((c = this.options.source),
                          (this.source = function (b, e) {
                              d.xhr && d.xhr.abort(),
                                  (d.xhr = a.ajax({
                                      url: c,
                                      data: b,
                                      dataType: "json",
                                      success: function (a) {
                                          e(a);
                                      },
                                      error: function () {
                                          e([]);
                                      },
                                  }));
                          }))
                        : (this.source = this.options.source);
                },
                _searchTimeout: function (a) {
                    clearTimeout(this.searching),
                        (this.searching = this._delay(function () {
                            var b = this.term === this._value(),
                                c = this.menu.element.is(":visible"),
                                d = a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
                            (!b || (b && !c && !d)) && ((this.selectedItem = null), this.search(null, a));
                        }, this.options.delay));
                },
                search: function (a, b) {
                    return (a = null != a ? a : this._value()), (this.term = this._value()), a.length < this.options.minLength ? this.close(b) : !1 !== this._trigger("search", b) ? this._search(a) : void 0;
                },
                _search: function (a) {
                    this.pending++, this._addClass("ui-autocomplete-loading"), (this.cancelSearch = !1), this.source({ term: a }, this._response());
                },
                _response: function () {
                    var b = ++this.requestIndex;
                    return a.proxy(function (a) {
                        b === this.requestIndex && this.__response(a), --this.pending || this._removeClass("ui-autocomplete-loading");
                    }, this);
                },
                __response: function (a) {
                    a && (a = this._normalize(a)), this._trigger("response", null, { content: a }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close();
                },
                close: function (a) {
                    (this.cancelSearch = !0), this._close(a);
                },
                _close: function (a) {
                    this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), (this.isNewMenu = !0), this._trigger("close", a));
                },
                _change: function (a) {
                    this.previous !== this._value() && this._trigger("change", a, { item: this.selectedItem });
                },
                _normalize: function (b) {
                    return b.length && b[0].label && b[0].value
                        ? b
                        : a.map(b, function (b) {
                              return "string" == typeof b ? { label: b, value: b } : a.extend({}, b, { label: b.label || b.value, value: b.value || b.label });
                          });
                },
                _suggest: function (b) {
                    var c = this.menu.element.empty();
                    this._renderMenu(c, b),
                        (this.isNewMenu = !0),
                        this.menu.refresh(),
                        c.show(),
                        this._resizeMenu(),
                        c.position(a.extend({ of: this.element }, this.options.position)),
                        this.options.autoFocus && this.menu.next(),
                        this._on(this.document, { mousedown: "_closeOnClickOutside" });
                },
                _resizeMenu: function () {
                    var a = this.menu.element;
                    a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()));
                },
                _renderMenu: function (b, c) {
                    var d = this;
                    a.each(c, function (a, c) {
                        d._renderItemData(b, c);
                    });
                },
                _renderItemData: function (a, b) {
                    return this._renderItem(a, b).data("ui-autocomplete-item", b);
                },
                _renderItem: function (b, c) {
                    return a("<li>").append(a("<div>").text(c.label)).appendTo(b);
                },
                _move: function (a, b) {
                    return this.menu.element.is(":visible")
                        ? (this.menu.isFirstItem() && /^previous/.test(a)) || (this.menu.isLastItem() && /^next/.test(a))
                            ? (this.isMultiLine || this._value(this.term), void this.menu.blur())
                            : void this.menu[a](b)
                        : void this.search(null, b);
                },
                widget: function () {
                    return this.menu.element;
                },
                _value: function () {
                    return this.valueMethod.apply(this.element, arguments);
                },
                _keyEvent: function (a, b) {
                    (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(a, b), b.preventDefault());
                },
                _isContentEditable: function (a) {
                    if (!a.length) return !1;
                    var b = a.prop("contentEditable");
                    return "inherit" === b ? this._isContentEditable(a.parent()) : "true" === b;
                },
            }),
            a.extend(a.ui.autocomplete, {
                escapeRegex: function (a) {
                    return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                },
                filter: function (b, c) {
                    var d = RegExp(a.ui.autocomplete.escapeRegex(c), "i");
                    return a.grep(b, function (a) {
                        return d.test(a.label || a.value || a);
                    });
                },
            }),
            a.widget("ui.autocomplete", a.ui.autocomplete, {
                options: {
                    messages: {
                        noResults: "No search results.",
                        results: function (a) {
                            return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                        },
                    },
                },
                __response: function (b) {
                    var c;
                    this._superApply(arguments),
                        this.options.disabled ||
                            this.cancelSearch ||
                            ((c = b && b.length ? this.options.messages.results(b.length) : this.options.messages.noResults), this.liveRegion.children().hide(), a("<div>").text(c).appendTo(this.liveRegion));
                },
            }),
            a.ui.autocomplete;
    }),
    void 0 === History.Adapter &&
        ("object" != typeof JSON && (JSON = {}),
        (function () {
            "use strict";
            function f(a) {
                return a < 10 ? "0" + a : a;
            }
            function quote(a) {
                return (
                    (escapable.lastIndex = 0),
                    escapable.test(a)
                        ? '"' +
                          a.replace(escapable, function (a) {
                              var b = meta[a];
                              return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                          }) +
                          '"'
                        : '"' + a + '"'
                );
            }
            function str(a, b) {
                var c,
                    d,
                    e,
                    f,
                    g,
                    h = gap,
                    i = b[a];
                switch ((i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i)) {
                    case "string":
                        return quote(i);
                    case "number":
                        return isFinite(i) ? String(i) : "null";
                    case "boolean":
                    case "null":
                        return String(i);
                    case "object":
                        if (!i) return "null";
                        if (((gap += indent), (g = []), "[object Array]" === Object.prototype.toString.apply(i))) {
                            for (f = i.length, c = 0; c < f; c += 1) g[c] = str(c, i) || "null";
                            return (e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]"), (gap = h), e;
                        }
                        if (rep && "object" == typeof rep) for (f = rep.length, c = 0; c < f; c += 1) "string" == typeof rep[c] && ((d = rep[c]), (e = str(d, i)) && g.push(quote(d) + (gap ? ": " : ":") + e));
                        else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i)) && g.push(quote(d) + (gap ? ": " : ":") + e);
                        return (e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}"), (gap = h), e;
                }
            }
            "function" != typeof Date.prototype.toJSON &&
                ((Date.prototype.toJSON = function (a) {
                    return isFinite(this.valueOf())
                        ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
                        : null;
                }),
                (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
                    return this.valueOf();
                }));
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap,
                indent,
                meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" },
                rep;
            "function" != typeof JSON.stringify &&
                (JSON.stringify = function (a, b, c) {
                    var d;
                    if (((gap = ""), (indent = ""), "number" == typeof c)) for (d = 0; d < c; d += 1) indent += " ";
                    else "string" == typeof c && (indent = c);
                    if (((rep = b), !b || "function" == typeof b || ("object" == typeof b && "number" == typeof b.length))) return str("", { "": a });
                    throw new Error("JSON.stringify");
                }),
                "function" != typeof JSON.parse &&
                    (JSON.parse = function (text, reviver) {
                        function walk(a, b) {
                            var c,
                                d,
                                e = a[b];
                            if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && ((d = walk(e, c)), void 0 !== d ? (e[c] = d) : delete e[c]);
                            return reviver.call(a, b, e);
                        }
                        var j;
                        if (
                            ((text = String(text)),
                            (cx.lastIndex = 0),
                            cx.test(text) &&
                                (text = text.replace(cx, function (a) {
                                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                                })),
                            /^[\],:{}\s]*$/.test(
                                text
                                    .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                                    .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                            ))
                        )
                            return (j = eval("(" + text + ")")), "function" == typeof reviver ? walk({ "": j }, "") : j;
                        throw new SyntaxError("JSON.parse");
                    });
        })(),
        (function (a, b) {
            "use strict";
            var c = (a.History = a.History || {}),
                d = a.jQuery;
            if (void 0 !== c.Adapter) throw new Error("History.js Adapter has already been loaded...");
            (c.Adapter = {
                bind: function (a, b, c) {
                    d(a).bind(b, c);
                },
                trigger: function (a, b, c) {
                    d(a).trigger(b, c);
                },
                extractEventData: function (a, b, c) {
                    return (b && b.originalEvent && b.originalEvent[a]) || (c && c[a]) || void 0;
                },
                onDomLoad: function (a) {
                    d(a);
                },
            }),
                void 0 !== c.init && c.init();
        })(window),
        (function (a, b) {
            "use strict";
            var c = a.document,
                d = a.setTimeout || d,
                e = a.clearTimeout || e,
                f = a.setInterval || f,
                g = (a.History = a.History || {});
            if (void 0 !== g.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
            (g.initHtml4 = function () {
                if (void 0 !== g.initHtml4.initialized) return !1;
                (g.initHtml4.initialized = !0),
                    (g.enabled = !0),
                    (g.savedHashes = []),
                    (g.isLastHash = function (a) {
                        return a === g.getHashByIndex();
                    }),
                    (g.isHashEqual = function (a, b) {
                        return (a = encodeURIComponent(a).replace(/%25/g, "%")), (b = encodeURIComponent(b).replace(/%25/g, "%")), a === b;
                    }),
                    (g.saveHash = function (a) {
                        return !g.isLastHash(a) && (g.savedHashes.push(a), !0);
                    }),
                    (g.getHashByIndex = function (a) {
                        return void 0 === a ? g.savedHashes[g.savedHashes.length - 1] : a < 0 ? g.savedHashes[g.savedHashes.length + a] : g.savedHashes[a];
                    }),
                    (g.discardedHashes = {}),
                    (g.discardedStates = {}),
                    (g.discardState = function (a, b, c) {
                        var d,
                            e = g.getHashByState(a);
                        return (d = { discardedState: a, backState: c, forwardState: b }), (g.discardedStates[e] = d), !0;
                    }),
                    (g.discardHash = function (a, b, c) {
                        var d = { discardedHash: a, backState: c, forwardState: b };
                        return (g.discardedHashes[a] = d), !0;
                    }),
                    (g.discardedState = function (a) {
                        var b = g.getHashByState(a);
                        return g.discardedStates[b] || !1;
                    }),
                    (g.discardedHash = function (a) {
                        return g.discardedHashes[a] || !1;
                    }),
                    (g.recycleState = function (a) {
                        var b = g.getHashByState(a);
                        return g.discardedState(a) && delete g.discardedStates[b], !0;
                    }),
                    g.emulated.hashChange &&
                        ((g.hashChangeInit = function () {
                            g.checkerFunction = null;
                            var b,
                                d,
                                e,
                                h,
                                i = "",
                                j = Boolean(g.getHash());
                            return (
                                g.isInternetExplorer()
                                    ? ((b = "historyjs-iframe"),
                                      (d = c.createElement("iframe")),
                                      d.setAttribute("id", b),
                                      d.setAttribute("src", "#"),
                                      (d.style.display = "none"),
                                      c.body.appendChild(d),
                                      d.contentWindow.document.open(),
                                      d.contentWindow.document.close(),
                                      (e = ""),
                                      (h = !1),
                                      (g.checkerFunction = function () {
                                          if (h) return !1;
                                          h = !0;
                                          var b = g.getHash(),
                                              c = g.getHash(d.contentWindow.document);
                                          return (
                                              b !== i
                                                  ? ((i = b),
                                                    c !== b && ((e = c = b), d.contentWindow.document.open(), d.contentWindow.document.close(), (d.contentWindow.document.location.hash = g.escapeHash(b))),
                                                    g.Adapter.trigger(a, "hashchange"))
                                                  : c !== e && ((e = c), j && "" === c ? g.back() : g.setHash(c, !1)),
                                              (h = !1),
                                              !0
                                          );
                                      }))
                                    : (g.checkerFunction = function () {
                                          var b = g.getHash() || "";
                                          return b !== i && ((i = b), g.Adapter.trigger(a, "hashchange")), !0;
                                      }),
                                g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval)),
                                !0
                            );
                        }),
                        g.Adapter.onDomLoad(g.hashChangeInit)),
                    g.emulated.pushState &&
                        ((g.onHashChange = function (b) {
                            var c,
                                d = (b && b.newURL) || g.getLocationHref(),
                                e = g.getHashByUrl(d),
                                f = null;
                            return g.isLastHash(e)
                                ? (g.busy(!1), !1)
                                : (g.doubleCheckComplete(),
                                  g.saveHash(e),
                                  e && g.isTraditionalAnchor(e)
                                      ? (g.Adapter.trigger(a, "anchorchange"), g.busy(!1), !1)
                                      : ((f = g.extractState(g.getFullUrl(e || g.getLocationHref()), !0)),
                                        g.isLastSavedState(f)
                                            ? (g.busy(!1), !1)
                                            : (g.getHashByState(f),
                                              (c = g.discardedState(f)),
                                              c ? (g.getHashByIndex(-2) === g.getHashByState(c.forwardState) ? g.back(!1) : g.forward(!1), !1) : (g.pushState(f.data, f.title, encodeURI(f.url), !1), !0))));
                        }),
                        g.Adapter.bind(a, "hashchange", g.onHashChange),
                        (g.pushState = function (b, c, d, e) {
                            if (((d = encodeURI(d).replace(/%25/g, "%")), g.getHashByUrl(d))) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                            if (!1 !== e && g.busy()) return g.pushQueue({ scope: g, callback: g.pushState, args: arguments, queue: e }), !1;
                            g.busy(!0);
                            var f = g.createStateObject(b, c, d),
                                h = g.getHashByState(f),
                                i = g.getState(!1),
                                j = g.getHashByState(i),
                                k = g.getHash(),
                                l = g.expectedStateId == f.id;
                            return (
                                g.storeState(f),
                                (g.expectedStateId = f.id),
                                g.recycleState(f),
                                g.setTitle(f),
                                h === j ? (g.busy(!1), !1) : (g.saveState(f), l || g.Adapter.trigger(a, "statechange"), !g.isHashEqual(h, k) && !g.isHashEqual(h, g.getShortUrl(g.getLocationHref())) && g.setHash(h, !1), g.busy(!1), !0)
                            );
                        }),
                        (g.replaceState = function (b, c, d, e) {
                            if (((d = encodeURI(d).replace(/%25/g, "%")), g.getHashByUrl(d))) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                            if (!1 !== e && g.busy()) return g.pushQueue({ scope: g, callback: g.replaceState, args: arguments, queue: e }), !1;
                            g.busy(!0);
                            var f = g.createStateObject(b, c, d),
                                h = g.getHashByState(f),
                                i = g.getState(!1),
                                j = g.getHashByState(i),
                                k = g.getStateByIndex(-2);
                            return (
                                g.discardState(i, f, k),
                                h === j ? (g.storeState(f), (g.expectedStateId = f.id), g.recycleState(f), g.setTitle(f), g.saveState(f), g.Adapter.trigger(a, "statechange"), g.busy(!1)) : g.pushState(f.data, f.title, f.url, !1),
                                !0
                            );
                        })),
                    g.emulated.pushState &&
                        g.getHash() &&
                        !g.emulated.hashChange &&
                        g.Adapter.onDomLoad(function () {
                            g.Adapter.trigger(a, "hashchange");
                        });
            }),
                void 0 !== g.init && g.init();
        })(window),
        (function (a, b) {
            "use strict";
            var c = a.console || b,
                d = a.document,
                e = a.navigator,
                f = !1,
                g = a.setTimeout,
                h = a.clearTimeout,
                i = a.setInterval,
                j = a.clearInterval,
                k = a.JSON,
                l = a.alert,
                m = (a.History = a.History || {}),
                n = a.history;
            try {
                (f = a.sessionStorage), f.setItem("TEST", "1"), f.removeItem("TEST");
            } catch (a) {
                f = !1;
            }
            if (((k.stringify = k.stringify || k.encode), (k.parse = k.parse || k.decode), void 0 !== m.init)) throw new Error("History.js Core has already been loaded...");
            (m.init = function (a) {
                return void 0 !== m.Adapter && (void 0 !== m.initCore && m.initCore(), void 0 !== m.initHtml4 && m.initHtml4(), !0);
            }),
                (m.initCore = function (o) {
                    if (void 0 !== m.initCore.initialized) return !1;
                    if (
                        ((m.initCore.initialized = !0),
                        (m.options = m.options || {}),
                        (m.options.hashChangeInterval = m.options.hashChangeInterval || 100),
                        (m.options.safariPollInterval = m.options.safariPollInterval || 500),
                        (m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500),
                        (m.options.disableSuid = m.options.disableSuid || !1),
                        (m.options.storeInterval = m.options.storeInterval || 1e3),
                        (m.options.busyDelay = m.options.busyDelay || 250),
                        (m.options.debug = m.options.debug || !1),
                        (m.options.initialTitle = m.options.initialTitle || d.title),
                        (m.options.html4Mode = m.options.html4Mode || !1),
                        (m.options.delayInit = m.options.delayInit || !1),
                        (m.intervalList = []),
                        (m.clearAllIntervals = function () {
                            var a,
                                b = m.intervalList;
                            if (void 0 !== b && null !== b) {
                                for (a = 0; a < b.length; a++) j(b[a]);
                                m.intervalList = null;
                            }
                        }),
                        (m.debug = function () {
                            (m.options.debug || !1) && m.log.apply(m, arguments);
                        }),
                        (m.log = function () {
                            var a,
                                b,
                                e,
                                f,
                                g,
                                h = void 0 !== c && void 0 !== c.log && void 0 !== c.log.apply,
                                i = d.getElementById("log");
                            for (
                                h ? ((f = Array.prototype.slice.call(arguments)), (a = f.shift()), void 0 !== c.debug ? c.debug.apply(c, [a, f]) : c.log.apply(c, [a, f])) : (a = "\n" + arguments[0] + "\n"), b = 1, e = arguments.length;
                                b < e;
                                ++b
                            ) {
                                if ("object" == typeof (g = arguments[b]) && void 0 !== k)
                                    try {
                                        g = k.stringify(g);
                                    } catch (a) {}
                                a += "\n" + g + "\n";
                            }
                            return i ? ((i.value += a + "\n-----\n"), (i.scrollTop = i.scrollHeight - i.clientHeight)) : h || l(a), !0;
                        }),
                        (m.getInternetExplorerMajorVersion = function () {
                            return (m.getInternetExplorerMajorVersion.cached =
                                void 0 !== m.getInternetExplorerMajorVersion.cached
                                    ? m.getInternetExplorerMajorVersion.cached
                                    : (function () {
                                          for (var a = 3, b = d.createElement("div"), c = b.getElementsByTagName("i"); (b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e") && c[0]; );
                                          return a > 4 && a;
                                      })());
                        }),
                        (m.isInternetExplorer = function () {
                            return (m.isInternetExplorer.cached = void 0 !== m.isInternetExplorer.cached ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion()));
                        }),
                        m.options.html4Mode
                            ? (m.emulated = { pushState: !0, hashChange: !0 })
                            : (m.emulated = {
                                  pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
                                  hashChange: Boolean(!("onhashchange" in a || "onhashchange" in d) || (m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)),
                              }),
                        (m.enabled = !m.emulated.pushState),
                        (m.bugs = {
                            setHash: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
                            safariPoll: Boolean(!m.emulated.pushState && "Apple Computer, Inc." === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
                            ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
                            hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7),
                        }),
                        (m.isEmptyObject = function (a) {
                            for (var b in a) if (a.hasOwnProperty(b)) return !1;
                            return !0;
                        }),
                        (m.cloneObject = function (a) {
                            var b, c;
                            return a ? ((b = k.stringify(a)), (c = k.parse(b))) : (c = {}), c;
                        }),
                        (m.getRootUrl = function () {
                            var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
                            return d.location.port && (a += ":" + d.location.port), (a += "/");
                        }),
                        (m.getBaseHref = function () {
                            var a = d.getElementsByTagName("base"),
                                b = null,
                                c = "";
                            return 1 === a.length && ((b = a[0]), (c = b.href.replace(/[^\/]+$/, ""))), (c = c.replace(/\/+$/, "")), c && (c += "/"), c;
                        }),
                        (m.getBaseUrl = function () {
                            return m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
                        }),
                        (m.getPageUrl = function () {
                            return ((m.getState(!1, !1) || {}).url || m.getLocationHref()).replace(/\/+$/, "").replace(/[^\/]+$/, function (a, b, c) {
                                return /\./.test(a) ? a : a + "/";
                            });
                        }),
                        (m.getBasePageUrl = function () {
                            return (
                                m
                                    .getLocationHref()
                                    .replace(/[#\?].*/, "")
                                    .replace(/[^\/]+$/, function (a, b, c) {
                                        return /[^\/]$/.test(a) ? "" : a;
                                    })
                                    .replace(/\/+$/, "") + "/"
                            );
                        }),
                        (m.getFullUrl = function (a, b) {
                            var c = a,
                                d = a.substring(0, 1);
                            return (
                                (b = void 0 === b || b),
                                /[a-z]+\:\/\//.test(a) ||
                                    (c =
                                        "/" === d
                                            ? m.getRootUrl() + a.replace(/^\/+/, "")
                                            : "#" === d
                                            ? m.getPageUrl().replace(/#.*/, "") + a
                                            : "?" === d
                                            ? m.getPageUrl().replace(/[\?#].*/, "") + a
                                            : b
                                            ? m.getBaseUrl() + a.replace(/^(\.\/)+/, "")
                                            : m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")),
                                c.replace(/\#$/, "")
                            );
                        }),
                        (m.getShortUrl = function (a) {
                            var b = a,
                                c = m.getBaseUrl(),
                                d = m.getRootUrl();
                            return m.emulated.pushState && (b = b.replace(c, "")), (b = b.replace(d, "/")), m.isTraditionalAnchor(b) && (b = "./" + b), (b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""));
                        }),
                        (m.getLocationHref = function (a) {
                            return (
                                (a = a || d),
                                a.URL === a.location.href
                                    ? a.location.href
                                    : a.location.href === decodeURIComponent(a.URL)
                                    ? a.URL
                                    : a.location.hash && decodeURIComponent(a.location.href.replace(/^[^#]+/, "")) === a.location.hash
                                    ? a.location.href
                                    : -1 == a.URL.indexOf("#") && -1 != a.location.href.indexOf("#")
                                    ? a.location.href
                                    : a.URL || a.location.href
                            );
                        }),
                        (m.store = {}),
                        (m.idToState = m.idToState || {}),
                        (m.stateToId = m.stateToId || {}),
                        (m.urlToId = m.urlToId || {}),
                        (m.storedStates = m.storedStates || []),
                        (m.savedStates = m.savedStates || []),
                        (m.normalizeStore = function () {
                            (m.store.idToState = m.store.idToState || {}), (m.store.urlToId = m.store.urlToId || {}), (m.store.stateToId = m.store.stateToId || {});
                        }),
                        (m.getState = function (a, b) {
                            void 0 === a && (a = !0), void 0 === b && (b = !0);
                            var c = m.getLastSavedState();
                            return !c && b && (c = m.createStateObject()), a && ((c = m.cloneObject(c)), (c.url = c.cleanUrl || c.url)), c;
                        }),
                        (m.getIdByState = function (a) {
                            var b,
                                c = m.extractId(a.url);
                            if (!c)
                                if (((b = m.getStateString(a)), void 0 !== m.stateToId[b])) c = m.stateToId[b];
                                else if (void 0 !== m.store.stateToId[b]) c = m.store.stateToId[b];
                                else {
                                    for (; (c = new Date().getTime() + String(Math.random()).replace(/\D/g, "")), void 0 !== m.idToState[c] || void 0 !== m.store.idToState[c]; );
                                    (m.stateToId[b] = c), (m.idToState[c] = a);
                                }
                            return c;
                        }),
                        (m.normalizeState = function (a) {
                            var b, c;
                            return (
                                (a && "object" == typeof a) || (a = {}),
                                void 0 !== a.normalized
                                    ? a
                                    : ((a.data && "object" == typeof a.data) || (a.data = {}),
                                      (b = {}),
                                      (b.normalized = !0),
                                      (b.title = a.title || ""),
                                      (b.url = m.getFullUrl(a.url ? a.url : m.getLocationHref())),
                                      (b.hash = m.getShortUrl(b.url)),
                                      (b.data = m.cloneObject(a.data)),
                                      (b.id = m.getIdByState(b)),
                                      (b.cleanUrl = b.url.replace(/\??\&_suid.*/, "")),
                                      (b.url = b.cleanUrl),
                                      (c = !m.isEmptyObject(b.data)),
                                      (b.title || c) && !0 !== m.options.disableSuid && ((b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, "")), /\?/.test(b.hash) || (b.hash += "?"), (b.hash += "&_suid=" + b.id)),
                                      (b.hashedUrl = m.getFullUrl(b.hash)),
                                      (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl),
                                      b)
                            );
                        }),
                        (m.createStateObject = function (a, b, c) {
                            var d = { data: a, title: b, url: c };
                            return (d = m.normalizeState(d));
                        }),
                        (m.getStateById = function (a) {
                            return (a = String(a)), m.idToState[a] || m.store.idToState[a] || b;
                        }),
                        (m.getStateString = function (a) {
                            var b, c;
                            return (b = m.normalizeState(a)), (c = { data: b.data, title: a.title, url: a.url }), k.stringify(c);
                        }),
                        (m.getStateId = function (a) {
                            var b;
                            return (b = m.normalizeState(a)), b.id;
                        }),
                        (m.getHashByState = function (a) {
                            var b;
                            return (b = m.normalizeState(a)), b.hash;
                        }),
                        (m.extractId = function (a) {
                            var b, c;
                            return (c = -1 != a.indexOf("#") ? a.split("#")[0] : a), (b = /(.*)\&_suid=([0-9]+)$/.exec(c)), b && b[1], (b ? String(b[2] || "") : "") || !1;
                        }),
                        (m.isTraditionalAnchor = function (a) {
                            return !/[\/\?\.]/.test(a);
                        }),
                        (m.extractState = function (a, b) {
                            var c,
                                d,
                                e = null;
                            return (
                                (b = b || !1),
                                (c = m.extractId(a)),
                                c && (e = m.getStateById(c)),
                                e || ((d = m.getFullUrl(a)), (c = m.getIdByUrl(d) || !1), c && (e = m.getStateById(c)), !e && b && !m.isTraditionalAnchor(a) && (e = m.createStateObject(null, null, d))),
                                e
                            );
                        }),
                        (m.getIdByUrl = function (a) {
                            return m.urlToId[a] || m.store.urlToId[a] || b;
                        }),
                        (m.getLastSavedState = function () {
                            return m.savedStates[m.savedStates.length - 1] || b;
                        }),
                        (m.getLastStoredState = function () {
                            return m.storedStates[m.storedStates.length - 1] || b;
                        }),
                        (m.hasUrlDuplicate = function (a) {
                            var b;
                            return (b = m.extractState(a.url)) && b.id !== a.id;
                        }),
                        (m.storeState = function (a) {
                            return (m.urlToId[a.url] = a.id), m.storedStates.push(m.cloneObject(a)), a;
                        }),
                        (m.isLastSavedState = function (a) {
                            var b,
                                c,
                                d,
                                e = !1;
                            return m.savedStates.length && ((b = a.id), (c = m.getLastSavedState()), (d = c.id), (e = b === d)), e;
                        }),
                        (m.saveState = function (a) {
                            return !m.isLastSavedState(a) && (m.savedStates.push(m.cloneObject(a)), !0);
                        }),
                        (m.getStateByIndex = function (a) {
                            return void 0 === a ? m.savedStates[m.savedStates.length - 1] : a < 0 ? m.savedStates[m.savedStates.length + a] : m.savedStates[a];
                        }),
                        (m.getCurrentIndex = function () {
                            return m.savedStates.length < 1 ? 0 : m.savedStates.length - 1;
                        }),
                        (m.getHash = function (a) {
                            var b = m.getLocationHref(a);
                            return m.getHashByUrl(b);
                        }),
                        (m.unescapeHash = function (a) {
                            var b = m.normalizeHash(a);
                            return (b = decodeURIComponent(b));
                        }),
                        (m.normalizeHash = function (a) {
                            return a.replace(/[^#]*#/, "").replace(/#.*/, "");
                        }),
                        (m.setHash = function (a, b) {
                            var c, e;
                            return !1 !== b && m.busy()
                                ? (m.pushQueue({ scope: m, callback: m.setHash, args: arguments, queue: b }), !1)
                                : (m.busy(!0),
                                  (c = m.extractState(a, !0)),
                                  c && !m.emulated.pushState ? m.pushState(c.data, c.title, c.url, !1) : m.getHash() !== a && (m.bugs.setHash ? ((e = m.getPageUrl()), m.pushState(null, null, e + "#" + a, !1)) : (d.location.hash = a)),
                                  m);
                        }),
                        (m.escapeHash = function (b) {
                            var c = m.normalizeHash(b);
                            return (c = a.encodeURIComponent(c)), m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), c;
                        }),
                        (m.getHashByUrl = function (a) {
                            var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                            return (b = m.unescapeHash(b));
                        }),
                        (m.setTitle = function (a) {
                            var b,
                                c = a.title;
                            c || ((b = m.getStateByIndex(0)) && b.url === a.url && (c = b.title || m.options.initialTitle));
                            try {
                                d.getElementsByTagName("title")[0].innerHTML = c.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ");
                            } catch (a) {}
                            return (d.title = c), m;
                        }),
                        (m.queues = []),
                        (m.busy = function (a) {
                            if ((void 0 !== a ? (m.busy.flag = a) : void 0 === m.busy.flag && (m.busy.flag = !1), !m.busy.flag)) {
                                h(m.busy.timeout);
                                var b = function () {
                                    var a, c, d;
                                    if (!m.busy.flag) for (a = m.queues.length - 1; a >= 0; --a) (c = m.queues[a]), 0 !== c.length && ((d = c.shift()), m.fireQueueItem(d), (m.busy.timeout = g(b, m.options.busyDelay)));
                                };
                                m.busy.timeout = g(b, m.options.busyDelay);
                            }
                            return m.busy.flag;
                        }),
                        (m.busy.flag = !1),
                        (m.fireQueueItem = function (a) {
                            return a.callback.apply(a.scope || m, a.args || []);
                        }),
                        (m.pushQueue = function (a) {
                            return (m.queues[a.queue || 0] = m.queues[a.queue || 0] || []), m.queues[a.queue || 0].push(a), m;
                        }),
                        (m.queue = function (a, b) {
                            return "function" == typeof a && (a = { callback: a }), void 0 !== b && (a.queue = b), m.busy() ? m.pushQueue(a) : m.fireQueueItem(a), m;
                        }),
                        (m.clearQueue = function () {
                            return (m.busy.flag = !1), (m.queues = []), m;
                        }),
                        (m.stateChanged = !1),
                        (m.doubleChecker = !1),
                        (m.doubleCheckComplete = function () {
                            return (m.stateChanged = !0), m.doubleCheckClear(), m;
                        }),
                        (m.doubleCheckClear = function () {
                            return m.doubleChecker && (h(m.doubleChecker), (m.doubleChecker = !1)), m;
                        }),
                        (m.doubleCheck = function (a) {
                            return (
                                (m.stateChanged = !1),
                                m.doubleCheckClear(),
                                m.bugs.ieDoubleCheck &&
                                    (m.doubleChecker = g(function () {
                                        return m.doubleCheckClear(), m.stateChanged || a(), !0;
                                    }, m.options.doubleCheckInterval)),
                                m
                            );
                        }),
                        (m.safariStatePoll = function () {
                            var b,
                                c = m.extractState(m.getLocationHref());
                            if (!m.isLastSavedState(c)) return (b = c), b || (b = m.createStateObject()), m.Adapter.trigger(a, "popstate"), m;
                        }),
                        (m.back = function (a) {
                            return !1 !== a && m.busy()
                                ? (m.pushQueue({ scope: m, callback: m.back, args: arguments, queue: a }), !1)
                                : (m.busy(!0),
                                  m.doubleCheck(function () {
                                      m.back(!1);
                                  }),
                                  n.go(-1),
                                  !0);
                        }),
                        (m.forward = function (a) {
                            return !1 !== a && m.busy()
                                ? (m.pushQueue({ scope: m, callback: m.forward, args: arguments, queue: a }), !1)
                                : (m.busy(!0),
                                  m.doubleCheck(function () {
                                      m.forward(!1);
                                  }),
                                  n.go(1),
                                  !0);
                        }),
                        (m.go = function (a, b) {
                            var c;
                            if (a > 0) for (c = 1; c <= a; ++c) m.forward(b);
                            else {
                                if (!(a < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                                for (c = -1; c >= a; --c) m.back(b);
                            }
                            return m;
                        }),
                        m.emulated.pushState)
                    ) {
                        var p = function () {};
                        (m.pushState = m.pushState || p), (m.replaceState = m.replaceState || p);
                    } else
                        (m.onPopState = function (b, c) {
                            var d,
                                e,
                                f = !1,
                                g = !1;
                            return (
                                m.doubleCheckComplete(),
                                (d = m.getHash()),
                                d
                                    ? ((e = m.extractState(d || m.getLocationHref(), !0)), e ? m.replaceState(e.data, e.title, e.url, !1) : (m.Adapter.trigger(a, "anchorchange"), m.busy(!1)), (m.expectedStateId = !1), !1)
                                    : ((f = m.Adapter.extractEventData("state", b, c) || !1),
                                      (g = f ? m.getStateById(f) : m.expectedStateId ? m.getStateById(m.expectedStateId) : m.extractState(m.getLocationHref())),
                                      g || (g = m.createStateObject(null, null, m.getLocationHref())),
                                      (m.expectedStateId = !1),
                                      m.isLastSavedState(g) ? (m.busy(!1), !1) : (m.storeState(g), m.saveState(g), m.setTitle(g), m.Adapter.trigger(a, "statechange"), m.busy(!1), !0))
                            );
                        }),
                            m.Adapter.bind(a, "popstate", m.onPopState),
                            (m.pushState = function (b, c, d, e) {
                                if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                                if (!1 !== e && m.busy()) return m.pushQueue({ scope: m, callback: m.pushState, args: arguments, queue: e }), !1;
                                m.busy(!0);
                                var f = m.createStateObject(b, c, d);
                                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), (m.expectedStateId = f.id), n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0;
                            }),
                            (m.replaceState = function (b, c, d, e) {
                                if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                                if (!1 !== e && m.busy()) return m.pushQueue({ scope: m, callback: m.replaceState, args: arguments, queue: e }), !1;
                                m.busy(!0);
                                var f = m.createStateObject(b, c, d);
                                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), (m.expectedStateId = f.id), n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0;
                            });
                    if (f) {
                        try {
                            m.store = k.parse(f.getItem("History.store")) || {};
                        } catch (a) {
                            m.store = {};
                        }
                        m.normalizeStore();
                    } else (m.store = {}), m.normalizeStore();
                    m.Adapter.bind(a, "unload", m.clearAllIntervals),
                        m.saveState(m.storeState(m.extractState(m.getLocationHref(), !0))),
                        f &&
                            ((m.onUnload = function () {
                                var a, b, c;
                                try {
                                    a = k.parse(f.getItem("History.store")) || {};
                                } catch (b) {
                                    a = {};
                                }
                                (a.idToState = a.idToState || {}), (a.urlToId = a.urlToId || {}), (a.stateToId = a.stateToId || {});
                                for (b in m.idToState) m.idToState.hasOwnProperty(b) && (a.idToState[b] = m.idToState[b]);
                                for (b in m.urlToId) m.urlToId.hasOwnProperty(b) && (a.urlToId[b] = m.urlToId[b]);
                                for (b in m.stateToId) m.stateToId.hasOwnProperty(b) && (a.stateToId[b] = m.stateToId[b]);
                                (m.store = a), m.normalizeStore(), (c = k.stringify(a));
                                try {
                                    f.setItem("History.store", c);
                                } catch (a) {
                                    if (a.code !== DOMException.QUOTA_EXCEEDED_ERR) throw a;
                                    f.length && (f.removeItem("History.store"), f.setItem("History.store", c));
                                }
                            }),
                            m.intervalList.push(i(m.onUnload, m.options.storeInterval)),
                            m.Adapter.bind(a, "beforeunload", m.onUnload),
                            m.Adapter.bind(a, "unload", m.onUnload)),
                        m.emulated.pushState ||
                            (m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval)),
                            ("Apple Computer, Inc." !== e.vendor && "Mozilla" !== (e.appCodeName || "")) ||
                                (m.Adapter.bind(a, "hashchange", function () {
                                    m.Adapter.trigger(a, "popstate");
                                }),
                                m.getHash() &&
                                    m.Adapter.onDomLoad(function () {
                                        m.Adapter.trigger(a, "hashchange");
                                    })));
                }),
                (!m.options || !m.options.delayInit) && m.init();
        })(window)),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a) : a(jQuery);
    })(function (a) {
        function b(b) {
            var g = b || window.event,
                h = i.call(arguments, 1),
                j = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0;
            if (
                ((b = a.event.fix(g)),
                (b.type = "mousewheel"),
                "detail" in g && (m = -1 * g.detail),
                "wheelDelta" in g && (m = g.wheelDelta),
                "wheelDeltaY" in g && (m = g.wheelDeltaY),
                "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
                "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
                (j = 0 === m ? l : m),
                "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
                "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
                0 !== m || 0 !== l)
            ) {
                if (1 === g.deltaMode) {
                    var q = a.data(this, "mousewheel-line-height");
                    (j *= q), (m *= q), (l *= q);
                } else if (2 === g.deltaMode) {
                    var r = a.data(this, "mousewheel-page-height");
                    (j *= r), (m *= r), (l *= r);
                }
                if (
                    ((n = Math.max(Math.abs(m), Math.abs(l))),
                    (!f || n < f) && ((f = n), d(g, n) && (f /= 40)),
                    d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                    (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                    (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                    (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                    k.settings.normalizeOffset && this.getBoundingClientRect)
                ) {
                    var s = this.getBoundingClientRect();
                    (o = b.clientX - s.left), (p = b.clientY - s.top);
                }
                return (
                    (b.deltaX = l),
                    (b.deltaY = m),
                    (b.deltaFactor = f),
                    (b.offsetX = o),
                    (b.offsetY = p),
                    (b.deltaMode = 0),
                    h.unshift(b, j, l, m),
                    e && clearTimeout(e),
                    (e = setTimeout(c, 200)),
                    (a.event.dispatch || a.event.handle).apply(this, h)
                );
            }
        }
        function c() {
            f = null;
        }
        function d(a, b) {
            return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 == 0;
        }
        var e,
            f,
            g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            i = Array.prototype.slice;
        if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
        var k = (a.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
                else this.onmousewheel = b;
                a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
            },
            teardown: function () {
                if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
                else this.onmousewheel = null;
                a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
            },
            getLineHeight: function (b) {
                var c = a(b),
                    d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
            },
            getPageHeight: function (b) {
                return a(b).height();
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
        });
        a.fn.extend({
            mousewheel: function (a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
            },
            unmousewheel: function (a) {
                return this.unbind("mousewheel", a);
            },
        });
    }),
    (function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? (module.exports = a(require("jquery"))) : a(jQuery);
    })(function (a) {
        (a.fn.jScrollPane = function (b) {
            function c(b, c) {
                function d(c) {
                    var f,
                        h,
                        j,
                        k,
                        l,
                        o,
                        p = !1,
                        q = !1;
                    if (((N = c), void 0 === O))
                        (l = b.scrollTop()),
                            (o = b.scrollLeft()),
                            b.css({ overflow: "hidden", padding: 0 }),
                            (P = b.innerWidth() + ra),
                            (Q = b.innerHeight()),
                            b.width(P),
                            (O = a('<div class="jspPane" />').css("padding", qa).append(b.children())),
                            (R = a('<div class="jspContainer" />')
                                .css({ width: P + "px", height: Q + "px" })
                                .append(O)
                                .appendTo(b));
                    else {
                        if (
                            (b.css("width", ""),
                            (p = N.stickToBottom && A()),
                            (q = N.stickToRight && B()),
                            (k = b.innerWidth() + ra != P || b.outerHeight() != Q),
                            k && ((P = b.innerWidth() + ra), (Q = b.innerHeight()), R.css({ width: P + "px", height: Q + "px" })),
                            !k && sa == S && O.outerHeight() == T)
                        )
                            return void b.width(P);
                        (sa = S), O.css("width", ""), b.width(P), R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end();
                    }
                    O.css("overflow", "auto"),
                        (S = c.contentWidth ? c.contentWidth : O[0].scrollWidth),
                        (T = O[0].scrollHeight),
                        O.css("overflow", ""),
                        (U = S / P),
                        (V = T / Q),
                        (W = V > 1),
                        (X = U > 1),
                        X || W
                            ? (b.addClass("jspScrollable"),
                              (f = N.maintainPosition && ($ || ba)),
                              f && ((h = y()), (j = z())),
                              e(),
                              g(),
                              i(),
                              f && (w(q ? S - P : h, !1), v(p ? T - Q : j, !1)),
                              F(),
                              C(),
                              L(),
                              N.enableKeyboardNavigation && H(),
                              N.clickOnTrack && m(),
                              J(),
                              N.hijackInternalLinks && K())
                            : (b.removeClass("jspScrollable"), O.css({ top: 0, left: 0, width: R.width() - ra }), D(), G(), I(), n()),
                        N.autoReinitialise && !pa
                            ? (pa = setInterval(function () {
                                  d(N);
                              }, N.autoReinitialiseDelay))
                            : !N.autoReinitialise && pa && clearInterval(pa),
                        l && b.scrollTop(0) && v(l, !1),
                        o && b.scrollLeft(0) && w(o, !1),
                        b.trigger("jsp-initialised", [X || W]);
                }
                function e() {
                    W &&
                        (R.append(
                            a('<div class="jspVerticalBar" />').append(
                                a('<div class="jspCap jspCapTop" />'),
                                a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))),
                                a('<div class="jspCap jspCapBottom" />')
                            )
                        ),
                        (ca = R.find(">.jspVerticalBar")),
                        (da = ca.find(">.jspTrack")),
                        (Y = da.find(">.jspDrag")),
                        N.showArrows &&
                            ((ha = a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", k(0, -1)).bind("click.jsp", E)),
                            (ia = a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", k(0, 1)).bind("click.jsp", E)),
                            N.arrowScrollOnHover && (ha.bind("mouseover.jsp", k(0, -1, ha)), ia.bind("mouseover.jsp", k(0, 1, ia))),
                            j(da, N.verticalArrowPositions, ha, ia)),
                        (fa = Q),
                        R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                            fa -= a(this).outerHeight();
                        }),
                        Y.hover(
                            function () {
                                Y.addClass("jspHover");
                            },
                            function () {
                                Y.removeClass("jspHover");
                            }
                        ).bind("mousedown.jsp", function (b) {
                            a("html").bind("dragstart.jsp selectstart.jsp", E), Y.addClass("jspActive");
                            var c = b.pageY - Y.position().top;
                            return (
                                a("html")
                                    .bind("mousemove.jsp", function (a) {
                                        p(a.pageY - c, !1);
                                    })
                                    .bind("mouseup.jsp mouseleave.jsp", o),
                                !1
                            );
                        }),
                        f());
                }
                function f() {
                    da.height(fa + "px"), ($ = 0), (ea = N.verticalGutter + da.outerWidth()), O.width(P - ea - ra);
                    try {
                        0 === ca.position().left && O.css("margin-left", ea + "px");
                    } catch (a) {}
                }
                function g() {
                    X &&
                        (R.append(
                            a('<div class="jspHorizontalBar" />').append(
                                a('<div class="jspCap jspCapLeft" />'),
                                a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))),
                                a('<div class="jspCap jspCapRight" />')
                            )
                        ),
                        (ja = R.find(">.jspHorizontalBar")),
                        (ka = ja.find(">.jspTrack")),
                        (_ = ka.find(">.jspDrag")),
                        N.showArrows &&
                            ((na = a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", k(-1, 0)).bind("click.jsp", E)),
                            (oa = a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", k(1, 0)).bind("click.jsp", E)),
                            N.arrowScrollOnHover && (na.bind("mouseover.jsp", k(-1, 0, na)), oa.bind("mouseover.jsp", k(1, 0, oa))),
                            j(ka, N.horizontalArrowPositions, na, oa)),
                        _.hover(
                            function () {
                                _.addClass("jspHover");
                            },
                            function () {
                                _.removeClass("jspHover");
                            }
                        ).bind("mousedown.jsp", function (b) {
                            a("html").bind("dragstart.jsp selectstart.jsp", E), _.addClass("jspActive");
                            var c = b.pageX - _.position().left;
                            return (
                                a("html")
                                    .bind("mousemove.jsp", function (a) {
                                        r(a.pageX - c, !1);
                                    })
                                    .bind("mouseup.jsp mouseleave.jsp", o),
                                !1
                            );
                        }),
                        (la = R.innerWidth()),
                        h());
                }
                function h() {
                    R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                        la -= a(this).outerWidth();
                    }),
                        ka.width(la + "px"),
                        (ba = 0);
                }
                function i() {
                    if (X && W) {
                        var b = ka.outerHeight(),
                            c = da.outerWidth();
                        (fa -= b),
                            a(ja)
                                .find(">.jspCap:visible,>.jspArrow")
                                .each(function () {
                                    la += a(this).outerWidth();
                                }),
                            (la -= c),
                            (Q -= c),
                            (P -= b),
                            ka.parent().append(a('<div class="jspCorner" />').css("width", b + "px")),
                            f(),
                            h();
                    }
                    X && O.width(R.outerWidth() - ra + "px"),
                        (T = O.outerHeight()),
                        (V = T / Q),
                        X && ((ma = Math.ceil((1 / U) * la)), ma > N.horizontalDragMaxWidth ? (ma = N.horizontalDragMaxWidth) : ma < N.horizontalDragMinWidth && (ma = N.horizontalDragMinWidth), _.width(ma + "px"), (aa = la - ma), s(ba)),
                        W && ((ga = Math.ceil((1 / V) * fa)), ga > N.verticalDragMaxHeight ? (ga = N.verticalDragMaxHeight) : ga < N.verticalDragMinHeight && (ga = N.verticalDragMinHeight), Y.height(ga + "px"), (Z = fa - ga), q($));
                }
                function j(a, b, c, d) {
                    var e,
                        f = "before",
                        g = "after";
                    "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == f ? (g = b) : b == g && ((f = b), (e = c), (c = d), (d = e)), a[f](c)[g](d);
                }
                function k(a, b, c) {
                    return function () {
                        return l(a, b, this, c), this.blur(), !1;
                    };
                }
                function l(b, c, d, e) {
                    d = a(d).addClass("jspActive");
                    var f,
                        g,
                        h = !0,
                        i = function () {
                            0 !== b && ta.scrollByX(b * N.arrowButtonSpeed), 0 !== c && ta.scrollByY(c * N.arrowButtonSpeed), (g = setTimeout(i, h ? N.initialDelay : N.arrowRepeatFreq)), (h = !1);
                        };
                    i(),
                        (f = e ? "mouseout.jsp" : "mouseup.jsp"),
                        (e = e || a("html")),
                        e.bind(f, function () {
                            d.removeClass("jspActive"), g && clearTimeout(g), (g = null), e.unbind(f);
                        });
                }
                function m() {
                    n(),
                        W &&
                            da.bind("mousedown.jsp", function (b) {
                                if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
                                    var c,
                                        d = a(this),
                                        e = d.offset(),
                                        f = b.pageY - e.top - $,
                                        g = !0,
                                        h = function () {
                                            var a = d.offset(),
                                                e = b.pageY - a.top - ga / 2,
                                                j = Q * N.scrollPagePercent,
                                                k = (Z * j) / (T - Q);
                                            if (0 > f) $ - k > e ? ta.scrollByY(-j) : p(e);
                                            else {
                                                if (!(f > 0)) return void i();
                                                e > $ + k ? ta.scrollByY(j) : p(e);
                                            }
                                            (c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq)), (g = !1);
                                        },
                                        i = function () {
                                            c && clearTimeout(c), (c = null), a(document).unbind("mouseup.jsp", i);
                                        };
                                    return h(), a(document).bind("mouseup.jsp", i), !1;
                                }
                            }),
                        X &&
                            ka.bind("mousedown.jsp", function (b) {
                                if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
                                    var c,
                                        d = a(this),
                                        e = d.offset(),
                                        f = b.pageX - e.left - ba,
                                        g = !0,
                                        h = function () {
                                            var a = d.offset(),
                                                e = b.pageX - a.left - ma / 2,
                                                j = P * N.scrollPagePercent,
                                                k = (aa * j) / (S - P);
                                            if (0 > f) ba - k > e ? ta.scrollByX(-j) : r(e);
                                            else {
                                                if (!(f > 0)) return void i();
                                                e > ba + k ? ta.scrollByX(j) : r(e);
                                            }
                                            (c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq)), (g = !1);
                                        },
                                        i = function () {
                                            c && clearTimeout(c), (c = null), a(document).unbind("mouseup.jsp", i);
                                        };
                                    return h(), a(document).bind("mouseup.jsp", i), !1;
                                }
                            });
                }
                function n() {
                    ka && ka.unbind("mousedown.jsp"), da && da.unbind("mousedown.jsp");
                }
                function o() {
                    a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), Y && Y.removeClass("jspActive"), _ && _.removeClass("jspActive");
                }
                function p(c, d) {
                    if (W) {
                        0 > c ? (c = 0) : c > Z && (c = Z);
                        var e = new a.Event("jsp-will-scroll-y");
                        if ((b.trigger(e, [c]), !e.isDefaultPrevented())) {
                            var f = c || 0,
                                g = 0 === f,
                                h = f == Z,
                                i = c / Z,
                                j = -i * (T - Q);
                            void 0 === d && (d = N.animateScroll),
                                d
                                    ? ta.animate(Y, "top", c, q, function () {
                                          b.trigger("jsp-user-scroll-y", [-j, g, h]);
                                      })
                                    : (Y.css("top", c), q(c), b.trigger("jsp-user-scroll-y", [-j, g, h]));
                        }
                    }
                }
                function q(a) {
                    void 0 === a && (a = Y.position().top), R.scrollTop(0), ($ = a || 0);
                    var c = 0 === $,
                        d = $ == Z,
                        e = a / Z,
                        f = -e * (T - Q);
                    (ua != c || wa != d) && ((ua = c), (wa = d), b.trigger("jsp-arrow-change", [ua, wa, va, xa])), t(c, d), O.css("top", f), b.trigger("jsp-scroll-y", [-f, c, d]).trigger("scroll");
                }
                function r(c, d) {
                    if (X) {
                        0 > c ? (c = 0) : c > aa && (c = aa);
                        var e = new a.Event("jsp-will-scroll-x");
                        if ((b.trigger(e, [c]), !e.isDefaultPrevented())) {
                            var f = c || 0,
                                g = 0 === f,
                                h = f == aa,
                                i = c / aa,
                                j = -i * (S - P);
                            void 0 === d && (d = N.animateScroll),
                                d
                                    ? ta.animate(_, "left", c, s, function () {
                                          b.trigger("jsp-user-scroll-x", [-j, g, h]);
                                      })
                                    : (_.css("left", c), s(c), b.trigger("jsp-user-scroll-x", [-j, g, h]));
                        }
                    }
                }
                function s(a) {
                    void 0 === a && (a = _.position().left), R.scrollTop(0), (ba = a || 0);
                    var c = 0 === ba,
                        d = ba == aa,
                        e = a / aa,
                        f = -e * (S - P);
                    (va != c || xa != d) && ((va = c), (xa = d), b.trigger("jsp-arrow-change", [ua, wa, va, xa])), u(c, d), O.css("left", f), b.trigger("jsp-scroll-x", [-f, c, d]).trigger("scroll");
                }
                function t(a, b) {
                    N.showArrows && (ha[a ? "addClass" : "removeClass"]("jspDisabled"), ia[b ? "addClass" : "removeClass"]("jspDisabled"));
                }
                function u(a, b) {
                    N.showArrows && (na[a ? "addClass" : "removeClass"]("jspDisabled"), oa[b ? "addClass" : "removeClass"]("jspDisabled"));
                }
                function v(a, b) {
                    p((a / (T - Q)) * Z, b);
                }
                function w(a, b) {
                    r((a / (S - P)) * aa, b);
                }
                function x(b, c, d) {
                    var e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n = 0,
                        o = 0;
                    try {
                        e = a(b);
                    } catch (a) {
                        return;
                    }
                    for (f = e.outerHeight(), g = e.outerWidth(), R.scrollTop(0), R.scrollLeft(0); !e.is(".jspPane"); )
                        if (((n += e.position().top), (o += e.position().left), (e = e.offsetParent()), /^body|html$/i.test(e[0].nodeName))) return;
                    (h = z()),
                        (j = h + Q),
                        h > n || c ? (l = n - N.horizontalGutter) : n + f > j && (l = n - Q + f + N.horizontalGutter),
                        isNaN(l) || v(l, d),
                        (i = y()),
                        (k = i + P),
                        i > o || c ? (m = o - N.horizontalGutter) : o + g > k && (m = o - P + g + N.horizontalGutter),
                        isNaN(m) || w(m, d);
                }
                function y() {
                    return -O.position().left;
                }
                function z() {
                    return -O.position().top;
                }
                function A() {
                    var a = T - Q;
                    return a > 20 && a - z() < 10;
                }
                function B() {
                    var a = S - P;
                    return a > 20 && a - y() < 10;
                }
                function C() {
                    R.unbind(za).bind(za, function (a, b, c, d) {
                        ba || (ba = 0), $ || ($ = 0);
                        var e = ba,
                            f = $,
                            g = a.deltaFactor || N.mouseWheelSpeed;
                        return ta.scrollBy(c * g, -d * g, !1), e == ba && f == $;
                    });
                }
                function D() {
                    R.unbind(za);
                }
                function E() {
                    return !1;
                }
                function F() {
                    O.find(":input,a")
                        .unbind("focus.jsp")
                        .bind("focus.jsp", function (a) {
                            x(a.target, !1);
                        });
                }
                function G() {
                    O.find(":input,a").unbind("focus.jsp");
                }
                function H() {
                    function c() {
                        var a = ba,
                            b = $;
                        switch (d) {
                            case 40:
                                ta.scrollByY(N.keyboardSpeed, !1);
                                break;
                            case 38:
                                ta.scrollByY(-N.keyboardSpeed, !1);
                                break;
                            case 34:
                            case 32:
                                ta.scrollByY(Q * N.scrollPagePercent, !1);
                                break;
                            case 33:
                                ta.scrollByY(-Q * N.scrollPagePercent, !1);
                                break;
                            case 39:
                                ta.scrollByX(N.keyboardSpeed, !1);
                                break;
                            case 37:
                                ta.scrollByX(-N.keyboardSpeed, !1);
                        }
                        return (e = a != ba || b != $);
                    }
                    var d,
                        e,
                        f = [];
                    X && f.push(ja[0]),
                        W && f.push(ca[0]),
                        O.bind("focus.jsp", function () {
                            b.focus();
                        }),
                        b
                            .attr("tabindex", 0)
                            .unbind("keydown.jsp keypress.jsp")
                            .bind("keydown.jsp", function (b) {
                                if (b.target === this || (f.length && a(b.target).closest(f).length)) {
                                    var g = ba,
                                        h = $;
                                    switch (b.keyCode) {
                                        case 40:
                                        case 38:
                                        case 34:
                                        case 32:
                                        case 33:
                                        case 39:
                                        case 37:
                                            (d = b.keyCode), c();
                                            break;
                                        case 35:
                                            v(T - Q), (d = null);
                                            break;
                                        case 36:
                                            v(0), (d = null);
                                    }
                                    return !(e = (b.keyCode == d && g != ba) || h != $);
                                }
                            })
                            .bind("keypress.jsp", function (b) {
                                return b.keyCode == d && c(), b.target === this || (f.length && a(b.target).closest(f).length) ? !e : void 0;
                            }),
                        N.hideFocus ? (b.css("outline", "none"), "hideFocus" in R[0] && b.attr("hideFocus", !0)) : (b.css("outline", ""), "hideFocus" in R[0] && b.attr("hideFocus", !1));
                }
                function I() {
                    b.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"), O.unbind(".jsp");
                }
                function J() {
                    if (location.hash && location.hash.length > 1) {
                        var b,
                            c,
                            d = escape(location.hash.substr(1));
                        try {
                            b = a("#" + d + ', a[name="' + d + '"]');
                        } catch (a) {
                            return;
                        }
                        b.length &&
                            O.find(d) &&
                            (0 === R.scrollTop()
                                ? (c = setInterval(function () {
                                      R.scrollTop() > 0 && (x(b, !0), a(document).scrollTop(R.position().top), clearInterval(c));
                                  }, 50))
                                : (x(b, !0), a(document).scrollTop(R.position().top)));
                    }
                }
                function K() {
                    a(document.body).data("jspHijack") ||
                        (a(document.body).data("jspHijack", !0),
                        a(document.body).delegate('a[href*="#"]', "click", function (b) {
                            var c,
                                d,
                                e,
                                f,
                                g,
                                h,
                                i = this.href.substr(0, this.href.indexOf("#")),
                                j = location.href;
                            if ((-1 !== location.href.indexOf("#") && (j = location.href.substr(0, location.href.indexOf("#"))), i === j)) {
                                c = escape(this.href.substr(this.href.indexOf("#") + 1));
                                try {
                                    d = a("#" + c + ', a[name="' + c + '"]');
                                } catch (a) {
                                    return;
                                }
                                d.length &&
                                    ((e = d.closest(".jspScrollable")),
                                    (f = e.data("jsp")),
                                    f.scrollToElement(d, !0),
                                    e[0].scrollIntoView && ((g = a(window).scrollTop()), (h = d.offset().top), (g > h || h > g + a(window).height()) && e[0].scrollIntoView()),
                                    b.preventDefault());
                            }
                        }));
                }
                function L() {
                    var a,
                        b,
                        c,
                        d,
                        e,
                        f = !1;
                    R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick")
                        .bind("touchstart.jsp", function (g) {
                            var h = g.originalEvent.touches[0];
                            (a = y()), (b = z()), (c = h.pageX), (d = h.pageY), (e = !1), (f = !0);
                        })
                        .bind("touchmove.jsp", function (g) {
                            if (f) {
                                var h = g.originalEvent.touches[0],
                                    i = ba,
                                    j = $;
                                return ta.scrollTo(a + c - h.pageX, b + d - h.pageY), (e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5), i == ba && j == $;
                            }
                        })
                        .bind("touchend.jsp", function () {
                            f = !1;
                        })
                        .bind("click.jsp-touchclick", function () {
                            return e ? ((e = !1), !1) : void 0;
                        });
                }
                function M() {
                    var a = z(),
                        c = y();
                    b.removeClass("jspScrollable").unbind(".jsp"), O.unbind(".jsp"), b.replaceWith(ya.append(O.children())), ya.scrollTop(a), ya.scrollLeft(c), pa && clearInterval(pa);
                }
                var N,
                    O,
                    P,
                    Q,
                    R,
                    S,
                    T,
                    U,
                    V,
                    W,
                    X,
                    Y,
                    Z,
                    $,
                    _,
                    aa,
                    ba,
                    ca,
                    da,
                    ea,
                    fa,
                    ga,
                    ha,
                    ia,
                    ja,
                    ka,
                    la,
                    ma,
                    na,
                    oa,
                    pa,
                    qa,
                    ra,
                    sa,
                    ta = this,
                    ua = !0,
                    va = !0,
                    wa = !1,
                    xa = !1,
                    ya = b.clone(!1, !1).empty(),
                    za = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
                "border-box" === b.css("box-sizing")
                    ? ((qa = 0), (ra = 0))
                    : ((qa = b.css("paddingTop") + " " + b.css("paddingRight") + " " + b.css("paddingBottom") + " " + b.css("paddingLeft")), (ra = (parseInt(b.css("paddingLeft"), 10) || 0) + (parseInt(b.css("paddingRight"), 10) || 0))),
                    a.extend(ta, {
                        reinitialise: function (b) {
                            (b = a.extend({}, N, b)), d(b);
                        },
                        scrollToElement: function (a, b, c) {
                            x(a, b, c);
                        },
                        scrollTo: function (a, b, c) {
                            w(a, c), v(b, c);
                        },
                        scrollToX: function (a, b) {
                            w(a, b);
                        },
                        scrollToY: function (a, b) {
                            v(a, b);
                        },
                        scrollToPercentX: function (a, b) {
                            w(a * (S - P), b);
                        },
                        scrollToPercentY: function (a, b) {
                            v(a * (T - Q), b);
                        },
                        scrollBy: function (a, b, c) {
                            ta.scrollByX(a, c), ta.scrollByY(b, c);
                        },
                        scrollByX: function (a, b) {
                            r(((y() + Math[0 > a ? "floor" : "ceil"](a)) / (S - P)) * aa, b);
                        },
                        scrollByY: function (a, b) {
                            p(((z() + Math[0 > a ? "floor" : "ceil"](a)) / (T - Q)) * Z, b);
                        },
                        positionDragX: function (a, b) {
                            r(a, b);
                        },
                        positionDragY: function (a, b) {
                            p(a, b);
                        },
                        animate: function (a, b, c, d, e) {
                            var f = {};
                            (f[b] = c), a.animate(f, { duration: N.animateDuration, easing: N.animateEase, queue: !1, step: d, complete: e });
                        },
                        getContentPositionX: function () {
                            return y();
                        },
                        getContentPositionY: function () {
                            return z();
                        },
                        getContentWidth: function () {
                            return S;
                        },
                        getContentHeight: function () {
                            return T;
                        },
                        getPercentScrolledX: function () {
                            return y() / (S - P);
                        },
                        getPercentScrolledY: function () {
                            return z() / (T - Q);
                        },
                        getIsScrollableH: function () {
                            return X;
                        },
                        getIsScrollableV: function () {
                            return W;
                        },
                        getContentPane: function () {
                            return O;
                        },
                        scrollToBottom: function (a) {
                            p(Z, a);
                        },
                        hijackInternalLinks: a.noop,
                        destroy: function () {
                            M();
                        },
                    }),
                    d(c);
            }
            return (
                (b = a.extend({}, a.fn.jScrollPane.defaults, b)),
                a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
                    b[this] = b[this] || b.speed;
                }),
                this.each(function () {
                    var d = a(this),
                        e = d.data("jsp");
                    e ? e.reinitialise(b) : (a("script", d).filter('[type="text/javascript"],:not([type])').remove(), (e = new c(d, b)), d.data("jsp", e));
                })
            );
        }),
            (a.fn.jScrollPane.defaults = {
                showArrows: !1,
                maintainPosition: !0,
                stickToBottom: !1,
                stickToRight: !1,
                clickOnTrack: !0,
                autoReinitialise: !1,
                autoReinitialiseDelay: 500,
                verticalDragMinHeight: 0,
                verticalDragMaxHeight: 99999,
                horizontalDragMinWidth: 0,
                horizontalDragMaxWidth: 99999,
                contentWidth: void 0,
                animateScroll: !1,
                animateDuration: 300,
                animateEase: "linear",
                hijackInternalLinks: !1,
                verticalGutter: 4,
                horizontalGutter: 4,
                mouseWheelSpeed: 3,
                arrowButtonSpeed: 0,
                arrowRepeatFreq: 50,
                arrowScrollOnHover: !1,
                trackClickSpeed: 0,
                trackClickRepeatFreq: 70,
                verticalArrowPositions: "split",
                horizontalArrowPositions: "split",
                enableKeyboardNavigation: !0,
                hideFocus: !1,
                keyboardSpeed: 0,
                initialDelay: 300,
                speed: 30,
                scrollPagePercent: 0.8,
            });
    }),
    (function (a, b, c) {
        "use strict";
        function d(a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return a.prop ? a.prop.apply(a, b) : a.attr.apply(a, b);
        }
        function e(a, b, c) {
            var d, e;
            for (d in c) c.hasOwnProperty(d) && ((e = d.replace(/ |$/g, b.eventNamespace)), a.bind(e, c[d]));
        }
        function f(a, b, c) {
            e(a, c, {
                focus: function () {
                    b.addClass(c.focusClass);
                },
                blur: function () {
                    b.removeClass(c.focusClass), b.removeClass(c.activeClass);
                },
                mouseenter: function () {
                    b.addClass(c.hoverClass);
                },
                mouseleave: function () {
                    b.removeClass(c.hoverClass), b.removeClass(c.activeClass);
                },
                "mousedown touchbegin": function () {
                    a.is(":disabled") || b.addClass(c.activeClass);
                },
                "mouseup touchend": function () {
                    b.removeClass(c.activeClass);
                },
            });
        }
        function g(a, b) {
            a.removeClass(b.hoverClass + " " + b.focusClass + " " + b.activeClass);
        }
        function h(a, b, c) {
            c ? a.addClass(b) : a.removeClass(b);
        }
        function i(a, b, c) {
            var d = "checked",
                e = b.is(":" + d);
            b.prop ? b.prop(d, e) : e ? b.attr(d, d) : b.removeAttr(d), h(a, c.checkedClass, e);
        }
        function j(a, b, c) {
            h(a, c.disabledClass, b.is(":disabled"));
        }
        function k(a, b, c) {
            switch (c) {
                case "after":
                    return a.after(b), a.next();
                case "before":
                    return a.before(b), a.prev();
                case "wrap":
                    return a.wrap(b), a.parent();
            }
            return null;
        }
        function l(a, c, e) {
            var f, g, h;
            return (
                e || (e = {}),
                (e = b.extend({ bind: {}, divClass: null, divWrap: "wrap", spanClass: null, spanHtml: null, spanWrap: "wrap" }, e)),
                (f = b("<div />")),
                (g = b("<span />")),
                c.autoHide && a.is(":hidden") && "none" === a.css("display") && f.hide(),
                e.divClass && f.addClass(e.divClass),
                c.wrapperClass && f.addClass(c.wrapperClass),
                e.spanClass && g.addClass(e.spanClass),
                (h = d(a, "id")),
                c.useID && h && d(f, "id", c.idPrefix + "-" + h),
                e.spanHtml && g.html(e.spanHtml),
                (f = k(a, f, e.divWrap)),
                (g = k(a, g, e.spanWrap)),
                j(f, a, c),
                { div: f, span: g }
            );
        }
        function m(a, c) {
            var d;
            return c.wrapperClass ? ((d = b("<span />").addClass(c.wrapperClass)), (d = k(a, d, "wrap"))) : null;
        }
        function n() {
            var c, d, e, f;
            return (
                (f = "rgb(120,2,153)"),
                (d = b('<div style="width:0;height:0;color:' + f + '">')),
                b("body").append(d),
                (e = d.get(0)),
                (c = a.getComputedStyle ? a.getComputedStyle(e, "").color : (e.currentStyle || e.style || {}).color),
                d.remove(),
                c.replace(/ /g, "") !== f
            );
        }
        function o(a) {
            return a ? b("<span />").text(a).html() : "";
        }
        function p() {
            return navigator.cpuClass && !navigator.product;
        }
        function q(a) {
            var b;
            return !!a[0].multiple || !(!(b = d(a, "size")) || b <= 1);
        }
        function r() {
            return !1;
        }
        function s(a, b) {
            e(a, b, { "selectstart dragstart mousedown": r }), a.css({ MozUserSelect: "none", msUserSelect: "none", webkitUserSelect: "none", userSelect: "none" });
        }
        function t(a, b, c) {
            var d = a.val();
            "" === d ? (d = c.fileDefaultHtml) : ((d = d.split(/[\/\\]+/)), (d = d[d.length - 1])), b.text(d);
        }
        function u(a, b, c) {
            var d, e;
            for (
                d = [],
                    a.each(function () {
                        var a;
                        for (a in b) Object.prototype.hasOwnProperty.call(b, a) && (d.push({ el: this, name: a, old: this.style[a] }), (this.style[a] = b[a]));
                    }),
                    c();
                d.length;

            )
                (e = d.pop()), (e.el.style[e.name] = e.old);
        }
        function v(a, b) {
            var c;
            (c = a.parents()), c.push(a[0]), (c = c.not(":visible")), u(c, { visibility: "hidden", display: "block", position: "absolute" }, b);
        }
        function w(a, b) {
            return function () {
                a.unwrap().unwrap().unbind(b.eventNamespace);
            };
        }
        var x = !0,
            y = !1,
            z = [
                {
                    match: function (a) {
                        return a.is("a, button, :submit, :reset, input[type='button']");
                    },
                    apply: function (b, c) {
                        var h, i, k, m, n;
                        return (
                            (i = c.submitDefaultHtml),
                            b.is(":reset") && (i = c.resetDefaultHtml),
                            (m = b.is("a, button")
                                ? function () {
                                      return b.html() || i;
                                  }
                                : function () {
                                      return o(d(b, "value")) || i;
                                  }),
                            (k = l(b, c, { divClass: c.buttonClass, spanHtml: m() })),
                            (h = k.div),
                            f(b, h, c),
                            (n = !1),
                            e(h, c, {
                                "click touchend": function () {
                                    var c, e, f, g;
                                    n ||
                                        b.is(":disabled") ||
                                        ((n = !0),
                                        b[0].dispatchEvent
                                            ? ((c = document.createEvent("MouseEvents")),
                                              c.initEvent("click", !0, !0),
                                              (e = b[0].dispatchEvent(c)),
                                              b.is("a") && e && ((f = d(b, "target")), (g = d(b, "href")), f && "_self" !== f ? a.open(g, f) : (document.location.href = g)))
                                            : b.click(),
                                        (n = !1));
                                },
                            }),
                            s(h, c),
                            {
                                remove: function () {
                                    return h.after(b), h.remove(), b.unbind(c.eventNamespace), b;
                                },
                                update: function () {
                                    g(h, c), j(h, b, c), b.detach(), k.span.html(m()).append(b);
                                },
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return a.is(":checkbox");
                    },
                    apply: function (a, b) {
                        var c, d, h;
                        return (
                            (c = l(a, b, { divClass: b.checkboxClass })),
                            (d = c.div),
                            (h = c.span),
                            f(a, d, b),
                            e(a, b, {
                                "click touchend": function () {
                                    i(h, a, b);
                                },
                            }),
                            i(h, a, b),
                            {
                                remove: w(a, b),
                                update: function () {
                                    g(d, b), h.removeClass(b.checkedClass), i(h, a, b), j(d, a, b);
                                },
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return a.is(":file");
                    },
                    apply: function (a, c) {
                        function h() {
                            t(a, n, c);
                        }
                        var i, m, n, o;
                        return (
                            (i = l(a, c, { divClass: c.fileClass, spanClass: c.fileButtonClass, spanHtml: c.fileButtonHtml, spanWrap: "after" })),
                            (m = i.div),
                            (o = i.span),
                            (n = b("<span />").html(c.fileDefaultHtml)),
                            n.addClass(c.filenameClass),
                            (n = k(a, n, "after")),
                            d(a, "size") || d(a, "size", m.width() / 10),
                            f(a, m, c),
                            h(),
                            p()
                                ? e(a, c, {
                                      click: function () {
                                          a.trigger("change"), setTimeout(h, 0);
                                      },
                                  })
                                : e(a, c, { change: h }),
                            s(n, c),
                            s(o, c),
                            {
                                remove: function () {
                                    return n.remove(), o.remove(), a.unwrap().unbind(c.eventNamespace);
                                },
                                update: function () {
                                    g(m, c), t(a, n, c), j(m, a, c);
                                },
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return !!a.is("input") && " color date datetime datetime-local email month number password search tel text time url week ".indexOf((" " + d(a, "type") + " ").toLowerCase()) >= 0;
                    },
                    apply: function (a, b) {
                        var c, e;
                        return (
                            (c = d(a, "type")),
                            a.addClass(b.inputClass),
                            (e = m(a, b)),
                            f(a, a, b),
                            b.inputAddTypeAsClass && a.addClass(c),
                            {
                                remove: function () {
                                    a.removeClass(b.inputClass), b.inputAddTypeAsClass && a.removeClass(c), e && a.unwrap();
                                },
                                update: r,
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return a.is(":radio");
                    },
                    apply: function (a, c) {
                        var h, k, m;
                        return (
                            (h = l(a, c, { divClass: c.radioClass })),
                            (k = h.div),
                            (m = h.span),
                            f(a, k, c),
                            e(a, c, {
                                "click touchend": function () {
                                    b.uniform.update(b(':radio[name="' + d(a, "name") + '"]'));
                                },
                            }),
                            i(m, a, c),
                            {
                                remove: w(a, c),
                                update: function () {
                                    g(k, c), i(m, a, c), j(k, a, c);
                                },
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return !(!a.is("select") || q(a));
                    },
                    apply: function (a, c) {
                        var d, h, i, k;
                        return (
                            c.selectAutoWidth &&
                                v(a, function () {
                                    k = a.width();
                                }),
                            (d = l(a, c, { divClass: c.selectClass, spanHtml: (a.find(":selected:first") || a.find("option:first")).html(), spanWrap: "before" })),
                            (h = d.div),
                            (i = d.span),
                            c.selectAutoWidth
                                ? v(a, function () {
                                      u(b([i[0], h[0]]), { display: "block" }, function () {
                                          var a;
                                          (a = i.outerWidth() - i.width()), h.width(k + a), i.width(k);
                                      });
                                  })
                                : h.addClass("fixedWidth"),
                            f(a, h, c),
                            e(a, c, {
                                change: function () {
                                    i.html(a.find(":selected").html()), h.removeClass(c.activeClass);
                                },
                                "click touchend": function () {
                                    var b = a.find(":selected").html();
                                    i.html() !== b && a.trigger("change");
                                },
                                keyup: function () {
                                    i.html(a.find(":selected").html());
                                },
                            }),
                            s(i, c),
                            {
                                remove: function () {
                                    return i.remove(), a.unwrap().unbind(c.eventNamespace), a;
                                },
                                update: function () {
                                    c.selectAutoWidth ? (b.uniform.restore(a), a.uniform(c)) : (g(h, c), (a[0].selectedIndex = a[0].selectedIndex), i.html(a.find(":selected").html()), j(h, a, c));
                                },
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return !(!a.is("select") || !q(a));
                    },
                    apply: function (a, b) {
                        var c;
                        return (
                            a.addClass(b.selectMultiClass),
                            (c = m(a, b)),
                            f(a, a, b),
                            {
                                remove: function () {
                                    a.removeClass(b.selectMultiClass), c && a.unwrap();
                                },
                                update: r,
                            }
                        );
                    },
                },
                {
                    match: function (a) {
                        return a.is("textarea");
                    },
                    apply: function (a, b) {
                        var c;
                        return (
                            a.addClass(b.textareaClass),
                            (c = m(a, b)),
                            f(a, a, b),
                            {
                                remove: function () {
                                    a.removeClass(b.textareaClass), c && a.unwrap();
                                },
                                update: r,
                            }
                        );
                    },
                },
            ];
        p() &&
            !(function () {
                return void 0 !== a.XMLHttpRequest;
            })() &&
            (x = !1),
            (b.uniform = {
                defaults: {
                    activeClass: "active",
                    autoHide: !0,
                    buttonClass: "button",
                    checkboxClass: "checker",
                    checkedClass: "checked",
                    disabledClass: "disabled",
                    eventNamespace: ".uniform",
                    fileButtonClass: "action",
                    fileButtonHtml: "Choose File",
                    fileClass: "uploader",
                    fileDefaultHtml: "No file selected",
                    filenameClass: "filename",
                    focusClass: "focus",
                    hoverClass: "hover",
                    idPrefix: "uniform",
                    inputAddTypeAsClass: !0,
                    inputClass: "uniform-input",
                    radioClass: "radio",
                    resetDefaultHtml: "Reset",
                    resetSelector: !1,
                    selectAutoWidth: !0,
                    selectClass: "selector",
                    selectMultiClass: "uniform-multiselect",
                    submitDefaultHtml: "Submit",
                    textareaClass: "uniform",
                    useID: !0,
                    wrapperClass: null,
                },
                elements: [],
            }),
            (b.fn.uniform = function (c) {
                var d = this;
                return (
                    (c = b.extend({}, b.uniform.defaults, c)),
                    y || ((y = !0), n() && (x = !1)),
                    x
                        ? (c.resetSelector &&
                              b(c.resetSelector).mouseup(function () {
                                  a.setTimeout(function () {
                                      b.uniform.update(d);
                                  }, 10);
                              }),
                          this.each(function () {
                              var a,
                                  d,
                                  e,
                                  f = b(this);
                              if (f.data("uniformed")) return void b.uniform.update(f);
                              for (a = 0; a < z.length; a += 1) if (((d = z[a]), d.match(f, c))) return (e = d.apply(f, c)), f.data("uniformed", e), void b.uniform.elements.push(f.get(0));
                          }))
                        : this
                );
            }),
            (b.uniform.restore = b.fn.uniform.restore = function (a) {
                void 0 === a && (a = b.uniform.elements),
                    b(a).each(function () {
                        var a,
                            c,
                            d = b(this);
                        (c = d.data("uniformed")) && (c.remove(), (a = b.inArray(this, b.uniform.elements)), a >= 0 && b.uniform.elements.splice(a, 1), d.removeData("uniformed"));
                    });
            }),
            (b.uniform.update = b.fn.uniform.update = function (a) {
                void 0 === a && (a = b.uniform.elements),
                    b(a).each(function () {
                        var a,
                            c = b(this);
                        (a = c.data("uniformed")) && a.update(c, a.options);
                    });
            });
    })(this, jQuery),
    (function (a) {
        "function" == typeof define && define.amd ? define([], a) : "object" == typeof exports ? (module.exports = a()) : (window.noUiSlider = a());
    })(function () {
        "use strict";
        function a(a, b) {
            var c = document.createElement("div");
            return j(c, b), a.appendChild(c), c;
        }
        function b(a) {
            return a.filter(function (a) {
                return !this[a] && (this[a] = !0);
            }, {});
        }
        function c(a, b) {
            return Math.round(a / b) * b;
        }
        function d(a, b) {
            var c = a.getBoundingClientRect(),
                d = a.ownerDocument,
                e = d.documentElement,
                f = m();
            return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (f.x = 0), b ? c.top + f.y - e.clientTop : c.left + f.x - e.clientLeft;
        }
        function e(a) {
            return "number" == typeof a && !isNaN(a) && isFinite(a);
        }
        function f(a, b, c) {
            c > 0 &&
                (j(a, b),
                setTimeout(function () {
                    k(a, b);
                }, c));
        }
        function g(a) {
            return Math.max(Math.min(a, 100), 0);
        }
        function h(a) {
            return Array.isArray(a) ? a : [a];
        }
        function i(a) {
            a = String(a);
            var b = a.split(".");
            return b.length > 1 ? b[1].length : 0;
        }
        function j(a, b) {
            a.classList ? a.classList.add(b) : (a.className += " " + b);
        }
        function k(a, b) {
            a.classList ? a.classList.remove(b) : (a.className = a.className.replace(new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " "));
        }
        function l(a, b) {
            return a.classList ? a.classList.contains(b) : new RegExp("\\b" + b + "\\b").test(a.className);
        }
        function m() {
            var a = void 0 !== window.pageXOffset,
                b = "CSS1Compat" === (document.compatMode || "");
            return { x: a ? window.pageXOffset : b ? document.documentElement.scrollLeft : document.body.scrollLeft, y: a ? window.pageYOffset : b ? document.documentElement.scrollTop : document.body.scrollTop };
        }
        function n() {
            return window.navigator.pointerEnabled
                ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
                : window.navigator.msPointerEnabled
                ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }
                : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" };
        }
        function o(a, b) {
            return 100 / (b - a);
        }
        function p(a, b) {
            return (100 * b) / (a[1] - a[0]);
        }
        function q(a, b) {
            return p(a, a[0] < 0 ? b + Math.abs(a[0]) : b - a[0]);
        }
        function r(a, b) {
            return (b * (a[1] - a[0])) / 100 + a[0];
        }
        function s(a, b) {
            for (var c = 1; a >= b[c]; ) c += 1;
            return c;
        }
        function t(a, b, c) {
            if (c >= a.slice(-1)[0]) return 100;
            var d,
                e,
                f,
                g,
                h = s(c, a);
            return (d = a[h - 1]), (e = a[h]), (f = b[h - 1]), (g = b[h]), f + q([d, e], c) / o(f, g);
        }
        function u(a, b, c) {
            if (c >= 100) return a.slice(-1)[0];
            var d,
                e,
                f,
                g,
                h = s(c, b);
            return (d = a[h - 1]), (e = a[h]), (f = b[h - 1]), (g = b[h]), r([d, e], (c - f) * o(f, g));
        }
        function v(a, b, d, e) {
            if (100 === e) return e;
            var f,
                g,
                h = s(e, a);
            return d ? ((f = a[h - 1]), (g = a[h]), e - f > (g - f) / 2 ? g : f) : b[h - 1] ? a[h - 1] + c(e - a[h - 1], b[h - 1]) : e;
        }
        function w(a, b, c) {
            var d;
            if (("number" == typeof b && (b = [b]), "[object Array]" !== Object.prototype.toString.call(b))) throw new Error("noUiSlider: 'range' contains invalid value.");
            if (((d = "min" === a ? 0 : "max" === a ? 100 : parseFloat(a)), !e(d) || !e(b[0]))) throw new Error("noUiSlider: 'range' value isn't numeric.");
            c.xPct.push(d), c.xVal.push(b[0]), d ? c.xSteps.push(!isNaN(b[1]) && b[1]) : isNaN(b[1]) || (c.xSteps[0] = b[1]), c.xHighestCompleteStep.push(0);
        }
        function x(a, b, c) {
            if (!b) return !0;
            c.xSteps[a] = p([c.xVal[a], c.xVal[a + 1]], b) / o(c.xPct[a], c.xPct[a + 1]);
            var d = (c.xVal[a + 1] - c.xVal[a]) / c.xNumSteps[a],
                e = Math.ceil(Number(d.toFixed(3)) - 1),
                f = c.xVal[a] + c.xNumSteps[a] * e;
            c.xHighestCompleteStep[a] = f;
        }
        function y(a, b, c, d) {
            (this.xPct = []), (this.xVal = []), (this.xSteps = [d || !1]), (this.xNumSteps = [!1]), (this.xHighestCompleteStep = []), (this.snap = b), (this.direction = c);
            var e,
                f = [];
            for (e in a) a.hasOwnProperty(e) && f.push([a[e], e]);
            for (
                f.length && "object" == typeof f[0][0]
                    ? f.sort(function (a, b) {
                          return a[0][0] - b[0][0];
                      })
                    : f.sort(function (a, b) {
                          return a[0] - b[0];
                      }),
                    e = 0;
                e < f.length;
                e++
            )
                w(f[e][1], f[e][0], this);
            for (this.xNumSteps = this.xSteps.slice(0), e = 0; e < this.xNumSteps.length; e++) x(e, this.xNumSteps[e], this);
        }
        function z(a, b) {
            if (!e(b)) throw new Error("noUiSlider: 'step' is not numeric.");
            a.singleStep = b;
        }
        function A(a, b) {
            if ("object" != typeof b || Array.isArray(b)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === b.min || void 0 === b.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            if (b.min === b.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
            a.spectrum = new y(b, a.snap, a.dir, a.singleStep);
        }
        function B(a, b) {
            if (((b = h(b)), !Array.isArray(b) || !b.length)) throw new Error("noUiSlider: 'start' option is incorrect.");
            (a.handles = b.length), (a.start = b);
        }
        function C(a, b) {
            if (((a.snap = b), "boolean" != typeof b)) throw new Error("noUiSlider: 'snap' option must be a boolean.");
        }
        function D(a, b) {
            if (((a.animate = b), "boolean" != typeof b)) throw new Error("noUiSlider: 'animate' option must be a boolean.");
        }
        function E(a, b) {
            if (((a.animationDuration = b), "number" != typeof b)) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
        }
        function F(a, b) {
            var c,
                d = [!1];
            if (!0 === b || !1 === b) {
                for (c = 1; c < a.handles; c++) d.push(b);
                d.push(!1);
            } else {
                if (!Array.isArray(b) || !b.length || b.length !== a.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                d = b;
            }
            a.connect = d;
        }
        function G(a, b) {
            switch (b) {
                case "horizontal":
                    a.ort = 0;
                    break;
                case "vertical":
                    a.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.");
            }
        }
        function H(a, b) {
            if (!e(b)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            if (0 !== b && ((a.margin = a.spectrum.getMargin(b)), !a.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
        }
        function I(a, b) {
            if (!e(b)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (((a.limit = a.spectrum.getMargin(b)), !a.limit || a.handles < 2)) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
        }
        function J(a, b) {
            switch (b) {
                case "ltr":
                    a.dir = 0;
                    break;
                case "rtl":
                    a.dir = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.");
            }
        }
        function K(a, b) {
            if ("string" != typeof b) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var c = b.indexOf("tap") >= 0,
                d = b.indexOf("drag") >= 0,
                e = b.indexOf("fixed") >= 0,
                f = b.indexOf("snap") >= 0,
                g = b.indexOf("hover") >= 0;
            if (e) {
                if (2 !== a.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                H(a, a.start[1] - a.start[0]);
            }
            a.events = { tap: c || f, drag: d, fixed: e, snap: f, hover: g };
        }
        function L(a, b) {
            if (!1 !== b)
                if (!0 === b) {
                    a.tooltips = [];
                    for (var c = 0; c < a.handles; c++) a.tooltips.push(!0);
                } else {
                    if (((a.tooltips = h(b)), a.tooltips.length !== a.handles)) throw new Error("noUiSlider: must pass a formatter for all handles.");
                    a.tooltips.forEach(function (a) {
                        if ("boolean" != typeof a && ("object" != typeof a || "function" != typeof a.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                    });
                }
        }
        function M(a, b) {
            if (((a.format = b), "function" == typeof b.to && "function" == typeof b.from)) return !0;
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
        }
        function N(a, b) {
            if (void 0 !== b && "string" != typeof b && !1 !== b) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            a.cssPrefix = b;
        }
        function O(a, b) {
            if (void 0 !== b && "object" != typeof b) throw new Error("noUiSlider: 'cssClasses' must be an object.");
            if ("string" == typeof a.cssPrefix) {
                a.cssClasses = {};
                for (var c in b) b.hasOwnProperty(c) && (a.cssClasses[c] = a.cssPrefix + b[c]);
            } else a.cssClasses = b;
        }
        function P(a, b) {
            if (!0 !== b && !1 !== b) throw new Error("noUiSlider: 'useRequestAnimationFrame' option should be true (default) or false.");
            a.useRequestAnimationFrame = b;
        }
        function Q(a) {
            var b,
                c = { margin: 0, limit: 0, animate: !0, animationDuration: 300, format: T };
            b = {
                step: { r: !1, t: z },
                start: { r: !0, t: B },
                connect: { r: !0, t: F },
                direction: { r: !0, t: J },
                snap: { r: !1, t: C },
                animate: { r: !1, t: D },
                animationDuration: { r: !1, t: E },
                range: { r: !0, t: A },
                orientation: { r: !1, t: G },
                margin: { r: !1, t: H },
                limit: { r: !1, t: I },
                behaviour: { r: !0, t: K },
                format: { r: !1, t: M },
                tooltips: { r: !1, t: L },
                cssPrefix: { r: !1, t: N },
                cssClasses: { r: !1, t: O },
                useRequestAnimationFrame: { r: !1, t: P },
            };
            var d = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub",
                },
                useRequestAnimationFrame: !0,
            };
            Object.keys(b).forEach(function (e) {
                if (void 0 === a[e] && void 0 === d[e]) {
                    if (b[e].r) throw new Error("noUiSlider: '" + e + "' is required.");
                    return !0;
                }
                b[e].t(c, void 0 === a[e] ? d[e] : a[e]);
            }),
                (c.pips = a.pips);
            var e = [
                ["left", "top"],
                ["right", "bottom"],
            ];
            return (c.style = e[c.dir][c.ort]), (c.styleOposite = e[c.dir ? 0 : 1][c.ort]), c;
        }
        function R(c, e, i) {
            function o(b, c) {
                var d = a(b, e.cssClasses.origin);
                return a(d, e.cssClasses.handle).setAttribute("data-handle", c), d;
            }
            function p(b, c) {
                return !!c && a(b, e.cssClasses.connect);
            }
            function q(b, c) {
                return !!e.tooltips[c] && a(b.firstChild, e.cssClasses.tooltip);
            }
            function r(a, b, c) {
                if ("range" === a || "steps" === a) return ea.xVal;
                if ("count" === a) {
                    var d,
                        e = 100 / (b - 1),
                        f = 0;
                    for (b = []; (d = f++ * e) <= 100; ) b.push(d);
                    a = "positions";
                }
                return "positions" === a
                    ? b.map(function (a) {
                          return ea.fromStepping(c ? ea.getStep(a) : a);
                      })
                    : "values" === a
                    ? c
                        ? b.map(function (a) {
                              return ea.fromStepping(ea.getStep(ea.toStepping(a)));
                          })
                        : b
                    : void 0;
            }
            function s(a, c, d) {
                function e(a, b) {
                    return (a + b).toFixed(7) / 1;
                }
                var f = {},
                    g = ea.xVal[0],
                    h = ea.xVal[ea.xVal.length - 1],
                    i = !1,
                    j = !1,
                    k = 0;
                return (
                    (d = b(
                        d.slice().sort(function (a, b) {
                            return a - b;
                        })
                    )),
                    d[0] !== g && (d.unshift(g), (i = !0)),
                    d[d.length - 1] !== h && (d.push(h), (j = !0)),
                    d.forEach(function (b, g) {
                        var h,
                            l,
                            m,
                            n,
                            o,
                            p,
                            q,
                            r,
                            s,
                            t,
                            u = b,
                            v = d[g + 1];
                        if (("steps" === c && (h = ea.xNumSteps[g]), h || (h = v - u), !1 !== u && void 0 !== v))
                            for (h = Math.max(h, 1e-7), l = u; l <= v; l = e(l, h)) {
                                for (n = ea.toStepping(l), o = n - k, r = o / a, s = Math.round(r), t = o / s, m = 1; m <= s; m += 1) (p = k + m * t), (f[p.toFixed(5)] = ["x", 0]);
                                (q = d.indexOf(l) > -1 ? 1 : "steps" === c ? 2 : 0), !g && i && (q = 0), (l === v && j) || (f[n.toFixed(5)] = [l, q]), (k = n);
                            }
                    }),
                    f
                );
            }
            function t(a, b, c) {
                function d(a, b) {
                    var c = b === e.cssClasses.value,
                        d = c ? m : n,
                        f = c ? k : l;
                    return b + " " + d[e.ort] + " " + f[a];
                }
                function f(a, b, c) {
                    return 'class="' + d(c[1], b) + '" style="' + e.style + ": " + a + '%"';
                }
                function g(a, d) {
                    (d[1] = d[1] && b ? b(d[0], d[1]) : d[1]), (i += "<div " + f(a, e.cssClasses.marker, d) + "></div>"), d[1] && (i += "<div " + f(a, e.cssClasses.value, d) + ">" + c.to(d[0]) + "</div>");
                }
                var h = document.createElement("div"),
                    i = "",
                    k = [e.cssClasses.valueNormal, e.cssClasses.valueLarge, e.cssClasses.valueSub],
                    l = [e.cssClasses.markerNormal, e.cssClasses.markerLarge, e.cssClasses.markerSub],
                    m = [e.cssClasses.valueHorizontal, e.cssClasses.valueVertical],
                    n = [e.cssClasses.markerHorizontal, e.cssClasses.markerVertical];
                return (
                    j(h, e.cssClasses.pips),
                    j(h, 0 === e.ort ? e.cssClasses.pipsHorizontal : e.cssClasses.pipsVertical),
                    Object.keys(a).forEach(function (b) {
                        g(b, a[b]);
                    }),
                    (h.innerHTML = i),
                    h
                );
            }
            function u(a) {
                var b = a.mode,
                    c = a.density || 1,
                    d = a.filter || !1,
                    e = a.values || !1,
                    f = a.stepped || !1,
                    g = r(b, e, f),
                    h = s(c, b, g),
                    i = a.format || { to: Math.round };
                return ba.appendChild(t(h, d, i));
            }
            function v() {
                var a = Y.getBoundingClientRect(),
                    b = "offset" + ["Width", "Height"][e.ort];
                return 0 === e.ort ? a.width || Y[b] : a.height || Y[b];
            }
            function w(a, b, c, d) {
                var f = function (b) {
                        return (
                            !ba.hasAttribute("disabled") &&
                            !l(ba, e.cssClasses.tap) &&
                            ((b = x(b, d.pageOffset)), !(a === aa.start && void 0 !== b.buttons && b.buttons > 1) && (!d.hover || !b.buttons) && ((b.calcPoint = b.points[e.ort]), void c(b, d)))
                        );
                    },
                    g = [];
                return (
                    a.split(" ").forEach(function (a) {
                        b.addEventListener(a, f, !1), g.push([a, f]);
                    }),
                    g
                );
            }
            function x(a, b) {
                a.preventDefault();
                var c,
                    d,
                    e = 0 === a.type.indexOf("touch"),
                    f = 0 === a.type.indexOf("mouse"),
                    g = 0 === a.type.indexOf("pointer"),
                    h = a;
                if ((0 === a.type.indexOf("MSPointer") && (g = !0), e)) {
                    if (h.touches.length > 1) return !1;
                    (c = a.changedTouches[0].pageX), (d = a.changedTouches[0].pageY);
                }
                return (b = b || m()), (f || g) && ((c = a.clientX + b.x), (d = a.clientY + b.y)), (h.pageOffset = b), (h.points = [c, d]), (h.cursor = f || g), h;
            }
            function y(a) {
                var b = a - d(Y, e.ort),
                    c = (100 * b) / v();
                return e.dir ? 100 - c : c;
            }
            function z(a) {
                var b = 100,
                    c = !1;
                return (
                    Z.forEach(function (d, e) {
                        if (!d.hasAttribute("disabled")) {
                            var f = Math.abs(ca[e] - a);
                            f < b && ((c = e), (b = f));
                        }
                    }),
                    c
                );
            }
            function A(a, b, c, d) {
                var e = c.slice(),
                    f = [!a, a],
                    g = [a, !a];
                (d = d.slice()),
                    a && d.reverse(),
                    d.length > 1
                        ? d.forEach(function (a, c) {
                              var d = I(e, a, e[a] + b, f[c], g[c]);
                              !1 === d ? (b = 0) : ((b = d - e[a]), (e[a] = d));
                          })
                        : (f = g = [!0]);
                var h = !1;
                d.forEach(function (a, d) {
                    h = M(a, c[a] + b, f[d], g[d]) || h;
                }),
                    h &&
                        d.forEach(function (a) {
                            B("update", a), B("slide", a);
                        });
            }
            function B(a, b, c) {
                Object.keys(ga).forEach(function (d) {
                    var f = d.split(".")[0];
                    a === f &&
                        ga[d].forEach(function (a) {
                            a.call(_, fa.map(e.format.to), b, fa.slice(), c || !1, ca.slice());
                        });
                });
            }
            function C(a, b) {
                "mouseout" === a.type && "HTML" === a.target.nodeName && null === a.relatedTarget && E(a, b);
            }
            function D(a, b) {
                if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === a.buttons && 0 !== b.buttonsProperty) return E(a, b);
                var c = (e.dir ? -1 : 1) * (a.calcPoint - b.startCalcPoint);
                A(c > 0, (100 * c) / b.baseSize, b.locations, b.handleNumbers);
            }
            function E(a, b) {
                var c = Y.querySelector("." + e.cssClasses.active);
                null !== c && k(c, e.cssClasses.active),
                    a.cursor && ((document.body.style.cursor = ""), document.body.removeEventListener("selectstart", document.body.noUiListener)),
                    document.documentElement.noUiListeners.forEach(function (a) {
                        document.documentElement.removeEventListener(a[0], a[1]);
                    }),
                    k(ba, e.cssClasses.drag),
                    L(),
                    b.handleNumbers.forEach(function (a) {
                        B("set", a), B("change", a), B("end", a);
                    });
            }
            function F(a, b) {
                if (1 === b.handleNumbers.length) {
                    var c = Z[b.handleNumbers[0]];
                    if (c.hasAttribute("disabled")) return !1;
                    j(c.children[0], e.cssClasses.active);
                }
                a.preventDefault(), a.stopPropagation();
                var d = w(aa.move, document.documentElement, D, { startCalcPoint: a.calcPoint, baseSize: v(), pageOffset: a.pageOffset, handleNumbers: b.handleNumbers, buttonsProperty: a.buttons, locations: ca.slice() }),
                    f = w(aa.end, document.documentElement, E, { handleNumbers: b.handleNumbers }),
                    g = w("mouseout", document.documentElement, C, { handleNumbers: b.handleNumbers });
                if (((document.documentElement.noUiListeners = d.concat(f, g)), a.cursor)) {
                    (document.body.style.cursor = getComputedStyle(a.target).cursor), Z.length > 1 && j(ba, e.cssClasses.drag);
                    var h = function () {
                        return !1;
                    };
                    (document.body.noUiListener = h), document.body.addEventListener("selectstart", h, !1);
                }
                b.handleNumbers.forEach(function (a) {
                    B("start", a);
                });
            }
            function G(a) {
                a.stopPropagation();
                var b = y(a.calcPoint),
                    c = z(b);
                return (
                    !1 !== c &&
                    (e.events.snap || f(ba, e.cssClasses.tap, e.animationDuration), M(c, b, !0, !0), L(), B("slide", c, !0), B("set", c, !0), B("change", c, !0), B("update", c, !0), void (e.events.snap && F(a, { handleNumbers: [c] })))
                );
            }
            function H(a) {
                var b = y(a.calcPoint),
                    c = ea.getStep(b),
                    d = ea.fromStepping(c);
                Object.keys(ga).forEach(function (a) {
                    "hover" === a.split(".")[0] &&
                        ga[a].forEach(function (a) {
                            a.call(_, d);
                        });
                });
            }
            function I(a, b, c, d, f) {
                return (
                    Z.length > 1 && (d && b > 0 && (c = Math.max(c, a[b - 1] + e.margin)), f && b < Z.length - 1 && (c = Math.min(c, a[b + 1] - e.margin))),
                    Z.length > 1 && e.limit && (d && b > 0 && (c = Math.min(c, a[b - 1] + e.limit)), f && b < Z.length - 1 && (c = Math.max(c, a[b + 1] - e.limit))),
                    (c = ea.getStep(c)),
                    (c = g(c)) !== a[b] && c
                );
            }
            function J(a) {
                return a + "%";
            }
            function K(a, b) {
                (ca[a] = b), (fa[a] = ea.fromStepping(b));
                var c = function () {
                    (Z[a].style[e.style] = J(b)), N(a), N(a + 1);
                };
                window.requestAnimationFrame && e.useRequestAnimationFrame ? window.requestAnimationFrame(c) : c();
            }
            function L() {
                da.forEach(function (a) {
                    var b = ca[a] > 50 ? -1 : 1,
                        c = 3 + (Z.length + b * a);
                    Z[a].childNodes[0].style.zIndex = c;
                });
            }
            function M(a, b, c, d) {
                return !1 !== (b = I(ca, a, b, c, d)) && (K(a, b), !0);
            }
            function N(a) {
                if ($[a]) {
                    var b = 0,
                        c = 100;
                    0 !== a && (b = ca[a - 1]), a !== $.length - 1 && (c = ca[a]), ($[a].style[e.style] = J(b)), ($[a].style[e.styleOposite] = J(100 - c));
                }
            }
            function O(a, b) {
                null !== a && !1 !== a && ("number" == typeof a && (a = String(a)), !1 === (a = e.format.from(a)) || isNaN(a) || M(b, ea.toStepping(a), !1, !1));
            }
            function P(a, b) {
                var c = h(a),
                    d = void 0 === ca[0];
                (b = void 0 === b || !!b),
                    c.forEach(O),
                    e.animate && !d && f(ba, e.cssClasses.tap, e.animationDuration),
                    da.forEach(function (a) {
                        M(a, ca[a], !0, !1);
                    }),
                    L(),
                    da.forEach(function (a) {
                        B("update", a), null !== c[a] && b && B("set", a);
                    });
            }
            function R(a) {
                P(e.start, a);
            }
            function S() {
                var a = fa.map(e.format.to);
                return 1 === a.length ? a[0] : a;
            }
            function T() {
                for (var a in e.cssClasses) e.cssClasses.hasOwnProperty(a) && k(ba, e.cssClasses[a]);
                for (; ba.firstChild; ) ba.removeChild(ba.firstChild);
                delete ba.noUiSlider;
            }
            function U() {
                return ca.map(function (a, b) {
                    var c = ea.getNearbySteps(a),
                        d = fa[b],
                        e = c.thisStep.step,
                        f = null;
                    !1 !== e && d + e > c.stepAfter.startValue && (e = c.stepAfter.startValue - d),
                        (f = d > c.thisStep.startValue ? c.thisStep.step : !1 !== c.stepBefore.step && d - c.stepBefore.highestStep),
                        100 === a ? (e = null) : 0 === a && (f = null);
                    var g = ea.countStepDecimals();
                    return null !== e && !1 !== e && (e = Number(e.toFixed(g))), null !== f && !1 !== f && (f = Number(f.toFixed(g))), [f, e];
                });
            }
            function V(a, b) {
                (ga[a] = ga[a] || []),
                    ga[a].push(b),
                    "update" === a.split(".")[0] &&
                        Z.forEach(function (a, b) {
                            B("update", b);
                        });
            }
            function W(a) {
                var b = a && a.split(".")[0],
                    c = b && a.substring(b.length);
                Object.keys(ga).forEach(function (a) {
                    var d = a.split(".")[0],
                        e = a.substring(d.length);
                    (b && b !== d) || (c && c !== e) || delete ga[a];
                });
            }
            function X(a, b) {
                var c = S(),
                    d = ["margin", "limit", "range", "animate", "snap", "step", "format"];
                d.forEach(function (b) {
                    void 0 !== a[b] && (i[b] = a[b]);
                });
                var f = Q(i);
                d.forEach(function (b) {
                    void 0 !== a[b] && (e[b] = f[b]);
                }),
                    (f.spectrum.direction = ea.direction),
                    (ea = f.spectrum),
                    (e.margin = f.margin),
                    (e.limit = f.limit),
                    (ca = []),
                    P(a.start || c, b);
            }
            var Y,
                Z,
                $,
                _,
                aa = n(),
                ba = c,
                ca = [],
                da = [],
                ea = e.spectrum,
                fa = [],
                ga = {};
            if (ba.noUiSlider) throw new Error("Slider was already initialized.");
            return (
                (function (b) {
                    j(b, e.cssClasses.target), 0 === e.dir ? j(b, e.cssClasses.ltr) : j(b, e.cssClasses.rtl), 0 === e.ort ? j(b, e.cssClasses.horizontal) : j(b, e.cssClasses.vertical), (Y = a(b, e.cssClasses.base));
                })(ba),
                (function (a, b) {
                    (Z = []), ($ = []), $.push(p(b, a[0]));
                    for (var c = 0; c < e.handles; c++) Z.push(o(b, c)), (da[c] = c), $.push(p(b, a[c + 1]));
                })(e.connect, Y),
                (_ = {
                    destroy: T,
                    steps: U,
                    on: V,
                    off: W,
                    get: S,
                    set: P,
                    reset: R,
                    __moveHandles: function (a, b, c) {
                        A(a, b, ca, c);
                    },
                    options: i,
                    updateOptions: X,
                    target: ba,
                    pips: u,
                }),
                (function (a) {
                    a.fixed ||
                        Z.forEach(function (a, b) {
                            w(aa.start, a.children[0], F, { handleNumbers: [b] });
                        }),
                        a.tap && w(aa.start, Y, G, {}),
                        a.hover && w(aa.move, Y, H, { hover: !0 }),
                        a.drag &&
                            $.forEach(function (b, c) {
                                if (!1 !== b && 0 !== c && c !== $.length - 1) {
                                    var d = Z[c - 1],
                                        f = Z[c],
                                        g = [b];
                                    j(b, e.cssClasses.draggable),
                                        a.fixed && (g.push(d.children[0]), g.push(f.children[0])),
                                        g.forEach(function (a) {
                                            w(aa.start, a, F, { handles: [d, f], handleNumbers: [c - 1, c] });
                                        });
                                }
                            });
                })(e.events),
                P(e.start),
                e.pips && u(e.pips),
                e.tooltips &&
                    (function () {
                        var a = Z.map(q);
                        V("update", function (b, c, d) {
                            if (a[c]) {
                                var f = b[c];
                                !0 !== e.tooltips[c] && (f = e.tooltips[c].to(d[c])), (a[c].innerHTML = f);
                            }
                        });
                    })(),
                _
            );
        }
        function S(a, b) {
            if (!a.nodeName) throw new Error("noUiSlider.create requires a single element.");
            var c = Q(b, a),
                d = R(a, c, b);
            return (a.noUiSlider = d), d;
        }
        (y.prototype.getMargin = function (a) {
            var b = this.xNumSteps[0];
            if (b && a % b) throw new Error("noUiSlider: 'limit' and 'margin' must be divisible by step.");
            return 2 === this.xPct.length && p(this.xVal, a);
        }),
            (y.prototype.toStepping = function (a) {
                return (a = t(this.xVal, this.xPct, a));
            }),
            (y.prototype.fromStepping = function (a) {
                return u(this.xVal, this.xPct, a);
            }),
            (y.prototype.getStep = function (a) {
                return (a = v(this.xPct, this.xSteps, this.snap, a));
            }),
            (y.prototype.getNearbySteps = function (a) {
                var b = s(a, this.xPct);
                return {
                    stepBefore: { startValue: this.xVal[b - 2], step: this.xNumSteps[b - 2], highestStep: this.xHighestCompleteStep[b - 2] },
                    thisStep: { startValue: this.xVal[b - 1], step: this.xNumSteps[b - 1], highestStep: this.xHighestCompleteStep[b - 1] },
                    stepAfter: { startValue: this.xVal[b - 0], step: this.xNumSteps[b - 0], highestStep: this.xHighestCompleteStep[b - 0] },
                };
            }),
            (y.prototype.countStepDecimals = function () {
                var a = this.xNumSteps.map(i);
                return Math.max.apply(null, a);
            }),
            (y.prototype.convert = function (a) {
                return this.getStep(this.toStepping(a));
            });
        var T = {
            to: function (a) {
                return void 0 !== a && a.toFixed(2);
            },
            from: Number,
        };
        return { create: S };
    }),
    (function () {
        "use strict";
        function a(a) {
            return a.split("").reverse().join("");
        }
        function b(a, b) {
            return a.substring(0, b.length) === b;
        }
        function c(a, b) {
            return a.slice(-1 * b.length) === b;
        }
        function d(a, b, c) {
            if ((a[b] || a[c]) && a[b] === a[c]) throw new Error(b);
        }
        function e(a) {
            return "number" == typeof a && isFinite(a);
        }
        function f(a, b) {
            var c = Math.pow(10, b);
            return (Math.round(a * c) / c).toFixed(b);
        }
        function g(b, c, d, g, h, i, j, k, l, m, n, o) {
            var p,
                q,
                r,
                s = o,
                t = "",
                u = "";
            return (
                i && (o = i(o)),
                !!e(o) &&
                    (!1 !== b && 0 === parseFloat(o.toFixed(b)) && (o = 0),
                    o < 0 && ((p = !0), (o = Math.abs(o))),
                    !1 !== b && (o = f(o, b)),
                    (o = o.toString()),
                    -1 !== o.indexOf(".") ? ((q = o.split(".")), (r = q[0]), d && (t = d + q[1])) : (r = o),
                    c && ((r = a(r).match(/.{1,3}/g)), (r = a(r.join(a(c))))),
                    p && k && (u += k),
                    g && (u += g),
                    p && l && (u += l),
                    (u += r),
                    (u += t),
                    h && (u += h),
                    m && (u = m(u, s)),
                    u)
            );
        }
        function h(a, d, f, g, h, i, j, k, l, m, n, o) {
            var p,
                q = "";
            return (
                n && (o = n(o)),
                !(!o || "string" != typeof o) &&
                    (k && b(o, k) && ((o = o.replace(k, "")), (p = !0)),
                    g && b(o, g) && (o = o.replace(g, "")),
                    l && b(o, l) && ((o = o.replace(l, "")), (p = !0)),
                    h && c(o, h) && (o = o.slice(0, -1 * h.length)),
                    d && (o = o.split(d).join("")),
                    f && (o = o.replace(f, ".")),
                    p && (q += "-"),
                    (q += o),
                    "" !== (q = q.replace(/[^0-9\.\-.]/g, "")) && ((q = Number(q)), j && (q = j(q)), !!e(q) && q))
            );
        }
        function i(a) {
            var b,
                c,
                e,
                f = {};
            for (b = 0; b < l.length; b += 1)
                if (((c = l[b]), void 0 === (e = a[c]))) "negative" !== c || f.negativeBefore ? ("mark" === c && "." !== f.thousand ? (f[c] = ".") : (f[c] = !1)) : (f[c] = "-");
                else if ("decimals" === c) {
                    if (!(e >= 0 && e < 8)) throw new Error(c);
                    f[c] = e;
                } else if ("encoder" === c || "decoder" === c || "edit" === c || "undo" === c) {
                    if ("function" != typeof e) throw new Error(c);
                    f[c] = e;
                } else {
                    if ("string" != typeof e) throw new Error(c);
                    f[c] = e;
                }
            return d(f, "mark", "thousand"), d(f, "prefix", "negative"), d(f, "prefix", "negativeBefore"), f;
        }
        function j(a, b, c) {
            var d,
                e = [];
            for (d = 0; d < l.length; d += 1) e.push(a[l[d]]);
            return e.push(c), b.apply("", e);
        }
        function k(a) {
            if (!(this instanceof k)) return new k(a);
            "object" == typeof a &&
                ((a = i(a)),
                (this.to = function (b) {
                    return j(a, g, b);
                }),
                (this.from = function (b) {
                    return j(a, h, b);
                }));
        }
        var l = ["decimals", "thousand", "mark", "prefix", "postfix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo"];
        window.wNumb = k;
    })();
var jQ = jQuery.noConflict(!0),
    BCSfFilter = function () {
        (this.version = "v2"),
            (this.prefix = "pf"),
            (this.queryParams = {}),
            (this.internalClick = !1),
            (this.selectFilter = !1),
            (this.imutableFilterTree = ["page", "sort", "limit", "display", "_"]),
            (this.hasFilterOptionParam = !1),
            (this.scrollData = []),
            (this.shopName = ""),
            (this.shopDomain = ""),
            (this.fileUrl = ""),
            (this.defaultCurrency = ""),
            (this.moneyFormat = ""),
            (this.collectionId = ""),
            (this.collectionTags = ""),
            (this.currentTags = ""),
            (this.defaultSorting = ""),
            (this.swatchExtension = ""),
            (this.productAvailable = !0),
            (this.variantAvailable = !0),
            (this.loadProductFirst = !1),
            (this.searchTermKey = "q"),
            (this.suggestionCache = {}),
            (this.currentTerm = ""),
            (this.class = {
                filterOption: "bc-sf-filter-option-block",
                filterBlockTitle: "bc-sf-filter-block-title",
                filterBlockContent: "bc-sf-filter-block-content",
                selectFilterOptionButton: "bc-sf-filter-select-button",
                filterOptionItem: "bc-sf-filter-option-item",
                filterOptionLabel: "bc-sf-filter-option-label",
                filterOptionRange: "bc-sf-filter-option-range",
                filterRefineWrapper: "bc-sf-filter-selection-wrapper",
                filterSelectedItems: "bc-sf-filter-selected-items",
                filterSelectedItemsMobile: "bc-sf-filter-selected-items-mobile",
                filterOptionHidden: "bc-sf-filter-option-hidden",
                filterOptionOpenList: "bc-sf-filter-option-open-list",
                filterOptionCloseList: "bc-sf-filter-option-close-list",
                filterOptionMultipleList: "bc-sf-filter-option-multiple-list",
                filterOptionViewMore: "bc-sf-filter-option-view-more",
                filterOptionViewLess: "bc-sf-filter-option-view-less",
                filterOptionViewMoreList: "bc-sf-filter-view-more-list",
                clearButton: "bc-sf-filter-clear",
                clearAllButton: "bc-sf-filter-clear-all",
                collectionHeader: "bc-sf-filter-collection-header",
                collectionDescription: "bc-sf-filter-collection-description",
                filterOptionTooltip: "bc-sf-filter-option-tooltip",
                searchBox: "bc-sf-search-box",
                searchResultHeader: "bc-sf-search-result-header",
                searchResultNumber: "bc-sf-search-result-number",
                searchSuggestion: "bc-sf-search-suggestion",
                searchSuggestionWrapper: "bc-sf-search-suggestion-wrapper",
                searchSuggestionHeader: "bc-sf-search-suggestion-header",
                searchSuggestionItem: "bc-sf-search-suggestion-item",
                searchSuggestionMobile: "bc-sf-search-suggestion-mobile",
                searchSuggestionLoading: "bc-sf-search-suggestion-loading",
                searchSuggestionMobileOpen: "bc-sf-search-suggestion-mobile-open",
                mobileButtonOpen: "bc-sf-filter-tree-mobile-button-open",
                mobileDetectiOS: "bc-sf-filter-mobile-detect-ios",
            }),
            (this.selector = {
                filterWrapper: "#bc-sf-filter-wrapper",
                filterTree: "#bc-sf-filter-tree",
                filterTreeHorizontal: "#bc-sf-filter-tree-h",
                filterTreeMobile: "#bc-sf-filter-tree-mobile",
                filterTreeMobileButton: "#bc-sf-filter-tree-mobile-button",
                filterOptionOpenValue: "bc-sf-filter-filter-option-open",
                filterOptionSubmitOpenValue: "bc-sf-filter-filter-option-s-open",
                products: "#bc-sf-filter-products",
                searchBoxMobile: "#bc-sf-search-box-mobile",
                topShowLimit: "#bc-sf-filter-top-show-limit",
                topSorting: "#bc-sf-filter-top-sorting",
                topDisplayType: "#bc-sf-filter-top-display-type",
                pagination: "#bc-sf-filter-bottom-pagination,#bc-sf-filter-top-pagination",
                bottomPagination: "#bc-sf-filter-bottom-pagination",
                loadMore: "#bc-sf-filter-load-more",
                loadMoreButtonContainer: "#bc-sf-filter-load-more-button-container",
                btnLoadPreviousPageWrapperSelector: "#bc-sf-filter-btn-load-previous-page-wrapper",
                btnLoadPreviousPageSelector: "#bc-sf-filter-btn-load-previous-page",
                loadMoreLoading: "#bc-sf-filter-load-more-loading",
                topNotification: "#bc-sf-filter-top-notification",
                breadcrumb: "#bc-sf-filter-breadcrumb",
                scrollToTop: "#bc-sf-filter-scroll-to-top",
            }),
            (this.template = {
                filterOptionWrapper:
                    '<div class="{{class.filterOption}} {{blockTypeClass}} {{blockId}}" data-block-id="{{blockId}}"><div class="{{class.filterBlockTitle}}"><h3><span>{{blockTitle}}</span></h3>{{tooltip}}{{clearButton}}</div><div class="{{class.filterBlockContent}}">{{blockContent}}</div></div>',
                filterOptionHorizontalWrapper:
                    '<div class="{{class.filterOption}} {{blockTypeClass}} {{blockId}}" data-block-id="{{blockId}}"><div class="{{class.filterBlockTitle}}" id={{blockTitleId}}><a tabindex="0" role="button" aria-controls="{{blockContentId}}" aria-expanded="false" href="javascript:;"><span>{{blockTitle}}{{tooltip}}</span><div></div></a></div><div class="{{class.filterBlockContent}}" id={{blockContentId}}><div class="{{class.filterBlockContent}}-inner">{{blockContent}}</div>{{btnApply}}{{clearButton}}</div></div>',
                filterOptionLabel: '<span></span><span class="bc-sf-filter-option-value">{{itemValue}}</span><span class="bc-sf-filter-option-amount">{{itemAmount}}</span>',
                filterOptionSingleList: '<ul class="bc-sf-filter-option-single-list">{{itemList}}</ul>',
                filterOptionSingleListItem: '<li><a href="{{itemLink}}" onClick="{{itemFunc}}" class="{{class.filterOptionItem}} {{class.filterOptionLabel}} {{itemSelected}}">{{itemLabel}}</a></li>',
                filterOptionMultipleList: '<ul class="bc-sf-filter-option-multiple-list">{{itemList}}</ul>',
                filterOptionMultipleListItem: '<li><a href="javascript:;" onClick="{{itemFunc}}" class="{{class.filterOptionItem}} {{class.filterOptionLabel}} {{itemSelected}}">{{itemLabel}}</a></li>',
                filterOptionBox: '<ul class="bc-sf-filter-option-box">{{itemList}}</ul>',
                filterOptionBoxItem: '<li><a  href="javascript:;" onClick="{{itemFunc}}" class="{{class.filterOptionItem}} {{class.filterOptionLabel}} {{itemSelected}}">{{itemLabel}}</a></li>',
                filterOptionRange:
                    '<div><div class="bc-sf-filter-option-range-amount" id="{{rangeAmountId}}"><input class="bc-sf-filter-option-range-amount-min" aria-label="Min Price" type="text" /><div class="bc-sf-filter-option-range-amount-split"> - </div><input class="bc-sf-filter-option-range-amount-max" aria-label="Max Price" type="text" /></div><div class="bc-sf-filter-option-range-slider {{itemSelected}}" id="{{rangeSliderId}}" data-id="{{itemParentId}}" data-value="{{itemValue}}" data-parent-label="{{itemParentLabel}}"></div></div>',
                filterOptionRange2:
                    '<div><div class="bc-sf-filter-option-range-amount" id="{{rangeAmountId}}">{{itemLabel}}</div><div class="bc-sf-filter-option-range-slider {{itemSelected}}" id="{{rangeSliderId}}" data-id="{{itemParentId}}" data-value="{{itemValue}}" data-parent-label="{{itemParentLabel}}"></div></div>',
                filterOptionAdvancedRange:
                    '<div><div class="bc-sf-filter-option-range-slider bc-sf-filter-option-advanced-range-slider {{itemSelected}}" id="{{rangeSliderId}}" data-id="{{itemParentId}}" data-value="{{itemValue}}" data-parent-label="{{itemParentLabel}}"></div></div>',
                filterOptionRangeLabel: "<span>{{minValue}}</span> <span>-</span> <span>{{maxValue}}</span>",
                filterOptionSwatch: '<ul class="bc-sf-filter-option-swatch {{swatchStyle}}">{{itemList}}</ul>',
                filterOptionSwatchItem:
                    '<li><a href="javascript:;" title="{{itemTitle}}" onClick="{{itemFunc}}" class="{{class.filterOptionItem}} {{itemSelected}}" title="{{itemTitle}}"><span class="bc-sf-filter-option-swatch-image" style="background-color: {{itemValue}}; background-image: url({{itemImageValue}}); border: {{itemBorder}}"></span>{{itemLabel}}</a></li>',
                filterOptionSwatchHorizontalItem:
                    '<li><a href="javascript:;" title="{{itemTitle}}" onClick="{{itemFunc}}" class="{{class.filterOptionItem}} {{class.filterOptionLabel}} {{itemSelected}}"><span style="background-color: {{itemValue}}; background-image: url({{itemImageValue}}); border: {{itemBorder}}"></span></a><span data-id="{{itemParentId}}" data-value="{{itemValue}}" data-parent-label="{{itemParentLabel}}" title="{{itemTitle}}" onClick="{{itemFunc}}" class="{{itemSelected}}">{{itemLabel}}</span></li>',
                filterOptionRating: '<ul class="bc-sf-filter-option-rating {{itemMultipleSelect}}">{{itemList}}</ul>',
                filterOptionRatingItem: '<li><a href="{{itemLink}}" onClick="{{itemFunc}}" class="{{class.filterOptionItem}} {{class.filterOptionLabel}} {{itemSelected}}">{{itemLabel}}</span></a></li>',
                filterOptionRatingStar: "{{itemStars}}<span>{{label.ratingUp}}</span>",
                filterOptionRatingIconStar: '<i style="color: {{ratingStartColor}};" class="bc-sf-filter-icon-star">&#xe801;</i>',
                filterOptionRatingIconStarActive: '<i style="color: {{ratingStartColor}};" class="bc-sf-filter-icon-star bc-sf-filter-icon-star-active ">&#xe800;</i>',
                filterRefineWrapper: '<div class="{{class.filterRefineWrapper}}"><div class="{{class.filterBlockTitle}}"><h3><span>{{label}}</span></h3></div><div class="{{class.filterSelectedItems}}">{{selectedItems}}</div></div>',
                filterRefineItem:
                    '<div class="selected-item {{class.filterOptionLabel}}"><a href="{{itemLink}}"><span class="selected-type"><span>{{itemType}}</span>: <strong>{{itemLabel}}</strong></span><span class="{{class.clearButton}}"></span></a></div>',
                filterRefineHorizontalWrapper: '<div class="bc-sf-filter-pc {{class.filterRefineWrapper}}"><span>{{label}}</span><div class="{{class.filterSelectedItems}}">{{selectedItems}}</div></div>',
                filterRefineHorizontalItem: '<div class="selected-item"><a href="{{itemLink}}"><span class="{{class.filterOptionLabel}} selected-type">{{itemLabel}}</span><span class="{{class.clearButton}}"></span></a></div>',
                filterTreeMobileButton: '<button id="bc-sf-filter-tree-mobile-button" type="button">{{label}}</button>',
                filterOptionViewMore: '<div class="bc-sf-filter-option-view-more"><a href="javascript:;" aria-label="{{label.viewMore}}" onclick="viewMoreFilterOption(this)">{{label.viewMore}}</a></div>',
                filterOptionViewLess: '<div class="bc-sf-filter-option-view-less"><a href="javascript:;" aria-label="{{label.viewLess}}" onclick="viewLessFilterOption(this)">{{label.viewLess}}</a></div>',
                clearAllButton: '<a href="javascript:;" aria-label="{{label.clearAll}}" class="{{class.clearAllButton}}" onClick="clearAllFilterOptions(event)">{{label.clearAll}}</a>',
                loadMoreButton:
                    '<div id="bc-sf-filter-load-more-total"></div><div id="bc-sf-filter-load-more-button-container"><a href="javascript:;" aria-label="{{label.loadMore}}" class="bc-sf-filter-load-more-button">{{label.loadMore}}</a></div>',
                btnLoadPreviousPageTemplate:
                    '<div id="bc-sf-filter-btn-load-previous-page"><a href="javascript:void(0)" aria-label="{{label.loadPreviousPage}}" class="js-bc-sf-filter-btn-load-previous-page">{{label.loadPreviousPage}}</a></div>',
                loadMoreLoading: '<div id="bc-sf-filter-load-more-loading">{{loadingIcon}}</div>',
                loading: '<div id="bc-sf-filter-loading"></div>',
                error: '<div id="bc-sf-filter-error">{{content}}<div class="btn-wrapper"><button>Close</button></div></div>',
                noResult: '<div id="bc-sf-filter-message"><p><em>{{content}}</em></p></div>',
                scrollToTop: '<a href="javascript:;" aria-label="Back to top" id="bc-sf-filter-scroll-to-top"><span>Back to top</span></a>',
                skeletonProduct:
                    '<div class="{{wrapClass}} bc-sf-filter-product-skeleton"><div class="bc-sf-filter-skeleton-image" style="padding-top: {{paddingTop}}%"></div><div class="bc-sf-filter-skeleton-meta"><span class="bc-sf-filter-skeleton-text bc-sf-filter-skeleton"></span><span class="bc-sf-filter-skeleton-text bc-sf-filter-skeleton-width1"></span></div></div>',
                skeletonSpan: '<span class="bc-sf-filter-skeleton-text bc-sf-filter-skeleton-width{{skeletonWidth}}"></span>',
            }),
            (this.defaultSettings = {
                general: {
                    filterPrefixParam: "pf_",
                    limit: 16,
                    showSingleOption: !0,
                    activeFilterScrollbar: !0,
                    activeFilterScrollbarPC: !0,
                    showMoreType: "",
                    activeScrollToTop: !1,
                    styleScrollToTop: "style1",
                    showLoading: !1,
                    showLoadMoreLoading: !0,
                    showMobileLoading: !1,
                    positionShowInfiniteLoading: 700,
                    showRefineBy: !0,
                    showOutOfStockOption: !1,
                    showFilterOptionCount: !0,
                    capitalizeFilterOptionValues: !0,
                    forceCapitalizeFilterOptionValues: !1,
                    capitalizeFirstLetterFilterOptionValues: !1,
                    collapseOnMobileByDefault: !1,
                    refineByHorizontalPosition: "bottom",
                    keepScrollState: !0,
                    keepToggleState: !1,
                    rangeStyle: "style1",
                    decimalPriceRange: 0,
                    removePriceDecimal: !1,
                    decimalDelimiter: ".",
                    roundPriceSlider: !1,
                    oneValueRangeSlider: !1,
                    advancedRangeSliders: [],
                    shortenPipsRange: !1,
                    formatPipsRange: [
                        { node: 1e3, symbol: "K", fix: 0, suffix: !1 },
                        { node: 1e6, symbol: "M", fix: 3, suffix: !1 },
                    ],
                    sortManualValues: !1,
                    requestInstantly: !1,
                    showUnavailableSelection: !1,
                    changeMobileButtonLabel: !1,
                    vendorParam: "pf_v_vendor",
                    typeParam: "pf_pt_product_type",
                    priceMode: "",
                    tagMode: "",
                    breakpointMobile: "767",
                    startViewMore: { list: 5, box: 6, swatch: 7 },
                    startViewMoreH: { list: 15, box: 30, swatch: 15 },
                    imageExtension: ["jpg", "JPG", "png", "PNG", "jpeg", "JPEG", "gif", "GIF"],
                    colorOptionsArr: [],
                    swatchStyle: "",
                    swatchImageVersion: "1111111",
                    removePrefixFromSwatchFile: !0,
                    scrollFirstLoadLength: { list: 90, box: 120, swatch: 90 },
                    filterTreeMobileStyle: "",
                    ratingSelectionStyle: "text",
                    paginationType: "default",
                    paginationTypeAdvanced: !0,
                    activeLoadPreviousPage: !1,
                    sessionStorageCurrentPreviousPage: "bcSfFilterCurrentPreviousPage",
                    sessionStorageCurrentPage: "bcSfFilterCurrentPage",
                    sessionStorageCurrentNextPage: "bcSfFilterCurrentNextPage",
                    sessionStoragePreviousPageEvent: "bcSfFilterPreviousPageEvent",
                    sortingList: ["relevance", "best-selling", "manual", "price-ascending", "price-descending", "title-ascending", "title-descending", "created-descending", "created-ascending"],
                    customSortingList: "",
                    extraSortingList: "",
                    sortingAvailableFirst: !1,
                    showLimitList: "4,8,12,16",
                    defaultDisplay: "grid",
                    selectionHorizontalPlace: "#bc-sf-filter-tree-h",
                    enableFilterOptionBoxStyle: !0,
                    filterOptionBoxCharWidth: 14,
                    enableFilter: !0,
                    enableSeo: !0,
                    productAvailable: !1,
                    variantAvailable: !1,
                    availableAfterFiltering: !1,
                    loadProductFirst: !1,
                    enableKeepScrollbackPosition: !0,
                    activeScrollToTop: !1,
                    styleScrollToTop: "style1",
                    showLoading: !1,
                    showLoadMoreLoading: !0,
                    showMobileLoading: !1,
                    positionShowInfiniteLoading: 700,
                    ratingStarItemColor: "#FFD117",
                    showPlaceholderProductList: !1,
                    placeholderImageRatio: 1.4,
                    placeholderProductGridItemClass: "",
                    placeholderProductPerRow: 0,
                    loadProductFromLiquid: !1,
                    loadProductFromLiquidType: "ajax",
                    adParams: ["utm_", "sa=", "source=", "ust=", "usg=", "gclid="],
                },
                search: {
                    enableSearch: !0,
                    enableSuggestion: !0,
                    suggestionBlocks: [
                        { type: "suggestions", label: "Suggestions", status: "active", number: 3 },
                        { type: "collections", label: "Collections", status: "active", number: 2 },
                        { type: "pages", label: "Pages", status: "active", number: 2 },
                        { type: "products", label: "Products", status: "active", number: 3 },
                    ],
                    suggestionDymLimit: 2,
                    suggestionMinLength: 1,
                    suggestionPosition: "",
                    suggestionWidth: "auto",
                    suggestionTypes: [],
                    suggestionStyle: "",
                    suggestionStyle2MainContainerSelector: "header:first",
                    suggestionStyle2ReverseProductBlock: !1,
                    suggestionStyle2ProductPerRow: 3,
                    suggestionMobileStyle: "style1",
                    showSuggestionLoading: !0,
                    showSuggestionProductVendor: !0,
                    showSuggestionProductPrice: !0,
                    showSuggestionProductSalePrice: !0,
                    showSuggestionProductImage: !0,
                    showSuggestionProductSku: !1,
                    showSearchBtnMobile: !1,
                    enableDefaultResult: !0,
                    enableFuzzy: !0,
                    productAvailable: !1,
                    removePriceDecimal: !1,
                    highlightSuggestionResult: !0,
                    openProductNewTab: !1,
                    suggestionMode: "prod",
                    termKey: "q",
                    skipFields: [],
                    reduceMinMatch: !1,
                    fullMinMatch: !1,
                    enablePlusCharacterSearch: !1,
                    fontSizeSuggestionHeader: "",
                    bgSuggestionHeader: "",
                    colorSuggestionHeader: "",
                    enableFixHeadTitle: !0,
                },
                label: {},
            }),
            (window.suggestionCallback = function () {});
    };
(BCSfFilter.prototype.init = function () {
    this.initAppConfig(), this.initLabel(), this.initGlobalVariable(), this.initHistory(), this.initMobileDetect();
}),
    (BCSfFilter.prototype.initFilter = function () {
        this.updateApiParams(!1), this.getFilterData("init");
    }),
    (BCSfFilter.prototype.initAppConfig = function () {
        var a = bcSfFilterConfig.shop,
            b = bcSfFilterConfig.general;
        (this.shopName = a.name),
            (this.shopDomain = a.domain),
            (this.defaultCurrency = a.currency),
            (this.moneyFormat = a.money_format),
            (this.fileUrl = b.file_url),
            (this.collectionId = b.collection_id),
            (this.collectionTags = b.collection_tags),
            (this.collectionCount = b.collection_count),
            (this.currentTags = b.current_tags),
            (this.defaultSorting = b.default_sort_by.trim()),
            (this.swatchExtension = b.swatch_extension);
    }),
    (BCSfFilter.prototype.initGlobalVariable = function () {
        (this.productAvailable = this.getSettingValue("general.productAvailable")),
            (this.variantAvailable = this.getSettingValue("general.variantAvailable")),
            this.getSettingValue("general.productAndVariantAvailable") && ((this.productAvailable = !0), (this.variantAvailable = !0)),
            (this.loadProductFirst = this.getSettingValue("general.loadProductFirst")),
            (this.searchTermKey = this.getSettingValue("search.termKey")),
            (this.mobileStyle = this.getSettingValue("general.filterTreeMobileStyle")),
            (this.suggestionTypes = this.getSettingValue("search.suggestionTypes"));
    }),
    (BCSfFilter.prototype.initLabel = function () {
        this.defaultSettings.label = {
            refine: this.getLabel("label", "refine", "Refine By"),
            refineMobile: this.getLabel("label", "refine_mobile", "Refine By"),
            refineMobileCollapse: this.getLabel("label", "refine_mobile_collapse", "Hide Filter"),
            clear: this.getLabel("label", "clear", "Clear"),
            clearAll: this.getLabel("label", "clear_all", "Clear All"),
            apply: this.getLabel("label", "apply", "Apply"),
            close: this.getLabel("label", "close", "Close"),
            loadMore: this.getLabel("label", "load_more", "Load more {{ amountProduct }} Products"),
            loadMoreTotal: this.getLabel("label", "load_more_total", "{{ from }} - {{ to }} of {{ total }} Products"),
            loadPreviousPage: this.getLabel("label", "load_previous_page", "Load Previous Page"),
            collectionAll: "All",
            viewMore: "View More",
            viewLess: "View Less",
            under: "Under",
            above: "Above",
            ratingStar: "Star",
            ratingStars: "Stars",
            ratingUp: "& Up",
            showResult: "Show Results",
            showLimit: "Show",
            sorting: {
                "best-selling": this.getLabel("label", "sorting_best_selling", "Best Selling"),
                manual: this.getLabel("label", "sorting_featured", "Featured"),
                "price-ascending": this.getLabel("label", "sorting_price_ascending", "Lowest Price"),
                "price-descending": this.getLabel("label", "sorting_price_descending", "Highest Price"),
                "title-ascending": this.getLabel("label", "sorting_title_ascending", "Alphabetically, A-Z"),
                "title-descending": this.getLabel("label", "sorting_title_descending", "Alphabetically, Z-A"),
                "created-descending": this.getLabel("label", "sorting_date_descending", "Date, New to Old"),
                "created-ascending": this.getLabel("label", "sorting_date_ascending", "Date, Old to New"),
                "published-descending": this.getLabel("label", "sorting_date_descending", "Date, New to Old"),
                "published-ascending": this.getLabel("label", "sorting_date_ascending", "Date, Old to New"),
                "sale-descending": this.getLabel("label", "sorting_sale_descending", "% Off"),
                relevance: this.getLabel("label", "sorting_relevance", "Relevance"),
            },
            search: {
                generalTitle: this.getLabel("label", "search_general_title", "Search"),
                resultHeader: this.getLabel("label", "search_result_header", 'Search Results for "{{ terms }}"'),
                resultEmpty: this.getLabel("label", "search_result_empty", "Your search for {{ terms }} didn't match any results"),
                resultNumber: this.getLabel("label", "search_result_number", 'Showing {{ count }} results for "{{ terms }}"'),
            },
            suggestion: {
                placeholder: this.getLabel("label_suggestion", "suggestion_placeholder", "Search"),
                popularHeader: this.getLabel("label_suggestion", "suggestion_popular_header", "Popular Suggestions"),
                productHeader: this.getLabel("label_suggestion", "suggestion_product_header", "Products"),
                didYouMeanHeader: this.getLabel("label_suggestion", "suggestion_did_you_mean_header", "Did you mean"),
                viewAll: this.getLabel("label_suggestion", "suggestion_view_all", "View all {{ count }} product(s)"),
                suggestQuery: this.getLabel("label_suggestion", "suggestion_suggest_query", "Showing results for {{ terms }}."),
                didYouMean: this.getLabel("label_suggestion", "suggestion_did_you_mean", "Did you mean: {{ terms }}?"),
                searchBoxPlaceholder: this.getLabel("label_suggestion", "suggestion_placeholder", "Search"),
            },
            error: {
                noFilterResult: this.getLabel("label_error", "error_no_filter_result", "Sorry, no products matched your selection"),
                noSearchResult: this.getLabel("label_error", "error_no_search_result", "Sorry, no products matched the keyword"),
                noProducts: this.getLabel("label_error", "error_no_products", "No products found in this collection"),
                noSuggestionProducts: 'Sorry, nothing found for "{{ terms }}"',
                noSuggestionResult: 'Sorry, nothing found for "{{ terms }}"',
            },
        };
    }),
    (BCSfFilter.prototype.initHistory = function () {
        if (bcSfFilterConfig.general.isInitFilter) {
            var a = this;
            History.Adapter.bind(window, "statechange", function () {
                a.internalClick || (a.updateApiParams(!1), a.getFilterData("history")), (a.internalClick = !1);
            });
        }
    }),
    (BCSfFilter.prototype.destroy = function () {
        bcsffilter = void 0;
    }),
    (BCSfFilter.prototype.updateApiParams = function (a) {
        var b = this.getFilterParams(a);
        (b = this.revertPriceParams(b)), (b = this.setDefaultParams(b)), b.hasOwnProperty("currency") && delete b.currency, b.hasOwnProperty("currency_rate") && delete b.currency_rate, (this.queryParams = b);
    }),
    (BCSfFilter.prototype.revertPriceParams = function (a) {
        var b = this,
            c = Object.keys(a);
        return (
            (c = c.filter(function (a) {
                return 0 == a.indexOf("pf_p_") || 0 == a.indexOf("pf_vp_");
            })),
            (b.activeCurrencyPrices = []),
            c.length &&
                jQ.each(c, function (c, d) {
                    if (jQ.isArray(a[d])) {
                        var e = [];
                        jQ.each(a[d], function (c, f) {
                            var g = f.split(":");
                            (g = jQ.map(g, function (a, c) {
                                var d = 0 == c;
                                return 0 == a.length ? "" : b.revertPriceToDefaultCurrency(a, d);
                            })),
                                (b.activeCurrencyPrices[d] = a[d]),
                                e.push(g.join(":"));
                        }),
                            (a[d] = e);
                    }
                }),
            a
        );
    }),
    (BCSfFilter.prototype.getFilterParams = function (a) {
        var b = this,
            c = {},
            d = "";
        if (((void 0 !== a && !1 !== a) || (a = window.location.search), -1 != a.indexOf("?") && (d = a.split("?")[1]), void 0 !== d && "" != d && ((d = b.removeAdParams(d)), d.length > 0))) {
            var e,
                f = "",
                g = d.split("&"),
                h = g.length;
            for (e = 0; e < h; e++)
                if (((f = g[e].split("=")), f.length > 1)) {
                    var i = decodeURIComponent(f[0]),
                        j = decodeURIComponent(f[1].replace(/\+/g, "%20"));
                    -1 == j.indexOf("cache:") &&
                        (c.hasOwnProperty(i) ? c[i].push(j) : (c[i] = b.findIndexArray(i, b.imutableFilterTree) > -1 || "q" == i || i.indexOf("_and_condition") > -1 || i.indexOf("_show_exact_rating") > -1 ? j : [j])),
                        i.indexOf("pf_") > -1 && (b.hasFilterOptionParam = !0);
                }
        }
        return c;
    }),
    (BCSfFilter.prototype.removeAdParams = function (a) {
        var b = this,
            c = [];
        c = b.getSettingValue("general.adParams");
        var d,
            e = c.length;
        if (e > 0)
            for (d = 0; d < e; d++) {
                var f = new RegExp("[?|&]" + c[d] + "[^&]+&?", "g");
                a = a
                    .replace(f, "")
                    .replace(/&$/, "")
                    .replace(/\?\s*$/, "");
            }
        return a;
    }),
    (BCSfFilter.prototype.setDefaultParams = function (a) {
        var b = this;
        (a.shop = a.hasOwnProperty("shop") ? a.shop : this.shopDomain), (a.page = a.hasOwnProperty("page") ? parseInt(a.page) : 1);
        var c = this.getSettingValue("general.limit");
        return (
            "default" == this.getSettingValue("general.paginationType") || this.getSettingValue("general.paginationTypeAdvanced")
                ? (a.limit = a.hasOwnProperty("limit") ? a.limit : c)
                : (a.limit = (a.hasOwnProperty("limit") ? a.limit : c) * a.page),
            this.isSearchPage() && (this.defaultSorting = "relevance"),
            (a.sort = a.hasOwnProperty("sort") ? a.sort : this.defaultSorting),
            (a.display = a.hasOwnProperty("display") ? a.display : this.getSettingValue("general.defaultDisplay")),
            (a = b.setThirdPartyAppParams(a))
        );
    }),
    (BCSfFilter.prototype.setThirdPartyAppParams = function (a) {
        return (a = this.setShopifyMultiLanguageParams(a));
    }),
    (BCSfFilter.prototype.setShopifyMultiCurrencyParams = function (a) {
        if ("undefined" != typeof bcSfFilterConfig && void 0 !== bcSfFilterConfig.general.currencies && bcSfFilterConfig.general.currencies.length > 1) {
            var b = bcSfFilterConfig.general.current_currency.toLowerCase().trim();
            (a.currency = b), "undefined" != typeof Shopify && void 0 !== Shopify.currency && void 0 !== Shopify.currency.rate && (a.currency_rate = Shopify.currency.rate);
        }
        return a;
    }),
    (BCSfFilter.prototype.setShopifyMultiLanguageParams = function (a) {
        return (
            "undefined" != typeof bcSfFilterConfig &&
                bcSfFilterConfig.hasOwnProperty("general") &&
                bcSfFilterConfig.general.hasOwnProperty("published_locales") &&
                Object.keys(bcSfFilterConfig.general.published_locales).length > 1 &&
                void 0 !== bcSfFilterConfig.general.current_locale &&
                (a.locale = bcSfFilterConfig.general.current_locale),
            a
        );
    }),
    (BCSfFilter.prototype.changeAddressBar = function (a, b, c) {
        var d = "?" + a.split("?")[1],
            e = d.substr(1).split("&");
        (1 != e.length && !1 !== this.checkExistFilterOptionParam()) || (a = e.length > 1 && !1 === this.checkExistFilterOptionParam() ? a.replace("&_=" + this.prefix, "") : a.replace("?_=" + this.prefix, ""));
        var f = document.title;
        void 0 === b || void 0 === c || "collection" != b || this.isSearchPage() || (f = this.textify(c) + " - " + this.shopName), History.pushState({ param: this.queryParams }, f, a);
    }),
    (BCSfFilter.prototype.prepareRequestParams = function (a) {
        var b = mergeObject({}, this.queryParams);
        (b = this.prepareFilterParams(b, a)), (b = this.prepareSearchParams(b, a)), (this.queryParams = b);
    }),
    (BCSfFilter.prototype.prepareFilterParams = function (a, b) {
        if (this.queryParams.hasOwnProperty("collection_scope")) a.collection_scope = Array.isArray(this.queryParams.collection_scope) ? this.queryParams.collection_scope[0] : this.queryParams.collection_scope;
        else if (this.isSearchPage()) a.collection_scope = 0;
        else if (((a.collection_scope = parseInt(this.collectionId)), "history" == b)) {
            var c = History.getState().data;
            c.hasOwnProperty("param") && c.param.hasOwnProperty("collection_scope")
                ? (a.collection_scope = this.collectionId = parseInt(c.param.collection_scope))
                : (a.collection_scope = this.collectionId = parseInt(bcSfFilterConfig.general.collection_id));
        }
        if (
            (1 == this.getSettingValue("general.availableAfterFiltering")
                ? ((a.product_available = !0 === this.checkExistFilterOptionParam() || this.productAvailable), (a.variant_available = !0 === this.checkExistFilterOptionParam() || this.variantAvailable))
                : ((a.product_available = this.productAvailable), (a.variant_available = this.variantAvailable)),
            void 0 !== this.collectionTags && null !== this.collectionTags && (a.tag = this.collectionTags),
            this.getSettingValue("general.showOutOfStockOption") && (a.zero_options = !0),
            (a.build_filter_tree = !(void 0 !== b && this.imutableFilterTree.indexOf(b) > -1)),
            (a.check_cache = !(
                !1 !== this.checkExistFilterOptionParam() ||
                1 != a.page ||
                a.sort != this.defaultSorting ||
                a.limit != this.getSettingValue("general.limit") ||
                this.isSearchPage() ||
                this.isVendorPage() ||
                this.isTypePage()
            )),
            "" != this.getSettingValue("general.priceMode") && (a.price_mode = this.getSettingValue("general.priceMode")),
            "" != this.getSettingValue("general.tagMode") && (a.tag_mode = this.getSettingValue("general.tagMode")),
            this.getSettingValue("general.sortingAvailableFirst") && (a.sort_first = "available"),
            this.isVendorPage() && a.hasOwnProperty("q"))
        ) {
            (a[this.getSettingValue("general.vendorParam")] = [a.q]), delete a.q;
        }
        if (this.isTypePage() && a.hasOwnProperty("q")) {
            (a[this.getSettingValue("general.typeParam")] = [a.q]), delete a.q;
        }
        return a;
    }),
    (BCSfFilter.prototype.prepareSearchParams = function (a, b) {
        if (this.isSearchPage()) {
            (a.q = this.getSearchTerm()), "q" != this.searchTermKey && delete a[this.searchTermKey];
            var c = this.getSettingValue("search.enableFuzzy");
            !0 !== c && (a.fuzzy = c),
                !1 !== this.getSettingValue("search.reduceMinMatch") && (a.reduce_min_match = this.getSettingValue("search.reduceMinMatch")),
                this.getSettingValue("search.fullMinMatch") && (a.full_min_match = !0),
                this.getSettingValue("general.sortingAvailableFirst") && (a.sort_first = "available"),
                this.getSettingValue("search.enablePlusCharacterSearch") && (a.enable_plus_character_search = !0);
        }
        return a;
    }),
    (BCSfFilter.prototype.beforeGetFilterData = function (a) {
        var b = this;
        this.getSettingValue("general.keepScrollState") &&
            jQ("." + this.class.filterOption).each(function (a) {
                if (jQ(this).find(".jspScrollable").length > 0) {
                    var c = jQ(this).find(".jspScrollable").eq(0).data("jsp"),
                        d = jQ(this).data("block-id");
                    if (
                        ((b.scrollData = jQ.grep(b.scrollData, function (a) {
                            return a.id !== d;
                        })),
                        void 0 !== c)
                    ) {
                        var e = jQ(this).data("keep-scroll-disabled") ? 0 : c.getContentPositionY();
                        b.scrollData.push({ id: d, position: e });
                    }
                }
            });
    }),
    (BCSfFilter.prototype.getFilterData = function (a, b) {
        function c(a, b) {
            var c = bcsffilter,
                b = void 0 !== b ? b : 0;
            c.showLoading(), c.buildPlaceholderProductList(a), c.beforeGetFilterData(a), c.prepareRequestParams(a), (c.queryParams.callback = "BCSfFilterCallback"), (c.queryParams.event_type = a);
            var d = c.isSearchPage() ? c.getApiUrl("search") : c.getApiUrl("filter"),
                e = document.createElement("script");
            e.type = "text/javascript";
            var f = new Date().getTime();
            (e.src = d + "?t=" + f + "&" + jQ.param(c.queryParams)), (e.id = "bc-sf-filter-script"), (e.async = !0);
            var g;
            e.addEventListener("error", function (d) {
                "function" == typeof document.getElementById(e.id).remove ? document.getElementById(e.id).remove() : (document.getElementById(e.id).outerHTML = ""),
                    b < 2 ? (b++, g && clearTimeout(g), (g = setTimeout(c.getFilterData("resend", b), 2e3))) : c.buildDefaultElements(a);
            }),
                document.getElementsByTagName("head")[0].appendChild(e),
                (e.onload = function () {
                    "function" == typeof document.getElementById(e.id).remove ? document.getElementById(e.id).remove() : (document.getElementById(e.id).outerHTML = "");
                });
        }
        this.requestFilter(c, a, b);
    }),
    (BCSfFilter.prototype.requestFilter = function (a, b, c) {
        a(b, c);
    }),
    (BCSfFilter.prototype.afterGetFilterData = function (a, b) {
        var c = this;
        if (!this.pageOverFallback(a)) {
            if (
                (void 0 !== this.activeCurrencyPrices && jQ.extend(c.queryParams, this.activeCurrencyPrices),
                this.hideLoading(),
                void 0 !== this.removePlaceholderForFilterTree && this.removePlaceholderForFilterTree(),
                ["infinite", "load_more"].indexOf(this.getSettingValue("general.paginationType")) > -1 &&
                    this.getSettingValue("general.showLoadMoreLoading") &&
                    !1 === this.getSettingValue("general.showLoading") &&
                    this.hideLoadMoreLoading(),
                "collection" == b)
            ) {
                var d = bcsffilter.class.filterOptionOpenList,
                    e = bcsffilter.class.filterOptionCloseList;
                jQ("." + d).length > 0 && jQ("." + d).remove(), jQ("." + e).length > 0 && jQ("." + e).remove();
            }
            a.hasOwnProperty("errorMessage") || (this.catchError(a, b), this.buildAll(a, this.queryParams.build_filter_tree, b));
        }
    }),
    (BCSfFilter.prototype.buildAll = function (a, b, c) {
        var d = this,
            e = this.selector.pagination,
            f = a.total_product;
        if (
            (!0 === b &&
                a.hasOwnProperty("filter") &&
                (this.buildFilterTree(a.filter.options), this.getSettingValue("general.showRefineBy") && this.buildFilterSelection(a), this.buildFilterTreeMobile(), this.buildFilterTreeMobileButton(a), this.buildAdditionalFilterEvent()),
            f > 0)
        ) {
            this.buildProductList(a.products, c);
            "default" == this.getSettingValue("general.paginationType") ? this.buildPagination(f) : (jQ(e).empty(), d.isLoadMorePaginationType() && (this.buildLoadMoreButton(f), this.buildLoadPreviousButton(f, c))),
                this.buildToolbar(),
                this.buildToolbarEvent(a),
                jQ(this.selector.filterWrapper).show();
            var g = this.selector.topNotification;
            jQ(g).length > 0 && jQ(g).empty();
        }
        jQ(this.selector.products).removeAttr("data-bc-sort"),
            jQ(e).show(),
            this.buildAdditionalElements(a, c),
            this.buildScrollToTop(),
            this.scrollBackPositionHistoryBack(),
            "collection" == c && this.buildPageInfo(a),
            this.isSearchPage() && (this.buildSEOTitle(a), this.buildSearchResultHeader(a), this.buildSearchResultNumber(a)),
            this.buildRobotsMetaTag(a),
            (this.selectFilter = !1);
    }),
    (BCSfFilter.prototype.prepareFilterOptionData = function (a) {
        if (("price" == a.filterType || "variants_price" == a.filterType) && a.values)
            if (jQ.isArray(a.values))
                for (var b = 0; b < a.values.length; b++) {
                    var c = !1,
                        d = !1;
                    a.values[b].hasOwnProperty("to") && ((c = !0), (a.values[b].to = this.convertPriceBasedOnActiveCurrency(a.values[b].to))),
                        a.values[b].hasOwnProperty("from") && ((d = !0), (a.values[b].from = this.convertPriceBasedOnActiveCurrency(a.values[b].from))),
                        (a.values[b].key = c && d ? a.values[b].from + "-" + a.values[b].to : c ? "*-" + a.values[b].to : a.values[b].from + "-*");
                }
            else (a.values.min = this.convertPriceBasedOnActiveCurrency(a.values.min)), (a.values.max = this.convertPriceBasedOnActiveCurrency(a.values.max));
        return a;
    }),
    (BCSfFilter.prototype.beforeBuildFilterTree = function (a) {
        return jQ(this.selector.filterTree).html(""), jQ(this.selector.filterTreeHorizontal).html(""), (a = this.removeVendorOptionInVendorPage(a)), (a = this.removeProductTypeOptionInTypePage(a)), (a = this.prepareAdvancedRangeSlider(a));
    }),
    (BCSfFilter.prototype.removeVendorOptionInVendorPage = function (a) {
        var b = this,
            c = a.filter(function (a) {
                return a.filterOptionId == b.getSettingValue("general.vendorParam");
            });
        if (this.isVendorPage() && void 0 !== c[0]) {
            var d = this.findIndexArray(this.getSettingValue("general.vendorParam"), a, "filterOptionId");
            a.splice(d, 1);
        }
        return a;
    }),
    (BCSfFilter.prototype.removeProductTypeOptionInTypePage = function (a) {
        var b = this,
            c = a.filter(function (a) {
                return a.filterOptionId == b.getSettingValue("general.typeParam");
            });
        if (this.isTypePage() && void 0 !== c[0]) {
            var d = this.findIndexArray(this.getSettingValue("general.typeParam"), a, "filterOptionId");
            a.splice(d, 1);
        }
        return a;
    }),
    (BCSfFilter.prototype.buildFilterTree = function (a) {
        if (jQ(this.selector.filterTree).length > 0 && jQ(this.selector.filterTreeHorizontal).length > 0) {
            a = this.beforeBuildFilterTree(a);
            var b = this;
            jQ.each(a, function (a, c) {
                if ("active" == c.status)
                    switch (((c = b.prepareFilterOptionData(c)), c.displayType)) {
                        case "list":
                            "single" == c.selectType ? b.buildFilterOptionSingleList(c) : b.buildFilterOptionMultipleList(c);
                            break;
                        case "box":
                            b.buildFilterOptionBox(c);
                            break;
                        case "range":
                            b.buildFilterOptionRange(c);
                            break;
                        case "swatch":
                            b.buildFilterOptionSwatch(c);
                            break;
                        case "rating":
                            b.buildFilterOptionRating(c);
                    }
            }),
                this.afterBuildFilterTree(a),
                this.buildFilterTreeCallback(a);
        }
    }),
    (BCSfFilter.prototype.afterBuildFilterTree = function (a) {
        jQ(this.selector.filterTree).children().wrapAll('<div id="bc-sf-filter-options-wrapper"></div>'),
            this.buildFilterOptionBoxStyle(),
            this.triggerOpenHorizontalFilterEvent(),
            this.buildFilterShowMore(),
            this.checkIsFullWidthMobile() || this.collapseFilterOption();
    }),
    (BCSfFilter.prototype.buildFilterTreeCallback = function (a) {
        var b = this;
        jQ(window).on("resize", function () {
            (b.isMobile() && b.isMobileDevice()) || (("style2" != b.mobileStyle && "style3" != b.mobileStyle) || (b.removeFilterTreeMobileStyle(), b.buildFilterShowMore()), closeFilterMobile());
        });
    }),
    (BCSfFilter.prototype.triggerOpenHorizontalFilterEvent = function (a) {
        if (
            (0 == jQ("#" + this.selector.filterOptionOpenValue).length && jQ("body").append('<input type="hidden" id="' + this.selector.filterOptionOpenValue + '" />'),
            0 == jQ("#" + this.selector.filterOptionSubmitOpenValue).length && jQ("body").append('<input type="hidden" id="' + this.selector.filterOptionSubmitOpenValue + '" />'),
            "" != jQ("#" + this.selector.filterOptionOpenValue).val() && jQ("#" + this.selector.filterOptionOpenValue).val() != jQ("#" + this.selector.filterOptionSubmitOpenValue).val())
        ) {
            var b = jQ("#" + this.selector.filterOptionOpenValue).val();
            jQ("#" + b)
                .stop()
                .toggle(),
                1 ==
                jQ("#" + b)
                    .siblings()
                    .children()
                    .hasClass("selected")
                    ? (jQ("#" + b)
                          .siblings()
                          .children()
                          .removeClass("selected"),
                      jQ("#" + b)
                          .siblings()
                          .children()
                          .attr("aria-expanded", "false"))
                    : (jQ("#" + b)
                          .siblings()
                          .children()
                          .addClass("selected"),
                      jQ("#" + b)
                          .siblings()
                          .children()
                          .attr("aria-expanded", "true"));
            var c = jQ("#" + b)
                .parent()
                .data("block-id");
            this.setOpenPositionFilterOptionContent(c);
        }
    }),
    (BCSfFilter.prototype.addFilterTreeItem = function (a, b, c, d) {
        if (((a = jQ.parseHTML(a)), d != this.selector.filterTree && d != this.selector.filterTreeHorizontal && jQ(d).html(""), void 0 === d)) var d = "vertical" == c ? this.selector.filterTree : this.selector.filterTreeHorizontal;
        void 0 !== b && "before" == b ? jQ(d).prepend(a) : jQ(d).append(a);
    }),
    (BCSfFilter.prototype.buildFilterTreeClass = function (a, b) {
        var c = this.class;
        if (void 0 !== b) {
            if (c.hasOwnProperty(b)) {
                var d = new RegExp("{{class." + b + "}}", "g");
                a = a.replace(d, c[b]);
            }
        } else
            for (var e in c) {
                var d = new RegExp("{{class." + e + "}}", "g");
                a = a.replace(d, c[e]);
            }
        return a;
    }),
    (BCSfFilter.prototype.buildFilterOption = function (a, b, c) {
        var d = b.label,
            e = this.class.filterOption + "-" + this.slugify(d),
            f = "vertical" == c ? this.getTemplate("filterOptionWrapper") : this.getTemplate("filterOptionHorizontalWrapper");
        (f = f.replace(/{{blockTitle}}/g, d)),
            (f = f.replace(/{{blockTitleId}}/g, this.class.filterBlockTitle + "-" + this.slugify(d))),
            (f = f.replace(/{{blockTypeClass}}/g, this.class.filterOption + "-" + b.displayType)),
            (f = f.replace(/{{blockId}}/g, e)),
            (f = f.replace(/{{blockContent}}/g, a)),
            (f = f.replace(/{{blockContentId}}/g, this.class.filterBlockContent + "-" + this.slugify(d))),
            (f = f.replace(
                /{{btnApply}}/g,
                "collection" == b.filterType || "review_ratings" == b.filterType ? "" : '<button class="' + this.class.selectFilterOptionButton + '" data-id="' + e + '">' + this.getSettingValue("label.apply") + "</button>"
            )),
            (f = f.replace(/{{tooltip}}/g, this.buildFilterOptionTooltip(b)));
        var g = "",
            h = "vertical" == c ? this.getSettingValue("label.clear") : this.getSettingValue("label.clearAll");
        if (
            (this.queryParams.hasOwnProperty(b.filterOptionId) &&
                this.queryParams[b.filterOptionId] &&
                (g =
                    '<a href="javascript:;" role="button" aria-label="' +
                    this.getSettingValue("label.clear") +
                    '" class="' +
                    this.class.clearButton +
                    '" onClick="clearFilterOption(event, this, \'' +
                    b.filterOptionId +
                    "')\">" +
                    h +
                    "</a>"),
            (f = f.replace(/{{clearButton}}/g, g)),
            "" !== (f = this.buildFilterTreeClass(f)))
        ) {
            var i = jQ(f);
            i.attr({ "data-id": b.filterOptionId, "data-type": b.filterType, "data-display-type": b.displayType, "data-select-type": b.selectType, "data-title": d, "data-prefix": b.prefix });
            var j = !!b.hasOwnProperty("isCollapseMobile") && b.isCollapseMobile;
            this.getSettingValue("general.collapseOnMobileByDefault") && (j = !0), i.attr("data-collapse-mobile", j);
            var k = null;
            if (
                (["list", "box", "swatch"].indexOf(b.displayType) > -1 && (k = "scrollbar"),
                b.hasOwnProperty("showMoreType") && b.showMoreType && (k = b.showMoreType),
                "" != this.getSettingValue("general.showMoreType") && ["list"].indexOf(b.displayType) > -1 && (k = this.getSettingValue("general.showMoreType")),
                k && i.attr({ "data-show-more-type": k }),
                this.getSettingValue("general.requestInstantly") && i.find("." + this.class.selectFilterOptionButton).hide(),
                b.hasOwnProperty("useAndCondition") && b.useAndCondition && i.attr("data-and-condition", !0),
                b.hasOwnProperty("showExactRating") && b.showExactRating && i.attr("data-exact-rating", !0),
                i.attr("data-filter-option", JSON.stringify(b)),
                this.queryParams.hasOwnProperty(b.filterOptionId) && this.queryParams[b.filterOptionId] && (!c || "vertical" != c))
            ) {
                var l = this.queryParams[b.filterOptionId].map(function (a) {
                    return encodeURIParamValue(a);
                });
                i.attr("data-selected", JSON.stringify(l));
            }
            this.addFilterTreeItem(jQ(i)[0].outerHTML, "after", c), this.checkShowFilterOption(b) || jQ("." + e).addClass(this.class.filterOptionHidden);
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionItem = function (a, b, c, d, e, f, g, h, i, j, k) {
        var l = !!j.hasOwnProperty("keepValuesStatic") && j.keepValuesStatic;
        if ("review_ratings" == d && "text" == this.getSettingValue("general.ratingSelectionStyle")) var m = this.getReviewRatingsLabel(i.from);
        else var m = this.customizeFilterOptionLabel(b, j.prefix, d);
        if (!0 === l) var n = null;
        else var n = i.hasOwnProperty("doc_count") ? i.doc_count : 0;
        if (
            ((a = a.replace(/{{itemLabel}}/g, this.buildFilterOptionLabel(b, n, j))),
            (a = a.replace(/{{itemLink}}/g, this.buildFilterOptionLink(e, c, d, g, h, l))),
            (a = a.replace(/{{itemValue}}/g, encodeURIParamValue(c))),
            (a = a.replace(/{{itemTitle}}/g, m)),
            (a = a.replace(/{{class.filterOptionItem}}/g, this.class.filterOptionItem)),
            (a = a.replace(/{{class.filterOptionLabel}}/g, this.class.filterOptionLabel)),
            "vertical" == k || "both" == k || "single" == h)
        )
            var o = "onInteractWithFilterOptionValue(event, this, '" + d + "', '" + g + "', '" + h + "', '" + l + "')";
        else if (this.getSettingValue("general.requestInstantly") || "collection" == d) var o = "onInteractWithFilterOptionValue(event, this, '" + d + "', '" + g + "', '" + h + "', '" + l + "')";
        else var o = "onSelectFilterOptionItem(event, this)";
        (a = a.replace(/{{itemFunc}}/g, o)), (a = this.checkFilterOptionSelected(e, c, d, g) ? a.replace(/{{itemSelected}}/g, "selected") : a.replace(/{{itemSelected}}/g, ""));
        var p = jQ(a);
        return (
            p.children().attr({ "data-id": e, "data-value": encodeURIParamValue(c), "data-parent-label": f, "data-title": m, "data-count": n }),
            p.find("a").length > 0 && p.find("a").attr("aria-label", f + " - " + m),
            "review_ratings" == d && "text" == this.getSettingValue("general.ratingSelectionStyle") && p.children().attr("aria-label", f + " - " + m),
            this.getSettingValue("general.enableSeo") && "collection" != d && p.children().attr("rel", "nofollow"),
            "collection" == d && p.children().attr("data-collection-scope", i.key),
            jQ(p)[0].outerHTML
        );
    }),
    (BCSfFilter.prototype.buildFilterOptionSingleList = function (a) {
        a.hasOwnProperty("values") && ("all" == a.valueType || this.getSettingValue("general.sortManualValues") || ("all" != a.valueType && a.sortManualValues)) && (a.values = this.sortFilterOptionValue(a));
        var b = "",
            c = a.filterType,
            d = a.displayType,
            e = a.selectType,
            f = a.filterOptionId,
            g = a.label;
        if ("collection" == a.filterType && a.activeCollectionAll) {
            if (-1 == this.findIndexArray("all", a.values, "handle")) {
                var h = { doc_count: null, handle: "all", key: 0, label: this.getSettingValue("label.collectionAll"), tags: null };
                a.values.unshift(h);
            }
        }
        for (var i in a.values) b += this.buildFilterOptionSingleListData(c, f, g, d, e, a.values[i], a, "both");
        if ("" != b) {
            var j = this.getTemplate("filterOptionSingleList");
            (j = j.replace(/{{itemList}}/g, b)), this.buildFilterOption(j, a, "vertical"), this.buildFilterOption(j, a);
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionSingleListData = function (a, b, c, d, e, f, g, h) {
        if (this.checkShowFilterOptionItem(f, g)) {
            var i = (!!g.hasOwnProperty("keepValuesStatic") && g.keepValuesStatic, f.key),
                j = f.key;
            "collection" == a && ((i = f.label), (j = f.handle + ":" + f.key));
            var k = this.getTemplate("filterOptionSingleListItem");
            return (k = this.buildFilterOptionItem(k, i, j, a, b, c, d, e, f, g, h));
        }
        return "";
    }),
    (BCSfFilter.prototype.buildFilterOptionMultipleList = function (a) {
        a.hasOwnProperty("values") && ("all" == a.valueType || this.getSettingValue("general.sortManualValues") || ("all" != a.valueType && a.sortManualValues)) && (a.values = this.sortFilterOptionValue(a)),
            "percent_sale" == a.filterType && a.values.reverse();
        var b = (horizontalContent = ""),
            c = a.filterType,
            d = a.filterOptionId,
            e = a.label,
            f = a.displayType,
            g = a.selectType;
        a = this.scrollbarPrepareData(a, a.values);
        for (var h in a.firstBuild)
            (b += this.buildFilterOptionMultipleListData(c, d, e, f, g, a.firstBuild[h], a, "vertical")), (horizontalContent += this.buildFilterOptionMultipleListData(c, d, e, f, g, a.firstBuild[h], a, "horizontal"));
        if ("" != b && "" != horizontalContent) {
            var i = this.getTemplate("filterOptionMultipleList"),
                j = i.replace(/{{itemList}}/g, b),
                k = i.replace(/{{itemList}}/g, horizontalContent);
            this.buildFilterOption(j, a, "vertical"), this.buildFilterOption(k, a);
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionMultipleListData = function (a, b, c, d, e, f, g, h) {
        if (this.checkShowFilterOptionItem(f, g)) {
            var i = f.key,
                j = f.key;
            "price" == a || "variants_price" == a || "percent_sale" == a ? ((j = j.replace(/\*/g, "").replace(/\-/g, ":")), (e = "multiple")) : "stock" == a && ((i = f.label), (j = "in-stock" == f.key));
            var k = this.getTemplate("filterOptionMultipleListItem");
            return (k = this.buildFilterOptionItem(k, i, j, a, b, c, d, e, f, g, h)), (k = k.replace(/\$/g, "&#36;"));
        }
        return "";
    }),
    (BCSfFilter.prototype.buildFilterOptionBox = function (a) {
        a.hasOwnProperty("values") && ("all" == a.valueType || this.getSettingValue("general.sortManualValues") || ("all" != a.valueType && a.sortManualValues)) && (a.values = this.sortFilterOptionValue(a));
        var b = (horizontalContent = ""),
            c = a.filterType,
            d = a.displayType,
            e = a.selectType,
            f = a.filterOptionId,
            g = a.label;
        a = this.scrollbarPrepareData(a, a.values);
        for (var h in a.firstBuild) (b += this.buildFilterOptionBoxData(c, f, g, d, e, a.firstBuild[h], a, "vertical")), (horizontalContent += this.buildFilterOptionBoxData(c, f, g, d, e, a.firstBuild[h], a, "horizontal"));
        if ("" != b && "" != horizontalContent) {
            var i = this.getTemplate("filterOptionBox"),
                j = i.replace(/{{itemList}}/g, b),
                k = i.replace(/{{itemList}}/g, horizontalContent);
            this.buildFilterOption(j, a, "vertical"), this.buildFilterOption(k, a);
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionBoxData = function (a, b, c, d, e, f, g, h) {
        if (this.checkShowFilterOptionItem(f, g)) {
            var i = f.key,
                j = f.key,
                k = this.getTemplate("filterOptionBoxItem");
            return (k = this.buildFilterOptionItem(k, i, j, a, b, c, d, e, f, g, h));
        }
        return "";
    }),
    (BCSfFilter.prototype.buildFilterOptionBoxStyle = function (a) {
        if (!0 === this.getSettingValue("general.enableFilterOptionBoxStyle")) {
            var b = void 0 !== a ? a.find(".bc-sf-filter-option-box") : jQ(this.selector.filterTree).find(".bc-sf-filter-option-box");
            if (b.length) {
                var c,
                    d = b.length;
                for (c = 0; c < d; c++) {
                    var e = b.eq(c);
                    if (e.is(":visible") && e.children("li").length > 1) {
                        var f = e.parents("." + this.class.filterBlockContent).data("columns") || !1;
                        if (f) var g = 100 / f;
                        else {
                            var h = (e.parents("." + this.getClass("filterOption")).data("id"), e.parents("." + this.class.filterOption).data("filter-option") || !1),
                                i = (h.prefix || "").toString().replace(/\\/g, ""),
                                j = this.getSettingValue("general.filterOptionBoxCharWidth") || 14;
                            if (!h || 0 == h.values.length) continue;
                            for (var k = 4, l = 0; l < h.values.length; l++) k = Math.max(k, h.values[l].key.toString().length - i.length);
                            var m = k * parseFloat(j),
                                n = Math.floor(b.width() / (m + 8)) || 1,
                                g = 100 / n;
                            e.parents("." + this.class.filterBlockContent).attr("data-columns", n);
                        }
                        e.children("li").each(function () {
                            0 == jQ(this).get(0).style.width.length && jQ(this).css({ width: g - 2 + "%" });
                        });
                    }
                }
            }
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionSwatch = function (a) {
        a.hasOwnProperty("values") && ("all" == a.valueType || this.getSettingValue("general.sortManualValues") || ("all" != a.valueType && a.sortManualValues)) && (a.values = this.sortFilterOptionValue(a));
        var b = (horizontalContent = ""),
            c = a.filterType,
            d = a.displayType,
            e = a.selectType,
            f = a.filterOptionId,
            g = a.label;
        a = this.scrollbarPrepareData(a, a.values);
        for (var h in a.firstBuild) (b += this.buildFilterOptionSwatchData(c, f, g, d, e, a.firstBuild[h], a, "vertical")), (horizontalContent += this.buildFilterOptionSwatchData(c, f, g, d, e, a.firstBuild[h], a, "horizontal"));
        if ("" != b && "" != horizontalContent) {
            var i = this.getTemplate("filterOptionSwatch"),
                j = i.replace(/{{itemList}}/g, b).replace(/{{swatchStyle}}/g, this.buildSwatchStyle(a, "vertical")),
                k = i.replace(/{{itemList}}/g, horizontalContent).replace(/{{swatchStyle}}/g, this.buildSwatchStyle(a, "horizontal"));
            this.buildFilterOption(j, a, "vertical"), this.buildFilterOption(k, a);
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionSwatchData = function (a, b, c, d, e, f, g, h) {
        if (this.checkShowFilterOptionItem(f, g)) {
            var i = f.key,
                j = f.key,
                k = i;
            "collection" == a && ((j = f.label), (i = f.handle), (k = j));
            var l = this.getSettingValue("general.colorOptionsArr"),
                m = b.replace("pf_t_", "").replace("pf_opt_", "");
            if ("" != l) {
                void 0 !==
                    l.filter(function (a) {
                        return b.indexOf(a) > -1;
                    })[0] && (m = "color");
            }
            k = this.customizeSwatchFileName(k, f, g);
            var n = this.getTemplate("filterOptionSwatchItem");
            n = this.buildFilterOptionItem(n, j, i, a, b, c, d, e, f, g, h);
            var o = getFilePath(m + "-" + k, this.swatchExtension, this.getSettingValue("general.swatchImageVersion"));
            n = n.replace(/{{itemImageValue}}/g, o);
            var p = g.hasOwnProperty("borderSwatch") && "" != g.borderSwatch ? g.borderSwatch : "none";
            return (n = n.replace(/{{itemBorder}}/g, p));
        }
        return "";
    }),
    (BCSfFilter.prototype.buildSwatchStyle = function (a, b) {
        if ("" != this.getSettingValue("general.swatchStyle")) return this.getSettingValue("general.swatchStyle");
        var c = "circle-list";
        return this.checkIsFullWidthMobile() && (c = "circle-list"), a.hasOwnProperty("swatchStyle") && (c = a.swatchStyle), c;
    }),
    (BCSfFilter.prototype.buildFilterOptionRange = function (a) {
        a.hasOwnProperty("values") && null !== a.values && !Array.isArray(a.values) && 2 == Object.keys(a.values).length ? this.buildFilterOptionGeneralRange(a) : this.buildFilterOptionAdvancedRange(a);
    }),
    (BCSfFilter.prototype.buildFilterOptionGeneralRange = function (a) {
        if (a && a.hasOwnProperty("values") && 2 == Object.keys(a.values).length) {
            var b = (a.filterType, a.displayType, a.selectType, a.filterOptionId),
                c = a.label,
                d = a.values;
            if (d.hasOwnProperty("min") && d.hasOwnProperty("max") && null !== d.min && null !== d.max) {
                var e = parseFloat(d.min),
                    f = parseFloat(d.max),
                    g = this.customizeRangeValue(e, f, a.filterType, a),
                    e = g[0],
                    f = g[1];
                if (this.checkShowFilterOptionRange(e, f, a)) {
                    var h = this.class.filterOptionRange,
                        i = h + "-slider-" + b + "-v",
                        j = h + "-amount-" + b + "-v",
                        k = h + "-slider-" + b + "-h",
                        l = h + "-amount-" + b + "-h",
                        m = e,
                        n = f;
                    if (this.queryParams.hasOwnProperty(b)) {
                        var o = this.queryParams[b][0].split(":");
                        o && 2 == o.length && ((m = o[0]), (n = o[1]));
                    }
                    var p = "style2" == this.getSettingValue("general.rangeStyle") ? this.getTemplate("filterOptionRange2") : this.getTemplate("filterOptionRange"),
                        q = this.customizeDisplayRangeValue(m, n, a.filterType, a),
                        r = this.getTemplate("filterOptionRangeLabel").replace("{{minValue}}", q[0]).replace("{{maxValue}}", q[1]),
                        s = m + ":" + n,
                        t = m != e || n != f ? "selected" : "";
                    p = p
                        .replace(/{{itemLabel}}/g, r)
                        .replace(/{{itemParentId}}/g, b)
                        .replace(/{{itemValue}}/g, s)
                        .replace(/{{itemParentLabel}}/g, c)
                        .replace(/{{itemSelected}}/g, t);
                    var u = p.replace(/{{rangeAmountId}}/g, j).replace(/{{rangeSliderId}}/g, i),
                        v = p.replace(/{{rangeAmountId}}/g, l).replace(/{{rangeSliderId}}/g, k),
                        w = jQ(u),
                        x = jQ(v),
                        y = '<input type="hidden" class="' + h + "-" + b + '-set" />';
                    w.append(y),
                        x.append(y),
                        this.buildFilterOption(jQ(w)[0].outerHTML, a, "vertical"),
                        this.buildFilterOption(jQ(x)[0].outerHTML, a),
                        this.buildFilterOptionGeneralRangeSlider(i, j, m, n, e, f, a),
                        this.buildFilterOptionGeneralRangeSlider(k, l, m, n, e, f, a);
                }
            }
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionGeneralRangeSlider = function (a, b, c, d, e, f, g) {
        var h = this,
            i = document.getElementById(a),
            j = g.hasOwnProperty("sliderRange") && null !== g.sliderRange ? parseInt(g.sliderRange) : 4,
            k = g.hasOwnProperty("sliderStep") && null !== g.sliderStep ? parseFloat(g.sliderStep) : 1,
            l = g.hasOwnProperty("sliderDelimiter") && null !== g.sliderDelimiter ? g.sliderDelimiter : "",
            m = this.class.filterOptionRange,
            n = g.filterType.indexOf("price") > -1 || g.filterType.indexOf("variants_price") > -1 ? this.getSettingValue("general.decimalPriceRange") : 0;
        if ((k <= 0.1 && (n = 1), k <= 0.01 && (n = 2), k <= 0.001 && (n = 3), (f - e < k || null == e || null == f) && this.getSettingValue("general.oneValueRangeSlider")))
            (e -= 1e-4), (f += 1e-4), noUiSlider.create(i, { start: [c, d], connect: !0, behaviour: "tap", animate: !0, animationDuration: 300, step: k, range: { min: e, max: f } }), jQ(i).attr("disabled", " disabled");
        else {
            if (j > 0) {
                var o = Math.floor((f - e) / k);
                o < j && (j = o);
                for (var p = [], q = 0; q < j; q++) p.push(q * (100 / j));
                p.push(100),
                    noUiSlider.create(i, {
                        start: [c, d],
                        connect: !0,
                        behaviour: "tap",
                        animate: !0,
                        animationDuration: 300,
                        step: k,
                        range: { min: e, max: f },
                        pips: {
                            mode: "positions",
                            values: p,
                            density: j,
                            format: wNumb({
                                decimals: n,
                                thousand: l,
                                edit: function (a) {
                                    return h.buildShortenPipLabels(a, l);
                                },
                            }),
                        },
                    }),
                    this.getSettingValue("general.enableSliderRuler") || jQ("#" + a).addClass("no-ruler"),
                    jQ("#" + a).addClass("has-pips"),
                    i.noUiSlider.on("update", function () {
                        var b = jQ("#" + a + " .noUi-pips")
                            .find(".noUi-marker")
                            .last();
                        b.hasClass("noUi-marker-normal") &&
                            (b.removeClass("noUi-marker-normal"), b.addClass("noUi-marker-large"), b.after('<div class="noUi-value noUi-value-horizontal noUi-value-large" style="left: 100.00000%">' + Math.ceil(f) + "</div>"));
                    });
            } else noUiSlider.create(i, { start: [c, d], connect: !0, behaviour: "tap", animate: !0, animationDuration: 300, step: k, range: { min: e, max: f } });
            if ((this.slideEvent(a, b, e, f, g), "style1" == this.getSettingValue("general.rangeStyle"))) {
                var r = m + "-amount-min",
                    s = m + "-amount-max",
                    t = this.customizeDisplayRangeValue(c, d, g.filterType, g),
                    u = t[0],
                    v = t[1];
                jQ("#" + b)
                    .find("." + r)
                    .val(u),
                    jQ("#" + b)
                        .find("." + s)
                        .val(v),
                    jQ("#" + b).on("change", "." + r, function () {
                        var a = jQ(this).val(),
                            c = jQ("#" + b + " ." + s).val();
                        (a = h.convertMoneyToDefaultFormat(a)), (c = h.convertMoneyToDefaultFormat(c)), i.noUiSlider.set([a, c]);
                    }),
                    jQ("#" + b).on("change", "." + s, function () {
                        var a = jQ(this).val(),
                            c = jQ("#" + b + " ." + r).val();
                        (c = h.convertMoneyToDefaultFormat(c)), (a = h.convertMoneyToDefaultFormat(a)), i.noUiSlider.set([c, a]);
                    });
            }
            this.setRangeValueEvent(a, e, f, g);
        }
    }),
    (BCSfFilter.prototype.slideEvent = function (a, b, c, d, e) {
        var f = this,
            g = document.getElementById(a),
            h = f.class.filterOptionRange;
        g.noUiSlider.on("slide", function (a, c) {
            var d = f.customizeDisplayRangeValue(a[0], a[1], e.filterType, e),
                g = d[0],
                i = d[1];
            "style2" == f.getSettingValue("general.rangeStyle")
                ? jQ("#" + b).html(g + " - " + i)
                : (jQ("#" + b)
                      .find("." + h + "-amount-min")
                      .val(g),
                  jQ("#" + b)
                      .find("." + h + "-amount-max")
                      .val(i));
        });
    }),
    (BCSfFilter.prototype.customizeRangeValue = function (a, b, c, d) {
        return (
            c.indexOf("price") > -1 || c.indexOf("variants_price") > -1
                ? this.getSettingValue("general.roundPriceSlider") && ((a = Math.floor(a)), (b = Math.ceil(b, 100)))
                : (getNumberDecimals(a) > 2 && (a = parseFloat(a.toFixed(2))), getNumberDecimals(b) > 2 && (b = parseFloat(b.toFixed(2)))),
            [a, b]
        );
    }),
    (BCSfFilter.prototype.customizeDisplayRangeValue = function (a, b, c, d) {
        return (
            c.indexOf("price") > -1
                ? ((a = this.formatMoney(100 * a)),
                  (b = this.formatMoney(100 * b)),
                  (a = this.removeCurrencySymbol(a)),
                  (b = this.removeCurrencySymbol(b)),
                  this.getSettingValue("general.removePriceDecimal") && ((a = this.removeDecimal(a)), (b = this.removeDecimal(b))))
                : ((a = parseFloat(a)), (b = parseFloat(b))),
            [a, b]
        );
    }),
    (BCSfFilter.prototype.setRangeValueEvent = function (a, b, c, d) {
        var e = this,
            f = document.getElementById(a),
            g = d.hasOwnProperty("values") && null !== d.values && Array.isArray(d.values);
        f.noUiSlider.on("set", function (f, h) {
            if (f[0] == b && f[1] == c) jQ("#" + a).removeClass("selected"), jQ("#" + a).attr("data-value", "");
            else {
                var i = [];
                if (g)
                    for (
                        var j = d.values.map(function (a) {
                                return a.key;
                            }),
                            k = 0;
                        k <= j.length;
                        k++
                    )
                        k >= f[0] && k <= f[1] - 1 && i.push(j[k]);
                else i.push(parseFloat(f[0]) + ":" + parseFloat(f[1]));
                jQ("#" + a).addClass("selected"), jQ("#" + a).attr("data-value", i.join(","));
            }
            if (e.isMobile() && "style2" == e.mobileStyle) e.buildFilterSelectionMobile();
            else if (e.getSettingValue("general.requestInstantly") || a.indexOf("-v") > -1) {
                var l = "undefined" != typeof event ? event : new Event("build");
                onInteractWithFilterOptionValue(l, jQ(this.target), d.filterType, d.displayType, d.selectType);
            } else e.selectFilter = !0;
        });
    }),
    (BCSfFilter.prototype.buildFilterOptionAdvancedRange = function (a) {
        if (a && a.hasOwnProperty("values") && a.values.length) {
            var b = (a.filterType, a.displayType, a.selectType, a.filterOptionId),
                c = a.label,
                d = a.values,
                e = a.prefix;
            void 0 !== e && null !== e && !1 !== e && (e = e.replace(/\\/g, ""));
            var f = d.map(function (a) {
                    return a.key;
                }),
                g = f.length;
            (a.sliderRange = f.length), (a.sliderStep = 1), (a.sliderDelimiter = "");
            var h = this.class.filterOptionRange,
                i = h + "-slider-" + b + "-v",
                j = h + "-amount-" + b + "-v",
                k = h + "-slider-" + b + "-h",
                l = h + "-amount-" + b + "-h",
                m = "",
                n = 0,
                o = g;
            if (this.queryParams.hasOwnProperty(b)) {
                var p = this.queryParams[b],
                    q = this.getAdvancedRangeSelectedValues(p, f, !0),
                    n = q[0] || 0,
                    o = q[1] || f.length - 1;
                m = p.join(",");
            }
            var r = this.getTemplate("filterOptionAdvancedRange"),
                s = (this.customizeDisplayRangeValue(n, o, a.filterType, a), 0 != n || o != g ? "selected" : "");
            r = r
                .replace(/{{itemParentId}}/g, b)
                .replace(/{{itemValue}}/g, m)
                .replace(/{{itemParentLabel}}/g, c)
                .replace(/{{itemSelected}}/g, s);
            var t = r.replace(/{{rangeAmountId}}/g, j).replace(/{{rangeSliderId}}/g, i),
                u = r.replace(/{{rangeAmountId}}/g, l).replace(/{{rangeSliderId}}/g, k),
                v = jQ(t),
                w = jQ(u),
                x = '<input type="hidden" class="' + h + "-" + b + '-set" />';
            v.append(x),
                w.append(x),
                this.buildFilterOption(jQ(v)[0].outerHTML, a, "vertical"),
                this.buildFilterOption(jQ(w)[0].outerHTML, a),
                this.buildFilterOptionGeneralRangeSlider(i, j, n, o, 0, g, a),
                this.buildFilterOptionGeneralRangeSlider(k, l, n, o, 0, g, a);
            var y = jQ("#" + i).find(".noUi-value"),
                z = jQ("#" + k).find(".noUi-value");
            if (y.length && z.length) {
                var A = 100 / (y.length - 1);
                for (var B in y) {
                    var C = parseInt(y.eq(B).html()),
                        D = f[C] || "bc";
                    y
                        .eq(B)
                        .html(D.toString().replace(e, ""))
                        .css("width", A + "%"),
                        z
                            .eq(B)
                            .html(D.toString().replace(e, ""))
                            .css("width", A + "%");
                }
            }
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionAdvancedRangeSlider = function (a, b, c, d, e, f, g) {}),
    (BCSfFilter.prototype.buildFilterOptionRating = function (a) {
        var b = "",
            c = a.filterType,
            d = a.displayType,
            e = a.selectType,
            f = a.filterOptionId,
            g = a.label,
            h = void 0 !== a.showExactRating && 1 == a.showExactRating;
        if (h) {
            var i = bcSfFilterMainConfig.settings.general.showOutOfStockOption || !1;
            bcSfFilterMainConfig.settings.general.showOutOfStockOption = !0;
        }
        a.values.reverse();
        for (var j in a.values) (h || 0 != j) && (b += this.buildFilterOptionRatingData(c, f, g, d, e, a.values[j], a, "both"));
        if ((h && (bcSfFilterMainConfig.settings.general.showOutOfStockOption = i), "" != b)) {
            var k = this.getTemplate("filterOptionRating"),
                l = "multiple" == a.selectType && void 0 !== a.showExactRating && 1 == a.showExactRating ? this.getClass("filterOptionMultipleList") : "";
            (k = k.replace(/{{itemMultipleSelect}}/g, l)), (k = k.replace(/{{itemList}}/g, b)), this.buildFilterOption(k, a, "vertical"), this.buildFilterOption(k, a);
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionRatingData = function (a, b, c, d, e, f, g, h) {
        if (this.checkShowFilterOptionItem(f, g)) {
            var i = parseFloat(f.from).toFixed();
            (void 0 !== g.starColor && "" != g.starColor && null != g.starColor) || (g.starColor = this.getSettingValue("general.ratingStarItemColor"));
            var j = this.buildRatingStars(i, g.starColor),
                k = "";
            (void 0 !== g.showExactRating && g.showExactRating) || (k = this.getSettingValue("label.ratingUp"));
            var l = this.getTemplate("filterOptionRatingStar")
                    .replace(/{{itemStars}}/g, j)
                    .replace(/{{label.ratingUp}}/g, k),
                m = this.getTemplate("filterOptionRatingItem");
            return (m = this.buildFilterOptionItem(m, l, i, a, b, c, d, e, f, g, h));
        }
        return "";
    }),
    (BCSfFilter.prototype.buildRatingStars = function (a, b) {
        for (var c = "", d = 1; d <= 5; d++) c += d <= a ? this.getTemplate("filterOptionRatingIconStarActive") : this.getTemplate("filterOptionRatingIconStar");
        return (c = c.replace(/{{ratingStartColor}}/g, b));
    }),
    (BCSfFilter.prototype.buildFilterViewMore = function (a, b) {
        var c = this.getClass("filterOptionViewMore"),
            d = this.getClass("filterOptionViewLess"),
            e = this.getClass("filterOptionViewMoreList"),
            f = jQ(a).parents(this.selector.filterTreeHorizontal).length > 0 ? jQ(a).find("." + this.getClass("filterBlockContent") + "-inner") : jQ(a),
            g = jQ(a).parents(this.selector.filterTreeHorizontal).length > 0,
            h = jQ(a)
                .parents("." + bcsffilter.class.filterOption)
                .data("display-type"),
            i = g ? this.getSettingValue("general.startViewMoreH") : this.getSettingValue("general.startViewMore"),
            j = i.hasOwnProperty(h) ? i[h] : 15;
        if (f.find("li").length <= j) return !1;
        0 == jQ("." + e).length && jQ("body").append('<input type="hidden" class="' + e + '" />'), jQ(a).attr("data-has-scrollbar", b);
        var k = !0,
            l = jQ("." + e)
                .val()
                .split(",");
        if (l.length > 0 && l.indexOf(jQ(a).parent().attr("data-id")) > -1) {
            (k = !1), b ? this.buildFilterScrollbar(jQ(a)) : f.addClass("no-scrollbar");
            var m = this.getTemplate("filterOptionViewLess").replace(/{{label.viewLess}}/g, this.getSettingValue("label.viewLess"));
            f.siblings("." + d).length > 0 && f.siblings("." + d).remove(), f.after(m);
        }
        if (k) {
            f.find("li:gt(" + (j - 1) + ")").hide(), f.css({ overflow: "hidden" }), b || f.addClass("no-scrollbar");
            var m = this.getTemplate("filterOptionViewMore").replace(/{{label.viewMore}}/g, this.getSettingValue("label.viewMore"));
            f.siblings("." + c).length > 0 && f.siblings("." + c).remove(), f.after(m);
        }
    }),
    (BCSfFilter.prototype.collapseFilterOption = function () {
        var a = this;
        if (this.isMobile()) {
            0 == jQ(".bc-sf-filter-option-open-list").length && jQ("body").append('<input type="hidden" class="bc-sf-filter-option-open-list" />'),
                0 == jQ(".bc-sf-filter-option-close-list").length && jQ("body").append('<input type="hidden" class="bc-sf-filter-option-close-list" />');
            var b = "" != jQ(".bc-sf-filter-option-open-list").val() ? jQ(".bc-sf-filter-option-open-list").val().split(",") : [],
                c = "" != jQ(".bc-sf-filter-option-close-list").val() ? jQ(".bc-sf-filter-option-close-list").val().split(",") : [];
            0 == b.length &&
                0 == c.length &&
                jQ("." + this.class.filterOption).each(function () {
                    var d = "true" == jQ(this).attr("data-collapse-mobile"),
                        e = jQ(this)
                            .closest("." + a.class.filterOption)
                            .attr("data-id");
                    d ? -1 == c.indexOf(e) && (c.push(e), b.length > 0 && b.indexOf(e) > -1 && b.splice(b.indexOf(e), 1)) : -1 == b.indexOf(e) && (b.push(e), c.length > 0 && c.indexOf(e) > -1 && c.splice(c.indexOf(e), 1));
                }),
                jQ(".bc-sf-filter-option-open-list").val(b.join(",")),
                jQ(".bc-sf-filter-option-close-list").val(c.join(",")),
                jQ("." + this.class.filterOption).each(function () {
                    var d = jQ(this)
                        .closest("." + a.class.filterOption)
                        .attr("data-id");
                    c.indexOf(d) > -1
                        ? (jQ(this)
                              .find("." + a.class.filterBlockTitle + " h3 span")
                              .addClass("up"),
                          jQ(this)
                              .find("." + a.class.filterBlockTitle + " h3")
                              .attr("aria-expanded", "false"),
                          jQ(this)
                              .children()
                              .not("." + a.class.filterBlockTitle)
                              .hide())
                        : b.indexOf(d) > -1 &&
                          (jQ(this)
                              .find("." + a.class.filterBlockTitle + " h3 span")
                              .removeClass("up"),
                          jQ(this)
                              .find("." + a.class.filterBlockTitle + " h3")
                              .attr("aria-expanded", "true"),
                          jQ(this).children().show());
                });
        }
    }),
    (BCSfFilter.prototype.checkShowFilterOption = function (a) {
        if ("disabled" == a.status || (a.hasOwnProperty("values") && 0 == a.values.length)) return !1;
        if ("percent_sale" == a.filterType) {
            if (
                void 0 !==
                a.values.filter(function (a) {
                    return "*-100" == a.key && a.doc_count > 0;
                })[0]
            )
                return !0;
        }
        if (!0 === a.keepValuesStatic) return !0;
        if ("range" == a.displayType)
            return a.hasOwnProperty("values") && null !== a.values && !Array.isArray(a.values) && 2 == Object.keys(a.values).length
                ? this.checkShowFilterOptionRange(a.values.min, a.values.max, a)
                : a.hasOwnProperty("values") && a.values.length > 1;
        if (!this.getSettingValue("general.showOutOfStockOption") && !0 === this.getSettingValue("general.showSingleOption") && "range" != a.displayType) {
            if (a.hasOwnProperty("values") && a.values.length > 1) {
                var b = 0;
                for (var c in a.values) if ((a.values[c].doc_count > 0 && b++, b > 1)) return !0;
            }
            return !1;
        }
        return !0;
    }),
    (BCSfFilter.prototype.checkShowFilterOptionItem = function (a, b) {
        return !(
            null === a ||
            !a.hasOwnProperty("key") ||
            !((a.hasOwnProperty("doc_count") && (a.doc_count > 0 || null === a.doc_count)) || (b.hasOwnProperty("keepValuesStatic") && b.keepValuesStatic) || this.getSettingValue("general.showOutOfStockOption"))
        );
    }),
    (BCSfFilter.prototype.checkShowFilterOptionRange = function (a, b, c) {
        var d = c.hasOwnProperty("sliderStep") && null !== c.sliderStep ? parseInt(c.sliderStep) : 1;
        return !!((!this.getSettingValue("general.oneValueRangeSlider") && b - a > d) || this.getSettingValue("general.oneValueRangeSlider"));
    }),
    (BCSfFilter.prototype.buildFilterSelection = function (a) {
        var b = this.buildFilterSelectionData(a),
            c = b[0],
            d = b[1],
            e = this.buildClearAllButton();
        if ("" != c) {
            var f = this.getTemplate("filterRefineWrapper");
            (f = f.replace(/{{label}}/g, this.getSettingValue("label.refine"))),
                (f = f.replace(/{{selectedItems}}/g, c)),
                (f = this.buildFilterTreeClass(f)),
                this.addFilterTreeItem(f, "before", "vertical"),
                jQ(this.selector.filterTree)
                    .find("." + this.class.filterRefineWrapper + " ." + this.class.filterBlockTitle)
                    .append(e);
        }
        var g = this.getSettingValue("general.selectionHorizontalPlace");
        if (("#bc-sf-filter-tree-h" != g && jQ(g).empty(), "" != d)) {
            var h = this.getTemplate("filterRefineHorizontalWrapper");
            (h = h.replace(/{{label}}/g, this.getSettingValue("label.refine"))),
                (h = h.replace(/{{selectedItems}}/g, d)),
                (h = this.buildFilterTreeClass(h)),
                "top" == this.getSettingValue("general.refineByHorizontalPosition") ? this.addFilterTreeItem(h, "before", "horizontal", g) : this.addFilterTreeItem(h, "after", "horizontal", g),
                jQ(".bc-sf-filter-pc." + this.class.filterRefineWrapper).append(e);
        }
    }),
    (BCSfFilter.prototype.buildFilterSelectionData = function (a) {
        function b(a, b, c, d) {
            return (a = a.replace(/{{itemType}}/g, b)), (a = a.replace(/{{itemLabel}}/g, c)), (a = a.replace(/{{itemLink}}/g, d));
        }
        var c = this,
            d = (horizontalContent = ""),
            e = this.getTemplate("filterRefineItem"),
            f = this.getTemplate("filterRefineHorizontalItem"),
            g = a.filter.options,
            h = Object.keys(c.queryParams);
        return (
            (h = h.filter(function (a) {
                return 0 == a.indexOf("pf_");
            })),
            jQ.each(h, function (a, h) {
                var i = g.filter(function (a) {
                    return a.filterOptionId == h;
                })[0];
                if (void 0 !== i && c.queryParams.hasOwnProperty(h) && c.queryParams[h] && c.queryParams[h].length) {
                    var j = c.queryParams[h],
                        k = i.filterOptionId,
                        l = i.prefix,
                        m = i.label,
                        n = i.filterType,
                        o = i.displayType;
                    if (((l = void 0 !== l && null !== l && !1 !== l ? l.replace(/\\/g, "") : ""), Array.isArray(j) || (j = [j]), "range" == o)) {
                        var p = "";
                        if (-1 == n.indexOf("price") && -1 == n.indexOf("variants_price") && "weight" !== n && -1 == n.indexOf("range_slider")) {
                            var q = [];
                            i &&
                                i.hasOwnProperty("values") &&
                                (q = i.values.map(function (a) {
                                    return a.key;
                                }));
                            var r = q.length ? c.getAdvancedRangeSelectedValues(j, q) : [j[0], j[j.length - 1]];
                            (p = r[0].toString().replace(l, "")), j.length > 1 && (p += " - " + r[1].toString().replace(l, ""));
                        } else {
                            var s = j[0],
                                t = s.split(":");
                            if ("price" == n || "variants_price" == n) {
                                var u = c.formatMoney(100 * t[0]),
                                    v = c.formatMoney(100 * t[1]);
                                c.getSettingValue("general.removePriceDecimal") && ((u = c.removeDecimal(u)), (v = c.removeDecimal(v))), (p = u + " - " + v);
                            } else p = t[0] + " - " + t[1];
                        }
                        var w = c.buildClearFilterOptionLink(k, m, j);
                        (d += b(e, m, p, w)), (horizontalContent += b(f, m, p, w));
                    } else
                        for (var a = 0; a < j.length; a++) {
                            var s = j[a],
                                p = s;
                            p = c.customizeFilterOptionLabel(p, l, n);
                            var w = c.buildClearFilterOptionLink(k, m, s);
                            switch ((void 0 !== l && null !== l && !1 !== l && ((l = l.replace(/\\/g, "")), (s = s.replace(l, "").trim())), n)) {
                                case "price":
                                case "variants_price":
                                    p = c.getPriceLabel(s);
                                    break;
                                case "percent_sale":
                                    p = c.getPercentSaleLabel(s);
                                    break;
                                case "stock":
                                    p = "true" === s ? i.values[0].label : i.values[1].label;
                                    break;
                                case "review_ratings":
                                    var x = !!i.hasOwnProperty("showExactRating") && i.showExactRating;
                                    p = c.getReviewRatingsLabel(s, x);
                            }
                            (d += b(e, m, p, w)), (horizontalContent += b(f, m, p, w));
                        }
                }
            }),
            [d, horizontalContent]
        );
    }),
    (BCSfFilter.prototype.checkFilterOptionSelected = function (a, b, c) {
        if (("collection" == c && (b = b.split(":")[0]), "collection" != c || this.isSearchPage())) {
            if ("stock" == c) {
                if (this.queryParams.hasOwnProperty(a)) {
                    var d = this.queryParams[a];
                    if (d.indexOf(b.toString()) > -1) return !0;
                }
            } else if (this.queryParams.hasOwnProperty(a)) {
                var d = this.queryParams[a];
                if (Array.isArray(d)) {
                    for (var e = 0; e < d.length; e++) if (d[e] == b) return !0;
                } else if (d == b) return !0;
            }
        } else {
            if (decodeURIComponent(window.location.pathname).split("/").slice(2).join("/") == b) return !0;
        }
        return !1;
    }),
    (BCSfFilter.prototype.buildClearAllButton = function () {
        var a = this.getTemplate("clearAllButton");
        return (a = a.replace(/{{label.clearAll}}/g, this.getSettingValue("label.clearAll"))), (a = this.buildFilterTreeClass(a, "clearAllButton"));
    }),
    (BCSfFilter.prototype.onChangeData = function (a, b, c, d) {
        this.updateApiParams(a), this.getFilterData(b), this.changeAddressBar(a, b, c);
    }),
    (BCSfFilter.prototype.buildAdditionalFilterEvent = function () {
        this.buildApplyEvent(), this.buildTitleClickEvent(), this.buildMouseUpEvent(), this.checkIsFullWidthMobile() || this.buildToggleEvent(), this.buildClearEvent(), this.buildTooltipEvent();
    }),
    (BCSfFilter.prototype.buildMouseUpEvent = function (a) {
        var b = this;
        jQ(document).mouseup(function (c) {
            var d = jQ(b.selector.filterTreeHorizontal).find("." + b.class.filterBlockContent);
            d.is(c.target) || 0 !== d.has(c.target).length || b.buildSubmitEvent(a, !0, c);
        });
    }),
    (BCSfFilter.prototype.buildApplyEvent = function (a) {
        var b = this;
        jQ("." + this.class.selectFilterOptionButton).click(function (c) {
            b.buildSubmitEvent(a, !0, c);
        });
    }),
    (BCSfFilter.prototype.buildSubmitEvent = function (a, b, c) {
        var d = jQ(this.selector.filterTreeHorizontal)
                .find("." + this.class.filterBlockContent)
                .filter(function () {
                    return "block" == jQ(this).css("display");
                })
                .eq(0),
            e = jQ(d[0]).parent();
        jQ("#" + this.selector.filterOptionOpenValue).val(jQ(d[0]).attr("id"));
        var f = e.data("type"),
            g = e.data("display-type"),
            h = e.data("select-type"),
            i = e.attr("data-id"),
            j = [];
        if (e.find(".noUi-target").length > 0 && e.find(".noUi-target").hasClass("selected")) {
            var k = e.find(".noUi-target").attr("data-value");
            if ("range" == g && "price" !== f && -1 == f.indexOf("range_slider")) {
                k = k.split(",");
                for (var l in k) "" !== k[l] && j.push(encodeURIParamValue(k[l]));
            } else j.push(encodeURIParamValue(k));
        } else
            j = (jQ(d).parent().data("selected") || []).filter(function (a) {
                return a.length > 0;
            });
        var m = this.buildSubmitLink(i, j, f, g, h);
        !1 !== m && !0 === this.selectFilter && (jQ("#" + this.selector.filterOptionSubmitOpenValue).val(jQ(d[0]).attr("id")), (this.internalClick = !0), this.onChangeData(m, f, j, i));
        var n = jQ(this.selector.filterTreeHorizontal).find("." + this.class.filterBlockTitle);
        (!b || (b && !n.is(c.target) && 0 === n.has(c.target).length)) &&
            (jQ(this.selector.filterTreeHorizontal)
                .find("." + this.class.filterBlockContent)
                .hide(),
            jQ(this.selector.filterTreeHorizontal)
                .find("." + this.class.filterBlockTitle)
                .children("a")
                .removeClass("selected"));
    }),
    (BCSfFilter.prototype.buildTitleClickEvent = function (a) {
        var b = this;
        jQ(this.selector.filterTreeHorizontal)
            .find("." + this.class.filterBlockTitle + " a")
            .on("click", function (a) {
                a.stopPropagation(),
                    jQ(b.selector.filterTreeHorizontal)
                        .find("." + b.class.filterBlockContent)
                        .not(jQ(this).parent().siblings()[0])
                        .hide(),
                    jQ(b.selector.filterTreeHorizontal)
                        .find("." + b.class.filterBlockTitle)
                        .not(jQ(this).parent()[0])
                        .children("a")
                        .removeClass("selected"),
                    1 == jQ(this).hasClass("selected") ? (jQ(this).removeClass("selected"), jQ(this).attr("aria-expanded", "false")) : (jQ(this).addClass("selected"), jQ(this).attr("aria-expanded", "true")),
                    jQ(this).parent().siblings().stop().toggle();
                var c = jQ(this)
                    .closest("." + b.class.filterOption)
                    .data("block-id");
                b.setOpenPositionFilterOptionContent(c),
                    "collection" !=
                        jQ(this)
                            .closest("." + b.class.filterOption)
                            .attr("data-type") && (jQ(this).hasClass("selected") ? jQ("#" + b.selector.filterOptionOpenValue).val(jQ(this).parent().siblings().attr("id")) : jQ("#" + b.selector.filterOptionOpenValue).val(null));
            });
    }),
    (BCSfFilter.prototype.setOpenPositionFilterOptionContent = function (a) {
        if (void 0 !== a) {
            var b = jQ(this.selector.filterTreeHorizontal).find("." + a),
                c = jQ(this.selector.filterTreeHorizontal).offset().top,
                d = b.offset().top + b.outerHeight(!0),
                e = d - c - 5;
            b.children("." + this.class.filterBlockContent).css("top", e + "px"), this.buildFilterShowMore();
        }
    }),
    (BCSfFilter.prototype.buildToggleEvent = function (a) {
        var b = this,
            c = this.class.filterOptionOpenList,
            d = this.class.filterOptionCloseList,
            e = this.class.filterOption,
            f =
                jQ("." + c).length > 0
                    ? jQ("." + c)
                          .val()
                          .split(",")
                    : [],
            g =
                jQ("." + d).length > 0
                    ? jQ("." + d)
                          .val()
                          .split(",")
                    : [];
        jQ(this.selector.filterTree + " ." + this.class.filterBlockTitle + " h3").on("click", function (a) {
            a.preventDefault();
            var h = jQ(this)
                .closest("." + e)
                .attr("data-id");
            jQ(this).children().hasClass("up")
                ? (b.getSettingValue("general.keepToggleState") && (f.push(h), g.length > 0 && g.indexOf(h) > -1 && g.splice(g.indexOf(h), 1)),
                  jQ(this).children().removeClass("up"),
                  jQ(this).attr("aria-expanded", "true"),
                  jQ(this)
                      .parent()
                      .siblings()
                      .slideDown(function () {
                          "range" != jQ(this).parent().attr("data-display-type") && (b.buildFilterOptionBoxStyle(jQ(this)), b.buildFilterScrollbar(this));
                      }))
                : (b.getSettingValue("general.keepToggleState") && (g.push(h), f.length > 0 && f.indexOf(h) > -1 && f.splice(g.indexOf(h), 1)),
                  jQ(this).children().addClass("up"),
                  jQ(this).attr("aria-expanded", "false"),
                  jQ(this).parent().siblings().slideUp()),
                jQ("." + c).val(f.join(",")),
                jQ("." + d).val(g.join(","));
        });
    }),
    (BCSfFilter.prototype.buildClearEvent = function (a) {
        var b = this;
        jQ("." + this.class.filterSelectedItems + " a").click(function (a) {
            jQ("#" + b.selector.filterOptionOpenValue).val(null), a.preventDefault(), (b.internalClick = !0);
            var c = jQ(this).attr("href");
            b.onChangeData(c, "clearFilterOptionItem");
        });
    }),
    (BCSfFilter.prototype.buildFilterOptionLink = function (a, b, c, d, e, f) {
        var g = "";
        if ("" != (g = this.buildFilterOptionCustomLink(a, b, c, d, e, f))) return g;
        if ("collection" == c) {
            var h = b.split(":"),
                i = h[1];
            b = h[0];
        }
        if ("collection" != c || this.isSearchPage()) {
            if (((g = window.location.href.replace(/\+/g, "%20")), 0 == window.location.search.length)) g += "?_=" + this.prefix;
            else if (null === getParam("_")) {
                var j = g.split("?");
                (g = j[0] + "?_=" + this.prefix), j.length > 1 && (g += "&" + j[1]);
            }
            if ("range" == d && "price" !== c && "variants_price" !== c && -1 == c.indexOf("range_slider")) {
                if (this.queryParams.hasOwnProperty(a)) {
                    var k = this.queryParams[a];
                    for (var l in k) g = g.replace("&" + a + "=" + encodeURIParamValue(k[l]), "");
                }
                if ("" != b) {
                    var m = "",
                        n = b.split(",");
                    for (var l in n) "" != n[l] && (m += "&" + a + "=" + encodeURIParamValue(n[l]));
                    "" != m && (g += m);
                }
            } else if ("" !== b && null !== b) {
                var m = "&" + a + "=" + encodeURIParamValue(b);
                if (("range" != d && "single" != e) || !this.queryParams.hasOwnProperty(a)) {
                    var o = window.location.href.replace(/\+/g, "%20") + "&";
                    if (o.indexOf(m + "&") > -1) (g = o.replace(m + "&", "&")), "&" == g[g.length - 1] && (g = g.slice(0, -1));
                    else {
                        var g = window.location.href.replace(/\+/g, "%20");
                        0 === window.location.search.length ? (g += "?_=" + this.prefix) : ((g = window.location.href.replace(/\+/g, "%20")), this.queryParams.hasOwnProperty("_") || (g += "&_=" + this.prefix)), (g += m);
                    }
                } else {
                    var p = "&" + a + "=" + encodeURIParamValue(this.queryParams[a][0]);
                    g = window.location.href.replace(p, m);
                }
            } else g = window.location.href.replace(/\+/g, "%20").replace("&" + a + "=" + encodeURIParamValue(this.queryParams[a]), "");
        } else {
            var f = void 0 !== f ? f : null,
                q = window.location.pathname;
            if (("/" == q.slice(-1) && (q = q.substring(0, q.length - 1)), "pf_cs_collection" == a)) g = window.location.href.indexOf(b) > -1 ? q.replace(b, "") + b.split("/")[0] : "/" + q.split("/")[1] + "/" + b;
            else if ("" != q) {
                var r = "",
                    s = q.split("/");
                3 == s.length ? (r = s.slice(0, -1).join("/") + "/" + b) : s.length > 3 && (r = s.slice(0, -2).join("/") + "/" + b), (g = !0 === f ? window.location.href.split("?")[0] : window.location.href), (g = g.replace(q, r));
            }
        }
        "collection" == c && this.isSearchPage() && ((g = g.replace("&collection_scope=" + this.queryParams.collection_scope, "")), (g += "&collection_scope=" + i));
        var t = "&" + a + "_and_condition=true";
        if (-1 == g.indexOf(t)) {
            jQ('[data-id="' + a + '"]').attr("data-and-condition") && (g += t);
        } else -1 == g.indexOf(a + "=") && (g = g.replace(t, ""));
        if ("review_ratings" == c) {
            var u = "&" + a + "_show_exact_rating=true";
            if (-1 == g.indexOf(u)) {
                jQ('[data-id="' + a + '"]').attr("data-exact-rating") && (g += u);
            } else -1 == g.indexOf(a + "=") && (g = g.replace(u, ""));
        }
        return (g = removePageParamFromUrl(g)), (g = this.customizeFilterOptionLink(g, a, b, c, d, e, f));
    }),
    (BCSfFilter.prototype.buildSubmitLink = function (a, b, c, d, e) {
        var f = (newParamValue = "");
        if (this.queryParams.hasOwnProperty(a)) for (var g = 0; g < this.queryParams[a].length; g++) f += "&" + a + "=" + encodeURIParamValue(this.queryParams[a][g]);
        for (var h = 0; h < b.length; h++) newParamValue += "&" + a + "=" + b[h];
        if (f != newParamValue) {
            if ("" != f) var i = window.location.href.replace(f, newParamValue);
            else {
                var i = window.location.href;
                0 === window.location.search.length ? (i += "?_=" + this.prefix) : ((i = window.location.href), this.queryParams.hasOwnProperty("_") || (i += "&_=" + this.prefix)), (i += newParamValue);
            }
            var j = "&" + a + "_and_condition=true";
            if (-1 == i.indexOf(j)) {
                jQ('[data-id="' + a + '"]').attr("data-and-condition") && (i += j);
            } else -1 == i.indexOf(a + "=") && (i = i.replace(j, ""));
            return (i = removePageParamFromUrl(i)), (i = this.customizeSubmitLink(i, a, b, c, d, e));
        }
        return !1;
    }),
    (BCSfFilter.prototype.buildFilterOptionCustomLink = function (a, b, c, d, e, f) {
        return "";
    }),
    (BCSfFilter.prototype.customizeFilterOptionLink = function (a, b, c, d, e, f, g) {
        return a;
    }),
    (BCSfFilter.prototype.customizeSubmitLink = function (a, b, c, d, e, f) {
        return a;
    }),
    (BCSfFilter.prototype.buildClearFilterOptionLink = function (a, b, c) {
        if (Array.isArray(c)) {
            for (var d = "", e = 0; e < c.length; e++) d += "&" + a + "=" + encodeURIParamValue(c[e]);
            var f = window.location.href.replace(/\+/g, "%20").replace(d, "");
        } else
            var g = new RegExp("&" + a + "=" + encodeURIParamValue(c).replace(/(?=[() ])/g, "\\") + "&", "g"),
                f = (window.location.href.replace(/\+/g, "%20") + "&").replace(g, "&");
        return (
            -1 == f.indexOf(a + "=") && f.indexOf(a + "_and_condition") > -1 && (f = f.replace("&" + a + "_and_condition=true", "")),
            -1 == f.indexOf(a + "=") && f.indexOf(a + "_show_exact_rating") > -1 && (f = f.replace("&" + a + "_show_exact_rating=true", "")),
            a.indexOf("pf_c_") > -1 && (f = removeCollectionScopeParamFromUrl(f)),
            "&" == f[f.length - 1] && (f = f.slice(0, -1)),
            (f = removePageParamFromUrl(f))
        );
    }),
    (BCSfFilter.prototype.getPriceLabel = function (a) {
        if (0 == a.indexOf(":")) return this.getSettingValue("label.under") + " " + this.formatMoney(100 * parseFloat(a.substr(1)));
        if (a.indexOf(":") == a.length - 1) return this.getSettingValue("label.above") + " " + this.formatMoney(100 * parseFloat(a.slice(0, -1)));
        if (2 == a.split(":").length) {
            var b = a.split(":");
            return this.formatMoney(100 * parseFloat(b[0])) + " - " + this.formatMoney(100 * parseFloat(b[1]));
        }
    }),
    (BCSfFilter.prototype.getPercentSaleLabel = function (a) {
        return (
            (a = this.removeDecimal(a)),
            0 == a.indexOf(":")
                ? this.getSettingValue("label.under") + " " + a.substr(1) + "%"
                : a.indexOf(":") == a.length - 1
                ? this.getSettingValue("label.above") + " " + a.slice(0, -1) + "%"
                : 2 == a.split(":").length
                ? a.split(":")[0] + "% - " + a.split(":").pop() + "%"
                : void 0
        );
    }),
    (BCSfFilter.prototype.buildFilterTreeMobileButton = function (a) {
        var b = !1;
        if (a.hasOwnProperty("filter") && a.filter.hasOwnProperty("options") && a.filter.options.length > 0)
            for (var c = a.filter.options, d = 0; d < c.length; d++)
                if (this.checkShowFilterOption(c[d])) {
                    b = !0;
                    break;
                }
        if (b) {
            var e = this.getSelector("filterTreeMobile"),
                f = this.getSelector("filterTreeMobileButton"),
                g = !1,
                h = this.class.mobileButtonOpen,
                i = this.getSettingValue("label.refineMobile");
            jQ(f).hasClass(h) && ((g = !0), (i = this.getSettingValue("label.refineMobileCollapse")));
            var j = this.getTemplate("filterTreeMobileButton").replace(/{{label}}/g, i);
            jQ(e).html(j), g && jQ(f).addClass(h), this.buildFilterTreeMobileButtonEvent();
        }
    }),
    (BCSfFilter.prototype.buildFilterTreeMobileButtonEvent = function () {
        var a = this,
            b = this.getSelector("filterTree"),
            c = this.getSelector("filterTreeMobileButton");
        jQ(c).unbind("click"),
            jQ(c).on("click", function () {
                var c = a.mobileStyle;
                if ("style2" == c || "style3" == c) jQ(b).toggleClass("bc-sf-filter-tree-mobile-open"), a.buildFilterTreeMobile(), a.removeScrollbar(jQ("." + a.class.filterBlockContent));
                else {
                    if (a.getSettingValue("general.changeMobileButtonLabel")) {
                        var d = a.class.mobileButtonOpen;
                        jQ(this).toggleClass(d);
                        var e = jQ(this).hasClass(d) ? a.getSettingValue("label.refineMobileCollapse") : a.getSettingValue("label.refineMobile");
                        jQ(this).text(e);
                    }
                    jQ(b).slideToggle(function () {
                        jQ(b).toggleClass("bc-sf-filter-tree-mobile-open"), a.buildFilterOptionBoxStyle(jQ(this)), a.buildFilterScrollbar();
                    });
                }
            });
    }),
    (BCSfFilter.prototype.getFilterTreeMobileTemplate = function (a) {
        switch (a) {
            case "style2":
            case "style3":
                return {
                    toolbar:
                        '<div id="bc-sf-filter-mobile-toolbar"><div class="bc-sf-filter-mobile-toolbar-header">' +
                        bcsffilter.getSettingValue("label.refineMobile") +
                        '</div><div class="bc-sf-filter-mobile-toolbar-items"><div class="bc-sf-filter-mobile-toolbar-left"></div><div class="bc-sf-filter-mobile-toolbar-right"></div></div></div>',
                    footer: '<div id="bc-sf-filter-mobile-footer"><button type="button" onClick="showResultMobile(true)">' + bcsffilter.getSettingValue("label.showResult") + "</button></div>",
                };
            default:
                return "";
        }
    }),
    (BCSfFilter.prototype.buildFilterTreeMobile = function () {
        var a = this.mobileStyle;
        if (this.isMobile() && "" != a) {
            jQ(this.selector.filterTree).addClass("bc-sf-filter-tree-mobile-" + a), ("style2" != a && "style3" != a) || jQ(this.selector.filterTree).addClass("bc-sf-filter-tree-mobile-full-width");
            var b = this.getFilterTreeMobileTemplate(a);
            switch (a) {
                case "style2":
                    this.buildFilterTreeMobileStyle2(b);
                    break;
                case "style3":
                    this.buildFilterTreeMobileStyle3(b);
            }
        }
    }),
    (BCSfFilter.prototype.removeFilterTreeMobileStyle = function () {
        var a = this.mobileStyle;
        if ("" != a)
            switch ((jQ(this.selector.filterTree).removeClass("bc-sf-filter-tree-mobile-" + a), closeFilterMobile(), a)) {
                case "style2":
                    this.removeFilterTreeMobileStyle2();
                    break;
                case "style3":
                    this.removeFilterTreeMobileStyle3();
            }
    }),
    (BCSfFilter.prototype.buildFilterTreeMobileStyle2 = function (a) {
        jQ("#bc-sf-filter-mobile-toolbar").remove(),
            jQ("#bc-sf-filter-mobile-footer").remove(),
            jQ(this.selector.filterTree).prepend(a.toolbar).append(a.footer),
            jQ('[data-display-type="range"] .' + this.class.filterBlockContent).addClass("no-scrollbar"),
            this.buildToolbarFilterTreeMobile("close"),
            this.buildFilterSelectionMobile(),
            this.buildFilterOptionTitleEvent();
    }),
    (BCSfFilter.prototype.removeFilterTreeMobileStyle2 = function () {
        jQ(this.selector.filterTree).children("#bc-sf-filter-mobile-toolbar").remove(),
            jQ(this.selector.filterTree).children("#bc-sf-filter-mobile-footer").remove(),
            jQ("." + this.class.filterSelectedItemsMobile).remove(),
            jQ("." + this.class.filterBlockContent).removeClass("no-scrollbar");
    }),
    (BCSfFilter.prototype.buildFilterTreeMobileStyle3 = function (a) {
        this.buildFilterTreeMobileStyle2(a);
        var b = this,
            c = this.class.filterOptionOpenList;
        0 == jQ("." + c).length && jQ("body").append('<input type="hidden" class="' + c + '" />');
        var d =
            "" != jQ("." + c).val()
                ? jQ("." + c)
                      .val()
                      .split(",")
                : [];
        jQ("." + this.class.filterOption).each(function () {
            var a = jQ(this)
                .closest("." + b.class.filterOption)
                .attr("data-id");
            d.indexOf(a) > -1 &&
                (jQ(this)
                    .find("." + b.class.filterBlockContent)
                    .show(0, function () {
                        b.buildFilterScrollbar(jQ(this)), b.buildFilterOptionBoxStyle(jQ(this));
                    }),
                jQ(this)
                    .find("." + b.class.filterBlockContent)
                    .siblings("." + b.class.filterOptionShowSearchBox + "-wrapper").length > 0 &&
                    jQ(this)
                        .find("." + b.class.filterBlockContent)
                        .siblings("." + b.class.filterOptionShowSearchBox + "-wrapper")
                        .show());
        });
    }),
    (BCSfFilter.prototype.removeFilterTreeMobileStyle3 = function () {
        this.removeFilterTreeMobileStyle2();
    }),
    (BCSfFilter.prototype.buildToolbarFilterTreeMobile = function (a) {
        "open" == a
            ? (jQ(".bc-sf-filter-mobile-toolbar-left").html('<a class="bc-sf-filter-mobile-apply" onclick="applyFilterOption()">' + this.getSettingValue("label.apply") + "</a>"),
              "collection" != jQ(".bc-sf-filter-option-block-active").data("type")
                  ? jQ(".bc-sf-filter-mobile-toolbar-right").html('<a class="' + this.class.clearButton + '" onClick="clearFilterOptionMobile()">' + this.getSettingValue("label.clear") + "</a>")
                  : jQ(".bc-sf-filter-mobile-toolbar-right").empty())
            : (jQ(".bc-sf-filter-mobile-toolbar-left").html('<a href="javascript:;" class="bc-sf-filter-close-btn" onClick="closeFilterMobile()">' + this.getSettingValue("label.close") + "</a>"),
              this.checkExistFilterOptionParam() ? jQ(".bc-sf-filter-mobile-toolbar-right").html(this.buildClearAllButton()) : jQ(".bc-sf-filter-mobile-toolbar-right").empty());
    }),
    (BCSfFilter.prototype.buildFilterSelectionMobile = function () {
        var a = [],
            b = this;
        if (
            (jQ(this.selector.filterTree + " ." + this.class.filterOption).each(function () {
                var c = jQ(this).data("type"),
                    d = jQ(this);
                if (!b.isCollectionParam(c)) {
                    var e = [],
                        f = jQ(this).attr("data-id"),
                        g = jQ(this).attr("data-display-type"),
                        h = jQ(this).attr("data-type"),
                        i = jQ(this).attr("data-select-type"),
                        j = jQ(this).attr("data-prefix");
                    if (((j = void 0 !== j && null !== j && !1 !== j ? j.replace(/\\/g, "") : ""), "range" !== g)) {
                        if (
                            (jQ(this)
                                .find("a.selected")
                                .each(function () {
                                    a.push(f + "=" + jQ(this).attr("data-value"));
                                }),
                            b.queryParams.hasOwnProperty(f) && b.queryParams[f] && b.queryParams[f].length)
                        ) {
                            var k = b.queryParams[f];
                            Array.isArray(k) || (k = [k]);
                            for (var l = 0; l < k.length; l++) {
                                var m = b.customizeFilterOptionLabel(k[l], j, h);
                                e.push(m), "single" !== i && a.push(f + "=" + encodeURIParamValue(k[l]));
                            }
                        }
                        a = a.filter(function (a, b, c) {
                            var e = !0;
                            if (a.length && ((iValue = a.split("=")), iValue.length > 1)) {
                                var f = d.find('a[data-id="' + iValue[0] + '"][data-value="' + iValue[1] + '"]');
                                f.length && !f.hasClass("selected") && (e = !1);
                            }
                            return c.indexOf(a) === b && e;
                        });
                    } else if (
                        jQ(this)
                            .find("." + b.class.filterOptionRange + "-slider")
                            .hasClass("selected")
                    ) {
                        var n = jQ(this)
                                .find("." + b.class.filterOptionRange + "-slider")
                                .attr("data-value"),
                            m = "";
                        if (n.length) {
                            if (
                                jQ(this)
                                    .find("." + b.class.filterOptionRange + "-slider")
                                    .hasClass("bc-sf-filter-option-advanced-range-slider")
                            ) {
                                var o = jQ(this).data("filter-option"),
                                    j = jQ(this).data("prefix") || "";
                                j = j.replace(/\\/g, "");
                                var p = n.split(","),
                                    q = [];
                                if (o && o.hasOwnProperty("values"))
                                    var q = o.values.map(function (a) {
                                        return a.key;
                                    });
                                var r = q.length ? b.getAdvancedRangeSelectedValues(p, q) : [p[0], p[p.length - 1]];
                                (m = r[0].toString().replace(j, "")), p.length > 1 && (m += " - " + r[1].toString().replace(j, ""));
                                for (var l in p) a += "&" + f + "=" + encodeURIParamValue(p[l]);
                            } else {
                                var p = n.split(":");
                                if ("price" == c) {
                                    var s = b.formatMoney(100 * p[0]),
                                        t = b.formatMoney(100 * p[1]);
                                    b.getSettingValue("general.removePriceDecimal") && ((s = b.removeDecimal(s)), (t = b.removeDecimal(t)));
                                    var m = s + " - " + t;
                                } else var m = p[0] + " - " + p[1];
                                a.push(f + "=" + encodeURIParamValue(n));
                            }
                            e.push(m);
                        }
                    }
                    jQ(this)
                        .find("." + b.class.filterBlockTitle + " p")
                        .remove(),
                        jQ(this)
                            .find("." + b.class.filterBlockTitle)
                            .append('<p class="' + b.class.filterSelectedItemsMobile + '">' + e.join(", ") + "</p>");
                }
            }),
            a.length && (a = "&" + a.join("&")),
            this.isSearchPage)
        ) {
            var c = this.getSearchTerm();
            null !== c && "" != c && (a += "&" + this.searchTermKey + "=" + c);
        }
        jQ("#bc-sf-filter-params").remove(), jQ(this.selector.filterTree).append('<input type="hidden" id="bc-sf-filter-params" value="' + a + '"/>');
    }),
    (BCSfFilter.prototype.buildFilterOptionTitleEvent = function () {
        switch (this.mobileStyle) {
            case "style2":
                this.buildFilterOptionTitleEventStyle2();
                break;
            case "style3":
                this.buildFilterOptionTitleEventStyle3();
        }
    }),
    (BCSfFilter.prototype.buildFilterOptionTitleEventStyle2 = function () {
        var a = this,
            b = this.selector.filterTree,
            c = jQ(b).find("#bc-sf-filter-options-wrapper"),
            d = jQ(b).find("." + this.class.filterBlockTitle);
        d.unbind("click"),
            d.click(function () {
                c.css("opacity", 0.5);
                var d = this;
                jQ("." + a.class.filterBlockContent).hide(),
                    jQ(this).children().css("white-space", "nowrap"),
                    c.animate({ width: "toggle" }, "fast", function () {
                        jQ(b + " ." + a.class.filterOption).hide(),
                            jQ(b)
                                .find("." + a.class.filterBlockTitle)
                                .hide(),
                            jQ(d).parent().show(),
                            jQ(d).parent().addClass("bc-sf-filter-option-block-active"),
                            jQ(d).siblings().show(),
                            c.css("opacity", 1),
                            a.buildToolbarFilterTreeMobile("open");
                    }),
                    c.animate({ width: "toggle" }, "fast", function () {
                        var b = jQ(d).siblings("." + a.class.filterBlockContent);
                        a.buildFilterOptionBoxStyle(b), a.buildFilterScrollbar(b);
                    });
            });
    }),
    (BCSfFilter.prototype.buildFilterOptionTitleEventStyle3 = function () {
        var a = this,
            b = this.selector.filterTree,
            c = (jQ(b).find("#bc-sf-filter-options-wrapper"), jQ(b).find("." + this.class.filterBlockTitle)),
            d = this.class.filterOptionOpenList,
            e =
                jQ("." + d).length > 0
                    ? jQ("." + d)
                          .val()
                          .split(",")
                    : [];
        c.unbind("click"),
            c.click(function () {
                var b = jQ(this),
                    c = jQ(this).parent().attr("data-id");
                "block" ==
                jQ(this)
                    .siblings("." + a.class.filterBlockContent)
                    .css("display")
                    ? (jQ(this).siblings().slideUp(), b.parents("." + a.class.filterOption).removeClass("bc-sf-filter-option-block-active"), e.length > 0 && e.indexOf(c) > -1 && e.splice(e.indexOf(c), 1))
                    : (jQ(this)
                          .siblings()
                          .slideDown(function () {
                              b.parents("." + a.class.filterOption).addClass("bc-sf-filter-option-block-active"), a.buildFilterScrollbar(b.siblings("." + a.class.filterBlockContent));
                          }),
                      e.push(c),
                      a.buildFilterOptionBoxStyle(jQ(this).siblings("." + a.class.filterBlockContent))),
                    jQ("." + d).val(e.join(","));
            });
    }),
    (BCSfFilter.prototype.checkIsFullWidthMobile = function () {
        return !(!this.isMobile() || ("style2" != this.mobileStyle && "style3" != this.mobileStyle));
    }),
    (BCSfFilter.prototype.isLoadMorePaginationType = function () {
        return "load_more" == this.getSettingValue("general.paginationType");
    }),
    (BCSfFilter.prototype.isDefaultPaginationType = function () {
        return "default" == this.getSettingValue("general.paginationType");
    }),
    (BCSfFilter.prototype.isInfiniteLoadingPaginationType = function () {
        return "infinite" == this.getSettingValue("general.paginationType");
    }),
    (BCSfFilter.prototype.isLoadPreviousPagePaginationType = function () {
        var a = this;
        return a.isLoadMorePaginationType() && a.isAdvancedPaginationType() && a.getSettingValue("general.activeLoadPreviousPage") && jQ(a.getSelector("btnLoadPreviousPageWrapperSelector")).length > 0;
    }),
    (BCSfFilter.prototype.isAdvancedPaginationType = function () {
        return this.getSettingValue("general.paginationTypeAdvanced");
    }),
    (BCSfFilter.prototype.buildToolbarEvent = function (a) {
        this.buildPaginationEvent(a), this.buildSortingEvent(), this.buildShowLimitEvent(), this.buildDisplayTypeEvent();
    }),
    (BCSfFilter.prototype.buildPaginationEvent = function (a) {
        switch (this.getSettingValue("general.paginationType")) {
            case "default":
                this.buildDefaultPaginationEvent(a);
                break;
            case "load_more":
                this.buildLoadMoreEvent(a), this.buildLoadPreviousPageEvent(a);
                break;
            default:
                this.buildInfiniteLoadingEvent(a);
        }
    }),
    (BCSfFilter.prototype.buildDefaultPaginationEvent = function (a) {
        var b = this,
            c = this.getSelector("pagination");
        jQ(c).find("a").unbind("click"),
            jQ(c)
                .find("a")
                .on("click", function (a) {
                    a.preventDefault(), (b.internalClick = !0);
                    var c = jQ(this).attr("href");
                    b.onChangeData(c, "page"), jQ("body,html").animate({ scrollTop: jQ(b.getSelector("products")).offset().top - 50 }, 600);
                });
    }),
    (BCSfFilter.prototype.buildInfiniteLoadingEvent = function (a) {
        var b = this,
            c = parseInt(a.total_product),
            d = parseInt(b.getSettingValue("general.limit")),
            e = parseInt(b.queryParams.page);
        if (c > d * e) {
            var f = 0,
                g = !1,
                h = jQ(b.getSelector("bottomPagination"));
            h.length > 0 &&
                jQ(window).scroll(function (c) {
                    if ((c.preventDefault(), c.stopPropagation(), jQ(b.selector.products).hasClass("bc-sf-product-loading"))) return !1;
                    var d = jQ(window).height() * (jQ(window).height() / jQ(document).outerHeight()),
                        i = parseInt(h.offset().top),
                        j = parseInt(jQ(window).scrollTop()) + d + b.getSettingValue("general.positionShowInfiniteLoading");
                    if ((jQ(window).scrollTop() + jQ(window).height() + d >= jQ(document).outerHeight() - 100 && (g = !0), 0 == f && a.products.length > 0 && (j >= i || (j < i && g)))) {
                        b.showLoadMoreLoading(), (f = 1), e++;
                        var k = Math.ceil(a.total_product / b.getSettingValue("general.limit"));
                        if (e <= k)
                            if (((b.internalClick = !0), (b.queryParams.limit = b.getSettingValue("general.limit")), (b.queryParams.page = e), b.getSettingValue("general.paginationTypeAdvanced"))) {
                                var l = b.buildToolbarLink("page", e - 1, e);
                                b.onChangeData(l, "page");
                            } else b.getFilterData("page");
                    }
                });
        }
    }),
    (BCSfFilter.prototype.buildLoadMoreEvent = function (a) {
        var b = this;
        if (a.total_product > 0) {
            var c = 1 == this.queryParams.page ? this.queryParams.page : (this.queryParams.page - 1) * this.queryParams.limit + 1,
                d = c + a.products.length - 1,
                e = (this.queryParams.page - 1) * this.queryParams.limit + 1;
            jQ(b.getSelector("products") + " > *").length && (e -= jQ(b.getSelector("products") + " > *").length - this.queryParams.limit);
            var f = this.getSettingValue("label.loadMoreTotal")
                .replace(/{{ from }}/g, e)
                .replace(/{{ to }}/g, d)
                .replace(/{{ total }}/g, a.total_product);
            jQ("#bc-sf-filter-load-more-total").empty().html(f);
            var g = b.getSettingValue("label.loadMore").replace(/{{ amountProduct }}/g, this.queryParams.limit);
            jQ(b.getSelector("loadMoreButtonContainer") + " .bc-sf-filter-load-more-button")
                .empty()
                .html(g);
        }
        var h,
            i = (bcsffilter.queryParams, parseInt(this.queryParams.page));
        (h = b.isLoadPreviousPagePaginationType() ? parseInt(sessionStorage.getItem(b.getSettingValue("general.sessionStorageCurrentNextPage"))) : i),
            jQ(this.getSelector("loadMore"))
                .find("a")
                .off("click")
                .on("click", function (a) {
                    if (
                        (a.preventDefault(),
                        jQ(b.getSelector("loadMoreButtonContainer")).hide(),
                        b.showLoadMoreLoading(),
                        h++,
                        (b.internalClick = !0),
                        (b.queryParams.limit = b.getSettingValue("general.limit")),
                        (b.queryParams.page = h),
                        b.isAdvancedPaginationType())
                    ) {
                        var c = b.buildToolbarLink("page", i, h);
                        b.isLoadPreviousPagePaginationType() &&
                            (sessionStorage.setItem(b.getSettingValue("general.sessionStorageCurrentNextPage"), h), sessionStorage.setItem(b.getSettingValue("general.sessionStoragePreviousPageEvent"), 0)),
                            b.onChangeData(c, "page");
                    } else b.getFilterData("page");
                });
    }),
    (BCSfFilter.prototype.buildLoadPreviousPageEvent = function (a) {
        var b = this;
        if (b.isLoadPreviousPagePaginationType()) {
            var c = jQ(b.getSelector("btnLoadPreviousPageWrapperSelector"));
            c.unbind("click"),
                c.on("click", function (a) {
                    a.preventDefault();
                    var c,
                        d = parseInt(b.queryParams.page),
                        e = jQ(this);
                    if ((c = null != sessionStorage.getItem(b.getSettingValue("general.sessionStorageCurrentPreviousPage")) ? parseInt(sessionStorage.getItem(b.getSettingValue("general.sessionStorageCurrentPreviousPage"))) : d) < 2)
                        return e.hide(), !1;
                    (b.internalClick = !0), (b.queryParams.limit = b.getSettingValue("general.limit")), c--, (b.queryParams.page = c);
                    var f = b.buildToolbarLink("page", d, c);
                    sessionStorage.setItem(b.getSettingValue("general.sessionStorageCurrentPreviousPage"), c),
                        sessionStorage.setItem(b.getSettingValue("general.sessionStoragePreviousPageEvent"), 1),
                        b.onChangeData(f, "page"),
                        c < 2 && e.hide();
                });
        }
    }),
    (BCSfFilter.prototype.buildSortingEvent = function () {
        var a = this;
        jQ(this.getSelector("topSorting") + " select").change(function (b) {
            onInteractWithToolbar(b, "sort", a.queryParams.sort, jQ(this).val());
        });
    }),
    (BCSfFilter.prototype.buildShowLimitEvent = function () {
        var a = this;
        jQ(this.getSelector("topShowLimit") + " select").change(function (b) {
            onInteractWithToolbar(b, "limit", a.queryParams.limit, jQ(this).val());
        });
    }),
    (BCSfFilter.prototype.buildDisplayTypeEvent = function () {
        var a = this;
        jQ(this.getSelector("topDisplayType") + " a").click(function (b) {
            b.preventDefault(), (a.internalClick = !0), jQ(this).parent().children().removeClass("active"), jQ(this).addClass("active");
            var c = jQ(this).attr("href");
            a.onChangeData(c, "display");
        });
    }),
    (BCSfFilter.prototype.buildToolbarLink = function (a, b, c) {
        var d = window.location.href,
            e = a + "=" + b,
            f = a + "=" + c;
        d.indexOf("?" + a + "=") > -1 ? (d = d.replace("?" + e, "?" + f)) : d.indexOf("&" + a + "=") > -1 ? (d = d.replace("&" + e, "&" + f)) : 0 === window.location.search.length ? (d += "?" + f) : (d = d.replace("?", "?" + f + "&")),
            "page" == a && 1 == c && (d = d.replace("?page=1&", "?").replace("?page=1", ""));
        var g = ["display", "page", "limit"];
        if (this.queryParams.hasOwnProperty("page") && -1 == g.indexOf(a)) {
            var h = "page=" + this.queryParams.page;
            d = d
                .replace("&" + h, "")
                .replace("?" + h, "?")
                .replace("?&", "?");
        }
        return d;
    }),
    (BCSfFilter.prototype.showLoading = function () {
        ((!this.isMobile() && this.getSettingValue("general.showLoading")) || (this.isMobile() && this.getSettingValue("general.showMobileLoading"))) &&
            (0 == jQ("#bc-sf-filter-loading").length && jQ("body").append(this.getTemplate("loading")), jQ("#bc-sf-filter-loading").show());
    }),
    (BCSfFilter.prototype.hideLoading = function () {
        ((!this.isMobile() && this.getSettingValue("general.showLoading")) || (this.isMobile() && this.getSettingValue("general.showMobileLoading"))) && jQ("#bc-sf-filter-loading").hide();
    }),
    (BCSfFilter.prototype.removePlaceholderForFilterTree = function () {
        jQ(this.getSelector("filterTree")).find(".bc-sf-filter-option-skeleton").remove(),
            jQ(this.getSelector("filterTreeHorizontal")).find(".bc-sf-filter-option-skeleton").remove(),
            jQ("body").find(".bc-sf-filter-skeleton-text, .bc-sf-filter-skeleton-button").remove(),
            (this.getSettingValue("general.loadProductFromLiquid") && "ajax" == this.getSettingValue("general.loadProductFromLiquidType")) || this.removePlaceholderForProductList();
    }),
    (BCSfFilter.prototype.removePlaceholderForProductList = function () {
        var a = this;
        jQ(this.getSelector("products")).find(".bc-sf-filter-product-skeleton").remove(),
            setTimeout(function () {
                jQ(a.getSelector("products")).removeClass("bc-sf-product-loading").css("min-height", 0);
            });
    }),
    (BCSfFilter.prototype.showLoadMoreLoading = function () {
        if (this.getSettingValue("general.showLoadMoreLoading") && !1 === this.getSettingValue("general.showLoading")) {
            var a = this.getTemplate("loadMoreLoading").replace("{{loadingIcon}}", '<div id="bc-sf-filter-load-more-icon"></div>');
            jQ(this.getSelector("loadMore")).append(a), jQ(this.getSelector("loadMore")).show();
        }
    }),
    (BCSfFilter.prototype.hideLoadMoreLoading = function () {
        this.getSettingValue("general.showLoadMoreLoading") && jQ(this.getSelector("loadMoreLoading")).remove();
    }),
    (BCSfFilter.prototype.showError = function (a) {}),
    (BCSfFilter.prototype.buildPagination = function (a) {}),
    (BCSfFilter.prototype.buildLoadMoreButton = function (a) {
        var b = this.getSelector("loadMore"),
            c = this.getSelector("loadMoreButtonContainer"),
            d = this.queryParams,
            e = Math.ceil(a / d.limit);
        if (0 == jQ(this.getSelector("loadMoreButtonContainer")).length) {
            var f = this.getTemplate("loadMoreButton").replace(/{{label.loadMore}}/g, this.getSettingValue("label.loadMore"));
            jQ(b).prepend(f);
        }
        parseInt(d.page) < e ? (jQ(b).show(), jQ(c).show()) : jQ(b).hide();
    }),
    (BCSfFilter.prototype.buildLoadPreviousButton = function (a, b) {
        var c = this;
        if (c.isLoadPreviousPagePaginationType()) {
            var d = jQ(this.getSelector("btnLoadPreviousPageWrapperSelector"));
            if (0 == jQ(c.getSelector("btnLoadPreviousPageSelector")).length) {
                var e = c.getTemplate("btnLoadPreviousPageTemplate").replace(/{{label.loadPreviousPage}}/g, this.getSettingValue("label.loadPreviousPage"));
                d.html(e);
            }
            var f = c.queryParams,
                g = Math.ceil(a / f.limit),
                h = f.page,
                i = g > 1 && h > 1;
            ("init" != b && "page" == b) ||
                (sessionStorage.setItem(c.getSettingValue("general.sessionStorageCurrentPreviousPage"), h),
                sessionStorage.setItem(c.getSettingValue("general.sessionStorageCurrentPage"), h),
                sessionStorage.setItem(c.getSettingValue("general.sessionStorageCurrentNextPage"), h),
                sessionStorage.setItem(c.getSettingValue("general.sessionStoragePreviousPageEvent"), 1),
                i ? d.show() : d.hide());
        }
    }),
    (BCSfFilter.prototype.buildToolbar = function () {
        this.buildFilterShowLimit(), this.buildFilterSorting(), this.buildFilterDisplayType();
    }),
    (BCSfFilter.prototype.buildFilterShowLimit = function () {}),
    (BCSfFilter.prototype.buildFilterSorting = function () {}),
    (BCSfFilter.prototype.buildFilterDisplayType = function () {}),
    (BCSfFilter.prototype.getSortingList = function () {
        var a = this.getSettingValue("general.sortingList"),
            b = this.getSettingValue("general.customSortingList");
        if ("" != b) for (var a = b.trim().split("|"), c = a.length - 1; c >= 0; c--) "" == a[c] && a.splice(c, 1);
        var d = this.getSettingValue("general.extraSortingList");
        if ((d && (a = a.concat(d.split("|"))), this.isSearchPage())) {
            var e = this.findIndexArray("manual", a);
            e >= 0 && a.splice(e, 1);
        } else {
            var f = this.findIndexArray("relevance", a);
            f >= 0 && a.splice(f, 1);
        }
        for (var g = {}, h = 0; h < a.length; h++) {
            var i = this.getSettingValue("label.sorting." + a[h]);
            d.length > 0 && d.indexOf(a[h]) > -1 && (i = this.getLabel("label", a[h].replace(/-/g, "_"))), (g[a[h]] = i);
        }
        return g;
    }),
    (BCSfFilter.prototype.buildScrollToTop = function () {
        if (1 == this.getSettingValue("general.activeScrollToTop")) {
            var a = this.getSelector("scrollToTop");
            if (0 == jQ(a).length) {
                var b = this.getTemplate("scrollToTop");
                jQ("body").append(b);
            }
            "style1" != this.getSettingValue("general.styleScrollToTop") && jQ(a).addClass(this.getSettingValue("general.styleScrollToTop")),
                jQ(a).click(function () {
                    jQ("html,body").stop().animate({ scrollTop: 0 });
                }),
                jQ(window).scroll(function (b) {
                    jQ(window).scrollTop() > 100 ? jQ(a).show() : jQ(a).hide();
                });
        }
    }),
    (BCSfFilter.prototype.buildPageInfo = function (a) {
        function b(a, b) {
            c.buildBreadcrumb(a, b), c.buildCollectionDetail(a, b), c.buildDocumentInfo(a, b);
        }
        var c = this,
            d = window.location.pathname;
        if ("/" != d) {
            var e = { collection: { description: "", handle: bcSfFilterConfig.general.collection_handle, title: this.getSettingValue("label.collectionAll") } };
            if ("/collections/all" == d) b(e, a);
            else if (this.isVendorPage()) {
                var f = { collection: { description: "", handle: "", title: getParam("q") } };
                b(f, a);
            } else if (this.isTypePage()) {
                var f = { collection: { description: "", handle: "", title: getParam("q") } };
                b(f, a);
            } else if ("/search" != d) {
                var g = window.location.href.split("?")[0] + "?view=desc";
                jQ.ajax({
                    method: "GET",
                    url: g,
                    dataType: "json",
                    success: function (c) {
                        b(c, a);
                    },
                    error: function () {
                        b(e, a);
                    },
                });
            }
        }
    }),
    (BCSfFilter.prototype.buildBreadcrumb = function (a, b) {}),
    (BCSfFilter.prototype.buildCollectionDetail = function (a, b) {
        if (void 0 !== a && a.hasOwnProperty("collection")) {
            var c = a.collection,
                d = c.hasOwnProperty("title") && "" != c.title ? c.title : null,
                e = c.hasOwnProperty("description") && "" != c.description ? c.description : null,
                f = this.class.collectionHeader,
                g = this.class.collectionDescription;
            d
                ? (jQ("." + f)
                      .html(d)
                      .show(),
                  jQ("#" + f)
                      .html(d)
                      .show())
                : (jQ("." + f).hide(), jQ("#" + f).hide()),
                e
                    ? (jQ("." + g)
                          .html(e)
                          .show(),
                      jQ("#" + g)
                          .html(e)
                          .show())
                    : (jQ("." + g).hide(), jQ("#" + g).hide());
        }
    }),
    (BCSfFilter.prototype.buildDocumentInfo = function (a, b) {
        if (void 0 !== a && a.hasOwnProperty("collection")) {
            var c = a.collection.title;
            void 0 !== this.collectionTags && null !== this.collectionTags && (c += " - " + this.collectionTags[0]), (c += " - " + this.shopName), (document.title = c);
        }
    }),
    (BCSfFilter.prototype.buildRobotsMetaTag = function (a) {
        var b = this;
        if (b.getSettingValue("general.enableSeo")) {
            if (!0 === b.checkIfPFParamsPartOfAURL() && 0 === jQ("head").find('meta[content="noindex,nofollow"]').length) {
                var c = document.createElement("meta");
                (c.name = "robots"), (c.content = "noindex,nofollow"), document.head.appendChild(c);
            }
        }
    }),
    (BCSfFilter.prototype.buildAdditionalElements = function (a, b) {}),
    (BCSfFilter.prototype.buildDefaultElements = function (a) {}),
    (BCSfFilter.prototype.checkIfPFParamsPartOfAURL = function () {
        var a = this;
        return window.location.search.length > 0 && window.location.search.indexOf(a.getSettingValue("general.filterPrefixParam")) > 0;
    }),
    (BCSfFilter.prototype.buildSEOTitle = function (a) {
        if (this.getSettingValue("search.enableFixHeadTitle")) {
            var b =
                    a.total_product <= 1
                        ? this.getLabel("label", "search_seo_title_one", "Search result: {{ count }} result for &quot;{{ terms }}&quot;")
                        : this.getLabel("label", "search_seo_title_other", "Search results: {{ count }} results for &quot;{{ terms }}&quot;"),
                c = this.getSearchTerm();
            b && null !== c && "" != c && ((c = this.escape(c)), (b = b.replace(/{{ count }}/g, a.total_product).replace(/{{ terms }}/g, c)), (document.title = b.replace(/&quot;/g, '"')));
        }
    }),
    (BCSfFilter.prototype.buildSearchResultHeader = function (a) {
        var b = this.getSearchTerm();
        if (null !== b && "" != b) {
            b = this.escape(b);
            var c = a.total_product > 0 ? this.getSettingValue("label.search.resultHeader") : this.getSettingValue("label.search.resultEmpty");
        } else var c = this.getSettingValue("label.search.generalTitle");
        jQ("." + this.class.searchResultHeader).html(c.replace(/{{ terms }}/g, b));
    }),
    (BCSfFilter.prototype.buildSearchResultNumber = function (a) {
        var b = "",
            c = this.getSearchTerm();
        null !== c &&
            "" != c &&
            ((c = this.escape(c)), (b = this.getSettingValue("label.search.resultNumber")), (b = b.replace(/{{ count }}/g, "<strong>" + a.total_product + "</strong>").replace(/{{ terms }}/g, "<strong>" + c + "</strong>"))),
            jQ("." + this.class.searchResultNumber).html(b);
    }),
    (BCSfFilter.prototype.getSearchTerm = function () {
        return getParam(this.searchTermKey);
    }),
    (BCSfFilter.prototype.updateSuggestionBlockLabel = function (a) {
        for (var b = this, c = 0; c < a.length; c++) {
            switch (a[c].type) {
                case "collections":
                    var d = "instantSearchCollectionsLabel";
                    break;
                case "pages":
                    var d = "instantSearchPagesLabel";
                    break;
                case "suggestions":
                    var d = "instantSearchSuggestionsLabel";
                    break;
                default:
                    var d = "instantSearchProductsLabel";
            }
            var e = b.getSettingValue("label.suggestion." + d);
            e && "" !== e && (a[c].label = e);
        }
        return a;
    }),
    (BCSfFilter.prototype.buildSuggestion = function (a, b, c, d) {
        var e = this,
            a = this.escape(a),
            f = jQ(c),
            g = "",
            h = getValueInObjectArray("all_empty", b);
        if ((f.closest("." + e.class.searchSuggestionWrapper).show(), h)) {
            getValueInObjectArray("redirect", b) ? f.closest("." + e.class.searchSuggestionWrapper).hide() : ((g += e.buildSuggestionNoResult(a, c)), f.append(g));
        } else {
            var i = e.getSettingValue("search.suggestionBlocks");
            if (((i = this.updateSuggestionBlockLabel(i)), e.isSuggestionStyle2() && "products" != i[0].type)) {
                var j = i.findIndex(function (a) {
                        return "products" == a.type;
                    }),
                    k = i[j];
                i.splice(j, 1), e.getSettingValue("search.suggestionStyle2ReverseProductBlock") ? i.push(k) : i.unshift(k);
            }
            var l,
                m = i.length;
            for (l = 0; l < m; l++) {
                var n = i[l];
                if (n.hasOwnProperty("status") && "active" == n.status) {
                    var o = e.findIndexArray(n.type, b, "key");
                    if (o > -1 && b[o].hasOwnProperty("values")) {
                        var p = b[o],
                            q = '<li class="bc-sf-search-suggestion-group" data-group="' + n.type + '" aria-label="' + i[l].label + '"><ul>';
                        switch (n.type) {
                            case "suggestions":
                                q += e.buildSuggestionPopular(a, p.values, c, n, b);
                                break;
                            case "products":
                                q += e.buildSuggestionProductList(a, p.values, c, n, b);
                                break;
                            case "pages":
                                q += e.buildSuggestionPage(a, p.values, c, n, b);
                                break;
                            case "collections":
                                q += e.buildSuggestionCollection(a, p.values, c, n, b);
                        }
                        (q += "</ul></li>"), f.append(q);
                    }
                }
            }
            if ("" === getValueInObjectArray("suggest_query", b)) {
                var r = e.buildSuggestionViewAll(a, b, c);
                f.append(r);
            }
        }
        f.find("." + e.class.searchSuggestionItem + "[data-label]").each(function () {
            var a = jQ(this),
                b = a.data("label") || "",
                c = a.data("value") || "";
            "" !== c && a.data("ui-autocomplete-item", { label: b.toString(), value: c }).addClass("bc-ui-item");
        }),
            e.buildSuggestionWrapper(c, d);
    }),
    (BCSfFilter.prototype.buildSuggestionWrapper = function (a, b) {
        var c = this,
            d = getSuggestionPosition(b);
        if (c.isSuggestionStyle2()) {
            var e = c.getSettingValue("search.suggestionStyle2MainContainerSelector") || "header:first";
            jQ(e).css("position", "relative");
        }
        var f = this.class.searchSuggestionWrapper,
            g = "bc-sf-search-suggestion-popover";
        if (!jQ(a).parent().hasClass(f)) {
            var h = this.checkIsFullWidthSuggestionMobile(b) ? this.class.searchSuggestionMobile : "";
            jQ(a).wrap('<div class="' + f + " " + h + '"></div>'),
                jQ(a)
                    .parent()
                    .prepend('<div class="' + g + '" data-direction="' + d + '"></div>');
        }
        if (c.isSuggestionStyle2() && jQ("." + c.class.searchSuggestionWrapper).length > 0) {
            jQ("." + c.class.searchSuggestionWrapper)
                .addClass(c.class.searchSuggestionWrapper + "-" + c.getSettingValue("search.suggestionStyle"))
                .addClass(c.class.searchSuggestionWrapper + "-" + c.getSettingValue("search.suggestionStyle") + "-width-fullwidth")
                .addClass(c.class.searchSuggestion + "-products-per-row-" + c.getSettingValue("search.suggestionStyle2ProductPerRow"))
                .addClass(c.class.searchSuggestion + "-reverse-product-block-" + c.getSettingValue("search.suggestionStyle2ReverseProductBlock"));
        }
        jQ(a).siblings().show();
        var i = this.checkIsFullWidthSuggestionMobile(b) ? "top" : "top+12";
        if ("left" == d) {
            jQ(a)
                .parent()
                .position({ my: "left " + i, at: "left bottom", of: jQ(b)[0] });
            var j = function () {
                jQ("." + g).position({ my: "left+20 top-8" + i, at: "left bottom", of: jQ(b)[0] });
            };
        } else {
            jQ(a)
                .parent()
                .position({ my: "right " + i, at: "right bottom", of: jQ(b)[0] });
            var j = function () {
                jQ("." + g).position({ my: "right-20 top-8", at: "right bottom", of: jQ(b)[0] });
            };
        }
        if ((j(), c.isSuggestionStyle2()))
            jQ(window).resize(function () {
                j();
            });
        else {
            var k = this.getSuggestionWidth(b);
            jQ(a).parent().outerWidth(k);
        }
    }),
    (BCSfFilter.prototype.buildSuggestionPopular = function (a, b, c, d, e) {
        var f = "";
        if (Object.keys(b).length > 0) {
            var g,
                f = this.buildSuggestionHeader(d.label, "popular"),
                h = b.length;
            for (g = 0; g < h; g++) {
                var i = this.highlightSuggestionResult(b[g], a);
                (f +=
                    '<li class="' +
                    this.class.searchSuggestionItem +
                    '" data-label="' +
                    this.escape(d.label) +
                    ": " +
                    this.escape(b[g]) +
                    '" data-value="' +
                    this.escape(b[g]) +
                    '" aria-label="' +
                    this.escape(d.label) +
                    ": " +
                    this.escape(b[g]) +
                    '">'),
                    (f += '<a href="' + this.buildSearchLink(b[g]) + '">' + i + "</a>"),
                    (f += "</li>");
            }
        }
        return f;
    }),
    (BCSfFilter.prototype.buildSuggestionProductList = function (a, b, c, d, e) {
        var f = "";
        f += this.buildSuggestionHeader(d.label, "product");
        var g = this.buildSuggestionDidYouMean(a, e, c);
        if (("" != g && (f += '<li class="' + this.class.searchSuggestionItem + ' bc-sf-search-suggestion-dym" aria-label="Did you mean">' + g + "</li>"), Object.keys(b).length > 0)) {
            var h,
                i = b.length;
            for (h = 0; h < i; h++) {
                var j = b[h],
                    k = this.customizeSuggetionProductTitle(j.title, a, b);
                k = this.highlightSuggestionResult(k, a);
                var l = this.buildProductItemUrl(j, !1),
                    m = j.images_info.length > 0 ? this.optimizeImage(j.images_info[0].src, "200x") : bcSfFilterConfig.general.no_image_url,
                    n = null !== j.skus && j.skus.length > 0 ? j.skus[0] : "",
                    o = this.class.searchSuggestion,
                    p = this.getSettingValue("search.openProductNewTab") ? 'target="_blank"' : "";
                (f +=
                    '<li class="' +
                    this.class.searchSuggestionItem +
                    " " +
                    this.class.searchSuggestionItem +
                    '-product" data-label="' +
                    this.escape(j.id) +
                    '" data-value="' +
                    this.escape(j.title) +
                    '" aria-label="' +
                    this.escape(d.label) +
                    ": " +
                    this.escape(j.title) +
                    '">'),
                    (f += '<a href="' + l + '" ' + p + ">"),
                    this.getSettingValue("search.showSuggestionProductImage") && (f += '<div class="' + o + '-left"><img src="' + m + '" /></div>'),
                    (f += '<div class="' + o + '-right">'),
                    (f += '<div class="' + o + '-product-title">' + k + "</div>"),
                    this.getSettingValue("search.showSuggestionProductSku") && (f += '<div class="' + o + '-product-sku">SKU: ' + n + "</div>"),
                    this.getSettingValue("search.showSuggestionProductVendor") && (f += '<div class="' + o + '-product-vendor">' + j.vendor + "</div>"),
                    (f += this.buildSuggestionProductPrice(j)),
                    (f += "</div>"),
                    (f += "</a>"),
                    (f += "</li>");
            }
        }
        return f;
    }),
    (BCSfFilter.prototype.customizeSuggetionProductTitle = function (a, b, c) {
        return a;
    }),
    (BCSfFilter.prototype.buildSuggestionProductPrice = function (a) {
        this.prepareSuggestionProductPriceData(a);
        var b = a.compare_at_price_min > a.price_min,
            c = this.formatMoney(100 * a.price_min),
            couture = a.price_min > 0,
            d = this.formatMoney(100 * a.compare_at_price_min);
        this.getSettingValue("search.removePriceDecimal") && ((c = this.removeDecimal(c)), (d = this.removeDecimal(d)));
        var e = "";
        return (
            this.getSettingValue("search.showSuggestionProductPrice") &&
                ((e += '<div class="' + this.class.searchSuggestion + '-product-price">'),
                b && this.getSettingValue("search.showSuggestionProductSalePrice")
                    ? ((e += "<s>" + d + "</s>  "), (e += '<span class="bc-sf-product-sale-price">' + c + "</span>"))
                    : couture && (e += '<span class="bc-sf-product-regular-price">' + c + "</span>"),
                (e += "</div>")),
            e
        );
    }),
    (BCSfFilter.prototype.prepareSuggestionProductPriceData = function (a) {
        if (void 0 !== bcSfFilterConfig.general.currencies && bcSfFilterConfig.general.currencies.length > 1) {
            var b = (bcSfFilterConfig.general.current_currency.toLowerCase().trim(), a.variants[0]),
                c = !0;
            b.hasOwnProperty("fulfillment_service") && "gift_card" == b.fulfillment_service && (c = !1),
                (a.price_min = this.convertPriceBasedOnActiveCurrency(a.price_min, c)),
                (a.price_max = this.convertPriceBasedOnActiveCurrency(a.price_max, c)),
                (a.compare_at_price_min = this.convertPriceBasedOnActiveCurrency(a.compare_at_price_min, c)),
                (a.compare_at_price_max = this.convertPriceBasedOnActiveCurrency(a.compare_at_price_max, c));
        }
    }),
    (BCSfFilter.prototype.buildSuggestionPage = function (a, b, c, d, e) {
        var f = "";
        if (Object.keys(b).length > 0) {
            var g,
                f = this.buildSuggestionHeader(d.label, "page"),
                h = b.length,
                i = "";
            for (
                bcSfFilterMainConfig.general.current_locale &&
                    !bcSfFilterMainConfig.general.published_locales[bcSfFilterMainConfig.general.current_locale.toLowerCase()] &&
                    (i = "/" + bcSfFilterMainConfig.general.current_locale.toLowerCase()),
                    g = 0;
                g < h;
                g++
            ) {
                var j = this.highlightSuggestionResult(b[g].title, a);
                (f +=
                    '<li class="' +
                    this.class.searchSuggestionItem +
                    '" data-label="' +
                    this.escape(d.label) +
                    ": " +
                    this.escape(b[g].title) +
                    '" data-value="' +
                    this.escape(b[g].title) +
                    '" aria-label="' +
                    this.escape(d.label) +
                    ": " +
                    this.escape(b[g].title) +
                    '">'),
                    (f += '<a href="' + i + b[g].url + '">' + j + "</a>"),
                    (f += "</li>");
            }
        }
        return f;
    }),
    (BCSfFilter.prototype.buildSuggestionCollection = function (a, b, c, d, e) {
        var f = "";
        if (Object.keys(b).length > 0) {
            var g,
                f = bcsffilter.buildSuggestionHeader(d.label, "collection"),
                h = b.length,
                i = "";
            for (
                bcSfFilterMainConfig.general.current_locale &&
                    !bcSfFilterMainConfig.general.published_locales[bcSfFilterMainConfig.general.current_locale.toLowerCase()] &&
                    (i = "/" + bcSfFilterMainConfig.general.current_locale.toLowerCase()),
                    g = 0;
                g < h;
                g++
            ) {
                var j = bcsffilter.highlightSuggestionResult(b[g].title, a);
                (f +=
                    '<li class="' +
                    bcsffilter.class.searchSuggestionItem +
                    '" data-label="' +
                    this.escape(b[g].id) +
                    '" data-value="' +
                    this.escape(b[g].title) +
                    '" aria-label="' +
                    this.escape(d.label) +
                    ": " +
                    this.escape(b[g].title) +
                    '">'),
                    (f += '<a href="' + i + "/collections/" + b[g].handle + '">' + j + "</a>"),
                    (f += "</li>");
            }
        }
        return f;
    }),
    (BCSfFilter.prototype.buildSuggestionDidYouMean = function (a, b, c) {
        var d = "";
        if (void 0 !== b && Object.keys(b).length > 0) {
            var e = getValueInObjectArray("suggest_query", b),
                f = getValueInObjectArray("total_product", b),
                g = getValueInObjectArray("prev_total_product", b);
            "" !== g && f > 0 && (f = g);
            var h = getValueInObjectArray("did_you_mean", b),
                i = "";
            if ("" != h && h.length > 0) {
                var j,
                    k = h.length;
                for (j = 0; j < k; j++) (i += '<a href="' + this.buildSearchLink(h[j]) + '">' + h[j] + "</a>"), j < h.length - 1 && (i += "<span>,</span> ");
            }
            e != a &&
                (0 == f && (d += "<p>" + this.getSettingValue("label.error.noSuggestionProducts").replace(/{{ terms }}/g, "<strong>" + a + "</strong>") + "</p>"),
                "" != e && (d += "<p>" + this.getSettingValue("label.suggestion.suggestQuery").replace(/{{ terms }}/g, '<a href="' + this.buildSearchLink(e) + '">' + e + "</a>") + "</p>"),
                "" != i && (d += "<p>" + this.getSettingValue("label.suggestion.didYouMean").replace(/{{ terms }}/g, i) + "</p>"));
        }
        return d;
    }),
    (BCSfFilter.prototype.buildSuggestionViewAll = function (a, b, c) {
        var d = this.class.searchSuggestionHeader,
            e = "",
            f = getValueInObjectArray("total_product", b),
            g = getValueInObjectArray("suggest_total_product", b);
        return (
            "" !== g && (f = g),
            f > getValueInObjectArray("products", this.getSettingValue("search.suggestionBlocks"), "type", "number") &&
                f > 0 &&
                ((e += '<li class="' + d + "-view-all " + d + '" aria-label="View All">'),
                (e += '<a href="' + this.buildSearchLink(a) + '">' + this.getSettingValue("label.suggestion.viewAll").replace(/{{ count }}/g, f) + "</a>"),
                (e += "</li>")),
            e
        );
    }),
    (BCSfFilter.prototype.buildSuggestionHeader = function (a, b) {
        var c = this.class.searchSuggestionHeader;
        return '<li class="' + c + "-" + b + " " + c + '" aria-label="' + this.escape(a) + '">' + a + "</li>";
    }),
    (BCSfFilter.prototype.highlightSuggestionResult = function (a, b) {
        function c(a) {
            return new RegExp(a.replace(/([\(\)\{\}\[\]\.\+\-\=\\\/])/g, "\\$&"), "ig");
        }
        if (this.getSettingValue("search.highlightSuggestionResult") && b.length > 1) {
            var d,
                e = b.split(" "),
                f = e.length;
            for (d = 0; d < f; d++) {
                var g = c(e[d]),
                    h = a.match(g);
                if (null !== h && h.length > 0) {
                    h = h.filter(function (a, b) {
                        return h.indexOf(a) == b && "" != a;
                    });
                    var i,
                        j = h.length;
                    for (i = 0; i < j; i++)
                        if (h[i].length > 1) {
                            var g = c(h[i]);
                            a = a.replace(g, "<b>" + h[i] + "</b>");
                        }
                }
            }
        }
        return a;
    }),
    (BCSfFilter.prototype.buildSuggestionNoResult = function (a, b, c) {
        var d = this.getSettingValue("label.error.noSuggestionResult").replace(/{{ terms }}/g, a),
            e = '<li class="bc-sf-search-suggestion-no-result ' + this.class.searchSuggestionItem + '" data-label="No Results: ' + a + '" data-value="' + a + '" aria-label="No Results">';
        return (e += "<span>" + d + "</span>"), (e += "</li>");
    }),
    (BCSfFilter.prototype.buildSuggestionStyle = function () {
        jQ("." + this.class.searchSuggestionHeader).css({
            "font-size": this.getSettingValue("search.fontSizeSuggestionHeader"),
            background: this.getSettingValue("search.bgSuggestionHeader"),
            color: this.getSettingValue("search.colorSuggestionHeader"),
        });
    }),
    (BCSfFilter.prototype.buildSearchLink = function (a) {
        var b = "";
        return (
            bcSfFilterMainConfig.general.current_locale && !bcSfFilterMainConfig.general.published_locales[bcSfFilterMainConfig.general.current_locale.toLowerCase()] && (b = "/" + bcSfFilterMainConfig.general.current_locale.toLowerCase()),
            b + "/search?" + this.searchTermKey + "=" + encodeURIParamValue(a)
        );
    }),
    (BCSfFilter.prototype.initSearchBox = function (a) {
        if (this.getSettingValue("search.enableSuggestion")) {
            var b = this;
            void 0 === a
                ? jQ('input[name="' + this.searchTermKey + '"]').each(function (a) {
                      if (!jQ(this)[0].hasAttribute("data-no-bc-search")) {
                          var c = "bc-sf-search-box-" + a;
                          jQ(this).attr({ id: c, "aria-live": "polite", placeholder: b.getSettingValue("label.suggestion.searchBoxPlaceholder") }), b.buildSearchBox("#" + c);
                      }
                  })
                : this.buildSearchBox(a),
                this.isMobile() &&
                    ((window.onpageshow = function (a) {
                        a.persisted && window.location.reload();
                    }),
                    "style1" == this.getSettingValue("search.suggestionMobileStyle") && this.buildSuggestionMobile());
        }
    }),
    (BCSfFilter.prototype.beforeBuildSearchBox = function (a) {
        this.checkIsFullWidthSuggestionMobile(a) && (jQ(a).removeAttr("autofocus"), jQ(a).is(":focus") && jQ(a).blur());
    }),
    (BCSfFilter.prototype.buildSearchBox = function (a) {
        this.beforeBuildSearchBox(a);
        var b = this;
        if (jQ(a).length > 0) {
            var c;
            c = b.isSuggestionStyle2() ? b.getSettingValue("search.suggestionStyle2MainContainerSelector") || "header:first" : "body";
            var d = (this.currentTerm = getParam(this.searchTermKey));
            jQ(a).val(d),
                jQ(a)
                    .autocomplete({
                        appendTo: c,
                        minLength: b.getSettingValue("search.suggestionMinLength"),
                        delay: 200,
                        source: function (c, d) {
                            (window.suggestionCallback = d), (b.currentTerm = c.term);
                            var e = c.term.trim().replace(/\s+/g, " ");
                            "" != e && b.requestSuggestion(e, a);
                        },
                        classes: { "ui-autocomplete": b.class.searchSuggestion },
                        response: function (c, d) {
                            var e = d.content,
                                f = getValueInObjectArray("query", e),
                                g = getValueInObjectArray("event_type", e),
                                h = getValueInObjectArray("suggest_query", e),
                                i = getValueInObjectArray("local_cache", e),
                                j = getValueInObjectArray("redirect", e);
                            25 == Object.keys(b.suggestionCache).length && (b.suggestionCache = {}),
                                f in b.suggestionCache || "suggest_dym" == g || (b.suggestionCache[f] = e),
                                "" == h || "suggest" != g || i || b.getSuggestionData(h, 0, "suggest_dym", f),
                                b.checkForSearchRedirect(a, j),
                                b.hideSuggestionLoading(a);
                        },
                        focus: function (c, d) {
                            return b.focusSuggestionEvent(a, c, d);
                        },
                        open: function (c, d) {
                            b.openSuggestionEvent(a, c);
                        },
                        close: function (c, d) {
                            b.closeSuggestionEvent(a, c);
                        },
                        select: function (c, d) {
                            return b.selectSuggestionEvent(a, c);
                        },
                    })
                    .addClass(b.class.searchBox)
                    .attr("data-search-box", a),
                (jQ(a).autocomplete("instance")._renderMenu = function (c, d) {
                    return c.attr("data-search-box", a), b.buildSuggestion(this.term, d, c, a);
                }),
                (jQ(a).autocomplete("instance")._resizeMenu = function () {
                    var c = this.menu.element,
                        d = this.element;
                    b.buildStyleSuggestion(c, d, a);
                }),
                b.customSearchMenuWidget(a),
                b.clickOutsideSuggestionEvent(a);
        }
        this.setSuggestionPosition(a), this.buildSearchBoxEvent(a), this.afterBuildSearchBox(a);
    }),
    (BCSfFilter.prototype.buildSearchBoxEvent = function (a) {
        var b = this;
        if (
            jQ(a).length > 0 &&
            (jQ(a)
                .on("click", function (c) {
                    b.clickSearchBoxEvent(a, c);
                })
                .on("focus", function (c) {
                    b.focusSearchBoxEvent(a, c);
                })
                .on("keyup", function (c) {
                    b.typeSearchBoxEvent(a, c);
                })
                .on("keydown", function (c) {
                    13 == c.keyCode && b.enterSearchBoxEvent(a, c);
                }),
            jQ(a).closest("form").length > 0)
        ) {
            var c = jQ(a).closest("form").find('[type="submit"]');
            c &&
                c.length > 0 &&
                c.each(function (b, c) {
                    c.setAttribute("onclick", "beforeSubmitSearchForm('" + a + "', event)");
                });
        }
    }),
    (BCSfFilter.prototype.afterBuildSearchBox = function (a) {}),
    (BCSfFilter.prototype.requestSuggestion = function (a, b) {
        var c = this;
        !(function (a) {
            var d = getSuggestionInstance(b);
            if ((c.showSuggestionLoading(d, b), a in c.suggestionCache)) return void suggestionCallback(c.suggestionCache[a]);
            c.getSuggestionData(a, 0, "suggest");
        })(a);
    }),
    (BCSfFilter.prototype.buildSuggestionMobile = function () {
        var a = this.selector.searchBoxMobile;
        if (0 == jQ(a).length) {
            var b = '<button type="button" class="bc-sf-search-btn-close-suggestion" onclick="closeSuggestionMobile(\'' + a + "', true);\"><-</button>",
                c = this.getSettingValue("search.showSearchBtnMobile") ? '<a href="javascript:;" class="bc-sf-search-submit-mobile" onclick="submitSearchFormMobile(this, event)"><span>Submit</span></a>' : "",
                d = '<button type="button" class="bc-sf-search-btn-clear-suggestion" onclick="clearSuggestionMobile(\'' + a + "');\">X</button>";
            jQ("body").append(
                '<div class="bc-sf-search-suggestion-mobile-overlay"></div><div class="bc-sf-search-suggestion-mobile-top-panel"><form action="/search" method="get">' +
                    b +
                    c +
                    '<input type="text" name="' +
                    this.searchTermKey +
                    '" placeholder="' +
                    this.getSettingValue("label.suggestion.searchBoxPlaceholder") +
                    '" id="' +
                    a.substr(1) +
                    '" />' +
                    d +
                    "</form></div>"
            ),
                this.buildSearchBox(a);
        }
    }),
    (BCSfFilter.prototype.beforeOpenSuggestionMobile = function (a) {}),
    (BCSfFilter.prototype.openSuggestionMobile = function (a) {
        var b = this;
        this.beforeOpenSuggestionMobile(a), jQ("body").hasClass(b.getClass("searchSuggestionMobileOpen")) || jQ("body").addClass(b.getClass("searchSuggestionMobileOpen")), this.showSearchBoxMobile(a);
        var c = this.selector.searchBoxMobile;
        jQ(c).autocomplete("search"),
            jQ("." + this.class.searchSuggestion + '[data-search-box="' + c + '"]')
                .parent()
                .show(),
            jQ("html,body").scrollTop(),
            this.afterOpenSuggestionMobile();
    }),
    (BCSfFilter.prototype.afterOpenSuggestionMobile = function () {}),
    (BCSfFilter.prototype.showSearchBoxMobile = function (a) {
        this.clickOutsideSuggestionMobileEvent(), this.scrollSuggestionMobileEvent(), "" == jQ(a).val() ? hideClearSuggestionBtn() : showClearSuggestionBtn();
        var b = this.selector.searchBoxMobile;
        jQ(b).is(":focus") ||
            (jQ(".bc-sf-search-suggestion-mobile-top-panel,.bc-sf-search-suggestion-mobile-overlay").show(),
            jQ("[tabindex=-1]").removeAttr("tabindex").addClass("bc-sf-search-no-tabindex"),
            setTimeout(function () {
                jQ(b).focus();
            }, 100),
            this.afterShowSearchBoxMobile());
    }),
    (BCSfFilter.prototype.afterShowSearchBoxMobile = function (a) {}),
    (BCSfFilter.prototype.clickOutsideSuggestionMobileEvent = function () {
        var a = this;
        jQ(document).on("touchstart", function (b) {
            var c = jQ(".bc-sf-search-suggestion-mobile-top-panel"),
                d = jQ(".bc-sf-search-suggestion-wrapper");
            (0 != d.length && "none" != d.css("display")) || !c.is(b.target) || closeSuggestionMobile(a.selector.searchBoxMobile, !0);
        });
    }),
    (BCSfFilter.prototype.afterCloseSuggestionMobile = function (a, b) {}),
    (BCSfFilter.prototype.clickSearchBoxEvent = function (a, b) {
        "" != jQ(a).val() && (this.checkIsFullWidthSuggestionMobile(a) ? (jQ(this.selector.searchBoxMobile).val(jQ(a).val()), this.openSuggestionMobile(a)) : jQ(a).data("ui-autocomplete") && jQ(a).autocomplete("search", jQ(a).val()));
    }),
    (BCSfFilter.prototype.focusSearchBoxEvent = function (a, b) {
        this.checkIsFullWidthSuggestionMobile(a) && a != this.selector.searchBoxMobile && (this.showSearchBoxMobile(a), this.clickSearchBoxEvent(a, b));
    }),
    (BCSfFilter.prototype.typeSearchBoxEvent = function (a, b) {
        (this.currentTerm = b.target.value),
            this.checkIsFullWidthSuggestionMobile(a) &&
                (jQ("." + this.class.searchSuggestion + '[data-search-box="' + a + '"]')
                    .parent()
                    .show(),
                "" == b.target.value ? (closeSuggestionMobile(a), hideClearSuggestionBtn()) : showClearSuggestionBtn());
    }),
    (BCSfFilter.prototype.enterSearchBoxEvent = function (a, b) {
        var c = jQ(a).val();
        !c && b && b.target && (c = b.target.value);
        var d = this.getSearchRedirectUrl(c);
        this.submitSearch(c, a, d, b);
    }),
    (BCSfFilter.prototype.checkForSearchRedirect = function (a, b) {
        jQ(a).data("search-submit") &&
            (jQ(a).removeData("search-submit"),
            b ? ((b = b.replace("https://" + bcSfFilterMainConfig.shop.domain, "")), (b = b.replace("http://" + bcSfFilterMainConfig.shop.domain, "")), (window.location.href = b)) : jQ(a).closest("form").submit());
    }),
    (BCSfFilter.prototype.getSearchRedirectUrl = function (a) {
        var b = "";
        if (a && ("string" != typeof a && (a = a.toString()), (a = a.trim().toLowerCase()), this.suggestionCache.hasOwnProperty(a)))
            for (var c = this.suggestionCache[a], d = 0; d < c.length; d++)
                "redirect" == c[d].key && c[d].values && ((b = c[d].values), (b = b.replace("https://" + bcSfFilterMainConfig.shop.domain, "")), (b = b.replace("http://" + bcSfFilterMainConfig.shop.domain, "")));
        return b;
    }),
    (BCSfFilter.prototype.submitSearch = function (a, b, c, d) {
        var e = this;
        d.stopImmediatePropagation(),
            d.stopPropagation(),
            d.preventDefault(),
            e.suggestionCache.hasOwnProperty(a.toString().trim())
                ? c
                    ? (window.location.href = c)
                    : jQ(b).closest("form").submit()
                : jQ(b)
                      .closest('input[name="' + e.searchTermKey + '"]')
                      .data("search-submit", !0);
    }),
    (BCSfFilter.prototype.focusSuggestionEvent = function (a, b, c) {
        var d = jQ(a).autocomplete("instance"),
            e = d.widget();
        return e.find("." + this.class.searchSuggestionItem).removeClass("selected"), !(!c.item || void 0 === c.item.label) && (e.find("." + this.class.searchSuggestionItem + '[data-label="' + c.item.label + '"]').addClass("selected"), !0);
    }),
    (BCSfFilter.prototype.selectSuggestionEvent = function (a, b) {
        var c = jQ(a).autocomplete("instance"),
            d = c.widget(),
            e = d.find("." + this.class.searchSuggestionItem + ".selected");
        if (e.length) {
            var f = e.find("> a");
            f.length && (window.location.href = f.eq(0).attr("href"));
        }
        return !1;
    }),
    (BCSfFilter.prototype.openSuggestionEvent = function (a, b) {
        var c = this;
        c.isiOS() &&
            jQ("." + this.class.searchSuggestionItem + " a")
                .on("touchstart", function () {
                    isScrolling = !1;
                })
                .on("touchmove", function (a) {
                    isScrolling = !0;
                })
                .on("touchend", function (a) {
                    isScrolling || (window.location = jQ(this).attr("href"));
                });
        var d = jQ("body");
        c.checkIsFullWidthSuggestionMobile(a) && !d.hasClass(c.getClass("searchSuggestionMobileOpen")) && d.addClass(c.getClass("searchSuggestionMobileOpen"));
    }),
    (BCSfFilter.prototype.closeSuggestionEvent = function (a) {
        "test" == this.getSettingValue("search.suggestionMode") || this.checkIsFullWidthSuggestionMobile(a)
            ? jQ("." + this.class.searchSuggestion).show()
            : jQ("." + this.class.searchSuggestion + '[data-search-box="' + a + '"]')
                  .siblings()
                  .hide();
    }),
    (BCSfFilter.prototype.customSearchMenuWidget = function (a) {
        var b = this,
            c = jQ(a).autocomplete("instance").menu,
            d = "." + b.class.searchSuggestionItem + ".bc-ui-item";
        c._setOption("items", d),
            c._setOption("blur", function (a, b) {
                b.item && jQ(b.item).removeClass("selected");
            }),
            (c.isFirstItem = function () {
                if (this.active) {
                    return !this.element.find(d).index(this.active);
                }
                return !1;
            }),
            (c.isLastItem = function () {
                if (this.active) {
                    var a = this.element.find(d),
                        b = a.index(this.active) + 1;
                    return !(a.length - b);
                }
                return !1;
            }),
            (c._move = function (a, b, c) {
                var e,
                    f = this.element.find(d);
                if (this.active)
                    if ("first" === a || "last" === a);
                    else {
                        var g = 0;
                        (g = "next" == a ? f.index(this.active) + 1 : f.index(this.active) - 1), (e = f.eq(g));
                    }
                (e && e.length && this.active) || (e = this.element.find(this.options.items)[b]()), this.focus(c, e);
            });
    }),
    (BCSfFilter.prototype.checkIsFullWidthSuggestionMobile = function (a) {
        return !(!this.isMobile() || "style1" != this.getSettingValue("search.suggestionMobileStyle"));
    }),
    (BCSfFilter.prototype.clickOutsideSuggestionEvent = function (a) {
        if (!this.checkIsFullWidthSuggestionMobile(a)) {
            var b = this;
            jQ(document).bind("click", function (c) {
                jQ(a).data("ui-autocomplete") &&
                    void 0 !== jQ(a).autocomplete("instance") &&
                    (jQ(c.target)
                        .parents()
                        .addBack()
                        .is("." + b.class.searchSuggestion) ||
                        jQ(c.target)
                            .parents()
                            .addBack()
                            .is("." + b.class.searchBox) ||
                        jQ(a).autocomplete("close"));
            });
        }
    }),
    (BCSfFilter.prototype.scrollSuggestionMobileEvent = function (a) {
        var b = this,
            c = jQ(b.getSelector("searchBoxMobile"));
        jQ(document).on("touchmove", function (a) {
            c.is(":focus") && c.blur();
        });
    }),
    (BCSfFilter.prototype.buildStyleSuggestion = function (a, b, c) {
        var d = this.getSuggestionWidth(c);
        this.setSuggestionWidth(c, d), this.customizeSuggestionStyle(a, b, c), this.customizeSuggestion(a, b, c);
    }),
    (BCSfFilter.prototype.customizeSuggestionStyle = function (a, b, c) {
        var d = this;
        if (d.isSuggestionStyle2()) {
            var e = function (a) {
                var b = 0;
                return (
                    a.each(function (a, c) {
                        b += jQ(c).outerHeight(!0);
                    }),
                    b
                );
            };
            if (jQ("." + d.class.searchSuggestionWrapper).length > 0) {
                var f = 20;
                if (jQ(a).find('.bc-sf-search-suggestion-group[data-group="products"]').length > 0) {
                    var g = jQ(a).find('.bc-sf-search-suggestion-group[data-group="products"]');
                    if (
                        jQ(a)
                            .find('.bc-sf-search-suggestion-group[data-group="pages"]')
                            .find("." + d.class.searchSuggestionItem).length > 0
                    ) {
                        f += e(
                            jQ(a)
                                .find('.bc-sf-search-suggestion-group[data-group="pages"]')
                                .find("." + d.class.searchSuggestionItem)
                        );
                    }
                    if (
                        jQ(a)
                            .find('.bc-sf-search-suggestion-group[data-group="collections"]')
                            .find("." + d.class.searchSuggestionItem).length > 0
                    ) {
                        f += e(
                            jQ(a)
                                .find('.bc-sf-search-suggestion-group[data-group="collections"]')
                                .find("." + d.class.searchSuggestionItem)
                        );
                    }
                    if (
                        jQ(a)
                            .find('.bc-sf-search-suggestion-group[data-group="suggestions"]')
                            .find("." + d.class.searchSuggestionItem).length > 0
                    ) {
                        f += e(
                            jQ(a)
                                .find('.bc-sf-search-suggestion-group[data-group="suggestions"]')
                                .find("." + d.class.searchSuggestionItem)
                        );
                    }
                    g.css("min-height", f + "px");
                }
            }
        }
    }),
    (BCSfFilter.prototype.isSuggestionStyle2 = function () {
        var a = this;
        return void 0 !== a.getSettingValue("search.suggestionStyle") && "style2" == a.getSettingValue("search.suggestionStyle") && !a.isMobile();
    }),
    (BCSfFilter.prototype.getSuggestionWidth = function (a) {
        if ("auto" == this.getSettingValue("search.suggestionWidth") || this.isMobile()) var b = jQ(a).outerWidth();
        else var b = this.getSettingValue("search.suggestionWidth");
        return b;
    }),
    (BCSfFilter.prototype.setSuggestionPosition = function (a) {
        var b = this,
            c = getSuggestionPosition(a),
            d = this.checkIsFullWidthSuggestionMobile(a) ? "top" : "top+12";
        b.isSuggestionStyle2() ||
            ("left" == c ? jQ(a).autocomplete("option", "position", { my: "left " + d, at: "left bottom", collision: "none" }) : jQ(a).autocomplete("option", "position", { my: "right " + d, at: "right bottom", collision: "none" }));
    }),
    (BCSfFilter.prototype.setSuggestionWidth = function (a, b) {
        jQ("ul." + this.class.searchSuggestion + '[data-search-box="' + a + '"]').outerWidth(b);
    }),
    (BCSfFilter.prototype.customizeSuggestion = function (a, b, c) {}),
    (BCSfFilter.prototype.prepareSuggestionParams = function (a, b) {
        var c = {};
        (c.shop = this.shopDomain), (c.t = new Date().getTime()), this.getSettingValue("search.enableDefaultResult") || (c.enable_default_result = !1);
        var d = this.getSettingValue("search.enableFuzzy");
        !0 !== d && (c.fuzzy = d),
            this.getSettingValue("search.fullMinMatch") && (c.full_min_match = !0),
            !1 !== this.getSettingValue("search.reduceMinMatch") && (c.reduce_min_match = this.getSettingValue("search.reduceMinMatch")),
            this.getSettingValue("search.enablePlusCharacterSearch") && (c.enable_plus_character_search = !0),
            1 == this.getSettingValue("search.productAvailable") && (c.product_available = !0);
        var e,
            f = this.getSettingValue("search.suggestionBlocks"),
            g = f.length;
        for (e = 0; e < g; e++) {
            c[f[e].type.slice(0, -1) + "_limit"] = f[e].number;
        }
        c.dym_limit = this.getSettingValue("search.suggestionDymLimit");
        var h = this.getSettingValue("search.skipFields");
        h.length > 0 && (param.skipFields = h), (c.callback = "BCSfSuggestionCallback"), (c.event_type = b);
        var i = "suggest_dym" == b ? ["products"] : this.getSettingValue("search.suggestionTypes");
        return (c.suggest_types = i), (c = this.setThirdPartyAppParams(c));
    }),
    (BCSfFilter.prototype.beforeGetSuggestionData = function (a) {}),
    (BCSfFilter.prototype.getSuggestionData = function (a, b, c, d) {
        var b = void 0 !== b ? b : 0,
            d = void 0 !== d ? d : "",
            e = this;
        this.beforeGetSuggestionData(c), (a = this.customizeSearchTerm(a));
        var f = this.prepareSuggestionParams(a, c);
        "" != d && (f.prev_query = d);
        var g = document.createElement("script");
        (g.type = "text/javascript"),
            (g.src = this.getApiUrl("suggestion") + "?q=" + a + "&" + jQ.param(f)),
            (g.async = !0),
            g.addEventListener("error", function (f) {
                this.remove(), b < 3 && (b++, e.getSuggestionData(a, b, c, d));
            }),
            document.getElementsByTagName("head")[0].appendChild(g),
            (g.onload = function () {
                this.remove();
            });
    }),
    (BCSfFilter.prototype.customizeSearchTerm = function (a) {
        return encodeURIParamValue(a.trim());
    }),
    (BCSfFilter.prototype.showSuggestionLoading = function (a, b) {
        var c = this;
        if (this.getSettingValue("search.showSuggestionLoading")) {
            jQ(a).children().hide();
            var d = this.class.searchSuggestionLoading;
            if (0 == jQ("." + d).length) {
                this.buildSuggestionWrapper(a, b);
                var e = d + "-img",
                    f = '<li class="' + d + '"><ul><li><div class="' + e + '"></div></li><li><div class="' + e + '"></div></li><li><div class="' + e + '"></div></li></ul></li>';
                if ((jQ(a).prepend(f), jQ(a).show(), !c.isSuggestionStyle2())) {
                    var g = this.getSuggestionWidth(b);
                    jQ(a).outerWidth(g);
                    var h = getSuggestionPosition(b),
                        i = this.checkIsFullWidthSuggestionMobile(b) ? "top" : "top+12";
                    "left" == h ? jQ(a).position({ my: "left " + i, at: "left bottom", of: jQ(b)[0] }) : jQ(a).position({ my: "right " + i, at: "right bottom", of: jQ(b)[0] });
                }
            }
            jQ("." + d).show();
        }
    });
(BCSfFilter.prototype.hideSuggestionLoading = function (a) {
    this.getSettingValue("search.showSuggestionLoading") && jQ("." + this.class.searchSuggestionLoading).hide();
}),
    (BCSfFilter.prototype.prepareProductData = function (a) {
        return a;
    }),
    (BCSfFilter.prototype.buildProductList = function (a, b) {
        (0 == this.loadProductFirst ||
            this.isSearchPage() ||
            this.isVendorPage() ||
            this.isTagPage() ||
            this.isTypePage() ||
            "best-selling" == this.defaultSorting ||
            1 == this.getSettingValue("general.productAndVariantAvailable") ||
            (1 == this.loadProductFirst && ("init" != b || window.location.search.length > 0)) ||
            1 == this.getSettingValue("general.sortingAvailableFirst")) &&
            ((a = this.prepareProductData(a)), this.getSettingValue("general.loadProductFromLiquid") ? this.buildProductListDataFromLiquid(a, b) : (this.buildProductListData(a, b), this.buildExtrasProductList(a, b)));
    }),
    (BCSfFilter.prototype.buildProductListData = function (a, b) {
        (this.isDefaultPaginationType() || (!this.isDefaultPaginationType() && "page" != b)) && (jQ(this.getSelector("products")).html(""), jQ(window).unbind("scroll"));
        for (var c = "", d = a.length, e = 0; e < d; e++) {
            switch (this.queryParams.display) {
                case "list":
                    var f = this.buildProductListItem(a[e], e + 1, d);
                    break;
                case "collage":
                    var f = this.buildProductCollageItem(a[e], e + 1, d);
                    break;
                default:
                    var f = this.buildProductGridItem(a[e], e + 1, d);
            }
            c += this.buildProductItemAdvanced(a[e], f);
        }
        this.buildProductListDataHtml(c);
    }),
    (BCSfFilter.prototype.buildProductListDataHtml = function (a) {
        var b = this;
        b.isLoadPreviousPagePaginationType() && 1 == sessionStorage.getItem(b.getSettingValue("general.sessionStoragePreviousPageEvent")) ? jQ(this.getSelector("products")).prepend(a) : jQ(this.getSelector("products")).append(a);
    }),
    (BCSfFilter.prototype.buildProductListDataFromLiquid = function (a, b) {
        (this.isDefaultPaginationType() || (!this.isDefaultPaginationType() && "page" != b)) && jQ(window).unbind("scroll"),
            "sync" == this.getSettingValue("general.loadProductFromLiquidType") ? this.getProductHtmlBySync(a, b) : this.getProductHtmlByAjax(a, b);
    }),
    (BCSfFilter.prototype.getProductHtmlByAjax = function (a, b, c) {
        var d = this;
        c || (c = 0);
        for (var e = 20 * c, f = Math.min(a.length, 20 * (c + 1)), g = [], h = e; h < f; h++) g.push(a[h].handle);
        var i = g.join("+");
        jQ.ajax({
            type: "GET",
            url: "/collections/all/" + i + "?view=bc-sf-product-item",
            success: function (e) {
                d.afterGetProductHtmlByAjax(a, b, c, e);
            },
        });
    }),
    (BCSfFilter.prototype.afterGetProductHtmlByAjax = function (a, b, c, d) {
        var e = [];
        try {
            e = JSON.parse(d).products;
        } catch (a) {
            return void console.log("Could not parse json from collection.bc-sf-product-item.liquid");
        }
        for (var f = 0; f < e.length; f++) for (var g = 0; g < a.length; g++) a[g].id == e[f].id && (a[g].html = e[f].html.value);
        for (var h = "", i = a.length, j = 20 * c, f = j; f < j + e.length; f++) {
            switch (this.queryParams.display) {
                case "list":
                    var k = this.buildProductListItem(a[f], f + 1, i);
                    break;
                case "collage":
                    var k = this.buildProductCollageItem(a[f], f + 1, i);
                    break;
                default:
                    var k = this.buildProductGridItem(a[f], f + 1, i);
            }
            h += this.buildProductItemAdvanced(a[f], k);
        }
        0 == c && (this.removePlaceholderForProductList(), (this.isDefaultPaginationType() || (!this.isDefaultPaginationType() && "page" != b)) && jQ(this.getSelector("products")).html(""));
        var l = this.isLoadPreviousPagePaginationType() && 1 == sessionStorage.getItem(this.getSettingValue("general.sessionStoragePreviousPageEvent"));
        0 == c && l ? jQ(this.getSelector("products")).prepend(h) : jQ(this.getSelector("products")).append(h), j < a.length - 1 ? (c++, this.getProductHtmlByAjax(a, b, c)) : this.buildExtrasProductList(a, b);
    }),
    (BCSfFilter.prototype.getProductHtmlBySync = function (a, b) {
        for (var c = "", d = a.length, e = 0; e < d; e++) {
            if (!(a[e].html && a[e].html.value && a[e].html.theme_id && bcSfFilterMainConfig.general.theme_id && bcSfFilterMainConfig.general.theme_id == a[e].html.theme_id)) {
                console.log("Error getting product by metafield, fallback to get by ajax"), this.getProductHtmlByAjax(a, b);
                break;
            }
            switch (((a[e].html = a[e].html.value), this.queryParams.display)) {
                case "list":
                    var f = this.buildProductListItem(a[e], e + 1, d);
                    break;
                case "collage":
                    var f = this.buildProductCollageItem(a[e], e + 1, d);
                    break;
                default:
                    var f = this.buildProductGridItem(a[e], e + 1, d);
            }
            c += this.buildProductItemAdvanced(a[e], f);
        }
        this.buildProductListDataHtml(c), this.buildExtrasProductList(a, b);
    }),
    (BCSfFilter.prototype.buildExtrasProductList = function (a, b) {}),
    (BCSfFilter.prototype.buildExtrasProductListByAjax = function (a, b, c, d, e, f) {
        var g = this;
        f || (f = 0), (!d || d > 20) && (d = 20);
        for (var h = d * f, i = Math.min(a.length, d * (f + 1)), j = [], k = h; k < i; k++) j.push(a[k].handle);
        var l = j.join("+");
        e || (e = []);
        var m;
        (m = bcSfFilterConfig.general.published_locales[bcSfFilterConfig.general.current_locale] ? "/collections/all/" + l + "?view=" + b : "/" + bcSfFilterConfig.general.current_locale + "/collections/all/" + l + "?view=" + b),
            jQ.ajax({
                type: "GET",
                url: m,
                success: function (i) {
                    try {
                        void 0 === Shopify.PaymentButton && /<\!--.*?-->/.test(i) && (i = i.replace(/<\!--.*?-->/g, "")), (e = e.concat(JSON.parse(i).products));
                    } catch (a) {
                        return void console.log("Could not parse json from " + m + ": " + a.message);
                    }
                    h < a.length - 1 ? (f++, g.buildExtrasProductListByAjax(a, b, c, d, e, f)) : "function" == typeof c && c(e);
                },
            });
    }),
    (BCSfFilter.prototype.scrollBackPositionHistoryBack = function () {
        if (this.getSettingValue("general.enableKeepScrollbackPosition")) {
            var a = jQ(this.selector.products).children();
            if (this.isAdvancedPaginationType() && a.length > 0) {
                var b = parseInt(this.queryParams.page);
                if (
                    (a.each(function () {
                        if (void 0 === jQ(this).attr("id")) {
                            var a = "";
                            jQ(this)
                                .find("a")
                                .each(function () {
                                    var b = jQ(this).attr("href") || "";
                                    if (b.length > 0 && b.match(/(?:\/products\/)(?:[^\?]*)/)) return (a = b.split("?")[0]), !1;
                                });
                            var c = a.toString().replace(/^_+|_+$|\//g, "") + "-" + b;
                            jQ(this).attr("id", c);
                        }
                        void 0 === jQ(this).data("page") && jQ(this).attr("data-page", b);
                    }),
                    this.isMobile())
                ) {
                    var c = !1;
                    a.on("touchstart", function () {
                        c = !1;
                    })
                        .on("touchmove", function (a) {
                            c = !0;
                        })
                        .on("touchend", function (a) {
                            var b = jQ(this).attr("id") || !1;
                            if (!c && b) {
                                var d = new URL(window.location.href),
                                    e = jQ(this).data("page") || 1,
                                    f = { productId: b, page: e };
                                null !== d.searchParams.get("page") && d.searchParams.delete("page"), parseInt(e) > 1 && d.searchParams.append("page", e), window.history.replaceState(f, "", d.toString().replace(/\+/g, "%20"));
                            }
                        });
                } else
                    a.click(function (a) {
                        var b = jQ(this).attr("id") || !1;
                        if (b) {
                            var c = new URL(window.location.href),
                                d = jQ(this).data("page") || 1,
                                e = { productId: b, page: d };
                            null !== c.searchParams.get("page") && c.searchParams.delete("page"), parseInt(d) > 1 && c.searchParams.append("page", d), window.history.replaceState(e, "", c.toString().replace(/\+/g, "%20"));
                        }
                    });
                if (("scrollRestoration" in history && (history.scrollRestoration = "manual"), null !== history.state && history.state.hasOwnProperty("productId"))) {
                    var d = new URL(window.location.href),
                        e = history.state.productId;
                    null !== e && (window.history.replaceState("", "", d.toString().replace(/\+/g, "%20")), jQ("html, body").animate({ scrollTop: jQ("#" + e).offset().top }, 0));
                }
            }
        }
    }),
    (BCSfFilter.prototype.buildProductGridItem = function (a, b, c) {
        return "";
    }),
    (BCSfFilter.prototype.buildProductListItem = function (a, b, c) {
        return "";
    }),
    (BCSfFilter.prototype.buildProductCollageItem = function (a, b, c) {
        return "";
    }),
    (BCSfFilter.prototype.buildProductItemUrl = function (a, b) {
        var c = window.location.search.substring(1),
            d = window.location.pathname,
            e = d.split("/"),
            f = "";
        bcSfFilterMainConfig.general.current_locale && (f = bcSfFilterMainConfig.general.current_locale.toLowerCase());
        var g = "object" == typeof a && a.hasOwnProperty("handle") ? a.handle : a,
            b = void 0 === b || b;
        if (b) {
            if ("/" == d || this.isSearchPage() || this.isVendorPage() || this.isTypePage()) {
                var h = e.indexOf(bcSfFilterMainConfig.general.current_locale) > -1 ? "/" + bcSfFilterMainConfig.general.current_locale + "/collections/all/products/" : "/collections/all/products/";
                return h + g;
            }
            if (this.isTagPage()) {
                var h = e.indexOf(bcSfFilterMainConfig.general.current_locale) > -1 ? "/" + bcSfFilterMainConfig.general.current_locale + "/collections/" : "/collections/",
                    i = e.indexOf("collections") + 1;
                return e.length >= 4 ? h + e[i] + "/products/" + g : "/collections/all/products/" + g;
            }
            if (c.indexOf("cache:") > -1) {
                var j = "all",
                    k = c.split("&")[0].split("?")[0].split("collections/");
                return k.length > 1 && (j = k[1].indexOf("/") > -1 ? k[1].split("/")[0] : k[1]), "/collections/" + (j = j.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/g, "")) + "/products/" + g;
            }
            if (e.indexOf(f) > -1) {
                var i = e.indexOf("collections") + 1,
                    h = "/" + f + "/collections/";
                if (void 0 !== e[2]) return h + e[i] + "/products/" + g;
            } else if (void 0 !== e[2]) return "/collections/" + e[2] + "/products/" + g;
            return window.location.pathname + "/products/" + g;
        }
        return e.indexOf(f) > -1 ? "/" + f + "/products/" + g : "/products/" + g;
    }),
    (BCSfFilter.prototype.buildProductItemVendorUrl = function (a) {
        return window.location.protocol + "//" + window.location.hostname + "/collections/vendors?q=" + encodeURIParamValue(a);
    }),
    (BCSfFilter.prototype.buildProductItemAdvanced = function (a, b) {
        return b;
    }),
    (BCSfFilter.prototype.getFeaturedImage = function (a, b) {
        var b = void 0 !== b ? b : "large",
            c = this.optimizeImage(bcSfFilterConfig.general.no_image_url, b);
        return a.length > 0 && (c = "object" == typeof a[0] ? this.optimizeImage(a[0].src, b) : this.optimizeImage(a[0], b)), c;
    }),
    (BCSfFilter.prototype.optimizeImage = function (a, b) {
        null === a && (a = bcSfFilterConfig.general.no_image_url);
        for (var b = void 0 !== b ? b : "large", c = this.getSettingValue("general.imageExtension"), d = 0; d < c.length; d++) a = a.replace("." + c[d] + "?", "_" + b + "." + c[d] + "?");
        return a;
    }),
    (BCSfFilter.prototype.getProductMetafield = function (a, b, c) {
        if (a.hasOwnProperty("metafields")) {
            var d = a.metafields.filter(function (a) {
                return a.namespace == b && a.key == c;
            });
            if (void 0 !== d[0]) return d[0].value;
        }
        return null;
    }),
    (BCSfFilter.prototype.buildPlaceholderProductList = function (a) {
        var b = this.getSettingValue("general.showPlaceholderProductList");
        if (
            void 0 !== b &&
            b &&
            (0 == this.loadProductFirst ||
                this.isSearchPage() ||
                this.isVendorPage() ||
                this.isTagPage() ||
                this.isTypePage() ||
                "best-selling" == this.defaultSorting ||
                1 == this.getSettingValue("general.productAndVariantAvailable") ||
                (1 == this.loadProductFirst && ("init" != a || window.location.search.length > 0)))
        ) {
            if (void 0 === this.queryParams.display || "grid" == this.queryParams.display || "function" != typeof this.buildPlaceholderProductExtra) {
                var c = 140,
                    d = bcSfFilterConfig.custom.product_grid_class || this.getSettingValue("general.placeholderProductGridItemClass"),
                    e = this.getTemplate("skeletonProduct"),
                    f = this.getSettingValue("general.placeholderImageRatio");
                "" == d && (d = jQ(this.selector.products).find("> *").length > 0 ? jQ(this.selector.products).find("> *").first().attr("class") : "bc-sf-filter-skeleton-def-width"),
                    (e = e.replace(/{{wrapClass}}/g, d)),
                    parseInt(f) > 0 && (c = 100 * f),
                    (e = e.replace(/{{paddingTop}}/g, c)),
                    jQ(this.selector.products).addClass("bc-sf-product-loading").css("min-height", jQ(this.selector.products).height()),
                    (this.isDefaultPaginationType() || (!this.isDefaultPaginationType() && "page" != a)) && jQ(this.selector.products).html("");
                var g = parseInt(this.getSettingValue("general.placeholderProductPerRow"));
                g <= 0 && (g = bcSfFilterConfig.custom.products_per_row || 3);
                for (var h = 0; h < g; h++) jQ(this.selector.products).append(e);
            } else this.buildPlaceholderProductExtra(a);
            jQ(this.getSelector("bottomPagination")).hide(), jQ(this.getSelector("loadMore")).hide();
        }
    }),
    (BCSfFilter.prototype.pageOverFallback = function (a) {
        if (a.total_product > 0 && Array.isArray(a.products) && 0 == a.products.length) {
            var b = this.queryParams.limit || !1,
                c = this.queryParams.page || 1,
                d = Math.ceil(a.total_product / b);
            if (b && c > 1 && c > d) {
                this.queryParams.page = d;
                var e = new URL(window.location.href);
                if ((null !== e.searchParams.get("page") && e.searchParams.delete("page"), e.searchParams.append("page", d), "undefined" != typeof History)) return History.replaceState("", "", e.toString().replace(/\+/g, "%20")), !0;
            }
        }
        return !1;
    }),
    (BCSfFilter.prototype.buildFilterOptionLabel = function (a, b, c) {
        (a = this.customizeFilterOptionLabel(a, c.prefix, c.filterType, c.displayAllValuesInUppercaseForm)), (a = a.replace(/\$/g, "&#36;"));
        var d = this.getTemplate("filterOptionLabel").replace(/{{itemValue}}/g, a);
        return this.getSettingValue("general.showFilterOptionCount") &&
            "box" != c.displayType &&
            !0 !== c.keepValuesStatic &&
            null !== b &&
            ((b > 0 && 0 == this.getSettingValue("general.showOutOfStockOption")) || 1 == this.getSettingValue("general.showOutOfStockOption"))
            ? d.replace(/{{itemAmount}}/g, "(" + b + ")")
            : d.replace(/{{itemAmount}}/g, "");
    }),
    (BCSfFilter.prototype.customizeFilterOptionLabel = function (a, b, c, d) {
        return (
            ("price" != c && "variants_price" != c && "percent_sale" != c) || ((a = a.replace(/\*/g, "").replace(/\-/g, ":")), (a = "price" == c || "variants_price" == c ? this.getPriceLabel(a) : this.getPercentSaleLabel(a))),
            void 0 !== b && null !== b && !1 !== b && ((b = b.replace(/\\/g, "")), (a = a.replace(b, "").trim())),
            a.indexOf("bc-sf-filter-icon-star") > -1
                ? a
                : ((d = d || !1),
                  d
                      ? a.toUpperCase()
                      : this.getSettingValue("general.forceCapitalizeFilterOptionValues")
                      ? capitalize(a, !0)
                      : this.getSettingValue("general.capitalizeFirstLetterFilterOptionValues")
                      ? capitalize(a, !0, !0)
                      : this.getSettingValue("general.capitalizeFilterOptionValues")
                      ? capitalize(a)
                      : a)
        );
    }),
    (BCSfFilter.prototype.customizeSwatchFileName = function (a, b, c) {
        if (this.getSettingValue("general.removePrefixFromSwatchFile") && c.prefix) {
            var d = c.prefix.replace(/\\/g, "");
            a = a.replace(d, "");
        }
        return (a = this.slugify(a).replace(/\#/g, ""));
    }),
    (BCSfFilter.prototype.buildFilterOptionTooltip = function (a) {
        var b = "";
        if (!this.isMobile() && a.hasOwnProperty("tooltip") && a.tooltip) {
            var c = this.escape(stripScriptTag(a.tooltip));
            (b = '<span class="' + this.class.filterOptionTooltip + '" data-bc-tooltip-title="' + c + '">'),
                (b += '<span class="bc-sf-filter-tooltip-arrow"></span>'),
                (b += "</span>"),
                (b += '<div class="bc-sf-filter-tooltip-wrapper"><div class="bc-sf-filter-qtip-content">' + c + "</div></div>");
        }
        return b;
    }),
    (BCSfFilter.prototype.buildTooltipEvent = function () {
        jQ(".bc-sf-filter-option-tooltip").hover(function () {
            var a = jQ(this).parent().find(".bc-sf-filter-tooltip-wrapper"),
                b = jQ(this).parent().find(".bc-sf-filter-qtip-content"),
                c = jQ(this).position(),
                d = b.outerWidth();
            a.css("left", c.left + "px"), d / 2 < c.left ? a.css("margin-left", -(d / 2 - 12) + "px") : d / 2 > c.left && a.css("margin-left", -c.left / 2 + "px");
        });
    }),
    (BCSfFilter.prototype.buildFilterShowMore = function (a, b) {
        var c = this;
        if (void 0 !== a)
            if ("none" == b) jQ(a).addClass("no-scrollbar");
            else
                switch (((this.getSettingValue("general.activeFilterScrollbar") && (this.isMobile() || this.getSettingValue("general.activeFilterScrollbarPC"))) || jQ(a).addClass("no-scrollbar"), b)) {
                    case "viewmore":
                        c.buildFilterViewMore(a, !1);
                        break;
                    case "viewmore_scrollbar":
                        c.buildFilterViewMore(a, !0);
                        break;
                    default:
                        c.buildFilterScrollbar(a);
                }
        else
            jQ("." + this.class.filterOption).each(function () {
                var a = jQ(this).data("show-more-type");
                a && "range" != jQ(this).data("display-type") && c.buildFilterShowMore(jQ(this).find("." + c.class.filterBlockContent), a);
            });
    }),
    (BCSfFilter.prototype.isEnableScrollbar = function (a) {
        var b = a.hasOwnProperty("showMoreType") ? a.showMoreType : "scrollbar",
            c = this.getSettingValue("general.activeFilterScrollbar") && (this.isMobile() || this.getSettingValue("general.activeFilterScrollbarPC"));
        return b.indexOf("scrollbar") > -1 && c;
    }),
    (BCSfFilter.prototype.buildFilterScrollbar = function (a) {
        function b() {
            for (var b in c.scrollData) {
                var d = c.scrollData[b];
                if (jQ('div[data-block-id="' + d.id + '"]').find(".jspScrollable").length > 0) {
                    var e = jQ('div[data-block-id="' + d.id + '"]')
                            .find(".jspScrollable")
                            .eq(0),
                        f = e.data("jsp");
                    if (void 0 !== f) for (var g = -1; f.getContentPositionY() < parseInt(d.position) && g < f.getContentPositionY(); ) (g = f.getContentPositionY()), f.scrollToY(parseInt(d.position));
                }
            }
            jQ(".jspScrollable").removeClass("bc-scrollmore-loading bc-icon-center"), a && e && !e.hasClass("bc-scrollmore-loaded") && e.addClass("bc-scrollmore-loaded");
        }
        var c = this;
        if (
            (void 0 !== a
                ? jQ(function () {
                      if (jQ(a).hasClass(c.class.filterBlockContent) && !jQ(a).hasClass("no-scrollbar"))
                          try {
                              var b = jQ(a),
                                  d = jQ(c.selector.filterTreeHorizontal).length > 0;
                              if (!c.isMobile() && d) {
                                  var e = " ." + c.class.filterBlockContent + "-inner";
                                  b = b.find(e);
                              }
                              if (
                                  (b[0].scrollHeight > b[0].clientHeight &&
                                      b
                                          .bind("jsp-scroll-y", function (a, b, d, e) {
                                              c.triggerScrollYFilterOption(a, b, d, e);
                                          })
                                          .jScrollPane({ contentWidth: "0px" }),
                                  jQ(a).is(":visible"))
                              ) {
                                  var f = Math.floor(jQ(a).width() / (jQ(a).find("li:first").width() + parseInt(jQ(a).find("li:first").css("margin-right"))));
                                  b.attr("data-columns", f);
                              }
                          } catch (b) {
                              jQ(a).css("overflow-y", "auto");
                          }
                  })
                : jQ("." + this.class.filterOption).each(function () {
                      "scrollbar" == jQ(this).data("show-more-type") && "range" != jQ(this).data("display-type") && c.buildFilterScrollbar(jQ(this).find("." + c.class.filterBlockContent));
                  }),
            this.getSettingValue("general.keepScrollState") && this.hasOwnProperty("scrollData") && this.scrollData.length > 0)
        ) {
            var d = jQ(c.selector.filterTreeHorizontal).length > 0,
                e = !c.isMobile() && d ? 3e3 : 12e3;
            -1 ==
            this.scrollData.findIndex(function (a) {
                return a.position > e;
            })
                ? b()
                : (jQ(".jspScrollable").addClass("bc-scrollmore-loading bc-icon-center"), setTimeout(b, 200));
        }
    }),
    (BCSfFilter.prototype.removeScrollbar = function (a) {
        var b = this;
        if (1 == a.length) {
            a.jScrollPane().data("jsp").destroy();
        } else
            a.length > 1 &&
                a.each(function () {
                    b.removeScrollbar(jQ(this));
                });
    }),
    (BCSfFilter.prototype.triggerScrollYFilterOption = function (a, b, c, d) {
        if (d) {
            var e = jQ(a.delegateTarget).data("jsp"),
                f =
                    jQ(a.delegateTarget)
                        .parents("." + this.class.filterOption)
                        .data("filter-option") || !1;
            if (f && f.hasOwnProperty("showMoreDataDown") && f.showMoreDataDown.length > 0) {
                var g = f.filterType,
                    h = f.filterOptionId,
                    i = f.label,
                    j = f.displayType,
                    k = f.selectType,
                    l = jQ(a.delegateTarget).data("columns") || 1,
                    m = l > 4 ? 20 * l : 30 * l,
                    n = f.showMoreDataDown;
                if (
                    (jQ(a.delegateTarget).addClass("bc-scrollmore-loading"),
                    setTimeout(function () {
                        jQ(a.delegateTarget).removeClass("bc-scrollmore-loading");
                    }, 500),
                    n.length > m)
                )
                    var o = n.splice(0, m);
                else {
                    var o = n;
                    n = [];
                }
                for (var p = this.selector.filterTreeHorizontal && jQ(a.delegateTarget).parents(this.selector.filterTreeHorizontal).length > 0 ? "horizontal" : "vertical", q = "", r = 0; r < o.length; r++)
                    switch (j) {
                        case "list":
                            q += this.buildFilterOptionMultipleListData(g, h, i, j, k, o[r], f, p);
                            break;
                        case "box":
                            q += this.buildFilterOptionBoxData(g, h, i, j, k, o[r], f, p);
                            break;
                        case "swatch":
                            q += this.buildFilterOptionSwatchData(g, h, i, j, k, o[r], f, p);
                    }
                (f.showMoreDataDown = n),
                    e.getContentPane().find("ul").append(q),
                    "box" == j && "vertical" == p && this.buildFilterOptionBoxStyle(jQ(a.delegateTarget)),
                    e.reinitialise(),
                    jQ(a.delegateTarget)
                        .parents("." + this.class.filterOption)
                        .attr("data-filter-option", JSON.stringify(f));
            }
        }
    }),
    (BCSfFilter.prototype.scrollbarPrepareData = function (a, b) {
        var c = this.getSettingValue("general.scrollFirstLoadLength");
        if ((c.hasOwnProperty(a.displayType) && null !== c[a.displayType] && (c = c[a.displayType]), this.isEnableScrollbar(a) && b.length > c)) {
            var d = b.slice(0, c);
            b = b.slice(c);
        } else {
            var d = b;
            b = [];
        }
        return (a.showMoreDataDown = b), (a.firstBuild = d), a;
    }),
    (BCSfFilter.prototype.prepareAdvancedRangeSlider = function (a) {
        var b = this,
            c = this.getSettingValue("general.advancedRangeSliders") || [];
        return (
            Array.isArray(c) &&
                c.length &&
                jQ.each(c, function (c, d) {
                    var e = b.findIndexArray(d, a, "filterOptionId");
                    e > -1 && (a[e].displayType = "range");
                }),
            a
        );
    }),
    (BCSfFilter.prototype.buildShortenPipLabels = function (a, b) {
        var c = this;
        if (this.getSettingValue("general.shortenPipsRange")) {
            var d = this.getSettingValue("general.formatPipsRange");
            if (Array.isArray(d)) {
                d.sort(function (a, b) {
                    return b.node - a.node;
                });
                for (var e = new RegExp(b, "g"), f = parseFloat(a.replace(e, "")), g = 0; g < d.length; g++)
                    if (f > d[g].node) {
                        var h = Math.abs(d[g].fix);
                        if (((a = parseFloat((f / d[g].node).toFixed(h))), (void 0 == d[g].suffix || 0 == d[g].suffix) && h > 0 && a % 1 != 0)) a = a.toString().replace(".", d[g].symbol);
                        else {
                            var i = c.getSettingValue("general.decimalDelimiter") || ".";
                            (a = a.toString().replace(".", i)), (a += d[g].symbol);
                        }
                        break;
                    }
            }
        }
        return a;
    }),
    (BCSfFilter.prototype.getAdvancedRangeSelectedValues = function (a, b, c) {
        function d(a, b, c) {
            var d = bcsffilter.findIndexArray(a, b);
            return 1 == c ? d + 1 : d;
        }
        var e = c ? [0, b.length] : [b[0], b[b.length - 1]];
        if (
            Array.isArray(a) &&
            ((a = a.filter(function (a) {
                return a.toString().trim().length > 0;
            })),
            a.length)
        ) {
            for (var f = 0, g = -1, h = 1, i = 0; g < 0; ) (g = d(a[f], b)), f++;
            for (; 0 == i; ) (i = d(a[a.length - h], b, !0)), h++;
            c || ((g = b[g]), (i = b[i - 1])), (e = [g, i]);
        }
        return e;
    }),
    (BCSfFilter.prototype.catchError = function (a, b) {
        if (!(a.total_product <= 0) || ("init" === b && this.getSettingValue("general.productAndVariantAvailable") && this.getSettingValue("general.availableAfterFiltering")));
        else {
            var c = this.getSettingValue("label.error.noProducts");
            if (
                (this.checkExistFilterOptionParam()
                    ? (c = this.getSettingValue("label.error.noFilterResult"))
                    : this.isSearchPage()
                    ? (c = this.getSettingValue("label.error.noSearchResult"))
                    : 0 == this.collectionCount && (c = this.getSettingValue("label.error.noProducts")),
                "" != c)
            ) {
                var d = this.getTemplate("noResult").replace(/{{content}}/g, c);
                jQ(this.getSelector("products")).html(d), jQ(this.getSelector("pagination")).empty(), jQ(this.getSelector("topShowLimit")).empty(), jQ(this.getSelector("topSorting")).empty("");
            }
        }
    }),
    (BCSfFilter.prototype.formatMoney = function (a, b, c) {
        function d(a, b) {
            return void 0 === a ? b : a;
        }
        function e(a, b, e, f) {
            if (((b = d(b, 2)), (e = d(e, ",")), (f = d(f, ".")), isNaN(a) || null == a)) return 0;
            a = (a / 100).toFixed(b);
            var g = a.split("."),
                h = g[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + e),
                i = g[1] ? f + g[1] : "";
            return 1 == c ? (h + i).replace(/((\,00)|(\.00))$/g, "") : h + i;
        }
        if (void 0 === b) var b = this.moneyFormat;
        if (void 0 === c) var c = !1;
        "string" == typeof a && (a = a.replace(".", ""));
        var f = "",
            g = /\{\{\s*(\w+)\s*\}\}/,
            h = b || "${{amount}}";
        switch (h.match(g)[1]) {
            case "amount":
                f = e(a, 2);
                break;
            case "amount_no_decimals":
                f = e(a, 0);
                break;
            case "amount_with_comma_separator":
                f = e(a, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                f = e(a, 0, ".", ",");
                break;
            case "amount_with_space_separator_no_comma":
            default:
                f = e(a, 2);
        }
        return h.replace(g, f);
    }),
    (BCSfFilter.prototype.convertMoneyToDefaultFormat = function (a) {
        var b = this.moneyFormat,
            c = /\{\{\s*(\w+)\s*\}\}/;
        switch (b.match(c)[1]) {
            case "amount_with_comma_separator":
            case "amount_no_decimals_with_comma_separator":
                var d = ".",
                    e = ",";
                break;
            default:
                var d = ",",
                    e = ".";
        }
        var f = new RegExp("\\" + d, "g"),
            g = new RegExp("\\" + e, "g");
        return a.toString().replace(f, "").replace(g, ".");
    }),
    (BCSfFilter.prototype.getCurrency = function () {
        return jQ("<p>" + bcSfFilterConfig.shop.money_format + "</p>")
            .text()
            .replace(/{{[^}]*}}/g, "");
    }),
    (BCSfFilter.prototype.removeCurrencySymbol = function (a) {
        a = jQ("<p>" + a + "</p>").text();
        for (var b = this.getCurrency().split(" "), c = 0; c < b.length; c++) a = a.replace(b[c].trim(), "");
        return a.trim();
    }),
    (BCSfFilter.prototype.isEnableShopifyMultipleCurrencies = function () {
        return (
            "undefined" != typeof bcSfFilterConfig && bcSfFilterConfig.hasOwnProperty("general") && bcSfFilterConfig.general.hasOwnProperty("currencies") && bcSfFilterConfig.general.currencies.length > 1 && this.isShopifyActiveCurrency()
        );
    }),
    (BCSfFilter.prototype.isShopifyActiveCurrency = function () {
        return "undefined" != typeof Shopify && Shopify.hasOwnProperty("currency") && Shopify.currency.hasOwnProperty("rate") && 1 != Shopify.currency.rate;
    }),
    (BCSfFilter.prototype.roundedPrice = function (a) {
        a = parseFloat(a).toFixed(2);
        var b = bcSfFilterConfig.general.current_currency.toLowerCase().trim(),
            c = this.getSettingValue("currencyRoundingRules"),
            d = c && b && c.hasOwnProperty(b) ? c[b] : 0,
            e = this.getRoundingRange(!0);
        if (e) {
            var f = parseFloat(d);
            (f /= e), (a /= e), 1 == f && (f = 0);
            var g = Math.floor(a);
            (a = (a - g).toFixed(2) > f ? g + 1 : g), (a *= e), 0 == f && (d = 0), (a += parseFloat(d));
        }
        return a;
    }),
    (BCSfFilter.prototype.getRoundingRange = function (a) {
        void 0 === a && (a = !1);
        var b = [0.25, 0.5, 0.75, 0.9, 0.95, 0.99, 1, 25, 50, 75, 90, 95, 99, 100, 250, 500, 750, 900, 950, 999, 1e3],
            c = bcSfFilterConfig.general.current_currency.toLowerCase().trim(),
            d = this.getSettingValue("currencyRoundingRules"),
            e = d && c && d.hasOwnProperty(c) ? parseFloat(d[c]) : 0,
            f = !1;
        if (e > 0 && -1 !== jQ.inArray(e, b)) {
            var f = 0.99;
            e > 100 ? (f = 999) : e > 10 ? (f = 99) : e > 1 && (f = 9), a && (f = e > 1 ? f + 1 : f + 0.01);
        }
        return f;
    }),
    (BCSfFilter.prototype.convertPriceBasedOnActiveCurrency = function (a, b) {
        if ((void 0 === b && (b = !0), null === a)) return a;
        if (!0 === this.isEnableShopifyMultipleCurrencies()) {
            var c = a * Shopify.currency.rate;
            a = b ? this.roundedPrice(c) : c;
        }
        return a;
    }),
    (BCSfFilter.prototype.revertPriceToDefaultCurrency = function (a, b) {
        if (!0 === this.isEnableShopifyMultipleCurrencies()) {
            if (((a = this.roundedPrice(a)), b)) {
                var c = this.getRoundingRange();
                c && (a -= c);
            }
            return (a /= Shopify.currency.rate), a.toFixed(8);
        }
        return a;
    }),
    (BCSfFilter.prototype.isMobile = function () {
        return jQ(window).width() <= this.getSettingValue("general.breakpointMobile");
    }),
    (BCSfFilter.prototype.isMobileDevice = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }),
    (BCSfFilter.prototype.isiOS = function () {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }),
    (BCSfFilter.prototype.initMobileDetect = function () {
        var a = this;
        a.isiOS() && (jQ("html").hasClass(a.getClass("mobileDetectiOS")) || jQ("html").addClass(a.getClass("mobileDetectiOS")));
    }),
    (BCSfFilter.prototype.checkExistFilterOptionParam = function () {
        for (var a in this.queryParams) if (a.indexOf("pf_") > -1) return !0;
        return !1;
    }),
    (BCSfFilter.prototype.checkExistBCParam = function () {
        return this.queryParams.hasOwnProperty("_") && this.queryParams._ == this.prefix;
    }),
    (BCSfFilter.prototype.isCollectionParam = function (a) {
        return !("collection" != a || ("collection" == a && this.isSearchPage()));
    }),
    (BCSfFilter.prototype.isVendorPage = function () {
        return window.location.pathname.indexOf("/collections/vendors") > -1;
    }),
    (BCSfFilter.prototype.isTypePage = function () {
        return window.location.pathname.indexOf("/collections/types") > -1;
    }),
    (BCSfFilter.prototype.isTagPage = function () {
        return void 0 !== this.currentTags && null !== this.currentTags && this.currentTags.length > 0;
    }),
    (BCSfFilter.prototype.isSearchPage = function () {
        var a = window.location.search,
            b = window.location.pathname;
        return a.indexOf("search?") > -1 || (-1 == b.indexOf("collections") && b.indexOf("/search") > -1 && -1 == a.indexOf("=cache"));
    }),
    (BCSfFilter.prototype.removeDecimal = function (a, b) {
        var b = void 0 !== b ? b : this.getSettingValue("general.decimalDelimiter"),
            c = new RegExp("(\\" + b + "\\d+)+", "gi");
        return a.replace(c, "");
    }),
    (BCSfFilter.prototype.slugify = function (a) {
        a = a.toLowerCase();
        for (var b = "àáäâãèéëêẽìíïîĩòóöôõùúüûũñç·/_,:;", c = "aaaaaeeeeeiiiiiooooouuuuunc------", d = 0, e = b.length; d < e; d++) a = a.replace(new RegExp(b.charAt(d), "g"), c.charAt(d));
        return a
            .replace(/[\s\/]+/g, "-")
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, "-")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }),
    (BCSfFilter.prototype.textify = function (a, b) {
        for (var b = void 0 !== b ? b : "-", c = a.split(b), d = "", e = 0; e < c.length; e++) (d += c[e].charAt(0).toUpperCase() + c[e].slice(1)), e < c.length - 1 && (d += " ");
        return d;
    }),
    (BCSfFilter.prototype.escape = function (a, b) {
        return (
            (b = b ? "&#13;" : "\n"),
            ("" + a)
                .replace(/&/g, "&amp;")
                .replace(/'/g, "&apos;")
                .replace(/"/g, "&quot;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\r\n/g, b)
                .replace(/[\r\n]/g, b)
        );
    }),
    (BCSfFilter.prototype.sortFilterOptionValue = function (a) {
        var b = a.hasOwnProperty("sortType") && a.sortType ? a.sortType : "key-asc",
            c = b.split("-")[0];
        return (
            "collection" == a.filterType && "key" == c && (c = "label"),
            a.values &&
                a.values.length > 0 &&
                a.values.sort(function (a, b) {
                    function d(a) {
                        for (var b, c, d = new Array(), e = 0, f = -1, g = 0; (b = (c = a.charAt(e++)).charCodeAt(0)); ) {
                            var h = 46 == b || (b >= 48 && b <= 57);
                            h !== g && ((d[++f] = ""), (g = h)), (d[f] += c);
                        }
                        return d;
                    }
                    (a = a[c].toString().toLowerCase()), (b = b[c].toString().toLowerCase());
                    var e = d(a),
                        f = d(b);
                    for (x = 0; e[x] && f[x]; x++)
                        if (e[x] !== f[x]) {
                            var g = Number(e[x]),
                                h = Number(f[x]);
                            return g == e[x] && h == f[x] ? g - h : e[x] > f[x] ? 1 : -1;
                        }
                    return e.length - f.length;
                }),
            b.indexOf("desc") > -1 && a.values.reverse(),
            a.values
        );
    }),
    (BCSfFilter.prototype.truncateByChar = function (a, b, c) {
        return void 0 === c && (c = "..."), (b -= c.length), (a = a.length > b ? a.substring(0, b) + c : a.substring(0, b));
    }),
    (BCSfFilter.prototype.truncateByWord = function (a, b, c) {
        return void 0 === c && (c = "..."), (a = a.split(" ").length > b ? a.split(" ").splice(0, b).join(" ") + c : a.split(" ").splice(0, b).join(" "));
    }),
    (BCSfFilter.prototype.findIndexArray = function (a, b, c, d) {
        if (void 0 !== c && null !== c) {
            for (var e = 0; e < b.length; e++) if ((void 0 !== d && 0 == d && ((b[e][c] = b[e][c].toLowerCase()), (a = a.toLowerCase())), b[e][c] == a)) return e;
        } else for (var e = 0; e < b.length; e++) if ((void 0 !== d && 0 == d && ((b[e] = b[e].toLowerCase()), (a = a.toLowerCase())), b[e] == a)) return e;
        return -1;
    }),
    (BCSfFilter.prototype.getApiUrl = function (a) {
        var b = bcSfFilterConfig.api.filterUrl;
        switch (a) {
            case "search":
                b = bcSfFilterConfig.api.searchUrl;
                break;
            case "suggestion":
                b = bcSfFilterConfig.api.suggestionUrl;
        }
        return b;
    }),
    (BCSfFilter.prototype.getPriceLabel = function (a) {
        if (0 == a.indexOf(":")) return this.getSettingValue("label.under") + " " + this.formatMoney(100 * parseFloat(a.substr(1)), this.moneyFormat, this.getSettingValue("general.removePriceDecimal"));
        if (a.indexOf(":") == a.length - 1) return this.getSettingValue("label.above") + " " + this.formatMoney(100 * parseFloat(a.slice(0, -1)), this.moneyFormat, this.getSettingValue("general.removePriceDecimal"));
        if (2 == a.split(":").length) {
            var b = a.split(":");
            return (
                this.formatMoney(100 * parseFloat(b[0]), this.moneyFormat, this.getSettingValue("general.removePriceDecimal")) +
                " - " +
                this.formatMoney(100 * parseFloat(b[1]), this.moneyFormat, this.getSettingValue("general.removePriceDecimal"))
            );
        }
    }),
    (BCSfFilter.prototype.getPercentSaleLabel = function (a) {
        return (
            (a = this.removeDecimal(a)),
            0 == a.indexOf(":")
                ? this.getSettingValue("label.under") + " " + a.substr(1) + "%"
                : a.indexOf(":") == a.length - 1
                ? this.getSettingValue("label.above") + " " + a.slice(0, -1) + "%"
                : 2 == a.split(":").length
                ? a.split(":")[0] + "% - " + a.split(":").pop() + "%"
                : void 0
        );
    }),
    (BCSfFilter.prototype.getReviewRatingsLabel = function (a, b) {
        var c = a + " ";
        return (c += 1 == a ? this.getSettingValue("label.ratingStar") : this.getSettingValue("label.ratingStars")), b || (c += " " + this.getSettingValue("label.ratingUp")), c;
    }),
    (BCSfFilter.prototype.getSettingValue = function (a, b) {
        var c = void 0 !== b ? b : this.defaultSettings;
        if (
            (bcSfFilterConfig.hasOwnProperty("settings") && null !== bcSfFilterConfig.settings && (c = mergeObject(c, bcSfFilterConfig.settings)),
            "undefined" != typeof bcSfFilterSettings && Object.keys(bcSfFilterSettings).length > 0 && (c = mergeObject(c, bcSfFilterSettings)),
            "undefined" != typeof bcSfSearchSettings && Object.keys(bcSfSearchSettings).length > 0 && (c = mergeObject(c, bcSfSearchSettings)),
            "undefined" != typeof Shopify && Shopify.hasOwnProperty("locale") && c.hasOwnProperty("label") && c.hasOwnProperty("labelTranslations") && void 0 !== c.labelTranslations && c.labelTranslations.hasOwnProperty(Shopify.locale))
        ) {
            var d = c.labelTranslations[Shopify.locale];
            c.label = mergeObject(c.label || {}, d);
        }
        var e = "";
        if (c.hasOwnProperty(a)) return c[a];
        if (a.indexOf(".") > -1)
            for (var f = a.split("."), g = 0; g < f.length; g++)
                if ("" == e) {
                    if (!c.hasOwnProperty(f[g])) return "";
                    e = c[f[g]];
                } else {
                    if (!e.hasOwnProperty(f[g])) return "";
                    e = e[f[g]];
                }
        return e;
    }),
    (BCSfFilter.prototype.getTemplate = function (a) {
        var b = { template: this.template };
        return this.getSettingValue("template." + a, b);
    }),
    (BCSfFilter.prototype.getSelector = function (a) {
        var b = { selector: this.selector };
        return this.getSettingValue("selector." + a, b);
    }),
    (BCSfFilter.prototype.getClass = function (a) {
        var b = { class: this.class };
        return this.getSettingValue("class." + a, b);
    }),
    (BCSfFilter.prototype.getLabel = function (a, b, c) {
        return bcSfFilterConfig.hasOwnProperty(a) && bcSfFilterConfig[a].hasOwnProperty(b) ? bcSfFilterConfig[a][b] : c;
    });
