/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.config = (function() {

    /**
     * Namespace config.
     * @exports config
     * @namespace
     */
    var config = {};

    config.Config = (function() {

        /**
         * Properties of a Config.
         * @memberof config
         * @interface IConfig
         * @property {boolean|null} [showBookmark] Config showBookmark
         * @property {boolean|null} [showArtwork] Config showArtwork
         * @property {boolean|null} [showCounts] Config showCounts
         * @property {boolean|null} [showHistory] Config showHistory
         * @property {config.Config.SideMode|null} [sideMode] Config sideMode
         * @property {number|null} [theme] Config theme
         * @property {Uint8Array|null} [ee] Config ee
         */

        /**
         * Constructs a new Config.
         * @memberof config
         * @classdesc Represents a Config.
         * @implements IConfig
         * @constructor
         * @param {config.IConfig=} [properties] Properties to set
         */
        function Config(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Config showBookmark.
         * @member {boolean} showBookmark
         * @memberof config.Config
         * @instance
         */
        Config.prototype.showBookmark = false;

        /**
         * Config showArtwork.
         * @member {boolean} showArtwork
         * @memberof config.Config
         * @instance
         */
        Config.prototype.showArtwork = false;

        /**
         * Config showCounts.
         * @member {boolean} showCounts
         * @memberof config.Config
         * @instance
         */
        Config.prototype.showCounts = false;

        /**
         * Config showHistory.
         * @member {boolean} showHistory
         * @memberof config.Config
         * @instance
         */
        Config.prototype.showHistory = false;

        /**
         * Config sideMode.
         * @member {config.Config.SideMode} sideMode
         * @memberof config.Config
         * @instance
         */
        Config.prototype.sideMode = 0;

        /**
         * Config theme.
         * @member {number} theme
         * @memberof config.Config
         * @instance
         */
        Config.prototype.theme = 0;

        /**
         * Config ee.
         * @member {Uint8Array} ee
         * @memberof config.Config
         * @instance
         */
        Config.prototype.ee = $util.newBuffer([]);

        /**
         * Creates a new Config instance using the specified properties.
         * @function create
         * @memberof config.Config
         * @static
         * @param {config.IConfig=} [properties] Properties to set
         * @returns {config.Config} Config instance
         */
        Config.create = function create(properties) {
            return new Config(properties);
        };

        /**
         * Encodes the specified Config message. Does not implicitly {@link config.Config.verify|verify} messages.
         * @function encode
         * @memberof config.Config
         * @static
         * @param {config.IConfig} message Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Config.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.showBookmark != null && Object.hasOwnProperty.call(message, "showBookmark"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.showBookmark);
            if (message.showArtwork != null && Object.hasOwnProperty.call(message, "showArtwork"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.showArtwork);
            if (message.showCounts != null && Object.hasOwnProperty.call(message, "showCounts"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.showCounts);
            if (message.showHistory != null && Object.hasOwnProperty.call(message, "showHistory"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.showHistory);
            if (message.sideMode != null && Object.hasOwnProperty.call(message, "sideMode"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.sideMode);
            if (message.theme != null && Object.hasOwnProperty.call(message, "theme"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.theme);
            if (message.ee != null && Object.hasOwnProperty.call(message, "ee"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.ee);
            return writer;
        };

        /**
         * Encodes the specified Config message, length delimited. Does not implicitly {@link config.Config.verify|verify} messages.
         * @function encodeDelimited
         * @memberof config.Config
         * @static
         * @param {config.IConfig} message Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Config.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Config message from the specified reader or buffer.
         * @function decode
         * @memberof config.Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {config.Config} Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Config.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.config.Config();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.showBookmark = reader.bool();
                        break;
                    }
                case 2: {
                        message.showArtwork = reader.bool();
                        break;
                    }
                case 3: {
                        message.showCounts = reader.bool();
                        break;
                    }
                case 4: {
                        message.showHistory = reader.bool();
                        break;
                    }
                case 5: {
                        message.sideMode = reader.int32();
                        break;
                    }
                case 6: {
                        message.theme = reader.int32();
                        break;
                    }
                case 10: {
                        message.ee = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Config message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof config.Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {config.Config} Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Config.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Config message.
         * @function verify
         * @memberof config.Config
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Config.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.showBookmark != null && message.hasOwnProperty("showBookmark"))
                if (typeof message.showBookmark !== "boolean")
                    return "showBookmark: boolean expected";
            if (message.showArtwork != null && message.hasOwnProperty("showArtwork"))
                if (typeof message.showArtwork !== "boolean")
                    return "showArtwork: boolean expected";
            if (message.showCounts != null && message.hasOwnProperty("showCounts"))
                if (typeof message.showCounts !== "boolean")
                    return "showCounts: boolean expected";
            if (message.showHistory != null && message.hasOwnProperty("showHistory"))
                if (typeof message.showHistory !== "boolean")
                    return "showHistory: boolean expected";
            if (message.sideMode != null && message.hasOwnProperty("sideMode"))
                switch (message.sideMode) {
                default:
                    return "sideMode: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.theme != null && message.hasOwnProperty("theme"))
                if (!$util.isInteger(message.theme))
                    return "theme: integer expected";
            if (message.ee != null && message.hasOwnProperty("ee"))
                if (!(message.ee && typeof message.ee.length === "number" || $util.isString(message.ee)))
                    return "ee: buffer expected";
            return null;
        };

        /**
         * Creates a Config message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof config.Config
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {config.Config} Config
         */
        Config.fromObject = function fromObject(object) {
            if (object instanceof $root.config.Config)
                return object;
            var message = new $root.config.Config();
            if (object.showBookmark != null)
                message.showBookmark = Boolean(object.showBookmark);
            if (object.showArtwork != null)
                message.showArtwork = Boolean(object.showArtwork);
            if (object.showCounts != null)
                message.showCounts = Boolean(object.showCounts);
            if (object.showHistory != null)
                message.showHistory = Boolean(object.showHistory);
            switch (object.sideMode) {
            default:
                if (typeof object.sideMode === "number") {
                    message.sideMode = object.sideMode;
                    break;
                }
                break;
            case "L":
            case 0:
                message.sideMode = 0;
                break;
            case "R":
            case 1:
                message.sideMode = 1;
                break;
            case "WIDE":
            case 2:
                message.sideMode = 2;
                break;
            }
            if (object.theme != null)
                message.theme = object.theme | 0;
            if (object.ee != null)
                if (typeof object.ee === "string")
                    $util.base64.decode(object.ee, message.ee = $util.newBuffer($util.base64.length(object.ee)), 0);
                else if (object.ee.length >= 0)
                    message.ee = object.ee;
            return message;
        };

        /**
         * Creates a plain object from a Config message. Also converts values to other types if specified.
         * @function toObject
         * @memberof config.Config
         * @static
         * @param {config.Config} message Config
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Config.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.showBookmark = false;
                object.showArtwork = false;
                object.showCounts = false;
                object.showHistory = false;
                object.sideMode = options.enums === String ? "L" : 0;
                object.theme = 0;
                if (options.bytes === String)
                    object.ee = "";
                else {
                    object.ee = [];
                    if (options.bytes !== Array)
                        object.ee = $util.newBuffer(object.ee);
                }
            }
            if (message.showBookmark != null && message.hasOwnProperty("showBookmark"))
                object.showBookmark = message.showBookmark;
            if (message.showArtwork != null && message.hasOwnProperty("showArtwork"))
                object.showArtwork = message.showArtwork;
            if (message.showCounts != null && message.hasOwnProperty("showCounts"))
                object.showCounts = message.showCounts;
            if (message.showHistory != null && message.hasOwnProperty("showHistory"))
                object.showHistory = message.showHistory;
            if (message.sideMode != null && message.hasOwnProperty("sideMode"))
                object.sideMode = options.enums === String ? $root.config.Config.SideMode[message.sideMode] === undefined ? message.sideMode : $root.config.Config.SideMode[message.sideMode] : message.sideMode;
            if (message.theme != null && message.hasOwnProperty("theme"))
                object.theme = message.theme;
            if (message.ee != null && message.hasOwnProperty("ee"))
                object.ee = options.bytes === String ? $util.base64.encode(message.ee, 0, message.ee.length) : options.bytes === Array ? Array.prototype.slice.call(message.ee) : message.ee;
            return object;
        };

        /**
         * Converts this Config to JSON.
         * @function toJSON
         * @memberof config.Config
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Config.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Config
         * @function getTypeUrl
         * @memberof config.Config
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Config.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/config.Config";
        };

        /**
         * SideMode enum.
         * @name config.Config.SideMode
         * @enum {number}
         * @property {number} L=0 L value
         * @property {number} R=1 R value
         * @property {number} WIDE=2 WIDE value
         */
        Config.SideMode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "L"] = 0;
            values[valuesById[1] = "R"] = 1;
            values[valuesById[2] = "WIDE"] = 2;
            return values;
        })();

        return Config;
    })();

    return config;
})();

module.exports = $root;