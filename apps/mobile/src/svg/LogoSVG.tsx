import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export default function LogoSVG({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 375 374.999991">
      <Defs>
        <ClipPath id="1adbeb1883">
          <Path d="M 37.5 109.101562 L 218.25 109.101562 L 218.25 265.851562 L 37.5 265.851562 Z M 37.5 109.101562 " />
        </ClipPath>
        <ClipPath id="0d4910794b">
          <Path d="M 156.492188 109.101562 L 337.242188 109.101562 L 337.242188 265.851562 L 156.492188 265.851562 Z M 156.492188 109.101562 " />
        </ClipPath>
      </Defs>
      <Rect
        x="-37.5"
        y="-37.499999"
        width="450"
        height="449.999989"
        fill="#ffffff"
      />
      <Rect
        x="-37.5"
        y="-37.499999"
        width="450"
        height="449.999989"
        fill="#f6c834"
      />
      <G clipPath="url(#1adbeb1883)">
        <Path
          fill="#ffffff"
          d="M 82.773438 109.160156 L 37.542969 187.5 L 82.773438 265.835938 L 173.234375 265.835938 L 218.464844 187.5 L 173.234375 109.160156 Z M 163.273438 248.585938 L 92.734375 248.585938 L 57.464844 187.5 L 92.734375 126.410156 L 163.273438 126.410156 L 198.542969 187.5 Z M 163.273438 248.585938 "
        />
      </G>
      <G clipPath="url(#0d4910794b)">
        <Path
          fill="#ffffff"
          d="M 201.765625 109.160156 L 156.535156 187.5 L 201.765625 265.835938 L 292.226562 265.835938 L 337.457031 187.5 L 292.226562 109.160156 Z M 282.265625 248.585938 L 211.726562 248.585938 L 176.457031 187.5 L 211.726562 126.410156 L 282.265625 126.410156 L 317.535156 187.5 Z M 282.265625 248.585938 "
        />
      </G>
    </Svg>
  );
}