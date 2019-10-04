/*
 * Copyright 2012-2019 Online-Go.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GoTheme } from "../GoTheme";
import { Goban } from "../Goban";
import {_} from "../translate";

export default function(GoThemes) {
    class Stone extends GoTheme {
        sort() { return  0; }

        placePlainStone(ctx, cx, cy, radius, color) {
            let lineWidth = radius * 0.10;
            if (lineWidth < 0.3) {
                lineWidth = 0;
            }
            ctx.fillStyle = color;
            ctx.strokeStyle = this.parent ? this.parent.getLineColor() : this.getLineColor();
            if (lineWidth > 0) {
                ctx.lineWidth = lineWidth;
            }
            ctx.beginPath();
            ctx.arc(cx, cy, radius - lineWidth / 2, 0.001, 2 * Math.PI, false); /* 0.001 to workaround fucked up chrome bug */
            if (lineWidth > 0) {
                ctx.stroke();
            }
            ctx.fill();
        }
    }

    class Black extends Stone {
        preRenderBlack(radius, seed): any {
            return true;
        }

        placeBlackStone(ctx, shadow_ctx, stone, cx, cy, radius) {
            this.placePlainStone(ctx, cx, cy, radius, this.getBlackStoneColor());
        }

        public getBlackStoneColor() {
            return Goban.hooks.discBlackStoneColor ? Goban.hooks.discBlackStoneColor() : '#000000';
        }

        public getBlackTextColor() {
            return Goban.hooks.discBlackTextColor ? Goban.hooks.discBlackTextColor() : '#FFFFFF';
        }
    }

    class White extends Stone {
        preRenderWhite(radius, seed): any {
            return true;
        }

        placeWhiteStone(ctx, shadow_ctx, stone, cx, cy, radius) {
            this.placePlainStone(ctx, cx, cy, radius, this.getWhiteStoneColor());
        }

        public getWhiteStoneColor() {
            return Goban.hooks.discWhiteStoneColor ? Goban.hooks.discWhiteStoneColor() : '#FFFFFF';
        }

        public getWhiteTextColor() {
            return Goban.hooks.discWhiteTextColor ? Goban.hooks.discWhiteTextColor() : '#000000';
        }
    }

    GoThemes["black"]["Plain"] = Black;
    GoThemes["white"]["Plain"] = White;

}
