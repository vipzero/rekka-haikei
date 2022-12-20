import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace config. */
export namespace config {

    /** Properties of a Config. */
    interface IConfig {

        /** Config showBookmark */
        showBookmark?: (boolean|null);

        /** Config showArtwork */
        showArtwork?: (boolean|null);

        /** Config showCounts */
        showCounts?: (boolean|null);

        /** Config showHistory */
        showHistory?: (boolean|null);

        /** Config sideMode */
        sideMode?: (config.Config.SideMode|null);

        /** Config theme */
        theme?: (number|null);

        /** Config ee */
        ee?: (Uint8Array|null);
    }

    /** Represents a Config. */
    class Config implements IConfig {

        /**
         * Constructs a new Config.
         * @param [properties] Properties to set
         */
        constructor(properties?: config.IConfig);

        /** Config showBookmark. */
        public showBookmark: boolean;

        /** Config showArtwork. */
        public showArtwork: boolean;

        /** Config showCounts. */
        public showCounts: boolean;

        /** Config showHistory. */
        public showHistory: boolean;

        /** Config sideMode. */
        public sideMode: config.Config.SideMode;

        /** Config theme. */
        public theme: number;

        /** Config ee. */
        public ee: Uint8Array;

        /**
         * Creates a new Config instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Config instance
         */
        public static create(properties?: config.IConfig): config.Config;

        /**
         * Encodes the specified Config message. Does not implicitly {@link config.Config.verify|verify} messages.
         * @param message Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: config.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Config message, length delimited. Does not implicitly {@link config.Config.verify|verify} messages.
         * @param message Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: config.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Config message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): config.Config;

        /**
         * Decodes a Config message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): config.Config;

        /**
         * Verifies a Config message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Config message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Config
         */
        public static fromObject(object: { [k: string]: any }): config.Config;

        /**
         * Creates a plain object from a Config message. Also converts values to other types if specified.
         * @param message Config
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: config.Config, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Config to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Config
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Config {

        /** SideMode enum. */
        enum SideMode {
            L = 0,
            R = 1,
            WIDE = 2
        }
    }
}
