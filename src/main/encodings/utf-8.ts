/*
 * Copyright (C) 2021 Klaus Reimer <k@ailis.de>
 * See LICENSE.md for licensing information.
 */

import { UTF8Decoder } from "../decoders/UTF8Decoder";
import { UTF8Encoder } from "../encoders/UTF8Encoder";
import { registerEncoding } from "../Encoding";

registerEncoding(
    "utf-8",
    [
        "unicode-1-1-utf-8",
        "utf-8",
        "utf8"
    ],
    UTF8Decoder,
    UTF8Encoder
);
