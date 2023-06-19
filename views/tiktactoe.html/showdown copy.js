/*! showdown 13-05-2016 */

(function () {
    function a(a) {
        "use strict";
        var b = {
            omitExtraWLInCodeBlocks: {
                "default": !1,
                describe: "Omit the default extra whiteline added to code blocks",
                type: "boolean"
            },
            noHeaderId: {
                "default": !1,
                describe: "Turn on/off generated header id",
                type: "boolean"
            },
            prefixHeaderId: {
                "default": !1,
                describe: "Specify a prefix to generated header ids",
                type: "string"
            },
            headerLevelStart: {
                "default": !1,
                describe: "The header blocks level start",
                type: "integer"
            },
            parseImgDimensions: {
                "default": !1,
                describe: "Turn on/off image dimension parsing",
                type: "boolean"
            },
            simplifiedAutoLink: {
                "default": !1,
                describe: "Turn on/off GFM autolink style",
                type: "boolean"
            },
            literalMidWordUnderscores: {
                "default": !1,
                describe: "Parse midword underscores as literal underscores",
                type: "boolean"
            },
            strikethrough: {
                "default": !1,
                describe: "Turn on/off strikethrough support",
                type: "boolean"
            },
            tables: {
                "default": !1,
                describe: "Turn on/off tables support",
                type: "boolean"
            },
            tablesHeaderId: {
                "default": !1,
                describe: "Add an id to table headers",
                type: "boolean"
            },
            ghCodeBlocks: {
                "default": !0,
                describe: "Turn on/off GFM fenced code blocks support",
                type: "boolean"
            },
            tasklists: {
                "default": !1,
                describe: "Turn on/off GFM tasklist support",
                type: "boolean"
            },
            smoothLivePreview: {
                "default": !1,
                describe: "Prevents weird effects in live previews due to incomplete input",
                type: "boolean"
            }
        };
        if (a === !1) return JSON.parse(JSON.stringify(b));
        var c = {};
        for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]["default"]);
        return c
    }

    function b(a, b) {
        "use strict";
        var c = b ? "Error in " + b + " extension->" : "Error in unnamed extension",
            e = {
                valid: !0,
                error: ""
            };
        d.helper.isArray(a) || (a = [a]);
        for (var f = 0; f < a.length; ++f) {
            var g = c + " sub-extension " + f + ": ",
                h = a[f];
            if ("object" != typeof h) return e.valid = !1, e.error = g + "must be an object, but " + typeof h + " given", e;
            if (!d.helper.isString(h.type)) return e.valid = !1, e.error = g + 'property "type" must be a string, but ' + typeof h.type + " given", e;
            var i = h.type = h.type.toLowerCase();
            if ("language" === i && (i = h.type = "lang"), "html" === i && (i = h.type = "output"), "lang" !== i && "output" !== i && "listener" !== i) return e.valid = !1, e.error = g + "type " + i + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', e;
            if ("listener" === i) {
                if (d.helper.isUndefined(h.listeners)) return e.valid = !1, e.error = g + '. Extensions of type "listener" must have a property called "listeners"', e
            } else if (d.helper.isUndefined(h.filter) && d.helper.isUndefined(h.regex)) return e.valid = !1, e.error = g + i + ' extensions must define either a "regex" property or a "filter" method', e;
            if (h.listeners) {
                if ("object" != typeof h.listeners) return e.valid = !1, e.error = g + '"listeners" property must be an object but ' + typeof h.listeners + " given", e;
                for (var j in h.listeners)
                    if (h.listeners.hasOwnProperty(j) && "function" != typeof h.listeners[j]) return e.valid = !1, e.error = g + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + j + " must be a function but " + typeof h.listeners[j] + " given", e
            }
            if (h.filter) {
                if ("function" != typeof h.filter) return e.valid = !1, e.error = g + '"filter" must be a function, but ' + typeof h.filter + " given", e
            } else if (h.regex) {
                if (d.helper.isString(h.regex) && (h.regex = new RegExp(h.regex, "g")), !h.regex instanceof RegExp) return e.valid = !1, e.error = g + '"regex" property must either be a string or a RegExp object, but ' + typeof h.regex + " given", e;
                if (d.helper.isUndefined(h.replace)) return e.valid = !1, e.error = g + '"regex" extensions must implement a replace string or function', e
            }
        }
        return e
    }

    function c(a, b) {
        "use strict";
        var c = b.charCodeAt(0);
        return "~E" + c + "E"
    }
    var d = {},
        e = {},
        f = {},
        g = a(!0),
        h = {
            github: {
                omitExtraWLInCodeBlocks: !0,
                prefixHeaderId: "user-content-",
                simplifiedAutoLink: !0,
                literalMidWordUnderscores: !0,
                strikethrough: !0,
                tables: !0,
                tablesHeaderId: !0,
                ghCodeBlocks: !0,
                tasklists: !0
            },
            vanilla: a(!0)
        };
    d.helper = {}, d.extensions = {}, d.setOption = function (a, b) {
        "use strict";
        return g[a] = b, this
    }, d.getOption = function (a) {
        "use strict";
        return g[a]
    }, d.getOptions = function () {
        "use strict";
        return g
    }, d.resetOptions = function () {
        "use strict";
        g = a(!0)
    }, d.setFlavor = function (a) {
        "use strict";
        if (h.hasOwnProperty(a)) {
            var b = h[a];
            for (var c in b) b.hasOwnProperty(c) && (g[c] = b[c])
        }
    }, d.getDefaultOptions = function (b) {
        "use strict";
        return a(b)
    }, d.subParser = function (a, b) {
        "use strict";
        if (d.helper.isString(a)) {
            if ("undefined" == typeof b) {
                if (e.hasOwnProperty(a)) return e[a];
                throw Error("SubParser named " + a + " not registered!")
            }
            e[a] = b
        }
    }, d.extension = function (a, c) {
        "use strict";
        if (!d.helper.isString(a)) throw Error("Extension 'name' must be a string");
        if (a = d.helper.stdExtName(a), d.helper.isUndefined(c)) {
            if (!f.hasOwnProperty(a)) throw Error("Extension named " + a + " is not registered!");
            return f[a]
        }
        "function" == typeof c && (c = c()), d.helper.isArray(c) || (c = [c]);
        var e = b(c, a);
        if (!e.valid) throw Error(e.error);
        f[a] = c
    }, d.getAllExtensions = function () {
        "use strict";
        return f
    }, d.removeExtension = function (a) {
        "use strict";
        delete f[a]
    }, d.resetExtensions = function () {
        "use strict";
        f = {}
    }, d.validateExtension = function (a) {
        "use strict";
        var c = b(a, null);
        return c.valid ? !0 : (console.warn(c.error), !1)
    }, d.hasOwnProperty("helper") || (d.helper = {}), d.helper.isString = function (a) {
        "use strict";
        return "string" == typeof a || a instanceof String
    }, d.helper.isFunction = function (a) {
        "use strict";
        var b = {};
        return a && "[object Function]" === b.toString.call(a)
    }, d.helper.forEach = function (a, b) {
        "use strict";
        if ("function" == typeof a.forEach) a.forEach(b);
        else
            for (var c = 0; c < a.length; c++) b(a[c], c, a)
    }, d.helper.isArray = function (a) {
        "use strict";
        return a.constructor === Array
    }, d.helper.isUndefined = function (a) {
        "use strict";
        return "undefined" == typeof a
    }, d.helper.stdExtName = function (a) {
        "use strict";
        return a.replace(/[_-]||\s/g, "").toLowerCase()
    }, d.helper.escapeCharactersCallback = c, d.helper.escapeCharacters = function (a, b, d) {
        "use strict";
        var e = "([" + b.replace(/([\[\]\\])/g, "\\$1") + "])";
        d && (e = "\\\\" + e);
        var f = new RegExp(e, "g");
        return a = a.replace(f, c)
    };
    var i = function (a, b, c, d) {
        "use strict";
        var e, f, g, h, i, j = d || "",
            k = j.indexOf("g") > -1,
            l = new RegExp(b + "|" + c, "g" + j.replace(/g/g, "")),
            m = new RegExp(b, j.replace(/g/g, "")),
            n = [];
        do
            for (e = 0; g = l.exec(a);)
                if (m.test(g[0])) e++ || (f = l.lastIndex, h = f - g[0].length);
                else if (e && !--e) {
            i = g.index + g[0].length;
            var o = {
                left: {
                    start: h,
                    end: f
                },
                match: {
                    start: f,
                    end: g.index
                },
                right: {
                    start: g.index,
                    end: i
                },
                wholeMatch: {
                    start: h,
                    end: i
                }
            };
            if (n.push(o), !k) return n
        } while (e && (l.lastIndex = f));
        return n
    };
    d.helper.matchRecursiveRegExp = function (a, b, c, d) {
        "use strict";
        for (var e = i(a, b, c, d), f = [], g = 0; g < e.length; ++g) f.push([a.slice(e[g].wholeMatch.start, e[g].wholeMatch.end), a.slice(e[g].match.start, e[g].match.end), a.slice(e[g].left.start, e[g].left.end), a.slice(e[g].right.start, e[g].right.end)]);
        return f
    }, d.helper.replaceRecursiveRegExp = function (a, b, c, e, f) {
        "use strict";
        if (!d.helper.isFunction(b)) {
            var g = b;
            b = function () {
                return g
            }
        }
        var h = i(a, c, e, f),
            j = a,
            k = h.length;
        if (k > 0) {
            var l = [];
            0 !== h[0].wholeMatch.start && l.push(a.slice(0, h[0].wholeMatch.start));
            for (var m = 0; k > m; ++m) l.push(b(a.slice(h[m].wholeMatch.start, h[m].wholeMatch.end), a.slice(h[m].match.start, h[m].match.end), a.slice(h[m].left.start, h[m].left.end), a.slice(h[m].right.start, h[m].right.end))), k - 1 > m && l.push(a.slice(h[m].wholeMatch.end, h[m + 1].wholeMatch.start));
            h[k - 1].wholeMatch.end < a.length && l.push(a.slice(h[k - 1].wholeMatch.end)), j = l.join("")
        }
        return j
    }, d.helper.isUndefined(console) && (console = {
        warn: function (a) {
            "use strict";
            alert(a)
        },
        log: function (a) {
            "use strict";
            alert(a)
        },
        error: function (a) {
            "use strict";
            throw a
        }
    }), d.Converter = function (a) {
        "use strict";

        function c() {
            a = a || {};
            for (var b in g) g.hasOwnProperty(b) && (k[b] = g[b]);
            if ("object" != typeof a) throw Error("Converter expects the passed parameter to be an object, but " + typeof a + " was passed instead.");
            for (var c in a) a.hasOwnProperty(c) && (k[c] = a[c]);
            k.extensions && d.helper.forEach(k.extensions, e)
        }

        function e(a, c) {
            if (c = c || null, d.helper.isString(a)) {
                if (a = d.helper.stdExtName(a), c = a, d.extensions[a]) return console.warn("DEPRECATION WARNING: " + a + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), void i(d.extensions[a], a);
                if (d.helper.isUndefined(f[a])) throw Error('Extension "' + a + '" could not be loaded. It was either not found or is not a valid extension.');
                a = f[a]
            }
            "function" == typeof a && (a = a()), d.helper.isArray(a) || (a = [a]);
            var e = b(a, c);
            if (!e.valid) throw Error(e.error);
            for (var g = 0; g < a.length; ++g) {
                switch (a[g].type) {
                    case "lang":
                        l.push(a[g]);
                        break;
                    case "output":
                        m.push(a[g])
                }
                if (a[g].hasOwnProperty(n))
                    for (var h in a[g].listeners) a[g].listeners.hasOwnProperty(h) && j(h, a[g].listeners[h])
            }
        }

        function i(a, c) {
            "function" == typeof a && (a = a(new d.Converter)), d.helper.isArray(a) || (a = [a]);
            var e = b(a, c);
            if (!e.valid) throw Error(e.error);
            for (var f = 0; f < a.length; ++f) switch (a[f].type) {
                case "lang":
                    l.push(a[f]);
                    break;
                case "output":
                    m.push(a[f]);
                    break;
                default:
                    throw Error("Extension loader error: Type unrecognized!!!")
            }
        }

        function j(a, b) {
            if (!d.helper.isString(a)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof a + " given");
            if ("function" != typeof b) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof b + " given");
            n.hasOwnProperty(a) || (n[a] = []), n[a].push(b)
        }
        var k = {},
            l = [],
            m = [],
            n = {};
        c(), this._dispatch = function (a, b, c, d) {
            if (n.hasOwnProperty(a))
                for (var e = 0; e < n[a].length; ++e) {
                    var f = n[a][e](a, b, this, c, d);
                    f && "undefined" != typeof f && (b = f)
                }
            return b
        }, this.listen = function (a, b) {
            return j(a, b), this
        }, this.makeHtml = function (a) {
            if (!a) return a;
            var b = {
                gHtmlBlocks: [],
                gHtmlMdBlocks: [],
                gHtmlSpans: [],
                gUrls: {},
                gTitles: {},
                gDimensions: {},
                gListLevel: 0,
                hashLinkCounts: {},
                langExtensions: l,
                outputModifiers: m,
                converter: this,
                ghCodeBlocks: []
            };
            return a = a.replace(/~/g, "~T"), a = a.replace(/\$/g, "~D"), a = a.replace(/\r\n/g, "\n"), a = a.replace(/\r/g, "\n"), a = "\n\n" + a + "\n\n", a = d.subParser("detab")(a, k, b), a = d.subParser("stripBlankLines")(a, k, b), d.helper.forEach(l, function (c) {
                a = d.subParser("runExtension")(c, a, k, b)
            }), a = d.subParser("hashPreCodeTags")(a, k, b), a = d.subParser("githubCodeBlocks")(a, k, b), a = d.subParser("hashHTMLBlocks")(a, k, b), a = d.subParser("hashHTMLSpans")(a, k, b), a = d.subParser("stripLinkDefinitions")(a, k, b), a = d.subParser("blockGamut")(a, k, b), a = d.subParser("unhashHTMLSpans")(a, k, b), a = d.subParser("unescapeSpecialChars")(a, k, b), a = a.replace(/~D/g, "$$"), a = a.replace(/~T/g, "~"), d.helper.forEach(m, function (c) {
                a = d.subParser("runExtension")(c, a, k, b)
            }), a
        }, this.setOption = function (a, b) {
            k[a] = b
        }, this.getOption = function (a) {
            return k[a]
        }, this.getOptions = function () {
            return k
        }, this.addExtension = function (a, b) {
            b = b || null, e(a, b)
        }, this.useExtension = function (a) {
            e(a)
        }, this.setFlavor = function (a) {
            if (h.hasOwnProperty(a)) {
                var b = h[a];
                for (var c in b) b.hasOwnProperty(c) && (k[c] = b[c])
            }
        }, this.removeExtension = function (a) {
            d.helper.isArray(a) || (a = [a]);
            for (var b = 0; b < a.length; ++b) {
                for (var c = a[b], e = 0; e < l.length; ++e) l[e] === c && l[e].splice(e, 1);
                for (var f = 0; f < m.length; ++e) m[f] === c && m[f].splice(e, 1)
            }
        }, this.getAllExtensions = function () {
            return {
                language: l,
                output: m
            }
        }
    }, d.subParser("anchors", function (a, b, c) {
        "use strict";
        a = c.converter._dispatch("anchors.before", a, b, c);
        var e = function (a, b, e, f, g, h, i, j) {
            d.helper.isUndefined(j) && (j = ""), a = b;
            var k = e,
                l = f.toLowerCase(),
                m = g,
                n = j;
            if (!m)
                if (l || (l = k.toLowerCase().replace(/ ?\n/g, " ")), m = "#" + l, d.helper.isUndefined(c.gUrls[l])) {
                    if (!(a.search(/\(\s*\)$/m) > -1)) return a;
                    m = ""
                } else m = c.gUrls[l], d.helper.isUndefined(c.gTitles[l]) || (n = c.gTitles[l]);
            m = d.helper.escapeCharacters(m, "*_", !1);
            var o = '<a href="' + m + '"';
            return "" !== n && null !== n && (n = n.replace(/"/g, "&quot;"), n = d.helper.escapeCharacters(n, "*_", !1), o += ' title="' + n + '"'), o += ">" + k + "</a>"
        };
        return a = a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, e), a = a.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, e), a = a.replace(/(\[([^\[\]]+)])()()()()()/g, e), a = c.converter._dispatch("anchors.after", a, b, c)
    }), d.subParser("autoLinks", function (a, b, c) {
        "use strict";

        function e(a, b) {
            var c = d.subParser("unescapeSpecialChars")(b);
            return d.subParser("encodeEmailAddress")(c)
        }
        a = c.converter._dispatch("autoLinks.before", a, b, c);
        var f = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,
            g = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
            h = /(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi,
            i = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;
        return a = a.replace(g, '<a href="$1">$1</a>'), a = a.replace(i, e), b.simplifiedAutoLink && (a = a.replace(f, '<a href="$1">$1</a>'), a = a.replace(h, e)), a = c.converter._dispatch("autoLinks.after", a, b, c)
    }), d.subParser("blockGamut", function (a, b, c) {
        "use strict";
        a = c.converter._dispatch("blockGamut.before", a, b, c), a = d.subParser("blockQuotes")(a, b, c), a = d.subParser("headers")(a, b, c);
        var e = d.subParser("hashBlock")("<hr />", b, c);
        return a = a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, e), a = a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, e), a = a.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, e), a = d.subParser("lists")(a, b, c), a = d.subParser("codeBlocks")(a, b, c), a = d.subParser("tables")(a, b, c), a = d.subParser("hashHTMLBlocks")(a, b, c), a = d.subParser("paragraphs")(a, b, c), a = c.converter._dispatch("blockGamut.after", a, b, c)
    }), d.subParser("blockQuotes", function (a, b, c) {
        "use strict";
        return a = c.converter._dispatch("blockQuotes.before", a, b, c), a = a.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (a, e) {
            var f = e;
            return f = f.replace(/^[ \t]*>[ \t]?/gm, "~0"), f = f.replace(/~0/g, ""), f = f.replace(/^[ \t]+$/gm, ""), f = d.subParser("githubCodeBlocks")(f, b, c), f = d.subParser("blockGamut")(f, b, c), f = f.replace(/(^|\n)/g, "$1  "), f = f.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (a, b) {
                var c = b;
                return c = c.replace(/^  /gm, "~0"), c = c.replace(/~0/g, "")
            }), d.subParser("hashBlock")("<blockquote>\n" + f + "\n</blockquote>", b, c)
        }), a = c.converter._dispatch("blockQuotes.after", a, b, c)
    }), d.subParser("codeBlocks", function (a, b, c) {
        "use strict";
        a = c.converter._dispatch("codeBlocks.before", a, b, c), a += "~0";
        var e = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
        return a = a.replace(e, function (a, e, f) {
            var g = e,
                h = f,
                i = "\n";
            return g = d.subParser("outdent")(g), g = d.subParser("encodeCode")(g), g = d.subParser("detab")(g), g = g.replace(/^\n+/g, ""), g = g.replace(/\n+$/g, ""), b.omitExtraWLInCodeBlocks && (i = ""), g = "<pre><code>" + g + i + "</code></pre>", d.subParser("hashBlock")(g, b, c) + h
        }), a = a.replace(/~0/, ""), a = c.converter._dispatch("codeBlocks.after", a, b, c)
    }), d.subParser("codeSpans", function (a, b, c) {
        "use strict";
        return a = c.converter._dispatch("codeSpans.before", a, b, c), a = a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (a, b, c, e) {
            var f = e;
            return f = f.replace(/^([ \t]*)/g, ""), f = f.replace(/[ \t]*$/g, ""), f = d.subParser("encodeCode")(f), b + "<code>" + f + "</code>"
        }), a = c.converter._dispatch("codeSpans.after", a, b, c)
    }), d.subParser("detab", function (a) {
        "use strict";
        return a = a.replace(/\t(?=\t)/g, "    "), a = a.replace(/\t/g, "~A~B"), a = a.replace(/~B(.+?)~A/g, function (a, b) {
            for (var c = b, d = 4 - c.length % 4, e = 0; d > e; e++) c += " ";
            return c
        }), a = a.replace(/~A/g, "    "), a = a.replace(/~B/g, "")
    }), d.subParser("encodeAmpsAndAngles", function (a) {
        "use strict";
        return a = a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), a = a.replace(/<(?![a-z\/?\$!])/gi, "&lt;")
    }), d.subParser("encodeBackslashEscapes", function (a) {
        "use strict";
        return a = a.replace(/\\(\\)/g, d.helper.escapeCharactersCallback), a = a.replace(/\\([`*_{}\[\]()>#+-.!])/g, d.helper.escapeCharactersCallback)
    }), d.subParser("encodeCode", function (a) {
        "use strict";
        return a = a.replace(/&/g, "&amp;"), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), a = d.helper.escapeCharacters(a, "*_{}[]\\", !1)
    }), d.subParser("encodeEmailAddress", function (a) {
        "use strict";
        var b = [function (a) {
            return "&#" + a.charCodeAt(0) + ";"
        }, function (a) {
            return "&#x" + a.charCodeAt(0).toString(16) + ";"
        }, function (a) {
            return a
        }];
        return a = "mailto:" + a, a = a.replace(/./g, function (a) {
            if ("@" === a) a = b[Math.floor(2 * Math.random())](a);
            else if (":" !== a) {
                var c = Math.random();
                a = c > .9 ? b[2](a) : c > .45 ? b[1](a) : b[0](a)
            }
            return a
        }), a = '<a href="' + a + '">' + a + "</a>", a = a.replace(/">.+:/g, '">')
    }), d.subParser("escapeSpecialCharsWithinTagAttributes", function (a) {
        "use strict";
        var b = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
        return a = a.replace(b, function (a) {
            var b = a.replace(/(.)<\/?code>(?=.)/g, "$1`");
            return b = d.helper.escapeCharacters(b, "\\`*_", !1)
        })
    }), d.subParser("githubCodeBlocks", function (a, b, c) {
        "use strict";
        return b.ghCodeBlocks ? (a = c.converter._dispatch("githubCodeBlocks.before", a, b, c), a += "~0", a = a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (a, e, f) {
            var g = b.omitExtraWLInCodeBlocks ? "" : "\n";
            return f = d.subParser("encodeCode")(f), f = d.subParser("detab")(f), f = f.replace(/^\n+/g, ""), f = f.replace(/\n+$/g, ""), f = "<pre><code" + (e ? ' class="' + e + " language-" + e + '"' : "") + ">" + f + g + "</code></pre>", f = d.subParser("hashBlock")(f, b, c), "\n\n~G" + (c.ghCodeBlocks.push({
                text: a,
                codeblock: f
            }) - 1) + "G\n\n"
        }), a = a.replace(/~0/, ""), c.converter._dispatch("githubCodeBlocks.after", a, b, c)) : a
    }), d.subParser("hashBlock", function (a, b, c) {
        "use strict";
        return a = a.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (c.gHtmlBlocks.push(a) - 1) + "K\n\n"
    }), d.subParser("hashElement", function (a, b, c) {
        "use strict";
        return function (a, b) {
            var d = b;
            return d = d.replace(/\n\n/g, "\n"), d = d.replace(/^\n/, ""), d = d.replace(/\n+$/g, ""), d = "\n\n~K" + (c.gHtmlBlocks.push(d) - 1) + "K\n\n"
        }
    }), d.subParser("hashHTMLBlocks", function (a, b, c) {
        "use strict";
        for (var e = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], f = function (a, b, d, e) {
                var f = a;
                return -1 !== d.search(/\bmarkdown\b/) && (f = d + c.converter.makeHtml(b) + e), "\n\n~K" + (c.gHtmlBlocks.push(f) - 1) + "K\n\n"
            }, g = 0; g < e.length; ++g) a = d.helper.replaceRecursiveRegExp(a, f, "^(?: |\\t){0,3}<" + e[g] + "\\b[^>]*>", "</" + e[g] + ">", "gim");
        return a = a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, d.subParser("hashElement")(a, b, c)), a = a.replace(/(<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, d.subParser("hashElement")(a, b, c)), a = a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, d.subParser("hashElement")(a, b, c))
    }), d.subParser("hashHTMLSpans", function (a, b, c) {
        "use strict";
        for (var e = d.helper.matchRecursiveRegExp(a, "<code\\b[^>]*>", "</code>", "gi"), f = 0; f < e.length; ++f) a = a.replace(e[f][0], "~L" + (c.gHtmlSpans.push(e[f][0]) - 1) + "L");
        return a
    }), d.subParser("unhashHTMLSpans", function (a, b, c) {
        "use strict";
        for (var d = 0; d < c.gHtmlSpans.length; ++d) a = a.replace("~L" + d + "L", c.gHtmlSpans[d]);
        return a
    }), d.subParser("hashPreCodeTags", function (a, b, c) {
        "use strict";
        var e = function (a, b, e, f) {
            var g = e + d.subParser("encodeCode")(b) + f;
            return "\n\n~G" + (c.ghCodeBlocks.push({
                text: a,
                codeblock: g
            }) - 1) + "G\n\n"
        };
        return a = d.helper.replaceRecursiveRegExp(a, e, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim")
    }), d.subParser("headers", function (a, b, c) {
        "use strict";

        function e(a) {
            var b, e = a.replace(/[^\w]/g, "").toLowerCase();
            return c.hashLinkCounts[e] ? b = e + "-" + c.hashLinkCounts[e]++ : (b = e, c.hashLinkCounts[e] = 1), f === !0 && (f = "section"), d.helper.isString(f) ? f + b : b
        }
        a = c.converter._dispatch("headers.before", a, b, c);
        var f = b.prefixHeaderId,
            g = isNaN(parseInt(b.headerLevelStart)) ? 1 : parseInt(b.headerLevelStart),
            h = b.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
            i = b.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
        return a = a.replace(h, function (a, f) {
            var h = d.subParser("spanGamut")(f, b, c),
                i = b.noHeaderId ? "" : ' id="' + e(f) + '"',
                j = g,
                k = "<h" + j + i + ">" + h + "</h" + j + ">";
            return d.subParser("hashBlock")(k, b, c)
        }), a = a.replace(i, function (a, f) {
            var h = d.subParser("spanGamut")(f, b, c),
                i = b.noHeaderId ? "" : ' id="' + e(f) + '"',
                j = g + 1,
                k = "<h" + j + i + ">" + h + "</h" + j + ">";
            return d.subParser("hashBlock")(k, b, c)
        }), a = a.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function (a, f, h) {
            var i = d.subParser("spanGamut")(h, b, c),
                j = b.noHeaderId ? "" : ' id="' + e(h) + '"',
                k = g - 1 + f.length,
                l = "<h" + k + j + ">" + i + "</h" + k + ">";
            return d.subParser("hashBlock")(l, b, c)
        }), a = c.converter._dispatch("headers.after", a, b, c)
    }), d.subParser("images", function (a, b, c) {
        "use strict";

        function e(a, b, e, f, g, h, i, j) {
            var k = c.gUrls,
                l = c.gTitles,
                m = c.gDimensions;
            if (e = e.toLowerCase(), j || (j = ""), "" === f || null === f) {
                if ("" !== e && null !== e || (e = b.toLowerCase().replace(/ ?\n/g, " ")), f = "#" + e, d.helper.isUndefined(k[e])) return a;
                f = k[e], d.helper.isUndefined(l[e]) || (j = l[e]), d.helper.isUndefined(m[e]) || (g = m[e].width, h = m[e].height)
            }
            b = b.replace(/"/g, "&quot;"), b = d.helper.escapeCharacters(b, "*_", !1), f = d.helper.escapeCharacters(f, "*_", !1);
            var n = '<img src="' + f + '" alt="' + b + '"';
            return j && (j = j.replace(/"/g, "&quot;"), j = d.helper.escapeCharacters(j, "*_", !1), n += ' title="' + j + '"'), g && h && (g = "*" === g ? "auto" : g, h = "*" === h ? "auto" : h, n += ' width="' + g + '"', n += ' height="' + h + '"'), n += " />"
        }
        a = c.converter._dispatch("images.before", a, b, c);
        var f = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
            g = /!\[(.*?)][ ]?(?:\n[ ]*)?\[(.*?)]()()()()()/g;
        return a = a.replace(g, e), a = a.replace(f, e), a = c.converter._dispatch("images.after", a, b, c)
    }), d.subParser("italicsAndBold", function (a, b, c) {
        "use strict";
        return a = c.converter._dispatch("italicsAndBold.before", a, b, c), b.literalMidWordUnderscores ? (a = a.replace(/(^|\s|>|\b)__(?=\S)([^]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>"), a = a.replace(/(^|\s|>|\b)_(?=\S)([^]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>"), a = a.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>"), a = a.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>")) : (a = a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"), a = a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>")), a = c.converter._dispatch("italicsAndBold.after", a, b, c)
    }), d.subParser("lists", function (a, b, c) {
        "use strict";

        function e(a, e) {
            c.gListLevel++, a = a.replace(/\n{2,}$/, "\n"), a += "~0";
            var f = /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
                g = /\n[ \t]*\n(?!~0)/.test(a);
            return a = a.replace(f, function (a, e, f, h, i, j, k) {
                k = k && "" !== k.trim();
                var l = d.subParser("outdent")(i, b, c),
                    m = "";
                return j && b.tasklists && (m = ' class="task-list-item" style="list-style-type: none;"', l = l.replace(/^[ \t]*\[(x|X| )?]/m, function () {
                    var a = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                    return k && (a += " checked"), a += ">"
                })), e || l.search(/\n{2,}/) > -1 ? (l = d.subParser("githubCodeBlocks")(l, b, c), l = d.subParser("blockGamut")(l, b, c)) : (l = d.subParser("lists")(l, b, c), l = l.replace(/\n$/, ""), l = g ? d.subParser("paragraphs")(l, b, c) : d.subParser("spanGamut")(l, b, c)), l = "\n<li" + m + ">" + l + "</li>\n"
            }), a = a.replace(/~0/g, ""), c.gListLevel--, e && (a = a.replace(/\s+$/, "")), a
        }

        function f(a, b, c) {
            var d = "ul" === b ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm,
                f = [],
                g = "";
            if (-1 !== a.search(d)) {
                ! function i(a) {
                    var f = a.search(d); - 1 !== f ? (g += "\n\n<" + b + ">" + e(a.slice(0, f), !!c) + "</" + b + ">\n\n", b = "ul" === b ? "ol" : "ul", d = "ul" === b ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, i(a.slice(f))) : g += "\n\n<" + b + ">" + e(a, !!c) + "</" + b + ">\n\n"
                }(a);
                for (var h = 0; h < f.length; ++h);
            } else g = "\n\n<" + b + ">" + e(a, !!c) + "</" + b + ">\n\n";
            return g
        }
        a = c.converter._dispatch("lists.before", a, b, c), a += "~0";
        var g = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
        return c.gListLevel ? a = a.replace(g, function (a, b, c) {
            var d = c.search(/[*+-]/g) > -1 ? "ul" : "ol";
            return f(b, d, !0)
        }) : (g = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, a = a.replace(g, function (a, b, c, d) {
            var e = d.search(/[*+-]/g) > -1 ? "ul" : "ol";
            return f(c, e)
        })), a = a.replace(/~0/, ""), a = c.converter._dispatch("lists.after", a, b, c)
    }), d.subParser("outdent", function (a) {
        "use strict";
        return a = a.replace(/^(\t|[ ]{1,4})/gm, "~0"), a = a.replace(/~0/g, "")
    }), d.subParser("paragraphs", function (a, b, c) {
        "use strict";
        a = c.converter._dispatch("paragraphs.before", a, b, c), a = a.replace(/^\n+/g, ""), a = a.replace(/\n+$/g, "");
        for (var e = a.split(/\n{2,}/g), f = [], g = e.length, h = 0; g > h; h++) {
            var i = e[h];
            i.search(/~(K|G)(\d+)\1/g) >= 0 ? f.push(i) : (i = d.subParser("spanGamut")(i, b, c), i = i.replace(/^([ \t]*)/g, "<p>"), i += "</p>", f.push(i))
        }
        for (g = f.length, h = 0; g > h; h++) {
            for (var j = "", k = f[h], l = !1; k.search(/~(K|G)(\d+)\1/) >= 0;) {
                var m = RegExp.$1,
                    n = RegExp.$2;
                j = "K" === m ? c.gHtmlBlocks[n] : l ? d.subParser("encodeCode")(c.ghCodeBlocks[n].text) : c.ghCodeBlocks[n].codeblock, j = j.replace(/\$/g, "$$$$"), k = k.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, j), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(k) && (l = !0)
            }
            f[h] = k
        }
        return a = f.join("\n\n"), a = a.replace(/^\n+/g, ""), a = a.replace(/\n+$/g, ""), c.converter._dispatch("paragraphs.after", a, b, c)
    }), d.subParser("runExtension", function (a, b, c, d) {
        "use strict";
        if (a.filter) b = a.filter(b, d.converter, c);
        else if (a.regex) {
            var e = a.regex;
            !e instanceof RegExp && (e = new RegExp(e, "g")), b = b.replace(e, a.replace)
        }
        return b
    }), d.subParser("spanGamut", function (a, b, c) {
        "use strict";
        return a = c.converter._dispatch("spanGamut.before", a, b, c), a = d.subParser("codeSpans")(a, b, c), a = d.subParser("escapeSpecialCharsWithinTagAttributes")(a, b, c), a = d.subParser("encodeBackslashEscapes")(a, b, c), a = d.subParser("images")(a, b, c), a = d.subParser("anchors")(a, b, c), a = d.subParser("autoLinks")(a, b, c), a = d.subParser("encodeAmpsAndAngles")(a, b, c), a = d.subParser("italicsAndBold")(a, b, c), a = d.subParser("strikethrough")(a, b, c), a = a.replace(/  +\n/g, " <br />\n"), a = c.converter._dispatch("spanGamut.after", a, b, c)
    }), d.subParser("strikethrough", function (a, b, c) {
        "use strict";
        return b.strikethrough && (a = c.converter._dispatch("strikethrough.before", a, b, c), a = a.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), a = c.converter._dispatch("strikethrough.after", a, b, c)), a
    }), d.subParser("stripBlankLines", function (a) {
        "use strict";
        return a.replace(/^[ \t]+$/gm, "")
    }), d.subParser("stripLinkDefinitions", function (a, b, c) {
        "use strict";
        var e = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;
        return a += "~0", a = a.replace(e, function (a, e, f, g, h, i, j) {
            return e = e.toLowerCase(), c.gUrls[e] = d.subParser("encodeAmpsAndAngles")(f), i ? i + j : (j && (c.gTitles[e] = j.replace(/"|'/g, "&quot;")), b.parseImgDimensions && g && h && (c.gDimensions[e] = {
                width: g,
                height: h
            }), "")
        }), a = a.replace(/~0/, "")
    }), d.subParser("tables", function (a, b, c) {
        "use strict";

        function e(a) {
            return /^:[ \t]*---*$/.test(a) ? ' style="text-align:left;"' : /^---*[ \t]*:[ \t]*$/.test(a) ? ' style="text-align:right;"' : /^:[ \t]*---*[ \t]*:$/.test(a) ? ' style="text-align:center;"' : ""
        }

        function f(a, e) {
            var f = "";
            return a = a.trim(), b.tableHeaderId && (f = ' id="' + a.replace(/ /g, "_").toLowerCase() + '"'), a = d.subParser("spanGamut")(a, b, c), "<th" + f + e + ">" + a + "</th>\n"
        }

        function g(a, e) {
            var f = d.subParser("spanGamut")(a, b, c);
            return "<td" + e + ">" + f + "</td>\n"
        }

        function h(a, b) {
            for (var c = "<table>\n<thead>\n<tr>\n", d = a.length, e = 0; d > e; ++e) c += a[e];
            for (c += "</tr>\n</thead>\n<tbody>\n", e = 0; e < b.length; ++e) {
                c += "<tr>\n";
                for (var f = 0; d > f; ++f) c += b[e][f];
                c += "</tr>\n"
            }
            return c += "</tbody>\n</table>\n"
        }
        if (!b.tables) return a;
        var i = /^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){3,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){3,}[^]+?(?:\n\n|~0)/gm;
        return a = c.converter._dispatch("tables.before", a, b, c), a = a.replace(i, function (a) {
            var b, c = a.split("\n");
            for (b = 0; b < c.length; ++b) /^[ \t]{0,3}\|/.test(c[b]) && (c[b] = c[b].replace(/^[ \t]{0,3}\|/, "")), /\|[ \t]*$/.test(c[b]) && (c[b] = c[b].replace(/\|[ \t]*$/, ""));
            var i = c[0].split("|").map(function (a) {
                    return a.trim()
                }),
                j = c[1].split("|").map(function (a) {
                    return a.trim()
                }),
                k = [],
                l = [],
                m = [],
                n = [];
            for (c.shift(), c.shift(), b = 0; b < c.length; ++b) "" !== c[b].trim() && k.push(c[b].split("|").map(function (a) {
                return a.trim()
            }));
            if (i.length < j.length) return a;
            for (b = 0; b < j.length; ++b) m.push(e(j[b]));
            for (b = 0; b < i.length; ++b) d.helper.isUndefined(m[b]) && (m[b] = ""), l.push(f(i[b], m[b]));
            for (b = 0; b < k.length; ++b) {
                for (var o = [], p = 0; p < l.length; ++p) d.helper.isUndefined(k[b][p]), o.push(g(k[b][p], m[p]));
                n.push(o)
            }
            return h(l, n)
        }), a = c.converter._dispatch("tables.after", a, b, c)
    }), d.subParser("unescapeSpecialChars", function (a) {
        "use strict";
        return a = a.replace(/~E(\d+)E/g, function (a, b) {
            var c = parseInt(b);
            return String.fromCharCode(c)
        })
    });
    var j = this;
    "undefined" != typeof module && module.exports ? module.exports = d : "function" == typeof define && define.amd ? define(function () {
        "use strict";
        return d
    }) : j.showdown = d
}).call(this);
//# sourceMappingURL=showdown.min.js.map