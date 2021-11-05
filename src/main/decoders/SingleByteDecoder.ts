/*
 * Copyright (C) 2021 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { AbstractDecoder } from "../AbstractDecoder";
import { ByteBuffer, END_OF_BUFFER } from "../ByteBuffer";
import { FINISHED } from "../constants";
import { DecoderConstructor } from "../Decoder";
import { isASCII } from "../util";

/**
 * Decoder for single byte encodings.
 */
export class SingleByteDecoder extends AbstractDecoder {
    private readonly index: Array<number | null>;

    /**
     * Constructs new decoder for the given code points.
     *
     * @param codePoints - The code points of the encoding.
     * @param fatal      - True to throw an exception when a character can't be decoded. False to decode to a
     *                     replacement character instead.
     */
    private constructor(codePoints: Array<number | null>, fatal?: boolean) {
        super(fatal);
        this.index = codePoints;
    }

    /**
     * Creates and returns a single byte decoder class for the given code points.
     *
     * @param codePoints - The code points of the encoding to decode.
     * @return The created single byte decoder class.
     */
    public static forCodePoints(codePoints: Array<number | null>): DecoderConstructor {
        return class extends SingleByteDecoder {
            public constructor(fatal?: boolean) {
                super(codePoints, fatal);
            }
        };
    }

    /** @inheritDoc */
    public decode(buffer: ByteBuffer): number | number[] | null {
        const byte = buffer.read();
        if (byte === END_OF_BUFFER) {
            return FINISHED;
        }
        if (isASCII(byte)) {
            return byte;
        }
        return this.index[byte - 0x80] ?? this.fail();
    }
}
