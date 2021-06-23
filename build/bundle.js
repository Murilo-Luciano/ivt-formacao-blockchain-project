/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const SHA256 = __webpack_require__(/*! crypto-js/sha256 */ \"./node_modules/crypto-js/sha256.js\");\n\nclass Block {\n  constructor(index = '', previousHash = '', data, timestamp) {\n    this.index = index;\n    this.timestamp = timestamp;\n    this.data = data;\n    this.previousHash = previousHash;\n    this.hash = this.calculateHash();\n    this.nonce = 0;\n  }\n\n  calculateHash() {\n    return SHA256(this.previousHash + this.nonce + JSON.stringify(this.data) + this.timestamp).toString();\n  }\n\n  mineBlock(difficulty) {\n    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(\"0\")) {\n      this.nonce++;\n      this.hash = this.calculateHash();\n    }\n\n    console.log(\"Block mined => \" + this.hash);\n    return this.hash;\n  }\n\n}\n\nmodule.exports = Block;\n\n//# sourceURL=webpack://blockchain-git/./src/block.js?");

/***/ }),

/***/ "./src/blockchain.js":
/*!***************************!*\
  !*** ./src/blockchain.js ***!
  \***************************/
/***/ ((module) => {

eval("class Blockchain {\n  constructor() {\n    this.chain = [\n      /*empty*/\n    ];\n    this.difficulty = null; // DIFFICULTY LEVEL (Should be variable)\n  }\n\n  getLatestBlock() {\n    return this.chain[this.chain.length - 1];\n  }\n\n  addBlock(newBlock, dif = 0) {\n    // if chain is empty => Transform newBlock into GenesisBlock (Previous Hash = 0)\n    if (this.chain.length == 0) {\n      newBlock.index = this.chain.length;\n      newBlock.previousHash = '0';\n      newBlock.hash = newBlock.calculateHash();\n      this.chain.push(newBlock);\n    } else if (dif != 0) {\n      newBlock.index = this.chain.length;\n      newBlock.previousHash = this.getLatestBlock().hash;\n      this.difficulty = dif;\n      newBlock.mineBlock(this.difficulty);\n      this.chain.push(newBlock);\n    } else {\n      newBlock.index = this.chain.length;\n      newBlock.previousHash = this.getLatestBlock().hash;\n      this.difficulty = this.chain.length;\n      newBlock.mineBlock(this.difficulty);\n      this.chain.push(newBlock);\n    }\n  }\n\n  chainValidation() {\n    // Go through the chain and checks each hash integrity\n    for (let i = 1; i < this.chain.length; i++) {\n      const currentBlock = this.chain[i];\n      const previousBlock = this.chain[i - 1];\n\n      if (currentBlock.hash !== currentBlock.calculateHash()) {\n        return false;\n      }\n\n      if (currentBlock.previousHash !== previousBlock.hash) {\n        return false;\n      }\n    }\n\n    return true;\n  }\n\n}\n\nmodule.exports = Blockchain;\n\n//# sourceURL=webpack://blockchain-git/./src/blockchain.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const table = document.getElementById(\"mytable\");\n\nconst Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\nconst Blockchain = __webpack_require__(/*! ./blockchain */ \"./src/blockchain.js\");\n\nlet myblockchain = new Blockchain();\n\ndocument.getElementById(\"myform\").onsubmit = function (event) {\n  event.preventDefault();\n  var date = document.getElementById(\"date\").value;\n  var ammount = document.getElementById(\"ammount\").value;\n  const newrow = document.createElement(\"tr\");\n  newrow.innerHTML = `\n    <tr>\n        <td>${date}</td>\n        <td>${ammount}</td>\n    </tr>`;\n  table.appendChild(newrow);\n  document.getElementById(\"date\").value = \"\";\n  document.getElementById(\"ammount\").value = \"\";\n};\n\n//# sourceURL=webpack://blockchain-git/./src/index.js?");

/***/ }),

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory();\n\t}\n\telse {}\n}(this, function () {\n\n\t/*globals window, global, require*/\n\n\t/**\n\t * CryptoJS core components.\n\t */\n\tvar CryptoJS = CryptoJS || (function (Math, undefined) {\n\n\t    var crypto;\n\n\t    // Native crypto from window (Browser)\n\t    if (typeof window !== 'undefined' && window.crypto) {\n\t        crypto = window.crypto;\n\t    }\n\n\t    // Native (experimental IE 11) crypto from window (Browser)\n\t    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {\n\t        crypto = window.msCrypto;\n\t    }\n\n\t    // Native crypto from global (NodeJS)\n\t    if (!crypto && typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.crypto) {\n\t        crypto = __webpack_require__.g.crypto;\n\t    }\n\n\t    // Native crypto import via require (NodeJS)\n\t    if (!crypto && \"function\" === 'function') {\n\t        try {\n\t            crypto = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'crypto'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\t        } catch (err) {}\n\t    }\n\n\t    /*\n\t     * Cryptographically secure pseudorandom number generator\n\t     *\n\t     * As Math.random() is cryptographically not safe to use\n\t     */\n\t    var cryptoSecureRandomInt = function () {\n\t        if (crypto) {\n\t            // Use getRandomValues method (Browser)\n\t            if (typeof crypto.getRandomValues === 'function') {\n\t                try {\n\t                    return crypto.getRandomValues(new Uint32Array(1))[0];\n\t                } catch (err) {}\n\t            }\n\n\t            // Use randomBytes method (NodeJS)\n\t            if (typeof crypto.randomBytes === 'function') {\n\t                try {\n\t                    return crypto.randomBytes(4).readInt32LE();\n\t                } catch (err) {}\n\t            }\n\t        }\n\n\t        throw new Error('Native crypto module could not be used to get secure random number.');\n\t    };\n\n\t    /*\n\t     * Local polyfill of Object.create\n\n\t     */\n\t    var create = Object.create || (function () {\n\t        function F() {}\n\n\t        return function (obj) {\n\t            var subtype;\n\n\t            F.prototype = obj;\n\n\t            subtype = new F();\n\n\t            F.prototype = null;\n\n\t            return subtype;\n\t        };\n\t    }())\n\n\t    /**\n\t     * CryptoJS namespace.\n\t     */\n\t    var C = {};\n\n\t    /**\n\t     * Library namespace.\n\t     */\n\t    var C_lib = C.lib = {};\n\n\t    /**\n\t     * Base object for prototypal inheritance.\n\t     */\n\t    var Base = C_lib.Base = (function () {\n\n\n\t        return {\n\t            /**\n\t             * Creates a new object that inherits from this object.\n\t             *\n\t             * @param {Object} overrides Properties to copy into the new object.\n\t             *\n\t             * @return {Object} The new object.\n\t             *\n\t             * @static\n\t             *\n\t             * @example\n\t             *\n\t             *     var MyType = CryptoJS.lib.Base.extend({\n\t             *         field: 'value',\n\t             *\n\t             *         method: function () {\n\t             *         }\n\t             *     });\n\t             */\n\t            extend: function (overrides) {\n\t                // Spawn\n\t                var subtype = create(this);\n\n\t                // Augment\n\t                if (overrides) {\n\t                    subtype.mixIn(overrides);\n\t                }\n\n\t                // Create default initializer\n\t                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {\n\t                    subtype.init = function () {\n\t                        subtype.$super.init.apply(this, arguments);\n\t                    };\n\t                }\n\n\t                // Initializer's prototype is the subtype object\n\t                subtype.init.prototype = subtype;\n\n\t                // Reference supertype\n\t                subtype.$super = this;\n\n\t                return subtype;\n\t            },\n\n\t            /**\n\t             * Extends this object and runs the init method.\n\t             * Arguments to create() will be passed to init().\n\t             *\n\t             * @return {Object} The new object.\n\t             *\n\t             * @static\n\t             *\n\t             * @example\n\t             *\n\t             *     var instance = MyType.create();\n\t             */\n\t            create: function () {\n\t                var instance = this.extend();\n\t                instance.init.apply(instance, arguments);\n\n\t                return instance;\n\t            },\n\n\t            /**\n\t             * Initializes a newly created object.\n\t             * Override this method to add some logic when your objects are created.\n\t             *\n\t             * @example\n\t             *\n\t             *     var MyType = CryptoJS.lib.Base.extend({\n\t             *         init: function () {\n\t             *             // ...\n\t             *         }\n\t             *     });\n\t             */\n\t            init: function () {\n\t            },\n\n\t            /**\n\t             * Copies properties into this object.\n\t             *\n\t             * @param {Object} properties The properties to mix in.\n\t             *\n\t             * @example\n\t             *\n\t             *     MyType.mixIn({\n\t             *         field: 'value'\n\t             *     });\n\t             */\n\t            mixIn: function (properties) {\n\t                for (var propertyName in properties) {\n\t                    if (properties.hasOwnProperty(propertyName)) {\n\t                        this[propertyName] = properties[propertyName];\n\t                    }\n\t                }\n\n\t                // IE won't copy toString using the loop above\n\t                if (properties.hasOwnProperty('toString')) {\n\t                    this.toString = properties.toString;\n\t                }\n\t            },\n\n\t            /**\n\t             * Creates a copy of this object.\n\t             *\n\t             * @return {Object} The clone.\n\t             *\n\t             * @example\n\t             *\n\t             *     var clone = instance.clone();\n\t             */\n\t            clone: function () {\n\t                return this.init.prototype.extend(this);\n\t            }\n\t        };\n\t    }());\n\n\t    /**\n\t     * An array of 32-bit words.\n\t     *\n\t     * @property {Array} words The array of 32-bit words.\n\t     * @property {number} sigBytes The number of significant bytes in this word array.\n\t     */\n\t    var WordArray = C_lib.WordArray = Base.extend({\n\t        /**\n\t         * Initializes a newly created word array.\n\t         *\n\t         * @param {Array} words (Optional) An array of 32-bit words.\n\t         * @param {number} sigBytes (Optional) The number of significant bytes in the words.\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.lib.WordArray.create();\n\t         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);\n\t         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);\n\t         */\n\t        init: function (words, sigBytes) {\n\t            words = this.words = words || [];\n\n\t            if (sigBytes != undefined) {\n\t                this.sigBytes = sigBytes;\n\t            } else {\n\t                this.sigBytes = words.length * 4;\n\t            }\n\t        },\n\n\t        /**\n\t         * Converts this word array to a string.\n\t         *\n\t         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex\n\t         *\n\t         * @return {string} The stringified word array.\n\t         *\n\t         * @example\n\t         *\n\t         *     var string = wordArray + '';\n\t         *     var string = wordArray.toString();\n\t         *     var string = wordArray.toString(CryptoJS.enc.Utf8);\n\t         */\n\t        toString: function (encoder) {\n\t            return (encoder || Hex).stringify(this);\n\t        },\n\n\t        /**\n\t         * Concatenates a word array to this word array.\n\t         *\n\t         * @param {WordArray} wordArray The word array to append.\n\t         *\n\t         * @return {WordArray} This word array.\n\t         *\n\t         * @example\n\t         *\n\t         *     wordArray1.concat(wordArray2);\n\t         */\n\t        concat: function (wordArray) {\n\t            // Shortcuts\n\t            var thisWords = this.words;\n\t            var thatWords = wordArray.words;\n\t            var thisSigBytes = this.sigBytes;\n\t            var thatSigBytes = wordArray.sigBytes;\n\n\t            // Clamp excess bits\n\t            this.clamp();\n\n\t            // Concat\n\t            if (thisSigBytes % 4) {\n\t                // Copy one byte at a time\n\t                for (var i = 0; i < thatSigBytes; i++) {\n\t                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;\n\t                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);\n\t                }\n\t            } else {\n\t                // Copy one word at a time\n\t                for (var i = 0; i < thatSigBytes; i += 4) {\n\t                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];\n\t                }\n\t            }\n\t            this.sigBytes += thatSigBytes;\n\n\t            // Chainable\n\t            return this;\n\t        },\n\n\t        /**\n\t         * Removes insignificant bits.\n\t         *\n\t         * @example\n\t         *\n\t         *     wordArray.clamp();\n\t         */\n\t        clamp: function () {\n\t            // Shortcuts\n\t            var words = this.words;\n\t            var sigBytes = this.sigBytes;\n\n\t            // Clamp\n\t            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);\n\t            words.length = Math.ceil(sigBytes / 4);\n\t        },\n\n\t        /**\n\t         * Creates a copy of this word array.\n\t         *\n\t         * @return {WordArray} The clone.\n\t         *\n\t         * @example\n\t         *\n\t         *     var clone = wordArray.clone();\n\t         */\n\t        clone: function () {\n\t            var clone = Base.clone.call(this);\n\t            clone.words = this.words.slice(0);\n\n\t            return clone;\n\t        },\n\n\t        /**\n\t         * Creates a word array filled with random bytes.\n\t         *\n\t         * @param {number} nBytes The number of random bytes to generate.\n\t         *\n\t         * @return {WordArray} The random word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.lib.WordArray.random(16);\n\t         */\n\t        random: function (nBytes) {\n\t            var words = [];\n\n\t            for (var i = 0; i < nBytes; i += 4) {\n\t                words.push(cryptoSecureRandomInt());\n\t            }\n\n\t            return new WordArray.init(words, nBytes);\n\t        }\n\t    });\n\n\t    /**\n\t     * Encoder namespace.\n\t     */\n\t    var C_enc = C.enc = {};\n\n\t    /**\n\t     * Hex encoding strategy.\n\t     */\n\t    var Hex = C_enc.Hex = {\n\t        /**\n\t         * Converts a word array to a hex string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The hex string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\n\t            // Convert\n\t            var hexChars = [];\n\t            for (var i = 0; i < sigBytes; i++) {\n\t                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;\n\t                hexChars.push((bite >>> 4).toString(16));\n\t                hexChars.push((bite & 0x0f).toString(16));\n\t            }\n\n\t            return hexChars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a hex string to a word array.\n\t         *\n\t         * @param {string} hexStr The hex string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);\n\t         */\n\t        parse: function (hexStr) {\n\t            // Shortcut\n\t            var hexStrLength = hexStr.length;\n\n\t            // Convert\n\t            var words = [];\n\t            for (var i = 0; i < hexStrLength; i += 2) {\n\t                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);\n\t            }\n\n\t            return new WordArray.init(words, hexStrLength / 2);\n\t        }\n\t    };\n\n\t    /**\n\t     * Latin1 encoding strategy.\n\t     */\n\t    var Latin1 = C_enc.Latin1 = {\n\t        /**\n\t         * Converts a word array to a Latin1 string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The Latin1 string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\n\t            // Convert\n\t            var latin1Chars = [];\n\t            for (var i = 0; i < sigBytes; i++) {\n\t                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;\n\t                latin1Chars.push(String.fromCharCode(bite));\n\t            }\n\n\t            return latin1Chars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a Latin1 string to a word array.\n\t         *\n\t         * @param {string} latin1Str The Latin1 string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);\n\t         */\n\t        parse: function (latin1Str) {\n\t            // Shortcut\n\t            var latin1StrLength = latin1Str.length;\n\n\t            // Convert\n\t            var words = [];\n\t            for (var i = 0; i < latin1StrLength; i++) {\n\t                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);\n\t            }\n\n\t            return new WordArray.init(words, latin1StrLength);\n\t        }\n\t    };\n\n\t    /**\n\t     * UTF-8 encoding strategy.\n\t     */\n\t    var Utf8 = C_enc.Utf8 = {\n\t        /**\n\t         * Converts a word array to a UTF-8 string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The UTF-8 string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            try {\n\t                return decodeURIComponent(escape(Latin1.stringify(wordArray)));\n\t            } catch (e) {\n\t                throw new Error('Malformed UTF-8 data');\n\t            }\n\t        },\n\n\t        /**\n\t         * Converts a UTF-8 string to a word array.\n\t         *\n\t         * @param {string} utf8Str The UTF-8 string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);\n\t         */\n\t        parse: function (utf8Str) {\n\t            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));\n\t        }\n\t    };\n\n\t    /**\n\t     * Abstract buffered block algorithm template.\n\t     *\n\t     * The property blockSize must be implemented in a concrete subtype.\n\t     *\n\t     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0\n\t     */\n\t    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({\n\t        /**\n\t         * Resets this block algorithm's data buffer to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     bufferedBlockAlgorithm.reset();\n\t         */\n\t        reset: function () {\n\t            // Initial values\n\t            this._data = new WordArray.init();\n\t            this._nDataBytes = 0;\n\t        },\n\n\t        /**\n\t         * Adds new data to this block algorithm's buffer.\n\t         *\n\t         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.\n\t         *\n\t         * @example\n\t         *\n\t         *     bufferedBlockAlgorithm._append('data');\n\t         *     bufferedBlockAlgorithm._append(wordArray);\n\t         */\n\t        _append: function (data) {\n\t            // Convert string to WordArray, else assume WordArray already\n\t            if (typeof data == 'string') {\n\t                data = Utf8.parse(data);\n\t            }\n\n\t            // Append\n\t            this._data.concat(data);\n\t            this._nDataBytes += data.sigBytes;\n\t        },\n\n\t        /**\n\t         * Processes available data blocks.\n\t         *\n\t         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.\n\t         *\n\t         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.\n\t         *\n\t         * @return {WordArray} The processed data.\n\t         *\n\t         * @example\n\t         *\n\t         *     var processedData = bufferedBlockAlgorithm._process();\n\t         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');\n\t         */\n\t        _process: function (doFlush) {\n\t            var processedWords;\n\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\t            var dataSigBytes = data.sigBytes;\n\t            var blockSize = this.blockSize;\n\t            var blockSizeBytes = blockSize * 4;\n\n\t            // Count blocks ready\n\t            var nBlocksReady = dataSigBytes / blockSizeBytes;\n\t            if (doFlush) {\n\t                // Round up to include partial blocks\n\t                nBlocksReady = Math.ceil(nBlocksReady);\n\t            } else {\n\t                // Round down to include only full blocks,\n\t                // less the number of blocks that must remain in the buffer\n\t                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);\n\t            }\n\n\t            // Count words ready\n\t            var nWordsReady = nBlocksReady * blockSize;\n\n\t            // Count bytes ready\n\t            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);\n\n\t            // Process blocks\n\t            if (nWordsReady) {\n\t                for (var offset = 0; offset < nWordsReady; offset += blockSize) {\n\t                    // Perform concrete-algorithm logic\n\t                    this._doProcessBlock(dataWords, offset);\n\t                }\n\n\t                // Remove processed words\n\t                processedWords = dataWords.splice(0, nWordsReady);\n\t                data.sigBytes -= nBytesReady;\n\t            }\n\n\t            // Return processed words\n\t            return new WordArray.init(processedWords, nBytesReady);\n\t        },\n\n\t        /**\n\t         * Creates a copy of this object.\n\t         *\n\t         * @return {Object} The clone.\n\t         *\n\t         * @example\n\t         *\n\t         *     var clone = bufferedBlockAlgorithm.clone();\n\t         */\n\t        clone: function () {\n\t            var clone = Base.clone.call(this);\n\t            clone._data = this._data.clone();\n\n\t            return clone;\n\t        },\n\n\t        _minBufferSize: 0\n\t    });\n\n\t    /**\n\t     * Abstract hasher template.\n\t     *\n\t     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)\n\t     */\n\t    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({\n\t        /**\n\t         * Configuration options.\n\t         */\n\t        cfg: Base.extend(),\n\n\t        /**\n\t         * Initializes a newly created hasher.\n\t         *\n\t         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hasher = CryptoJS.algo.SHA256.create();\n\t         */\n\t        init: function (cfg) {\n\t            // Apply config defaults\n\t            this.cfg = this.cfg.extend(cfg);\n\n\t            // Set initial values\n\t            this.reset();\n\t        },\n\n\t        /**\n\t         * Resets this hasher to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     hasher.reset();\n\t         */\n\t        reset: function () {\n\t            // Reset data buffer\n\t            BufferedBlockAlgorithm.reset.call(this);\n\n\t            // Perform concrete-hasher logic\n\t            this._doReset();\n\t        },\n\n\t        /**\n\t         * Updates this hasher with a message.\n\t         *\n\t         * @param {WordArray|string} messageUpdate The message to append.\n\t         *\n\t         * @return {Hasher} This hasher.\n\t         *\n\t         * @example\n\t         *\n\t         *     hasher.update('message');\n\t         *     hasher.update(wordArray);\n\t         */\n\t        update: function (messageUpdate) {\n\t            // Append\n\t            this._append(messageUpdate);\n\n\t            // Update the hash\n\t            this._process();\n\n\t            // Chainable\n\t            return this;\n\t        },\n\n\t        /**\n\t         * Finalizes the hash computation.\n\t         * Note that the finalize operation is effectively a destructive, read-once operation.\n\t         *\n\t         * @param {WordArray|string} messageUpdate (Optional) A final message update.\n\t         *\n\t         * @return {WordArray} The hash.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hash = hasher.finalize();\n\t         *     var hash = hasher.finalize('message');\n\t         *     var hash = hasher.finalize(wordArray);\n\t         */\n\t        finalize: function (messageUpdate) {\n\t            // Final message update\n\t            if (messageUpdate) {\n\t                this._append(messageUpdate);\n\t            }\n\n\t            // Perform concrete-hasher logic\n\t            var hash = this._doFinalize();\n\n\t            return hash;\n\t        },\n\n\t        blockSize: 512/32,\n\n\t        /**\n\t         * Creates a shortcut function to a hasher's object interface.\n\t         *\n\t         * @param {Hasher} hasher The hasher to create a helper for.\n\t         *\n\t         * @return {Function} The shortcut function.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);\n\t         */\n\t        _createHelper: function (hasher) {\n\t            return function (message, cfg) {\n\t                return new hasher.init(cfg).finalize(message);\n\t            };\n\t        },\n\n\t        /**\n\t         * Creates a shortcut function to the HMAC's object interface.\n\t         *\n\t         * @param {Hasher} hasher The hasher to use in this HMAC helper.\n\t         *\n\t         * @return {Function} The shortcut function.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);\n\t         */\n\t        _createHmacHelper: function (hasher) {\n\t            return function (message, key) {\n\t                return new C_algo.HMAC.init(hasher, key).finalize(message);\n\t            };\n\t        }\n\t    });\n\n\t    /**\n\t     * Algorithm namespace.\n\t     */\n\t    var C_algo = C.algo = {};\n\n\t    return C;\n\t}(Math));\n\n\n\treturn CryptoJS;\n\n}));\n\n//# sourceURL=webpack://blockchain-git/./node_modules/crypto-js/core.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function (Math) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_algo = C.algo;\n\n\t    // Initialization and round constants tables\n\t    var H = [];\n\t    var K = [];\n\n\t    // Compute constants\n\t    (function () {\n\t        function isPrime(n) {\n\t            var sqrtN = Math.sqrt(n);\n\t            for (var factor = 2; factor <= sqrtN; factor++) {\n\t                if (!(n % factor)) {\n\t                    return false;\n\t                }\n\t            }\n\n\t            return true;\n\t        }\n\n\t        function getFractionalBits(n) {\n\t            return ((n - (n | 0)) * 0x100000000) | 0;\n\t        }\n\n\t        var n = 2;\n\t        var nPrime = 0;\n\t        while (nPrime < 64) {\n\t            if (isPrime(n)) {\n\t                if (nPrime < 8) {\n\t                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));\n\t                }\n\t                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));\n\n\t                nPrime++;\n\t            }\n\n\t            n++;\n\t        }\n\t    }());\n\n\t    // Reusable object\n\t    var W = [];\n\n\t    /**\n\t     * SHA-256 hash algorithm.\n\t     */\n\t    var SHA256 = C_algo.SHA256 = Hasher.extend({\n\t        _doReset: function () {\n\t            this._hash = new WordArray.init(H.slice(0));\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcut\n\t            var H = this._hash.words;\n\n\t            // Working variables\n\t            var a = H[0];\n\t            var b = H[1];\n\t            var c = H[2];\n\t            var d = H[3];\n\t            var e = H[4];\n\t            var f = H[5];\n\t            var g = H[6];\n\t            var h = H[7];\n\n\t            // Computation\n\t            for (var i = 0; i < 64; i++) {\n\t                if (i < 16) {\n\t                    W[i] = M[offset + i] | 0;\n\t                } else {\n\t                    var gamma0x = W[i - 15];\n\t                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^\n\t                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^\n\t                                   (gamma0x >>> 3);\n\n\t                    var gamma1x = W[i - 2];\n\t                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^\n\t                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^\n\t                                   (gamma1x >>> 10);\n\n\t                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];\n\t                }\n\n\t                var ch  = (e & f) ^ (~e & g);\n\t                var maj = (a & b) ^ (a & c) ^ (b & c);\n\n\t                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));\n\t                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));\n\n\t                var t1 = h + sigma1 + ch + K[i] + W[i];\n\t                var t2 = sigma0 + maj;\n\n\t                h = g;\n\t                g = f;\n\t                f = e;\n\t                e = (d + t1) | 0;\n\t                d = c;\n\t                c = b;\n\t                b = a;\n\t                a = (t1 + t2) | 0;\n\t            }\n\n\t            // Intermediate hash value\n\t            H[0] = (H[0] + a) | 0;\n\t            H[1] = (H[1] + b) | 0;\n\t            H[2] = (H[2] + c) | 0;\n\t            H[3] = (H[3] + d) | 0;\n\t            H[4] = (H[4] + e) | 0;\n\t            H[5] = (H[5] + f) | 0;\n\t            H[6] = (H[6] + g) | 0;\n\t            H[7] = (H[7] + h) | 0;\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;\n\t            data.sigBytes = dataWords.length * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Return final computed hash\n\t            return this._hash;\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\t            clone._hash = this._hash.clone();\n\n\t            return clone;\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA256('message');\n\t     *     var hash = CryptoJS.SHA256(wordArray);\n\t     */\n\t    C.SHA256 = Hasher._createHelper(SHA256);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA256(message, key);\n\t     */\n\t    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);\n\t}(Math));\n\n\n\treturn CryptoJS.SHA256;\n\n}));\n\n//# sourceURL=webpack://blockchain-git/./node_modules/crypto-js/sha256.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;